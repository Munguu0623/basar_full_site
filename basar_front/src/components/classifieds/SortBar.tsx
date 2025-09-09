'use client';

import { ArrowUpDown, Clock, DollarSign } from 'lucide-react';
import { TClassifiedFilters } from '@/types';

interface SortBarProps {
  sort: TClassifiedFilters['sort'];
  showPriceSort?: boolean;
  onChange: (sort: TClassifiedFilters['sort']) => void;
}

const sortOptions = [
  { value: 'newest', label: '🕐 Шинээс хуучин', icon: Clock, priceOnly: false },
  { value: 'oldest', label: '⏰ Хуучнаас шинэ', icon: Clock, priceOnly: false },
  { value: 'price_asc', label: '💰 Үнэ: бага → их', icon: DollarSign, priceOnly: true },
  { value: 'price_desc', label: '💎 Үнэ: их → бага', icon: DollarSign, priceOnly: true },
] as const;

export default function SortBar({ sort, showPriceSort = false, onChange }: SortBarProps) {
  const availableOptions = showPriceSort 
    ? sortOptions 
    : sortOptions.filter(option => !option.priceOnly);

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex items-center gap-2">
        <ArrowUpDown size={20} className="text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Эрэмбэлэх:</span>
      </div>
      
      <div 
        className="flex gap-2" 
        role="radiogroup" 
        aria-label="Зарууд эрэмбэлэх сонголт"
      >
        {availableOptions.map((option) => {
          const Icon = option.icon;
          const isActive = sort === option.value;
          
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              role="radio"
              aria-checked={isActive}
              aria-label={`${option.label} гэж эрэмбэлэх`}
            >
              <Icon size={16} />
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}