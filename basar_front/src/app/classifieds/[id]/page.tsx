'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import DetailGallery from '@/components/classifieds/DetailGallery';
import DetailInfo from '@/components/classifieds/DetailInfo';
import ContactCard from '@/components/classifieds/ContactCard';
import RelatedClassifieds from '@/components/classifieds/RelatedClassifieds';
import SkeletonDetail from '@/components/skeletons/DetailSkeleton';
import ErrorState from '@/components/empty/ErrorState';
import { TClassified } from '@/types';

// Mock data - same as list page
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

export default function ClassifiedDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [classified, setClassified] = useState<TClassified | null>(null);
  const [relatedClassifieds, setRelatedClassifieds] = useState<TClassified[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch classified detail
  const fetchClassified = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const found = mockClassifieds.find(item => item.id === id);
      
      if (!found) {
        setError('Зар олдсонгүй');
        return;
      }
      
      setClassified(found);
      
      // Get related classifieds (same animal type, different id)
      const related = mockClassifieds.filter(item => 
        item.id !== id && 
        item.animalType === found.animalType
      ).slice(0, 3);
      
      setRelatedClassifieds(related);
    } catch (error) {
      console.error('Error fetching classified:', error);
      setError('Зар ачааллахад алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchClassified();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <SkeletonDetail />
        </div>
      </div>
    );
  }

  if (error || !classified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="container mx-auto px-4 py-8">
          <ErrorState
            title={error || 'Зар олдсонгүй'}
            message="Уучлаарай, таны хайсан зар олдсонгүй эсвэл устгагдсан байж магадгүй."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Буцах
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Gallery and Info */}
          <div className="lg:col-span-2 space-y-6">
            <DetailGallery photos={classified.photos} title={classified.title} />
            <DetailInfo classified={classified} />
          </div>

          {/* Right column - Contact */}
          <div className="lg:col-span-1">
            <ContactCard classified={classified} />
          </div>
        </div>

        {/* Related classifieds */}
        {relatedClassifieds.length > 0 && (
          <div className="mt-12">
            <RelatedClassifieds 
              classifieds={relatedClassifieds}
              animalType={classified.animalType}
            />
          </div>
        )}
      </div>
    </div>
  );
}
