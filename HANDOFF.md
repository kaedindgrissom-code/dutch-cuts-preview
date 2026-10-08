# HANDOFF — Dutch Cuts website (release candidate 1)

Date: 2026-10-08 · Built by BookedIQ (Claude Cowork session) · Status: **prospect pitch build, QA-clean, pushed to GitHub, awaiting Vercel import + owner assets**

## Production

| Item | Value |
|---|---|
| Repository | https://github.com/kaedindgrissom-code/dutch-cuts (private, created 2026-10-08) |
| Canonical branch | `main` |
| Commits | 8 commits on `main` pushed 2026-10-08 via the GitHub API in batches; every source blob verified byte-for-byte against the local build (`git hash-object`). Latest content commit `5f37347`; this HANDOFF is the commit after it. `pnpm-lock.yaml` is **not** in the repo (sandbox transfer limit) — Vercel resolves from `package.json` ranges; run `pnpm install` locally and commit the lockfile on first clone. |
| Deployment | Not yet. Vercel import of the repo is one click once pushed; no root-directory setting needed |
| Build status | `pnpm build` ✓ (Next 16.4, 16 static routes) |
| Figma | https://www.figma.com/design/WfAHplrAEbLTg6E11FeI38 — tokens, 8 screens (home desktop + mobile, barbers, barber profile, gallery, services, visit, booking chooser) |

## Website

Routes: `/` · `/barbers` · `/barbers/dutch-claybaugh` · `/barbers/brian-meyer` · `/barbers/eric-rodriguez` · `/services` · `/gallery` · `/visit` · `/sitemap.xml` · `/robots.txt` · `/opengraph-image` · `/kb.json` · 404.

Key design decisions ("Grey Brick", see DESIGN.md): paper/ink editorial palette from Savannah materials, Archivo condensed display + Source Serif 4 text, hairlines not cards, one interaction accent, placeholders are typographic mats (no stock), motion limited to sheet/menu/dialog with reduced-motion honored, mobile sticky Book/Call bar after first viewport.

Booksy implementation: Shared Location confirmed from Booksy page payloads → three barber-specific deep links everywhere; shop-level "Book a cut" opens an on-domain chooser (native `<dialog>`, focus-trapped). No availability shown or cached. Widget slot ready via `NEXT_PUBLIC_BOOKSY_WIDGET_SRC`.

SEO: per-page metadata + canonical + OG/Twitter, `BarberShop` JSON-LD with address/geo/union hours/sameAs/employees, `Person` + `Offer` JSON-LD per barber, `BreadcrumbList`, sitemap, robots, SVG favicon + generated apple icon + OG image. `aggregateRating` deliberately omitted (third-party reviews don't meet Google's first-party requirement).

