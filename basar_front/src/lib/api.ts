// API клиент функцүүд
import { TArticle, TOrganization, TCommunityStats } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Generic fetch wrapper
async function apiClient<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
