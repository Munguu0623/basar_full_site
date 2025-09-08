# Classifieds модуль (CLASSIFIEDS-1)

Амьтдад чиглэсэн зарын модуль - Lost/Found, Adoption, Marketplace, Services.

## Компонентууд

### 1. Pages

#### `/app/classifieds/page.tsx`
- Зарын жагсаалт үндсэн хуудас
- Шүүлтүүр, эрэмбэ, pagination
- URL query sync
- Mock API ашиглана

#### `/app/classifieds/[id]/page.tsx`  
- Зарын дэлгэрэнгүй хуудас
- Gallery, мэдээлэл, холбогдох мэдээ
- Contact card
- Related зарууд

#### `/app/classifieds/new/page.tsx`
- Шинэ зар үүсгэх хуудас
- Форм validation
- Image upload
- Success redirect

### 2. Components

#### `FiltersBar.tsx`
- Category tabs (Lost/Found/Adoption/Marketplace/Services)
- Animal type chips (Dog/Cat/Other)
- Search, city filter
- URL sync, accessibility support

#### `SortBar.tsx`
- Newest/Oldest sorting
- Price sorting (marketplace only)
- Keyboard navigation support

#### `ClassifiedCard.tsx`
- 1:1 зургийн харьцаа
- Category badges, animal info
- Price display (marketplace)
- Hover анимэйшн

#### `CardGrid.tsx`
- Grid layout responsive
- Loading skeleton
- Empty state
- Create button (floating mobile)

#### `DetailGallery.tsx`
- Image carousel with thumbnails
- Fullscreen mode
- Keyboard navigation
- Touch/swipe support

#### `DetailInfo.tsx`
- Category, animal details
- Description with formatting
- Location with map link
- Metadata display

#### `ContactCard.tsx`
- Phone reveal/copy/call
- Email actions
- WhatsApp integration
- Share functionality
- Safety warnings

#### `ClassifiedForm.tsx`
- Comprehensive form validation
- Image uploader integration
- Dynamic fields (price for marketplace)
- Preview mode
- Error handling

#### `ReportButton.tsx`
- Report modal with reasons
- Form validation
- Safety warnings

#### `RelatedClassifieds.tsx`
- Same animal type зарууд
- Compact display
- "View more" link

### 3. Supporting Components

#### `ImageUploader.tsx`
- Drag & drop support
- Multiple image upload
- Preview with reorder
- File validation
- Progress indication

#### `CardGridSkeleton.tsx`
- Loading placeholder for grid
- Realistic skeleton layout

#### `DetailSkeleton.tsx`
- Loading placeholder for detail page
- Gallery and info sections

### 4. API Routes

#### `/api/classifieds/route.ts`
- GET: List with filters/pagination
- POST: Create new classified

#### `/api/classifieds/[id]/route.ts`
- GET: Single classified
- PUT: Update classified
- DELETE: Remove classified

## Онцлогууд

### UX/UI
- 🎨 Амьтны сэдэвтэй дизайн (emoji, градиент)
- 📱 Mobile-first responsive design
- ⚡ Loading states болон skeleton UI
- 🔍 Шүүлтүүр + хайлт (URL sync)
- 🖼️ Image gallery with fullscreen
- 📞 Contact integration (phone/email/WhatsApp)
- 🚨 Report functionality
- ♿ Accessibility (ARIA, keyboard navigation)

### Technical
- 🏗️ Next.js App Router
- 🎯 TypeScript with strict typing
- 🎨 Tailwind CSS styling
- 📂 Component-based architecture
- 🔗 URL state management
- 🖱️ Client-side filtering
- 📡 Mock API integration
- 🧪 Form validation
- 🔄 Optimistic updates

## Ашиглалт

```tsx
// Жагсаалт
import ClassifiedsPage from '@/app/classifieds/page';

// Дэлгэрэнгүй
import ClassifiedDetailPage from '@/app/classifieds/[id]/page';

// Үүсгэх
import CreateClassifiedPage from '@/app/classifieds/new/page';
```

## Туршилт

```bash
# Жагсаалт хуудас
/classifieds

# Шүүлтүүр тест
/classifieds?category=LOST&animalType=DOG&city=Улаанбаатар

# Дэлгэрэнгүй
/classifieds/1

# Үүсгэх
/classifieds/new
```

## Тэмдэглэл

- Mock data ашиглаж байгаа (3 зар)
- Image URLs placeholder format (/api/placeholder/...)
- Real backend холбохдоо API routes засварлах
- Authentication шаардлагагүй (anonymous posting)
- File upload-г real storage service-тэй холбох шаардлагатай
