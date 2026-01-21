import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "¿QuéComo? - Organiza tus comidas",
    short_name: "¿QuéComo?",
    description: "Organiza tus decisiones de comida diarias sin esfuerzo",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f5",
    theme_color: "#c2410c",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
