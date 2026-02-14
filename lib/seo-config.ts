import type { Metadata } from "next";

const defineMetadata = <T extends Metadata>(metadata: T) => metadata;

export const publicUrl = "https://que-como.vercel.app";

export const logoUrl = new URL(
  "/images/que-como-logo.webp",
  publicUrl,
).toString();

export const seoConfig = defineMetadata({
  metadataBase: new URL(publicUrl),
  title: {
    default: "¿QuéComo? - Organiza tus comidas sin esfuerzo",
    template: "%s | ¿QuéComo?",
  },
  description:
    "Organiza tus decisiones de comida diarias. Optimiza menús, encuentra ideas para antojos, recetas para 2 días y desayunos en 5 minutos. Sin complicaciones.",
  keywords: [
    "que comer",
    "que comer hoy",
    "menu del dia",
    "recetas faciles",
    "desayuno rapido",
    "planificador de comidas",
    "ideas para comer",
    "meal planning",
    "que cocinar",
    "recetas rapidas",
  ],
  authors: [{ name: "¿QuéComo?" }],
  creator: "¿QuéComo?",
  publisher: "¿QuéComo?",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: publicUrl,
    siteName: "¿QuéComo?",
    title: "¿QuéComo? - Organiza tus comidas sin esfuerzo",
    description:
      "Herramienta gratuita para tomar mejores decisiones de comida. Optimiza menús, encuentra ideas para antojos y recetas rápidas.",
    images: [
      {
        url: `${publicUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "¿QuéComo? - Organiza tus comidas sin esfuerzo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "¿QuéComo? - Organiza tus comidas sin esfuerzo",
    description:
      "Herramienta gratuita para tomar mejores decisiones de comida. Optimiza menús, encuentra ideas para antojos y recetas rápidas.",
    images: [`${publicUrl}/twitter-image`],
    creator: "@quecomo",
    site: "@quecomo",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

export const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "¿QuéComo?",
  url: publicUrl,
  description:
    "Organiza tus decisiones de comida diarias. Optimiza menús, encuentra ideas para antojos, recetas para 2 días y desayunos en 5 minutos.",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web",
  inLanguage: "es",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Optimizador de menús del día",
    "Ideas para antojos",
    "Recetas para 2 días",
    "Desayunos en 5 minutos",
    "Recordatorios de hidratación",
  ],
  logo: `${publicUrl}/images/que-como-logo.webp`,
};

export default seoConfig;
