'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardImage, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TArticle } from '@/types';
import { getFeaturedNews } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowRight } from 'lucide-react';

// Mock data for demo
const mockNewsData: TArticle[] = [
  {
    id: '1',
    title: 'Амьтны эмнэлгийн шинэ үйлчилгээ нээгдлээ',
    excerpt: 'Улаанбаатар хотын төвд амьтны эмнэлгийн шинэ салбар нээгдэж, 24 цагийн турш үйлчилгээ үзүүлэх боллоо.',
    imageUrl: 'https://www.workingnurse.com/wp-content/uploads/2025/01/Therapy-CHLA.jpg',
    category: 'NEWS',
    publishedAt: '2024-01-15T08:00:00.000Z',
    tags: ['эмнэлэг', 'үйлчилгээ'],
    author: {
      id: '1',
      name: 'Б.Болдбаатар',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80'
    }
  },
  {
    id: '2',
    title: 'Гэрийн тэжээвэр амьтны үзэсгэлэн',
    excerpt: 'Энэ сарын 20-нд амьтны үзэсгэлэн зохион байгуулагдана.',
    imageUrl: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    category: 'NEWS',
    publishedAt: '2024-01-14T10:30:00.000Z'
  },
  {
    id: '3',
    title: 'Амьтны хоол тэжээлийн шинэ бүтээгдэхүүн',
    excerpt: 'Органик амьтны хоол үйлдвэрлэгч компани шинэ бүтээгдэхүүнээ танилцуулжээ.',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    category: 'NEWS',
    publishedAt: '2024-01-13T14:15:00.000Z'
  },
  {
    id: '4',
    title: 'Нохойн сахилга батын үндсэн зарчмууд',
    excerpt: 'Гэрийн тэжээвэр нохойг зөв сахих арга барил.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-12T16:45:00.000Z'
  },
  {
    id: '5',
    title: 'Муурны эрүүл мэндийн шалгалт',
    excerpt: 'Муурын эрүүл мэндийг хэрхэн хадгалах талаар.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    category: 'BLOG',
    publishedAt: '2024-01-11T09:20:00.000Z'
  }
];

export const FeaturedNewsGrid: React.FC = () => {
  const [news, setNews] = useState<TArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setNews(mockNewsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (news.length === 0) {
    return <EmptyState />;
  }

  const featuredArticle = news[0];
  const otherArticles = news.slice(1, 5);

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Онцлох мэдээ
            </h2>
            <p className="text-xl text-gray-600">
              Амьтны ертөнцийн сүүлийн үеийн мэдээлэл
            </p>
          </div>
          <Button variant="ghost" className="hidden lg:flex items-center gap-2">
            Бүх мэдээ <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden h-full">
              <CardImage 
                src={featuredArticle.imageUrl || '/api/placeholder/600/400'} 
                alt={featuredArticle.title}
                className="aspect-video"
              />
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={featuredArticle.category.toLowerCase() as any}>
                    {featuredArticle.category === 'NEWS' ? 'Мэдээ' : 'Блог'}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    {formatDate(featuredArticle.publishedAt)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {featuredArticle.excerpt}
                </p>
                {featuredArticle.author && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <span className="text-sm text-gray-700">{featuredArticle.author.name}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Other Articles */}
          <div className="space-y-6">
            {otherArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={article.imageUrl || '/api/placeholder/96/96'}
                      alt={article.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={article.category.toLowerCase() as any} className="text-xs">
                        {article.category === 'NEWS' ? 'Мэдээ' : 'Блог'}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 lg:hidden">
          <Button variant="primary" className="flex items-center gap-2 mx-auto">
            Бүх мэдээ <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

const SkeletonLoader: React.FC = () => (
  <section className="py-16 lg:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
      <div className="mb-12">
        <div className="h-8 bg-gray-200 rounded-lg w-64 mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-96 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="aspect-video bg-gray-200 animate-pulse"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const EmptyState: React.FC = () => (
  <section className="py-16 lg:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Newspaper size={32} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Мэдээ байхгүй байна</h3>
        <p className="text-gray-600 mb-6">Удахгүй шинэ мэдээлэл нэмэгдэх болно.</p>
        <Button variant="primary">Сэргээх</Button>
      </div>
    </div>
  </section>
);
