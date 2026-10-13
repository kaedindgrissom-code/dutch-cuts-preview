# Buyout — handing the site to the client (≈1 hour, zero downtime)

The site is built so a buyout is a clean hand-over of four things. Nothing is shared with other BookedIQ clients and nothing runs on BookedIQ infrastructure.

| Asset | Where it lives today | How it moves | Outcome |
|---|---|---|---|
| Code | GitHub repo `kaedindgrissom-code/dutch-cuts` (private) | Repo **Settings → Transfer ownership** to the client's GitHub account (they need a free account), or hand them a zip/export. | They own the source, history, photos, tests and docs. |
| Hosting | Vercel project on the BookedIQ Pro team | Project **Settings → General → Transfer Project** to a team the client owns (a free Hobby team works for a static site like this; they add a card only if they want Pro). Deployments, domains, env vars and the Git link move with it. ~10 minutes, no downtime. | The site keeps running on their account; they pay their own bill. |
| Domain | Registrar (client's name from day one — see below) | If already in their name: nothing. If BookedIQ registered it: initiate a registrar transfer or change the account owner. | They control DNS and renewals. |
| Accounts | Plausible analytics (if enabled), Google Business Profile | Plausible: transfer the site to their account or let them create their own and swap `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`. GBP is already theirs. | No lingering BookedIQ access. |

## Rules that keep the buyout clean (apply now, not at buyout time)
- **One client, one Vercel project, one GitHub repo.** Never share a project or a repo between clients.
- **Register the domain in the client's name** (or have them register it) even while BookedIQ manages it. A domain in BookedIQ's name is the only asset that is slow to move.
- **No BookedIQ secrets in the repo or env vars.** This site has none; keep it that way (analytics key is client-specific).
- **After transfer, remove BookedIQ from the client's team/repo** so the hand-over is complete, then run `node scripts/smoke.mjs https://<domain>` from a fresh clone to prove the site is healthy on their account.
- **Contract clause (draft, have counsel review):** on payment of the buyout fee, BookedIQ assigns all rights in the site's code, design and content to the client; photos remain the client's property throughout; BookedIQ retains the right to reuse generic, non-client-specific components (layout system, test harness, scripts) in other work.

## What the client gets handed (checklist)
1. GitHub repo ownership (or export) + this `docs/` folder.
2. Vercel project transferred, verified live on their team.
3. Domain in their registrar account.
4. Analytics account or export.
5. A 15-minute walkthrough of `docs/GO_LIVE.md` and `HANDOFF.md`.

Sources: Vercel project transfer behaviour per https://vercel.com/docs/projects/transferring-projects (what moves, zero downtime, Hobby↔Pro allowed).
