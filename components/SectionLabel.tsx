/** Eyebrow label. Default (accent on light) and parchment (for dark sections). */
export default function SectionLabel({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'parchment';
  className?: string;
}) {
  const tone = variant === 'parchment' ? 'text-parchment/70' : 'text-accent';
  return (
    <p className={`font-body text-2xs uppercase tracking-30 ${tone} ${className}`}>
      {children}
    </p>
  );
}