Analytics: Plausible (cookieless, no banner) behind `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; events `book_now_click, chooser_open, barber_view, barber_book_click, phone_click, directions_click, social_click, gallery_engagement, service_view`, no-op until the domain is set.

## Team research (research/TEAM_RESEARCH.md)

Confirmed active (all VERIFIED from Booksy on 2026-10-07): Dutch Claybaugh / "Dutch Francisco" (owner, 4.99 · 382), Brian Meyer / "Brian Blends" (4.99 · 144), Eric Rodriguez / "Rod Fayde" (5.0 · 38). Umbrella venue 1356030 lists exactly these three contractors; no fourth barber anywhere.

Unresolved for the owner: canonical Instagram (@dutchcuts vs @dutch_cuts) · hours of record (three conflicting sets; site shows per-barber hours) · ownership of dutchcuts.com (registered, on hold) · Savannah Bananas claim permission · whether 912-508-6202 is the shop line · Rod's cancellation fee amount · LaCors (same address) not part of shop?

Assets still wanted (research/ASSET_REQUIREMENTS.md): logo vector (a raster logo is in use), an exterior/storefront photo, optional vertical video. Photos now in use are the barbers' Booksy uploads, approved 2026-10-08.

## QA

| Check | Result |
|---|---|
| TypeScript (strict) | ✓ clean |
| ESLint (next core-web-vitals + react-hooks) | ✓ clean |
| Build | ✓ 16/16 routes static |
| Playwright (tests/site.spec.ts + tests/quality.spec.ts) | ✓ 62 passed mobile + desktop in the final run (full 5-device suite 129 passed earlier); quality suite runs once on desktop |
| axe (WCAG 2.1 AA tags) | ✓ 0 serious/critical on every route × every device |
| Lighthouse mobile (simulated 4G, Moto G class) | `/` 96 / 100 / 100 / 100 · `/barbers/brian-meyer` 93 / 100 / 100 / 100 · `/services` 93 / 100 / 100 / 100 · CLS 0 on all |
| Console / hydration | clean on all routes, both form factors |
| Screenshots | qa/screenshots (desktop + mobile, every route, chooser, menu) reviewed |
| Chrome DevTools trace | not run (MCP not connected); Lighthouse diagnostics used instead — LCP 2.9–3.2s is font + hero placeholder; real hero image will need `priority` + AVIF, already wired through `next/image` |

Fixes made during QA: contrast tokens darkened (ink-3 → #575D5A, haint-deep → #4A6E6C; axe AA on paper and paper-2), hidden bottom bar switched from `aria-hidden` to `inert`, unknown barber slugs made static 404s, barber-page h1 tablet overflow (3px) removed, Dutch "from" price bug (design add-on leaking into minimum) fixed, OG image glyph crash fixed.

## Owner actions (only what Dutch Cuts must supply or authorize)

1. Assets listed above.
2. Answer the seven unresolved questions.
3. Domain decision (clear the hold on dutchcuts.com, or register dutchcutssavannah.com — both checked available).
4. Google Business Profile manager access (to repoint the website field and verify Reserve with Google).
5. Booksy website widget code (optional).
6. For phase two: EIN for 10DLC, approve call forwarding.

## BookedIQ (docs/BOOKEDIQ_PHASE2.md)

V1: shop line → Twilio (A2P) → Retell Conversation Flow (FAQ, barber routing, in-call SMS link, warm transfer, post-call analysis) → Supabase logging; missed-call text-back via Twilio status callback edge function; **no n8n required**. Booksy API: not public — link-based V1, provider adapter isolates it. KB auto-refreshes from `/kb.json`. SMS templates, transfer design, analysis fields, monthly ops (docs/MONTHLY_OPERATIONS.md) all specified. Next step: build the Retell agent from the barbershop template and batch-simulate.

## Photos (approved by Dutch Cuts 2026-10-08)

Live on the site: the real logo, interior shots for the hero and Visit page, headshots for all three barbers, and 20 haircut tiles tagged by cut type — all the barbers' own Booksy uploads, cropped to the design-system ratios. Provenance per image is in `scripts/photos.json`; the gallery entries carry it in `source`. With photos in, mobile Lighthouse on `/` is 97 / 100 / 100 / 100, LCP 2.2 s, and the 52-test mobile+desktop suite passes.

The image files themselves could not leave the sandbox (binary transfer refused), so the repo ships `scripts/fetch-photos.py` instead: after cloning, `pip install pillow requests && python3 scripts/fetch-photos.py` recreates `public/` byte-for-byte from the approved sources (verified in a clean directory), then commit `public/`. Vercel's build does not run it — commit the images once. The same script derives the logo assets (`public/brand/mark-*.png`, `wordmark-*.png`, `lockup-*.png`, `lockup-h-*.png`, in ink and paper) from the owner's Booksy logo and writes the favicon `src/app/icon.png`; the `<Logo>` component (`src/components/site/Logo.tsx`) is the only way the logo is placed — nav, mobile menu, hero stamp, final CTA, footer, Open Graph image and Apple touch icon.

## Release standard (added 2026-10-08)

The site now carries the BookedIQ website release standard — `docs/WEBSITE_QA_CHECKLIST.md`, 20 checks distilled from the bookediq.net audits. New in the repo: claims gate on the build output (`pnpm claims`), `tests/quality.spec.ts` (analytics proven inert and proven to fire, sitemap/canonical hygiene, unique metadata, og:image, image dimensions, headers, JSON-LD, llms.txt, Booksy IDs), `scripts/smoke.mjs` (post-deploy live crawl incl. every external link), `scripts/lighthouse-ci.mjs` (budgets), `/llms.txt`, HSTS + immutable photo caching, flag-gated held content (`src/config/claims.ts`), GitHub Actions CI on every push and a weekly live smoke. Bugs the new tests caught and fixed: every page except home shipped without `og:image`; titles doubled the site name ("Barbers · Dutch Cuts · Dutch Cuts"); five descriptions were 190–204 chars. Current: 62 Playwright tests green (mobile + desktop), Lighthouse 93/100/100/100 with CLS 0 on all three gated routes, smoke OK against the local build (Booksy IDs resolve).

## UI/UX revision 2 (2026-10-08)

Screenshot critique → full redesign pass, founder-approved and shipped: face-aware 4:5 photo crops (`scripts/crop-plan.py`), statement hero with trust strip, comparable barber roster (compact rows on phones, 3-up from tablet), service × barber price matrix, one spacing scale, teal accent for focus/hover/eyebrows, restrained motion (reveal, nav condense, navigation-only page rise), serif font trimmed to one weight. Details and rules in DESIGN.md "Revision 2". Verified: 139 Playwright tests on 5 devices, axe clean, Lighthouse mobile 93–98 perf / 100 a11y+SEO, claims gate OK. Live on the review preview: https://kaedindgrissom-code.github.io/dutch-cuts-preview/ (noindex; public mirror repo `dutch-cuts-preview` rebuilds on push).

## Revision 2.1 — alignment, mobile, logo, facts (2026-10-08)

Mobile pass: hero shows the whole room on phones (5:6, no top crop), barber-page price table no longer overflows at 320px, work-tile captions sit under the photo on touch devices instead of covering the cut (hover-reveal kept on pointer devices), hero facts and section headers no longer wrap awkwardly. The owner's real logo now runs through the site (see Photos above). Facts re-audited against `research/TEAM_RESEARCH.md`; four over-reaches softened (Dutch's Hawaii line, "never rushed" applied to all three, Brian's kids inference, "near Skidaway Rd"). CI: lockfile committed, `typecheck` runs `next typegen` first; the Lighthouse perf budget is the one red step on shared runners (score tracks runner CPU — 60 on the GitHub runner vs 93–98 on a fast host for the same build).

## Next step

Import the repo in Vercel (one click, no root-directory setting), set `NEXT_PUBLIC_SITE_URL`, and the preview URL exists. Everything else is release-candidate ready.

## Risks

- Prices and hours drift (changed May→Oct 2026) — monthly validation is the mitigation.
- Three conflicting shop-hours sources; site sidesteps by showing per-barber hours, but GBP should match before launch.
- Photo files live only locally until `scripts/fetch-photos.py` is run and `public/` committed; until then the deployed site shows the typographic placeholders.
- The Bananas claim is unverified; not on the site.
- `pnpm-lock.yaml` is in the local commit; if the repo is populated without it, Vercel will resolve from `package.json` ranges (safe, slightly less reproducible).
