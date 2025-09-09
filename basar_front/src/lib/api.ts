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

// HTTP Methods for convenient usage
api.get = async <T>(endpoint: string, init?: Omit<RequestInit, 'method'>): Promise<T> => {
  return api<T>(endpoint, { ...init, method: 'GET' });
};

api.post = async <T>(endpoint: string, data?: unknown, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T> => {
  return api<T>(endpoint, {
    ...init,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
};

api.put = async <T>(endpoint: string, data?: unknown, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T> => {
  return api<T>(endpoint, {
    ...init,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
};

api.patch = async <T>(endpoint: string, data?: unknown, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T> => {
  return api<T>(endpoint, {
    ...init,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });
};

api.delete = async <T>(endpoint: string, data?: unknown, init?: Omit<RequestInit, 'method' | 'body'>): Promise<T> => {
  return api<T>(endpoint, {
    ...init,
    method: 'DELETE',
    body: data ? JSON.stringify(data) : undefined,
  });
};

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

// ORG API Functions

// Байгууллагын жагсаалт авах (ORG-1)
interface OrganizationListParams {
  page?: number;
  pageSize?: number;
  type?: string;
  city?: string;
  verified?: boolean;
  search?: string;
}

interface OrganizationListResponse {
  organizations: TOrganization[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  filters: {
    type?: string;
    city?: string;
    verified?: boolean;
    search?: string;
  };
}

export async function getOrganizationList(params: OrganizationListParams = {}): Promise<OrganizationListResponse> {
  const { page = 1, pageSize = 9, type, city, verified, search } = params;
  
  const searchParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  
  if (type) {
    searchParams.append('type', type);
  }
  
  if (city) {
    searchParams.append('city', city);
  }
  
  if (verified !== undefined) {
    searchParams.append('verified', verified.toString());
  }
  
  if (search) {
    searchParams.append('search', search);
  }
  
  return api<OrganizationListResponse>(`/organizations?${searchParams.toString()}`);
}

// Байгууллагын дэлгэрэнгүй авах (ORG-2)
interface OrganizationDetailResponse {
  organization: TOrganization;
  relatedOrganizations: TOrganization[];
  meta: {
    lastUpdated: string;
    verified: boolean;
  };
}

export async function getOrganizationDetail(slug: string): Promise<OrganizationDetailResponse> {
  return api<OrganizationDetailResponse>(`/organizations/${slug}`);
}

// Байгууллага бүртгүүлэх хүсэлт илгээх (ORG-3)
interface OrganizationApplyRequest {
  name: string;
  description?: string;
  type: string;
  city: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  logo?: File | null;
}

interface OrganizationApplyResponse {
  success: boolean;
  message: string;
  applicationId: string;
  status: 'PENDING';
  estimatedReviewTime: string;
  contactEmail: string;
}

export async function applyOrganization(data: OrganizationApplyRequest): Promise<OrganizationApplyResponse> {
  // Form data for file upload
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (key === 'logo' && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value.toString());
      }
    }
  });
  
  return api<OrganizationApplyResponse>('/organizations', {
    method: 'POST',
    body: formData,
    headers: {
      // Remove Content-Type header to let browser set it for FormData
    },
  });
}