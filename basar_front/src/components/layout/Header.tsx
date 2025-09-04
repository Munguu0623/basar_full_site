'use client';

import React from 'react';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">BASAR</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Нүүр
            </a>
            <a href="/news" className="text-gray-700 hover:text-gray-900 font-medium">
              Мэдээ
            </a>
            <a href="/blog" className="text-gray-700 hover:text-gray-900 font-medium">
              Блог
            </a>
            <a href="/organizations" className="text-gray-700 hover:text-gray-900 font-medium">
              Байгууллагууд
            </a>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 min-w-64">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Хайх..."
                className="bg-transparent flex-1 outline-none text-sm"
              />
            </div>
            
            <Button variant="ghost" size="md" className="md:hidden">
              <Search size={20} />
            </Button>
            
            <Button variant="primary" size="md">
              Нэвтрэх
            </Button>
            
            <Button variant="ghost" size="md" className="md:hidden">
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
