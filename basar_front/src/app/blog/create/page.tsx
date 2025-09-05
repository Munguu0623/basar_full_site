import { Metadata } from 'next';
import { BlogForm } from '@/components/blog/BlogForm';

export const metadata: Metadata = {
  title: 'Шинэ блог нийтлэл үүсгэх | BASAR',
  description: 'BASAR платформ дээр шинэ блог нийтлэл үүсгэж, амьтан хайрлагчдын хамтын нийгэмлэгт хуваалцаарай.',
  robots: 'noindex, nofollow', // Create хуудсыг index хийх шаардлагагүй
};

export default function CreateBlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-white/10 text-6xl animate-pulse">✍️</div>
          <div className="absolute top-32 right-20 text-white/10 text-4xl animate-bounce" style={{animationDelay: '1s'}}>📝</div>
          <div className="absolute bottom-20 left-20 text-white/10 text-5xl animate-pulse" style={{animationDelay: '2s'}}>📖</div>
          <div className="absolute bottom-32 right-10 text-white/10 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🐾</div>
          <div className="absolute top-1/2 left-1/4 text-white/10 text-4xl animate-pulse" style={{animationDelay: '1.5s'}}>💭</div>
          <div className="absolute top-1/3 right-1/3 text-white/10 text-3xl animate-bounce" style={{animationDelay: '3s'}}>❤️</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12 md:py-16">
          <div className="text-center">
            {/* Title with create-themed styling */}
            <div className="flex items-center justify-center mb-4">
              <span className="text-4xl md:text-6xl mr-4 animate-bounce">✍️</span>
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                Шинэ блог үүсгэх
              </h1>
              <span className="text-4xl md:text-6xl ml-4 animate-bounce" style={{animationDelay: '0.5s'}}>📝</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="text-2xl">💡</span>
              <p className="text-lg md:text-xl text-pink-100 max-w-2xl mx-auto">
                Таны туршлага, зөвлөгөө болон мэдээллийг хуваалцаарай
              </p>
              <span className="text-2xl">🐾</span>
            </div>
          </div>
        </div>
        
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
          <div className="w-64 h-64 bg-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
          <div className="w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12">
        <BlogForm />
      </main>
    </div>
  );
}
