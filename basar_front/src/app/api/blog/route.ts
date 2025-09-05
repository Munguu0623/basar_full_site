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
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    // TODO: Database-аас блог нийтлэлүүдийг авах
    // Одоогоор mock data буцаах
    const mockBlogs: TBlogResponse[] = [
      {
        id: 'blog_1',
        title: 'Амьтан хайрлах нь',
        content: 'Амьтан хайрлах бол маш чухал зүйл...',
        imageUrl: null,
        author: { id: 'user_1', name: 'Test User' },
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      blogs: mockBlogs,
      pagination: {
        page,
        pageSize,
        total: 1,
        totalPages: 1,
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
