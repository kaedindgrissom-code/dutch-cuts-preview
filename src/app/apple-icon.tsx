import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#141A17", color: "#F4F1EA", fontSize: 96, fontWeight: 800, fontFamily: "Arial Narrow, Arial, sans-serif", letterSpacing: -4 }}>
        DC
      </div>
    ),
    size,
  );
}
