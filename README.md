# Project Template — 2Sky Labs

Starter template for all new projects.
**Stack:** Next.js 14 + Supabase + Tailwind + TypeScript + shadcn/ui

---

## Quick Start

### Scaffold a new project from this template

```bash
cd /path/to/your-new-project
git clone --depth 1 https://github.com/kulikman/template-starter.git /tmp/template-starter-init \
  && bash /tmp/template-starter-init/scripts/init-project-structure.sh --force . \
  && rm -rf /tmp/template-starter-init
```

Or if you have the template checked out:

```bash
export TEMPLATE_STARTER_ROOT=/path/to/template-starter
bash "$TEMPLATE_STARTER_ROOT/scripts/init-project-structure.sh" --force .
```

### Setup steps

```bash
pnpm install
cp .env.example .env.local   # fill in Supabase URL and keys
pnpm dev
```

Push to GitHub → Vercel auto-deploys from `main`.

---

## Project Structure

```
.
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (auth)/       # Auth routes (login, signup)
│   │   ├── (dashboard)/  # Protected routes
│   │   └── api/          # API routes
│   ├── components/
│   │   ├── ui/           # shadcn/ui primitives
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Header, Footer, Sidebar
│   │   └── [feature]/    # Feature-specific components
│   ├── lib/
│   │   ├── supabase/     # Supabase clients (browser, server, admin)
│   │   ├── utils.ts      # Utilities
│   │   ├── constants.ts  # App-wide constants
│   │   └── validations.ts # Zod schemas
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global CSS
│   └── config/           # Site metadata, nav config
│
├── .claude/              # AI agent configuration
│   ├── memory/           # Persistent session memory
│   │   ├── project-state.md  ← Claude reads this every session
│   │   ├── decisions.md      ← Architectural decisions log
│   │   └── patterns.md       ← Established patterns
│   ├── skills/           # Slash command skills
│   │   ├── design/       # /design — UI advisor
│   │   ├── architect/    # /architect — system design
│   │   ├── memory/       # /memory — session state
│   │   └── review/       # /review — code quality check
│   └── instincts.md      # Architectural decision rules
│
├── .cursor/rules/        # Cursor AI rules (mirrors CLAUDE.md)
├── .github/workflows/    # CI/CD (type check, lint, security scan)
├── .vscode/              # VS Code settings
│
├── CLAUDE.md             # Claude Code instructions (primary AI config)
├── AGENTS.md             # OpenAI Codex / other agent instructions
└── scripts/
    └── init-project-structure.sh
```

---

## AI Agent System

This template includes a full AI agent harness — not just configuration files.

### How it works

**CLAUDE.md** is read by Claude Code at the start of every session. It defines:
- The tech stack and project structure
- Code rules and prohibitions
- **Decision rules** — how to make architectural choices, not just code style
- **Memory protocol** — how to persist context between sessions
- **Available slash commands**

**.claude/memory/** persists project context between sessions:
- Claude reads `project-state.md` at session start
- Claude updates memory files when you run `/memory update`
- Architectural decisions never get re-debated

**.claude/instincts.md** defines architectural decision rules:
- Component vs Hook vs Utility
- Server vs Client data fetching
- API Route vs Edge Function
- 2Sky Labs domain-specific patterns (telecom, fintech, B2B)

### Slash Commands

| Command | Purpose |
|---------|---------|
| `/design [context]` | UI advisor — industry-specific colors, fonts, layouts |
| `/architect [feature]` | System design — data model, API, component tree, RLS |
| `/memory update` | Save current session state to `.claude/memory/` |
| `/memory show` | Display current project context |
| `/review [file]` | Code quality check against all project rules |

### Multi-tool Support

The same project rules are available to multiple AI tools:
- **Claude Code** → reads `CLAUDE.md`
- **Cursor** → reads `.cursor/rules/project.mdc`
- **Codex / OpenCode** → reads `AGENTS.md`

---

## Design Skill

The `/design` skill provides industry-specific UI recommendations:

```
/design landing page for eSIM travel product
/design B2B telecom wholesale platform dashboard
/design MVNO partner portal
/design fintech portfolio tracker dark mode
```

Data files in `.claude/skills/design/data/`:
- `colors.csv` — industry color palettes
- `typography.csv` — font pairs + Google Fonts URLs
- `ui-reasoning.csv` — patterns and anti-patterns
- `landing.csv` — section structures and CTA strategies
- `ux-guidelines.csv` — UX rules with code examples

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm init:structure -- <dir>` | Scaffold folder layout in target directory |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm tsc --noEmit` | Type check |
| `pnpm prettier --write "src/**/*"` | Format code |

---

## Adding a New Feature

1. Run `/architect [feature name]` — get data model, API design, component plan
2. Create branch: `git checkout -b feat/feature-name`
3. Write migrations first, then RLS, then API, then UI
4. Check: `pnpm lint && pnpm tsc --noEmit`
5. Commit: `git commit -m "feat: description"`
6. Push & create PR → review Vercel preview
7. Run `/memory update` to save session state
8. Merge to `main`

---

## Environment Variables

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=     # Server-only, never NEXT_PUBLIC_

# Optional
NEXT_PUBLIC_SITE_URL=
```

---

## CI/CD

`.github/workflows/quality-check.yml` runs on every PR:
- TypeScript type check (`pnpm tsc --noEmit`)
- ESLint (`pnpm lint`)
- Security scan (hardcoded secrets, `any` types, `console.log`)
- Build check

All checks must pass before merging to `main`.

---

## About

Template maintained by [2Sky Labs](https://2sky.io).
Used across: 2SkyMobile, NeoSIM, and 2Sky Ventures projects.
