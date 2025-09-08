import { NextRequest, NextResponse } from 'next/server';
import { TOrganization } from '@/types';

// Mock data - өнөөдөр демо зорилгоор ашиглаж байна
const mockOrganizations: TOrganization[] = [
  {
    id: '1',
    name: 'Амьтан хайр малын эмнэлэг',
    verified: true,
    description: 'Амьтдын эрүүл мэндийг хамгаалж, эмчилгээ үйлчилгээ үзүүлдэг тусгай эмнэлэг. 10 жилийн туршлагатай мэргэжилтнүүд, орчин үеийн тоног төхөөрөмжөөр үйлчилгээ үзүүлнэ.',
    address: 'Чингэлтэй дүүрэг, 4-р хороо, Энхтайван өргөн чөлөө 47',
    phone: '7700-1234',
    email: 'info@petcare.mn',
    website: 'https://petcare.mn',
    services: ['Үзлэг эмчилгээ', 'Мэс засал', 'Вакцинжуулалт', 'Дентал үйлчилгээ', 'Гэрт очих үйлчилгээ'],
    hours: 'Даваа-Баасан: 09:00-18:00, Бямба: 10:00-16:00',
    logo: '/basar_logo.png',
  },
  {
    id: '2',
    name: 'Гэрийн тэжээвэр амьтан хамгаалах төв',
    verified: true,
    description: 'Эзэнгүй амьтдыг хамгаалж, шинэ гэр бүл олоход туслах байгууллага. Амьтдыг түр асарч, эрүүл мэндийн үзлэг хийж, шинэ эзэнтэй холбож өгдөг.',
    address: 'Баянзүрх дүүрэг, 12-р хороо, Нарны зам 23',
    phone: '9911-5678',
    email: 'rescue@shelter.mn',
    website: 'https://shelter.mn',
    services: ['Амьтан үрчлэх', 'Түр асрах', 'Эрүүл мэндийн үзлэг', 'Идэш тэжээл хангах'],
    hours: 'Өдөр бүр: 10:00-17:00',
  },
  {
    id: '3',
    name: 'Ухаалаг тэжээвэр сургалтын төв',
    verified: false,
    description: 'Нохой, муурны дүрэм сахилга, дасгал сургуулилт үзүүлэх мэргэжлийн төв. Тэжээвэр амьтдын зан үйлийг сайжруулж, эзэнтэйгээ илүү дотно харилцах арга заана.',
    address: 'Сүхбаатар дүүрэг, 8-р хороо, Чингисийн өргөн чөлөө 15',
    phone: '8800-9999',
    email: 'training@smartpet.mn',
    website: 'https://smartpet.mn',
    services: ['Сургалт', 'Зан үйлийн засвар', 'Нийгэмшүүлэх', 'Хувийн сургагч'],
    hours: 'Даваа-Ням: 08:00-20:00',
  },
  {
    id: '4',
    name: 'Зэрлэг амьтан аврах албан байгууллага',
    verified: true,
    description: 'Гэмтсэн, өвчтэй зэрлэг амьтдыг аварч эмчлэх, тэжээж аварч байгальд нь буцааж өгдөг төрийн бус байгууллага.',
    address: 'Хан-Уул дүүрэг, 11-р хороо',
    phone: '7777-9999',
    email: 'info@wildrescue.mn',
    services: ['Зэрлэг амьтан аврах', 'Эмчилгээ', 'Нөхөн сэргээх'],
    hours: '24/7 яаралтай тохиолдолд',
  },
  {
    id: '5',
    name: 'Амьтны хоол дэлгүүр сүлжээ',
    verified: false,
    description: 'Чанартай амьтны хоол, тоног хэрэгсэл, эм тарианы дэлгүүр. Олон төрлийн амьтдад зориулсан бүтээгдэхүүн борлуулдаг.',
    address: 'Олон байршилтай',
    phone: '9900-1122',
    email: 'shop@petstore.mn',
    website: 'https://petstore.mn',
    services: ['Амьтны хоол', 'Тоног хэрэгсэл', 'Эмийн сан', 'Хүргэлт'],
    hours: 'Өдөр бүр: 09:00-21:00',
  },
];

