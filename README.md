# Bitcoin Vibecamp

Website of Bitcoin Vibecamp: a six-day builder bootcamp in Próspera, Roatán (Honduras), where you learn to build
software with AI. Organised by Bitcoin District and friends.

Live: https://bitcoinvibe.camp

## How it works

- **Frontend:** Vite + React + TypeScript + Tailwind (shadcn/ui). Pages: `/` and `/about`.
- **Editable copy:** every text block has a code default in `src/data/*.ts`. A stored block in the `site_content`
  table overrides it (shallow merge), so the copy can be changed through the API without a deploy. If the API is
  down, the site renders the code defaults.
- **Backend:** [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) in `functions/api/`,
  backed by a [D1](https://developers.cloudflare.com/d1/) (SQLite) database. Schema: `db/schema.sql`.
- **Hosting:** Cloudflare Pages. GitHub Pages serves static files only, and the waitlist form needs a server and a
  database.

| Route | What it does |
|---|---|
| `POST /api/waitlist` | `{email}`. 201 new, 200 `{already: true}` duplicate, 422 invalid. New signups send the organiser a Nostr DM. |
| `GET /api/content` | Public. All stored copy blocks `{items: [{key, value, updated_at}]}`; `?key=` for one. |
| `GET /api/content?schema=1` | Key required. Every editable key, its shape and its code default. |
| `PUT /api/content` | Key required. `{key, value}` or `{items: [...]}`; `?seed=1` / `?seed=missing` stores the defaults. |
| `DELETE /api/content?key=` | Key required. Removes a block; the site falls back to the code default. |

Writes need the header `x-api-key: <CONTENT_API_KEY>`.

After changing a default in `src/data/*.ts`, regenerate `server/content-defaults.json` with
`npx tsx scripts/generate-content-defaults.ts`.

## Develop

```bash
npm ci
npm run dev        # http://localhost:8080 (frontend only; copy falls back to code defaults)
npm test
npm run build      # output in dist/
npx wrangler@4 d1 execute bitcoin-vibecamp --local --file db/schema.sql
npx wrangler@4 pages dev dist   # frontend + functions with a local D1
```

## Deploy

Every push to `main` runs the tests, builds and deploys through GitHub Actions (`.github/workflows/deploy.yml`).
The Cloudflare credentials are repository secrets.

Manual deploy, with `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your environment (never commit them):

```bash
npm run build
npx wrangler@4 pages deploy dist --project-name bitcoin-vibecamp --branch main
```

### Configuration

| Name | Where | Purpose |
|---|---|---|
| `DB` | `wrangler.toml` | D1 binding |
| `CONTENT_API_KEY` | Pages secret | Write key for `/api/content` |
| `NOSTR_NOTIFY_SK_HEX` | Pages secret, optional | Bot key that sends waitlist DMs |
| `NOSTR_NOTIFY_TO_HEX` | `wrangler.toml` | Recipient public key (hex) |

## License

MIT, see `LICENSE`. Photos and logos belong to their owners.
