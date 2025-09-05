'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TNewsListItem, TNewsListParams } from '@/types/news';
import { getNewsList } from '@/lib/api';
import ArticleCard from './ArticleCard';
import Pagination from '../common/Pagination';
import SkeletonList from '../skeletons/SkeletonList';
import EmptyState from '../empty/EmptyState';

interface ArticleListProps {
  initialData?: {
    items: TNewsListItem[];
    totalCount: number;
  };
  categoryFilter?: TNewsListItem['category'];
  tagFilter?: string;
}

export default function ArticleList({
  initialData,
  categoryFilter,
  tagFilter,
}: ArticleListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [articles, setArticles] = useState<TNewsListItem[]>(initialData?.items || []);
  const [totalCount, setTotalCount] = useState(initialData?.totalCount || 0);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = 10;

  // Data fetching function
  const fetchArticles = useCallback(async (params: TNewsListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getNewsList(params);
      setArticles(response.items);
      setTotalCount(response.totalCount);
    } catch (err) {
      setError('Мэдээний жагсаалт ачаалахад алдаа гарлаа');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch data when params change
  useEffect(() => {
    // Skip initial fetch if we have initial data
    if (initialData && currentPage === 1 && !categoryFilter && !tagFilter) {
      return;
    }

    fetchArticles({
      page: currentPage,
      pageSize,
      category: categoryFilter,
      tag: tagFilter,
    });
  }, [currentPage, categoryFilter, tagFilter, fetchArticles, initialData]);

  // Page change handler
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    
    router.push(`?${params.toString()}`, { scroll: false });
    
    // Smooth scroll to top of list
    const listElement = document.getElementById('articles-list');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Retry handler for errors
  const handleRetry = () => {
    fetchArticles({
      page: currentPage,
      pageSize,
      category: categoryFilter,
      tag: tagFilter,
    });
  };

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 text-red-400 mb-4">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {error}
        </h3>
        <button
          onClick={handleRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition-colors"
        >
          Дахин оролдох
        </button>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <SkeletonList count={pageSize} />;
  }

  // Empty state
  if (articles.length === 0) {
    return (
      <EmptyState
        title="Мэдээ олдсонгүй"
        description="Одоогоор мэдээ байхгүй байна. Дахин ирж үзнэ үү."
        actionText="Нүүр хуудас руу буцах"
        actionHref="/"
      />
    );
  }

  return (
    <div id="articles-list">
      {/* Articles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            href={`/news/${article.id}`}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={currentPage}
        pageSize={pageSize}
        total={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
