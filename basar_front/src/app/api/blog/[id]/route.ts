import { NextRequest, NextResponse } from 'next/server';
import { TBlogResponse } from '@/types';

interface RouteProps {
  params: Promise<{ id: string }>;
}

// GET /api/blog/[id] - тодорхой блогийн дэлгэрэнгүй мэдээлэл авах
export async function GET(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Блогийн ID шаардлагатай' },
        { status: 400 }
      );
    }

    // TODO: Database-аас тухайн ID-тай блогийг авах
    // Одоогоор mock data буцаах
    const mockBlog: TBlogResponse = {
      id,
      title: 'Амьтан хайрлах талаар',
      content: `Амьтан хайрлах бол хүний амьдралд маш чухал зүйл юм. Амьтад бидний найз нөхөд, гэр бүлийн гишүүд болдог.

Амьтан хайрлах нь:
- Хайр энхрийг төрүүлдэг
- Хариуцлага мэдрэмжийг хөгжүүлдэг  
- Амьдралыг баялагжуулдаг
- Сэтгэл санааны эрүүл мэндэд сайнаар нөлөөлдөг

Тийм учраас амьтдаа хайртай хандаж, тэдгээрийг хамгаалж, асрах хэрэгтэй.`,
      imageUrl: '/hero_image.png',
      category: 'LIFESTYLE',
      author: {
        id: 'user_123',
        name: 'Test User',
      },
      createdAt: new Date().toISOString(),
    };

    // Хэрэв ID match хийхгүй бол 404 буцаах
    if (id === 'nonexistent') {
      return NextResponse.json(
        { error: 'Блог олдсонгүй' },
        { status: 404 }
      );
    }

    return NextResponse.json(mockBlog);

  } catch (error) {
    console.error('Blog detail error:', error);
    
    return NextResponse.json(
      { error: 'Дотоод алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - блог засах (Optional: нэмэлт функц)
export async function PUT(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Placeholder implementation - variables marked as used
    console.log('Blog ID:', id);
    console.log('Request body:', body);

    // TODO: Хэрэглэгчийн эрх шалгах (зөвхөн өөрийн блогоо засах)
    // TODO: Database update хийх

    return NextResponse.json(
      { message: 'Блог амжилттай засагдлаа' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Blog update error:', error);
    
    return NextResponse.json(
      { error: 'Дотоод алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - блог устгах (Optional: нэмэлт функц)  
export async function DELETE(request: NextRequest, { params }: RouteProps) {
  try {
    const { id } = await params;
    
    // Placeholder implementation - variable marked as used
    console.log('Blog ID to delete:', id);

    // TODO: Хэрэглэгчийн эрх шалгах (зөвхөн өөрийн блогоо устгах)
    // TODO: Database-аас устгах

    return NextResponse.json(
      { message: 'Блог амжилттай устгагдлаа' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Blog delete error:', error);
    
    return NextResponse.json(
      { error: 'Дотоод алдаа гарлаа' },
      { status: 500 }
    );
  }
}
