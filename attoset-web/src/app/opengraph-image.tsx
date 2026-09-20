import { ImageResponse } from "next/og";

export const alt = "Attoset — The Intelligent Work Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded 1200×630 social card (black canvas, white type, surgical orange).
 * Used for Open Graph and Twitter previews.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#ff512a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ color: "#fff", fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            Attoset
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            <span>The AI-powered Work</span>
            <span style={{ color: "#ff512a" }}>Operating System</span>
          </div>
          <div style={{ color: "#9a9a9a", fontSize: 30, fontWeight: 400, maxWidth: 880 }}>
            Build, manage, automate, and scale your operations in one unified platform.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
