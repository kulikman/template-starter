# Skills — Команды вызова

Справочник всех скиллов: что делает, когда использовать, примеры вызовов.
Вставь в `.claude/SKILLS.md` или держи рядом с CLAUDE.md.

---

## Принцип работы скиллов

Скилл — это системный промпт для конкретной задачи. Claude переключается в роль специалиста и выдаёт production-ready код, а не объяснения.

**Формат вызова в Cursor:** `/команда [контекст]`
**Формат вызова в Claude.ai:** написать запрос — скилл активируется автоматически по ключевым словам.

---

## `/db` — Supabase Architect

**Скилл:** `supabase-architect`
**Роль:** Старший DBA. Проектирует схемы, пишет RLS, миграции, Edge Functions.
**Выдаёт:** SQL + TypeScript, готовый к копированию.

**Ключевые слова-триггеры:** Supabase, PostgreSQL, RLS, таблица, схема, миграция, Edge Function, хранимые процедуры, auth, storage, realtime

**Примеры вызовов:**

```
/db проектируй схему для SaaS с multi-tenancy: organizations → members → projects → tasks

/db создай таблицу invoices с RLS: пользователь видит только свои, admin видит всё

/db напиши Edge Function отправки email через Resend при создании заказа

/db добавь soft delete ко всем таблицам через deleted_at + trigger

/db напиши миграцию: добавить поле usd_amount в finance_records, nullable

/db создай систему ролей: owner / admin / member с RLS на уровне organization_id

/db настрой realtime subscription для таблицы notifications
```

---

## `/ui` — Premium Animated UI

**Скилл:** `premium-animated-ui`
**Роль:** World-class UI/UX + frontend engineer. Создаёт кинематографичные интерфейсы.
**Выдаёт:** Next.js / React компоненты с Tailwind, анимациями, темной темой.

**Ключевые слова-триггеры:** лендинг, компонент, страница, дашборд, hero, анимации, UI, design, красиво, премиум

**Примеры вызовов:**

```
/ui hero section для eSIM travel product: глобус, анимация подключения, CTA "Get SIM"

/ui dashboard карточки KPI для телеком CRM: выручка, активные SIM, новые клиенты

/ui pricing таблица для MVNO платформы: 3 тарифа, toggle monthly/annual, CTA

/ui sidebar навигация с аккордеоном: иконки, active state, collapsed mode

/ui onboarding wizard: 4 шага с прогресс-баром и анимацией между шагами

/ui data table с сортировкой, фильтрами, пагинацией для списка инвойсов

/ui modal создания новой организации с валидацией Zod + react-hook-form
```

---

## `/seo` — SEO Machine

**Скилл:** `seo-machine`
**Роль:** Full-stack SEO инженер. Генерирует все SEO артефакты за один проход.
**Выдаёт:** `seo-config.ts`, `sitemap.xml`, `robots.txt`, `llms.txt`, FAQ + схема, OG теги, structured data.

**Ключевые слова-триггеры:** SEO, meta теги, sitemap, robots.txt, llms.txt, schema markup, OG теги, поисковая оптимизация

**Примеры вызовов:**

```
/seo neosim.app — глобальный eSIM кошелёк, целевая аудитория: путешественники, ключи: esim global travel sim card

/seo 2skymobile.com — B2B MVNO/MVNE платформа, ключи: wholesale connectivity mvno launch platform

/seo os.elaurion.com — Founder OS для предпринимателей, ключи: founder operating system startup management

/seo сгенерируй только llms.txt и llms-full.txt для crm.2skymobile.com

/seo добавь FAQSchema на страницу /pricing для NeoSIM

/seo проверь и обнови sitemap — добавились новые роуты /blog и /partners
```

---

## `/security` — Security Hardening

**Скилл:** `security-hardening`
**Роль:** Старший security engineer. Закрывает дыры в auth, API, инфраструктуре.
**Выдаёт:** Nginx rules, middleware код, CSP headers, rate limiting, fail2ban configs.

**Ключевые слова-триггеры:** безопасность, DDoS, brute force, уязвимость, CORS, CSP, rate limiting, JWT, MFA, webhook, secrets

**Примеры вызовов:**

```
/security настрой rate limiting на auth endpoints в Next.js middleware (Supabase auth)

/security добавь CSP headers и security headers в next.config.ts

/security защита webhook от Stripe: верификация подписи в Edge Function

/security аудит: какие данные могут утечь через client components в нашем стеке?

/security настрой Vercel Edge Middleware для блокировки по IP / геолокации

/security MFA через TOTP: схема реализации с Supabase Auth

/security secrets rotation plan: как менять ключи без downtime
```

---

## `/ci` — GitHub Workflow

**Скилл:** `github-workflow`
**Роль:** DevOps инженер. Строит CI/CD пайплайны, автоматизацию, branch protection.
**Выдаёт:** GitHub Actions YAML, скрипты, конфигурации.

**Ключевые слова-триггеры:** CI/CD, GitHub Actions, деплой, pipeline, PR checks, branch protection, автоматизация

**Примеры вызовов:**

