# BASAR – Нүүр хуудас (Homepage) UI/UX Спек (v1.0)

> Зорилго: Нүүр хуудас нь хэрэглэгчийн анхаарлыг **0–5 секундэд** татаж, **доош гүйлгэх бүрт** “BASAR юу хийдэг вэ?” гэдгийг богино хэсгүүдээр **маш ойлгомжтой** тайлбарлах. Community төвтэй MVP-д нийцүүлэн **мэдээ, блог, байгууллага** гурвыг онцолж, итгэлцэл (verified), оролцоо (UGC), өсөлтийн CTA-г харуулна.

---

## 1) IA & Hero Strategy

**Above the Fold (Hero 0–600px):**
- Headline: “Амьтанд хайртай нэгдэл – мэдээ, блог, байгууллага нэг дор”
- Sub: “Найдвартай мэдээ унш, туршлагаа хуваалц, verified байгууллагыг ол”
- Primary CTA: “Community-д нэгдэх” (Login/Signup) | Secondary CTA: “Байгууллагаа бүртгүүлэх”
- Visual: амьтад/эзэдтэй өнгөлөг иллюстраци эсвэл амьд зураг (16:9) + зөөлөн gradient
- Trust micro: “Verified organizations”, “A11y friendly”, “Free to start” badge-ууд

**Key Navigation (sticky header):**
- Нүүр • Мэдээ • Блог • Байгууллагууд • Хайлт (том) • Нэвтрэх

---

## 2) Scroll Story (Sections)

1. **Value Props (3-card)**
   - “Найдвартай мэдээ” / “Community блог” / “Verified байгууллага”
   - Each card: icon + 1 өгүүлбэр, “Дэлгэрэнгүй” линк

2. **Featured News (Top picks)**
   - 1 том featured + 4 жижиг карт (grid)
   - Category chip, огноо, 2 мөр гарчиг
   - CTA: “Бүх мэдээ”

3. **Trending Blogs (Community)**
   - Carousel (3–6 карт) – лайк/сэтгэгдэл тоо
   - CTA: “Блог унших” + “Шинэ блог бичих”

4. **Organizations (Trust strip)**
   - Лого/картуудын тууз: Verified badge харагдах
   - CTA: “Байгууллагууд” + “Байгууллага нэмэх”

5. **How it works (3 steps)**
   - 1) Унш • 2) Хуваалц • 3) Холбогд
   - Богино шугаман зураглал, жижиг иллюстраци

6. **Community Proof**
   - Counter: “10k+ уншигч · 300+ блоггер · 120+ verified байгууллага”
   - 2–3 testimonial (avatar + нэр)

7. **Call to Action (Bottom Hero)**
   - Headline: “Одоо нэгдээрэй”
   - Primary CTA: “Нэвтрэх / Бүртгүүлэх”
   - Secondary CTA: “Байгууллагаа бүртгүүлэх”

8. **Footer**
   - Links, socials, app badges, newsletter subscribe

---

## 3) Visual System

- **Colors:** Brand Primary #2F80ED, Secondary #27AE60, Accent #F2994A, Error #EB5757, Neutral #111827/#6B7280/#E5E7EB/#F9FAFB
- **Typography:** Poppins (600/700), Inter (400/500)
- **Card:** 16:9 image, rounded-2xl, shadow-soft, hover:translate-y-[1px]
- **Spacing:** 8-ын крат; container max-w-7xl; grid gap-6
- **Icons:** lucide-react; badge/verified = green pill + check
- **Animation:** 120–200ms ease-out, fade-up on scroll (motion-safe), prefers-reduced-motion respected

---

## 4) Component Tree (React)

```
<Homepage>
  <Header sticky />
  <Hero>
    <Headline />
    <Sub />
    <CTAGroup primary="Community-д нэгдэх" secondary="Байгууллагаа бүртгүүлэх" />
    <HeroImage />
    <TrustPills />
  </Hero>

  <ValueProps3 />
  <FeaturedNewsGrid />
  <TrendingBlogsCarousel />
  <OrganizationsStrip />
  <HowItWorksSteps />
  <CommunityProof />
  <BottomCTA />

  <Footer />
</Homepage>
```

