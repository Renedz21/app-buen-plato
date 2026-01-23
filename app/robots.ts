import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/api/",
          "/success/",
          "/upgrade/",
          "/login",
          "/register",
        ],
      },
    ],
    sitemap: "https://que-como.vercel.app/sitemap.xml",
  };
}
