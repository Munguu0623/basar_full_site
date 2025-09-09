'use client';

import { useState, useCallback } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { TClassified, TClassifiedFilters } from '@/types';

interface FiltersBarProps {
  category: TClassified['category'] | null;
  animalType: TClassified['animalType'] | null;
  city: string;
  searchQuery: string;
  onChange: (filters: Partial<TClassifiedFilters>) => void;
}

const categoryLabels = {
  LOST: '🔍 Алдагдсан',
  FOUND: '✨ Олдсон', 
  ADOPTION: '🏠 Үрчлүүлэх',
  MARKETPLACE: '💰 Зар',
  SERVICE: '🔧 Үйлчилгээ'
} as const;

const animalTypeLabels = {
  DOG: '🐕 Нохой',
  CAT: '🐱 Муур',
  OTHER: '🐾 Бусад'
} as const;

const cities = [
  'Улаанбаатар',
  'Дархан',
  'Эрдэнэт',
  'Чойбалсан',
  'Мөрөн',
  'Ховд',
  'Өлгий',
  'Сайншанд'
];

export default function FiltersBar({
  category,
  animalType,
  city,
  searchQuery,
  onChange
}: FiltersBarProps) {
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Debounced search
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    const timeoutId = setTimeout(() => {
      onChange({ q: value || undefined });
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [onChange]);

  const handleCategoryChange = (newCategory: TClassified['category'] | null) => {
    onChange({ category: newCategory || undefined });
  };

  const handleAnimalTypeChange = (newType: TClassified['animalType'] | null) => {
    onChange({ animalType: newType || undefined });
  };

  const handleCityChange = (newCity: string) => {
    onChange({ city: newCity || undefined });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8 sticky top-4 z-10 backdrop-blur-sm bg-white/95">
      {/* Category tabs */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Filter size={20} />
          Зарын төрөл
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !category
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-pressed={!category}
          >
            🔄 Бүгд
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key as TClassified['category'])}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                category === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-pressed={category === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Search and filters row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Хайх үг
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="search"
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Зарын нэр, тайлбар..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Animal Type */}
        <div>
          <label htmlFor="animalType" className="block text-sm font-medium text-gray-700 mb-2">
            Амьтны төрөл
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAnimalTypeChange(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                !animalType
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-pressed={!animalType}
            >
              🌟 Бүгд
            </button>
            {Object.entries(animalTypeLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => handleAnimalTypeChange(key as TClassified['animalType'])}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                  animalType === key
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-pressed={animalType === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Хот/Аймаг
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">Бүх хот</option>
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filters display */}
      {(category || animalType || city || searchQuery) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600 font-medium">Идэвхтэй шүүлтүүр:</span>
            {category && (
              <button
                onClick={() => handleCategoryChange(null)}
                className="cursor-pointer hover:bg-red-100 hover:text-red-700"
              >
                <Badge variant="info">
                  {categoryLabels[category]} ✕
                </Badge>
              </button>
            )}
            {animalType && (
              <button
                onClick={() => handleAnimalTypeChange(null)}
                className="cursor-pointer hover:bg-red-100 hover:text-red-700"
              >
                <Badge variant="success">
                  {animalTypeLabels[animalType]} ✕
                </Badge>
              </button>
            )}
            {city && (
              <button
                onClick={() => handleCityChange('')}
                className="cursor-pointer hover:bg-red-100 hover:text-red-700"
              >
                <Badge variant="warning">
                  📍 {city} ✕
                </Badge>
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchInput('');
                  onChange({ q: undefined });
                }}
                className="cursor-pointer hover:bg-red-100 hover:text-red-700"
              >
                <Badge variant="default">
                  🔍 &ldquo;{searchQuery}&rdquo; ✕
                </Badge>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
