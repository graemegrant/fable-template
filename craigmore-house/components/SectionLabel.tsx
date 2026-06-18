/** Eyebrow label. Default (gold on light) and parchment (for dark sections). */
export default function SectionLabel({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'parchment';
  className?: string;
}) {
  const tone = variant === 'parchment' ? 'text-parchment/70' : 'text-gold';
  return (
    <p className={`font-body text-[11px] uppercase tracking-[0.3em] ${tone} ${className}`}>
      {children}
    </p>
  );
}
