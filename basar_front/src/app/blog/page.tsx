import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import BlogList from '@/components/blog/BlogList';
import SkeletonList from '@/components/skeletons/SkeletonList';

export const metadata: Metadata = {
  title: 'Блог | BASAR',
  description: 'Амьтан хайрлагчдын блог нийтлэлүүд. Амьтны асрамж, эрүүл мэнд, сургалт болон бусад хэрэгтэй мэдээллүүд.',
  openGraph: {
    title: 'Блог | BASAR',
    description: 'Амьтан хайрлагчдын блог нийтлэлүүд',
  },
};


export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section - Блогт тохирох амьтны дизайн */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated blog-themed background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-white/10 text-6xl animate-pulse">📝</div>
          <div className="absolute top-32 right-20 text-white/10 text-4xl animate-bounce" style={{animationDelay: '1s'}}>💭</div>
          <div className="absolute bottom-20 left-20 text-white/10 text-5xl animate-pulse" style={{animationDelay: '2s'}}>📖</div>
          <div className="absolute bottom-32 right-10 text-white/10 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🐾</div>
          <div className="absolute top-1/2 left-1/4 text-white/10 text-4xl animate-pulse" style={{animationDelay: '1.5s'}}>💡</div>
          <div className="absolute top-1/3 right-1/3 text-white/10 text-3xl animate-bounce" style={{animationDelay: '3s'}}>❤️</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-16 md:py-24">
          <div className="text-center">
            {/* Title with blog-themed styling */}
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl md:text-6xl mr-4 animate-bounce">📝</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Блог нийтлэлүүд
              </h1>
              <span className="text-4xl md:text-6xl ml-4 animate-bounce" style={{animationDelay: '0.5s'}}>📖</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-2xl">💭</span>
              <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
                Амьтан хайрлагчдын туршлага, зөвлөгөө болон хэрэгтэй мэдээллүүд
              </p>
              <span className="text-2xl">💡</span>
            </div>
            
            {/* Create blog button */}
            <div className="mb-8">
              <Link href="/blog/create">
                <button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-8 py-4 rounded-3xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 font-bold text-lg">
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">✍️</span>
                    Шинэ нийтлэл бичих
                    <span className="text-xl">📝</span>
                  </span>
                </button>
              </Link>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-2xl mr-2">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Блог хайх... 📖"
                  className="block w-full pl-16 pr-16 py-5 border border-transparent rounded-3xl bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-300/50 focus:border-transparent text-lg shadow-xl group-hover:shadow-2xl transition-all duration-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
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
        
        {/* Enhanced decorative shapes with blog theme */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
          <div className="w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
          <div className="w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="absolute top-1/2 right-1/4 -translate-y-8">
          <div className="w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12">
        
        {/* Category Filter Pills - Блогт тохирох дизайн */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
              <span className="text-3xl">🏷️</span>
              Блогийн ангилал
            </h2>
            <p className="text-gray-600">Сонирхсон ангиллаа сонгоод үзээрэй</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="group px-8 py-4 bg-gradient-to-r from-white to-gray-50 text-gray-700 rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-pink-300 transition-all duration-300 font-medium transform hover:scale-105">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">📋</span>
                Бүгд
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-pink-600 hover:to-rose-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-pulse">💫</span>
                Амьдралын хэв маяг
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-yellow-600 hover:to-orange-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">💡</span>
                Зөвлөгөө
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-indigo-600 hover:to-purple-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-pulse">📖</span>
                Түүх
              </span>
            </button>
            <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium transform hover:scale-105 hover:from-emerald-600 hover:to-green-700">
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">🏥</span>
                Эрүүл мэнд
              </span>
            </button>
          </div>
        </div>

        {/* Featured Blog Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <span className="text-4xl animate-bounce">⭐</span>
              Онцлох блог
              <span className="text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>⭐</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">📝</span>
              <p className="text-gray-600">Хамгийн их анхаарал татаж буй блог нийтлэлүүд</p>
              <span className="text-2xl">📖</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Main featured blog - Placeholder */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 rounded-3xl p-8 text-white text-center">
                <div className="text-6xl mb-4 animate-bounce">📝</div>
                <h3 className="text-2xl font-bold mb-2">Онцлох блог</h3>
                <p className="text-pink-100">Хамгийн сүүлийн үеийн блог нийтлэлүүд доор харагдана</p>
              </div>
            </div>
            
            {/* Side featured blogs - Sample categories */}
            <div className="space-y-6">
              {[
                {
                  icon: "💫",
                  category: "Амьдралын хэв маяг",
                  title: "Амьтантай хамт амьдрах таатай мөчүүд",
                  description: "Өдөр тутмын амьдралд амьтан хэрхэн баяр баясгалан авчирдаг...",
                  gradient: "from-pink-400 to-rose-600",
                  bgColor: "bg-pink-100",
                  textColor: "text-pink-800"
                },
                {
                  icon: "💡", 
                  category: "Зөвлөгөө",
                  title: "Амьтан арчлахын практик зөвлөгөө",
                  description: "Өдөр тутмын арчлагын хялбар, үр дүнтэй аргууд...",
                  gradient: "from-yellow-400 to-orange-500",
                  bgColor: "bg-yellow-100",
                  textColor: "text-yellow-800"
                },
                {
                  icon: "📖",
                  category: "Түүх",
                  title: "Гайхамшигтай амьтны түүхүүд",
                  description: "Хүмүүсийн амьдралыг өөрчилсөн амьтдын түүхүүд...",
                  gradient: "from-indigo-400 to-purple-600", 
                  bgColor: "bg-indigo-100",
                  textColor: "text-indigo-800"
                }
              ].map((article, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg">
                  <div className={`w-24 h-24 bg-gradient-to-br ${article.gradient} rounded-2xl flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{article.icon}</span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full mb-2 ${article.bgColor} ${article.textColor}`}>
                      <span>{article.icon}</span>
                      {article.category}
                    </span>
                    <h4 className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors mb-1">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {article.description}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        📝 Блог ангилал
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Blogs Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <span className="text-4xl animate-pulse">📝</span>
                Бүх блог нийтлэлүүд
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-lg">🔄</span>
                <p className="text-gray-600">Сүүлийн үеийн нийтлэлүүд</p>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <span>🔀</span>
                Эрэмбэлэх:
              </span>
              <select className="px-4 py-2 border-2 border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-300 transition-all duration-300 font-medium hover:border-pink-200">
                <option>⏰ Хамгийн шинэ</option>
                <option>👀 Хамгийн их үзэгдсэн</option>
                <option>❤️ Хамгийн их таалагдсан</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog List with Pagination */}
        <Suspense fallback={<SkeletonList />}>
          <BlogList />
        </Suspense>
      </div>
    </div>
  );
}
