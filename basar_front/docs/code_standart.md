# Create a comprehensive Markdown guide for BASAR code standards and folder structure
content = r"""# BASAR – Кодын стандарт, дүрэм, фолдерын бүтэц (v1.0)

> **Зорилго:** Баг Cursor AI-тай хамтран ажиллах үед нэг мөр кодын стандарттай, PR/Review хурдтай, чанартай нийлүүлэлт хийх нэгдсэн баримт.
> **Хамрах хүрээ:** Frontend (Next.js + TypeScript + Tailwind), Backend (Java/SpringBoot or Next API Routes), DevOps/CI, Git workflow.

---

## 0) Гол зарчим (Guiding Principles)
- **Scope сахих:** *Асуусан функцийг өөрчлөхгүй.* Story/Task-д заагаагүй кодыг засах бол **Issue/PR comment**-оор зөвшөөрөл ав.
- **Ил тод байдал:** PR бүрд “Яагаад, юу өөрчилсөн, хэрхэн шалгасан”-г бич.
- **Нэмэлт зардалгүй чанар:** Автомат формат + lint + тест = CI шаардлага. Гар аргаар үл мартах.
- **A11y-first:** Хүртээмж (keyboard, контраст, ARIA) заавал.
- **Observability:** Console биш — structured logger + error boundary.
- **Security by default:** httpOnly cookie, rate limit, RBAC, input validation.
- **Small PRs:** 300 LOC-аас хэтрэхгүй, feature flag ашигла.
- **i18n-ready:** Текст шууд бичихгүй — i18n key ашигла.
- **Performance:** CLS/INP анхаарч зурагны хэмжээг тогтвортой байлга.

---

## 1) Фолдерын бүтэц (Frontend: Next.js App Router)

/src
/app
/(public) # public routes (Нүүр, Мэдээ, Блог, Байгууллагууд...)
layout.tsx
page.tsx
/news
page.tsx
[slug]/page.tsx
/blog
page.tsx
new/page.tsx
[slug]/page.tsx
/organizations
page.tsx
apply/page.tsx
[slug]/page.tsx
/(auth)
login/page.tsx
/api # Next API routes эсвэл /server/api руу шилжүүлэх
/components
/layout # Header, Footer, Nav, Container, SEO
/ui # Button, Input, Badge, Card, Modal, Pagination, Toast...
/news # ArticleCard, ArticleList, ArticleDetail
/blog
/org
/notifications
/filters
/lib
api.ts # REST client (fetch wrapper + interceptors)
logger.ts # structured logger
a11y.ts # a11y helpers
utils.ts # date, string, number helpers
constants.ts
/hooks
/store # (хэрэв Zustand/Redux ашиглавал)
/styles
globals.css
tailwind.css
/types # глобал TypeScript interfaces
/tests # vitest/jest + testing-library
/mocks # MSW handlers
/public # статик ассет


---

## 2) Нэршил, файлын дүрэм
- Компонент: `PascalCase` (e.g., `ArticleCard.tsx`), hooks: `useCamelCase.ts`
- Файл/фолдер: `kebab-case` (жишээ: `org-apply-form.tsx`) зөвшөөрөгдөнө, харин component бол `PascalCase`.
- CSS class: Tailwind ашиглах, BEM хэрэггүй.
- Types: `TArticle`, `TUser`, `TOrg` гэх мэт `T`-ээр эхлүүл.
- Env хувьсагч: `NEXT_PUBLIC_` (client), бусад нь зөвхөн server.
- i18n key: `news.featured.title`, `org.detail.address`.

---

## 3) TypeScript стандарт
- **no `any`** (зайлшгүй тохиолдолд `TODO(type)` коммент + таск нээ).
- Nullable-г ил тод: `foo?: string` биш, `foo: string | null` (семантик тодорхой).
- API types нэг дор `/src/types` эсвэл OpenAPI codegen ашигла.
- Function гарын үсэг: оролт/гаралт тодорхой.
- Utility types: `Pick`, `Omit`, `Partial`-ыг хэтрүүлэхгүй.

```ts
// ✅ Зөв
export type TArticle = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  category: "NEWS" | "BLOG" | "PHOTO";
  publishedAt: string; // ISO
};

4) React/Next.js дүрэм

Client/Server component-ыг андуурахгүй; use client зөвхөн шаардлагатай үед.

Нэг component = нэг үүрэг. 150–200 LOC хэтрэхгүй, задла.

Props интерфэйс заавал тодорхой.

State менежмент: Эхлээд props + hook → дараа нь store.

Форм: react-hook-form, валидаци zod.

Routing: App Router conventions, metadata ашиглаж SEO-г тохируул.

Зургийн хэмжээ тогтвортой: <Image fill|width/height> + parent ratio box.

Аюулгүй HTML: dangerouslySetInnerHTML → sanitize (DOMPurify).

5) API давхарга (frontend)

Fetch wrapper /lib/api.ts:

Base URL, timeout, JSON parse, error map

Auth cookie илгээх (credentials: "include")

Retry (идэвхгүй endpoint-д биш, idempotent GET-д л 1 удаа)

DTO/Types: Response-г parse/validate (zod).

Error handling: toast + logger.

6) Аюулгүй байдал

Auth: httpOnly cookie + SameSite=Lax, CSRF токен POST-д.

RBAC: USER, ORG, ADMIN middleware.

Rate limit: /api/blog/:id/comments, /api/like зэрэгт заавал.

Validation: zod эсвэл Joi – сервер/клиент хоёуланд.

Headers: X-Content-Type-Options, Referrer-Policy, Content-Security-Policy (nonce).

Secrets: Git-д бүү Commit хий — .env.local, Doppler/Vault.

7) Хүртээмж (A11y)

Бүх интерактив элемент <button>/<a> — div onClick хориглоно.

TAB дарааллаар хүрч очих ёстой; :focus-visible заавал.

Alt, aria-label, role-уудыг зөв хэрэглэ.

Контраст ≥ 4.5:1, motion reduce-г хүндэтгэ.

8) Гүйцэтгэл (Perf)

Images: next/image + lazy; хэмжээ тогтвортой (aspect-ratio).

Code-splitting: route-level dynamic import.

Memoization: useMemo/useCallback дэмий хэрэглэхгүй; profiling хийж ашигла.

Lighthouse ≥ 90 (Perf/SEO/A11y/Best).

9) Тестийн пирамид

Unit (vitest/jest) — utils, hooks (шалгалтын хурдтай, их тоогоор).

Component (testing-library) — critical UI (Card/List/Form).

Integration — api.ts + pages happy path.

E2E (Playwright/Cypress) — 3–5 smoke (login, post, search, org detail).

10) Lint/Format/Hook (заавал)

ESLint: eslint:recommended, @typescript-eslint, react, jsx-a11y, tailwindcss

Prettier: 100 width, semi: true, singleQuote: true

Husky + lint-staged: pre-commit → lint+typecheck, pre-push → test (unit only)

11) Орчны тохиргоо

.editorconfig → мөр төгсгөл, 2 space, utf-8, final newline.

ENV: .env.local (developer), .env.staging, .env.production (CI Secrets).

Feature flags: NEXT_PUBLIC_FF_TRENDING=true гэх мэт.

12) Хувилбарлал, Release

SemVer: MAJOR.MINOR.PATCH

Release notes: өөрчлөлтийн жагсаалт + миграци/онцгой заавар

Canary/feature flag-тай rollout (5% → 25% → 100%)

13) Cursor AI ашиглах бодлого

Prompt = нэг Story | нэг Component — томоор бүү өгөөрэй.

AI үүсгэсэн код шууд merge хийхгүй — lint/typecheck/test + review заавал.

“Өмнөх функцийг өөрчилж болохгүй” requirement: Prompt дотор explicit оруул.

Refactor хийх бол эхлээд Issue/PR comment-оор батлуул.

14) “Өмнөх функцийг бүү өөрчил” дүрэм (Change Control)

Story/PR хүрээнээс гадуур diff илэрвэл Request changes.

Breaking change хийх бол ADR (Architecture Decision Record) нэмнэ.

Хуучин кодыг засах шаардлагатай бол:

Issue нээ (“refactor needed because …”),

TL зөвшөөрсний дараа тусдаа PR.

Git blame-ийг цэвэр хадгалах: reformat/rename-г commit тусад нь.

17) Документац

/docs фолдерт “Design Brief”, “API Spec”, “Data Model” Markdown-ууд.

PR бүрд screenshots/GIF; Story-ийн AC-тай checklist.

README: dev start, scripts, env, URLs.