'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import FiltersBar from '@/components/classifieds/FiltersBar';
import SortBar from '@/components/classifieds/SortBar';
import CardGrid from '@/components/classifieds/CardGrid';
import Pagination from '@/components/common/Pagination';
import { TClassified, TClassifiedFilters } from '@/types';

// Mock data for development
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

function ClassifiedsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [loading, setLoading] = useState(false);
  const [classifieds, setClassifieds] = useState<TClassified[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  // URL query parameters
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 12;
  const category = searchParams.get('category') as TClassified['category'] | null;
  const animalType = searchParams.get('animalType') as TClassified['animalType'] | null;
  const city = searchParams.get('city') || '';
  const searchQuery = searchParams.get('q') || '';
  const sort = searchParams.get('sort') as TClassifiedFilters['sort'] || 'newest';

  // Update URL with new parameters
  const updateURL = (newParams: Partial<TClassifiedFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    if (Object.keys(newParams).some(key => key !== 'page')) {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // Fetch classifieds
  const fetchClassifieds = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
      if (searchQuery) {
        filteredData = filteredData.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
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

      setTotalCount(filteredData.length);
      
      // Apply pagination
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
      
      setClassifieds(paginatedData);
    } catch (error) {
      console.error('Error fetching classifieds:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassifieds();
  }, [currentPage, category, animalType, city, searchQuery, sort]);

  const handleFiltersChange = (newFilters: Partial<TClassifiedFilters>) => {
    updateURL(newFilters);
  };

  const handlePageChange = (page: number) => {
    updateURL({ page });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">🐾</span>
            Амьтдын зар
            <span className="text-5xl">🏠</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Алдагдсан амьтаа олох, үрчлүүлэх, эсвэл худалдах зарууд. 
            Амьтны гэр бүлтэй болох замаа энд олоорой.
          </p>
        </div>

        {/* Filters */}
        <FiltersBar
          category={category}
          animalType={animalType}
          city={city}
          searchQuery={searchQuery}
          onChange={handleFiltersChange}
        />

        {/* Sort */}
        <SortBar
          sort={sort}
          showPriceSort={category === 'MARKETPLACE'}
          onChange={(newSort) => handleFiltersChange({ sort: newSort })}
        />

        {/* Results */}
        <CardGrid
          classifieds={classifieds}
          loading={loading}
          totalCount={totalCount}
        />

        {/* Pagination */}
        {Math.ceil(totalCount / pageSize) > 1 && (
          <Pagination
            page={currentPage}
            pageSize={pageSize}
            total={totalCount}
            onPageChange={handlePageChange}
            itemName="зар"
          />
        )}
      </div>
    </div>
  );
}

export default function ClassifiedsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Ачаалж байна...</div>}>
      <ClassifiedsPageContent />
    </Suspense>
  );
}