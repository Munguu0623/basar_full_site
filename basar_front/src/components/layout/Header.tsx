'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  return (
    <>
      {/* Weather Info Bar */}
      <div className="bg-gray-50 border-b border-gray-100 py-2 text-sm text-gray-600 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>Улаанбаатар: -12°C ☁️</span>
            <span>•</span>
            <span>Бид нар нэг гэр бүл!</span>
          </div>
          <div className="text-right">
            <span>2025.01.15 | 16:30</span>
          </div>
        </div>
      </div>
      
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 backdrop-blur-sm bg-white/95 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
          <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/basar_logo.png"
                alt="BASAR лого"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative h-8 w-24">
              <Image
                src="/basar_title.png"
                alt="BASAR.mn"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link href="/" className="px-4 py-2 text-gray-700 hover:text-[#278EE8] hover:bg-blue-50 rounded-lg font-medium transition-colors font-thin">
              Нүүр
            </Link>
            <a href="/animals" className="px-4 py-2 text-gray-700 hover:text-[#278EE8] hover:bg-blue-50 rounded-lg font-medium transition-colors font-thin">
              Амьтад
            </a>
            <Link href="/news" className="px-4 py-2 text-gray-700 hover:text-[#278EE8] hover:bg-blue-50 rounded-lg font-medium transition-colors font-thin">
              Мэдээ
            </Link>
            <Link href="/blog" className="px-4 py-2 text-gray-700 hover:text-[#278EE8] hover:bg-blue-50 rounded-lg font-medium transition-colors font-thin">
              Блог
            </Link>
            <a href="/organizations" className="px-4 py-2 text-gray-700 hover:text-[#278EE8] hover:bg-blue-50 rounded-lg font-medium transition-colors font-thin">
              Байгууллагууд
            </a>
            <a href="/rescue" className="px-4 py-2 text-gray-700 hover:text-[#278EE8] hover:bg-blue-50 rounded-lg font-medium transition-colors font-thin">
              Үрчлэгээ&Зар
            </a>
            <a href="/help" className="px-4 py-2 text-gray-700 hover:text-[#278EE8] hover:bg-blue-50 rounded-lg font-medium transition-colors">
              Анхны тусламж
            </a>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center space-x-3">
            {/* <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-4 py-2 min-w-48 border border-gray-200">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Хайх..."
                className="bg-transparent flex-1 outline-none text-sm"
              />
            </div> */}
            
            <Button variant="ghost" size="md" className="lg:hidden p-2">
              <Search size={20} />
            </Button>
            
            {/* Дэлгүүр товч цэнхэр */}
            <Button 
              variant="primary" 
              size="md" 
              className="bg-[#278EE8] hover:bg-[#1e7bd6] text-white px-4 py-2 rounded-full font-medium transition-colors"
            >
              ДЭЛГҮҮР
            </Button>
            
            {/* Нэвтрэх товч улбар */}
            <Button 
              variant="secondary" 
              size="md"
              className="bg-[#F48C06] hover:bg-[#e07b00] text-white px-4 py-2 rounded-full font-medium transition-colors"
            >
              НЭВТРЭХ
            </Button>
            
            <Button variant="ghost" size="md" className="lg:hidden p-2">
              <Menu size={20} />
            </Button>
          </div>
          </div>
        </div>
      </header>
    </>
  );
};
