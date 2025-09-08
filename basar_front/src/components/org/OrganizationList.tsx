'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TOrganization } from '@/types';
import OrganizationCard from './OrganizationCard';
import SkeletonList from '@/components/skeletons/SkeletonList';
import EmptyState from '@/components/empty/EmptyState';

interface OrganizationListParams {
  page?: number;
  pageSize?: number;
  type?: string;
  city?: string;
  verified?: boolean;
  search?: string;
}

interface OrganizationListResponse {
  organizations: TOrganization[];
  totalCount: number;
}

interface OrganizationListProps {
  initialData?: OrganizationListResponse;
  typeFilter?: string;
  cityFilter?: string;
  verifiedFilter?: boolean;
  searchQuery?: string;
}

// Шүүлтийн опцууд
const typeOptions = [
  { value: '', label: 'Бүх төрөл' },
  { value: 'VETERINARY', label: '🏥 Малын эмнэлэг' },
  { value: 'SHELTER', label: '🏠 Байр хамгаалах' },
  { value: 'RESCUE', label: '🆘 Аврах үйлчилгээ' },
  { value: 'TRAINING', label: '🎓 Сургалт' },
  { value: 'OTHER', label: '🏢 Бусад' },
];

const cityOptions = [
  { value: '', label: 'Бүх хот' },
  { value: 'UB', label: '🏙️ Улаанбаатар' },
  { value: 'ERDENET', label: '🏭 Эрдэнэт' },
  { value: 'DARKHAN', label: '🏘️ Дархан' },
  { value: 'CHOIBALSAN', label: '🌾 Чойбалсан' },
  { value: 'OTHER', label: '🏞️ Бусад' },
];

