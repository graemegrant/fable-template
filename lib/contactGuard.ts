/**
 * Abuse guards for the public /api/contact form. Without these a bot can
 * post unlimited enquiries, flooding the hotel's inbox, using up the Resend
 * quota and hurting the sending domain's reputation.
 *
 * - sameOrigin: the browser's Origin header must match the site's host.
 * - field limits: oversized fields are rejected.
 * - rateLimited: at most RATE_MAX posts per IP per RATE_WINDOW_MS. Memory
 *   is per server instance, so this is best effort; pair it with a Vercel
 *   Firewall rate-limit rule on /api/contact for a hard limit.
 * - tooFast: the form sends the time it was opened (startedAt); posts sent
 *   under MIN_FILL_MS after that are scripted.
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const MIN_FILL_MS = 2500;

export const FIELD_LIMITS: Record<string, number> = {
  name: 120,
  email: 254,
  phone: 40,
  subject: 120,
  message: 5000,
  type: 60,
};

export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** The first field over its limit, or null when all fit. */
export function oversizedField(data: Record<string, unknown>): string | null {
  for (const [key, max] of Object.entries(FIELD_LIMITS)) {
    const v = data[key];
    if (v != null && (typeof v !== 'string' || v.length > max)) return key;
  }
  return null;
}

const hits = new Map<string, number[]>();

export function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

export function rateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    hits.forEach((v, k) => { if (now - v[v.length - 1] >= RATE_WINDOW_MS) hits.delete(k); });
  }
  return recent.length > RATE_MAX;
}

export function tooFast(startedAt: unknown, now = Date.now()): boolean {
  const t = Number(startedAt);
  return !Number.isFinite(t) || now - t < MIN_FILL_MS;
}
