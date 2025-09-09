'use client';

import React from 'react';
import { Search, X, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Filters {
  status: 'all' | 'pending' | 'resolved' | 'dismissed';
  entityType: 'all' | 'post' | 'comment';
  q: string;
  dateRange?: { from: string; to: string };
}

interface ReportFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const statusOptions = [
  { value: 'all', label: 'Бүгд' },
  { value: 'pending', label: 'Хүлээгдэж буй' },
  { value: 'resolved', label: 'Шийдвэрлэгдсэн' },
  { value: 'dismissed', label: 'Татгалзсан' }
];

const entityTypeOptions = [
  { value: 'all', label: 'Бүх төрөл' },
  { value: 'post', label: 'Нийтлэл' },
  { value: 'comment', label: 'Сэтгэгдэл' }
];

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const hasActiveFilters = filters.status !== 'pending' || filters.entityType !== 'all' || filters.q !== '' || filters.dateRange;

  const clearFilters = () => {
    onFiltersChange({
      status: 'pending',
      entityType: 'all',
      q: ''
    });
  };

  const updateFilter = (key: keyof Filters, value: string | {from?: string, to?: string} | undefined) => {
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
            placeholder="Контент, гомдол гаргагчийн нэрээр хайх..."
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
            </button>
          ))}
        </div>
      </div>

      {/* Additional filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Төрөл:</span>
          <select
            value={filters.entityType}
            onChange={(e) => updateFilter('entityType', e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm bg-white"
          >
            {entityTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date range filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Огноо:</span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={filters.dateRange?.from || ''}
                onChange={(e) => updateFilter('dateRange', { 
                  ...filters.dateRange, 
                  from: e.target.value 
                })}
                className="pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm bg-white"
              />
            </div>
            <span className="text-slate-500">-</span>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                value={filters.dateRange?.to || ''}
                onChange={(e) => updateFilter('dateRange', { 
                  ...filters.dateRange, 
                  to: e.target.value 
                })}
                className="pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-sm bg-white"
              />
            </div>
          </div>
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
            {filters.entityType !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                Төрөл: {entityTypeOptions.find(t => t.value === filters.entityType)?.label}
                <button
                  onClick={() => updateFilter('entityType', 'all')}
                  className="ml-1 hover:text-emerald-900"
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
            {filters.dateRange && (filters.dateRange.from || filters.dateRange.to) && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                Огноо: {filters.dateRange.from} - {filters.dateRange.to}
                <button
                  onClick={() => updateFilter('dateRange', undefined)}
                  className="ml-1 hover:text-purple-900"
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
