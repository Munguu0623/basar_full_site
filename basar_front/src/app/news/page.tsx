import { Metadata } from 'next';
import { Suspense } from 'react';
import ArticleList from '@/components/news/ArticleList';
import SkeletonList from '@/components/skeletons/SkeletonList';
import { getNewsList } from '@/lib/api';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Мэдээ & Мэдээлэл
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Амьтны эрүүл мэнд, сургалт, үрчлэлтийн талаарх хамгийн сүүлийн мэдээлэл
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Мэдээ хайх..."
                  className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-2xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
          <div className="w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
          <div className="w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12">
        
        {/* Category Filter Pills */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-6 py-3 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 font-medium">
              Бүгд
            </button>
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
              🏥 Эрүүл мэнд
            </button>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
              🎓 Сургалт
            </button>
            <button className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
              🏠 Үрчлэлт
            </button>
            <button className="px-6 py-3 bg-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
              📰 Бусад
            </button>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Онцлох мэдээ</h2>
            <p className="text-gray-600">Хамгийн их анхаарал татаж буй мэдээлэл</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Main featured article */}
            <div className="lg:col-span-1">
              <div className="relative group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block px-3 py-1 bg-emerald-500 text-sm font-medium rounded-full mb-3">
                      Эрүүл мэнд
                    </span>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-200 transition-colors">
                      Өвлийн улиралд амьтныг хэрхэн арчлах вэ?
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Хүйтэн өвлийн улиралд гэрийн тэжээвэр амьтдыг хэрхэн зөв арчлах талаар...
                    </p>
                    <div className="flex items-center text-sm text-blue-200">
                      <span>2024.01.15</span>
                      <span className="mx-2">•</span>
                      <span>1,250 үзэлт</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Side featured articles */}
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex-shrink-0"></div>
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                      Сургалт
                    </span>
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      Нохойны дрессуры хичээлийн эхлэл
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Анхан шатны нохойны дрессурын хичээлүүд...
                    </p>
                    <div className="text-xs text-gray-500">2024.01.14 • 890 үзэлт</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Articles Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Бүх мэдээ</h2>
              <p className="text-gray-600">Сүүлийн үеийн мэдээлэл</p>
            </div>
            
            {/* Sort Options */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm text-gray-600">Эрэмбэлэх:</span>
              <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Хамгийн шинэ</option>
                <option>Хамгийн их үзэгдсэн</option>
                <option>Хамгийн их таалагдсан</option>
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
