'use client';

import ClassifiedCard from './ClassifiedCard';
import { TClassified } from '@/types';

interface RelatedClassifiedsProps {
  classifieds: TClassified[];
  animalType: TClassified['animalType'];
}

const animalTypeLabels = {
  DOG: '🐕 Нохой',
  CAT: '🐱 Муур',
  OTHER: '🐾 Бусад'
} as const;

export default function RelatedClassifieds({ classifieds, animalType }: RelatedClassifiedsProps) {
  if (classifieds.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <span className="text-3xl">{animalTypeLabels[animalType].split(' ')[0]}</span>
          Төстэй зарууд
        </h2>
        <p className="text-gray-600">
          {animalTypeLabels[animalType]}-тай холбоотой бусад зарууд
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classifieds.map((classified) => (
          <ClassifiedCard 
            key={classified.id} 
            classified={classified} 
          />
        ))}
      </div>

      {/* View more link */}
      <div className="mt-6 text-center">
        <a
          href={`/classifieds?animalType=${animalType}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <span className="text-xl">{animalTypeLabels[animalType].split(' ')[0]}</span>
          Бүх {animalTypeLabels[animalType].split(' ')[1]} зар үзэх
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}
