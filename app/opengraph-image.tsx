import { ImageResponse } from "next/og";

export const alt =
  "Hello Machine — we design and build the systems ambitious companies actually run on.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#faf9f6",
          padding: "72px 80px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0e0f11",
            }}
          >
            Hello Machine
          </span>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#1d3bf0",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.02,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            color: "#0e0f11",
            maxWidth: 940,
          }}
        >
          We design and build the systems ambitious companies actually run on.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e3e0d8",
            paddingTop: 28,
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#7b7e85",
          }}
        >
          <span>Design-led technology studio</span>
          <span>Strategy · Websites · AI · Automation</span>
        </div>
      </div>
    ),
    size,
  );
}
