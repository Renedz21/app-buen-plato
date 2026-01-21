import { ImageResponse } from "next/og";
import { logoUrl } from "@/lib/seo-config";

export const runtime = "edge";

export const alt = "¿QuéComo? - Organiza tus comidas sin esfuerzo";
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #faf9f5 0%, #f5f0e8 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: 30,
            right: 50,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(194, 65, 12, 0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "rgba(194, 65, 12, 0.08)",
          }}
        />

        {/* Logo container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 110,
            height: 110,
            borderRadius: 26,
            background: "rgba(194, 65, 12, 0.1)",
            marginBottom: 28,
            overflow: "hidden",
          }}
        >
          <img
            src={logoUrl}
            alt="¿QuéComo? Logo"
            width={70}
            height={70}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: 14,
            letterSpacing: "-0.02em",
          }}
        >
          ¿QuéComo?
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#666",
            marginBottom: 40,
          }}
        >
          Organiza tus comidas sin esfuerzo
        </div>

        {/* Features row */}
        <div
          style={{
            display: "flex",
            gap: 36,
          }}
        >
          {[
            { label: "Optimiza menús" },
            { label: "Ideas para antojos" },
            { label: "Recetas fáciles" },
            { label: "Desayunos rápidos" },
          ].map((feature) => (
            <div
              key={feature.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 24,
                background: "rgba(194, 65, 12, 0.1)",
              }}
            >
              <span style={{ fontSize: 18, color: "#c2410c", fontWeight: 500 }}>
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            fontSize: 18,
            color: "#c2410c",
            fontWeight: 500,
          }}
        >
          que-como.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
