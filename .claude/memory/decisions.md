# Architectural Decisions Log

> Permanent record of significant decisions made during this project.
> When a decision is made, log it here so future sessions don't re-debate it.
> Format: most recent at top.

---

## Template

```
### [Date] — [Decision Title]
**Context:** Why this decision was needed
**Decision:** What was decided
**Alternatives Considered:** What was rejected and why
**Consequences:** What this means going forward
```

---

## Decisions

### [Date] — Initial Setup
**Context:** Project created from 2Sky Labs template-starter
**Decision:** Next.js 14 App Router + Supabase + Tailwind + shadcn/ui + Vercel
**Alternatives Considered:** Remix (less ecosystem), Prisma (redundant with Supabase types)
**Consequences:** All data fetching in Server Components by default; Edge Functions for sensitive ops

---

_Add new decisions above this line_
