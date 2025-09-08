'use client';

import Link from 'next/link';
import ClassifiedCard from './ClassifiedCard';
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton';
import EmptyState from '@/components/empty/EmptyState';
import { TClassified } from '@/types';

interface CardGridProps {
  classifieds: TClassified[];
  loading: boolean;
  totalCount: number;
}

export default function CardGrid({ classifieds, loading, totalCount }: CardGridProps) {
  if (loading) {
    return (
      <div className="mb-8">
        <CardGridSkeleton count={6} />
      </div>
    );
  }

  if (classifieds.length === 0) {
    return (
      <div className="mb-8">
        <EmptyState
          title="Таны хайлтанд тохирох зар олдсонгүй"
          description="Та шүүлтүүрээ өөрчилж үзэх эсвэл шинэ зар нэмээрэй."
          actionText="Зар үүсгэх"
          actionHref="/classifieds/new"
        />
      </div>
    );
  }

  return (
    <div className="mb-8">
      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          <span className="font-semibold">{totalCount}</span> зар олдлоо
        </p>
        
        {/* Create button - desktop */}
        <div className="hidden md:block">
          <Link
            href="/classifieds/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl">➕</span>
            Зар үүсгэх
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classifieds.map((classified) => (
          <ClassifiedCard 
            key={classified.id} 
            classified={classified} 
          />
        ))}
      </div>

      {/* Create button - mobile floating */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Link
          href="/classifieds/new"
          className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          aria-label="Зар үүсгэх"
        >
          <span className="text-2xl">➕</span>
        </Link>
      </div>
    </div>
  );
}
