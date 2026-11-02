/** Coastal eyebrow: a small rounded tag with a sea-glass dot.
 *  `default` on the sand page, `raised` on tinted panels (sea glass,
 *  canvasalt), `ondark` on deep-sea sections and photos. */
export default function SectionLabel({
  children,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'raised' | 'ondark';
  className?: string;
}) {
  const tone = {
    default: 'bg-accentondark/35 text-accent',
    raised: 'bg-canvas text-accent',
    ondark: 'bg-canvas/10 text-accentondark',
  }[variant];
  const dot = variant === 'ondark' ? 'bg-accentondark' : 'bg-accent';
  return (
    <p className={`inline-flex items-center gap-2 rounded-ctrl px-3.5 py-1.5 font-body text-xs font-semibold ${tone} ${className}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${dot}`} />
      {children}
    </p>
  );
}
