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
