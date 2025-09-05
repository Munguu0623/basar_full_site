# News Components (NEWS-1)

Мэдээний жагсаалт үзүүлэх компонентуудын багц.

## Components

### ArticleCard
Мэдээний карт компонент.

**Props:**
- `article: TNewsListItem` - Мэдээний өгөгдөл
- `href: string` - Мэдээ рүү шилжих холбоос

**Features:**
- 16:9 харьцаатай зураг (CLS алдагдахгүй)
- Category chip өнгө mapping
- Keyboard navigation дэмжлэг
- Hover анимэйшн
- Proper A11y labels

### ArticleList
Мэдээний жагсаалт үндсэн компонент.

**Props:**
- `initialData?: { items: TNewsListItem[], totalCount: number }` - Анхны өгөгдөл (SSR)
- `categoryFilter?: TNewsListItem['category']` - Категори шүүлтүүр
- `tagFilter?: string` - Таг шүүлтүүр

**Features:**
- Server/Client component дэмжлэг
- URL query parameter-тай pagination
- Loading skeleton
- Empty state
- Error handling with retry
- Smooth scrolling

### Pagination
Хуудас шилжүүлэх компонент.

**Props:**
- `page: number` - Одоогийн хуудас
- `pageSize: number` - Хуудас дахь item тоо
- `total: number` - Нийт item тоо
- `onPageChange?: (page: number) => void` - Хуудас өөрчлөх callback

**Features:**
- Keyboard navigation
- ARIA labels
- Ellipsis (...) logic
- Disabled states
- Item range display

### SkeletonList
Loading skeleton компонент.

**Props:**
- `count?: number` - Skeleton тоо (default: 10)

### EmptyState
Хоосон төлөв компонент.

**Props:**
- `title?: string` - Гарчиг
- `description?: string` - Тайлбар
- `actionText?: string` - Товчны текст
- `actionHref?: string` - Товчны холбоос

## Usage

```tsx
import ArticleList from '@/components/news/ArticleList';

// SSR with initial data
<ArticleList initialData={{ items: [...], totalCount: 100 }} />

// Client-side with filters
<ArticleList categoryFilter="HEALTH" tagFilter="pets" />
```

## API Integration

```tsx
import { getNewsList } from '@/lib/api';

const data = await getNewsList({
  page: 1,
  pageSize: 10,
  category: 'HEALTH',
  tag: 'pets'
});
```

## Testing

Тест файлууд:
- `__tests__/ArticleCard.test.tsx`
- `__tests__/ArticleList.test.tsx`
- `__tests__/Pagination.test.tsx`

```bash
npm test -- news
```

## Pages

### /news
Мэдээний жагсаалт хуудас - SSR дэмжлэг, pagination, category filter.

### /news/[id]
Мэдээний дэлгэрэнгүй хуудас - SEO optimized, OpenGraph meta, related articles.

## API Endpoints

### GET /api/news
Query params: `page`, `pageSize`, `category`, `tag`

### GET /api/news/[id]
Мэдээний дэлгэрэнгүй мэдээлэл авах.

## Design Tokens

Design систем (ui_ux_doc.md) дагуу:
- Category colors: emerald/blue/orange/gray
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- Shadows: `shadow-soft`
- Typography: line-clamp-2/3
- Focus: `focus-visible:ring-2`

## Development

Local тест хийх:
1. `npm run dev`
2. http://localhost:3000/news руу орох
3. http://localhost:3000/news/1 мэдээний дэлгэрэнгүй үзэх
