import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "WingKiwi — All-Inclusive New Zealand Journeys for Indian Travelers";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1D3A 0%, #122A52 50%, #0B1D3A 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative top line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #E8913A, transparent)",
          }}
        />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
          <span style={{ fontSize: 96, fontWeight: 800, color: "#fff" }}>Wing</span>
          <span style={{ fontSize: 96, fontWeight: 800, color: "#E8913A" }}>Kiwi</span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.8)",
            marginTop: 16,
            fontStyle: "italic",
          }}
        >
          Your Travel &amp; Experience Partner in New Zealand
        </p>

        {/* Description line */}
        <p
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.5)",
            marginTop: 24,
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          All-inclusive journeys from India · Flights · Luxury Stays · Hindi Guides · Starting ₹3,50,000
        </p>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            display: "flex",
            gap: 24,
            fontSize: 16,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          <span>wingkiwi.com</span>
          <span>·</span>
          <span>10 Days All-Inclusive</span>
          <span>·</span>
          <span>India → New Zealand</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
