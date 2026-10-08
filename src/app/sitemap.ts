import type { MetadataRoute } from "next";
import { shop } from "@/data/shop";
import { activeBarbers } from "@/data/barbers";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(shop.verifiedAt);
  const base = shop.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/barbers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...activeBarbers.map((b) => ({ url: `${base}/barbers/${b.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 })),
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/visit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
