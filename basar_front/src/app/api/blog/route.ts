import { NextRequest, NextResponse } from 'next/server';
import { TBlogCreateRequest, TBlogResponse } from '@/types';

// POST /api/blog - шинэ блог нийтлэл үүсгэх
export async function POST(request: NextRequest) {
  try {
    const body: TBlogCreateRequest = await request.json();

    // Validation
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Гарчиг болон контент заавал шаардлагатай' },
        { status: 400 }
      );
    }

    if (body.title.length > 120) {
      return NextResponse.json(
        { error: 'Гарчиг 120 тэмдэгтээс хэтрэхгүй байх ёстой' },
        { status: 400 }
      );
    }

    if (body.content.length < 20) {
      return NextResponse.json(
        { error: 'Контент дор хаяж 20 тэмдэгт байх ёстой' },
        { status: 400 }
      );
    }

    // TODO: Хэрэглэгчийн authentication шалгах
    // TODO: Тухайн хэрэглэгч блог үүсгэх эрхтэй эсэхийг шалгах
    
    // Mock response - Бодитоор database-д хадгалах ёстой
    const mockBlogResponse: TBlogResponse = {
      id: `blog_${Date.now()}`, // UUID ашиглах хэрэгтэй
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl || null,
      category: body.category || 'OTHER',
      author: {
        id: 'user_123', // Тухайн нэвтэрсэн хэрэглэгчийн ID
        name: 'Test User', // Тухайн нэвтэрсэн хэрэглэгчийн нэр
      },
      createdAt: new Date().toISOString(),
    };

    // TODO: Database-д хадгалах логик нэмэх:
    // 1. Хэрэглэгчийн session/auth шалгах
    // 2. Зургийг file storage-д upload хийх (AWS S3, Cloudinary г.м)
    // 3. Blog document-г database-д үүсгэх
    // 4. Content-г sanitize хийх (XSS аюулгүй байдал)
    
    // Response буцаах
    return NextResponse.json(mockBlogResponse, { status: 201 });

  } catch (error) {
    console.error('Blog create error:', error);
    
    return NextResponse.json(
      { error: 'Дотоод алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// GET /api/blog - блогийн жагсаалт авах (Optional: нэмэлт функц)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '6');
    const category = searchParams.get('category') as TBlogResponse['category'] | null;
    const search = searchParams.get('search');

    // TODO: Database-аас блог нийтлэлүүдийг авах
    // Одоогоор mock data буцаах
    const allMockBlogs: TBlogResponse[] = [
      {
        id: 'blog_1',
        title: 'Амьтан хайрлах нь хэрхэн амьдралыг баялагжуулдаг вэ?',
        content: 'Амьтан хайрлах бол хүний амьдралд маш чухал зүйл юм...',
        excerpt: 'Амьтан хайрлах бол хүний амьдралд маш чухал зүйл юм.',
        imageUrl: '/hero_image.png',
        category: 'LIFESTYLE',
        author: { id: 'user_1', name: 'Б.Болд' },
        createdAt: '2025-01-15T10:30:00Z',
        tags: ['амьтан', 'хайр', 'асрамж'],
      },
      {
        id: 'blog_2',
        title: 'Нохойн сургалтын үндсэн зарчмууд',
        content: 'Нохойгоо зөв сургах нь маш чухал...',
        excerpt: 'Нохойгоо зөв сургах нь маш чухал.',
        imageUrl: null,
        category: 'TRAINING',
        author: { id: 'user_2', name: 'С.Сарангэрэл' },
        createdAt: '2025-01-14T15:20:00Z',
        tags: ['нохой', 'сургалт'],
      },
      {
        id: 'blog_3',
        title: 'Муурны эрүүл мэндийн анхны шинж тэмдэг',
        content: 'Муурны эрүүл мэндийн шинж тэмдгүүдийг анхааралтай ажиглах хэрэгтэй...',
        excerpt: 'Муурны эрүүл мэндийн шинж тэмдгүүдийг анхааралтай ажиглах хэрэгтэй.',
        imageUrl: '/hero_image.png',
        category: 'HEALTH',
        author: { id: 'user_3', name: 'О.Оюунбилэг' },
        createdAt: '2025-01-13T09:45:00Z',
        tags: ['муур', 'эрүүл_мэнд'],
      }
    ];

    // Filter by category
    let filteredBlogs = category 
      ? allMockBlogs.filter(blog => blog.category === category)
      : allMockBlogs;

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt?.toLowerCase().includes(searchLower) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const total = filteredBlogs.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

    return NextResponse.json({
      blogs: paginatedBlogs,
      pagination: {
        page,
        pageSize,
        total,
        totalPages,
      },
    });

  } catch (error) {
    console.error('Blog list error:', error);
    
    return NextResponse.json(
      { error: 'Дотоод алдаа гарлаа' },
      { status: 500 }
    );
  }
}
