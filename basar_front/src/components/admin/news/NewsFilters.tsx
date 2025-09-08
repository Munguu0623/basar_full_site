'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Filters {
  status: 'all' | 'draft' | 'published';
  category: string;
  q: string;
  dateRange?: { from: string; to: string };
}

interface NewsFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const statusOptions = [
  { value: 'all', label: 'Бүгд' },
  { value: 'draft', label: 'Ноорог' },
  { value: 'published', label: 'Нийтлэгдсэн' }
];

const categoryOptions = [
  { value: '', label: 'Бүх ангилал' },
  { value: 'news', label: 'Мэдээ' },
  { value: 'announcement', label: 'Зарлал' },
  { value: 'rescue', label: 'Аврах' },
  { value: 'adoption', label: 'Үрчлэгээ' },
  { value: 'care', label: 'Арчилгаа' }
];

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const hasActiveFilters = filters.status !== 'all' || filters.category !== '' || filters.q !== '';

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      category: '',
      q: ''
    });
  };

  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.q}
              onChange={(e) => updateFilter('q', e.target.value)}
              placeholder="Мэдээний гарчгаар хайх..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm"
            />
          </div>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Төлөв:</span>
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFilter('status', option.value)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-md transition-colors",
                  filters.status === option.value
                    ? "bg-white text-[#278EE8] shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Ангилал:</span>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm bg-white"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="md" 
            onClick={clearFilters}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
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
            {filters.status !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Төлөв: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => updateFilter('status', 'all')}
                  className="ml-1 hover:text-blue-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                Ангилал: {categoryOptions.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => updateFilter('category', '')}
                  className="ml-1 hover:text-emerald-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.q && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                Хайлт: "{filters.q}"
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
