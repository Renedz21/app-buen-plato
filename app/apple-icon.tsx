import { ImageResponse } from "next/og";
import { logoUrl } from "@/lib/seo-config";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          overflow: "hidden",
        }}
      >
        <img
          src={logoUrl}
          alt="¿QuéComo?"
          width={120}
          height={120}
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
