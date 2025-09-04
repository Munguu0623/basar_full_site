import React from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BottomCTA: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-8 backdrop-blur-sm">
            <Sparkles size={32} className="text-white" />
          </div>

          {/* Headlines */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            BASAR-д нэгдэж,{' '}
            <span className="text-yellow-300">хамтдаа</span>{' '}
            илүү сайныг бүтээе
          </h2>
          
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 leading-relaxed">
            Амьтанд хайртай нэгдэлд орж, найдвартай мэдээлэл авч, 
            туршлага хуваалцж, verified байгууллагуудтай холбогдоорой
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 font-semibold"
            >
              Одоо нэгдэх
              <ArrowRight size={20} className="ml-2" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-lg px-8 py-4 text-white border-2 border-white/30 hover:bg-white/10 font-semibold"
            >
              Байгууллага нэмэх
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Үнэгүй бүртгэл</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Verified контент</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Нууцлал хамгаалагдсан</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">24/7 дэмжлэг</span>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-300/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
