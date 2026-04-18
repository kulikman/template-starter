# CLAUDE.md — Project Instructions

> Claude Code reads this file automatically at the start of every session.
> It defines how code is written, structured, and reviewed in this project.
> **Stack is pinned to Next.js 16 + React 19.2 + Tailwind 4.** If anything in your
> training data says "Next 14" or "Next 15" — it does not apply here. See
> `## Breaking Changes From Your Training Data` below.

---

## Role

You are a senior full-stack developer working on this project.
You write production-grade code — clean, typed, tested, and maintainable.
The project owner is a non-developer entrepreneur. Your code must be self-explanatory.

---

## Stack (pinned)

| Layer            | Tech                                     | Notes |
|------------------|------------------------------------------|-------|
| Framework        | **Next.js 16** (App Router, Turbopack)   | Node.js runtime is default. Edge only when explicit. |
| UI runtime       | **React 19.2**                           | Server Components by default. |
| Language         | **TypeScript 5** (strict mode)           | No `any`, no `@ts-ignore`. |
| Styling          | **Tailwind CSS v4** (PostCSS plugin)     | No `tailwind.config.ts`. Theme lives in `globals.css` via `@theme`. |
| UI primitives    | **shadcn/ui** + `radix-ui` (unified pkg) | Components in `src/components/ui/`. |
| Icons            | **lucide-react**                         | |
| Validation       | **Zod 4**                                | `.parse()` / `.safeParse()` on all external data. |
| Backend          | **Supabase** (Postgres, Auth, Storage, Edge Functions) | RLS on every table. |
| Deployment       | **Vercel**                               | |
| Package Manager  | **pnpm 10**                              | `onlyBuiltDependencies` lives in `pnpm-workspace.yaml`. |

---

## Breaking Changes From Your Training Data

**This is NOT Next.js 14 or 15.** If you write code that assumes old behavior,
the build will fail or behave unexpectedly. Read this section every session.

### 1. Dynamic route params are async

```tsx
// ❌ WRONG (Next 14 style)
export default function Page({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>
}

// ✅ CORRECT (Next 16)
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div>{id}</div>
}
```

Same applies to `searchParams`, `cookies()`, `headers()`, `draftMode()` — all async now.

### 2. `middleware.ts` → `proxy.ts`

`middleware.ts` is **deprecated** in Next 16. Use `proxy.ts` at the project root
(same level as `app/`). Node.js runtime by default, not Edge. See `src/proxy.ts`
in this repo for the Supabase session-refresh + security-headers pattern.

Rename if migrating from an older project:
```bash
mv middleware.ts src/proxy.ts
# then rename the exported function from `middleware` to `proxy`
```

### 3. Caching is opt-in (Cache Components)

Next 16 removed implicit caching. Every dynamic operation runs at request time
by default. To cache, use the `"use cache"` directive:

```ts
// src/lib/data/products.ts
export async function getProducts() {
  "use cache"
  return supabase.from("products").select("*")
}
```

Do **not** rely on `fetch()` memoization or `export const revalidate` on random
routes — behavior has changed. Be explicit.

### 4. React 19.2 primitives available

- `useEffectEvent` — stable callback that always reads latest state without
  adding to effect deps. Prefer over manual refs.
- `<Activity>` — hide UI while preserving state (tabs, wizards, offscreen).
- View Transitions — `<ViewTransition>` for animated navigations.

### 5. `next/image` defaults changed

Remote images require explicit `remotePatterns` in `next.config.ts`. `domains`
is removed. Always pass `width` and `height` — unsized images log warnings.

### 6. Typed Routes are stable

Enable via `typedRoutes: true` in `next.config.ts`. Ссылки через `<Link href={...}>`
становятся type-checked — опечатка в пути ломает `tsc`, а не продакшн.

### 7. React 19 security note

CVE-2025-66478 ("React2Shell") affected Next 15.x and 16.x App Router via RSC
deserialization. Keep `next` pinned to a patched version (16.2.4+ at time of
writing). CI runs `pnpm audit` — don't suppress its output.

