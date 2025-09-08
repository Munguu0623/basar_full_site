'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Heart, Star, Calendar, Bell } from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Hero Section with Animal Characters */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-6xl animate-float">🐕</div>
          <div className="absolute top-32 right-20 text-5xl animate-bounce">🐱</div>
          <div className="absolute bottom-32 left-20 text-4xl animate-wiggle">🐰</div>
          <div className="absolute bottom-20 right-32 text-5xl animate-pulse">🐾</div>
          <div className="absolute top-40 left-1/3 text-3xl animate-float" style={{animationDelay: '1s'}}>🦮</div>
          <div className="absolute bottom-40 right-1/4 text-4xl animate-bounce" style={{animationDelay: '2s'}}>🐕‍🦺</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center relative z-10">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <Link href="/">
              <Button variant="ghost" className="group">
                <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
                Буцах
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            {/* Cute Animal Header */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="text-5xl animate-heartbeat">🐕</div>
              <div className="text-6xl animate-wiggle">💝</div>
              <div className="text-5xl animate-heartbeat" style={{animationDelay: '0.5s'}}>🐱</div>
            </div>

            <h1 className="text-5xl font-bold text-gray-800 mb-6 animate-gradient-text">
              🛒 BASAR ДЭЛГҮҮР
            </h1>
            
            <div className="text-2xl text-emerald-600 font-semibold mb-8 flex items-center justify-center gap-3">
              <span className="animate-pulse">⏰</span>
              <span>Тун удахгүй нээгдэнэ!</span>
              <span className="animate-pulse">✨</span>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Бид таны хайрт амьтдад зориулсан онцгой бүтээгдэхүүнүүдтэй 
              дэлгүүрээ бэлдэж байна. Чанартай хоол, тоглоом, эмнэлгийн хэрэгсэл болон 
              бусад шаардлагатай зүйлсийг олох боломжтой болно!
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 group hover:scale-105 transition-transform">
                <div className="text-4xl mb-4 group-hover:animate-bounce">🥘</div>
                <h3 className="font-semibold text-emerald-800 mb-2">Чанартай хоол</h3>
                <p className="text-sm text-emerald-600">Эрүүл ахуйн шаардлага хангасан амьтны хоол</p>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200 group hover:scale-105 transition-transform">
                <div className="text-4xl mb-4 group-hover:animate-spin">🎾</div>
                <h3 className="font-semibold text-blue-800 mb-2">Тоглоом хэрэгсэл</h3>
                <p className="text-sm text-blue-600">Амьтдын хөгжилд тусалах тоглоомууд</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200 group hover:scale-105 transition-transform">
                <div className="text-4xl mb-4 group-hover:animate-pulse">💊</div>
                <h3 className="font-semibold text-purple-800 mb-2">Эрүүл мэндийн бүтээгдэхүүн</h3>
                <p className="text-sm text-purple-600">Витамин, эм тариа болон арчилгааны хэрэгсэл</p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-8 rounded-2xl text-white mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Bell className="animate-wiggle" size={24} />
                <h3 className="text-xl font-semibold">Эхний мэдээг аваарай!</h3>
                <Bell className="animate-wiggle" size={24} style={{animationDelay: '0.5s'}} />
              </div>
              <p className="mb-6 opacity-90">
                Дэлгүүр нээгдэх болон шинэ бүтээгдэхүүний талаар эхлээд мэдээлэл авна уу
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="И-мэйл хаягаа оруулна уу"
                  className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-800 focus:ring-2 focus:ring-white/50 outline-none"
                />
                <Button className="bg-white text-emerald-600 hover:bg-gray-50 px-6 py-3 font-semibold">
                  <Heart className="mr-2" size={18} />
                  Бүртгүүлэх
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar size={24} className="text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-800">Хугацааны хуваарь</h3>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-emerald-600 font-medium">2025.01 - Бэлтгэл ажил</span>
                </div>
                <div className="hidden sm:block text-gray-300">→</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-600 font-medium">2025.02 - Туршилтын нээлт</span>
                </div>
                <div className="hidden sm:block text-gray-300">→</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-600 font-medium">2025.03 - Албан ёсны нээлт</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/news">
                <Button variant="secondary" size="lg" className="px-8">
                  <Star className="mr-2" size={20} />
                  Мэдээ унших
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="primary" size="lg" className="px-8">
                  <Heart className="mr-2" size={20} />
                  Блог үзэх
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fun Animal Footer */}
      <div className="bg-white/50 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center gap-6 text-4xl mb-6">
            <span className="animate-bounce">🐕</span>
            <span className="animate-wiggle">🐱</span>
            <span className="animate-heartbeat">🐰</span>
            <span className="animate-float">🦮</span>
            <span className="animate-pulse">🐾</span>
          </div>
          <p className="text-gray-600 text-lg">
            <span className="text-emerald-600 font-semibold">BASAR нэгдэл</span> - 
            Амьтанд хайртай хүмүүсийн гэр бүл 🏠💚
          </p>
        </div>
      </div>
    </div>
  );
}
