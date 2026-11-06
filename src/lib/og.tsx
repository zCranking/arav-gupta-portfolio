import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { H, W, INDEX_EVERY, levels, peaks, trace } from "@/lib/terrain";

// Same display face as the site, vendored so builds need no network.
const archivo = readFileSync(join(process.cwd(), "src", "assets", "fonts", "Archivo-Condensed-800.ttf"));

export const ogSize = { width: 1200, height: 630 };

// The home map as a data-URI SVG, coarser grid to keep it light.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMaxYMid slice">${levels(peaks)
  .map((l, k) => `<path d="${trace(peaks, l, 16)}" fill="none" stroke="${(k + 1) % INDEX_EVERY ? "#b08352" : "#82592c"}" stroke-width="${(k + 1) % INDEX_EVERY ? 1.2 : 2.2}"/>`)
  .join("")}</svg>`;
const map = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

// Share card: the map on the right, the title in navy ink over paper.
export function card(title: string, sub: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f6f1", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={map} width={1300} height={630} style={{ position: "absolute", right: -100, top: 0, opacity: 0.9 }} alt="" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #f7f6f1 0%, #f7f6f1 38%, rgba(247,246,241,0.2) 75%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 72, width: 820, color: "#111b26" }}>
          <div style={{ fontSize: 30, color: "#46515c", marginBottom: 18, display: "flex" }}>Arav Gupta</div>
          <div style={{ fontFamily: "Archivo", fontSize: title.length > 28 ? 76 : 100, lineHeight: 0.98, letterSpacing: -1, display: "flex" }}>{title}</div>
          <div style={{ fontSize: 28, color: "#3b4652", marginTop: 24, lineHeight: 1.35, display: "flex" }}>{sub}</div>
        </div>
        <svg width="28" height="24" viewBox="0 0 28 24" style={{ position: "absolute", right: 64, top: 56 }}>
          <path d="M14 0L28 24H0Z" fill="#c22f2a" />
        </svg>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Archivo", data: archivo, weight: 800, style: "normal" }] },
  );
}
