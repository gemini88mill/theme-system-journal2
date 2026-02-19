# Theme System Journal

Theme System Journal is a React + TypeScript application built with Vite. It combines a personal journal, a habit tracker, and a theme design workspace in one app.

## What it does

The app has **three main views** available via a navbar:

- **Journal** — A daily writing surface for reflection. You can set goals, write freeform entries, and link entries to each other.
- **Daily Actions** — A habit and action tracker with bubble states per item: unfilled, half-filled, or filled. Track your routines and progress at a glance.
- **Themes** — A workspace for designing and iterating on theme-related UI behavior.

## Who it's for

Theme System Journal is for anyone who wants a combined journal + habit tracker + themes workspace—for example, personal productivity, reflection, or theme design.

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- ESLint 9
- Bun lockfile support (`bun.lock`)

## Prerequisites

- Node.js 20+ (recommended)
- Bun (required; this project is Bun-only)

## Setup

```bash
cd theme-system-journal
bun install
```

## Available Scripts

Run all commands from `theme-system-journal/` using Bun:

- `bun run dev` — starts the Vite development server
- `bun run build` — type-checks and builds the app for production
- `bun run lint` — runs ESLint checks
- `bun run preview` — serves the production build locally

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
bun run dev
```

Create a production build:

```bash
bun run build
```

Lint before creating a PR:

```bash
bun run lint
```

Preview a production build locally:

```bash
bun run preview
```
