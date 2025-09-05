'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/outline';

type Comment = {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Reply[];
};

type Reply = {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
};

type CommentSectionProps = {
  comments: Comment[];
  showComments: boolean;
  onToggleComments: () => void;
  onCommentLike: (commentId: string) => void;
  onReplySubmit: (commentId: string, replyText: string) => Promise<void>;
};

export default function CommentSection({
  comments,
  showComments,
  onToggleComments,
  onCommentLike,
  onReplySubmit
}: CommentSectionProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Format relative time
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Яг одоо';
    if (diffInMinutes < 60) return `${diffInMinutes} минутын өмнө`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} цагийн өмнө`;
    return `${Math.floor(diffInMinutes / 1440)} өдрийн өмнө`;
  };

  // Handle reply submission
  const handleSubmitReply = async (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmittingReply(true);
    try {
      await onReplySubmit(commentId, replyText);
      setReplyText('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Reply submission failed:', error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  if (!showComments || comments.length === 0) return null;

  return (
    <div className="mb-8 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
          </svg>
          Сэтгэгдэлүүд ({comments.length})
        </h3>
        <button 
          onClick={onToggleComments}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Хаах
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
            {/* Comment Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {comment.author.avatar ? (
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{comment.author.name}</p>
                  <p className="text-sm text-gray-500">{formatRelativeTime(comment.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Comment Content */}
            <p className="text-gray-700 mb-4 leading-relaxed">{comment.content}</p>

            {/* Comment Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onCommentLike(comment.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                           ${comment.isLiked
                             ? 'bg-red-50 text-red-600'
                             : 'text-gray-500 hover:bg-gray-100 hover:text-red-500'
                           }`}
              >
                <svg className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">{comment.likes}</span>
              </button>

              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                           ${replyingTo === comment.id
                             ? 'bg-blue-50 text-blue-600'
                             : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                           }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span className="text-sm font-medium">Хариулах</span>
              </button>
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="space-y-3">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`${comment.author.name}-д хариулах...`}
                    className="w-full min-h-[80px] p-3 border border-gray-200 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             resize-none placeholder-gray-500 text-sm"
                    required
                  />
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${replyText.length > 300 ? 'text-red-500' : 'text-gray-500'}`}>
                      {replyText.length}/300
                    </span>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText('');
                        }}
                        className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Цуцлах
                      </button>
                      <button
                        type="submit"
                        disabled={!replyText.trim() || isSubmittingReply || replyText.length > 300}
                        className={`px-4 py-1.5 text-sm rounded-lg font-medium transition-all duration-200
                                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                   ${!replyText.trim() || isSubmittingReply || replyText.length > 300
                                     ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                     : 'bg-blue-600 text-white hover:bg-blue-700'
                                   }`}
                      >
                        {isSubmittingReply ? 'Илгээж байна...' : 'Хариулах'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-6 pl-4 border-l-2 border-gray-200 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      {reply.author.avatar ? (
                        <Image
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          width={32}
                          height={32}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <UserIcon className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-gray-900 text-sm">{reply.author.name}</p>
                          <p className="text-xs text-gray-500">{formatRelativeTime(reply.createdAt)}</p>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{reply.content}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-11">
                      <button
                        onClick={() => onCommentLike(reply.id)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-all duration-200
                                   ${reply.isLiked
                                     ? 'bg-red-100 text-red-600'
                                     : 'text-gray-500 hover:bg-red-50 hover:text-red-500'
                                   }`}
                      >
                        <svg className="w-3 h-3" fill={reply.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{reply.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
