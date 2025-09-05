export default function SkeletonArticle() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Title skeleton */}
      <div className="space-y-3 mb-6">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Author and date skeleton */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="ml-auto">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Tags skeleton */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-18"></div>
      </div>

      {/* Cover image skeleton */}
      <div className="relative aspect-video bg-gray-200 rounded-2xl mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        {/* Paragraph 1 */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Heading */}
        <div className="h-6 bg-gray-200 rounded w-2/3 mt-6"></div>

        {/* Paragraph 2 */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>

        {/* Paragraph 3 */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Quote block */}
        <div className="bg-gray-100 p-4 rounded-lg my-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
          </div>
        </div>

        {/* Final paragraph */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Share actions skeleton */}
      <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