```
/ci создай базовый workflow: lint + typecheck + build при каждом push и PR

/ci настрой автодеплой на Vercel при merge в main, preview при PR

/ci добавь Supabase миграции в pipeline: auto-migrate staging при PR, production при merge

/ci настрой branch protection: require PR review, require CI pass, no direct push to main

/ci создай workflow release: bump version, changelog, GitHub Release при тэге v*

/ci настрой dependabot для автоматических security updates npm пакетов

/ci добавь проверку secrets leaks (gitleaks) в pre-commit hook
```

---

## `/review` — Code Reviewer

**Скилл:** `code-reviewer` (загружен из uploaded `SKILL.md`)
**Роль:** Старший инженер. Ищет реальные проблемы — баги, уязвимости, N+1, missing RLS.
**Выдаёт:** Структурированный отчёт: Critical / Warning / Suggestion.

**Ключевые слова-триггеры:** review, проверь код, найди баги, аудит, PR review, что не так

**Примеры вызовов:**

```
/review src/app/api/invoices/route.ts

/review этот компонент — проверь на N+1, missing await, типы

/review вся папка src/features/finance/ — security audit

/review миграция 20240418_add_payments.sql — RLS и индексы

/review Edge Function send-invoice-email — CORS, auth, error handling

# Прямо в тексте:
"Проверь этот код на безопасность: [вставить код]"
"Найди все проблемы в этом компоненте: [вставить]"
```

**Что проверяет автоматически:**
- N+1 запросы (AP-01)
- service_role в клиенте (AP-02)
- trust client user_id (AP-03)
- missing await (AP-04)
- missing RLS (AP-05)
- getSession() на сервере (AP-06)
- secrets в client components (AP-07)
- 2SkyMobile CRM специфика: status='reconciled', usd_amount fallback, category.title

---

## `/content` — Content Engine

**Скилл:** `content-engine`
**Роль:** SEO-копирайтер. Пишет статьи, гайды, лонгриды с keyword targeting.
**Выдаёт:** Готовые к публикации статьи с meta тегами, structured data, внутренними ссылками.

**Ключевые слова-триггеры:** статья, блог пост, гайд, контент, SEO текст, напиши про

**Примеры вызовов:**

```
/content статья "Как запустить MVNO в 2025 году" — для блога 2skymobile.com, ключ: mvno launch guide

/content гайд "eSIM vs Physical SIM: что выбрать путешественнику" — neosim.app, en

/content 5 статей для контент-плана: wholesale telecom, eSIM business, MVNE platform

/content landing page copy для NeoSIM: hero, features, pricing, FAQ, CTA
```

---

## `/copy` — Telecom Copywriter

**Скилл:** `telecom-copywriter`
**Роль:** B2B телеком копирайтер. Говорит языком eSIM, MVNO, wholesale connectivity.
**Выдаёт:** Маркетинговые тексты, pitch decks, email sequences, продуктовые описания.

**Ключевые слова-триггеры:** маркетинг, копирайт, pitch, email кампания, продуктовый текст, eSIM, MVNO, wholesale

**Примеры вызовов:**

```
/copy pitch deck для 2SkyMobile: MVNE-as-a-Service, целевая аудитория — MNO и enterprise

/copy email sequence (5 писем) для onboarding новых партнёров 2SkyMobile

/copy one-pager для NeoSIM: B2C eSIM wallet для путешественников

/copy LinkedIn пост анонс запуска NeoSIM

/copy case study: как клиент X запустил MVNO за 30 дней на 2SkyMobile

/copy white paper "State of eSIM 2025" — 8 страниц для lead generation
```

---

## `/ga4` — GA4 + GTM Setup

**Скилл:** `ga4-gtm-setup`
**Роль:** Analytics инженер. Настраивает измерение конверсий, аудитории, attribution.
**Выдаёт:** GTM container JSON, GA4 event схемы, dataLayer код, conversion setup.

**Ключевые слова-триггеры:** аналитика, GA4, GTM, Google Analytics, конверсии, remarketing, tracking

**Примеры вызовов:**

```
/ga4 настрой GA4 + GTM для neosim.app: конверсии — покупка eSIM, регистрация

/ga4 server-side conversion tracking через Vercel Edge (CAPI)

/ga4 remarketing аудитории: посетители /pricing, не купившие за 7 дней

/ga4 ecommerce tracking для eSIM покупки: add_to_cart, purchase, refund

/ga4 настрой attribution модель для paid social → eSIM purchase

/ga4 GTM container для 2skymobile.com: lead form submission, demo request
```

---

## Быстрая шпаргалка

```
Задача                              Команда
─────────────────────────────────────────────────────
Новая таблица / схема / RLS         /db [описание]
UI компонент / страница             /ui [описание]
SEO файлы / мета / llms.txt         /seo [сайт + ключи]
Безопасность / auth / headers       /security [угроза]
CI/CD / GitHub Actions              /ci [что автоматизировать]
Проверка кода                       /review [файл или код]
SEO статья / блог                   /content [тема + ключ]
Маркетинг / pitch / email           /copy [контекст]
Аналитика / конверсии               /ga4 [цель]
Сохранить контекст сессии           /memory update
Восстановить контекст               /memory show
```

---

## Когда скилл НЕ нужен

- Общий вопрос по коду → просто спроси
- Дебаг конкретного бага → объясни симптом
- Рефакторинг одного файла → `/review` + правки
- Архитектурное решение → `/db` или `/api` с вопросом

Скилл нужен когда нужен **артефакт** (код, файл, конфиг), а не объяснение.
