# Generate a frontend-only Markdown spec for Classifieds module (no backend)
content = r"""# BASAR – Classifieds (Үйлчилгээ/Зар) Frontend UI/UX Спек (MVP, FE-only)

> **Зорилго:** Амьтдад чиглэсэн зарын модуль (Lost/Found, Adoption, Marketplace, Services)–ийг **UX энгийн, шууд ойлгомжтой** байдлаар гүйцэтгэх. Энэхүү баримт нь **Frontend-only**: UI/UX, компонент мод, дата төрөл (FE types), болон Cursor-д шууд өгөх **Prompt Pack**-ийг агуулна. _Backend хэсэг шаардахгүй._

---

## 1) IA & Навигаци
- Top tabs: **Lost/Found**, **Adoption**, **Marketplace**, **Services**
- Secondary controls: Search (keyword), Filters bar (animal type, city, price …), Sort
- Detail page → Related listings (same animal/location)
- Create button: “**Зар үүсгэх**” (sticky on mobile footer or top right)

---

## 2) UX Flow (МVP)
1) Browse/List → Filters/Search → Pagination  
2) Detail → Contact/Share/Report → Related  
3) Create → Review → Publish → Redirect to detail

---

## 3) Visual System (дизайн ишлэл)
- **Cards:** 1:1 эсвэл 4:3 зураг, rounded-2xl, shadow-soft, hover:translate-y-[1px]
- **Chips/Badges:** category (Lost/Found/Adoption/Marketplace/Services), animalType
- **Grid:** `grid-cols-2` (mobile), `grid-cols-3` (md+), `gap-6`
- **Filters:** chip + select controls; sticky top on scroll (mobile-friendly)
- **A11y:** focus-visible, aria-labels, keyboard навигаци
- **Motion:** 120–200ms ease-out; prefers-reduced-motion respected

---

## 4) Frontend Data Types (FE-only)
```ts
export type TClassified = {
  id: string;
  category: 'LOST' | 'FOUND' | 'ADOPTION' | 'MARKETPLACE' | 'SERVICE';
  animalType: 'DOG' | 'CAT' | 'OTHER';
  breed?: string | null;
  sex?: 'M' | 'F' | null;
  age?: 'BABY' | 'YOUNG' | 'ADULT' | null;
  size?: 'S' | 'M' | 'L' | null;
  title: string;
  description: string;
  photos: string[]; // URLs
  locationCity: string;
  locationDistrict?: string | null;
  price?: number | null; // Marketplace only
  contactPhone: string;
  contactEmail?: string | null;
  status: 'ACTIVE' | 'CLOSED';
  createdAt: string; // ISO
};

export type TPaged<T> = {
  items: T[];
  totalCount: number;
};
5) Routes & Files (Next.js App Router)
swift
Always show details

Copy code
/app/classifieds/page.tsx                # List + filters
/app/classifieds/new/page.tsx            # Create
/app/classifieds/[id]/page.tsx           # Detail

/src/components/classifieds/
  FiltersBar.tsx
  SortBar.tsx
  ClassifiedCard.tsx
  CardGrid.tsx
  DetailGallery.tsx
  DetailInfo.tsx
  ContactCard.tsx
  ReportButton.tsx
  ClassifiedForm.tsx

/src/components/common/
  Pagination.tsx
  ImageUploader.tsx

/src/components/skeletons/
  CardGridSkeleton.tsx
  DetailSkeleton.tsx

/src/components/empty/
  EmptyState.tsx
  ErrorState.tsx
6) UI Specs (компонентын шаардлага)
6.1 FiltersBar.tsx
Controls (props-оор удирдах):

Category tabs: Lost/Found | Adoption | Marketplace | Services

Animal chips: Dog, Cat, Other (multi/solo toggle configurable)

City select (list), Keyword search (debounce 300ms)

Price min/max (Marketplace үед л үзэгдэнэ)

URL sync: filters → query params (shareable deep link)

A11y: labels, aria-pressed for chips, keyboard reachable

6.2 ClassifiedCard.tsx
Props: { photo, title, category, animalType, city, createdAt, href, price? }

Visual: 1:1 (эсвэл 4:3) ratio, title clamp-2, meta line (chips + city + date)

Clickable area бүхэлдээ, aria-label = title

Price: зөвхөн Marketplace үед (optional)

6.3 CardGrid.tsx
Grid: grid-cols-2 md:grid-cols-3 gap-6

Loading: CardGridSkeleton (6–9 placeholder)

Empty: EmptyState (CTA: “Зар үүсгэх”)

6.4 SortBar.tsx
Options: Newest, Price asc/desc (Marketplace үед л)

A11y: role="radiogroup"; keyboard arrows

6.5 Pagination.tsx
Props: { page, pageSize, total, onPageChange }

Prev / page numbers / next; aria-current="page", keyboard support

6.6 DetailGallery.tsx
Horiz. carousel (snap-x), arrows desktop, swipe mobile

1:1 (эсвэл 4:3) ratio box; alt text заавал

6.7 DetailInfo.tsx
Chips: category, animalType, sex, age, size

Description (safe rich text – sanitize on FE if needed)

Location line → external map link (noopener/noreferrer)

Related section (optional): 3–6 жижиг карт

6.8 ContactCard.tsx
Phone (copy), Email (mailto), Share API (if available)

Micro safe-guard: click-to-reveal (optional anti-scrape)

ReportButton.tsx → opens modal (reason textarea, min 10 chars)

6.9 ClassifiedForm.tsx (Create)
Fields:

category, animalType, breed, sex, age, size

title (<=120, required), description (>=30, required)

photos (1..8) with preview (ImageUploader.tsx)

locationCity (required), locationDistrict (optional)

price (Marketplace only)

contactPhone (required), contactEmail (optional)

UX:

Client validation (zod/yup)

On submit: optimistic loading → success toast → redirect(/classifieds/{id})

Error banner (role="alert"), prevent double submit

A11y: labels, describedby, keyboard submit

7) Cursor Prompt Pack (FE-only)
CLASS-1 — Жагсаалт + Шүүлтүүр + Pagination
bash
Always show details

Copy code
Implement Classifieds List (FE-only, Next.js + Tailwind)

Follow docs:
- docs/code_standart.md, docs/ui_ux_doc.md, docs/cursor_prompt_guide.md

Files:
- app/classifieds/page.tsx
- components/classifieds/{FiltersBar,SortBar,ClassifiedCard,CardGrid}.tsx
- components/common/Pagination.tsx
- components/skeletons/CardGridSkeleton.tsx
- components/empty/EmptyState.tsx

Behavior:
- Keep state in URL query (?category=&animalType=&city=&q=&sort=&page=1&pageSize=12)
- Debounce search (300ms), update grid via fetcher (mock OK)
- Show Skeleton while loading, EmptyState when 0
- A11y: chips have aria-pressed, cards focusable, alt texts

Constraints:
- Scope only; use /src/lib/api.ts or mock data module
CLASS-2 — Дэлгэрэнгүй + Contact/Share/Report
bash
Always show details

Copy code
Implement Classified Detail (FE-only)

Files:
- app/classifieds/[id]/page.tsx
- components/classifieds/{DetailGallery,DetailInfo,ContactCard,ReportButton}.tsx
- components/skeletons/DetailSkeleton.tsx
- components/empty/ErrorState.tsx

Behavior:
- Fetch detail by id (mock OK)
- Gallery (snap-x), Info chips, map link, Contact actions (copy/share/mailto)
- ReportButton opens modal; validates reason >= 10 chars (no backend send)
- Related items (mock 3–6) by animalType/city

A11y:
- Dialog focus trap, labelledby; buttons have aria-label
- Keyboard navigation in gallery (arrows)

Constraints:
- Scope only; mock data permitted
CLASS-3 — Зар үүсгэх (Create)
arduino
Always show details

Copy code
Implement Create Classified Form (FE-only)

Files:
- app/classifieds/new/page.tsx
- components/classifieds/{ClassifiedForm, ImageUploader}.tsx

Behavior:
- Client validation: title<=120, desc>=30, phone required, category required
- ImageUploader: 1..8 images, preview, remove; accept image/*
- On submit: emulate API -> success toast -> redirect to detail (mock id)
- Guard double submit; show error summary (role="alert")

A11y:
- Labels, describedby, keyboard submit; inputs have name/id for forms
8) Acceptance Criteria (FE-only)
 List: filters/search/sort/pagination URL-синктэй, skeleton/empty OK

 Card: 1:1 (эсвэл 4:3) ratio, clamp-ууд, focusable link, alt text

 Detail: gallery swipe + keyboard, info chips, contact actions ажиллана

 Create: validation, preview, success redirect (mock), error banner

 A11y ≥ 90 (component-level), prefers-reduced-motion support

 Perf: CLS≈0 (ratio boxes), debounce 300ms, paginate ≤ 12/хуудас

9) Copywriting (богино, ойлгомжтой)
Tabs: “Алдагдсан/Олдсон”, “Үрчлүүлэх”, “Зар”, “Үйлчилгээ”

Create CTA: “Зар үүсгэх”

Empty: “Таны хайлтанд тохирох зар олдсонгүй”

Report modal: “Шалтгаанаа товч бичнэ үү (≥10 тэмдэгт)”

10) QA Checklist
 Keyboard navigation (chips, selects, pagination, dialog)

 Focus ring зөв; dialog focus trap; Esc хаах

 URL query refresh-д хадгалагдаж байна

 ImageUploader accepts only images; previews remove ажиллана

 Error states болон offline fallback үзэгдэл