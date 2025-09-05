type ArticleStatsProps = {
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
};

export default function ArticleStats({ viewCount, likeCount, commentCount }: ArticleStatsProps) {
  if (!viewCount && !likeCount && !commentCount) return null;

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Статистик
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {viewCount && (
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-bold text-gray-900">{viewCount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">үзэлт</p>
            </div>
          </div>
        )}
        
        {likeCount && (
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-bold text-gray-900">{likeCount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">таалагдсан</p>
            </div>
          </div>
        )}
        
        {commentCount && (
          <div className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xl font-bold text-gray-900">{commentCount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">сэтгэгдэл</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
