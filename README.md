# 2SkyMobile CRM

CRM-платформа для внутренних команд и B2B-процессов 2SkyMobile.

- Репозиторий: [github.com/kulikman/2Skymobile-CRM](https://github.com/kulikman/2Skymobile-CRM)
- Стек: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase, pnpm

---

## Быстрый старт

```bash
git clone https://github.com/kulikman/2Skymobile-CRM.git
cd 2Skymobile-CRM
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

Основной деплой выполняется через Vercel из ветки `main`.

---

## Лицензия

Внутренний проект 2SkyMobile. Условия использования определяются владельцем репозитория.
