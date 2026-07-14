'use client';

import { useState } from 'react';

const SUBJECTS = ['General enquiry', 'Room booking', 'Dining reservation', 'Weddings & events', 'Gift vouchers', 'Press'];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const field =
    'w-full rounded-ctrl border border-ink/20 bg-transparent px-4 py-3.5 font-body text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none';
  const label = 'block font-body text-[11px] uppercase tracking-[0.25em] text-ink/60';

  if (status === 'sent') {
    return (
      <div className="border border-gold/50 bg-warmgrey p-10 text-center">
        <p className="font-heading text-2xl font-medium text-forest">Thank you.</p>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink/75">
          Your enquiry is with us. A member of the team — a person, not a system — will reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Name</label>
          <input id="cf-name" required value={form.name} onChange={set('name')} className={`mt-2 ${field}`} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email</label>
          <input id="cf-email" type="email" required value={form.email} onChange={set('email')} className={`mt-2 ${field}`} placeholder="you@example.com" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={label}>Phone <span className="normal-case tracking-normal">(optional)</span></label>
          <input id="cf-phone" value={form.phone} onChange={set('phone')} className={`mt-2 ${field}`} placeholder="+44" />
        </div>
        <div>
          <label htmlFor="cf-subject" className={label}>Subject</label>
          <select id="cf-subject" value={form.subject} onChange={set('subject')} className={`mt-2 ${field}`}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>Message</label>
        <textarea id="cf-message" required rows={6} value={form.message} onChange={set('message')} className={`mt-2 ${field}`} placeholder="How can we help?" />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-ctrl bg-forest px-10 py-4 font-body text-[11px] uppercase tracking-[0.25em] text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
      {status === 'error' && (
        <p className="font-body text-sm text-ink/70">
          Something went wrong sending that. Please try again, or email us directly — the address is alongside.
        </p>
      )}
    </form>
  );
}
