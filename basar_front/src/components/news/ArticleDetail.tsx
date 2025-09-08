'use client';

import Image from 'next/image';
import { useState } from 'react';
import { TNewsDetail } from '@/types/news';
import { sanitizeHTML } from '@/lib/sanitize';
import { ClockIcon, UserIcon, TagIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/Badge';
import InteractionButtons from './InteractionButtons';
import CommentForm from './CommentForm';
import CommentSection from './CommentSection';
import ArticleStats from './ArticleStats';

type ArticleDetailProps = {
  article: TNewsDetail;
};

export default function ArticleDetail({ article }: ArticleDetailProps) {
  // States
  const [imageError, setImageError] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(article.likeCount || 0);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  // Mock comments data
  const [comments] = useState([
    {
      id: 'c1',
      author: {
        name: 'Б.Болормаа',
        avatar: '/hero_image.png'
      },
      content: 'Маш их хэрэгтэй мэдээлэл байна. Манай нохойд яг энэ асуудал тулгарч байсан.',
      createdAt: '2024-01-15T12:30:00Z',
      likes: 5,
      isLiked: false,
      replies: [
        {
          id: 'r1',
          author: {
            name: 'Д.Энхбаяр',
            avatar: '/hero_image.png'
          },
          content: 'Баярлалаа! Хэрэв нэмэлт асуулт байвал чөлөөтэй асуугаарай.',
          createdAt: '2024-01-15T13:00:00Z',
          likes: 2,
          isLiked: false
        }
      ]
    },
    {
      id: 'c2', 
      author: {
        name: 'М.Ганбат',
        avatar: '/hero_image.png'
      },
      content: 'Өвлийн арчилгааны талаар илүү дэлгэрэнгүй мэдээлэл авч болох уу?',
      createdAt: '2024-01-15T14:15:00Z',
      likes: 3,
      isLiked: true,
      replies: []
    }
  ]);

  // Огноог format хийх
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  // Category-ын өнгө тогтоох
  const getCategoryColor = (category: string) => {
    const colors = {
      HEALTH: 'bg-green-100 text-green-800',
      TRAINING: 'bg-blue-100 text-blue-800', 
      ADOPTION: 'bg-purple-100 text-purple-800',
      OTHER: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.OTHER;
  };

  // URL хуулах функц
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Share API ашиглах (боломжтой бол)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        // User канцел хийсэн эсвэл алдаа гарсан
        console.error('Share failed:', err);
      }
    } else {
      // Fallback - URL хуулах
      copyToClipboard();
    }
  };

  // Like/Dislike функцүүд
  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
      setLikeCount(prev => prev + 1);
    }
    // TODO: API дуудалт нэмэх
  };

  const handleDislike = async () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      if (isLiked) {
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      }
    }
    // TODO: API дуудалт нэмэх
  };


  // Handler functions
  const handleCommentSubmit = async (commentText: string) => {
    // TODO: API дуудалт нэмэх
    await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
    setShowCommentForm(false);
    console.log('Сэтгэгдэл амжилттай илгээгдлээ:', commentText);
  };

  const handleReplySubmit = async (commentId: string, replyText: string) => {
    // TODO: API дуудалт нэмэх
    await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
    console.log(`Reply илгээгдлээ: ${commentId}`, replyText);
  };

  const handleCommentLike = (commentId: string) => {
    // TODO: API дуудалт нэмэх
    console.log(`Comment liked: ${commentId}`);
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Article Header */}
      <header className="mb-8">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author and Meta Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            {/* Author Avatar */}
            {article.author ? (
              <div className="flex items-center space-x-3">
                {article.author.avatarUrl && !imageError ? (
                  <Image
                    src={article.author.avatarUrl}
                    alt={`${article.author.name} зураг`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{article.author.name}</p>
                  {article.author.bio && (
                    <p className="text-sm text-gray-600">{article.author.bio}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Зохиогч тодорхойгүй</p>
                </div>
              </div>
            )}
          </div>

          {/* Date */}
          <div className="flex items-center text-gray-600 text-sm">
            <ClockIcon className="w-4 h-4 mr-2" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>
        </div>

        {/* Tags and Category */}
        {(article.tags?.length || article.category) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {/* Category Badge */}
            <Badge variant="default" className={getCategoryColor(article.category)}>
              {article.category}
            </Badge>

            {/* Tags */}
            {article.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm 
                         bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image */}
      {article.imageUrl && (
        <div className="relative aspect-video mb-8 rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 
                   prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-blue-500
                   prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
                   prose-blockquote:italic prose-code:bg-gray-100 prose-code:px-2 
                   prose-code:py-1 prose-code:rounded"
        dangerouslySetInnerHTML={{ 
          __html: sanitizeHTML(article.content) 
        }}
      />

      {/* Interaction Section */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <InteractionButtons
          isLiked={isLiked}
          isDisliked={isDisliked}
          likeCount={likeCount}
          onLike={handleLike}
          onDislike={handleDislike}
          showCommentForm={showCommentForm}
          showComments={showComments}
          commentCount={article.commentCount}
          commentsLength={comments.length}
          onToggleCommentForm={() => {
            setShowCommentForm(!showCommentForm);
            setShowComments(true);
          }}
          onToggleComments={() => setShowComments(!showComments)}
          onShare={handleNativeShare}
          onCopyLink={copyToClipboard}
        />

        <CommentForm
          showForm={showCommentForm}
          onSubmit={handleCommentSubmit}
          onCancel={() => setShowCommentForm(false)}
        />

        <CommentSection
          comments={comments}
          showComments={showComments}
          onToggleComments={() => setShowComments(!showComments)}
          onCommentLike={handleCommentLike}
          onReplySubmit={handleReplySubmit}
        />

        {/* Success Message */}
        {showShareSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl text-sm border border-green-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Линк амжилттай хуулагдлаа!
            </div>
          </div>
        )}

        <ArticleStats
          viewCount={article.viewCount}
          likeCount={article.likeCount}
          commentCount={article.commentCount}
        />
      </footer>
    </article>
  );
}
