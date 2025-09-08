🧩 Нэгдсэн Prompt — Admin Shell (суурь хүрээ)

Зорилго: Админд зориулсан тогтмол layout + RBAC guard + data grid дүрэм, ингэснээр ADMIN-1/2/3 story-г нэг хэв шинжээр хөгжүүлнэ.

Follow docs: docs/code_standart.md, docs/ui_ux_doc.md, docs/cursor_prompt_guide.md, docs/BASAR_BACKEND_SPRING.md

Files

src/app/admin/layout.tsx (AdminLayout: left nav + header)

src/app/admin/page.tsx (dashboard overview)

src/components/admin/AdminGuard.tsx (ROLE_ADMIN шалгалт)

src/components/admin/DataTable.tsx (common table)

src/components/admin/ConfirmDialog.tsx, src/components/admin/ApiBar.tsx (status/toast)

src/components/skeletons/TableSkeleton.tsx, src/components/empty/AdminEmpty.tsx

Requirements

RBAC Guard: /api/me-с role аван ROLE_ADMIN эсэхийг шалгаж, үгүй бол / руу redirect (toast: “Admin only”).

Navigation: Sidebar items — News, Organizations, Reports.

DataTable.tsx:

Props: {columns: ColumnDef<T>[], rows: T[], page, pageSize, total, onSort, onPageChange, selectable?: boolean, onBulkAction?}

Features: sort (single), pagination, row selection (checkbox), sticky header, keyboard navigation, aria-colindex/aria-rowindex.

Feedback: success/error toast, top-right loading bar (route transitions).

A11y: Focus ring, shortcut keys: / focus search, f toggle filters.

Perf: сервер-тал pagination (<=50/page), virtualization (≥50 үед).

✅ ADMIN-1 — News CRUD (мэдээ удирдах)

Story: ADMIN-1 – Мэдээ үүсгэх, засах, устгах (draft/published)
Route: app/admin/news/page.tsx, app/admin/news/new/page.tsx, app/admin/news/[id]/edit/page.tsx

Cursor Prompt (copy/paste)
Implement Admin News Management UI (Next.js + Tailwind):

Follow:
- docs/code_standart.md (React/Next, A11y, API)
- docs/ui_ux_doc.md (tokens, spacing)
- docs/BASAR_BACKEND_SPRING.md (RBAC, error format)

Files:
- app/admin/news/page.tsx            // List + filters + table actions
- app/admin/news/new/page.tsx        // Create form
- app/admin/news/[id]/edit/page.tsx  // Edit form
- components/admin/news/NewsForm.tsx // Shared form
- components/admin/news/NewsFilters.tsx

Data:
- GET /api/admin/news?page=&pageSize=&status=&q=
- POST /api/admin/news
- PATCH /api/admin/news/{id}
- DELETE /api/admin/news/{id}

UI (List):
- Search (q), Status filter: draft/published/all, Date range (optional)
- DataTable columns: [Title, Category, Status (badge), PublishedAt, Actions]
- Row actions: Edit, Delete (ConfirmDialog)
- Bulk actions: Publish, Unpublish, Delete (with selection)
- Empty state: “Одоогоор мэдээ алга” + CTA “Шинэ мэдээ үүсгэх”
- TableSkeleton while loading; error banner on fail

Form (Create/Edit):
- Fields: title (<=120, required), slug (auto from title, editable), category (select), imageUrl (optional), excerpt (<=160), content (WYSIWYG basic), status (draft/published)
- Validation: client (zod) + server errors surfaced in form
- UX: sticky form header (Save/Cancel), unsaved changes warning
- Success: toast + redirect to /admin/news

A11y:
- All controls labeled, keyboard reachable, dialog focus trapped
- Table row action buttons have aria-labels

Testing:
- List page renders rows, sorting works, selection toggles
- Create invalid -> shows errors; success -> redirects
- Edit shows existing values; Delete asks confirm

Constraints:
- Do NOT modify unrelated files
- Use /src/lib/api.ts wrapper

Acceptance Criteria

 Table үзэгдэл: хайлт/фильтер/сорт/pagination ажиллана

 Create/Edit/Delete + Draft/Publish статустай

 Bulk үйлдлүүд зөв ажиллаж, баталгаажуулах диалогтой

 Error формат {error:{code,message}} зөв харуулна

 A11y ≥ 90, keyboard-оор бүрэн удирдана

✅ ADMIN-2 — Organization Verification Queue (баталгаажуулах)

Story: ADMIN-2 – Байгууллагын хүсэлтийг approve/reject хийх
Route: app/admin/organizations/requests/page.tsx, detail optional

Cursor Prompt (copy/paste)
Implement Organization Verification Queue UI:

Follow:
- code_standart.md, ui_ux_doc.md, BASAR_BACKEND_SPRING.md

Files:
- app/admin/organizations/requests/page.tsx
- components/admin/org/OrgRequestFilters.tsx
- components/admin/org/OrgRequestCard.tsx
- components/admin/org/DecisionDialog.tsx

Data:
- GET  /api/admin/org-requests?page=&pageSize=&status=pending|approved|rejected&q=
- POST /api/admin/org-requests/{id}/approve
- POST /api/admin/org-requests/{id}/reject

