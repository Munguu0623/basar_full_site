'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Eye, Flag } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import ReportButton from './ReportButton';
import { TClassified } from '@/types';

interface DetailInfoProps {
  classified: TClassified;
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

const sexLabels = {
  M: '♂️ Эр',
  F: '♀️ Эм'
} as const;

const ageLabels = {
  BABY: '🍼 Бага насны',
  YOUNG: '🌱 Залуу',
  ADULT: '💪 Насанд хүрсэн'
} as const;

const sizeLabels = {
  S: '🤏 Жижиг',
  M: '🐕 Дунд зэрэг',
  L: '🐕‍🦺 Том'
} as const;

export default function DetailInfo({ classified }: DetailInfoProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const date = new Date(classified.createdAt);
      const formatted = date.toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setFormattedDate(formatted);
    } catch {
      setFormattedDate(classified.createdAt);
    }
  }, [classified.createdAt]);

  const handleMapClick = () => {
    const query = encodeURIComponent(`${classified.locationCity} ${classified.locationDistrict || ''}`);
    const mapUrl = `https://www.google.com/maps/search/${query}`;
    window.open(mapUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header with category and actions */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <Badge variant="info" size="lg" className="font-bold">
            {categoryLabels[classified.category]}
          </Badge>
          
          {classified.status === 'CLOSED' && (
            <Badge variant="danger" size="md">
              ❌ Хаагдсан
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Views (mock) */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Eye size={16} />
            <span>42</span>
          </div>
          
          {/* Report button */}
          <ReportButton classifiedId={classified.id} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
        {classified.title}
      </h1>

      {/* Price (for marketplace) */}
      {classified.price && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <div>
              <p className="text-sm text-green-700 font-medium">Үнэ</p>
              <p className="text-2xl font-bold text-green-800">
                {classified.price.toLocaleString('mn-MN')}₮
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Animal details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-xl">{animalTypeLabels[classified.animalType].split(' ')[0]}</span>
          Амьтны мэдээлэл
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Төрөл</p>
            <Badge variant="info" size="md">
              {animalTypeLabels[classified.animalType]}
            </Badge>
          </div>

          {classified.breed && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Үүлдэр</p>
              <p className="font-medium text-gray-900">{classified.breed}</p>
            </div>
          )}

          {classified.sex && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Хүйс</p>
              <Badge variant="default" size="md">
                {sexLabels[classified.sex]}
              </Badge>
            </div>
          )}

          {classified.age && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Нас</p>
              <Badge variant="warning" size="md">
                {ageLabels[classified.age]}
              </Badge>
            </div>
          )}

          {classified.size && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Хэмжээ</p>
              <Badge variant="success" size="md">
                {sizeLabels[classified.size]}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          📝 Дэлгэрэнгүй мэдээлэл
        </h3>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {classified.description}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin size={20} />
          Байршил
        </h3>
        
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-blue-900 mb-1">
                📍 {classified.locationCity}
              </p>
              {classified.locationDistrict && (
                <p className="text-blue-700">
                  {classified.locationDistrict}
                </p>
              )}
            </div>
            
            <button
              onClick={handleMapClick}
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              🗺️ Газрын зураг
            </button>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>Нийтэлсэн:</span>
            <time dateTime={classified.createdAt}>
              {isClient ? formattedDate : classified.createdAt}
            </time>
          </div>
          
          <div className="flex items-center gap-2">
            <span>ID: {classified.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
