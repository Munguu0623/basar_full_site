import { Metadata } from 'next';
import { Suspense } from 'react';
import ArticleList from '@/components/news/ArticleList';
import SkeletonList from '@/components/skeletons/SkeletonList';
import { getNewsList } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Мэдээ - BASAR',
  description: 'Амьтны эрүүл мэнд, сургалт, үрчлэлтийн талаарх хамгийн сүүлийн мэдээлэл',
  openGraph: {
    title: 'Мэдээ - BASAR',
    description: 'Амьтны эрүүл мэнд, сургалт, үрчлэлтийн талаарх хамгийн сүүлийн мэдээлэл',
    type: 'website',
  },
};

interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
  }>;
}

async function NewsPageContent({ searchParams }: NewsPageProps) {
  try {
    const params = await searchParams;
    const page = parseInt(params.page || '1');
    const category = params.category as 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER' | undefined;
    const tag = params.tag;

    const initialData = await getNewsList({
      page,
      pageSize: 10,
      category,
      tag,
    });

    return (
      <ArticleList
        initialData={initialData}
        categoryFilter={category}
        tagFilter={tag}
      />
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    // Fallback to client-side rendering
    const params = await searchParams;
    return (
      <ArticleList
        categoryFilter={params.category as 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER' | undefined}
        tagFilter={params.tag}
      />
    );
  }
}

export default function NewsPage({ searchParams }: NewsPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-orange-50">
      {/* Hero Section - Амьтны сайтад тохирох дизайн */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated paw prints background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-white/10 text-6xl animate-pulse">🐾</div>
          <div className="absolute top-32 right-20 text-white/10 text-4xl animate-bounce" style={{animationDelay: '1s'}}>🐕</div>
          <div className="absolute bottom-20 left-20 text-white/10 text-5xl animate-pulse" style={{animationDelay: '2s'}}>🐱</div>
          <div className="absolute bottom-32 right-10 text-white/10 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🐾</div>
          <div className="absolute top-1/2 left-1/4 text-white/10 text-4xl animate-pulse" style={{animationDelay: '1.5s'}}>🦴</div>
          <div className="absolute top-1/3 right-1/3 text-white/10 text-3xl animate-bounce" style={{animationDelay: '3s'}}>❤️</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-16 md:py-24">
          <div className="text-center">
            {/* Title with animal-themed styling */}
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl md:text-6xl mr-4 animate-bounce">🐾</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Мэдээ & Мэдээлэл
              </h1>
              <span className="text-4xl md:text-6xl ml-4 animate-bounce" style={{animationDelay: '0.5s'}}>🐾</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-2xl">🐕</span>
              <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto">
                Амьтны эрүүл мэнд, сургалт, үрчлэлтийн талаарх хамгийн сүүлийн мэдээлэл
              </p>
              <span className="text-2xl">🐱</span>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-2xl mr-2">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Амьтны мэдээ хайх... 🐾"
                  className="block w-full pl-16 pr-16 py-5 border border-transparent rounded-3xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 focus:border-transparent text-lg shadow-xl group-hover:shadow-2xl transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <span className="flex items-center gap-2">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Хайх
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced decorative shapes with animal theme */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
          <div className="w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
          <div className="w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute top-1/2 right-1/4 -translate-y-8">
          <div className="w-32 h-32 bg-teal-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12">
        
        {/* Category Filter Pills - Амьтны сайтад тохирох дизайн */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <span className="text-3xl">🗂️</span>
              Мэдээний ангилал
            </h2>
            <p className="text-gray-600">Сонирхсон ангиллаа сонгоод үзээрэй</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-white to-gray-50 text-gray-700 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-emerald-300 transition-all duration-300 font-medium transform hover:scale-105">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">📋</span>
                Бүгд
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-emerald-600 hover:to-green-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-pulse">🏥</span>
                Эрүүл мэнд
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-blue-600 hover:to-indigo-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">🎓</span>
                Сургалт
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-orange-600 hover:to-amber-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-pulse">🏠</span>
                Үрчлэлт
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-purple-600 hover:to-pink-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">📰</span>
                Бусад
              </span>
            </button>
          </div>
        </div>

        {/* Featured Section - Амьтны сайтад тохирох дизайн */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <span className="text-4xl animate-bounce">⭐</span>
              Онцлох мэдээ
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>⭐</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <p className="text-gray-600">Хамгийн их анхаарал татаж буй мэдээлэл</p>
              <span className="text-2xl">🐾</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Main featured article */}
            <div className="lg:col-span-1">
              <div className="relative group cursor-pointer transform hover:scale-[1.02] transition-all duration-500">
                <div className="aspect-[4/3] bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
                  
                  {/* Animated background elements */}
                  <div className="absolute top-4 right-4 text-white/20 text-3xl animate-bounce">🐾</div>
                  <div className="absolute bottom-20 right-8 text-white/20 text-2xl animate-pulse">❤️</div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/90 text-sm font-medium rounded-full mb-3 backdrop-blur-sm">
                      <span className="text-lg">🏥</span>
                      Эрүүл мэнд
                    </span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-200 transition-colors">
                      Өвлийн улиралд амьтныг хэрхэн арчлах вэ?
                    </h3>
                    <p className="text-emerald-100 mb-4">
                      Хүйтэн өвлийн улиралд гэрийн тэжээвэр амьтдыг хэрхэн зөв арчлах талаар...
                    </p>
                    <div className="flex items-center text-sm text-emerald-200">
                      <span className="flex items-center gap-1">
                        📅 2024.01.15
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center gap-1">
                        👀 1,250 үзэлт
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side featured articles - Амьтаны дизайн */}
            <div className="space-y-6">
              {[
                {
                  icon: "🎓",
                  category: "Сургалт",
                  title: "Нохойны дрессуры хичээлийн эхлэл",
                  description: "Анхан шатны нохойны дрессурын хичээлүүд...",
                  gradient: "from-blue-400 to-indigo-600",
                  bgColor: "bg-blue-100",
                  textColor: "text-blue-800"
                },
                {
                  icon: "🏠", 
                  category: "Үрчлэлт",
                  title: "Муур үрчлэх үйл явц",
                  description: "Гэргий амьтан үрчлэхэд анхаарах зүйлс...",
                  gradient: "from-orange-400 to-amber-600",
                  bgColor: "bg-orange-100",
                  textColor: "text-orange-800"
                },
                {
                  icon: "❤️",
                  category: "Асрамж",
                  title: "Амьтанд хайр тэмүүлэл үзүүлэх арга",
                  description: "Гэрийн тэжээвэр амьтанд хэрхэн анхаарал тавих...",
                  gradient: "from-pink-400 to-rose-600", 
                  bgColor: "bg-pink-100",
                  textColor: "text-pink-800"
                }
              ].map((article, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                  <div className={`w-24 h-24 bg-gradient-to-br ${article.gradient} rounded-2xl flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{article.icon}</span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 ${article.bgColor} ${article.textColor} text-xs font-medium rounded-full mb-2`}>
                      <span>{article.icon}</span>
                      {article.category}
                    </span>
                    <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        📅 2024.01.14
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        👀 {890 + i * 100} үзэлт
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Articles Section - Амьтаны дизайн */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <span className="text-4xl animate-pulse">📰</span>
                Бүх мэдээ
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔄</span>
                <p className="text-gray-600">Сүүлийн үеийн мэдээлэл</p>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <span>🔀</span>
                Эрэмбэлэх:
              </span>
              <select className="px-4 py-2 border-2 border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-300 transition-all duration-300 font-medium hover:border-emerald-200">
                <option>⏰ Хамгийн шинэ</option>
                <option>👀 Хамгийн их үзэгдсэн</option>
                <option>❤️ Хамгийн их таалагдсан</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <Suspense fallback={<SkeletonList count={10} />}>
          <NewsPageContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
