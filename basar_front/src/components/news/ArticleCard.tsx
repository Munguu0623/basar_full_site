'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TNewsListItem } from '@/types/news';

interface ArticleCardProps {
  article: TNewsListItem;
  href: string;
}

// Category өнгө mapping (design tokens-оор)
const categoryColors = {
  HEALTH: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  TRAINING: 'bg-blue-100 text-blue-800 border-blue-200',
  ADOPTION: 'bg-orange-100 text-orange-800 border-orange-200',
  OTHER: 'bg-gray-100 text-gray-800 border-gray-200',
} as const;

const categoryLabels = {
  HEALTH: 'Эрүүл мэнд',
  TRAINING: 'Сургалт',
  ADOPTION: 'Үрчлэлт',
  OTHER: 'Бусад',
} as const;

export default function ArticleCard({ article, href }: ArticleCardProps) {
  const { title, excerpt, imageUrl, category, publishedAt } = article;
  
  // Огноо форматлах
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Alt текст үүсгэх
  const imageAlt = `${categoryLabels[category]} - ${title}`;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <article
      className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${title} мэдээг унших`}
    >
      <Link href={href} className="block focus:outline-none">
        {/* Зураг хэсэг - 16:9 харьцаа */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-blue-100 text-blue-300">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category badge positioned on image */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${categoryColors[category]} shadow-lg`}
            >
              {categoryLabels[category]}
            </span>
          </div>
        </div>

        {/* Контент хэсэг */}
        <div className="p-6">
          {/* Огноо */}
          <div className="flex items-center justify-between mb-4">
            <time
              dateTime={publishedAt}
              className="text-sm text-gray-500 font-medium flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(publishedAt)}
            </time>
            
            {/* Read time estimate */}
            <span className="text-xs text-gray-400 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              3 мин
            </span>
          </div>

          {/* Гарчиг - 2 мөр хүртэл */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
            {title}
          </h3>

          {/* Тайлбар - 3 мөр хүртэл */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
          
          {/* Read more button */}
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
              Дэлгэрэнгүй унших
            </span>
            <svg 
              className="w-4 h-4 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}
