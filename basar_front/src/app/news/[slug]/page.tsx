import { Metadata } from 'next';
// import { notFound } from 'next/navigation'; // future use
import { Suspense } from 'react';

import { api } from '@/lib/api';
import { TNewsDetail } from '@/types/news';
import { createExcerpt } from '@/lib/sanitize';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import ArticleDetail from '@/components/news/ArticleDetail';
import RelatedArticles from '@/components/news/RelatedArticles';
import SkeletonArticle from '@/components/skeletons/SkeletonArticle';
import ErrorState from '@/components/empty/ErrorState';

type Props = {
  params: Promise<{ slug: string }>;
};

// SEO Metadata үүсгэх
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await api<TNewsDetail>(`/news/${slug}`);
    
    // Excerpt эсвэл content-оос хураангуй үүсгэх
    const description = article.excerpt || createExcerpt(article.content, 160);
    
    return {
      title: `${article.title} | BASAR`,
      description,
      openGraph: {
        title: article.title,
        description,
        type: 'article',
        publishedTime: article.publishedAt,
        ...(article.updatedAt && { modifiedTime: article.updatedAt }),
        authors: article.author?.name ? [article.author.name] : undefined,
        images: article.imageUrl ? [
          {
            url: article.imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          }
        ] : undefined,
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description,
        images: article.imageUrl ? [article.imageUrl] : undefined,
      },
      alternates: {
        canonical: `/news/${article.slug}`,
      },
    };
  } catch (error) {
          console.error('Metadata fetch error:', error);
      return {
        title: 'Мэдээ олдсонгүй | BASAR',
        description: 'Таны хайж буй мэдээ олдсонгүй.',
      };
  }
}

// Server Component - мэдээний дэлгэрэнгүй ачаалах
async function NewsDetailContent({ slug }: { slug: string }) {
  try {
    const article = await api<TNewsDetail>(`/news/${slug}`);
    
    // Breadcrumbs үүсгэх
    const breadcrumbItems = [
      { label: 'Нүүр', href: '/' },
      { label: 'Мэдээ', href: '/news' },
      { label: article.title }
    ];

    return (
      <>
        {/* Breadcrumbs */}
        <div className="max-w-3xl mx-auto px-4 pt-6">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Article Detail */}
        <ArticleDetail article={article} />

        {/* Related Articles */}
        <RelatedArticles 
          currentArticleId={article.id}
          tags={article.tags}
        />
      </>
    );
  } catch (err) {
    console.error('News detail fetch error:', err);
    
    // 404 эсвэл бусад алдаа
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorState 
          title="Мэдээ олдсонгүй"
          message="Таны хайж буй мэдээ олдсонгүй. Линк буруу эсвэл мэдээ устгагдсан байж магадгүй."
          showHomeButton={true}
        />
      </div>
    );
  }
}

// Main Page Component
export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<SkeletonArticle />}>
        <NewsDetailContent slug={slug} />
      </Suspense>
    </main>
  );
}

// Static Generation хэрэгтэй бол (optional)
export async function generateStaticParams() {
  // Статик generation хийх бол энд slug-уудыг буцаах
  // Одоохондоо mock data ашиглаж байгаа тул хоосон array буцаана
  return [];
}

// Revalidation (optional)
export const revalidate = 3600; // 1 цаг
