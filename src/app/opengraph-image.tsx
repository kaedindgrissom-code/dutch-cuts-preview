import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { shop } from "@/data/shop";

export const alt = "Dutch Cuts — Barbershop, Savannah GA";
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const lockup = await readFile(join(process.cwd(), "public", "brand", "lockup-h-ink.png"));
  const lockupSrc = `data:image/png;base64,${lockup.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#F4F1EA",
          color: "#141A17",
          fontFamily: "Arial Narrow, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#6B716D" }}>
          {shop.address.city}, {shop.address.region} · {shop.address.street}
        </div>
        {/* the owner's logo, not a typeset stand-in */}
        <img src={lockupSrc} alt="" style={{ height: 200, width: Math.round((2019 / 378) * 200) }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "2px solid #A89C94", paddingTop: 20 }}>
          <div style={{ fontSize: 30, color: "#3E4542", fontFamily: "Georgia, serif" }}>Modern fades and blends on Bee Road.</div>
          <div style={{ fontSize: 22, color: "#4F5F4C" }}>4.99 from 564 Booksy reviews</div>
        </div>
      </div>
    ),
    size,
  );
}
