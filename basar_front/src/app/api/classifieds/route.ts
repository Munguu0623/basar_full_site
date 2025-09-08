import { NextRequest, NextResponse } from 'next/server';
import { TClassified, TClassifiedCreateRequest, TPaged } from '@/types';

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
    description: 'Хар өнгөтэй том биетэй нохой. Хүзүүнд улаан зүүлт байгаа. Хэрэв олвол утсаар холбогдоно уу.',
    photos: ['/api/placeholder/400/300'],
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
    description: 'Маш эелдэг 2 сартай бяцхан муур. Эрүүл мэнд сайн, вакцин хийлгэсэн.',
    photos: ['/api/placeholder/400/300'],
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
    description: 'Маш зөөлөн сэтгэлтэй, хүүхдүүдтэй сайн ладдаг нохой. Эрүүл мэнд сайн.',
    photos: ['/api/placeholder/400/300'],
    locationCity: 'Улаанбаатар',
    price: 800000,
    contactPhone: '98776655',
    status: 'ACTIVE',
    createdAt: '2024-01-13T09:15:00Z'
  }
];

// GET /api/classifieds - List classifieds with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const category = searchParams.get('category') as TClassified['category'] | null;
    const animalType = searchParams.get('animalType') as TClassified['animalType'] | null;
    const city = searchParams.get('city');
    const q = searchParams.get('q'); // search query
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    
    // Start with all classifieds
    let filteredData = [...mockClassifieds];
    
    // Apply filters
    if (category) {
      filteredData = filteredData.filter(item => item.category === category);
    }
    
    if (animalType) {
      filteredData = filteredData.filter(item => item.animalType === animalType);
    }
    
    if (city) {
      filteredData = filteredData.filter(item => 
        item.locationCity.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (q) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(q.toLowerCase()) ||
        item.description.toLowerCase().includes(q.toLowerCase()) ||
        (item.breed && item.breed.toLowerCase().includes(q.toLowerCase()))
      );
    }
    
    // Apply sorting
    switch (sort) {
      case 'oldest':
        filteredData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price_asc':
        filteredData.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        filteredData.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default: // newest
        filteredData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    const totalCount = filteredData.length;
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
    
    const response: TPaged<TClassified> = {
      items: paginatedData,
      totalCount
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching classifieds:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/classifieds - Create new classified
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TClassifiedCreateRequest;
    
    // Basic validation
    if (!body.category || !body.animalType || !body.title || !body.description || 
        !body.locationCity || !body.contactPhone || !body.photos?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new classified
    const newClassified: TClassified = {
      id: Math.random().toString(36).substring(7), // Generate random ID
      ...body,
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };
    
    // In real app, this would be saved to database
    mockClassifieds.unshift(newClassified);
    
    return NextResponse.json(newClassified, { status: 201 });
    
  } catch (error) {
    console.error('Error creating classified:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
