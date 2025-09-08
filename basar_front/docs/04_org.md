
Follow these docs (заавал мөрд):

docs/code_standart.md → (Нэршил, React/Next дүрэм, API давхарга, A11y, PR/CI, “Өмнөх функцийг бүү өөрчил”)

docs/ui_ux_doc.md → (Design tokens, Card/List, News page/list specs, A11y)

docs/cursor_prompt_guide.md → (Prompt-уудын нийтлэг шаардлага)

ORG-1 (Байгууллагын жагсаалт авах)
Story: ORG-1 – Байгууллагын жагсаалтыг харах
Goal: Хэрэглэгч verified байгууллагуудын жагсаалтыг category/type/хот гэх мэтээр хайж шүүх боломжтой.

Follow docs:

docs/code_standart.md, docs/ui_ux_doc.md, docs/BASAR_BACKEND_SPRING.md

Frontend

Create src/components/org/OrganizationList.tsx, src/components/org/OrganizationCard.tsx

Props: { id, name, type, verified, logoUrl, city }

Grid: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6

Filters: category/type select + search box (props, future-ready)

EmptyState & SkeletonList дэмжих

Accessibility: card focusable, aria-label

Acceptance Criteria

 Verified байгууллагуудын жагсаалт харагдана

 Filter query ажиллана (type, city, verified)

 Empty state skeleton-дэй холбогдсон

 A11y ≥ 90 (card focusable, aria-label)

 ORG-2 (Байгууллагын дэлгэрэнгүй)

Story: ORG-2 – Байгууллагын дэлгэрэнгүй харах
Goal: Хэрэглэгч нэг байгууллагын профайл дэлгэрэнгүй үзнэ (verified badge + мэдээлэл).

Frontend

Route: app/organizations/[slug]/page.tsx

Component: OrganizationDetail.tsx

Props: { id, slug, name, description, type, logoUrl, verified, address, phone, email, website, createdAt }

UI: cover/logo + verified badge, contact info, description, map (optional future)

SkeletonDetail + ErrorState fallback

Accessibility: aria-label, time, alt for logo

Acceptance Criteria

 /organizations/{slug} дээр дэлгэрэнгүй профайл харагдана

 Verified badge зөв харагдана

 404 үед ErrorState гарна

 A11y ≥ 90


 ORG-3 (Байгууллага бүртгүүлэх хүсэлт)

Story: ORG-3 – Байгууллага бүртгүүлэх хүсэлт гаргах
Goal: Байгууллага өөрийн мэдээллийг оруулж verify хүсэлт илгээнэ.

Frontend

Page: app/organizations/apply/page.tsx

Component: OrganizationApplyForm.tsx

Form fields: name (required), description, type (enum), city, email, phone, website, logo (upload)

Validation: required (name, type, email), email format

UX: success → “Хүсэлт илгээгдлээ” state, error → error banner

Acceptance Criteria

 Хэрэглэгч байгууллага бүртгүүлэх хүсэлт илгээж чадна

 Хүсэлт DB-д pending статустай хадгалагдана

 Validation fail → 400 INVALID_INPUT

 Success үед “Амжилттай илгээгдлээ” state гарна