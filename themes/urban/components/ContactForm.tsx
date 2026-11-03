'use client';

import { useContactForm } from '@/lib/ui/useContactForm';

/** Coastal contact form: soft rounded fields on a sand card. Behaviour is
 *  shared in lib/ui/useContactForm.ts. */
export default function ContactForm() {
  const { t, subjects, status, form, set, submit } = useContactForm();

  const field =
    'w-full rounded-img border border-ink/15 bg-canvas px-5 py-3.5 font-body text-base text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accentondark sm:text-sm';
  const label = 'block px-1 font-body text-sm font-semibold text-primary';

  if (status === 'sent') {
    return (
      <div className="rounded-card bg-accentondark/35 p-10 text-center">
        <span aria-hidden className="mx-auto flex size-14 items-center justify-center rounded-full bg-canvas text-2xl text-accent">✓</span>
        <p className="mt-5 font-heading text-3xl font-semibold text-primary">{t('thankYou')}</p>
        <p className="mt-3 font-body text-base leading-relaxed text-ink/80">{t('confirmationBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>{t('nameLabel')}</label>
          <input id="cf-name" required value={form.name} onChange={set('name')} className={`mt-2 ${field}`} placeholder={t('namePlaceholder')} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>{t('emailLabel')}</label>
          <input id="cf-email" type="email" required value={form.email} onChange={set('email')} className={`mt-2 ${field}`} placeholder={t('emailPlaceholder')} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={label}>
            {t('phoneLabel')} <span className="font-normal text-ink/75">{t('optionalLabel')}</span>
          </label>
          <input id="cf-phone" value={form.phone} onChange={set('phone')} className={`mt-2 ${field}`} placeholder={t('phonePlaceholder')} />
        </div>
        <div>
          <label htmlFor="cf-subject" className={label}>{t('subjectLabel')}</label>
          <select id="cf-subject" value={form.subject} onChange={set('subject')} className={`mt-2 ${field}`}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
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
        className="min-h-12 rounded-ctrl bg-accentfill px-9 py-3.5 font-body text-base font-semibold text-onaccent transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('sendEnquiry')}
      </button>
      {status === 'error' && <p className="font-body text-sm text-ink/80">{t('errorMessage')}</p>}
    </form>
  );
}
