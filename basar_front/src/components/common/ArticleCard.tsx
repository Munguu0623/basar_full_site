'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  category: 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER' | 'LIFESTYLE' | 'TIPS' | 'STORIES';
  publishedAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  href: string;
  type?: 'news' | 'blog';
  tags?: string[];
}

// Category өнгө mapping (амьтаны сайтад тохирох дизайн)
const categoryColors = {
  HEALTH: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  TRAINING: 'bg-blue-100 text-blue-800 border-blue-200', 
  ADOPTION: 'bg-orange-100 text-orange-800 border-orange-200',
  OTHER: 'bg-purple-100 text-purple-800 border-purple-200',
  LIFESTYLE: 'bg-pink-100 text-pink-800 border-pink-200',
  TIPS: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  STORIES: 'bg-indigo-100 text-indigo-800 border-indigo-200',
} as const;

const categoryLabels = {
  HEALTH: '🏥 Эрүүл мэнд',
  TRAINING: '🎓 Сургалт',
  ADOPTION: '🏠 Үрчлэлт',
  OTHER: '📰 Бусад',
  LIFESTYLE: '💫 Амьдралын хэв маяг',
  TIPS: '💡 Зөвлөгөө',
  STORIES: '📖 Түүх',
} as const;

const categoryGradients = {
  HEALTH: 'from-emerald-400 to-green-600',
  TRAINING: 'from-blue-400 to-indigo-600',
  ADOPTION: 'from-orange-400 to-amber-600',
  OTHER: 'from-purple-400 to-pink-600',
  LIFESTYLE: 'from-pink-400 to-rose-600',
  TIPS: 'from-yellow-400 to-orange-500',
  STORIES: 'from-indigo-400 to-purple-600',
} as const;

export default function ArticleCard({
  title,
  excerpt,
  imageUrl,
  category,
  publishedAt,
  author,
  href,
  type = 'news',
  tags,
}: ArticleCardProps) {
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  
  // Client-side дээр огноо форматлах
  useEffect(() => {
    setIsClient(true);
    try {
      const date = new Date(publishedAt);
      const formatted = date.toLocaleDateString('mn-MN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setFormattedDate(formatted);
    } catch {
      setFormattedDate(publishedAt);
    }
  }, [publishedAt]);

  // Alt текст үүсгэх
  const imageAlt = `${categoryLabels[category]} - ${title}`;

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = href;
    }
  };

  // Type-д тохирсон emoji
  const typeEmoji = type === 'blog' ? '📝' : '📰';

  return (
    <article
      className="group relative bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-emerald-200 focus-within:ring-4 focus-within:ring-emerald-300 focus-within:ring-offset-2 transform hover:scale-[1.02] stagger-item"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${title} ${type === 'blog' ? 'блог' : 'мэдээ'}г унших`}
    >
      <Link href={href} className="block focus:outline-none">
        {/* Зураг хэсэг - амьтаны дизайн */}
        <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${categoryGradients[category]}`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className={`flex items-center justify-center h-full bg-gradient-to-br ${categoryGradients[category]} text-white/80 relative`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex flex-col items-center">
                <span className="text-6xl mb-2">
                  {category === 'HEALTH' && '🏥'}
                  {category === 'TRAINING' && '🎓'}
                  {category === 'ADOPTION' && '🏠'}
                  {category === 'LIFESTYLE' && '💫'}
                  {category === 'TIPS' && '💡'}
                  {category === 'STORIES' && '📖'}
                  {category === 'OTHER' && typeEmoji}
                </span>
                <span className="text-lg font-bold">
                  {categoryLabels[category].split(' ')[1]}
                </span>
              </div>
            </div>
          )}
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Animated paw prints on hover */}
          <div className="absolute top-2 right-2 text-white/30 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse">
            🐾
          </div>
          
          {/* Enhanced category badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold border-2 backdrop-blur-sm ${categoryColors[category]} shadow-xl group-hover:scale-110 transition-transform duration-300`}
            >
              {categoryLabels[category]}
            </span>
          </div>

          {/* Blog/News type indicator */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-gray-700 backdrop-blur-sm shadow-lg">
              <span>{typeEmoji}</span>
              {type === 'blog' ? 'Блог' : 'Мэдээ'}
            </span>
          </div>
        </div>

        {/* Контент хэсэг - амьтаны дизайн */}
        <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
          {/* Tags (блогийн хувьд) */}
          {tags && tags.length > 0 && (
            <div className="flex gap-1 mb-3 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-400">+{tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Огноо болон статистик */}
          <div className="flex items-center justify-between mb-4">
            <time
              title={publishedAt}
              dateTime={publishedAt}
              className="text-sm text-gray-500 font-medium flex items-center bg-gray-100 px-3 py-1 rounded-full"
            >
              <span className="mr-1">📅</span>
              {isClient ? formattedDate : publishedAt}
            </time>
            
            {/* Read time estimate */}
            <span className="text-xs text-gray-400 flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <span className="mr-1">⏱️</span>
              {type === 'blog' ? '5 мин' : '3 мин'}
            </span>
          </div>

          {/* Гарчиг - амьтаны элементтэй */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300 leading-tight">
            {title}
          </h3>

          {/* Тайлбар */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-5">
            {excerpt}
          </p>
          
          {/* Author Info (хэрэв байгаа бол) */}
          {author && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">
                  {author.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-600 font-medium">{author.name}</span>
            </div>
          )}
          
          {/* Enhanced read more button */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300">
            <span className="text-emerald-600 font-bold text-sm group-hover:text-emerald-700 transition-colors flex items-center gap-2">
              <span className="text-lg">{type === 'blog' ? '📖' : '📰'}</span>
              Дэлгэрэнгүй унших
            </span>
            <div className="flex items-center gap-1">
              <span className="text-emerald-500 animate-bounce">🐾</span>
              <svg 
                className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
