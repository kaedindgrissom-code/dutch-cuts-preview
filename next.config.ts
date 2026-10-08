import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static copy for preview hosting (GitHub Pages) under
// an optional BASE_PATH (e.g. /dutch-cuts). Production on Vercel uses the default server build.
const staticExport = process.env.STATIC_EXPORT === "1";
const basePath = staticExport ? process.env.BASE_PATH || "" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticExport ? { output: "export", basePath, trailingSlash: true } : {}),
  images: staticExport
    ? { loader: "custom", loaderFile: "./src/lib/image-loader.ts" }
    : { formats: ["image/avif", "image/webp"] },
  env: staticExport ? { NEXT_PUBLIC_BASE_PATH: basePath } : {},
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    if (staticExport) return [];
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // Photos are cached for a year. Rule: a replaced photo gets a NEW filename
        // (w21.jpg, not w01.jpg overwritten) — see docs/WEBSITE_QA_CHECKLIST.md.
        source: "/:dir(barbers|work|shop|brand)/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
