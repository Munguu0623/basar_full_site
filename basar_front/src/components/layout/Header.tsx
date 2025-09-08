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
      <div className="bg-slate-50/80 border-b border-slate-200/60 py-2 text-sm text-slate-600 hidden lg:block backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="text-blue-500">🌤️</span>
              Улаанбаатар: -12°C
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-medium">🐾 Бид нар нэг гэр бүл!</span>
          </div>
          <div className="text-right text-slate-500">
            <span>2025.01.15 | 16:30</span>
          </div>
        </div>
      </div>
      
      <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-200/60 backdrop-blur-md shadow-sm">
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
            <Link href="/" className="px-4 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
              Нүүр
            </Link>
            <a href="/animals" className="px-4 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
              Амьтад
            </a>
            <Link href="/news" className="px-4 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
              Мэдээ
            </Link>
            <Link href="/blog" className="px-4 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
              Блог
            </Link>
            <Link href="/organizations" className="px-4 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
              Байгууллагууд
            </Link>
            <Link href="/classifieds" className="px-4 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
              🐾 Зар
            </Link>
            <a href="/help" className="px-4 py-2 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors">
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
            
            {/* Дэлгүүр товч */}
            <Link href="/shop">
              <Button 
                variant="primary" 
                size="md" 
                className="px-6"
              >
                🛒 ДЭЛГҮҮР
              </Button>
            </Link>
            
            {/* Нэвтрэх товч */}
            <Link href="/login">
              <Button 
                variant="secondary" 
                size="md"
                className="px-6"
              >
                👤 НЭВТРЭХ
              </Button>
            </Link>
            
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
