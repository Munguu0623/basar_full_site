'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface DetailGalleryProps {
  photos: string[];
  title: string;
}

export default function DetailGallery({ photos, title }: DetailGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (photos.length <= 1) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen, photos.length]);

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <span className="text-6xl mb-4 block">📷</span>
            <p className="text-lg font-medium">Зураг байхгүй</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Main image */}
        <div className="relative aspect-video bg-gray-100">
          <Image
            src={photos[currentIndex]}
            alt={`${title} - зураг ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />
          
          {/* Navigation arrows (desktop) */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 lg:opacity-100"
                aria-label="Өмнөх зураг"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 lg:opacity-100"
                aria-label="Дараах зураг"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Zoom button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Том харах"
          >
            <ZoomIn size={20} />
          </button>

          {/* Photo counter */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 text-white rounded-full text-sm font-medium">
              {currentIndex + 1} / {photos.length}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {photos.length > 1 && (
          <div className="p-4 bg-gray-50">
            <div 
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all snap-start ${
                    currentIndex === index
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  aria-label={`${index + 1} дугаар зураг харах`}
                >
                  <Image
                    src={photo}
                    alt={`${title} - thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {currentIndex === index && (
                    <div className="absolute inset-0 bg-blue-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
              aria-label="Хаах"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main image */}
            <div className="relative max-w-full max-h-full">
              <Image
                src={photos[currentIndex]}
                alt={`${title} - зураг ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-full"
                sizes="100vw"
              />
            </div>

            {/* Navigation (fullscreen) */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Өмнөх зураг"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  aria-label="Дараах зураг"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Photo counter (fullscreen) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium">
                  {currentIndex + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
