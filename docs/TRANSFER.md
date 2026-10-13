# Buyout — handing the site to the client (no GitHub, no technical skill needed)

What "owning a website" means for a small business is the same thing it means at every agency: **the domain is in their name, they hold a copy of the files, and the site is running somewhere they control (or somewhere they pay for by choice).** Nobody expects a barber to have a GitHub account, and this site never requires one.

## The simple path (what we actually do at buyout)

1. **Domain in their name — already true if we followed the rule below.** The domain is the only asset that is slow to move, so it is registered in the client's name from day one. Nothing to do at buyout.
2. **Give them the files.** Two zips in a shared Google Drive folder, plus a USB if they like:
   - `dutch-cuts-source.zip` — the whole repo (code, photos, docs). Any web developer they ever hire can work from this.
   - `dutch-cuts-site.zip` — the built, ready-to-upload site (`STATIC_EXPORT=1 pnpm build` → the `out/` folder). This runs on **any** static host with a drag-and-drop upload (Netlify Drop, Cloudflare Pages, or a plain cPanel host) — no Git, no build tools.
3. **Put the live site in an account under their email.** On a 20-minute call: they sign up to Vercel (or Netlify) with their email — no GitHub — and we move the project to them. On Vercel, Project → Settings → Transfer Project moves deployments, domain and settings with zero downtime ([Vercel docs](https://vercel.com/docs/projects/transferring-projects)); if the transfer flow asks for a team, create one in the flow, add their email as Owner, then remove ourselves. Alternative that needs no transfer at all: upload `dutch-cuts-site.zip` to Netlify Drop from their account and point the domain at it.
4. **Remove BookedIQ** from their hosting account and analytics, then run `node scripts/smoke.mjs https://<domain>` to prove the site is healthy on their side.

Or — the option most clients take — **they keep paying BookedIQ a flat hosting fee** and simply hold the domain and the two zips. That is ownership too; they can walk away any day with no rebuild.

## How other companies handle it (for reference)
- **Squarespace / Wix / Webflow agencies:** site lives on the platform; agency "transfers site ownership" to the client's platform login. Easy, but the client is locked to that platform forever and pays its subscription.
- **WordPress agencies:** hand over hosting login + a backup file. Works, but the client inherits updates, plugins and security.
- **Custom-code agencies (us):** domain in client's name + source files + hosting moved or re-hosted. Most portable; the static build is what makes it painless here.

## Rules that keep a buyout clean (apply now, every client)
- One client, one repo, one hosting project. Never shared.
- Register the domain in the client's name even while BookedIQ manages it.
- No BookedIQ secrets in the code or env vars (analytics key is client-specific).
- Keep `STATIC_EXPORT=1` working so the "site in a folder" deliverable always builds.
- Contract clause (draft, have counsel review): on payment of the buyout fee, BookedIQ assigns all rights in the site's code, design and content to the client; photos remain the client's property throughout; BookedIQ retains the right to reuse generic, non-client-specific components (layout system, test harness, scripts) in other work.

## Buyout checklist
1. Domain confirmed in client's registrar account.
2. `dutch-cuts-source.zip` + `dutch-cuts-site.zip` delivered (Drive + USB).
3. Live site in the client's own hosting account, verified with the smoke check.
4. Analytics transferred or exported.
5. 15-minute walkthrough; BookedIQ access removed.
