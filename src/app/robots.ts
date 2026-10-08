import type { MetadataRoute } from "next";
import { shop } from "@/data/shop";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const base = shop.url.replace(/\/$/, "");
  if (process.env.NEXT_PUBLIC_PREVIEW === "1") return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
