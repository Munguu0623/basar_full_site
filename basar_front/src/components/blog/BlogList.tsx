'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TBlogResponse } from '@/types';
import { getBlogList } from '@/lib/api';
import ArticleCard from '@/components/common/ArticleCard';
import Pagination from '@/components/common/Pagination';
import SkeletonList from '@/components/skeletons/SkeletonList';
import EmptyState from '@/components/empty/EmptyState';

interface BlogListParams {
  page?: number;
  pageSize?: number;
  category?: TBlogResponse['category'];
  search?: string;
}

interface BlogListResponse {
  blogs: TBlogResponse[];
  totalCount: number;
}

interface BlogListProps {
  initialData?: BlogListResponse;
  categoryFilter?: TBlogResponse['category'];
  searchQuery?: string;
}

export default function BlogList({
  initialData,
  categoryFilter,
  searchQuery,
}: BlogListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [blogs, setBlogs] = useState<TBlogResponse[]>(initialData?.blogs || []);
  const [totalCount, setTotalCount] = useState(initialData?.totalCount || 0);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination state
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = 6;

  // Data fetching function
  const fetchBlogs = useCallback(async (params: BlogListParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getBlogList(params);
      setBlogs(response.blogs);
      setTotalCount(response.pagination.total);
    } catch (err) {
      setError('Блог нийтлэлүүдийг ачаалахад алдаа гарлаа');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch data when params change
  useEffect(() => {
    // Skip initial fetch if we have initial data
    if (initialData && currentPage === 1 && !categoryFilter && !searchQuery) {
      return;
    }

    fetchBlogs({
      page: currentPage,
      pageSize,
      category: categoryFilter,
      search: searchQuery,
    });
  }, [currentPage, categoryFilter, searchQuery, fetchBlogs, initialData]);

  // Page change handler
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    
    router.push(`?${params.toString()}`, { scroll: false });
    
    // Smooth scroll to top of list
    const listElement = document.getElementById('blog-list');
    if (listElement) {
      listElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Retry handler for errors
  const handleRetry = () => {
    fetchBlogs({
      page: currentPage,
      pageSize,
      category: categoryFilter,
      search: searchQuery,
    });
  };

  // Error state
  if (error) {
    return (
      <div id="blog-list" className="text-center py-12">
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
          className="inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:outline-none transition-colors"
        >
          <span className="mr-2">🔄</span>
          Дахин оролдох
        </button>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div id="blog-list">
        <SkeletonList count={pageSize} />
      </div>
    );
  }

  // Empty state
  if (blogs.length === 0) {
    return (
      <div id="blog-list">
        <EmptyState
          title="Блог нийтлэл олдсонгүй"
          description={
            categoryFilter || searchQuery
              ? "Таны хайлтын үр дүнд тохирох блог олдсонгүй. Өөр түлхүүр үг ашиглан хайж үзээрэй."
              : "Одоогоор блог нийтлэл байхгүй байна. Та эхний блог нийтлэлээ бичиж хуваалцаарай."
          }
          actionText="Шинэ блог бичих"
          actionHref="/blog/create"
        />
      </div>
    );
  }

  return (
    <div id="blog-list">
      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogs.map((blog) => (
          <ArticleCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            excerpt={blog.excerpt || blog.content.slice(0, 150) + '...'}
            imageUrl={blog.imageUrl}
            category={blog.category}
            publishedAt={blog.createdAt}
            author={blog.author}
            href={`/blog/${blog.id}`}
            type="blog"
            tags={blog.tags}
          />
        ))}
      </div>

      {/* Pagination */}
      {Math.ceil(totalCount / pageSize) > 1 && (
        <Pagination
          page={currentPage}
          pageSize={pageSize}
          total={totalCount}
          onPageChange={handlePageChange}
          itemName="блог"
        />
      )}
    </div>
  );
}
