# Repository Guidelines

## Package Manager Policy

- This project is **Bun-only**.
- Use `bun`/`bunx` for all dependency management, scripts, tooling, and test commands.
- Do **not** use `npm`, `pnpm`, or `yarn` commands in this repository.

## Build, Test, and Development Commands

- `bun install`
- `bun run dev`
- `bun run typecheck`
- `bun run build`
- `bun run lint`
- `bun run preview`

## Notes

- Keep `bun.lock` as the lockfile of record.
- Any docs, scripts, or automation added to this repo should reference Bun commands only.
