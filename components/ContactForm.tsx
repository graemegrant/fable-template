'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const SUBJECTS = [
    t('subjectGeneral'), t('subjectRoomBooking'), t('subjectDiningReservation'),
    t('subjectWeddingsEvents'), t('subjectGiftVouchers'), t('subjectPress'),
  ];
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
  const label = 'block font-body text-2xs uppercase tracking-25 text-ink/60';

  if (status === 'sent') {
    return (
      <div className="border border-gold/50 bg-warmgrey p-10 text-center">
        <p className="font-heading text-2xl font-medium text-forest">{t('thankYou')}</p>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink/75">
          {t('confirmationBody')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>{t('nameLabel')}</label>
          <input id="cf-name" required value={form.name} onChange={set('name')} className={`mt-2 ${field}`} placeholder={t('namePlaceholder')} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>{t('emailLabel')}</label>
          <input id="cf-email" type="email" required value={form.email} onChange={set('email')} className={`mt-2 ${field}`} placeholder={t('emailPlaceholder')} />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={label}>{t('phoneLabel')} <span className="normal-case tracking-normal">{t('optionalLabel')}</span></label>
          <input id="cf-phone" value={form.phone} onChange={set('phone')} className={`mt-2 ${field}`} placeholder={t('phonePlaceholder')} />
        </div>
        <div>
          <label htmlFor="cf-subject" className={label}>{t('subjectLabel')}</label>
          <select id="cf-subject" value={form.subject} onChange={set('subject')} className={`mt-2 ${field}`}>
            {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>{t('messageLabel')}</label>
        <textarea id="cf-message" required rows={6} value={form.message} onChange={set('message')} className={`mt-2 ${field}`} placeholder={t('messagePlaceholder')} />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-ctrl bg-forest px-10 py-4 font-body text-2xs uppercase tracking-25 text-parchment transition-colors duration-300 hover:bg-gold hover:text-forest disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('sendEnquiry')}
      </button>
      {status === 'error' && (
        <p className="font-body text-sm text-ink/70">
          {t('errorMessage')}
        </p>
      )}
    </form>
  );
}
