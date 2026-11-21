import { NextResponse } from 'next/server';
import { hotelConfig } from '@/hotel.config';
import { clientIp, oversizedField, rateLimited, sameOrigin, tooFast } from '@/lib/contactGuard';

/**
 * Contact + newsletter endpoint. Sends via Resend when configured;
 * graceful no-op (logged) in development when the key is not set.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: 'Too many requests, please try again later' }, { status: 429 });
  }
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }
  if (!data || typeof data !== 'object' || oversizedField(data)) {
    return NextResponse.json({ ok: false, error: 'A field is too long' }, { status: 400 });
  }
  // Scripted posts get a quiet success, so bots learn nothing to adapt to.
  if (tooFast(data.startedAt)) {
    return NextResponse.json({ ok: true });
  }

  const email = (data.email || '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'A valid email address is required' }, { status: 400 });
  }
  if (data.type !== 'newsletter' && !(data.message || '').trim()) {
    return NextResponse.json({ ok: false, error: 'A message is required' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_FORM_TO || hotelConfig.contact.email;
  const from = process.env.CONTACT_FORM_FROM;

  if (!apiKey || !from) {
    console.info('[contact] RESEND_API_KEY not configured — dev no-op.', {
      type: data.type || 'enquiry', email, subject: data.subject,
    });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const isNewsletter = data.type === 'newsletter';
    const subject = isNewsletter
      ? `Newsletter signup — ${email}`
      : `Website enquiry — ${data.subject || 'General'} — ${data.name || email}`;

    const text = isNewsletter
      ? `New newsletter signup:\n\n${email}`
      : [
          `Name: ${data.name || '—'}`,
          `Email: ${email}`,
          `Phone: ${data.phone || '—'}`,
          `Subject: ${data.subject || '—'}`,
          '',
          data.message,
        ].join('\n');

    const { error } = await resend.emails.send({ from, to, replyTo: email, subject, text });
    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ ok: false, error: 'Email could not be sent' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Email could not be sent' }, { status: 502 });
  }
}