// GET /api/organizations - Байгууллагын жагсаалт авах
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query параметрүүд
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const type = searchParams.get('type');
    const city = searchParams.get('city');
    const verified = searchParams.get('verified');
    const search = searchParams.get('search');

    let filteredOrgs = [...mockOrganizations];

    // Хайлтын шүүлт
    if (search) {
      const searchLower = search.toLowerCase();
      filteredOrgs = filteredOrgs.filter(org => 
        org.name.toLowerCase().includes(searchLower) ||
        org.description?.toLowerCase().includes(searchLower) ||
        org.services?.some(service => service.toLowerCase().includes(searchLower))
      );
    }

    // Төрлийн шүүлт
    if (type && type !== '') {
      // Төрлийг нэрээр таних (demo зорилгоор)
      filteredOrgs = filteredOrgs.filter(org => {
        const orgName = org.name.toLowerCase();
        switch (type) {
          case 'VETERINARY':
            return orgName.includes('эмнэлэг');
          case 'SHELTER':
            return orgName.includes('хамгаалах') || orgName.includes('төв');
          case 'RESCUE':
            return orgName.includes('аврах');
          case 'TRAINING':
            return orgName.includes('сургалт');
          default:
            return true;
        }
      });
    }

    // Хотын шүүлт
    if (city && city !== '') {
      filteredOrgs = filteredOrgs.filter(org => {
        if (!org.address) return false;
        const address = org.address.toLowerCase();
        switch (city) {
          case 'UB':
            return address.includes('дүүрэг');
          default:
            return true;
        }
      });
    }

    // Баталгаажсан шүүлт
    if (verified === 'true') {
      filteredOrgs = filteredOrgs.filter(org => org.verified);
    }

    // Хуудаслалт
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedOrgs = filteredOrgs.slice(startIndex, endIndex);

    const response = {
      organizations: paginatedOrgs,
      pagination: {
        page,
        pageSize,
        total: filteredOrgs.length,
        totalPages: Math.ceil(filteredOrgs.length / pageSize),
      },
      filters: {
        type,
        city,
        verified: verified === 'true',
        search,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Organizations API error:', error);
    return NextResponse.json(
      { error: 'Байгууллагын мэдээлэл авахад алдаа гарлаа' },
      { status: 500 }
    );
  }
}

// POST /api/organizations - Шинэ байгууллага бүртгүүлэх хүсэлт илгээх
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    const requiredFields = ['name', 'type', 'email', 'city'];
    const missingFields = requiredFields.filter(field => !body[field]?.trim());
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'INVALID_INPUT',
          message: `Дараах талбарууд заавал бөглөх ёстой: ${missingFields.join(', ')}`,
          missingFields 
        },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          error: 'INVALID_INPUT',
          message: 'И-мэйл хаягийн формат буруу байна',
          field: 'email'
        },
        { status: 400 }
      );
    }

    // Phone validation (if provided)
    if (body.phone && !/^[0-9+\-\s()]+$/.test(body.phone)) {
      return NextResponse.json(
        { 
          error: 'INVALID_INPUT',
          message: 'Утасны дугаарын формат буруу байна',
          field: 'phone'
        },
        { status: 400 }
      );
    }

    // Website validation (if provided)
    if (body.website && !body.website.includes('.')) {
      return NextResponse.json(
        { 
          error: 'INVALID_INPUT',
          message: 'Веб сайтын хаягийн формат буруу байна',
          field: 'website'
        },
        { status: 400 }
      );
    }

    // Mock - одоогоор зөвхөн амжилттай хариу буцаах
    const applicationId = `app_${Date.now()}`;
    
    // Simulation: Save to database with pending status
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = {
      success: true,
      message: 'Хүсэлт амжилттай илгээгдлээ',
      applicationId,
      status: 'PENDING',
      estimatedReviewTime: '2-3 хоног',
      contactEmail: body.email,
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Organization application error:', error);
    return NextResponse.json(
      { 
        error: 'SERVER_ERROR',
        message: 'Сервер дээр алдаа гарлаа. Та дахин оролдоно уу.' 
      },
      { status: 500 }
    );
  }
}
