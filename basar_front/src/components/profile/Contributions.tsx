'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TMyPost, TMyComment, TPaged } from '@/types';

export const Contributions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');
  const [posts, setPosts] = useState<TPaged<TMyPost> | null>(null);
  const [comments, setComments] = useState<TPaged<TMyComment> | null>(null);
  const [postsPage, setPostsPage] = useState(1);
  const [commentsPage, setCommentsPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const ITEMS_PER_PAGE = 10;

  // Mock data functions
  const generateMockPosts = (page: number): TPaged<TMyPost> => {
    const mockPosts: TMyPost[] = Array.from({ length: Math.min(ITEMS_PER_PAGE, Math.max(0, 25 - (page - 1) * ITEMS_PER_PAGE)) }, (_, i) => ({
      id: `post_${(page - 1) * ITEMS_PER_PAGE + i + 1}`,
      title: `Амьтны эрүүл мэндийн талаар мэдэх зүйлс ${(page - 1) * ITEMS_PER_PAGE + i + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      likeCount: Math.floor(Math.random() * 50),
      commentCount: Math.floor(Math.random() * 20)
    }));

    return {
      items: mockPosts,
      totalCount: 25
    };
  };

  const generateMockComments = (page: number): TPaged<TMyComment> => {
    const mockComments: TMyComment[] = Array.from({ length: Math.min(ITEMS_PER_PAGE, Math.max(0, 18 - (page - 1) * ITEMS_PER_PAGE)) }, (_, i) => ({
      id: `comment_${(page - 1) * ITEMS_PER_PAGE + i + 1}`,
      content: `Энэ нь маш сонирхолтой нийтлэл байна. Би энэ талаар илүү ихийг мэдэхийг хүсч байна. Маш их баярлалаа хуваалцсанд ${(page - 1) * ITEMS_PER_PAGE + i + 1}.`,
      postId: `post_${Math.floor(Math.random() * 10) + 1}`,
      postTitle: `Амьтны эрүүл мэндийн талаар мэдэх зүйлс ${Math.floor(Math.random() * 10) + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));

    return {
      items: mockComments,
      totalCount: 18
    };
  };

  const loadPosts = async (page: number) => {
    setIsLoading(true);
    // Mock API call: GET /api/me/posts?page=${page}&limit=${ITEMS_PER_PAGE}
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = generateMockPosts(page);
    setPosts(data);
    setIsLoading(false);
  };

  const loadComments = async (page: number) => {
    setIsLoading(true);
    // Mock API call: GET /api/me/comments?page=${page}&limit=${ITEMS_PER_PAGE}
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = generateMockComments(page);
    setComments(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'posts') {
      loadPosts(postsPage);
    } else {
      loadComments(commentsPage);
    }
  }, [activeTab, postsPage, commentsPage]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderPagination = (currentPage: number, totalCount: number, onPageChange: (page: number) => void) => {
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-700">
          Нийт <span className="font-medium">{totalCount}</span> үр дүн
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="md"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm"
          >
            Өмнөх
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                pageNum === currentPage
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
          
          <Button
            variant="ghost"
            size="md"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm"
          >
            Дараах
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Миний оруулсан контент</h3>
        
        {/* Sub-tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Контентийн төрөл">
            <button
              onClick={() => {
                setActiveTab('posts');
                setPostsPage(1);
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'posts'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Миний нийтлэлүүд
            </button>
            <button
              onClick={() => {
                setActiveTab('comments');
                setCommentsPage(1);
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'comments'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Миний сэтгэгдлүүд
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {isLoading ? (
          // Skeleton loader
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-50 rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {activeTab === 'posts' && (
              <div>
                {posts && posts.items.length > 0 ? (
                  <div className="space-y-4">
                    {posts.items.map((post) => (
                      <div
                        key={post.id}
                        className="bg-slate-50/80 rounded-lg p-4 hover:bg-slate-100/80 transition-colors group border border-slate-200/60"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Link
                              href={`/blog/${post.id}`}
                              className="text-lg font-medium text-slate-900 hover:text-emerald-700 group-hover:text-emerald-700 transition-colors line-clamp-2"
                            >
                              {post.title}
                            </Link>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                              <time dateTime={post.createdAt}>
                                {formatDate(post.createdAt)}
                              </time>
                              {post.likeCount !== undefined && (
                                <span className="flex items-center">
                                  ❤️ {post.likeCount}
                                </span>
                              )}
                              {post.commentCount !== undefined && (
                                <span className="flex items-center">
                                  💬 {post.commentCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {renderPagination(postsPage, posts.totalCount, setPostsPage)}
                  </div>
                ) : (
                  // Empty state for posts
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      📝
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Танд нийтлэл байхгүй байна
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Амьтдын тухай өөрийн туршлага, зөвлөгөөгөө хуваалцаарай!
                    </p>
                    <Link href="/blog/create">
                      <Button variant="primary" size="md">
                        Эхний нийтлэлээ бичих
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'comments' && (
              <div>
                {comments && comments.items.length > 0 ? (
                  <div className="space-y-4">
                    {comments.items.map((comment) => (
                      <div
                        key={comment.id}
                        className="bg-slate-50/80 rounded-lg p-4 hover:bg-slate-100/80 transition-colors border border-slate-200/60"
                      >
                        <div className="space-y-2">
                          <p className="text-gray-900 line-clamp-3">
                            {comment.content}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div>
                              <span>Сэтгэгдэл бичсэн: </span>
                              <Link
                                href={`/blog/${comment.postId}`}
                                className="text-emerald-700 hover:underline font-medium"
                              >
                                {comment.postTitle}
                              </Link>
                            </div>
                            <time dateTime={comment.createdAt}>
                              {formatDate(comment.createdAt)}
                            </time>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {renderPagination(commentsPage, comments.totalCount, setCommentsPage)}
                  </div>
                ) : (
                  // Empty state for comments
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      💬
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      Танд сэтгэгдэл байхгүй байна
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Бусдын нийтлэлд санал бодлоо хуваалцаж эхлээрэй!
                    </p>
                    <Link href="/blog">
                      <Button variant="primary" size="md">
                        Блог хэсэг үзэх
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
