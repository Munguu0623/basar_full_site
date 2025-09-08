'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TOrganization } from '@/types';

interface OrganizationCardProps {
  organization: TOrganization;
  href?: string;
}

// Байгууллагын төрөлд тохирсон өнгө өгөх
const typeColors = {
  VETERINARY: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  SHELTER: 'bg-blue-100 text-blue-800 border-blue-200',
  RESCUE: 'bg-orange-100 text-orange-800 border-orange-200',
  TRAINING: 'bg-purple-100 text-purple-800 border-purple-200',
  OTHER: 'bg-gray-100 text-gray-800 border-gray-200',
} as const;

const typeLabels = {
  VETERINARY: '🏥 Малын эмнэлэг',
  SHELTER: '🏠 Байр хамгаалах',
  RESCUE: '🆘 Аврах үйлчилгээ',
  TRAINING: '🎓 Сургалт',
  OTHER: '🏢 Бусад',
} as const;

const typeGradients = {
  VETERINARY: 'from-emerald-400 to-green-600',
  SHELTER: 'from-blue-400 to-indigo-600',
  RESCUE: 'from-orange-400 to-red-600',
  TRAINING: 'from-purple-400 to-pink-600',
  OTHER: 'from-gray-400 to-slate-600',
} as const;

type OrganizationType = keyof typeof typeColors;

export default function OrganizationCard({ organization, href }: OrganizationCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const {
    id,
    name,
    logo,
    verified,
    description,
    address,
    phone,
    email,
    services,
  } = organization;

  // Байгууллагын төрөлийг тодорхойлох (demo-д хэрэглэх)
  const orgType: OrganizationType = name.includes('эмнэлэг') ? 'VETERINARY' 
    : name.includes('хамгаалах') ? 'SHELTER'
    : name.includes('аврах') ? 'RESCUE' 
    : name.includes('сургалт') ? 'TRAINING'
    : 'OTHER';

  const cardHref = href || `/organizations/${id}`;
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = cardHref;
    }
  };

  return (
    <article
      className="group relative bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-emerald-200 focus-within:ring-4 focus-within:ring-emerald-300 focus-within:ring-offset-2 transform hover:scale-[1.02] stagger-item"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${name} байгууллагын дэлгэрэнгүй мэдээлэл үзэх`}
    >
      <Link href={cardHref} className="block focus:outline-none">
        {/* Лого болон cover хэсэг */}
        <div className={`relative h-48 bg-gradient-to-br ${typeGradients[orgType]} overflow-hidden`}>
          {logo && !imageError ? (
            <div className="relative h-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <Image
                src={logo}
                alt={`${name}-ийн лого`}
                width={120}
                height={120}
                className="object-contain rounded-2xl bg-white p-4 shadow-lg group-hover:scale-110 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-white/90">
              <div className="relative flex flex-col items-center">
                <span className="text-6xl mb-2 animate-float">
                  {orgType === 'VETERINARY' && '🏥'}
                  {orgType === 'SHELTER' && '🏠'}
                  {orgType === 'RESCUE' && '🆘'}
                  {orgType === 'TRAINING' && '🎓'}
                  {orgType === 'OTHER' && '🏢'}
                </span>
                <span className="text-lg font-bold">
                  {typeLabels[orgType].split(' ')[1]}
                </span>
              </div>
            </div>
          )}
          
          {/* Verified badge */}
          {verified && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse-glow">
                <span className="text-base">✓</span>
                <span>Баталгаажсан</span>
              </div>
            </div>
          )}
          
          {/* Төрөл badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${typeColors[orgType]} shadow-xl group-hover:scale-110 transition-transform duration-300`}
            >
              {typeLabels[orgType]}
            </span>
          </div>

          {/* Хөдөлгөөний элемент */}
          <div className="absolute bottom-2 right-2 text-white/30 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">
            🐾
          </div>
        </div>

        {/* Контент хэсэг */}
        <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
          {/* Нэр */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 leading-tight">
            {name}
          </h3>

          {/* Тайлбар */}
          {description && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
              {description}
            </p>
          )}

          {/* Хаяг */}
          {address && (
            <div className="flex items-start gap-2 mb-3">
              <span className="text-gray-400 mt-0.5">📍</span>
              <span className="text-sm text-gray-600 line-clamp-1">{address}</span>
            </div>
          )}

          {/* Холбоо барих мэдээлэл */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            {phone && (
              <div className="flex items-center gap-1">
                <span>📞</span>
                <span className="line-clamp-1">{phone}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center gap-1">
                <span>📧</span>
                <span className="line-clamp-1">{email}</span>
              </div>
            )}
          </div>

          {/* Үйлчилгээний жагсаалт */}
          {services && services.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {services.slice(0, 3).map((service, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {services.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                    +{services.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Дэлгэрэнгүй харах товч */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300">
            <span className="text-emerald-600 font-bold text-sm group-hover:text-emerald-700 transition-colors flex items-center gap-2">
              <span className="text-lg">🏢</span>
              Дэлгэрэнгүй үзэх
            </span>
            <div className="flex items-center gap-1">
              <span className="text-emerald-500 animate-bounce">🐾</span>
              <svg 
                className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
