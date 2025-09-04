-- ui ux document

1) Design Brief (1 хуудасны заавар)
        Бренд мэдрэмж: дулаан, өхөөрдөм, өнгө ихтэй (нохой/муурын өнгө, пастель + тод акцент), цэвэр цагаан зай их.

        Товч ахиулах: 3 click-ийн дотор зорьсон мэдээлэлд хүрэх.

        Mobile-first: 360–768–1024–1280 breakpoints.

        Ойлгомжтой мэдээлэл: карт, badge, шүүлтүүр, тод ангилалтай.

        Итгэл: “verified” шошго, албан байгууллагын тэмдэглэгээ.

        Хурд/чанар: skeleton loader, lazy image, анимэйшн зөөлөн (200–250ms).

        Хүртээмж: контраст ≥ 4.5:1, keyboard-өөр навигаци, alt text, focus ring.

2) Design System (Tokens + Components)
    
    2.1 Брендийн өнгө (Tokens)

    Primary: #2F80ED (цэнхэр) – CTA, линк, badge

    Secondary: #27AE60 (ногоон) – verified, success

    Accent 1: #F2994A (улбар) – мэдээний “Мэдээ” шошго

    Accent 2: #EB5757 (улаан) – анхааруулга

    Neutral:

    Text: #111827, Muted: #6B7280, Border: #E5E7EB

    Background: #FFFFFF, Soft: #F9FAFB

    2.2 Бичиглэл

    Heading: Poppins/SF Pro (600/700)

    Body: Inter (400/500)

    Scale: h1 32/40, h2 24/32, h3 20/28, body 16/24, small 14/20

    2.3 Сүлжээ ба зай

    Container: max-w-7xl, px-4 md:px-6, xl:px-0

    Grid: 12-column; cards: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6

    Spacing: 8-ын крат (8/16/24/32)

    2.4 Компонентууд (UI Kit)

    Button: Primary/Secondary/Ghost, md (40px), lg (48px), icon-left/right

    Badge/Chip: type (Мэдээ, Нийтлэл, Фото, Verified), өнгө = токеноор

    Card: image ratio 16:9, rounded-2xl, shadow-soft, hover:translate-y-[1px]

    Avatar: 32/48/64

    Tag pill: rounded-full, small

    Input: search, select, textarea; focus:ring-2 brand.primary

    Empty/Skeleton: 3 төрлийн skeleton (card, list, detail)

    Navbar/Footer: sticky top, footer олон баганатай линкүүд

    Toast: success/error (top-right)

    Pagination: previous/1..n/next, keyboard-д дэмжлэгтэй

    2.5 Interaction/animation

    Hover 120ms ease-out, Entrance fade-up 200ms, Carousel snap-x (org gallery)

    Focus state: outline-none ring-2 ring-brand.primary ring-offset-2

3) Page Specs (Component Tree + Acceptance)

    3.1 “Мэдээ” (News) лист хуудас

    Зорилго: Хялбар уншлага + ангилал/таг шүүлтүүр.

    Layout

    Hero (тайлбар + 1 том featured карт)

    2 багана: зүүн = лист, баруун = “Бид амьтанд хайртай” CTA блок

    Доор “Санал болгох” категорийн карусель

    Acceptance

    10 мэдээ/хуудас, skeleton → empty state

    Шүүлт: category, tag, keyword нэг дор ажиллана

    Keyboard: tab → card focus → enter = open

    CLS бага (lazy images, fixed ratio)

    Mobile-д CTA блок доош очно

    3.2 “Байгууллага” (Organization detail)

    Зорилго: Итгэл төрүүлэх танилцуулга + контакт + галерей + холбоотой контент.

    Layout

    Hero cover + лого + нэр + verified badge + contact quick-actions

    About (танилцуулга), Gallery (carousel), Services/Hours

    Related posts (3–6)

    Acceptance

    Verified badge = ногоон, tooltip “Албан ёсоор баталгаажсан”

    Gallery swipeable, keyboard arrows

    Address → external map (noopener, noreferrer)

    Share мета: og:title/description/image

    Lighthouse ≥ 90 (A11y/Best/SEO/Perf)

4) Content & A11y Guidelines

Гарчиг 60 тэмдэгтээс хэтрэхгүй, description 140–160.

Зургийн alt = “амьтан + үйл явдал + газар”.

Хэл найруулга энгийн, эмодзи хэтрүүлэхгүй (нэг блокод ≤1).

Монгол/англи i18n structure бэлэн (keys, aria-label мөн хөрвөнө).

5) QA Checklist (UI)

Cards truncate зөв (line-clamp), урт гарчгийг эвгүйтүүлэхгүй

Image ratio тогтвортой → CLS 0-д ойр

Focus order логик; Esc хаах (dropdown/modal)

Error state ойлгомжтой (retry)

RTL шалгалтын бэлэн байдал (i18n)