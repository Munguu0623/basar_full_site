'use client';

import React from 'react';
import Image from 'next/image';
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
              <Badge variant="success" className="flex items-center gap-1">
                <CheckCircle size={14} />
                Verified 
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
              <Button variant="primary" size="lg" className="text-base px-8 font-semibold">
                Community-д нэгдэх
              </Button>
              <Button variant="secondary" size="lg" className="text-base px-8 font-semibold">
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
            <Image
              src="/hero_image.png"
              alt="Амьтанд хайртай гэр бүл: нохой, муур, хүүхдүүдтэй баярлаж байгаа зураг"
              className="object-cover rounded-2xl"
              priority
              width={500}
              height={500}
            />
            {/* Text overlay with animations */}
            <div className="absolute top-2 left-14 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/95 backdrop-blur-lg rounded-3xl px-6 py-4 shadow-2xl border-2 border-white/40 animate-float">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700 font-medium animate-fade-in flex items-center gap-1">
                    <span>Сайн байна уу?</span>
                    <span className="animate-bounce">👋</span>
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    Намайг <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text animate-pulse font-black text-2xl">БАСАР</span> гэдэг
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-1 right-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-60 animate-bounce"></div>
              
              {/* Speech bubble tail with gradient */}
              <div className="absolute -bottom-3 left-8 w-6 h-6 bg-gradient-to-br from-white/95 via-blue-50/90 to-purple-50/95 transform rotate-45 border-r-2 border-b-2 border-white/40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
