# Project Template — 2Sky Labs

Starter template for all new projects. Next.js 14 + Supabase + Tailwind + TypeScript.

## Quick Start

### Scaffold only the folder layout (empty project)

From a **new empty folder** (Git optional), run the initializer using a one-off clone of this repo:

```bash
cd /path/to/your-new-project
git clone --depth 1 https://github.com/kulikman/template-starter.git /tmp/template-starter-init \
  && bash /tmp/template-starter-init/scripts/init-project-structure.sh --force . \
  && rm -rf /tmp/template-starter-init
```

If you already have this template checked out elsewhere, point the script at it:

```bash
export TEMPLATE_STARTER_ROOT=/path/to/template-starter
bash "$TEMPLATE_STARTER_ROOT/scripts/init-project-structure.sh" --force .
```

In Cursor / VS Code: open an **empty** project folder, copy `scripts/init-project-structure.sh` from this template (or open a workspace that already includes it), then **Tasks → Run Task → Init project structure (CLAUDE.md layout)**.

From a checkout of this repo you can run the script via pnpm **with an explicit target directory** (the package root is used as cwd, so a bare run would target the template itself):

```bash
pnpm init:structure -- /path/to/empty-project
pnpm init:structure -- --force /path/to/non-empty-project
```

It refuses non-empty targets unless you pass `--force` before the path (as above) or run `bash scripts/init-project-structure.sh --force /path/to/project` directly.

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
| `pnpm init:structure -- <dir>` | Same as the shell script; pass the folder to scaffold (see above) |
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
