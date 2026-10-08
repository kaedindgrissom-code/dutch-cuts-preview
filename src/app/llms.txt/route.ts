import { shop } from "@/data/shop";
import { activeBarbers, fromPrice } from "@/data/barbers";
import { daysSummary, asOf } from "@/lib/hours";

export const dynamic = "force-static";

/**
 * llms.txt — a plain-text map of the site for AI assistants and answer engines
 * (same idea as bookediq.net/llms.txt). Public facts only; same source as the pages.
 */
export function GET() {
  const base = shop.url.replace(/\/$/, "");
  const lines = [
    `# ${shop.name}`,
    "",
    `> ${shop.description}`,
    "",
    `Address: ${shop.address.street}, ${shop.address.city}, ${shop.address.region} ${shop.address.postalCode}`,
    `Phone: ${shop.phoneDisplay}`,
    `Hours: ${shop.generalHoursLine}`,
    "Booking: each barber books separately on Booksy; the site never shows live availability.",
    `Prices and hours as of ${asOf(shop.verifiedAt)}.`,
    "",
    "## Pages",
    "",
    `- [Home](${base}/): brand, work, find your barber, visit`,
    `- [Barbers](${base}/barbers): pick a barber by what you need (fade, beard, kids, longer hair, house call, Sunday)`,
    ...activeBarbers.map(
      (b) =>
        `- [${b.publicName}](${base}/barbers/${b.slug}): ${b.knownFor} Cuts from $${fromPrice(b)}. ${daysSummary(b.hours)}. Book: ${b.booking.url}`,
    ),
    `- [Services](${base}/services): plain-English services and price ranges across barbers`,
    `- [Gallery](${base}/gallery): recent work, filter by barber`,
    `- [Visit](${base}/visit): directions, parking, per-barber hours, policies`,
    `- [Knowledge base JSON](${base}/kb.json): structured facts for assistants`,
    "",
    "## Optional",
    "",
    `- [Booksy shared location](${shop.booking.umbrellaUrl})`,
    shop.socials.instagram ? `- [Instagram](${shop.socials.instagram})` : "",
  ].filter((l) => l !== undefined);
  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
