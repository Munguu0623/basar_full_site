'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Filters {
  status: 'all' | 'pending' | 'approved' | 'rejected';
  type: string;
  city: string;
  q: string;
}

interface OrgRequestFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const statusOptions = [
  { value: 'all', label: 'Бүгд', count: 0 },
  { value: 'pending', label: 'Хүлээгдэж буй', count: 0 },
  { value: 'approved', label: 'Батлагдсан', count: 0 },
  { value: 'rejected', label: 'Татгалзсан', count: 0 }
];

const typeOptions = [
  { value: '', label: 'Бүх төрөл' },
  { value: 'animal_shelter', label: 'Амьтны хоргодох газар' },
  { value: 'rescue_org', label: 'Аврах байгууллага' },
  { value: 'veterinary', label: 'Малын эмнэлэг' },
  { value: 'ngo', label: 'ТББ' },
  { value: 'volunteer_group', label: 'Сайн дурынхны бүлэг' },
  { value: 'other', label: 'Бусад' }
];

const cityOptions = [
  { value: '', label: 'Бүх хот' },
  { value: 'ulaanbaatar', label: 'Улаанбаатар' },
  { value: 'darkhan', label: 'Дархан' },
  { value: 'erdenet', label: 'Эрдэнэт' },
  { value: 'choibalsan', label: 'Чойбалсан' },
  { value: 'murun', label: 'Мөрөн' },
  { value: 'other', label: 'Бусад' }
];

export const OrgRequestFilters: React.FC<OrgRequestFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const hasActiveFilters = filters.status !== 'pending' || filters.type !== '' || filters.city !== '' || filters.q !== '';

  const clearFilters = () => {
    onFiltersChange({
      status: 'pending',
      type: '',
      city: '',
      q: ''
    });
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filters.q}
            onChange={(e) => updateFilter('q', e.target.value)}
            placeholder="Байгууллагын нэр, имэйлээр хайх..."
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm"
          />
        </div>
      </div>

      {/* Status tabs */}
      <div className="mb-6">
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter('status', option.value)}
              className={cn(
                "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                filters.status === option.value
                  ? "bg-white text-[#278EE8] shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              {option.label}
              {option.count > 0 && (
                <span className={cn(
                  "ml-2 px-2 py-0.5 text-xs rounded-full",
                  filters.status === option.value
                    ? "bg-[#278EE8] text-white"
                    : "bg-slate-300 text-slate-600"
                )}>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Type and City filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Төрөл:</span>
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm bg-white"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Хот:</span>
          <select
            value={filters.city}
            onChange={(e) => updateFilter('city', e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm bg-white"
          >
            {cityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="md" 
            onClick={clearFilters}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 ml-auto"
          >
            <X size={16} />
            Цэвэрлэх
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-600">Идэвхтэй шүүлтүүр:</span>
            {filters.status !== 'pending' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Төлөв: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => updateFilter('status', 'pending')}
                  className="ml-1 hover:text-blue-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.type && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                Төрөл: {typeOptions.find(t => t.value === filters.type)?.label}
                <button
                  onClick={() => updateFilter('type', '')}
                  className="ml-1 hover:text-emerald-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.city && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                Хот: {cityOptions.find(c => c.value === filters.city)?.label}
                <button
                  onClick={() => updateFilter('city', '')}
                  className="ml-1 hover:text-purple-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.q && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                Хайлт: &ldquo;{filters.q}&rdquo;
                <button
                  onClick={() => updateFilter('q', '')}
                  className="ml-1 hover:text-amber-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
