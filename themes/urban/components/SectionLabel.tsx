/** Urban eyebrow: a mono, uppercase label led by an index and a rule,
 *  like a magazine section marker. `default` sits on the black page,
 *  `onpaper` on paper bands. */
export default function SectionLabel({
  children,
  index,
  variant = 'default',
  className = '',
}: {
  children: React.ReactNode;
  /** Optional section number, e.g. "02". */
  index?: string;
  variant?: 'default' | 'onpaper';
  className?: string;
}) {
  const tone = variant === 'onpaper' ? 'text-accent' : 'text-accentondark';
  return (
    <p className={`flex items-center gap-3 font-mono text-xs uppercase tracking-18 ${tone} ${className}`}>
      <span>{index ?? '/'}</span>
      <span aria-hidden className="h-px w-8 bg-current" />
      <span>{children}</span>
    </p>
  );
}
