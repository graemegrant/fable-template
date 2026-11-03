'use client';

import { useContactForm } from '@/lib/ui/useContactForm';

/** Urban contact form: underline fields and mono labels on black.
 *  Behaviour is shared in lib/ui/useContactForm.ts. */
export default function ContactForm() {
  const { t, subjects, status, form, set, submit } = useContactForm();

  const field =
    'w-full min-w-0 border-0 border-b border-canvas/30 bg-transparent px-0 py-3 font-body text-lg text-canvas placeholder:text-canvas/50 focus:border-accentondark focus:outline-none focus:ring-0';
  const label = 'block font-mono text-xs uppercase tracking-18 text-canvas/70';

  if (status === 'sent') {
    return (
      <div className="border border-accentondark p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-18 text-accentondark">/ {t('thankYou')}</p>
        <p className="mt-4 font-body text-lg leading-relaxed text-canvas">{t('confirmationBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>{t('nameLabel')}</label>
          <input id="cf-name" required value={form.name} onChange={set('name')} className={field} placeholder={t('namePlaceholder')} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>{t('emailLabel')}</label>
          <input id="cf-email" type="email" required value={form.email} onChange={set('email')} className={field} placeholder={t('emailPlaceholder')} />
        </div>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={label}>
            {t('phoneLabel')} <span className="normal-case tracking-normal">{t('optionalLabel')}</span>
          </label>
          <input id="cf-phone" value={form.phone} onChange={set('phone')} className={field} placeholder={t('phonePlaceholder')} />
        </div>
        <div>
          <label htmlFor="cf-subject" className={label}>{t('subjectLabel')}</label>
          <select id="cf-subject" value={form.subject} onChange={set('subject')} className={field}>
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>{t('messageLabel')}</label>
        <textarea id="cf-message" required rows={5} value={form.message} onChange={set('message')} className={field} placeholder={t('messagePlaceholder')} />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-14 items-center gap-6 bg-accentfill px-6 font-mono text-sm uppercase tracking-18 text-onaccent transition-colors hover:bg-canvas disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('sendEnquiry')} <span aria-hidden>→</span>
      </button>
      {status === 'error' && <p className="font-body text-sm text-canvas/80">{t('errorMessage')}</p>}
    </form>
  );
}