UI:
- Filters: status (tab chips), search (q), city/type (select)
- List layout: responsive cards grid (logo, name, type, city, email, submittedAt)
- Card actions: Approve / Reject → opens DecisionDialog (reason optional on reject)
- Bulk actions on selected cards: Approve / Reject
- Right preview pane (optional): shows full submitted details when card focused

UX:
- After approve/reject, optimistic update row/card; fallback refetch if fail
- Toast on success/error; loading overlay during bulk
- Admin notes (optional): textarea saved with decision

A11y:
- Cards focusable; keyboard open dialog (Enter), approve (Ctrl+Enter)
- Dialog has role="dialog", labelledby, focus trap

Testing:
- Filters change query and reload
- Approve success updates card status
- Reject requires reason when configured
- Bulk approve works on multiple selection

Constraints:
- Scope only; use api wrapper; keep page size <= 20

Acceptance Criteria

 Pending хүсэлтүүд жагсаж, approve/reject ажиллана

 Bulk approve/reject боломжтой, confirm dialog-той

 Toast + optimistic update; алдаа үед rollback/refetch

 A11y бүрэн, keyboard-оор удирддаг

✅ ADMIN-3 — Report Moderation Queue (контент модераци)

Story: ADMIN-3 – Хэрэглэгчдийн report-лосон пост/сэтгэгдлийг шалгаж арга хэмжээ авах
Route: app/admin/reports/page.tsx

Cursor Prompt (copy/paste)
Implement Report Moderation Queue:

Follow:
- code_standart.md, ui_ux_doc.md, BASAR_BACKEND_SPRING.md

Files:
- app/admin/reports/page.tsx
- components/admin/reports/ReportFilters.tsx
- components/admin/reports/ReportTable.tsx
- components/admin/reports/ReportActionBar.tsx
- components/admin/reports/ReportDetailDrawer.tsx

Data:
- GET  /api/admin/reports?page=&pageSize=&status=pending|resolved|dismissed&entityType=post|comment&q=
- POST /api/admin/reports/{id}/action { action: "hide"|"delete"|"dismiss", reason?: string }

UI:
- Filters: status, entityType, quick search (q), date range (optional)
- ReportTable: columns [EntityType, EntityId (link), Reason, Reporter, CreatedAt, Status, Actions]
- Row actions: View (opens Drawer), Hide, Delete, Dismiss (ConfirmDialog)
- Bulk actions: Hide/Delete/Dismiss on selected rows
- Drawer shows: reported content preview (server text excerpt), author, history of actions

UX:
- Multi-select with shift key; keyboard shortcuts (h=hide, d=delete, x=dismiss)
- Action requires confirm; destructive actions need typed confirm (“DELETE”)
- On success, update row status; show “Resolved by {adminName} at {time}”

A11y:
- Table is accessible with aria attributes, sortable headers
- Drawer has role="dialog", focus trap, Esc to close

Testing:
- Filters and sorting work
- Row action calls API and updates UI
- Bulk action with >1 selection
- Drawer opens and shows preview text

Constraints:
- Only modify admin modules; use api wrapper; pagination <= 50

Acceptance Criteria

 Report queue шүүлтүүр/сорт/pagination-тай

 Row + bulk actions (hide/delete/dismiss) confirm-тай ажиллана

 Drawer-т дэлгэрэнгүй/түүхийг харуулна

 A11y сайн, shortcut-ууд ажиллана

🌈 Дизайн & Ажилбарын нарийн заавар (3 story-д нийтлэг)

Харагдах байдал: Admin UI нь компакт, мэдээлэл ихтэй. Light/Dark theme support.

Badge/Status өнгө: draft(gray), published(green), pending(amber), approved(green), rejected(red), resolved(green), dismissed(gray).

Тоост/баннер: амжилт/алдааг товч тодорхой харуул; error-уудад “Retry”.

Empty/Skeleton: ширхэг бүрд бэлэн — table skeleton 10 мөр, card skeleton 6 ширхэг.

Performance: Debounce search 300ms; query params-аа URL-д хадгал (deep-link/shareable).

Internationalization: label/value-г i18n key-гээр дамжуул (MN/EN ирээдүйд).

Security: All admin routes AdminGuard-аар хамгаалагдсан; unauthorized → redirect + toast.

🔌 Data wiring (backend тааруулалт)

ADMIN-1: /api/admin/news CRUD (status draft/published), search q, status filter, created/publishedAt sort

ADMIN-2: /api/admin/org-requests (pending/approved/rejected), approve/reject POST action; reject reason optional

ADMIN-3: /api/admin/reports (pending/resolved/dismissed), POST action {action, reason?}; entity type post|comment

Алдаа формат бүгдэд: { "error": { "code": "...", "message": "..." } }.

🧪 QA Checklist (админ нийтлэг)

 Keyboard-аар бүх интерактив элементэд хүрч болно

 Focus ring/focus trap зөв ажиллана (dialog/drawer)

 Хайлтын query URL-д хадгалагдаж refresh-д алдагдахгүй

 Bulk үйлдэлд сонголт зөвлогдоно, confirm шаарддаг

 Table-ийн ахиу мөр дээр virtualization (≥50 үед)

 Error state-д retry ажиллана; offline-д graceful fallback

 Lighthouse (A11y/Best Practices) ≥ 90 (component/page түвшинд)