---

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Auth routes (login, signup)
│   ├── (dashboard)/      # Protected routes
│   ├── api/              # Route Handlers
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Tailwind v4 + theme tokens (ONLY globals.css file)
├── components/
│   ├── ui/               # shadcn primitives (button, input, card...)
│   ├── forms/            # Form components
│   ├── layout/           # Header, Footer, Sidebar, Navigation
│   └── [feature]/        # Feature-specific components
├── lib/
│   ├── supabase/
│   │   ├── client.ts     # Browser Supabase client
│   │   ├── server.ts     # Server Supabase client (cookies-aware)
│   │   ├── admin.ts      # Service role client (server only, never in client bundle)
│   │   └── middleware.ts # Session-refresh helper called from src/proxy.ts
│   ├── utils.ts          # cn() and general utilities
│   ├── constants.ts      # App-wide constants
│   └── validations.ts    # Zod schemas
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
│   ├── database.ts       # Supabase generated types (regenerate on schema change)
│   └── index.ts          # Shared app types
├── config/
│   └── site.ts           # Site metadata + nav config
└── proxy.ts              # Request interception (session refresh + security headers)
```

> Note: `src/styles/` does **not** exist. All global CSS lives in `src/app/globals.css`.

---

## Code Rules

### TypeScript

- Strict mode always. No `any`. No `@ts-ignore`. Use `unknown` + narrowing.
- `interface` for object shapes, `type` for unions/intersections.
- Every exported function has an explicit return type.
- Zod for all runtime boundaries: API bodies, form inputs, env vars, 3rd-party responses.

### React Components

- Functional components only.
- Named exports: `export function ComponentName()`.
- Props interface above the component:
  ```tsx
  interface UserCardProps {
    user: User
    onSelect: (id: string) => void
  }

  export function UserCard({ user, onSelect }: UserCardProps): React.ReactElement {
    // ...
  }
  ```
- Components under 150 lines. Extract logic to hooks or utilities.
- `"use client"` only for browser APIs, interactivity, or client-only libs.
- Server Components fetch data directly with `async/await` — no `useEffect` for fetching.

### Naming Conventions

- Files: `kebab-case.ts`, `kebab-case.tsx`
- Components: `PascalCase` (file in kebab-case)
- Functions/variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`
- Database tables: `snake_case`
- API routes: `kebab-case`
- Booleans: prefix `is`, `has`, `should`, `can`

### Error Handling

Never silently catch. Always log or re-throw with context.
```ts
try {
  const { data, error } = await supabase.from("users").select("id, email")
  if (error) throw error
  return data
} catch (error) {
  console.error("Failed to fetch users:", error)
  throw new Error("Unable to load users. Please try again.")
}
```

### Imports

Absolute imports via `@/` prefix. Group in this order:
1. React / Next.js
2. External libraries
3. Internal modules (`@/lib`, `@/hooks`, `@/types`)
4. Components (`@/components`)
5. Relative imports (same feature folder only)

---

## Supabase Rules

- RLS **enabled** on every table. Write policies in the migration that creates the table.
- `service_role` key is server-only. Never import `@/lib/supabase/admin.ts` from a
  file with `"use client"`.
- On the server, use `supabase.auth.getUser()` (not `getSession()`) — it revalidates
  against Supabase Auth.
- Regenerate types on schema change:
  ```bash
  pnpm supabase gen types typescript --project-id <project-id> > src/types/database.ts
  ```
- Sensitive logic (webhooks, 3rd-party API calls with secrets, file processing) →
  Edge Functions.
- Session refresh lives in `src/proxy.ts` (see that file). Do not duplicate it.

---

## Styling Rules (Tailwind v4)

- Tailwind only. No inline styles. No CSS Modules (exceptional cases only).
- There is **no `tailwind.config.ts`**. Theme tokens live in `src/app/globals.css`
  under `@theme inline { ... }`. Add new tokens there.
