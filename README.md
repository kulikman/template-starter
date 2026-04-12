# Template Starter

Универсальный стартовый репозиторий: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase, pnpm. Форкните и переименуйте под свой продукт.

- Шаблон: [github.com/kulikman/template-starter](https://github.com/kulikman/template-starter)
- Стек: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase, pnpm

---

## Быстрый старт

```bash
git clone https://github.com/kulikman/template-starter.git my-app
cd my-app
pnpm install
cp .env.example .env.local
pnpm dev
```

Приложение будет доступно на `http://localhost:3000`.

---

## Доступные команды

| Command | Description |
|---------|-------------|
| `pnpm dev` | Запуск dev-сервера |
| `pnpm build` | Production-сборка |
| `pnpm start` | Запуск production-сборки |
| `pnpm lint` | ESLint проверка |
| `pnpm tsc --noEmit` | TypeScript type-check |

---

## Переменные окружения

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Optional
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_APP_NAME=
```

`SUPABASE_SERVICE_ROLE_KEY` используется только на сервере и не должен попадать в клиентский код.

---

## Структура проекта

```text
src/
├── app/                # Роуты Next.js App Router
├── components/         # UI и feature-компоненты
├── hooks/              # Кастомные React-хуки
├── lib/                # Утилиты, клиенты, валидация
├── styles/             # Глобальные стили
└── types/              # Общие TypeScript-типы
```

---

## Аудит и правила Cursor

В репозитории есть **`.cursorrules`**, каталог **`audit/`** (правила, промпт, история) и команды в **`.cursor/commands/`** (Run audit, Fix all critical, Show rules). Подробности: [`audit/README.md`](audit/README.md).

---

## Качество и CI

В проекте включены автоматические проверки в GitHub Actions:

- ESLint
- TypeScript type-check
- Security scan
- Build check

Перед push/PR рекомендуется запускать:

```bash
pnpm lint && pnpm tsc --noEmit
```

---

## Деплой

Типичный деплой — через Vercel из ветки `main` (или вашей production-ветки).

---

## Лицензия

Условия использования определяются владельцем вашего форка / репозитория.
