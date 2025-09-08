Cursor Prompt — NEWS-3 (Мэдээний дэлгэрэнгүй)

Story: NEWS-3 – Мэдээний дэлгэрэнгүй унших
Goal: Хэрэглэгч мэдээний дэлгэрэнгүйг аюулгүйгээр уншиж, холбоотой нийтлэлүүдийг үзнэ. SEO/OG метатай.

Follow these docs (заавал мөрд):

docs/code_standart.md → (React/Next дүрэм, A11y, API давхарга, “Өмнөх функцийг бүү өөрчил”)

docs/ui_ux_doc.md → (News detail page spec, Card/Badge/Spacing tokens, A11y)

docs/cursor_prompt_guide.md → (Prompt стандарт, Scope хязгаарлалт)

Scope

Зөвхөн мэдээний дэлгэрэнгүй хуудас ба түүнтэй холбоотой UI.

Scope-оос гадна файлуудыг бүү өөрчил.

Files & Structure (Next.js App Router + Tailwind)

Create/Update:

app/news/[slug]/page.tsx (Route page)

src/components/news/ArticleDetail.tsx

src/components/news/RelatedArticles.tsx

src/components/common/Breadcrumbs.tsx

src/components/skeletons/SkeletonArticle.tsx

src/components/empty/ErrorState.tsx (404/алдаа)

(optional) src/lib/sanitize.ts → HTML sanitize helper

Use existing:

src/lib/api.ts (api<T>(path, init?)) wrapper-оор fetch хийх

Data contract

GET /api/news/{slug} →

{
  "id": "string",
  "slug": "string",
  "title": "string",
  "content": "<p>safe or to sanitize</p>",
  "imageUrl": "string|null",
  "author": { "name": "string", "avatarUrl": "string|null" },
  "tags": ["string"],
  "publishedAt": "2025-01-01T12:00:00Z"
}


GET /api/news?tag={tag}&limit=3 → related 3 items (id,title,imageUrl,slug,publishedAt)

Requirements

Article Detail page

page.tsx:

generateMetadata ашиглан SEO/OG (title, description from excerpt or first 160 chars, openGraph.images) тохируул.

Server Component (боломжтой бол) – SSR-д ээлтэй.

Fetch detail (/api/news/{slug}), алдаа/404-ийг ErrorState руу илгээ.

ArticleDetail.tsx:

Cover image (16:9, CLS алдагдуулахгүй), title, author chip (avatar+name), time огноо, category/tag chips (шаардлагатай бол), гол content.

HTML агуулгыг sanitize хийж render-лэ (e.g., DOMPurify / isomorphic-dompurify эсвэл src/lib/sanitize.ts).

Share actions: Copy link, Share API (if available), small buttons.

Breadcrumbs: Home → Мэдээ → {title (truncate 1 line)}.

RelatedArticles.tsx:

Эхний tag-аар /api/news?tag=X&limit=3 татаж 3 карт үзүүл.

Card жижиг (image 16:9 thumbnail, title 2 мөр, date).

Хэрэв tag байхгүй эсвэл хоосон бол энэ хэсгийг нуух.

UX/A11y

SkeletonArticle: cover (ratio box) + 3–5 шугам skeleton.

ErrorState: 404/Fetch fail үед товч тайлбар + “Бүх мэдээ рүү” CTA.

Keyboard: breadcrumbs/links focusable, share товч нь aria-label-тай.

Alt текст: cover-ийн агуулгад тохирсон.

Focus ring: focus-visible классууд.

Design (ui_ux_doc.md-тай тааруул)

Title spacing, rounded-2xl, shadow-soft, tokens: brand primary/secondary/accent.

Content typography: prose класс (dark mode-той нийцүүлж тохируул).

Grid container: max-w-3xl detail + доор RelatedArticles full width section.

Types

src/types/news.ts-д нэмж/баталгаажуул:

export type TNewsDetail = {
  id: string;
  slug: string;
  title: string;
  content: string; // HTML
  imageUrl?: string | null;
  author?: { name: string; avatarUrl?: string | null } | null;
  tags?: string[];
  publishedAt: string; // ISO
};

Testing

Component tests (testing-library):

Title, time, author chip, cover img render.

Sanitized HTML зөв render болж байгаа (script/style strip болсон) кейс.

RelatedArticles: tag байгаа үед 3 карт үзүүлэх, байхгүй үед нуух.

ErrorState: 404 үед зөв мессеж/CTA.

Accessibility:

aria-label for share buttons, breadcrumb nav aria-label="breadcrumb".

Keyboard navigation happy path.

Acceptance Criteria (NEWS-3)

 /news/[slug] дээр мэдээний гарчиг, зураг, огноо, зохиогч, агуулга харагдана

 Агуулга sanitize хийгдсэн (скрипт, сэжигтэй tag strip)

 Related 3 нийтлэл (tag-аар) доор харагдана (tag байхгүй бол нууж болно)

 SEO мета + OpenGraph зураг тохируулагдсан

 Skeleton loading + 404/Error state бэлэн

 A11y: breadcrumbs/links focusable, share action-ууд семантик зөв

Constraints

Scope-оос гадуур файл бүү өөрчил.

API бэлдээгүй бол MSW/mock-оор гэрээт JSON-оор турш.

CLS бага (ratio box), Lighthouse A11y ≥ 90 зорих.

Deliverables

app/news/[slug]/page.tsx, ArticleDetail.tsx, RelatedArticles.tsx, Breadcrumbs.tsx, SkeletonArticle.tsx, ErrorState.tsx

Тест файлууд

Богино README (slug route, sanitize, SEO usage)