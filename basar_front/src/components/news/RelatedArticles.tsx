'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TNewsListItem } from '@/types/news';
import { api } from '@/lib/api';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';

type RelatedArticlesProps = {
  currentArticleId: string;
  tags?: string[];
  className?: string;
};

export default function RelatedArticles({ 
  currentArticleId, 
  tags = [], 
  className = '' 
}: RelatedArticlesProps) {
  const [articles, setArticles] = useState<TNewsListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Хэрэв tag байхгүй бол function-ийг дуусгах
    if (!tags.length) {
      setLoading(false);
      return;
    }
    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Эхний tag-аар холбоотой мэдээ хайх
        const firstTag = tags[0];
        const response = await api<{ items: TNewsListItem[] }>(
          `/news?tag=${encodeURIComponent(firstTag)}&limit=4`
        );

        // Одоогийн нийтлэлийг хасаж, 3-ыг үлдээх
        const filteredArticles = response.items
          .filter(article => article.id !== currentArticleId)
          .slice(0, 3);

        setArticles(filteredArticles);
      } catch (err) {
        console.error('Related articles fetch error:', err);
        setError('Холбоотой нийтлэл ачаалахад алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleId, tags]);

  // Огноог format хийх
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mn-MN', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Category-ын өнгө тогтоох
  const getCategoryColor = (category: string) => {
    const colors = {
      HEALTH: 'bg-green-100 text-green-800',
      TRAINING: 'bg-blue-100 text-blue-800', 
      ADOPTION: 'bg-purple-100 text-purple-800',
      OTHER: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.OTHER;
  };

  // Loading эсвэл алдаа үед буцах
  if (loading) {
    return (
      <section className={`py-12 ${className}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Холбоотой нийтлэлүүд</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Хэрэв tag байхгүй эсвэл алдаа эсвэл нийтлэл байхгүй бол харуулахгүй  
  if (!tags.length || error || (!loading && !articles.length)) {
    return null;
  }

  return (
    <section className={`bg-gray-50 py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Холбоотой нийтлэлүүд
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md 
                       transition-shadow duration-200 group"
            >
              <Link href={`/news/${article.id}`} className="block">
                {/* Thumbnail Image */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Зураг байхгүй</span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge 
                      variant="default" 
                      className={`${getCategoryColor(article.category)} text-xs`}
                    >
                      {article.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-3 
                               line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  {article.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Date */}
                  <div className="flex items-center text-gray-500 text-xs">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href={`/news?tag=${encodeURIComponent(tags[0])}`}
            className="inline-flex items-center px-6 py-3 border border-gray-300 
                     text-base font-medium rounded-md text-gray-700 bg-white 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-blue-500 transition-colors duration-200"
          >
&quot;{tags[0]}&quot; сэдэвт бүх нийтлэл үзэх
          </Link>
        </div>
      </div>
    </section>
  );
}
