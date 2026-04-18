# CLAUDE.md — Project Instructions

> Claude Code reads this file automatically at the start of every session.
> Also read: `.claude/memory/project-state.md` (if exists) to restore session context.

---

## Karpathy Principles

**1. Explicit Assumptions** — State assumptions explicitly. If uncertain — ask. If multiple interpretations exist — present them, don't pick silently. Push back when warranted. Stop, name what's confusing, ask.

**2. Minimum Viable Code** — Minimum code that solves the problem. Nothing speculative. No features beyond what was asked. No abstractions for single-use code. If you write 200 lines and it could be 50 — rewrite it.

**3. Surgical Changes** — Touch only what you must. Don't "improve" adjacent code. Don't refactor things that aren't broken. Match existing style. Every changed line must trace directly to the user's request.

**4. Goal-Driven Execution** — Define success criteria before starting. Loop until verified.

---

## Role

You are a senior full-stack developer working on this project.
You write production-grade code — clean, typed, tested, and maintainable.
The project owner is an entrepreneur. Your code must be self-explanatory and complete.

---

## Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (radix-ui primitives)
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Deployment:** Vercel
- **Package Manager:** pnpm
- **Email:** Resend
- **Validation:** Zod v4
- **Data Fetching:** TanStack Query v5 (client-side), Server Components (default)
- **Testing:** Vitest (unit), Playwright (E2E)

> Update this section when the project uses a different stack.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth routes (login, signup, reset)
│   ├── (dashboard)/      # Protected routes
│   ├── api/              # Next.js API routes (lightweight only)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/               # shadcn/ui primitives — never modify directly
│   ├── forms/            # Form components with RHF + Zod
│   ├── layout/           # Header, Footer, Sidebar, Nav
│   └── [feature]/        # Feature-specific components
├── lib/
│   ├── supabase/
│   │   ├── client.ts     # Browser client (anon key only)
│   │   ├── server.ts     # Server client (SSR cookies)
│   │   └── admin.ts      # Service role client — server only, never import in client
│   ├── utils.ts          # cn(), formatters, helpers
│   ├── constants.ts      # UPPER_SNAKE_CASE constants
│   └── validations.ts    # Zod schemas (reuse across client + server)
├── hooks/                # Custom React hooks (use* prefix)
├── types/
│   ├── database.ts       # Generated from Supabase — never edit manually
│   └── index.ts          # Shared app types
├── styles/
│   └── globals.css
└── config/
    └── site.ts           # Metadata, nav config, feature flags

middleware.ts             # Auth protection — runs on edge
.env.local                # Never commit
.cursorrules              # Cursor AI project context
llms.txt                  # AI indexing standard
```

```
.claude/
├── memory/
│   ├── project-state.md  # READ every session. WRITE at end of session.
│   ├── decisions.md      # Architectural decisions log
│   └── patterns.md       # What works in this project
└── skills/               # Slash command skills (see SKILLS.md)
```

---

## Decision Rules (Instincts)

### Component vs Hook vs Utility
- Logic reused in 2+ components → extract to `hooks/`
- Pure transformation (no React) → extract to `lib/utils.ts`
- Fetching + state in client → TanStack Query hook with `use` prefix
- Fetching on server → Server Component with `async/await` directly
- Component over 150 lines → split it immediately

### API Route vs Edge Function
- Simple CRUD, auth-protected, low traffic → Next.js API route (`app/api/`)
- Sensitive logic, 3rd-party secrets, high performance, webhooks → Supabase Edge Function
- Webhooks: always verify signature inside the Edge Function before processing

### Client vs Server Component
- **Default: Server Component** — no directive needed
- Add `"use client"` ONLY when: browser API, event handlers, useState, useEffect, TanStack Query
- Never put secrets or DB calls in Client Components — ever

### When to Stop and Ask
- Requirement is ambiguous
- Schema change would break existing data
- Feature requires a new external service
- Two valid architectures exist with real tradeoffs

---

## Code Rules

### TypeScript
- Strict mode. No `any`. No `@ts-ignore`. No `@ts-expect-error`.
- `interface` for object shapes, `type` for unions/intersections/computed
- Every exported function has explicit return type
- Nullable values guarded before access (`value?.prop`, not `value.prop`)
- Zod for all external data: API responses, form inputs, env vars

### React Components

Named exports only:
```typescript
interface UserCardProps {
  user: User
  onSelect: (id: string) => void
}

export function UserCard({ user, onSelect }: UserCardProps) {
  // ...
}
```

- Functional only. No class components.
- Max 150 lines. Split proactively.
- `"use client"` must be justified with a comment why server component isn't sufficient.
- Loading, error, and empty states are mandatory — not optional.
- Buttons disabled during async operations.

### Naming Conventions
- Files: `kebab-case.ts` / `kebab-case.tsx`
- Components: `PascalCase`
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`
- DB tables: `snake_case`
- Booleans: `is`, `has`, `should`, `can` prefix

