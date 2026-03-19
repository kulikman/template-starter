# Project Template — 2Sky Labs

Starter template for all new projects. Next.js 14 + Supabase + Tailwind + TypeScript.

## Quick Start

### 1. Create new project from this template

```bash
# On GitHub: click "Use this template" → "Create a new repository"
# Or clone locally:
git clone https://github.com/2sky-labs/template-starter.git my-project
cd my-project
rm -rf .git && git init
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment

```bash
cp .env.example .env.local
# Fill in your Supabase URL and keys
```

### 4. Run locally

```bash
pnpm dev
```

### 5. Deploy

Push to GitHub → Vercel auto-deploys from `main`.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm tsc --noEmit` | Type check |
| `pnpm prettier --write "src/**/*"` | Format code |

## Adding a New Feature

1. Create branch: `git checkout -b feat/feature-name`
2. Write code following `CLAUDE.md` rules
3. Check: `pnpm lint && pnpm tsc --noEmit`
4. Commit: `git commit -m "feat: description"`
5. Push & create PR
6. Review Vercel preview
7. Merge to `main`
