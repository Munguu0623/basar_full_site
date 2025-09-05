'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardImage, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TArticle } from '@/types';
// import { getTrendingBlogs } from '@/lib/api'; // Unused for now
import { formatDate, formatNumber } from '@/lib/utils';
import { Calendar, Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for demo
const mockBlogData: TArticle[] = [
  {
    id: '1',
    title: 'Нохойн зөв тэжээлийн арга',
    excerpt: 'Гэрийн тэжээвэр нохойг хэрхэн зөв тэжээх талаар практик зөвлөмж.',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-15T08:00:00.000Z',
    author: {
      id: '1',
      name: 'С.Сүхбаатар',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80'
    },
    likeCount: 245,
    commentCount: 18
  },
  {
    id: '2',
    title: 'Муурны эрүүл мэндийн шинжилгээ',
    excerpt: 'Муурын эрүүл мэндийг хэрхэн хадгалах талаар мэргэжилтний зөвлөгөө.',
    imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-14T10:30:00.000Z',
    author: {
      id: '2',
      name: 'Д.Баясгалан',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80'
    },
    likeCount: 189,
    commentCount: 23
  },
  {
    id: '3',
    title: 'Амьтны гэрэл зургийн хичээл',
    excerpt: 'Гэрийн тэжээвэр амьтныг хэрхэн сайхан авах талаар.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-13T14:15:00.000Z',
    author: {
      id: '3',
      name: 'Б.Оюунчимэг',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80'
    },
    likeCount: 167,
    commentCount: 12
  },
  {
    id: '4',
    title: 'Амьтны хүүхэд руу нүүх бэлтгэл',
    excerpt: 'Шинэ гэр бүлээр амьтан авахын өмнө хийх ёстой бэлтгэл.',
    imageUrl: 'https://images.unsplash.com/photo-1601758123927-4a2264f6a1f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-12T16:45:00.000Z',
    author: {
      id: '4',
      name: 'Ц.Батбаяр',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80'
    },
    likeCount: 134,
    commentCount: 9
  },
  {
    id: '5',
    title: 'Зуны амьтны арчилгаа',
    excerpt: 'Зуны халуунд амьтдаа хэрхэн арчлах талаар.',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-11T09:20:00.000Z',
    author: {
      id: '5',
      name: 'Г.Энхбаяр',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80'
    },
    likeCount: 98,
    commentCount: 7
  },
  {
    id: '6',
    title: 'Амьтны сэтгэл зүйн эрүүл мэнд',
    excerpt: 'Гэрийн тэжээвэр амьтны сэтгэл зүйн байдалд анхаарах нь.',
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-10T11:15:00.000Z',
    author: {
      id: '6',
      name: 'М.Цэцэгмаа',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80'
    },
    likeCount: 176,
    commentCount: 15
  }
];

export const TrendingBlogsCarousel: React.FC = () => {
  const [blogs, setBlogs] = useState<TArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setBlogs(mockBlogData);
      setLoading(false);
    }, 800);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, blogs.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, blogs.length - 2)) % Math.max(1, blogs.length - 2));
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trending блогууд
            </h2>
            <p className="text-xl text-gray-600">
              Community-ээс хамгийн их уншигдсан контент
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                size="md"
                onClick={prevSlide}
                className="p-2"
                disabled={currentIndex === 0}
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={nextSlide}
                className="p-2"
                disabled={currentIndex >= blogs.length - 3}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
            
            <div className="flex gap-3">
              <Button variant="ghost">Блог унших</Button>
              <Button variant="primary">Шинэ блог бичих</Button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative" role="region" aria-roledescription="carousel" aria-label="Trending блогууд">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {blogs.map((blog) => (
                <div key={blog.id} className="w-full lg:w-1/3 flex-shrink-0">
                  <Card className="overflow-hidden h-full">
                    <CardImage 
                      src={blog.imageUrl || '/api/placeholder/400/300'} 
                      alt={blog.title}
                      className="aspect-video"
                    />
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="blog">Блог</Badge>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar size={14} />
                          {formatDate(blog.publishedAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        {blog.author && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <span className="text-sm text-gray-700">{blog.author.name}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Heart size={14} />
                            {formatNumber(blog.likeCount || 0)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle size={14} />
                            {blog.commentCount || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile scroll indicators */}
          <div className="flex justify-center mt-6 lg:hidden">
            <div className="flex gap-2">
              {Array.from({ length: Math.max(1, blogs.length - 2) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Slide ${index + 1} руу очих`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkeletonLoader: React.FC = () => (
  <section className="py-16 lg:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-96 animate-pulse"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 bg-gray-200 rounded-lg w-24 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <div className="aspect-video bg-gray-200 animate-pulse"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
