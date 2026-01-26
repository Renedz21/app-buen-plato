This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## SEO Configuration

This project includes comprehensive SEO optimization:

### Configuration File

All SEO settings are centralized in `lib/seo-config.ts`. This file exports:

- `seoConfig`: Main metadata configuration (title, description, Open Graph, Twitter Cards, etc.)
- `jsonLdSchema`: Structured data (JSON-LD) for search engines

### Key Features

- **Metadata**: Complete Open Graph and Twitter Cards support
- **Robots.txt**: Configured to index public pages and block private areas (`/dashboard/`, `/api/`)
- **Sitemap**: Auto-generated at `/sitemap.xml` with public pages
- **Web Manifest**: PWA-ready with app icons and theme colors
- **Dynamic Images**: OG and Twitter images generated with Next.js Image Generation API
- **Structured Data**: JSON-LD schema for WebApplication
- **Logo Integration**: Uses `nutriya_logo.avif` across all social media images

### Files Structure

```
app/
├── layout.tsx              # Imports seoConfig and jsonLdSchema
├── page.tsx                # Landing page with specific metadata
├── robots.ts               # Robots.txt configuration
├── sitemap.ts              # Sitemap generation
├── manifest.ts             # PWA manifest
├── opengraph-image.tsx     # OG image (1200x630)
├── twitter-image.tsx       # Twitter Card image (1200x600)
├── icon.tsx                # Favicon (32x32)
├── apple-icon.tsx          # Apple touch icon (180x180)
└── (auth)/(routes)/
    └── layout.tsx          # noindex for auth pages

lib/
└── seo-config.ts           # Centralized SEO configuration

public/
├── icons/
│   ├── icon-192.svg        # PWA icon
│   └── icon-512.svg        # PWA icon
└── images/
    └── nutriya_logo.avif   # App logo
```

### Customization

To update SEO settings, edit `lib/seo-config.ts`:

```typescript
// Change site URL
const publicUrl = "https://your-domain.com";

// Update metadata
export const seoConfig = defineMetadata({
  title: "Your Title",
  description: "Your Description",
  // ... more settings
});
```

### Testing SEO

- **Robots**: Visit `/robots.txt` in your browser
- **Sitemap**: Visit `/sitemap.xml` in your browser
- **Manifest**: Visit `/manifest.webmanifest` in your browser
- **OG Image**: Visit `/opengraph-image` in your browser
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
