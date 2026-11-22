import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.legalName}: solar, inverter and battery systems in Lagos`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card in the site's world: the sun's arc over a chart grid, with the promise. */
export default function OpengraphImage() {
  const arc = Array.from({ length: 61 }, (_, i) => {
    const t = i / 60;
    const x = 620 + t * 520;
    const y = 470 - Math.sin(Math.PI * t) * 300;
    return `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          color: "#14261d",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", top: 0, left: 0 }}>
          {Array.from({ length: 19 }, (_, i) => (
            <line key={`v${i}`} x1={i * 64} x2={i * 64} y1={0} y2={630} stroke="#e9ecf4" strokeWidth="1" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`h${i}`} x1={0} x2={1200} y1={i * 64} y2={i * 64} stroke="#e9ecf4" strokeWidth="1" />
          ))}
          <path d={arc} fill="none" stroke="#14261d" strokeWidth="4" />
          <line x1="600" x2="1160" y1="470" y2="470" stroke="#14261d" strokeWidth="3" />
          <rect x="600" y="490" width="140" height="34" fill="#14261d" />
          <rect x="740" y="490" width="300" height="34" fill="#f5a300" />
          <rect x="1040" y="490" width="120" height="34" fill="#14261d" />
          <circle cx="930" cy="190" r="34" fill="#f5a300" stroke="#14261d" strokeWidth="4" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px", width: "640px" }}>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{site.legalName}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em" }}>
              Power that stays on, day and night.
            </div>
            <div style={{ fontSize: 28, marginTop: 24, color: "#444b78" }}>
              Solar, inverter and battery systems · Lagos
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
