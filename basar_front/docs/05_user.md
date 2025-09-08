
Follow these docs (заавал мөрд):

docs/code_standart.md → (Нэршил, React/Next дүрэм, API давхарга, A11y, PR/CI, “Өмнөх функцийг бүү өөрчил”)

docs/ui_ux_doc.md → (Design tokens, Card/List, News page/list specs, A11y)

docs/cursor_prompt_guide.md → (Prompt-уудын нийтлэг шаардлага)


USER-1 (Social Login: Google/Facebook)

Story: USER-1 – Хэрэглэгч Google/Facebook-ээр нэвтрэх
Goal: OAuth2 flow → сервер JWT үүсгээд httpOnly cookie-д тавина. Frontend-д “Нэвтрэх” товч → амжилттай бол profile руу.

Follow docs:
docs/code_standart.md, docs/ui_ux_doc.md, docs/cursor_prompt_guide.md, docs/BASAR_BACKEND_SPRING.md

Frontend

Files

src/app/login/page.tsx (Login UI: Google/Facebook buttons)

src/components/auth/SocialButtons.tsx

Requirements

“Google-ээр нэвтрэх”, “Facebook-ээр нэвтрэх” гэсэн 2 товч

Дарахад backend-ийн OAuth endpoint руу redirect

Амжилттай login → /profile руу redirect

Error үед banner (role="alert") ба retry

A11y/UX

Товч бүрт aria-label (ж: “Google-ээр нэвтрэх”)

Keyboard navigation OK, focus-visible


Acceptance Criteria

 Login товчоор OAuth redirect ажиллана

 Амжилттай callback → JWT cookie үүсэж /profile руу орно

 Алдаа үед error banner (frontend), 401/400 формат стандарт

 Rate-limit хамгаалалттай


 USER-2 (Profile view/edit)

Story: USER-2 – Профайл харах/засах
Goal: Хэрэглэгч өөрийн профайлаа харах, avatar/bio-г шинэчлэх.

Follow docs:
code_standart.md, ui_ux_doc.md, BASAR_BACKEND_SPRING.md

Frontend

Files

src/app/profile/page.tsx

src/components/profile/ProfileView.tsx

src/components/profile/ProfileForm.tsx

Requirements

/api/me-гээс хэрэглэгчийн мэдээлэл татаж харуулах

“Edit profile” → Modal эсвэл inline form:

Fields: displayName (required, <= 60), bio (<= 280), avatar (upload optional)

Submit → PATCH /api/me

Success → toast + ProfileView шинэчлэгдэнэ; Error → banner

A11y/UX

Form labels, aria-describedby, keyboard submit

Avatar upload preview, file type/size шалгалт (client-side)

Types

export type TProfile = {
  id: string; email: string;
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
};
export type TProfilePatch = { displayName?: string; bio?: string; avatarUrl?: string | null };


USER-3 (Миний оруулсан контент)

Story: USER-3 – Хэрэглэгч өөрийн оруулсан пост/сэтгэгдлээ харах
Goal: Профайл дахь “Contributions” таб дээр миний нийтлэлүүд ба миний сэтгэгдлүүд-ийг жагсаах.

Follow docs:
code_standart.md, ui_ux_doc.md, BASAR_BACKEND_SPRING.md

Frontend

Files

src/components/profile/Contributions.tsx

(хэрэв таб структуртай байвал) src/app/profile/page.tsx дотор таб солилт

Requirements

GET /api/me/posts → миний блог/мэдээ (одоогоор блог л хангалттай)

List item: title, createdAt, likes/comments count (optional)

GET /api/me/comments → миний сэтгэгдлүүд

List item: excerpt(нэг мөр), linked post title

Skeleton/Empty state, pagination (10/page)

A11y: list items focusable, keyboard-оор link нээнэ

Types

export type TMyPost = { id: string; title: string; createdAt: string; likeCount?: number; commentCount?: number; };
export type TMyComment = { id: string; content: string; postId: string; postTitle: string; createdAt: string; };
export type TPaged<T> = { items: T[]; totalCount: number; };


Acceptance Criteria

 Миний нийтлэл/сэтгэгдэл pagination-тай харагдана

 JWT-гүй үед 401 буцаана

 Хоёр хүсэлт 200ms p95 дотор (dev нөхцөлд)

 Empty state зөв харуулна