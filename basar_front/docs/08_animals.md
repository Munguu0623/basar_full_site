“Амьтад” менюгийн санал болгосон бүтэц (MVP)
# Generate a frontend-only Markdown spec for Classifieds module (no backend)
content = r"""# BASAR – Classifieds (Үйлчилгээ/Зар) Frontend UI/UX Спек (MVP, FE-only)

Follow docs: docs/code_standart.md, docs/ui_ux_doc.md, docs/cursor_prompt_guide.md


1) Мегаменю (hover/dropdown)

Зорилго: Хэрэглэгч 1–2 даралтаар хэрэгтэй сэдэв рүү очно.

Төрлөөр

Нохой

Муур

Бусад (туулай, усны амьтад, шувуу, г.м)

Арчилгаа & Амьдралын үе шат

Хооллолт

Вакцин/эрүүл мэндийн календарь

Усанд оруулах, арьс/үстэй холбоотой

Нас бие гүйцэх, ахмад настай амьтны арчилгаа

Зан авир & Сургалт

Суурь сургалт (суух, ирэх, хүлээх)

Ариун цэврийн дадал

Нийгэмшүүлэх (хүмүүс/амьтадтай харилцах)

Анхны тусламж & Аюулгүй байдал

Яаралтай үед юу хийх вэ (☎ дуудлага, checklists)

Хордлого/гэмтэл үед анхны арга хэмжээ

Алдагдсан/олсон үед авах алхам

Нийгэм/Community

Үрчлүүлэх амьтад → (Adoption лист рүү)

Байгууллагууд (эмнэлэг, shelter) → (Directory)

Асуулт & Хариулт (FAQ/форум маягийн богино Q&A)

Блог бичих (CTA)

Tip: “Анхны тусламж” хэсгийг улаан badge-тай, хамгийн баруун талд байршуулаарай — нүдэнд шууд тусна.

2) “Амьтад” Landing Page (амьтдын төв хуудас)

Нэг хуудас дээр дараах богино секцүүд:

Том хайлт: “Амьтны төрлөөр + сэдвээр” (placeholder: “Муур хооллолт”, “Нохой суулгах сургалт”)

Шуурхай товч (Quick actions):
“Алдагдсан/Олдсон” • “Үрчлүүлэх” • “Байгууллага хайх” • “Анхны тусламж”

Топ гарын авлагууд (Guides): 6 карт – “Муурын вакцинжилтын календарь”, “Нохойн суурь сургалт 7 хоногт”, “Гэрийн анхны тусламжийн багц”

Видео/Алхам алхмаар (опшн): богино клип эсвэл инфографик

Түгээмэл асуултууд (FAQ): 5–7 Q&A аккордеон

Орон нутгийн байгууллагуудын тууз (Verified strip)

Call-to-action: “Нийтлэл бичих” / “Асуулт асуух”

3) Дотоод бүтэц (IA) & Хуудасны төрөл

A. Төрлөөр (Нохой/Муур/Бусад) → Topic landing

Дээд tabs: Арчилгаа • Эрүүл мэнд • Сургалт • Аюулгүй байдал

Доор нь: Guide картууд, Checklist, FAQ, холбоотой блог/мэдээ auto-merge

Sidebar: Түлхүүр хэрэгсэл (вакцины календарь, хүнд/хөнгөн илүүдэл жингийн тооцоолуур – дараа шат)

B. Guide / Checklist Page

TL;DR хайрцаг (3–5 bullet)

Алхам алхмаар (1→2→3), зураг/икон

Downloadable checklist (PDF — дараа)

C. Directory (Байгууллагууд)

Filter: төрөл, хот/дүүрэг, verified

Картаар харах (дараа шат), картыг keyboard-д ээлтэй болгох

D. Q&A / FAQ

Богино асуулт хариулт, холбоотой guide-руу deep link

“Асуулт асуух” CTA (комьюнити блог руу чиглүүлэх MVP)

4) Шүүлтүүр/Хайлт (UX)

Animal Type (Dog/Cat/Other) — бүх “Амьтад” дотор глобал фильтр ажиллана

Topic (Care, Health, Training, Safety)

Level (Starter/Advanced) – ирээдүйд

Холбоотой байгууллага/эмнэлэг (location select) – directory-д

Хайлтын UX: 300ms debounce; query-г URL-д хадгална → буцаад ороход шүүлтүүрүүд хэвээр.

5) Слаг/SEO жишээ

/animals – Амьтдын төв

/animals/dog • /animals/cat

/animals/dog/care/feeding-guide

/animals/cat/health/vaccine-schedule

/first-aid (shortlink, онцгой): анхны тусламж

6) Компонентууд (FE)

AnimalMegaMenu.tsx – дээрх 5 бүлгийг 4 баганаар

AnimalLanding.tsx – хайлт + quick actions + guides + FAQ + org strip

GuideCard.tsx, TopicTabs.tsx, QAAccordion.tsx

OrgStrip.tsx (verified тууз), QuickCTA.tsx

7) Content & Data (MVP)

Blog/News/Guide аль алиныг category/tag-аар “Амьтад” хэсэг рүү агрегатла.

Tag стандарт: animal:dog|cat|other, topic:care|health|training|safety

Cover зураг 16:9, гарчиг ≤ 60 тэмдэгт, description 140–160 (SEO)

8) Хэмжигдэх KPI

“Амьтад” landing CTR → Guide

Search success rate (хайлтын дараа 30 сек-н дотор bounce буурах)

Quick Actions click rate (Lost/Adoption/Directory)

FAQ helpfulness (Yes/No)

9) Cursor-д өгөх Prompt (шууд copy/paste)
A) Animal Mega Menu
Create AnimalMegaMenu.tsx (Next.js + Tailwind):
- 4-column layout:
  1) Төрлөөр: Нохой, Муур, Бусад
  2) Арчилгаа & Амьдралын үе шат
  3) Сургалт & Зан авир
  4) Анхны тусламж (highlighted badge) + Community links (Үрчлүүлэх, Байгууллага, Асуулт)
- Keyboard/A11y: open on focus/hover, trap inside on open, Esc to close
- Links use SEO slugs per spec
- Mobile: converts to accordion list

B) Amial Landing Page
Create AnimalLanding.tsx:
- Hero search (placeholder examples), QuickCTA (Алдагдсан/Үрчлүүлэх/Байгууллага/Анхны тусламж)
- TopicTabs (Care/Health/Training/Safety) + GuideCard grid (6 items)
- FAQ accordion (5–7)
- OrgStrip (verified organizations)
- A11y ≥ 90; CLS≈0 (ratio boxes); URL sync for search/filter

C) Guide / Checklist Template
Create GuideTemplate.tsx:
- TL;DR (bulleted), Step-by-step sections, images with alt, related posts
- Metadata: animalType + topic chips, last updated time
- Share buttons; print-friendly (@media print)

10) “Яаралтай тусламж” онцгой байршуулалт

Header баруун талд “Анхны тусламж” тогтмол линк (улаан pill)

“Амьтад” мегаменю дотор хамгийн баруун баганад давхар байрлуул