**Файлын байрлал (frontend):**
```
/src/components/home/
  Hero.tsx
  ValueProps3.tsx
  FeaturedNewsGrid.tsx
  TrendingBlogsCarousel.tsx
  OrganizationsStrip.tsx
  HowItWorksSteps.tsx
  CommunityProof.tsx
  BottomCTA.tsx
```

---

## 5) Acceptance Criteria (UI/A11y/Perf)

- [ ] Hero 0–600px дээр headline + CTA шууд харагдах, CLS≈0
- [ ] 3 Value props карт – keyboard focusable, icon + 1 өгүүлбэр
- [ ] Featured news: 1 том + 4 жижиг, skeleton → empty state
- [ ] Blogs carousel: drag/swipe mobile, arrow desktop, focus trap OK
- [ ] Organizations strip: verified badge tooltips
- [ ] How it works: 3 алхам, 1–2 мөр тайлбар, иллюстраци alt тексттэй
- [ ] Community proof counters animated (prefers-reduced-motion respected)
- [ ] Bottom CTA: 2 товч, large size, prominent
- [ ] Lighthouse ≥ 90 (Perf/SEO/A11y/Best)
- [ ] Контраст ≥ 4.5:1, skip-to-content линк байна

---

## 6) Data Wiring (MVP)

- FeaturedNewsGrid → GET `/api/news?featured=true&limit=5`
- TrendingBlogsCarousel → GET `/api/blog?sort=trending&limit=6`
- OrganizationsStrip → GET `/api/organizations?verified=true&limit=12`
- CommunityProof → GET `/api/stats` (users, blogs, orgs counts)

---

## 7) Cursor Prompt Pack (Frontend)

**7.1 Hero**
```
Create /src/components/home/Hero.tsx (Next.js + Tailwind):
- Headline, Sub, CTA buttons (primary/secondary)
- Hero image (16:9, lazy, fixed ratio, no CLS)
- TrustPills: "Verified orgs", "A11y friendly", "Free to start"
- A11y: aria-labels, focus-visible, skip-to-content support
```

**7.2 ValueProps3**
```
Create ValueProps3.tsx:
- 3 cards grid (icon + title + 1 line)
- Mobile 1-col, md 3-col, gap-6
- Props-based content; unit test for render
```

**7.3 FeaturedNewsGrid**
```
Create FeaturedNewsGrid.tsx:
- Fetch GET /api/news?featured=true&limit=5 via /lib/api.ts
- Layout: 1 large card (left), 4 small cards (right)
- SkeletonList while loading; EmptyState if none
```

**7.4 TrendingBlogsCarousel**
```
Create TrendingBlogsCarousel.tsx:
- Fetch GET /api/blog?sort=trending&limit=6
- Horizontal scroll-snap, arrows on desktop, swipe on mobile
- A11y: role="region", aria-roledescription="carousel", keyboard arrows
```

**7.5 OrganizationsStrip**
```
Create OrganizationsStrip.tsx:
- GET /api/organizations?verified=true&limit=12
- Logo cards with VerifiedBadge tooltip
- Auto-scroll marquee optional (reduced-motion respected)
```

**7.6 HowItWorksSteps**
```
Create HowItWorksSteps.tsx:
- 3 steps with mini illustrations
- Simple fade-up on scroll; prefers-reduced-motion honored
```

**7.7 CommunityProof**
```
Create CommunityProof.tsx:
- GET /api/stats (users, blogs, orgs)
- Count-up animation (requestAnimationFrame), fallback static
- A11y: aria-live="polite"
```

**7.8 BottomCTA**
```
Create BottomCTA.tsx:
- Large headline + 2 buttons (primary/secondary)
- Responsive spacing; dark mode supported
```

---

## 8) Copywriting (богино, ойлгомжтой)

- Hero h1: “Амьтанд хайртай нэгдэл”
- Sub: “Мэдээ, блог, verified байгууллага — нэг дор.”
- CTA: “Одоо нэгдэх” / “Байгууллага нэмэх”
- Value cards: “Найдвартай мэдээ” / “Community блог” / “Verified байгууллага”
- Bottom CTA: “BASAR-д нэгдэж, хамтдаа илүү сайныг бүтээе”

---

## 9) Хэмжүүр (Homepage)

- CTR (Hero primary CTA), Scroll depth (25/50/75%), Blog/News clickthrough, Org strip click
- LCP < 2.5s, CLS < 0.03, INP < 200ms
- A/B туршилтын талбар: Hero image vs illustration, CTA copy
