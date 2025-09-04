'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, Users, Shield } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Trust Pills */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="verified" className="flex items-center gap-1">
                <CheckCircle size={14} />
                Verified орг
              </Badge>
              <Badge variant="default" className="flex items-center gap-1">
                <Shield size={14} />
                A11y найрсаг
              </Badge>
              <Badge variant="default" className="flex items-center gap-1">
                <Users size={14} />
                Үнэгүй эхлэх
              </Badge>
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Амьтанд хайртай{' '}
                <span className="text-blue-600">нэгдэл</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Найдвартай мэдээ унш, туршлагаа хуваалц, verified байгууллагыг ол
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="text-base px-8">
                Community-д нэгдэх
              </Button>
              <Button variant="secondary" size="lg" className="text-base px-8">
                Байгууллагаа бүртгүүлэх
              </Button>
            </div>

            {/* Skip to content for A11y */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Үндсэн контент руу очих
            </a>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square lg:aspect-video rounded-3xl bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden">
              {/* Placeholder for hero image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto flex items-center justify-center">
                    <Users size={48} className="text-blue-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Амьтанд хайртай нэгдэл</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
