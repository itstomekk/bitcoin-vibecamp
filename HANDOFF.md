# HANDOFF: Bitcoin Vibecamp

## Status (2026-11-09)

- Migrated from Lovable (project `6f23de8e-78d0-4d2b-8f4e-09cb4eb63b58`) to Cloudflare Pages + D1.
  Test URL: https://bitcoin-vibecamp.pages.dev. Repo: https://github.com/itstomekk/bitcoin-vibecamp (public, MIT).
  Push to `main` runs tests, builds and deploys (first Actions run green).
- **Not on the real domain yet.** `bitcoinvibe.camp` is still the cPanel PHP proxy to `bitcoinvibecamp.lovable.app`.
- Code re-exported 2026-11-09, so it includes the GoatCounter (`btcvibecamp`) and per-route SEO edits made in Lovable.

## What changed from the Lovable version

- Waitlist forms (`Hero.tsx`, `TicketsBanner.tsx`) post to `/api/waitlist`. New signups send Tomek a Nostr DM
  (same bot key as bitcoinroatan.info). Lovable sent no notification.
- Editable copy: `/api/content` replaces the `content` edge function with the same keys, validation and seed
  options. Reads are now public through the API (the site used to read the table directly). Write key: Pages secret
  `CONTENT_API_KEY`, copy in `C:\Users\Lenovo\.secrets\bitcoin-vibecamp-content-api-key.txt` (Lovable's key is
  not readable). `site_content` was empty on Lovable, so the site shows the code defaults, same as before.
- Dropped: the Lovable MCP server, `/login` and the OAuth consent page (0 auth users, Lovable-only auth), `faqs`
  table (8 rows, not read by the code; the FAQ lives in `src/data/faq.ts`), `user_roles` (empty), Lovable playwright
  config.
- `bg-video.mp4` re-encoded from 26.6 MB to 8.2 MB (720p, no audio track; the video plays muted). The 26.6 MB
  original exceeds the 25 MiB Pages file limit; it is kept in `../lovable-migration/export/bitcoin-vibecamp/originals/`.
- `src/assets/logo-white.png` not recovered (not used anywhere).

## Data

- D1 `bitcoin-vibecamp` (id `10e445ea-9b26-4788-93b7-bee93c8ca27c`): `waitlist` 70 rows (latest 2026-10-25), same count as Lovable on 2026-11-09.
  Export: `npx --yes wrangler@4 d1 execute bitcoin-vibecamp --remote --json --command "select email, created_at from waitlist order by created_at"`

## Verified (2026-11-09)

- `/`, `/about`, video, OG image, favicon, sitemap, llms.txt: 200. Firefox screenshots vs the live site
  (`../lovable-migration/qa/bitcoin-vibecamp/`): /about identical, home differs only in the video frame and countdown.
  No console errors on the new site.
- `/api/waitlist` 422/201/200, test row deleted (70). `/api/content`: public read, 401 without key, 400 on a bad
  value, write/read/delete round trip.
- pages.dev copy sends `X-Robots-Tag: noindex` (`public/_headers`).

## Domain cutover (needs Tomek's yes)

The domain's DNS is at Smarthost and `public_html/bitcoinvibecamp` also serves `/x/` (Olympics dashboard),
`/.well-known/` (NIP-05), `robots.txt`, `index.md`, `about.md`. Two options:

1. **Proxy swap (smallest change):** in `public_html/bitcoinvibecamp/index.php` set `$target` and the `Host:` header
   to `bitcoin-vibecamp.pages.dev`, and add `'x-robots-tag'` to `$skip`; otherwise the pages.dev noindex header is
   forwarded and the real domain drops out of Google. Keeps `/x/` and NIP-05 on the host. Use the FTPS snapshot /
   probe procedure in the `bitcoinvibe-camp-site` skill.
2. **Full move:** zone to Cloudflare, move `/x/` and `.well-known` into the repo first.

Then re-copy any new waitlist rows from Lovable, verify, and unpublish Lovable after 2 weeks.
