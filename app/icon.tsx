import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e0f11",
          color: "#faf9f6",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          fontFamily: "Helvetica, Arial, sans-serif",
          position: "relative",
        }}
      >
        HM
        <div
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            width: 9,
            height: 9,
            borderRadius: 999,
            backgroundColor: "#1d3bf0",
          }}
        />
      </div>
    ),
    size,
  );
}
