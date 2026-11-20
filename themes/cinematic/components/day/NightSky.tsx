/**
 * Midnight: a field of stars that breathe slowly, and the moon (A day at
 * the house). Decorative and painted by the server: the positions are a
 * fixed pseudo-random scatter, so every render is the same sky. The
 * twinkle is a CSS opacity loop, still under reduced motion.
 */
const rand = (i: number, n: number) => {
  const v = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

const STARS = Array.from({ length: 90 }, (_, i) => ({
  left: (rand(i, 1) * 100).toFixed(2),
  top: (rand(i, 2) * 100).toFixed(2),
  delay: (rand(i, 3) * 4).toFixed(2),
  big: rand(i, 4) > 0.86,
}));

export default function NightSky({ moon = true }: { moon?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((s, i) => (
        <span
          key={i}
          className={`star${s.big ? ' scale-150' : ''}`}
          style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
        />
      ))}
      {moon && <span className="moon absolute right-8 top-20 size-16 lg:right-32 lg:top-24 lg:size-28" />}
    </div>
  );
}
