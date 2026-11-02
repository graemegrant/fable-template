'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Contact form behaviour shared by every look: subjects (preselectable from
 * the URL, e.g. /contact?subject=events from the weddings page), field
 * state, and sending to /api/contact.
 */
export function useContactForm() {
  const t = useTranslations('contactForm');
  const subjects = [
    t('subjectGeneral'), t('subjectRoomBooking'), t('subjectDiningReservation'),
    t('subjectWeddingsEvents'), t('subjectGiftVouchers'), t('subjectPress'),
  ];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: subjects[0], message: '' });

  // Read on mount (not useSearchParams) so the contact page stays statically rendered.
  const subjectKeys: Record<string, string> = {
    rooms: t('subjectRoomBooking'),
    dining: t('subjectDiningReservation'),
    events: t('subjectWeddingsEvents'),
    vouchers: t('subjectGiftVouchers'),
  };
  useEffect(() => {
    const preset = subjectKeys[new URLSearchParams(window.location.search).get('subject') ?? ''];
    if (preset) setForm((f) => ({ ...f, subject: preset }));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

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

  return { t, subjects, status, form, set, submit };
}
