'use client';

import React, { useEffect, useState } from 'react';
import { TCommunityStats, TTestimonial } from '@/types';
import { getCommunityStats } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import { Users, FileText, Building, Quote } from 'lucide-react';

// Mock data for demo
const mockStats: TCommunityStats = {
  userCount: 12500,
  blogCount: 850,
  orgCount: 120
};

const mockTestimonials: TTestimonial[] = [
  {
    id: '1',
    name: 'Б.Амгалан',
    avatar: '/api/placeholder/60/60',
    content: 'BASAR-ийн тусламжтайгаар манай нохойд тохирсон эмнэлэг олж чадлаа. Үнэхээр их баярлалаа!',
    role: 'Нохойн эзэн'
  },
  {
    id: '2',
    name: 'С.Оюунчимэг',
    avatar: '/api/placeholder/60/60',
    content: 'Энд олон хүний туршлага уншиж муурыг зөв арчлах аргыг сурсан. Community маш сайхан.',
    role: 'Муурны эзэн'
  },
  {
    id: '3',
    name: 'Д.Батбаяр',
    avatar: '/api/placeholder/60/60',
    content: 'Амьтны эмнэлгийн хувьд энд байгаа verified системд их баярладаг. Итгэлцэл бий.',
    role: 'Ветеринар эмч'
  }
];

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ targetValue, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;
    
    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(startValue + (targetValue - startValue) * easeOut);
      
      setCurrentValue(value);
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    const timer = setTimeout(updateValue, 100);
    return () => clearTimeout(timer);
  }, [targetValue, duration]);

  return <span>{formatNumber(currentValue)}</span>;
};

export const CommunityProof: React.FC = () => {
  const [stats, setStats] = useState<TCommunityStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Бидний нэгдэл
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Өсөн нэмэгдэж буй амьтанд хайртай хүмүүсийн community
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Users size={32} className="text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2" aria-live="polite">
              {loading ? (
                <div className="h-10 bg-gray-200 rounded-lg w-20 mx-auto animate-pulse"></div>
              ) : (
                <AnimatedCounter targetValue={stats?.userCount || 0} />
              )}
              +
            </div>
            <p className="text-gray-600">Уншигч</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <FileText size={32} className="text-green-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2" aria-live="polite">
              {loading ? (
                <div className="h-10 bg-gray-200 rounded-lg w-20 mx-auto animate-pulse"></div>
              ) : (
                <AnimatedCounter targetValue={stats?.blogCount || 0} />
              )}
              +
            </div>
            <p className="text-gray-600">Блоггер</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Building size={32} className="text-orange-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2" aria-live="polite">
              {loading ? (
                <div className="h-10 bg-gray-200 rounded-lg w-20 mx-auto animate-pulse"></div>
              ) : (
                <AnimatedCounter targetValue={stats?.orgCount || 0} />
              )}
              +
            </div>
            <p className="text-gray-600">Verified байгууллага</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4">
                <Quote size={24} className="text-blue-200" />
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  {testimonial.avatar ? (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300"></div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
