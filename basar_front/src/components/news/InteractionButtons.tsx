'use client';

import { ShareIcon, LinkIcon } from '@heroicons/react/24/outline';

type InteractionButtonsProps = {
  // Like/Dislike
  isLiked: boolean;
  isDisliked: boolean;
  likeCount: number;
  onLike: () => void;
  onDislike: () => void;
  
  // Comments
  showCommentForm: boolean;
  showComments: boolean;
  commentCount?: number;
  commentsLength: number;
  onToggleCommentForm: () => void;
  onToggleComments: () => void;
  
  // Share
  onShare: () => void;
  onCopyLink: () => void;
};

export default function InteractionButtons({
  isLiked,
  isDisliked,
  likeCount,
  onLike,
  onDislike,
  showCommentForm,
  showComments,
  commentCount,
  commentsLength,
  onToggleCommentForm,
  onToggleComments,
  onShare,
  onCopyLink
}: InteractionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
      {/* Like/Dislike & Comment Buttons */}
      <div className="flex items-center space-x-4">
        {/* Like/Dislike Container */}
        <div className="flex items-center bg-gray-50 rounded-2xl p-1">
          <button
            onClick={onLike}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       ${isLiked 
                         ? 'bg-red-500 text-white shadow-lg' 
                         : 'text-gray-600 hover:bg-white hover:text-red-500 hover:shadow-md'
                       }`}
            aria-label={isLiked ? 'Таалагдахыг цуцлах' : 'Таалагдах'}
          >
            <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">{likeCount}</span>
          </button>
          
          <button
            onClick={onDislike}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                       ${isDisliked 
                         ? 'bg-gray-700 text-white shadow-lg' 
                         : 'text-gray-600 hover:bg-white hover:text-gray-700 hover:shadow-md'
                       }`}
            aria-label={isDisliked ? 'Дургүйг цуцлах' : 'Дургүй'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" transform="rotate(180 12 12)" />
            </svg>
          </button>
        </div>

        {/* Comment Button */}
        <button
          onClick={onToggleCommentForm}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl border-2 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     ${showCommentForm 
                       ? 'border-blue-500 bg-blue-50 text-blue-700' 
                       : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600'
                     }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="font-medium">Сэтгэгдэл</span>
          {commentCount && (
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold">
              {commentCount}
            </span>
          )}
        </button>

        {/* View Comments Button */}
        {commentsLength > 0 && (
          <button
            onClick={onToggleComments}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                       ${showComments 
                         ? 'bg-green-500 text-white shadow-lg' 
                         : 'text-gray-600 hover:bg-green-50 hover:text-green-600'
                       }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="font-medium">
              {showComments ? 'Нуух' : `${commentsLength} үзэх`}
            </span>
          </button>
        )}
      </div>

      {/* Share Actions */}
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">Хуваалцах:</span>
        
        <div className="flex items-center space-x-2">
          {/* Native Share Button */}
          <button
            onClick={onShare}
            aria-label="Нийтлэл хуваалцах"
            className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 
                     rounded-xl transition-colors focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2"
          >
            <ShareIcon className="w-5 h-5" />
          </button>

          {/* Copy Link Button */}
          <button
            onClick={onCopyLink}
            aria-label="Линк хуулах"
            className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                     rounded-xl transition-colors focus:outline-none focus:ring-2 
                     focus:ring-gray-500 focus:ring-offset-2"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
