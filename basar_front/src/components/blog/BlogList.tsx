'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { TBlogResponse } from '@/types';
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

// Mock API function - Бодитоор API дуудах ёстой
async function getBlogList(params: BlogListParams = {}): Promise<BlogListResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock data - бодитоор API-аас авах ёстой
  const allBlogs: TBlogResponse[] = [
    {
      id: 'blog_1',
      title: 'Амьтан хайрлах нь хэрхэн амьдралыг баялагжуулдаг вэ?',
      content: 'Амьтан хайрлах бол хүний амьдралд маш чухал зүйл юм. Амьтад бидний найз нөхөд, гэр бүлийн гишүүд болдог...',
      excerpt: 'Амьтан хайрлах бол хүний амьдралд маш чухал зүйл юм. Тэд бидэнд хайр энэрэл, баяр баясгалан авчирдаг.',
      imageUrl: '/hero_image.png',
      category: 'LIFESTYLE',
      author: { id: 'user_1', name: 'Б.Болд' },
      createdAt: '2025-01-15T10:30:00Z',
      tags: ['амьтан', 'хайр', 'асрамж', 'амьдралын_хэв_маяг'],
    },
    {
      id: 'blog_2', 
      title: 'Нохойн сургалтын үндсэн зарчмууд',
      content: 'Нохойгоо зөв сургах нь маш чухал. Тэвчээртэй байж, тогтмол дасгал хийлгэх хэрэгтэй...',
      excerpt: 'Нохойгоо зөв сургах нь маш чухал. Тэвчээртэй байж, тогтмол дасгал хийлгэх хэрэгтэй.',
      imageUrl: null,
      category: 'TRAINING',
      author: { id: 'user_2', name: 'С.Сарангэрэл' },
      createdAt: '2025-01-14T15:20:00Z',
      tags: ['нохой', 'сургалт', 'дрессура'],
    },
    {
      id: 'blog_3',
      title: 'Муурны эрүүл мэндийн анхны шинж тэмдэг',
      content: 'Муурны эрүүл мэндийн шинж тэмдгүүдийг анхааралтай ажиглах хэрэгтэй. Хэрэв дараах шинж тэмдгүүд илэрвэл...',
      excerpt: 'Муурны эрүүл мэндийн шинж тэмдгүүдийг анхааралтай ажиглах хэрэгтэй. Эрт илрүүлэх нь чухал.',
      imageUrl: '/hero_image.png',
      category: 'HEALTH',
      author: { id: 'user_3', name: 'О.Оюунбилэг' },
      createdAt: '2025-01-13T09:45:00Z',
      tags: ['муур', 'эрүүл_мэнд', 'эмч', 'шинж_тэмдэг'],
    },
    {
      id: 'blog_4',
      title: 'Амьтан үрчлэхэд анхаарах зүйлс',
      content: 'Амьтан үрчлэх нь их хариуцлагатай ажил. Өөрийн хүсэл сонирхол, амьдралын нөхцөлийг сайн бодож үзэх хэрэгтэй...',
      excerpt: 'Амьтан үрчлэх нь их хариуцлагатай ажил. Өөрийн амьдралын нөхцөлийг сайн бодож үзэх хэрэгтэй.',
      imageUrl: null,
      category: 'ADOPTION',
      author: { id: 'user_4', name: 'Д.Дорж' },
      createdAt: '2025-01-12T11:15:00Z',
      tags: ['үрчлэлт', 'хариуцлага', 'сонголт'],
    },
    {
      id: 'blog_5',
      title: 'Миний муурын гайхамшигт түүх',
      content: 'Энэ бол миний хайрт муур Мишээгийн түүх юм. Түүнийг анх олж авснаас хойш бидний амьдрал...',
      excerpt: 'Энэ бол миний хайрт муур Мишээгийн түүх юм. Түүнийг анх олж авснаас хойш бидний амьдрал өөрчлөгдсөн.',
      imageUrl: '/hero_image.png',
      category: 'STORIES',
      author: { id: 'user_5', name: 'Б.Баярмаа' },
      createdAt: '2025-01-11T16:30:00Z',
      tags: ['түүх', 'муур', 'туршлага'],
    },
    {
      id: 'blog_6',
      title: '10 хялбар зөвлөгөө: Гэрийн амьтныг өвлөөр арчлах',
      content: 'Өвлийн улиралд гэрийн тэжээвэр амьтдыг арчлахад анхаарах ёстой зүйлүүдийг энд танилцуулж байна...',
      excerpt: 'Өвлийн улиралд гэрийн тэжээвэр амьтдыг арчлахад анхаарах ёстой 10 чухал зөвлөгөө.',
      imageUrl: null,
      category: 'TIPS',
      author: { id: 'user_6', name: 'Г.Ганбаатар' },
      createdAt: '2025-01-10T08:45:00Z',
      tags: ['зөвлөгөө', 'өвөл', 'арчлага', 'эрүүл_мэнд'],
    },
    {
      id: 'blog_7',
      title: 'Амьтны хоол тэжээлийн гурван алтан дүрэм',
      content: 'Амьтдыг зөв тэжээх нь эрүүл мэндэд маш чухал нөлөө үзүүлдэг. Үүний тулд мэдэх ёстой үндсэн зарчмууд...',
      excerpt: 'Амьтдыг зөв тэжээх нь эрүүл мэндэд маш чухал. Гурван үндсэн зарчимыг мэдэх хэрэгтэй.',
      imageUrl: '/hero_image.png',
      category: 'HEALTH',
      author: { id: 'user_7', name: 'Ц.Цэвээн' },
      createdAt: '2025-01-09T14:20:00Z',
      tags: ['хоол_тэжээл', 'эрүүл_мэнд', 'арчлага'],
    },
    {
      id: 'blog_8',
      title: 'Амьтны парк дахь миний анхны сайн дурын ажил',
      content: 'Энэ бол амьтны парк дахь миний анхны сайн дурын ажлын түүх юм. Тэр өдрөөс хойш миний амьдрал...',
      excerpt: 'Амьтны парк дахь анхны сайн дурын ажил миний амьдралыг бүрэн өөрчилсөн түүх.',
      imageUrl: null,
      category: 'STORIES',
      author: { id: 'user_8', name: 'А.Алтан' },
      createdAt: '2025-01-08T11:10:00Z',
      tags: ['сайн_дурын_ажил', 'туршлага', 'амьтны_парк'],
    },
    {
      id: 'blog_9',
      title: 'Зуны халуунд амьтдыг хэрхэн арчлах вэ?',
      content: 'Зуны халуун цаг агаарт амьтдын эрүүл мэнд, аюулгүй байдлыг хангахад анхаарах ёстой зүйлүүд...',
      excerpt: 'Зуны халуун цаг агаарт амьтдын эрүүл мэнд, аюулгүй байдлыг хангахын тулд тусгай арчлага хийх хэрэгтэй.',
      imageUrl: '/hero_image.png',
      category: 'HEALTH',
      author: { id: 'user_9', name: 'Н.Нарантуяа' },
      createdAt: '2025-01-07T13:25:00Z',
      tags: ['зун', 'халуун', 'эрүүл_мэнд', 'арчлага'],
    },
    {
      id: 'blog_10',
      title: 'Тэжээвэр амьтны гэрэл зургийн 5 зөвлөгөө',
      content: 'Амьтдын гоё зургийг авахын тулд мэдэх ёстой техник, арга барилууд. Тэдгээрийн хөдөлгөөн, зан төрхийг...',
      excerpt: 'Амьтдын гоё зургийг авахын тулд мэдэх ёстой 5 чухал зөвлөгөө.',
      imageUrl: null,
      category: 'TIPS',
      author: { id: 'user_10', name: 'Ө.Өнөрбаяр' },
      createdAt: '2025-01-06T16:40:00Z',
      tags: ['гэрэл_зураг', 'техник', 'зөвлөгөө'],
    },
    {
      id: 'blog_11',
      title: 'Манай гэрийн хамт амьдрагч - Шарын түүх',
      content: 'Энэ бол манай гэрийн хамт амьдрагч нохой Шарын тухай түүх. Түүнийг гэрт авчирснаас хойшхи өөрчлөлтүүд...',
      excerpt: 'Манай гэрийн хамт амьдрагч нохой Шарын тухай дурсамжтай түүх.',
      imageUrl: '/hero_image.png',
      category: 'STORIES',
      author: { id: 'user_11', name: 'Б.Бямбаа' },
      createdAt: '2025-01-05T12:15:00Z',
      tags: ['түүх', 'нохой', 'гэр_бүл'],
    },
    {
      id: 'blog_12',
      title: 'Амьтны хоолны аллерги: Танихуйц шинж тэмдэг',
      content: 'Амьтдын хоолны аллергийн шинж тэмдэг, шалтгаан, эмчилгээний аргуудын тухай дэлгэрэнгүй мэдээлэл...',
      excerpt: 'Амьтдын хоолны аллергийг таних, эмчлэх аргын тухай чухал мэдээлэл.',
      imageUrl: null,
      category: 'HEALTH',
      author: { id: 'user_12', name: 'Д.Дулмаа' },
      createdAt: '2025-01-04T09:30:00Z',
      tags: ['аллерги', 'хоол', 'эрүүл_мэнд', 'эмчилгээ'],
    },
    {
      id: 'blog_13',
      title: 'Амьтны сэтгэл зүйг ойлгох 7 арга',
      content: 'Амьтдын зан байдал, сэтгэл санааны өөрчлөлтийг хэрхэн ойлгож, тэдэнтэй харилцах талаар...',
      excerpt: 'Амьтдын сэтгэл зүй, зан байдлыг ойлгох практик зөвлөгөөнүүд.',
      imageUrl: '/hero_image.png',
      category: 'TIPS',
      author: { id: 'user_13', name: 'Ц.Цагаан' },
      createdAt: '2025-01-03T14:50:00Z',
      tags: ['сэтгэл_зүй', 'зан_байдал', 'харилцаа'],
    },
    {
      id: 'blog_14',
      title: 'Эхний удаа амьтан үрчлэх: Бэлтгэл ажил',
      content: 'Анх удаа амьтан үрчлэхэд хийх ёстой бэлтгэл ажлууд, худалдан авах зүйлс, гэрийн орчинг...',
      excerpt: 'Анх удаа амьтан үрчлэхэд хийх ёстой бэлтгэл ажлын жагсаалт.',
      imageUrl: null,
      category: 'ADOPTION',
      author: { id: 'user_14', name: 'А.Анхбаяр' },
      createdAt: '2025-01-02T11:20:00Z',
      tags: ['үрчлэлт', 'бэлтгэл', 'анхлан_суралцагч'],
    }
  ];

  const { page = 1, pageSize = 6, category, search } = params;

  // Filter by category
  let filteredBlogs = category 
    ? allBlogs.filter(blog => blog.category === category)
    : allBlogs;

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredBlogs = filteredBlogs.filter(blog => 
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt?.toLowerCase().includes(searchLower) ||
      blog.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const blogs = filteredBlogs.slice(startIndex, endIndex);

  return {
    blogs,
    totalCount: filteredBlogs.length,
  };
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
      setTotalCount(response.totalCount);
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
