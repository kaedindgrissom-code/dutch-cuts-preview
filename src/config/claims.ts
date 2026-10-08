/**
 * Claims discipline (lesson from the bookediq.net audit, 2026-08-24: a claims rule that
 * lives in ads/social is not enforced on the website unless the website has its own gate).
 *
 * `banned` strings may never appear in rendered HTML, JSON-LD, OG text or kb.json until the
 * owner supplies written permission or measured data. `scripts/claims-check.mjs` greps the
 * production build for them and fails the build; `tests/quality.spec.ts` checks the served
 * pages. Add a string here the moment a claim is withdrawn — never rely on a copy edit.
 *
 * Allowed wording for the athletes angle: "trusted by Savannah athletes".
 */
export const bannedClaims: { pattern: RegExp; reason: string }[] = [
  { pattern: /savannah bananas/i, reason: "Bananas affiliation is self-reported; owner permission not confirmed" },
  { pattern: /official barber(shop)? of/i, reason: "affiliation claim, unverified" },
  { pattern: /#1 barber|number one|best barber(shop)? in savannah/i, reason: "superlative with no basis" },
  { pattern: /\b\d{2,3}\s?%\s?(more|increase|faster)/i, reason: "percentage result claim, unmeasured" },
  { pattern: /guarantee/i, reason: "guarantee is a contract term the owner has not set" },
  { pattern: /award[- ]winning|voted best/i, reason: "award claim, unverified" },
  { pattern: /lacors/i, reason: "LaCors shares the address; relationship unconfirmed" },
  { pattern: /aggregateRating/, reason: "third-party review totals do not meet Google's first-party requirement" },
];

/**
 * Content that exists in the codebase but must not ship until an owner decision is recorded.
 * A deploy ships the whole branch (bookediq.net incident 2026-09-07), so held content is gated
 * by a flag, never by "we just won't link to it".
 */
export const flags = {
  /** Owner has confirmed in writing that the Savannah Bananas relationship may be stated. */
  bananasPermissionGranted: false,
  /** Google Business Profile review URL supplied; shows "Leave a Google review" links. */
  googleReviewUrl: "" as string,
} as const;
