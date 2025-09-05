// API клиент функцүүд
import { TArticle, TOrganization, TCommunityStats, TBlogCreateRequest, TBlogResponse } from '@/types';
import { TNewsListResponse, TNewsListParams, TNewsDetail } from '@/types/news';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
  typeof window === 'undefined' 
    ? `http://localhost:${process.env.PORT || 3000}/api`
    : '/api'
);

// Generic fetch wrapper with optional init parameters
export async function api<T>(
  endpoint: string,
  init?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      ...init,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
}

// Legacy wrapper for compatibility
async function apiClient<T>(endpoint: string): Promise<T> {
  return api<T>(endpoint);
}

// Featured мэдээ авах
export async function getFeaturedNews(): Promise<TArticle[]> {
  return apiClient<TArticle[]>('/news?featured=true&limit=5');
}

// Trending блогууд авах
export async function getTrendingBlogs(): Promise<TArticle[]> {
  return apiClient<TArticle[]>('/blog?sort=trending&limit=6');
}

// Verified байгууллагууд авах
export async function getVerifiedOrganizations(): Promise<TOrganization[]> {
  return apiClient<TOrganization[]>('/organizations?verified=true&limit=12');
}

// Community статистик авах
export async function getCommunityStats(): Promise<TCommunityStats> {
  return apiClient<TCommunityStats>('/stats');
}

// Мэдээний жагсаалт авах (NEWS-1)
export async function getNewsList(params: TNewsListParams = {}): Promise<TNewsListResponse> {
  const { page = 1, pageSize = 10, category, tag } = params;
  
  const searchParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  
  if (category) {
    searchParams.append('category', category);
  }
  
  if (tag) {
    searchParams.append('tag', tag);
  }
  
  return api<TNewsListResponse>(`/news?${searchParams.toString()}`);
}

// Мэдээний дэлгэрэнгүй авах (slug)
export async function getNewsDetail(slug: string): Promise<TNewsDetail> {
  return api<TNewsDetail>(`/news/${slug}`);
}

// Блог нийтлэл үүсгэх (BLOG-1)
export async function createBlog(data: TBlogCreateRequest): Promise<TBlogResponse> {
  return api<TBlogResponse>('/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Блогийн жагсаалт авах
interface BlogListParams {
  page?: number;
  pageSize?: number;
  category?: TBlogResponse['category'];
  search?: string;
}

interface BlogListResponse {
  blogs: TBlogResponse[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export async function getBlogList(params: BlogListParams = {}): Promise<BlogListResponse> {
  const { page = 1, pageSize = 6, category, search } = params;
  
  const searchParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  
  if (category) {
    searchParams.append('category', category);
  }
  
  if (search) {
    searchParams.append('search', search);
  }
  
  return api<BlogListResponse>(`/blog?${searchParams.toString()}`);
}