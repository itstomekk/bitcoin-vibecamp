// Shared helpers for Pages Functions.
export interface Env {
  DB: D1Database;
  // Shared key for writes to /api/content (Pages secret). Reads are public.
  CONTENT_API_KEY?: string;
  // Optional: new-signup Nostr DM (bot key is a Pages secret, recipient is a plain var in wrangler.toml).
  NOSTR_NOTIFY_SK_HEX?: string;
  NOSTR_NOTIFY_TO_HEX?: string;
  NOSTR_RELAYS?: string;
}

export const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': 'authorization, x-api-key, content-type',
  'access-control-allow-methods': 'GET, PUT, POST, DELETE, OPTIONS',
};

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
