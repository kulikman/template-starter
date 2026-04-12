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

audit/                    # Audit rules, AUDIT_PROMPT, history (see audit/README.md)
.cursor/commands/         # Cursor: Run audit, Fix all critical, Show rules
.cursorrules              # Cursor agent defaults for this repo
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

## Design System

> This section defines the visual language of all products in the 2Sky ecosystem.
> Every UI decision — components, pages, dashboards — must follow these rules.
> Do not invent visual choices. Reference this section first.

---

### Core Aesthetic

**Style:** Glassmorphism — frosted glass layers, translucency, depth
**Character:** Premium B2B technology. Dark, precise, confident.
**Rule:** Never produce a static UI. Every component must have at least one animation or transition.
**Anti-pattern:** No generic "clean startup" look. No purple gradients on white. No flat card grids without depth.

---

### Design Architecture: Multi-Product System

All products share a **base visual system** (dark background, glassmorphism, Geist typography).
Each product gets its own **accent color** that defines its identity.

| Product | Accent Primary | Accent Secondary | Character |
|---------|---------------|-----------------|-----------|
| 2SkyMobile | `#00D4FF` | `#0099CC` | B2B telecom — precise, technical |
| NeoSIM | TBD | TBD | Consumer travel — fluid, global |
| Aurelia | TBD | TBD | Conceptual — cosmic, philosophical |
| 2Sky Ventures | TBD | TBD | Investment — sharp, confident |

> When building for a specific product, apply that product's accent. Base tokens remain constant.

---

### Color Tokens — 2SkyMobile (Priority Product)

Define these as CSS custom properties in `globals.css`. Reference them everywhere.

```css
:root {
  /* Backgrounds */
  --bg-base:        #060D1F;   /* night ocean — main app background */
  --bg-surface:     rgba(255, 255, 255, 0.04);  /* glass card base */
  --bg-surface-hover: rgba(255, 255, 255, 0.07);
  --bg-elevated:    rgba(0, 212, 255, 0.05);    /* accent-tinted surface */

  /* Glass layers */
  --glass-border:   rgba(255, 255, 255, 0.08);
  --glass-border-accent: rgba(0, 212, 255, 0.20);
  --glass-blur:     16px;
  --glass-blur-heavy: 32px;

  /* Text */
  --text-primary:   #F0F4FF;
  --text-secondary: rgba(240, 244, 255, 0.55);
  --text-muted:     rgba(240, 244, 255, 0.30);

  /* Accent — 2SkyMobile Cyan */
  --accent:         #00D4FF;
  --accent-dim:     #0099CC;
  --accent-glow:    rgba(0, 212, 255, 0.25);
  --accent-glow-strong: rgba(0, 212, 255, 0.45);

  /* Status */
  --success:        #00E5A0;
  --warning:        #FFB800;
  --error:          #FF4560;

  /* Spacing scale (8pt grid) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Border radius */
  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  20px;
  --radius-xl:  32px;
  --radius-full: 9999px;
}
```

---

### Typography System

**Primary font:** `Geist` (via Vercel CDN or Google Fonts fallback)
**Mono accent:** `Geist Mono` — use for data, metrics, IDs, code snippets
**Fallback stack:** `system-ui, -apple-system, sans-serif`

**Banned fonts (never use):** Inter, Roboto, Arial, Helvetica, Open Sans, Lato, Montserrat, Poppins, Nunito, Raleway, Space Grotesk, DM Sans, Plus Jakarta Sans

```css
/* Load in layout.tsx or globals.css */
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&family=Geist+Mono:wght@400;500&display=swap');
```

**Type scale:**

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-display` | 56–72px | 700–800 | Hero headlines |
| `text-h1` | 40–48px | 700 | Page titles |
| `text-h2` | 28–32px | 600 | Section headers |
| `text-h3` | 20–24px | 600 | Card titles |
| `text-body` | 16px | 400 | Body copy |
| `text-small` | 14px | 400 | Labels, captions |
| `text-micro` | 12px | 500 | Tags, badges |
| `text-mono` | 13–14px | 400–500 | Metrics, data, IDs |

---

### Glassmorphism Implementation Pattern

This is the core UI element. Use it consistently for all cards, panels, modals, and sidebars.

```tsx
// Standard glass card — copy this pattern
<div
  className="relative rounded-xl border backdrop-blur-md transition-all duration-300"
  style={{
    background: 'var(--bg-surface)',
    borderColor: 'var(--glass-border)',
    backdropFilter: 'blur(var(--glass-blur))',
  }}
>
  {/* Accent glow on hover — applied via group-hover or JS */}
  <div
    className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
    style={{ boxShadow: '0 0 30px var(--accent-glow)' }}
  />
  {children}
