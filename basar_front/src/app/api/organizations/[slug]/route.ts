import { NextRequest, NextResponse } from 'next/server';
import { TOrganization } from '@/types';

// Mock data
const mockOrganizations: TOrganization[] = [
  {
    id: '1',
    name: 'Амьтан хайр малын эмнэлэг',
    verified: true,
    description: 'Амьтдын эрүүл мэндийг хамгаалж, эмчилгээ үйлчилгээ үзүүлдэг тусгай эмнэлэг. 10 жилийн туршлагатай мэргэжилтнүүд, орчин үеийн тоног төхөөрөмжөөр үйлчилгээ үзүүлнэ. Бид амьтдын эрүүл мэнд, аюулгүй байдлыг хамгийн тэргүүнд тавьж ажилладаг.',
    address: 'Чингэлтэй дүүрэг, 4-р хороо, Энхтайван өргөн чөлөө 47',
    phone: '7700-1234',
    email: 'info@petcare.mn',
    website: 'https://petcare.mn',
    services: ['Үзлэг эмчилгээ', 'Мэс засал', 'Вакцинжуулалт', 'Дентал үйлчилгээ', 'Гэрт очих үйлчилгээ', 'Эрүүл мэндийн сертификат', 'Нохойн сургалт'],
    hours: 'Даваа-Баасан: 09:00-18:00, Бямба: 10:00-16:00, Ням: амралтын өдөр',
    logo: '/basar_logo.png',
    coverImage: '/hero_image.png',
  },
  {
    id: '2',
    name: 'Гэрийн тэжээвэр амьтан хамгаалах төв',
    verified: true,
    description: 'Эзэнгүй амьтдыг хамгаалж, шинэ гэр бүл олоход туслах байгууллага. Амьтдыг түр асарч, эрүүл мэндийн үзлэг хийж, шинэ эзэнтэй холбож өгдөг. Бидний зорилго бол амьтан бүрийг хайртай гэр бүлтэй холбож өгөх юм.',
    address: 'Баянзүрх дүүрэг, 12-р хороо, Нарны зам 23',
    phone: '9911-5678',
    email: 'rescue@shelter.mn',
    website: 'https://shelter.mn',
    services: ['Амьтан үрчлэх', 'Түр асрах', 'Эрүүл мэндийн үзлэг', 'Идэш тэжээл хангах', 'Социализацийн сургалт', 'Гэр бүлтэй холбох'],
    hours: 'Өдөр бүр: 10:00-17:00 (яаралтай тохиолдолд 24/7)',
  },
  {
    id: '3',
    name: 'Ухаалаг тэжээвэр сургалтын төв',
    verified: false,
    description: 'Нохой, муурын дүрэм сахилга, дасгал сургуулилт үзүүлэх мэргэжлийн төв. Тэжээвэр амьтдын зан үйлийг сайжруулж, эзэнтэйгээ илүү дотно харилцах арга заана. Амьтны психологи, зан үйл судлаачийн зөвлөгөө авах боломжтой.',
    address: 'Сүхбаатар дүүрэг, 8-р хороо, Чингисийн өргөн чөлөө 15',
    phone: '8800-9999',
    email: 'training@smartpet.mn',
    website: 'https://smartpet.mn',
    services: ['Үндсэн сургалт', 'Зан үйлийн засвар', 'Нийгэмшүүлэх', 'Хувийн сургагч', 'Онлайн зөвлөгөө', 'Амьтны психологи'],
    hours: 'Даваа-Ням: 08:00-20:00 (урьдчилан захиалгаар)',
  },
];

interface RouteParams {
  params: {
    slug: string;
  };
}

// GET /api/organizations/[slug] - Байгууллагын дэлгэрэнгүй мэдээлэл авах
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params;

    // Find organization by ID (slug = id in this case)
    const organization = mockOrganizations.find(org => org.id === slug);

    if (!organization) {
      return NextResponse.json(
        { 
          error: 'NOT_FOUND',
          message: 'Байгууллага олдсонгүй' 
        },
        { status: 404 }
      );
    }

    // Холбоотой байгууллагууд (ижил төрлийн)
    const relatedOrganizations = mockOrganizations
      .filter(org => org.id !== organization.id)
      .filter(org => {
        // Энгийн логик - ижил үгс агуулсан байгууллагууд
        const currentOrgWords = organization.name.toLowerCase().split(' ');
        const otherOrgWords = org.name.toLowerCase().split(' ');
        
        return currentOrgWords.some(word => 
          otherOrgWords.some(otherWord => 
            word.length > 3 && otherWord.includes(word)
          )
        );
      })
      .slice(0, 3);

    const response = {
      organization,
      relatedOrganizations,
      meta: {
        lastUpdated: new Date().toISOString(),
        verified: organization.verified,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Organization detail API error:', error);
    return NextResponse.json(
      { 
        error: 'SERVER_ERROR',
        message: 'Байгууллагын мэдээлэл авахад алдаа гарлаа' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/organizations/[slug] - Байгууллагын мэдээлэл шинэчлэх (Auth хэрэгтэй)
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // TODO: Authentication check
    // const user = await getCurrentUser(request);
    // if (!user || !user.canEditOrganization(params.slug)) {
    //   return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    // }

    const { slug } = params;
    const body = await request.json();

    // Find organization
    const orgIndex = mockOrganizations.findIndex(org => org.id === slug);
    if (orgIndex === -1) {
      return NextResponse.json(
        { error: 'NOT_FOUND', message: 'Байгууллага олдсонгүй' },
        { status: 404 }
      );
    }

    // Validation
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'INVALID_INPUT', message: 'И-мэйл хаягийн формат буруу байна' },
        { status: 400 }
      );
    }

    if (body.phone && !/^[0-9+\-\s()]+$/.test(body.phone)) {
      return NextResponse.json(
        { error: 'INVALID_INPUT', message: 'Утасны дугаарын формат буруу байна' },
        { status: 400 }
      );
    }

    // Update organization (in real app, update database)
    const updatedOrg = {
      ...mockOrganizations[orgIndex],
      ...body,
      id: slug, // Ensure ID doesn't change
    };

    mockOrganizations[orgIndex] = updatedOrg;

    return NextResponse.json({
      success: true,
      organization: updatedOrg,
      message: 'Байгууллагын мэдээлэл амжилттай шинэчлэгдлээ',
    });

  } catch (error) {
    console.error('Organization update API error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: 'Мэдээлэл шинэчлэхэд алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// DELETE /api/organizations/[slug] - Байгууллагыг устгах (Admin эрх хэрэгтэй)
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // TODO: Admin authentication check
    // const user = await getCurrentUser(request);
    // if (!user || user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    // }

    const { slug } = params;

    const orgIndex = mockOrganizations.findIndex(org => org.id === slug);
    if (orgIndex === -1) {
      return NextResponse.json(
        { error: 'NOT_FOUND', message: 'Байгууллага олдсонгүй' },
        { status: 404 }
      );
    }

    // Remove organization (in real app, soft delete in database)
    const deletedOrg = mockOrganizations.splice(orgIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: `${deletedOrg.name} байгууллага амжилттай устгагдлаа`,
    });

  } catch (error) {
    console.error('Organization delete API error:', error);
    return NextResponse.json(
      { error: 'SERVER_ERROR', message: 'Байгууллага устгахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}
