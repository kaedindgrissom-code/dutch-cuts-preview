# Go-live kit — Vercel (≈15 minutes, one person)

Everything the build needs is in the repo now: source, lockfile, photos (`public/`), favicon, logo assets. No local setup is required before deploying.

## 1. Import (Vercel dashboard → Add New → Project)

| Setting | Value |
|---|---|
| Git repository | `kaedindgrissom-code/dutch-cuts`, branch `main` |
| Framework preset | Next.js (auto-detected) |
| Root directory | `/` (leave default) |
| Build command | `pnpm build` (default) |
| Install command | `pnpm install --frozen-lockfile` (default is fine; lockfile is committed) |
| Node version | 22 (Project Settings → General → Node.js Version) |
| Plan | Pro (the BookedIQ team plan — needed for the commercial-use terms and the team ownership/transfer model we chose) |

## 2. Environment variables (Project Settings → Environment Variables, all environments)

| Name | Value | Why |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://dutchcuts.com` (or the domain Dutch picks) | Canonical URLs, sitemap, OG image, JSON-LD. Use the final domain, not the `*.vercel.app` URL. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `dutchcuts.com` — only after a Plausible site exists | Turns analytics on; events are no-ops until set. |
| `NEXT_PUBLIC_BOOKSY_WIDGET_SRC` | leave unset | Optional Booksy widget; links work without it. |

Do **not** set `NEXT_PUBLIC_PREVIEW` or `STATIC_EXPORT` — those are for the GitHub Pages preview only. Without them the production build is indexable and serves the security headers.

## 3. Domain

Add the domain in Vercel (Project → Domains) and point DNS as Vercel instructs (A `76.76.21.21` for the apex, CNAME `cname.vercel-dns.com` for `www`). `dutchcuts.com` is registered but on *client hold* — owner must clear it with the registrar first, or register `dutchcutssavannah.com` (checked available on 2026-10-07). HSTS preload is already in the headers; keep `www` redirecting to the apex (Vercel default).

## 4. After the first deploy (five minutes, from any machine)

```bash
git clone git@github.com:kaedindgrissom-code/dutch-cuts.git && cd dutch-cuts
node scripts/smoke.mjs https://dutchcuts.com          # pages, canonicals, headers, claims, every link, Booksy IDs
pnpm install && node scripts/lighthouse-ci.mjs https://dutchcuts.com   # perf ≥90, a11y 100, BP ≥95, SEO 100, CLS ≤0.05
```

Then set the GitHub repository variable `SITE_URL` to the live URL (Settings → Secrets and variables → Actions → Variables) so `weekly-smoke` checks the real site every Monday. That workflow is the binding performance gate; the in-CI Lighthouse run is advisory.

## 5. Hand-offs still owned by Dutch Cuts

- Google Business Profile: change the website field from `dutchcuts.booksy.com` to the new domain.
- Instagram/Facebook/TikTok bios: same link swap.
- Answer the open questions in `HANDOFF.md` (canonical IG handle, hours of record, a proper headshot for Dutch, which logo tagline).

## 6. Rollback

Vercel keeps every deployment: Project → Deployments → previous build → "Promote to Production". Nothing is stateful; there is no database.