export default function OrganizationList({
  initialData,
  typeFilter,
  cityFilter,
  verifiedFilter,
  searchQuery,
}: OrganizationListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [organizations, setOrganizations] = useState<TOrganization[]>(initialData?.organizations || []);
  const [totalCount, setTotalCount] = useState(initialData?.totalCount || 0);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [selectedType, setSelectedType] = useState(typeFilter || '');
  const [selectedCity, setSelectedCity] = useState(cityFilter || '');
  const [selectedVerified, setSelectedVerified] = useState(verifiedFilter || false);
  const [searchTerm, setSearchTerm] = useState(searchQuery || '');
  
  // Pagination
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = 9;

  // Simulate API call - replace with actual API
  const fetchOrganizations = useCallback(async (params: OrganizationListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for demo
      const mockOrganizations: TOrganization[] = [
        {
          id: '1',
          name: 'Амьтан хайр малын эмнэлэг',
          verified: true,
          description: 'Амьтдын эрүүл мэндийг хамгаалж, эмчилгээ үйлчилгээ үзүүлдэг тусгай эмнэлэг',
          address: 'Чингэлтэй дүүрэг, 4-р хороо',
          phone: '7700-1234',
          email: 'info@petcare.mn',
          services: ['Үзлэг эмчилгээ', 'Мэс засал', 'Вакцинжуулалт'],
        },
        {
          id: '2',
          name: 'Гэрийн тэжээвэр амьтан хамгаалах төв',
          verified: true,
          description: 'Эзэнгүй амьтдыг хамгаалж, шинэ гэр бүл олоход туслах байгууллага',
          address: 'Баянзүрх дүүрэг, 12-р хороо',
          phone: '9911-5678',
          email: 'rescue@shelter.mn',
          services: ['Амьтан үрчлэх', 'Түр асрах', 'Эрүүл мэндийн үзлэг'],
        },
        {
          id: '3',
          name: 'Ухаалаг тэжээвэр сургалтын төв',
          verified: false,
          description: 'Нохой, муурны дүрэм сахилга, дасгал сургуулилт үзүүлэх',
          address: 'Сүхбаатар дүүрэг, 8-р хороо',
          phone: '8800-9999',
          email: 'training@smartpet.mn',
          services: ['Сургалт', 'Зан үйлийн засвар', 'Нийгэмшүүлэх'],
        },
      ];
      
      // Apply filters
      let filteredOrgs = mockOrganizations;
      
      if (params.search) {
        filteredOrgs = filteredOrgs.filter(org => 
          org.name.toLowerCase().includes(params.search!.toLowerCase()) ||
          org.description?.toLowerCase().includes(params.search!.toLowerCase())
        );
      }
      
      if (params.verified !== undefined) {
        filteredOrgs = filteredOrgs.filter(org => org.verified === params.verified);
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setOrganizations(filteredOrgs);
      setTotalCount(filteredOrgs.length);
    } catch (err) {
      setError('Байгууллагуудын мэдээллийг ачаалахад алдаа гарлаа');
      console.error('Error fetching organizations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch data when filters change
  useEffect(() => {
    // Skip initial fetch if we have initial data and no filters
    if (initialData && currentPage === 1 && !selectedType && !selectedCity && !selectedVerified && !searchTerm) {
      return;
    }

    fetchOrganizations({
      page: currentPage,
      pageSize,
      type: selectedType || undefined,
      city: selectedCity || undefined,
      verified: selectedVerified || undefined,
      search: searchTerm || undefined,
    });
  }, [currentPage, selectedType, selectedCity, selectedVerified, searchTerm, fetchOrganizations, initialData]);

  // Filter handlers
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    updateURLParams({ type });
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    updateURLParams({ city });
  };

  const handleVerifiedChange = (verified: boolean) => {
    setSelectedVerified(verified);
    updateURLParams({ verified: verified ? 'true' : '' });
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    updateURLParams({ search });
  };

  const updateURLParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Reset page when filters change
    params.delete('page');
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedType('');
    setSelectedCity('');
    setSelectedVerified(false);
    setSearchTerm('');
    router.push('/organizations', { scroll: false });
  };

  // Retry handler
  const handleRetry = () => {
    fetchOrganizations({
      page: currentPage,
      pageSize,
      type: selectedType || undefined,
      city: selectedCity || undefined,
      verified: selectedVerified || undefined,
      search: searchTerm || undefined,
    });
  };

  return (
    <div id="organization-list" className="space-y-6">
      {/* Шүүлтүүр хэсэг */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Хайлтын талбар */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Байгууллагын нэр хайх..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Төрөл сонгох */}
          <div className="min-w-48">
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 appearance-none bg-white"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Хот сонгох */}
          <div className="min-w-48">
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 appearance-none bg-white"
            >
              {cityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Баталгаажсан */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedVerified}
                onChange={(e) => handleVerifiedChange(e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-300"
              />
              <span className="text-sm font-medium text-gray-700">✓ Баталгаажсан</span>
            </label>
          </div>

          {/* Цэвэрлэх товч */}
          {(selectedType || selectedCity || selectedVerified || searchTerm) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              🗑️ Цэвэрлэх
            </button>
          )}
        </div>
      </div>

      {/* Үр дүнгийн тоо */}
      {!loading && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            {totalCount > 0 ? (
              <>
                <span className="font-semibold text-emerald-600">{totalCount}</span> байгууллага олдлоо
              </>
            ) : (
              'Байгууллага олдсонгүй'
            )}
          </span>
          {(selectedType || selectedCity || selectedVerified || searchTerm) && (
            <span className="text-blue-600">
              🔍 Шүүлт хэрэглэгдэж байна
            </span>
          )}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 text-red-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{error}</h3>
          <button
            onClick={handleRetry}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none transition-colors"
          >
            <span className="mr-2">🔄</span>
            Дахин оролдох
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && <SkeletonList count={pageSize} />}

      {/* Empty state */}
      {!loading && !error && organizations.length === 0 && (
        <EmptyState
          title="Байгууллага олдсонгүй"
          description={
            selectedType || selectedCity || selectedVerified || searchTerm
              ? "Таны хайлтын үр дүнд тохирох байгууллага олдсонгүй. Өөр түлхүүр үг ашиглан хайж үзээрэй."
              : "Одоогоор бүртгэлтэй байгууллага байхгүй байна. Та эхний байгууллагаа бүртгүүлээрэй."
          }
          actionText="Байгууллага бүртгүүлэх"
          actionHref="/organizations/apply"
        />
      )}

      {/* Organization Grid */}
      {!loading && !error && organizations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {organizations.map((organization, index) => (
            <div key={organization.id} className="stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
              <OrganizationCard organization={organization} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination placeholder - future implementation */}
      {!loading && !error && organizations.length > 0 && Math.ceil(totalCount / pageSize) > 1 && (
        <div className="text-center py-8">
          <div className="text-gray-500">
            🔄 Хуудаслалт тун удахгүй нэмэгдэнэ
          </div>
        </div>
      )}
    </div>
  );
}
