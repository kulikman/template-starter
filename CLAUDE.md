# CLAUDE.md — Project Instructions

> Claude Code reads this file automatically at the start of every session.
> It defines how code is written, structured, and reviewed in this project.

---

## Role

You are a senior full-stack developer working on this project.
You write production-grade code — clean, typed, tested, and maintainable.
The project owner is a non-developer entrepreneur. Your code must be self-explanatory.

---

## Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Deployment:** Vercel
- **Package Manager:** pnpm

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
```

---

## Code Rules

### TypeScript
- Strict mode always. No `any` type. No `@ts-ignore`.
- Use `interface` for object shapes, `type` for unions/intersections.
- Every function has explicit return types.
- Use Zod for runtime validation of external data (API responses, form inputs).

### React Components
- Functional components only. No class components.
- Use named exports: `export function ComponentName()`.
- Props interface defined above the component:
  ```tsx
  interface UserCardProps {
    user: User;
    onSelect: (id: string) => void;
  }

  export function UserCard({ user, onSelect }: UserCardProps) {
    // ...
  }
  ```
- Keep components under 150 lines. Extract logic into hooks or utilities.
- Use `"use client"` only when the component needs browser APIs or interactivity.

### Naming Conventions
- **Files:** `kebab-case.ts`, `kebab-case.tsx`
- **Components:** `PascalCase` (matching file name in kebab-case)
- **Functions/variables:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Types/Interfaces:** `PascalCase`
- **Database tables:** `snake_case`
- **API routes:** `kebab-case`
- **Boolean variables:** prefix with `is`, `has`, `should`, `can`

### Error Handling
- Never silently catch errors. Always log or handle them.
- Use try/catch for async operations.
- Return meaningful error messages to the UI.
- Pattern:
  ```tsx
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
- Use absolute imports with `@/` prefix: `import { Button } from "@/components/ui/button"`
- Group imports in order:
  1. React/Next.js
  2. External libraries
  3. Internal modules (`@/lib`, `@/hooks`, `@/types`)
  4. Components (`@/components`)
  5. Relative imports (only for files in the same feature folder)

---

## Supabase Rules

- Always enable RLS on every table. No exceptions.
- Never expose `service_role` key on the client side.
- Use `supabase.auth.getUser()` on the server to verify authentication.
- Generate TypeScript types from the database:
  ```bash
  pnpm supabase gen types typescript --project-id <project-id> > src/types/database.ts
  ```
- Write migrations for schema changes.
- Use Supabase Edge Functions for sensitive server logic.

---

## Styling Rules

- Tailwind only. No inline styles. No CSS modules (unless exceptional case).
- Use `cn()` utility to merge conditional classes:
  ```tsx
  import { cn } from "@/lib/utils";
  <div className={cn("base-class", isActive && "active-class")} />
  ```
- Responsive design: mobile-first. Use `sm:`, `md:`, `lg:` breakpoints.
- Dark mode: use `dark:` variant.
- Avoid magic pixel values. Use Tailwind spacing scale.

---

## Prohibitions

1. No `any` type. Use `unknown` then narrow it.
2. No `console.log` in production code. Use a logger or remove before commit.
3. No hardcoded secrets. All keys in `.env.local` via `process.env`.
4. No direct DOM manipulation. Use React state and refs.
5. No default exports (except Next.js pages/layouts which require them).
6. No barrel files (`index.ts` re-exports) — they break tree-shaking.
7. No `useEffect` for data fetching. Use Server Components or React Query / SWR.
8. No committing `.env.local` or any file with secrets.
9. No ignoring TypeScript errors. Fix them.
10. No installing packages without justification.

---

## Git Rules

- Commit messages: imperative mood, concise.
  - `feat: add user authentication flow`
  - `fix: resolve timezone offset in booking display`
  - `refactor: extract payment logic into separate hook`
- Prefixes: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `test:`, `chore:`
- One logical change per commit.
- Never commit broken code.

---

## Testing

- Write tests for: utility functions, API routes, complex business logic, validation schemas.
- Framework: Vitest (unit) + Playwright (E2E when needed).
- Test files next to source: `utils.ts` → `utils.test.ts`
- Every new utility function gets a test.

---

## Pre-Commit Checklist

Before completing any task, verify:

- [ ] TypeScript compiles (`pnpm tsc --noEmit`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] No hardcoded values (URLs, keys, magic numbers)
- [ ] Error states handled in UI (loading, error, empty)
- [ ] Mobile responsiveness checked
- [ ] No `console.log` left in code
- [ ] New dependencies justified
- [ ] Commit message follows convention

---

## Context & Memory

When working on a task:
1. Read relevant files first before making changes.
2. Follow existing patterns — consistency over preference.
3. Suggest refactors as separate steps.

When starting a new feature:
1. Ask clarifying questions if requirements are ambiguous.
2. Propose the plan before writing code.
3. Break large features into small reviewable chunks.

---

## Documentation

- Every exported function has a JSDoc comment.
- Complex logic gets inline comments explaining WHY, not WHAT.
- README.md is kept up to date.
- API routes documented with request/response examples.

---

## Performance

- Use `next/image` for all images.
- Use `next/link` for internal navigation.
- Server Components by default. `"use client"` only when necessary.
- Lazy load heavy components: `dynamic(() => import("./chart"), { ssr: false })`

---

## Security

- Sanitize all user inputs.
- Validate on both client (UX) and server (security).
- Check auth on every protected route and server action.
- Never log sensitive data (passwords, tokens, PII).
