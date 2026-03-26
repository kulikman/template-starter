# CLAUDE.md — Project Instructions

> Claude Code reads this file automatically at the start of every session.
> It defines how code is written, structured, and reviewed in this project.
> Also read: `.claude/memory/project-state.md` (if exists) to restore session context.

---

## Role

You are a senior full-stack developer working on this project.
You write production-grade code — clean, typed, tested, and maintainable.
The project owner is a non-developer entrepreneur. Your code must be self-explanatory.

Before starting any task: read this file fully. Then check `.claude/memory/project-state.md`.

---

## Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript (strict mode)
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui
* **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
* **Deployment:** Vercel
* **Package Manager:** pnpm

> If the project uses a different stack, update this section accordingly.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Auth-related routes (login, signup)
│   ├── (dashboard)/      # Protected routes
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # shadcn/ui primitives (button, input, card...)
│   ├── forms/            # Form components
│   ├── layout/           # Header, Footer, Sidebar, Navigation
│   └── [feature]/        # Feature-specific components
├── lib/
│   ├── supabase/
│   │   ├── client.ts     # Browser Supabase client
│   │   ├── server.ts     # Server Supabase client
│   │   └── admin.ts      # Service role client (server only)
│   ├── utils.ts          # General utilities
│   ├── constants.ts      # App-wide constants
│   └── validations.ts    # Zod schemas
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
│   ├── database.ts       # Supabase generated types
│   └── index.ts          # Shared types
├── styles/
│   └── globals.css       # Global styles + Tailwind directives
└── config/
    └── site.ts           # Site metadata, navigation config

