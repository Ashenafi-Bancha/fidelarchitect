import { ImageResponse } from "next/og";

export const alt = "Fidelity Business Group — From Thought to Empire";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#f5f2ec",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <path d="M0 3H20.5V31.5L0 45V40.5L13.5 27.5V10.5H0Z" fill="#f5f2ec" />
            <path d="M48 3H27.5V31.5L48 45V40.5L34.5 27.5V10.5H48Z" fill="#f5f2ec" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, letterSpacing: 8, fontWeight: 700 }}>FIDELITY</div>
            <div style={{ fontSize: 16, letterSpacing: 8, opacity: 0.6 }}>BUSINESS GROUP</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>WE TURN VISION</div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>INTO LANDMARKS.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, opacity: 0.7, letterSpacing: 4 }}>
          <div style={{ display: "flex", color: "#d6c39d" }}>FROM THOUGHT TO EMPIRE</div>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ width: 16, height: 16, background: "#c8222a" }} />
            <div style={{ width: 16, height: 16, background: "#1f5c3d" }} />
            <div style={{ width: 16, height: 16, background: "#e5bf00" }} />
            <div style={{ display: "flex", marginLeft: 12 }}>ADDIS ABABA · WOLAITA SODO</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
