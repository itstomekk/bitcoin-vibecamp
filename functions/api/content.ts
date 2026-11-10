/**
 * /api/content: editable site copy (replaces the Lovable `content` edge function).
 *
 *   GET                       public. {items: [{key, value, updated_at}]}; the site reads this on load.
 *   GET ?key=faq.vibecamp     public. One block, 404 when the site uses the code default.
 *   GET ?schema=1             key required. Every editable key, its shape and its code default.
 *   PUT {key, value} | {items: [...]}   key required. Upsert. Object values are shallow-merged by the site.
 *   PUT ?seed=1 | ?seed=missing         key required. Store the code defaults for all / missing keys.
 *   DELETE ?key=...           key required. Remove a block; the site falls back to the code default.
 *
 * Auth for writes: header `x-api-key: <CONTENT_API_KEY>` (or `Authorization: Bearer <key>`).
 */
import DEFAULTS from '../../server/content-defaults.json';
import { CORS, json, type Env } from '../../server/lib';

const SCHEMA: Record<string, { shape: 'object' | 'array of { q, a }'; describes: string }> = {
  'about.copy': { shape: 'object', describes: 'All text on the /about page. Strings support **bold** and [label](url).' },
  'faq.vibecamp': { shape: 'array of { q, a }', describes: 'Vibecamp FAQ. First 4 show on the home page, all on /about.' },
  'faq.prospera': { shape: 'array of { q, a }', describes: 'Próspera & Roatán FAQ. Same rules as faq.vibecamp.' },
  'home.hero': { shape: 'object', describes: 'Landing-page hero, CTA buttons, waitlist form labels, mission lines.' },
  'home.schedule': { shape: 'object', describes: 'Program section and the agenda on /about.' },
  'home.stats': { shape: 'object', describes: 'Stats strip under the hero: { stats: [{ number, label, emoji }] }.' },
  'home.tickets': { shape: 'object', describes: 'Tickets section and the invite-a-friend form labels.' },
  'home.whatisit': { shape: 'object', describes: "'What is Vibecamp' section text and facts." },
  'home.whyprospera': { shape: 'object', describes: 'Location section text, links and cards.' },
  'home.friends': { shape: 'object', describes: 'Friends section text and links (logos are code assets).' },
  'site.nav': { shape: 'object', describes: 'Navbar: logoAlt and items [{ label, id }].' },
  'site.footer': { shape: 'object', describes: 'Footer text and links.' },
  'site.meta': { shape: 'object', describes: 'Head metadata applied at runtime (title, description, og*, twitter*, JSON-LD).' },
};
const all = DEFAULTS as Record<string, unknown>;

const isQaList = (v: unknown) =>
  Array.isArray(v) &&
  v.length > 0 &&
  v.every((i) => i && typeof i === 'object' && typeof (i as { q?: unknown }).q === 'string' && typeof (i as { a?: unknown }).a === 'string');

const validate = (key: string, value: unknown): string | null => {
  if (!(key in SCHEMA)) return `unknown key "${key}". Call GET ?schema=1 for the list.`;
  if (SCHEMA[key].shape === 'object') {
    return !value || typeof value !== 'object' || Array.isArray(value) ? `${key} must be a JSON object` : null;
  }
  return isQaList(value) ? null : `${key} must be a non-empty array of { q, a } objects`;
};

