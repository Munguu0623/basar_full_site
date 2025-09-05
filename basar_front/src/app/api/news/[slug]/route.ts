import { NextRequest, NextResponse } from 'next/server';
import { TNewsDetail } from '@/types/news';

// Mock мэдээний дэлгэрэнгүй өгөгдөл
const mockNewsDetails: Record<string, TNewsDetail> = {
  '1': {
    id: '1',
    slug: 'winter-pet-care',
    title: 'Өвлийн улиралд амьтныг хэрхэн арчлах вэ?',
    content: `
      <h2>Өвлийн арчилгааны үндсэн зарчмууд</h2>
      
      <p>Өвлийн хүйтэн улиралд гэрийн тэжээвэр амьтад тусгай арчилгаа шаардлагатай болдог. Энэ нийтлэлд та амьтныхаа эрүүл мэндийг хадгалахад хэрэгтэй зүйлсийг олж мэдэх болно.</p>
      
      <h3>1. Дулаан хадгалах</h3>
      <p>Нохой, муур зэрэг амьтад хүйтэнд мэдрэмтгий байдаг. Тэдэнд зориулсан дулаан хувцас, ор хэрэгтэй.</p>
      
      <h3>2. Тэжээл</h3>
      <p>Өвлийн улиралд амьтдын энерги зарцуулалт ихсэдэг. Тэдний хоол тэжээлийг нэмэгдүүлэх шаардлагатай.</p>
      
      <h3>3. Эрүүл мэндийн үзлэг</h3>
      <p>Өвлийн өмнө ветеринарын эмчээр үзүүлэх нь чухал. Вакцины хуваарийг шалгуулаарай.</p>
      
      <blockquote>
        "Амьтныхаа эрүүл мэндийг өвлийн өмнө бэлтгэх нь хамгийн чухал" - Мэргэжилтэн Б.Батбаяр
      </blockquote>
      
      <h3>Дүгнэлт</h3>
      <p>Зөв арчилгаагаар таны амьтан өвлийг эрүүл, аюулгүй өнгөрүүлэх болно.</p>
    `,
    excerpt: 'Хүйтэн өвлийн улиралд гэрийн тэжээвэр амьтдыг хэрхэн зөв арчлах, тэдний эрүүл мэндийг хадгалах талаар мэргэжилтнүүдийн зөвлөгөө.',
    imageUrl: '/hero_image.png',
    category: 'HEALTH',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T11:30:00Z',
    tags: ['өвөл', 'арчилгаа', 'эрүүл мэнд', 'зөвлөгөө'],
    author: {
      id: 'auth1',
      name: 'Д.Энхбаяр',
      avatarUrl: '/hero_image.png',
      bio: 'Амьтны эмч, 10 жилийн туршлагатай',
    },
    likeCount: 245,
    commentCount: 18,
    viewCount: 1250,
    relatedArticles: [
      {
        id: '2',
        title: 'Нохойны дрессуры хичээлийн эхлэл',
        excerpt: 'Анхан шатны нохойны дрессурын хичээлүүд эхэллээ.',
        category: 'TRAINING',
        publishedAt: '2024-01-14T14:30:00Z',
      },
      {
        id: '5',
        title: 'Зун болж буй цаг уурын өөрчлөлт',
        excerpt: 'Амьтдад зуны халуун цаг агаар хэрхэн нөлөөлдөг.',
        category: 'HEALTH',
        publishedAt: '2024-01-11T12:45:00Z',
      },
    ],
  },
  
  '2': {
    id: '2',
    slug: 'dog-training-classes',
    title: 'Нохойны дрессуры хичээлийн эхлэл',
    content: `
      <h2>Дрессурын хичээлд бүртгүүлээрэй</h2>
      
      <p>Манай төвд анхан шатны нохойны дрессурын хичээлүүд эхэллээ. Бүх насны нохойд тохирсон программ.</p>
      
      <h3>Хичээлийн агуулга:</h3>
      <ul>
        <li>Үндсэн команд сургах</li>
        <li>Нийгэмшүүлэх</li>
        <li>Муу зуршлыг засах</li>
        <li>Эзэнтэйгээ харилцах</li>
      </ul>
      
      <p>Хичээлийн хуваарь: Бямба гариг бүр 14:00-16:00</p>
    `,
    excerpt: 'Анхан шатны нохойны дрессурын хичээлүүд эхэллээ. Мэргэжлийн багшаас бүх насны нохойд тохирсон сургалт.',
    imageUrl: '/hero_image.png',
    category: 'TRAINING',
    publishedAt: '2024-01-14T14:30:00Z',
    tags: ['дрессур', 'сургалт', 'нохой'],
    author: {
      id: 'auth2',
      name: 'М.Ганбат',
      bio: 'Амьтны зан төлөвийн мэргэжилтэн',
    },
    likeCount: 156,
    commentCount: 12,
    viewCount: 890,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  // ID эсвэл slug-аар хайх
  let newsDetail: TNewsDetail | undefined = mockNewsDetails[slug];
  
  // Хэрэв ID-аар олдохгүй бол slug-аар хайх
  if (!newsDetail) {
    newsDetail = Object.values(mockNewsDetails).find(
      article => article.slug === slug
    );
  }
  
  if (!newsDetail) {
    return NextResponse.json(
      { error: 'Мэдээ олдсонгүй' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(newsDetail);
}
