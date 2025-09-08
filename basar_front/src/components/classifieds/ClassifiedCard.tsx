'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Calendar, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { TClassified } from '@/types';

interface ClassifiedCardProps {
  classified: TClassified;
}

const categoryColors = {
  LOST: 'bg-red-100 text-red-700 border-red-200',
  FOUND: 'bg-green-100 text-green-700 border-green-200',
  ADOPTION: 'bg-orange-100 text-orange-700 border-orange-200',
  MARKETPLACE: 'bg-blue-100 text-blue-700 border-blue-200',
  SERVICE: 'bg-purple-100 text-purple-700 border-purple-200',
} as const;

const categoryLabels = {
  LOST: '🔍 Алдагдсан',
  FOUND: '✨ Олдсон',
  ADOPTION: '🏠 Үрчлүүлэх', 
  MARKETPLACE: '💰 Зар',
  SERVICE: '🔧 Үйлчилгээ'
} as const;

const animalTypeEmojis = {
  DOG: '🐕',
  CAT: '🐱',
  OTHER: '🐾'
} as const;

const categoryGradients = {
  LOST: 'from-red-400 to-pink-600',
  FOUND: 'from-green-400 to-emerald-600',
  ADOPTION: 'from-orange-400 to-amber-600',
  MARKETPLACE: 'from-blue-400 to-indigo-600',
  SERVICE: 'from-purple-400 to-pink-600',
} as const;

export default function ClassifiedCard({ classified }: ClassifiedCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const date = new Date(classified.createdAt);
      const formatted = date.toLocaleDateString('mn-MN', {
        month: 'short',
        day: 'numeric',
      });
      setFormattedDate(formatted);
    } catch {
      setFormattedDate('');
    }
  }, [classified.createdAt]);

  const mainPhoto = classified.photos[0] || '/api/placeholder/400/300';
  const hasPrice = classified.price !== null && classified.price !== undefined;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = `/classifieds/${classified.id}`;
    }
  };

  return (
    <article
      className="group relative bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 focus-within:ring-4 focus-within:ring-blue-300 focus-within:ring-offset-2"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${classified.title} зар харах`}
    >
      <Link href={`/classifieds/${classified.id}`} className="block focus:outline-none">
        {/* Image section */}
        <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${categoryGradients[classified.category]}`}>
          {mainPhoto ? (
            <Image
              src={mainPhoto}
              alt={`${classified.title} - ${animalTypeEmojis[classified.animalType]} амьтан`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`flex items-center justify-center h-full bg-gradient-to-br ${categoryGradients[classified.category]} text-white/80`}>
              <div className="text-center">
                <span className="text-6xl mb-2 block">
                  {animalTypeEmojis[classified.animalType]}
                </span>
                <span className="text-lg font-bold">
                  {categoryLabels[classified.category].split(' ')[1]}
                </span>
              </div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant="default"
              className={`${categoryColors[classified.category]} backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300 font-bold`}
            >
              {categoryLabels[classified.category]}
            </Badge>
          </div>

          {/* Price badge (Marketplace only) */}
          {hasPrice && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-green-600 text-white backdrop-blur-sm shadow-lg">
                💰 {classified.price?.toLocaleString('mn-MN')}₮
              </span>
            </div>
          )}

          {/* Photo count indicator */}
          {classified.photos.length > 1 && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
                📷 {classified.photos.length}
              </span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="p-5">
          {/* Animal type and meta info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{animalTypeEmojis[classified.animalType]}</span>
              {classified.breed && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {classified.breed}
                </span>
              )}
            </div>
            <time
              dateTime={classified.createdAt}
              className="text-xs text-gray-500 flex items-center gap-1"
            >
              <Calendar size={12} />
              {isClient ? formattedDate : ''}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {classified.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
            {classified.description}
          </p>

          {/* Animal details */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {classified.sex && (
              <Badge variant="default" size="sm">
                {classified.sex === 'M' ? '♂️ Эр' : '♀️ Эм'}
              </Badge>
            )}
            {classified.age && (
              <Badge variant="info" size="sm">
                {classified.age === 'BABY' && '🍼 Бага'}
                {classified.age === 'YOUNG' && '🌱 Залуу'}
                {classified.age === 'ADULT' && '💪 Насанд хүрсэн'}
              </Badge>
            )}
            {classified.size && (
              <Badge variant="warning" size="sm">
                {classified.size === 'S' && '🤏 Жижиг'}
                {classified.size === 'M' && '🐕 Дунд'}
                {classified.size === 'L' && '🐕‍🦺 Том'}
              </Badge>
            )}
          </div>

          {/* Location and contact */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin size={12} className="text-gray-400" />
              <span>
                {classified.locationCity}
                {classified.locationDistrict && `, ${classified.locationDistrict}`}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone size={12} className="text-gray-400" />
              <span>{classified.contactPhone}</span>
            </div>
          </div>

          {/* Action button */}
          <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg border border-blue-100 group-hover:from-blue-100 group-hover:to-emerald-100 transition-all duration-300">
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-medium text-xs flex items-center gap-1">
                <span className="text-sm">{animalTypeEmojis[classified.animalType]}</span>
                Дэлгэрэнгүй унших
              </span>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-pink-500 animate-pulse" />
                <svg 
                  className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