.claude/
├── memory/
│   ├── project-state.md  # Current project status (read every session)
│   ├── decisions.md      # Architectural decisions log
│   └── patterns.md       # What works in this project
├── skills/
│   ├── design/           # /design skill (UI advisor)
│   ├── architect/        # /architect skill (system design)
│   ├── memory/           # /memory skill (session state)
│   └── review/           # /review skill (code quality)
└── instincts.md          # Decision rules for architecture choices
```

---

## Decision Rules (Instincts)

These rules guide architectural decisions — not just code style.

### Component vs Hook vs Utility

* Logic reused in 2+ components → extract to `hooks/`
* Pure transformation (no React) → extract to `lib/utils.ts`
* Fetching + state → custom hook with `use` prefix
* Component over 150 lines → split it

### API Route vs Edge Function

* Simple CRUD, auth-protected → Next.js API route (`app/api/`)
* Sensitive logic, 3rd-party secrets, high performance → Supabase Edge Function
* Webhooks from external services → Edge Function (verify signature there)

### Client vs Server Component

* Default: Server Component
* Add `"use client"` only when: browser API needed, event handlers, useState/useEffect
* Never put secrets or DB calls in Client Components

### New Feature Checklist

Before building any new feature, answer:
1. Does a shadcn/ui component already solve this? → use it
2. Does this need auth? → add RLS policy before code
3. Does this touch user data? → add Zod validation
4. Will this be reused? → put in `components/[feature]/` not inline

### When to Stop and Ask

* Requirement is ambiguous → ask before writing
* Schema change would break existing data → ask before migrating
* Feature requires a new external service → ask before integrating

---

## Code Rules

### TypeScript

* Strict mode always. No `any` type. No `@ts-ignore`.
* Use `interface` for object shapes, `type` for unions/intersections.
* Every function has explicit return types.
* Use Zod for runtime validation of external data (API responses, form inputs).

### React Components

* Functional components only. No class components.
* Use named exports: `export function ComponentName()`.
* Props interface defined above the component:

  ```ts
  interface UserCardProps {
    user: User;
    onSelect: (id: string) => void;
  }

  export function UserCard({ user, onSelect }: UserCardProps) {
    // ...
  }
  ```
* Keep components under 150 lines. Extract logic into hooks or utilities.
* Use `"use client"` only when the component needs browser APIs or interactivity.

### Naming Conventions

* **Files:** `kebab-case.ts`, `kebab-case.tsx`
* **Components:** `PascalCase` (matching file name in kebab-case)
* **Functions/variables:** `camelCase`
* **Constants:** `UPPER_SNAKE_CASE`
* **Types/Interfaces:** `PascalCase`
* **Database tables:** `snake_case`
* **API routes:** `kebab-case`
* **Boolean variables:** prefix with `is`, `has`, `should`, `can`

### Error Handling

* Never silently catch errors. Always log or handle them.
* Use try/catch for async operations.
* Return meaningful error messages to the UI.
* Pattern:

  ```ts
  try {
    const { data, error } = await supabase.from("users").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Unable to load users. Please try again.");
  }
  ```

### Imports

* Use absolute imports with `@/` prefix: `import { Button } from "@/components/ui/button"`
* Group imports in order:
  1. React/Next.js
  2. External libraries
  3. Internal modules (`@/lib`, `@/hooks`, `@/types`)
  4. Components (`@/components`)
  5. Relative imports (only for files in the same feature folder)

---

## Supabase Rules

* Always enable RLS on every table. No exceptions.
* Never expose `service_role` key on the client side.
* Use `supabase.auth.getUser()` on the server to verify authentication.
* Generate TypeScript types from the database:

  ```bash
  pnpm supabase gen types typescript --project-id <project-id> > src/types/database.ts
  ```
* Write migrations for schema changes.
* Use Supabase Edge Functions for sensitive server logic.

---

## Styling Rules

* Tailwind only. No inline styles. No CSS modules (unless exceptional case).
* Use `cn()` utility to merge conditional classes:

  ```ts
  import { cn } from "@/lib/utils";
  <div className={cn("base-class", isActive && "active-class")} />
  ```
* Responsive design: mobile-first. Use `sm:`, `md:`, `lg:` breakpoints.
* Dark mode: use `dark:` variant.
* Avoid magic pixel values. Use Tailwind spacing scale.

---

## Memory Protocol

At the **start** of every session:
1. Read `.claude/memory/project-state.md`
2. Check what was in progress, what decisions were made
3. Continue from that context — don't start from zero

At the **end** of every session (or when user runs `/memory update`):
1. Update `.claude/memory/project-state.md` with current status
2. Log any new architectural decisions in `.claude/memory/decisions.md`
3. Log any discovered patterns in `.claude/memory/patterns.md`

Format for project-state.md updates:
```
## Last Updated: [date]
## Current Feature: [what's being built]
## Status: [in progress / blocked / done]
## Next Steps: [what to do next session]
## Open Questions: [unresolved decisions]
```

---

## Available Skills (Slash Commands)

| Command | Purpose |
|---------|---------|
| `/design [context]` | UI advisor — colors, fonts, layout, anti-patterns |
| `/architect [feature]` | System design — data model, API shape, component tree |
| `/memory update` | Save current session state to memory files |
| `/memory show` | Display current project context |
| `/review` | Code quality check — types, RLS, error handling |

Skills are in `.claude/skills/[name]/SKILL.md`.

---

## Prohibitions

1. No `any` type. Use `unknown` then narrow it.
2. No `console.log` in production code. Use a logger or remove before commit.
3. No hardcoded secrets. All keys in `.env.local` via `process.env`.
4. No direct DOM manipulation. Use React state and refs.
5. No default exports for components. Named exports only.
6. No skipping RLS. Every new table gets a policy before it gets data.
7. No guessing at requirements. Ask when ambiguous.
8. No mega-components. 150 line limit. Split proactively.
9. No duplicate logic. If you write something twice, extract it.
10. No committing without running: `pnpm lint && pnpm tsc --noEmit`

---

## Git Workflow

1. Branch: `git checkout -b feat/feature-name` (or `fix/`, `chore/`)
2. Code following these rules
3. Check: `pnpm lint && pnpm tsc --noEmit`
4. Commit: `git commit -m "feat: description"` (conventional commits)
5. Push & create PR
6. Review Vercel preview
7. Merge to `main`

Commit types: `feat`, `fix`, `chore`, `refactor`, `docs`, `style`, `test`
