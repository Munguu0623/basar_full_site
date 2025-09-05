import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getNewsDetail } from '@/lib/api';
import ArticleCard from '@/components/news/ArticleCard';

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

// Category labels
const categoryLabels = {
  HEALTH: 'Эрүүл мэнд',
  TRAINING: 'Сургалт', 
  ADOPTION: 'Үрчлэлт',
  OTHER: 'Бусад',
} as const;

// Category colors
const categoryColors = {
  HEALTH: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  TRAINING: 'bg-blue-100 text-blue-800 border-blue-200',
  ADOPTION: 'bg-orange-100 text-orange-800 border-orange-200',
  OTHER: 'bg-gray-100 text-gray-800 border-gray-200',
} as const;

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  try {
    const article = await getNewsDetail(params.id);
    
    return {
      title: `${article.title} - BASAR`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        type: 'article',
        publishedTime: article.publishedAt,
        modifiedTime: article.updatedAt,
        images: article.imageUrl ? [article.imageUrl] : undefined,
        authors: article.author ? [article.author.name] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: article.imageUrl ? [article.imageUrl] : undefined,
      },
    };
  } catch {
    return {
      title: 'Мэдээ олдсонгүй - BASAR',
    };
  }
}

async function NewsDetailContent({ params }: NewsDetailPageProps) {
  try {
    const article = await getNewsDetail(params.id);

    const formatDate = (dateString: string) => {
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('mn-MN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      } catch {
        return dateString;
      }
    };

    return (
      <>
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">
                Нүүр
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link href="/news" className="hover:text-gray-700">
                Мэдээ
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Article */}
        <article className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8">
            {/* Meta info */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[article.category]}`}
              >
                {categoryLabels[article.category]}
              </span>
              <time
                dateTime={article.publishedAt}
                className="text-sm text-gray-500"
              >
                {formatDate(article.publishedAt)}
              </time>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Author */}
            {article.author && (
              <div className="flex items-center mb-6">
                {article.author.avatar && (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">
                    {article.author.name}
                  </p>
                  {article.author.bio && (
                    <p className="text-sm text-gray-500">
                      {article.author.bio}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
              {article.viewCount && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {article.viewCount.toLocaleString()} үзэлт
                </span>
              )}
              {article.likeCount && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {article.likeCount.toLocaleString()} таалагдсан
                </span>
              )}
              {article.commentCount && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {article.commentCount.toLocaleString()} сэтгэгдэл
                </span>
              )}
            </div>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="aspect-video relative bg-gray-100">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">
            <div 
              className="prose prose-lg max-w-none prose-blue prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Таг:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Холбоотой мэдээ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {article.relatedArticles.slice(0, 3).map((relatedArticle) => (
                <ArticleCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  href={`/news/${relatedArticle.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6 xl:px-0 py-8">
        <NewsDetailContent params={params} />
      </div>
    </div>
  );
}
