import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "WingKiwi — All-Inclusive New Zealand Journeys for Indian Travelers";

export default function TwitterImage() {
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
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontSize: 96, fontWeight: 800, color: "#fff" }}>Wing</span>
          <span style={{ fontSize: 96, fontWeight: 800, color: "#E8913A" }}>Kiwi</span>
        </div>
        <p style={{ fontSize: 32, color: "rgba(255,255,255,0.8)", marginTop: 16, fontStyle: "italic" }}>
          Your Travel &amp; Experience Partner in New Zealand
        </p>
        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", marginTop: 20 }}>
          All-inclusive journeys from India · Starting ₹3,50,000
        </p>
      </div>
    ),
    { ...size }
  );
}
