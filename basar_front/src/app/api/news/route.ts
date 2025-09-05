import { NextRequest, NextResponse } from 'next/server';
import { TNewsListResponse, TNewsListItem } from '@/types/news';

// Mock мэдээний өгөгдөл
const mockNews: TNewsListItem[] = [
  {
    id: '1',
    title: 'Өвлийн улиралд амьтныг хэрхэн арчлах вэ?',
    excerpt: 'Хүйтэн өвлийн улиралд гэрийн тэжээвэр амьтдыг хэрхэн зөв арчлах, тэдний эрүүл мэндийг хадгалах талаар мэргэжилтнүүдийн зөвлөгөө.',
    imageUrl: '/hero_image.png',
    category: 'HEALTH',
    publishedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Нохойны дрессуры хичээлийн эхлэл',
    excerpt: 'Анхан шатны нохойны дрессурын хичээлүүд эхэллээ. Мэргэжлийн багшаас бүх насны нохойд тохирсон сургалт.',
    imageUrl: '/hero_image.png',
    category: 'TRAINING',
    publishedAt: '2024-01-14T14:30:00Z',
  },
  {
    id: '3',
    title: 'Гэр бүлийг хайж буй муур',
    excerpt: 'Энэ сайхан 3 настай муур шинэ гэр бүлийг хайж байна. Вакцин хийлгэсэн, эрүүл муур.',
    imageUrl: '/hero_image.png',
    category: 'ADOPTION',
    publishedAt: '2024-01-13T16:00:00Z',
  },
  {
    id: '4',
    title: 'Амьтны эмнэлэгийн шинэ үйлчилгээ',
    excerpt: '24 цагийн турш ажилладаг амьтны эмнэлэг нээгдлээ. Яаралтай тохиолдолд хандах боломж.',
    imageUrl: '/hero_image.png',
    category: 'OTHER',
    publishedAt: '2024-01-12T08:15:00Z',
  },
  {
    id: '5',
    title: 'Зун болж буй цаг уурын өөрчлөлт',
    excerpt: 'Амьтдад зуны халуун цаг агаар хэрхэн нөлөөлдөг, тэднийг хэрхэн хамгаалах талаар.',
    imageUrl: '/hero_image.png',
    category: 'HEALTH',
    publishedAt: '2024-01-11T12:45:00Z',
  },
  // Нэмэлт мэдээнүүд...
  ...Array.from({ length: 45 }, (_, i) => ({
    id: (i + 6).toString(),
    title: `Мэдээ ${i + 6}: Амьтны арчилгааны зөвлөмж`,
    excerpt: `Энэ бол ${i + 6} дугаар мэдээний товч тайлбар юм. Амьтны эрүүл мэнд, сургалт зэргийн талаар.`,
    imageUrl: i % 3 === 0 ? '/hero_image.png' : null,
    category: (['HEALTH', 'TRAINING', 'ADOPTION', 'OTHER'] as const)[i % 4],
    publishedAt: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
  })),
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const category = searchParams.get('category') as TNewsListItem['category'] | null;
  const tag = searchParams.get('tag');

  // Фильтрлэх
  let filteredNews = mockNews;
  
  if (category) {
    filteredNews = filteredNews.filter(news => news.category === category);
  }
  
  if (tag) {
    // Tag filter логик (одоогоор хоосон)
  }

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  const response: TNewsListResponse = {
    items: paginatedNews,
    totalCount: filteredNews.length,
  };

  return NextResponse.json(response);
}
