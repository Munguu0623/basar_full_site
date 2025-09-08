// Classifieds зарын дэлгэрэнгүй хуудасны loading skeleton компонент
export default function DetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Back navigation skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-16" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Gallery and Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery skeleton */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Main image */}
            <div className="aspect-video bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
              {/* Navigation arrows */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full" />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full" />
              
              {/* Zoom button */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-gray-200 rounded-full" />
              
              {/* Photo counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-gray-200 rounded-full w-16 h-6" />
            </div>

            {/* Thumbnail strip */}
            <div className="p-4 bg-gray-50">
              <div className="flex gap-2">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
                ))}
              </div>
            </div>
          </div>

          {/* Info skeleton */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {/* Header with category and actions */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 bg-gray-200 rounded-full w-24" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-200 rounded w-8" />
                <div className="h-8 bg-gray-200 rounded w-8" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3 mb-4">
              <div className="h-8 bg-gray-200 rounded w-full" />
              <div className="h-8 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Price (optional) */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded" />
                <div>
                  <div className="h-4 bg-gray-200 rounded w-12 mb-2" />
                  <div className="h-6 bg-gray-200 rounded w-20" />
                </div>
              </div>
            </div>

            {/* Animal details */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded w-32 mb-3" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-16 mx-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded w-40 mb-3" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <div className="h-6 bg-gray-200 rounded w-20 mb-3" />
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="h-5 bg-gray-200 rounded w-24 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded-lg w-24" />
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Contact */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                    <div className="h-5 bg-gray-200 rounded w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-gray-200 rounded-lg" />
                  <div className="h-10 bg-gray-200 rounded-lg" />
                </div>
              </div>

              {/* Email */}
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-gray-200 rounded-lg" />
                  <div className="h-10 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Share button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>

            {/* Safety note */}
            <div className="mt-4 p-3 bg-amber-50 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded mt-0.5" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related classifieds skeleton */}
      <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-4">
              <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="h-12 bg-gray-200 rounded-xl w-48 mx-auto" />
        </div>
      </div>
    </div>
  );
}
