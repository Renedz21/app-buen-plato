# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is a Next.js 16 application named "buen-plato" using the App Router, React 19, TypeScript, Tailwind CSS v4, and Biome for linting/formatting. The project uses Bun as the package manager and runtime, and has React Compiler enabled.

## Development Commands
**Start dev server:**
```
bun dev
```
Opens on http://localhost:3000 with hot reload enabled.

**Build for production:**
```
bun build
```

**Start production server:**
```
bun start
```

**Lint and check code:**
```
bun lint
```
Runs Biome linter with Next.js and React recommended rules.

**Format code:**
```
bun format
```
Auto-formats code with Biome (2 spaces indentation).

## Technology Stack
- **Next.js 16.1.1** with App Router
- **React 19.2.3** with React Compiler enabled (babel-plugin-react-compiler)
- **TypeScript 5** with strict mode
- **Tailwind CSS v4** with PostCSS
- **Biome 2.2.0** for linting and formatting (replaces ESLint/Prettier)
- **Bun 1.3.5** as package manager and runtime

## Code Standards
**Linting/Formatting:**
- Biome is configured with Next.js and React recommended rules
- Auto-organize imports on save
- 2-space indentation
- VCS integration enabled
- Unknown CSS at-rules disabled for Tailwind compatibility

**TypeScript:**
- Strict mode enabled
- Module resolution: bundler
- Path alias: `@/*` maps to project root
- Target: ES2017

**React:**
- React Compiler is enabled for automatic optimization
- Use Next.js 16 App Router patterns
- Server Components by default (add "use client" when needed)

## Project Structure
```
app/
  layout.tsx       # Root layout with Geist fonts
  page.tsx         # Home page
  globals.css      # Global styles with Tailwind imports and theme inline
public/            # Static assets (SVGs for Next.js branding)
```

## Styling
- Tailwind CSS v4 with PostCSS integration
- Custom theme defined inline in `globals.css` using `@theme inline`
- CSS variables for background/foreground colors with dark mode support
- Geist Sans and Geist Mono fonts from `next/font/google`
- Apply all Tailwind classes directly in className (no helper functions)

## Package Management
- Use Bun for all package operations: `bun add`, `bun remove`, `bun install`
- Never use npm or yarn commands
- Lock file: `bun.lock`

## Notes
- React Compiler is enabled in `next.config.ts` for automatic memoization
- No test framework is currently configured
- Project uses the latest React 19 and Next.js 16 features
