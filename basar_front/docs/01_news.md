Story: NEWS-1 – Мэдээний жагсаалт харах
Goal: Хэрэглэгч эхний хуудсанд хамгийн сүүлийн мэдээнүүдийг pagination-тай үзнэ.

Follow these docs (заавал мөрд):

docs/code_standart.md → (Нэршил, React/Next дүрэм, API давхарга, A11y, PR/CI, “Өмнөх функцийг бүү өөрчил”)

docs/ui_ux_doc.md → (Design tokens, Card/List, News page/list specs, A11y)

docs/cursor_prompt_guide.md → (Prompt-уудын нийтлэг шаардлага)

Scope

Зөвхөн мэдээний жагсаалт харуулах UI + дата таталт + pagination + skeleton/empty state.

Scope-оос гадна файлуудыг өөрчлөхгүй. Шаардлагатай бол TODO сэтгэгдэл үлдээгээд зогс.

Files & Structure (Next.js App Router + Tailwind)

Create:

/src/components/news/ArticleCard.tsx

/src/components/news/ArticleList.tsx

/src/components/common/Pagination.tsx

/src/components/skeletons/SkeletonList.tsx

/src/components/empty/EmptyState.tsx

Modify (хэрэв байхгүй бол үүсгэ):

/src/lib/api.ts ашиглан бүх fetch-ийг хий (wrapper заавал).

Data contract

GET /api/news?page=1&pageSize=10&category?=&tag?=

Response (жагсаалт):

{
  "items": [
    {
      "id": "string",
      "title": "string",
      "excerpt": "string",
      "imageUrl": "string|null",
      "category": "HEALTH|TRAINING|ADOPTION|OTHER",
      "publishedAt": "2025-01-01T12:00:00Z"
    }
  ],
  "totalCount": 123
}


Дата таталтыг /src/lib/api.ts-ийн api<T>(path, init?) wrapper-аар хий.

Requirements

ArticleList.tsx

Сервер-эсвэл клиент компонент байж болно, гэхдээ SSR-д ээлтэй байлга.

10 item/page харагдана. page query параметрт тулгуурлан fetch хийнэ.

Дээр нь category/tag фильтр идэвхжүүлэх hook/props бэлэн байх интерфэйс үлдээ (одоогоор заавал хэрэгжүүлэхгүй, prop оролтыг нэмж бэлдэ).

Loading үед SkeletonList (карт бүрийн 16:9 зураг + 2 мөр шугам) харуул.

Хоосон үед EmptyState (товч тайлбар + “Бүх мэдээ” линк) харуул.

Листийн доор <Pagination/> байрлуул; keyboard-оор удирдаж болох.

ArticleCard.tsx

Props: { title, imageUrl, category, publishedAt, href, excerpt }

Зураг 16:9 тогтмол харьцаатай, CLS алдагдуулахгүй.

Гарчиг 2 мөр хүртэл line-clamp-2, тайлбар 3 мөр line-clamp-3.

Category chip (өнгө нь design tokens-оор), огноо time элемент.

Бүхэлдээ focusable; Enter дарвал нээгдэнэ; aria-label тохируул.

Pagination.tsx

Props: { page: number, pageSize: number, total: number, onPageChange?: (p:number) => void }

Previous / 1 … n / Next (keyboard-д ээлтэй, aria-current тэмдэглэгээ).

Router query-г шинэчилж scroll position-оо зөөлөн хадгал (optional).

A11y & UX

Focus ring: focus-visible классууд, таб дарааллаар зөв явна.

Бүх модал/дропдаун байхгүй; линк/товчлуурууд семантик зөв элементээр.

Alt текст: “амьтны нэр/ангилал + үйл явдал” маягаар.

Design (ui_ux_doc.md-тай тааруул)

Rounded-2xl, shadow-soft, hover: багахан translate-y.

Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6

Brand өнгө: primary/secondary/accent токенууд.

i18n

Харагдах текстийг ирээдүйд i18n болгохоор тогтмол хувийн файлд төвлөрүүл (одоогоор en/mn key scaffolding).

Types

/src/types/news.ts

export type TNewsListItem = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  category: 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER';
  publishedAt: string; // ISO
};
export type TNewsListResponse = { items: TNewsListItem[]; totalCount: number; };

Testing (testing-library)

Unit/Component:

ArticleCard гарчиг, category chip, огноо, линк render болж буйг шалга.

ArticleList loading → data render → empty state гурван төлөвийг шалга.

Pagination дээр next/prev товчны үйлдлийг шалга, aria-current зөв эсэх.

Тест файлууд:

/src/components/news/__tests__/ArticleCard.test.tsx

/src/components/news/__tests__/ArticleList.test.tsx

/src/components/common/__tests__/Pagination.test.tsx

Acceptance Criteria (NEWS-1)

 Эхний хуудсанд 10 мэдээ (title, image, category, date) pagination-тай харуулна

 Loading үед skeleton, дата байхгүй бол empty state харагдана

 Keyboard A11y: картууд focusable, Enter → нээнэ; pagination keys OK

 CLS бага (16:9 тогтмол харьцаатай зураг)

 Design tokens ба grid spacing ui_ux_doc.md-тай нийцсэн байх

Constraints

Scope-оос гадуур файл бүү өөрчил.

API дуусаагүй бол MSW/mock ашиглаж тухайн хэлбэрийн JSON-оор турш.

Lint/Typecheck алдаагүй; Lighthouse A11y ≥ 90 (component level боломжийн хэмжээнд).

Deliverables

ArticleList.tsx, ArticleCard.tsx, Pagination.tsx, SkeletonList.tsx, EmptyState.tsx

Тест файлууд

Богино README хэсэг (component usage + props тайлбар)