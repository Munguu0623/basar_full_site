import { NextRequest, NextResponse } from 'next/server';
import { TClassified } from '@/types';

// Mock data - same as used in pages
const mockClassifieds: TClassified[] = [
  {
    id: '1',
    category: 'LOST',
    animalType: 'DOG',
    breed: 'Герман овчинд',
    sex: 'M',
    age: 'ADULT',
    size: 'L',
    title: 'Алдагдсан герман овчинд нохой',
    description: 'Хар өнгөтэй том биетэй нохой. Хүзүүнд улаан зүүлт байгаа. Хэрэв олвол утсаар холбогдоно уу. Маш өндөр, дүнд биетэй. Сэтгэл хөдлөлийг мэдэрдэг, хүүхдүүдтэй сайн харьцдаг. Өглөө 9 цагийн орчимд гэрээс алга болсон.',
    photos: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    locationCity: 'Улаанбаатар',
    locationDistrict: 'Сүхбаатар дүүрэг',
    contactPhone: '99887766',
    contactEmail: 'owner@example.com',
    status: 'ACTIVE',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    category: 'ADOPTION',
    animalType: 'CAT',
    breed: 'Сибир муур',
    sex: 'F',
    age: 'BABY',
    size: 'S',
    title: 'Бяцхан мууранд ээжээ хайж байна',
    description: 'Маш эелдэг 2 сартай бяцхан муур. Эрүүл мэнд сайн, вакцин хийлгэсэн. Тусгай хооллолт шаардахгүй. Хүүхдүүдтэй тоглож чаддаг.',
    photos: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    locationCity: 'Улаанбаатар',
    locationDistrict: 'Баянзүрх дүүрэг',
    contactPhone: '95554433',
    status: 'ACTIVE',
    createdAt: '2024-01-14T15:20:00Z'
  },
  {
    id: '3',
    category: 'MARKETPLACE',
    animalType: 'DOG',
    breed: 'Золотой ретривер',
    sex: 'M',
    age: 'YOUNG',
    size: 'L',
    title: 'Золотой ретривер гэр бүлтэй болох',
    description: 'Маш зөөлөн сэтгэлтэй, хүүхдүүдтэй сайн ладдаг нохой. Эрүүл мэнд сайн. 1.5 настай. Бүх вакцин хийлгэсэн, цэвэр үүлдэр.',
    photos: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    locationCity: 'Улаанбаатар',
    price: 800000,
    contactPhone: '98776655',
    status: 'ACTIVE',
    createdAt: '2024-01-13T09:15:00Z'
  }
];

// GET /api/classifieds/[id] - Get single classified
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const classified = mockClassifieds.find(item => item.id === id);
    
    if (!classified) {
      return NextResponse.json(
        { error: 'Classified not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(classified);
    
  } catch (error) {
    console.error('Error fetching classified:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/classifieds/[id] - Update classified
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const classifiedIndex = mockClassifieds.findIndex(item => item.id === id);
    
    if (classifiedIndex === -1) {
      return NextResponse.json(
        { error: 'Classified not found' },
        { status: 404 }
      );
    }
    
    // Update classified
    mockClassifieds[classifiedIndex] = {
      ...mockClassifieds[classifiedIndex],
      ...body,
      id, // Ensure ID doesn't change
    };
    
    return NextResponse.json(mockClassifieds[classifiedIndex]);
    
  } catch (error) {
    console.error('Error updating classified:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/classifieds/[id] - Delete classified
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const classifiedIndex = mockClassifieds.findIndex(item => item.id === id);
    
    if (classifiedIndex === -1) {
      return NextResponse.json(
        { error: 'Classified not found' },
        { status: 404 }
      );
    }
    
    // Remove classified
    mockClassifieds.splice(classifiedIndex, 1);
    
    return NextResponse.json({ message: 'Classified deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting classified:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
