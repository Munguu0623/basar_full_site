'use client';

import { useMemo } from 'react';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  
  // Хуудас дүүрэх логик
  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (page >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  }, [page, totalPages]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page && newPage >= 1 && newPage <= totalPages) {
      onPageChange?.(newPage);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, newPage: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageChange(newPage);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav 
      role="navigation" 
      aria-label="Хуудас шилжүүлэх навигаци"
      className="flex items-center justify-center mt-8"
    >
      <div className="flex items-center space-x-1">
        {/* Өмнөх товч */}
        <button
          onClick={() => handlePageChange(page - 1)}
          onKeyDown={(e) => handleKeyDown(e, page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500"
          aria-label="Өмнөх хуудас руу шилжих"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Өмнөх
        </button>

        {/* Хуудасны дугаарууд */}
        {pages.map((pageNum, index) => {
          if (pageNum === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm font-medium text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isCurrentPage = pageNum === page;
          
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum as number)}
              onKeyDown={(e) => handleKeyDown(e, pageNum as number)}
              className={`inline-flex items-center px-3 py-2 text-sm font-medium border rounded-lg focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition-colors ${
                isCurrentPage
                  ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900'
              }`}
              aria-current={isCurrentPage ? 'page' : undefined}
              aria-label={`${pageNum} дугаар хуудас руу шилжих`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Дараах товч */}
        <button
          onClick={() => handlePageChange(page + 1)}
          onKeyDown={(e) => handleKeyDown(e, page + 1)}
          disabled={page >= totalPages}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500"
          aria-label="Дараах хуудас руу шилжих"
        >
          Дараах
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Хуудасны мэдээлэл */}
      <div className="ml-6 text-sm text-gray-700">
        <span className="font-medium">{total}</span> мэдээнээс{' '}
        <span className="font-medium">
          {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)}
        </span>{' '}
        харуулж байна
      </div>
    </nav>
  );
}
