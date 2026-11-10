import { json, type Env } from '../../server/lib';
import { nostrDM } from '../../server/nostr';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/waitlist {email} -> 201 new, 200 {already: true} duplicate, 422 invalid.
export const onRequestPost: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) return json({ ok: false, error: 'invalid_email' }, 422);
  const r = await env.DB.prepare('INSERT INTO waitlist (id, email) VALUES (?, ?) ON CONFLICT(email) DO NOTHING')
    .bind(crypto.randomUUID(), email)
    .run();
  const created = (r.meta.changes ?? 0) > 0;
  if (created) {
    waitUntil(
      env.DB.prepare('SELECT COUNT(*) AS n FROM waitlist')
        .first<{ n: number }>()
        .then((row) => nostrDM(env, `Bitcoin Vibecamp waitlist: ${email} (total now: ${row?.n ?? 0})`))
        .catch((e) => console.error('notify error', String(e))),
    );
  }
  return json({ ok: true, already: !created }, created ? 201 : 200);
};
