'use client';

import { useState } from 'react';

type CommentFormProps = {
  showForm: boolean;
  onSubmit: (commentText: string) => Promise<void>;
  onCancel: () => void;
};

export default function CommentForm({ showForm, onSubmit, onCancel }: CommentFormProps) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(commentText);
      setCommentText('');
    } catch (error) {
      console.error('Comment submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setCommentText('');
    onCancel();
  };

  if (!showForm) return null;

  return (
    <div className="mb-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Сэтгэгдэл үлдээх
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Та юу бодож байна вэ? Сэтгэгдэлээ бичээрэй..."
            className="w-full min-h-[120px] p-4 border border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     resize-none placeholder-gray-500"
            required
          />
          <div className="mt-2 text-right">
            <span className={`text-xs ${commentText.length > 500 ? 'text-red-500' : 'text-gray-500'}`}>
              {commentText.length}/500
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Цуцлах
          </button>
          
          <button
            type="submit"
            disabled={!commentText.trim() || isSubmitting || commentText.length > 500}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       ${!commentText.trim() || isSubmitting || commentText.length > 500
                         ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                         : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                       }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Илгээж байна...</span>
              </div>
            ) : (
              'Илгээх'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
