# Project State — Session Memory

> Claude Code reads this file at the start of every session.
> Update this file when running `/memory update` or at session end.
> Format: latest state at the top, history below.

---

## Audit & Cursor (template-starter)

- **`audit/`** — `rules.json` (33 правил), `AUDIT_PROMPT.md`, `audit-history.json`, `conflicts.log`; инструкция в `audit/README.md`.
- **`.cursorrules`** — приоритет: `CLAUDE.md` → эта память → `audit/rules.json`.
- **`.cursor/commands/`** — Run audit, Fix all critical, Show rules.

После форка шаблона эти пути остаются валидными; при переносе `audit/` в другой репозиторий см. `audit/README.md`.

---

## Current Session

**Last Updated:** 2026-04-12
**Project:** template-starter (fork → rename under your product)
**Current Feature:** Система аудита Cursor + документация под шаблон
**Status:** `done`

### What Was Done Last Session
- [x] Добавлены `audit/*`, `.cursorrules`, `.cursor/commands/*`, ссылки в README и CLAUDE.md
- [x] Выровнены пути и тексты под `src/app/` и `template-starter`

### Next Steps
1. Подключить Supabase / `.env.local` при старте продукта
2. Запускать периодический аудит командой Run audit по мере роста кода

### Open Questions / Blockers
- [ ] [question or blocker]

### Active Files
Files currently being worked on:
```
src/app/[route]/
src/components/[feature]/
src/lib/[file]
```

---

## Environment Status

- [ ] Supabase project connected
- [ ] `.env.local` configured
- [ ] Types generated (`src/types/database.ts`)
- [ ] Vercel deployment configured
- [ ] pnpm install done

---

## Feature Log

Track features as they're built:

| Feature | Status | Branch | Notes |
|---------|--------|--------|-------|
| Auth flow | — | — | — |
| Dashboard | — | — | — |
| [next feature] | — | — | — |

---

## Session History

### [Date] — Session N
**Built:** [what was completed]
**Decisions:** [key decisions made]
**Carry-over:** [what to do next session]

---

_This file is maintained by Claude Code. Do not delete — it's the project's memory._
