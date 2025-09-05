Cursor Prompt — BLOG-1 (Блог нийтлэл үүсгэх)

Story: BLOG-1 – Хэрэглэгч шинэ блог нийтлэл үүсгэх
Goal: Бүртгэлтэй хэрэглэгч текст + зурагтай блог нийтлэл оруулж, систем дээр хадгалуулна.

Follow these docs (заавал мөрд):

docs/code_standart.md → (React/Next дүрэм, Form handling, API давхарга, A11y, “Өмнөх функцийг бүү өөрчил”)

docs/ui_ux_doc.md → (Form design, Button/Input styles, Spacing tokens, Error/Success state)

docs/cursor_prompt_guide.md → (Prompt стандарт, Scope хязгаарлалт)

Backend-д: docs/BASAR_BACKEND_SPRING.md → (Spring Boot стандартаа баримтал)

Scope

Frontend: Блог үүсгэх form + API дуудах + success/error state

Backend: POST /api/blog endpoint (title, content, imageUrl?)

Scope-оос гадуур файл бүү өөрчил.

Frontend Implementation
Files

src/app/blog/create/page.tsx (Route page)

src/components/blog/BlogForm.tsx

src/lib/api.ts (api<T>() wrapper ашигла)

UI Requirements

BlogForm.tsx

Input: Title (required, max 120 char)

Textarea/Editor: Content (required, min 20 char)

Upload: Image (optional) → preview хийх (файл сонгосон үед thumbnail)

Buttons: “Publish” (primary), “Cancel” (secondary → буцах)

Validation: client-side Yup/Zod (title not empty, content ≥ 20 char)

Error state: form дээд хэсэгт алдаа мессеж (role="alert")

Success → redirect to /blog/[id|slug]

UX/A11y

Label/aria-describedby бүрэн

Focus trap form дээр (skip-to-content ажиллах)

Error үед товчлуурууд disabled биш, гэхдээ form submit-д давхар дарагдахаас хамгаал

Types
export type TBlogCreateRequest = {
  title: string;
  content: string;
  imageUrl?: string | null;
};
export type TBlogResponse = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  author: { id: string; name: string };
  createdAt: string;
};