- Use `cn()` from `@/lib/utils` for conditional classes:
  ```tsx
  <div className={cn("base", isActive && "active")} />
  ```
- Mobile-first. Use `sm:`, `md:`, `lg:`, `xl:` breakpoints.
- Dark mode via `dark:` variant (toggled by `.dark` on `<html>`).
- No magic pixels. Use the spacing scale (`p-2`, `gap-4`) and radius tokens
  (`rounded-md`, `rounded-xl`).

---

## Prohibitions

1. No `any`. Use `unknown` and narrow.
2. No `console.log` in production paths. Use `console.warn` / `console.error` or a logger.
3. No hardcoded secrets. All keys live in `.env.local` and are read via `process.env`.
4. No direct DOM manipulation. Use React state/refs.
5. No default exports (except Next.js pages/layouts/error boundaries that require them,
   and `proxy.ts` default export).
6. No barrel files (`index.ts` re-exports) — they break tree-shaking.
7. No data fetching in `useEffect`. Use Server Components, Server Actions, or SWR/React Query
   for client-side real-time needs.
8. No committing `.env*` files with real values.
9. No ignoring TypeScript errors. Fix them.
10. No installing packages without justification in the commit message.
11. No `middleware.ts` — use `src/proxy.ts` (Next 16 convention).

---

## Git Rules

Commit messages in imperative mood, concise, Conventional Commits prefixes:

- `feat: add user authentication flow`
- `fix: resolve timezone offset in booking display`
- `refactor: extract payment logic into hook`
- `chore: bump next to 16.2.4`

One logical change per commit. Never commit broken code.

---

## Testing

- Write tests for: utility functions, API routes, complex business logic, Zod schemas.
- Framework: Vitest (unit) + Playwright (E2E when needed).
- Test files colocated: `utils.ts` → `utils.test.ts`.
- Every new utility function gets a test.

---

## Pre-Commit Checklist

Before completing any task, verify:

- [ ] TypeScript compiles (`pnpm tsc --noEmit`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Prettier clean (`pnpm format:check`)
- [ ] No hardcoded values (URLs, keys, magic numbers)
- [ ] Error states handled in UI (loading, error, empty)
- [ ] Mobile responsiveness checked
- [ ] No `console.log` left in source
- [ ] New dependencies justified in commit message
- [ ] Commit message follows convention

---

## Context & Memory

When working on a task:
1. Read relevant files first before making changes.
2. Follow existing patterns — consistency over preference.
3. Suggest refactors as separate steps, not mixed into feature commits.

When starting a new feature:
1. Read `.claude/memory/project-state.md` for session context.
2. Read `.claude/instincts.md` for architecture decisions.
3. Ask clarifying questions if requirements are ambiguous.
4. Propose the plan before writing code.
5. Break large features into small reviewable chunks.

---

## Documentation

- Every exported function has a JSDoc comment.
- Complex logic gets inline comments explaining **why**, not **what**.
- README.md is kept up to date.
- API routes documented with request/response examples.

---

## Performance

- `next/image` for all images. Always pass `width` and `height`.
- `next/link` for internal navigation.
- Server Components by default. `"use client"` only when necessary.
- Lazy-load heavy client components: `dynamic(() => import("./chart"), { ssr: false })`.
- Cache Components (`"use cache"`) for expensive server reads that don't change
  per-user — opt-in, be explicit about what you cache.

---

## Security

- Sanitize all user inputs via Zod at the API boundary.
- Validate on both client (UX) and server (security).
- Check auth on every protected route, Server Action, and Route Handler
  with `supabase.auth.getUser()`.
- Never log sensitive data (passwords, tokens, PII).
- CSP and security headers are set in `src/proxy.ts` — don't fight it.
- Keep `next` on a patched version (16.2.4+) due to CVE-2025-66478.
- For new features involving money, auth, or multi-tenancy: write the RLS policy
  **in the same migration** that creates the table.
