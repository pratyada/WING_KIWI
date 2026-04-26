import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          background: "#0B1D3A",
          borderRadius: 36,
        }}
      >
        <span style={{ fontSize: 72, fontWeight: 800, color: "#fff", fontFamily: "serif" }}>
          W
        </span>
        <span style={{ fontSize: 48, fontWeight: 800, color: "#E8913A", marginTop: -12, fontFamily: "serif" }}>
          K
        </span>
      </div>
    ),
    { ...size }
  );
}
