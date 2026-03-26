# AGENTS.md — Agent Instructions

> This file is read by OpenAI Codex, OpenCode, and other non-Claude agents.
> Claude Code reads CLAUDE.md instead (which is the full source of truth).
> Rules here mirror CLAUDE.md — keep them in sync when updating either file.

---

## Critical: Read Before Writing Any Code

This is a **Next.js 14 App Router** project. APIs, conventions, and file structure
differ significantly from Next.js 12/13. Before writing any Next.js code:

1. Check `node_modules/next/dist/docs/` for current API reference
2. Use Server Components by default — not Client Components
3. Data fetching is `async/await` in components, not `getServerSideProps`
4. Routing uses the `app/` directory, not `pages/`

---

## Stack

* Next.js 14+ (App Router) · TypeScript strict · Tailwind CSS
* shadcn/ui components · Supabase backend · Vercel deployment · pnpm

---

## Non-Negotiable Rules

1. **TypeScript strict** — no `any`, no `@ts-ignore`
2. **RLS always** — every Supabase table needs Row Level Security enabled
3. **Named exports** — no default exports for components
4. **No secrets in code** — environment variables only, never hardcoded
5. **Components ≤ 150 lines** — split proactively
6. **Zod validation** — all external data (API inputs, form data) must be validated
7. **Absolute imports** — use `@/` prefix, never relative paths across features

---

## Project Memory

Before starting work, check:
* `.claude/memory/project-state.md` — what's in progress
* `.claude/memory/decisions.md` — architectural decisions already made
* `.claude/memory/patterns.md` — established patterns for this project

Do not re-solve problems already documented in memory files.

---

## Decision Rules

* Default to **Server Component** — add `"use client"` only when truly needed
* Simple DB operations → **Next.js API route**
* Sensitive logic / 3rd-party secrets → **Supabase Edge Function**
* Reused logic (2+ places) → extract to `hooks/` or `lib/`
* Ambiguous requirement → **stop and ask**, don't assume

---

## Structure Reference

```
src/app/          → pages (App Router)
src/components/   → React components
src/lib/          → utilities, Supabase clients, constants
src/hooks/        → custom React hooks
src/types/        → TypeScript types
.claude/memory/   → persistent project context
.claude/skills/   → slash command skill definitions
```

---

## Before Committing

Run: `pnpm lint && pnpm tsc --noEmit`

Commit format: `feat: description` / `fix: description` / `chore: description`
