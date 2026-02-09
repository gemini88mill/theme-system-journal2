# Theme System Journal

Theme System Journal is a React + TypeScript application built with Vite. It provides a lightweight front-end workspace for building and iterating on theme-related UI behavior.

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- ESLint 9
- Bun lockfile support (`bun.lock`) with npm-compatible scripts

## Prerequisites

- Node.js 20+ (recommended)
- npm (or Bun if preferred)

## Setup

```bash
cd theme-system-journal
npm install
```

If you use Bun:

```bash
cd theme-system-journal
bun install
```

## Available Scripts

Run all commands from `theme-system-journal/`.

- `npm run dev`: starts the Vite development server
- `npm run build`: type-checks and builds the app for production
- `npm run lint`: runs ESLint checks
- `npm run preview`: serves the production build locally

Equivalent Bun commands:

- `bun run dev`
- `bun run build`
- `bun run lint`
- `bun run preview`

## Project Structure

```text
theme-system-journal/
  public/           # Static public assets
  src/
    assets/         # App assets
    App.tsx         # Root app component
    main.tsx        # App entrypoint
    index.css       # Global styles
  index.html        # Vite HTML entry
  vite.config.ts    # Vite configuration
  eslint.config.js  # ESLint configuration
```

## Typical Workflow

Start development:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Lint before creating a PR:

```bash
npm run lint
```

Preview a production build locally:

```bash
npm run preview
```
