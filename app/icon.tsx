import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0c0c0c",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#c8a165",
            fontSize: 20,
            fontWeight: 800,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          W
        </span>
      </div>
    ),
    { ...size }
  );
}