function authorized(request: Request, env: Env): boolean {
  const provided = request.headers.get('x-api-key') ?? (request.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  const expected = env.CONTENT_API_KEY;
  if (!expected || !provided || provided.length !== expected.length) return false;
  let d = 0;
  for (let i = 0; i < expected.length; i++) d |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  return d === 0;
}

type Row = { key: string; value: string; updated_at: string };
const parse = (r: Row) => ({ key: r.key, value: JSON.parse(r.value), updated_at: r.updated_at });

async function upsert(env: Env, rows: { key: string; value: unknown }[]) {
  const now = new Date().toISOString();
  await env.DB.batch(
    rows.map((r) =>
      env.DB.prepare(
        'INSERT INTO site_content (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at',
      ).bind(r.key, JSON.stringify(r.value), now),
    ),
  );
  return rows.map((r) => ({ key: r.key, value: r.value, updated_at: now }));
}

export const onRequestOptions: PagesFunction<Env> = async () => new Response(null, { headers: CORS });

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const h = CORS;
  const deny = () => json({ error: 'unauthorized: send header x-api-key: <CONTENT_API_KEY>' }, 401, h);
  try {
    if (request.method === 'GET' && url.searchParams.get('schema')) {
      if (!authorized(request, env)) return deny();
      const keys = Object.fromEntries(
        Object.entries(SCHEMA).map(([key, spec]) => {
          const def = all[key];
          return [key, { ...spec, fields: Array.isArray(def) ? undefined : Object.keys((def ?? {}) as object), default: def }];
        }),
      );
      return json({ usage: 'See the comment at the top of functions/api/content.ts', keys }, 200, h);
    }
    if (request.method === 'GET') {
      const key = url.searchParams.get('key');
      if (key) {
        const r = await env.DB.prepare('SELECT key, value, updated_at FROM site_content WHERE key = ?').bind(key).first<Row>();
        return r ? json(parse(r), 200, h) : json({ error: `no stored value for "${key}" (site is using code defaults)` }, 404, h);
      }
      const { results } = await env.DB.prepare('SELECT key, value, updated_at FROM site_content ORDER BY key').all<Row>();
      return json({ items: results.map(parse) }, 200, { ...h, 'cache-control': 'public, max-age=30' });
    }
    if (!authorized(request, env)) return deny();
    if (request.method === 'PUT' || request.method === 'POST' || request.method === 'PATCH') {
      const seed = url.searchParams.get('seed');
      if (seed) {
        const existing =
          seed === 'missing'
            ? new Set((await env.DB.prepare('SELECT key FROM site_content').all<{ key: string }>()).results.map((r) => r.key))
            : new Set<string>();
        const rows = Object.keys(SCHEMA)
          .filter((k) => !existing.has(k) && all[k] !== undefined)
          .map((k) => ({ key: k, value: all[k] }));
        if (!rows.length) return json({ seeded: [], note: 'nothing to seed' }, 200, h);
        await upsert(env, rows);
        return json({ seeded: rows.map((r) => r.key) }, 200, h);
      }
      let body: { key?: unknown; value?: unknown; items?: { key?: unknown; value?: unknown }[] };
      try {
        body = await request.json();
      } catch {
        return json({ error: 'body must be valid JSON' }, 400, h);
      }
      const items = Array.isArray(body.items) ? body.items : [{ key: body.key, value: body.value }];
      if (!items.length) return json({ error: 'send {"key","value"} or {"items":[...]}' }, 400, h);
      const rows: { key: string; value: unknown }[] = [];
      for (const item of items) {
        if (!item || typeof item.key !== 'string') return json({ error: 'each item needs a string key' }, 400, h);
        const problem = validate(item.key, item.value);
        if (problem) return json({ error: problem }, 400, h);
        rows.push({ key: item.key, value: item.value });
      }
      return json({ updated: await upsert(env, rows) }, 200, h);
    }
    if (request.method === 'DELETE') {
      const key = url.searchParams.get('key');
      if (!key) return json({ error: 'pass ?key=<key> to delete' }, 400, h);
      if (!(key in SCHEMA)) return json({ error: `unknown key "${key}"` }, 400, h);
      await env.DB.prepare('DELETE FROM site_content WHERE key = ?').bind(key).run();
      return json({ deleted: key, note: 'the site now renders the built-in default for this key' }, 200, h);
    }
    return json({ error: `method ${request.method} not supported` }, 405, h);
  } catch (e) {
    console.error('content api error', String(e));
    return json({ error: 'unexpected error' }, 500, h);
  }
};
