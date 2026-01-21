import { ImageResponse } from "next/og";
import { logoUrl } from "@/lib/seo-config";

export const runtime = "edge";

export const alt = "¿QuéComo? - Organiza tus comidas sin esfuerzo";
export const size = {
  width: 1200,
  height: 630,
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
            top: 40,
            right: 60,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(194, 65, 12, 0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            width: 80,
            height: 80,
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
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "rgba(194, 65, 12, 0.1)",
            marginBottom: 32,
            overflow: "hidden",
          }}
        >
          <img
            src={logoUrl}
            alt="¿QuéComo? Logo"
            width={80}
            height={80}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          ¿QuéComo?
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#666",
            marginBottom: 48,
          }}
        >
          Organiza tus comidas sin esfuerzo
        </div>

        {/* Features row */}
        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          {[
            { icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", label: "Menús" },
            { icon: "M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z", label: "Antojos" },
            { icon: "M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z", label: "Recetas" },
            { icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83", label: "Desayunos" },
          ].map((feature) => (
            <div
              key={feature.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "rgba(194, 65, 12, 0.1)",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c2410c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={feature.icon} />
                </svg>
              </div>
              <span style={{ fontSize: 16, color: "#666" }}>{feature.label}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            fontSize: 20,
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