</div>
```

**Glass card variants:**

| Variant | Use case | Border |
|---------|----------|--------|
| `glass-default` | Standard cards | `--glass-border` |
| `glass-accent` | Featured / selected state | `--glass-border-accent` |
| `glass-elevated` | Modals, overlays | `--glass-border` + stronger blur |

---

### Animation Rules

**Rule:** Every section must have at least ONE animation. Static UI is forbidden.

**Performance constraint:** Animations must only use `transform` and `opacity`. Never animate `height`, `width`, `top`, `left`, or `background` directly (triggers layout/paint).

#### Required animations by component type:

| Component | Animation |
|-----------|-----------|
| Page load | Staggered entrance: fade-up + opacity, 150ms delay per element |
| Cards | Scroll reveal via `IntersectionObserver` |
| Card hover | `translateY(-4px)` + accent glow intensify |
| Buttons | Scale `1.02` on hover, `0.97` on active |
| Modals | Scale `0.95→1` + opacity `0→1` on open |
| Data tables | Row fade-in stagger on mount |
| Metrics/numbers | Count-up animation on enter viewport |
| Navigation | Underline slide on active item |
| Background | Slow gradient drift (60s loop, subtle) |

#### Standard CSS animation tokens:

```css
/* Paste into globals.css */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 0.8; }
}

@keyframes gradientDrift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-fade-up    { animation: fadeUp 0.5s ease forwards; }
.animate-fade-in    { animation: fadeIn 0.4s ease forwards; }
.animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
```

#### Scroll reveal pattern (use in every section):

```tsx
// hooks/use-scroll-reveal.ts
import { useEffect, useRef } from 'react'

export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          observer.disconnect()
        }
      },
      { threshold }
    )
    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
```

---

### Component Patterns

#### Button

```tsx
// Primary CTA
<button className="relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-200
  hover:scale-[1.02] active:scale-[0.97]"
  style={{
    background: 'linear-gradient(135deg, var(--accent), var(--accent-dim))',
    color: '#060D1F',
    boxShadow: '0 0 20px var(--accent-glow)',
  }}
>
  {label}
</button>

// Secondary ghost
<button className="px-6 py-3 rounded-full font-medium text-sm border transition-all duration-200
  hover:scale-[1.02] active:scale-[0.97]"
  style={{
    borderColor: 'var(--glass-border-accent)',
    color: 'var(--accent)',
    background: 'transparent',
  }}
>
  {label}
</button>
```

#### Metric / KPI card

```tsx
<div className="glass-card group p-6">
  <p className="text-micro uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
    {label}
  </p>
  <p className="text-h1 font-bold mt-2" style={{ color: 'var(--text-primary)', fontFamily: 'Geist Mono' }}>
    {value}
  </p>
  <span className="text-small" style={{ color: trend > 0 ? 'var(--success)' : 'var(--error)' }}>
    {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
  </span>
</div>
```

#### Data badge / tag

```tsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-micro font-medium"
  style={{
    background: 'var(--accent-glow)',
    color: 'var(--accent)',
    border: '1px solid var(--glass-border-accent)',
  }}
>
  {label}
</span>
```

---

### Layout Rules

* **Grid:** 12-column CSS Grid. Dashboard sidebar: 240px fixed. Content: fluid.
* **Max content width:** 1280px centered.
* **Section padding:** `var(--space-16)` vertical, `var(--space-8)` horizontal on mobile.
* **Card gap:** `var(--space-6)` default, `var(--space-4)` in dense grids.
* **Z-index scale:** background `0` → content `10` → sticky elements `20` → modals `50` → toasts `100`.

---

### Backgrounds

For hero sections and page backgrounds, use layered gradients — not flat colors.

```css
/* Page background — standard */
.bg-app {
  background:
    radial-gradient(ellipse 80% 50% at 20% 0%, rgba(0, 212, 255, 0.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0, 153, 204, 0.05) 0%, transparent 60%),
    #060D1F;
}

/* Hero section with depth */
.bg-hero {
  background:
    radial-gradient(ellipse 100% 60% at 50% 0%, rgba(0, 212, 255, 0.12) 0%, transparent 70%),
    #060D1F;
}
```

---

### Design Prohibitions

1. No light mode by default. All UI is dark-first.
2. No flat white or grey cards without glassmorphism treatment.
3. No static sections — every block must have scroll reveal or entrance animation.
4. No generic icon sets used as decoration. Icons are functional only.
5. No more than 3 font sizes in a single component.
6. No more than 2 accent colors on a single page (primary + status).
7. No inline `style` for spacing — use Tailwind scale.
8. No border-radius below `--radius-sm` (6px) on interactive elements.
9. No unstructured backgrounds — always use the layered gradient system.
10. No animations that animate layout properties (`height`, `width`, `margin`, `padding`).

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
* All design tokens from the Design System section must be defined as CSS custom properties in `globals.css` — never hardcode hex values in components.

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
11. No hardcoded hex colors in components. Use CSS custom properties from the Design System.
12. No static UI. Every component must include at least one transition or animation.
13. No light-mode-first design. Dark is the default.

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
