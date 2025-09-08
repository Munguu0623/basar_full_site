// BASAR нүүр хуудасны типүүд

export type TArticle = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  category: "NEWS" | "BLOG" | "PHOTO";
  publishedAt: string; // ISO
  tags?: string[];
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  likeCount?: number;
  commentCount?: number;
};

export type TOrganization = {
  id: string;
  name: string;
  logo?: string;
  verified: boolean;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  coverImage?: string;
  services?: string[];
  hours?: string;
  type?: 'VETERINARY' | 'SHELTER' | 'RESCUE' | 'TRAINING' | 'OTHER';
  city?: string;
  slug?: string;
};

export type TCommunityStats = {
  userCount: number;
  blogCount: number;
  orgCount: number;
};

export type TValueProp = {
  icon: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
};

export type TTestimonial = {
  id: string;
  name: string;
  avatar?: string;
  content: string;
  role?: string;
};

// Блог нийтлэлийн типүүд (BLOG-1)
export type TBlogCreateRequest = {
  title: string;
  content: string;
  imageUrl?: string | null;
  category?: 'LIFESTYLE' | 'TIPS' | 'STORIES' | 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER';
  tags?: string[];
};

export type TBlogResponse = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  category: 'LIFESTYLE' | 'TIPS' | 'STORIES' | 'HEALTH' | 'TRAINING' | 'ADOPTION' | 'OTHER';
  author: { id: string; name: string };
  createdAt: string;
  tags?: string[];
  excerpt?: string;
};

// USER-2 Profile types
export type TProfile = {
  id: string;
  email: string;
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
};

export type TProfilePatch = {
  displayName?: string;
  bio?: string;
  avatarUrl?: string | null;
};

// USER-3 Contributions types
export type TMyPost = {
  id: string;
  title: string;
  createdAt: string;
  likeCount?: number;
  commentCount?: number;
};

export type TMyComment = {
  id: string;
  content: string;
  postId: string;
  postTitle: string;
  createdAt: string;
};

export type TPaged<T> = {
  items: T[];
  totalCount: number;
};

// Classifieds модулийн типүүд (CLASSIFIEDS-1)
export type TClassified = {
  id: string;
  category: 'LOST' | 'FOUND' | 'ADOPTION' | 'MARKETPLACE' | 'SERVICE';
  animalType: 'DOG' | 'CAT' | 'OTHER';
  breed?: string | null;
  sex?: 'M' | 'F' | null;
  age?: 'BABY' | 'YOUNG' | 'ADULT' | null;
  size?: 'S' | 'M' | 'L' | null;
  title: string;
  description: string;
  photos: string[]; // URLs
  locationCity: string;
  locationDistrict?: string | null;
  price?: number | null; // Marketplace only
  contactPhone: string;
  contactEmail?: string | null;
  status: 'ACTIVE' | 'CLOSED';
  createdAt: string; // ISO
};

export type TClassifiedCreateRequest = Omit<TClassified, 'id' | 'createdAt' | 'status'>;

export type TClassifiedFilters = {
  category?: TClassified['category'];
  animalType?: TClassified['animalType'];
  city?: string;
  q?: string;
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc';
  page?: number;
  pageSize?: number;
};