# Template Starter — 2Sky Labs

Универсальный стартовый репозиторий: Next.js 16 + React 19 + Supabase + Tailwind v4 + TypeScript + pnpm.

Форкните → переименуйте → стройте продукт.

---

## Быстрый старт

```bash
git clone https://github.com/kulikman/template-starter.git my-app
cd my-app
bash scripts/post-clone.sh "My Product" "my-product" "https://myproduct.com"
pnpm install
cp .env.example .env.local   # заполните ключи Supabase
pnpm dev
```

Приложение будет доступно на `http://localhost:3000`.

---

## Команды

| Command | Description |
|---------|-------------|
| `pnpm dev` | Запуск dev-сервера |
| `pnpm build` | Production-сборка |
| `pnpm lint` | ESLint проверка |
| `pnpm typecheck` | TypeScript type-check |
| `pnpm format:check` | Prettier проверка |
| `pnpm test` | Vitest unit-тесты |
| `pnpm test:watch` | Vitest в watch-режиме |
| `pnpm check` | Lint + typecheck + format (всё сразу) |
| `pnpm post-clone` | Переименование проекта после форка |
| `pnpm init:structure` | Scaffold папок в пустой директории |

---

## Структура проекта

```text
src/
├── app/                  # Next.js App Router
│   ├── error.tsx         # Глобальный error boundary
│   ├── not-found.tsx     # 404 страница
│   ├── loading.tsx       # Глобальный loading skeleton
│   ├── sitemap.ts        # Динамический sitemap
│   └── dashboard/        # Пример вложенного маршрута с breadcrumbs
├── components/
│   ├── ui/               # shadcn/ui примитивы
│   └── layout/           # Header, Breadcrumbs
├── lib/
│   ├── supabase/         # Клиенты Supabase (client, server, admin, middleware)
│   ├── env.ts            # Zod-валидация переменных окружения
│   ├── validations.ts    # Общие Zod-схемы
│   ├── utils.ts          # cn() и утилиты
│   └── constants.ts      # ROUTES и константы
├── hooks/                # React-хуки
├── types/                # TypeScript-типы
├── config/site.ts        # Метаданные сайта и навигация
└── proxy.ts              # Session refresh + security headers (Next 16)
```

Подробная структура и правила: [`CLAUDE.md`](CLAUDE.md).

---

## Переменные окружения

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # только сервер

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MyProduct
```

Все переменные валидируются Zod-схемой в `src/lib/env.ts` — приложение упадёт на старте, если что-то не так.

---

## AI-агенты

Репозиторий оптимизирован для работы с Claude Code и Cursor:

- **`CLAUDE.md`** — основные правила стека и кода
- **`AGENTS.md`** — предупреждение для агентов о Next.js 16
- **`.cursorrules`** — приоритеты для Cursor
- **`.claude/`** — memory, instincts, skills (architect, review, memory)
- **`audit/`** — 41 правило аудита, промпт, история

Команды Cursor: `.cursor/commands/` (Run audit, Fix all critical, Show rules).

---

## Качество и CI

GitHub Actions при каждом push/PR:

- ESLint + TypeScript + Prettier
- Vitest unit-тесты
- Gitleaks (сканирование секретов)
- `pnpm audit` (блокирует HIGH/CRITICAL CVE)
- Production build

---

## Деплой

Push в `main` → Vercel авто-деплой. Убедитесь что переменные окружения настроены в Vercel Dashboard.

---

## SEO

- `public/robots.txt` — обновите Sitemap URL
- `public/llms.txt` — заполните информацией о продукте
- `src/app/sitemap.ts` — добавьте динамические маршруты
- Metadata через `siteConfig` в `src/config/site.ts`
