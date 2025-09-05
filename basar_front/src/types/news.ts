// Мэдээний типүүд NEWS-1 story-д зориулж
export type TNewsListItem = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  category: 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER';
  publishedAt: string; // ISO
};

export type TNewsListResponse = {
  items: TNewsListItem[];
  totalCount: number;
};

// Pagination параметрүүд
export type TNewsListParams = {
  page?: number;
  pageSize?: number;
  category?: TNewsListItem['category'];
  tag?: string;
};

// Мэдээний дэлгэрэнгүй
export type TNewsDetail = {
  id: string;
  title: string;
  content: string; // HTML content
  excerpt: string;
  imageUrl?: string | null;
  category: 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER';
  publishedAt: string; // ISO
  updatedAt?: string; // ISO
  tags?: string[];
  author?: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  relatedArticles?: TNewsListItem[];
};