### Error Handling
```typescript
try {
  const { data, error } = await supabase.from('users').select('id, email')
  if (error) throw error
  return data
} catch (error) {
  console.error('fetchUsers failed:', error)
  throw new Error('Unable to load users. Please try again.')
}
```
Never swallow errors silently. Never log PII (passwords, tokens, personal data).

### Imports
Absolute with `@/` prefix. Group in order:
1. React / Next.js
2. External libraries
3. Internal: `@/lib`, `@/hooks`, `@/types`
4. Components: `@/components`
5. Relative (same feature folder only)

No barrel files (`index.ts` re-exports) — they break tree-shaking.

---

## Supabase Rules

- **RLS enabled on every table. No exceptions.**
- `service_role` key: server-side only, never in `NEXT_PUBLIC_*`, never in Client Components
- Server auth: always `supabase.auth.getUser()`, never `getSession()` (cookie-only, unverified)
- Client auth: `getSession()` is fine for reading session state in UI only
- Generate types after every schema change:
  ```bash
  pnpm supabase gen types typescript --project-id <id> > src/types/database.ts
  ```
- Migrations for every schema change — never alter tables manually in production
- FK columns need manual indexes (PostgreSQL does NOT auto-index FKs):
  ```sql
  CREATE INDEX idx_orders_user_id ON orders(user_id);
  ```
- Edge Functions: always handle CORS preflight (OPTIONS method)

---

## Styling Rules

- Tailwind only. No inline styles. No CSS modules.
- `cn()` for conditional classes: `import { cn } from '@/lib/utils'`
- Mobile-first. Use `sm:`, `md:`, `lg:` breakpoints.
- Dark mode: `dark:` variant.
- Tailwind spacing scale only — no magic px values.

---

## Middleware

`middleware.ts` must exist at root. Pattern:
```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // refresh session, redirect unauthenticated users from protected routes
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## Memory Protocol

**Start of every session:**
1. Read `.claude/memory/project-state.md`
2. Check what was in progress, what decisions were made
3. Continue from that context — don't start from zero

**End of every session** (or on `/memory update`):
1. Update `.claude/memory/project-state.md`:
```
## Last Updated: [date]
## Current Feature: [what's being built]
## Status: [in progress / blocked / done]
## Next Steps: [what to do next session]
## Open Questions: [unresolved decisions]
```
2. Log new architectural decisions in `.claude/memory/decisions.md`
3. Log discovered patterns in `.claude/memory/patterns.md`

---

## Skills (Slash Commands)

| Command | What it does |
|---|---|
| `/db [feature]` | Design DB schema, RLS, migrations, Edge Functions |
| `/ui [component]` | Build premium animated UI component or page |
| `/seo [site context]` | Generate full SEO suite: sitemap, llms.txt, schema, OG |
| `/security [threat]` | Harden auth, API, rate limiting, CORS, headers |
| `/ci` | Generate GitHub Actions CI/CD workflow |
| `/review` | Code review: types, RLS, security, performance |
| `/i18n [url or text]` | Translate UI to multiple languages, generate i18n files |
| `/content [topic]` | Write SEO-optimized long-form article or blog post |
| `/copy [context]` | Write telecom/eSIM/MVNO marketing copy |
| `/api [feature]` | Generate FastAPI backend with Pydantic models |
| `/ga4` | Set up GA4 + GTM + Google Ads conversion tracking |
| `/memory update` | Save current session state |
| `/memory show` | Display current project context |

---

## Prohibitions

1. No `any` — use `unknown` then narrow
2. No `console.log` in production paths — remove before commit
3. No hardcoded secrets — everything via `process.env`
4. No DOM manipulation — use React state and refs
5. No default exports for components — named exports only (exception: Next.js pages/layouts)
6. No barrel files (`index.ts` re-exports)
7. No `useEffect` for data fetching when a Server Component or TanStack Query would work
8. No unbounded queries — always paginate or limit
9. No N+1 queries — batch with `.in()` or joins
10. No missing RLS — every new table gets a policy before it gets data
11. No mega-components — 150 line limit, split proactively
12. No duplicate logic — if written twice, extract it
13. No committing without: `pnpm lint && pnpm tsc --noEmit`
14. No guessing at requirements — ask when ambiguous

---

## Git Workflow

```bash
git checkout -b feat/feature-name   # or fix/, chore/, refactor/
# write code
pnpm lint && pnpm tsc --noEmit
git add -p                          # stage hunks, not git add .
git commit -m "feat: description"
git push && open PR
# review Vercel preview
# merge to main
```

Commit types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`

**Never use `git add .` on its own.** Use `git add -p` to review what you're staging.

---

## Pre-Commit Checklist

- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
- [ ] No hardcoded values (URLs, keys, magic numbers)
- [ ] Loading / error / empty states handled in UI
- [ ] Mobile responsiveness checked
- [ ] No `console.log` left in code
- [ ] RLS policy added for any new table
- [ ] Migration file included if schema changed
- [ ] New dependencies justified and added to package.json
- [ ] Commit message follows convention
