// Classifieds зарын жагсаалтын loading skeleton компонент
interface CardGridSkeletonProps {
  count?: number;
}

function ClassifiedCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      {/* Зургийн skeleton - video харьцаа with gradient */}
      <div className="aspect-video relative bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3">
          <div className="h-6 bg-gray-200 rounded-full w-24" />
        </div>
        
        {/* Price badge skeleton (random) */}
        <div className="absolute top-3 right-3">
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        
        {/* Photo count skeleton */}
        <div className="absolute bottom-3 right-3">
          <div className="h-5 bg-gray-200 rounded-full w-8" />
        </div>
      </div>
      
      {/* Контентын skeleton */}
      <div className="p-5">
        {/* Animal type and date */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
        
        {/* Гарчиг - 2 мөр */}
        <div className="space-y-2 mb-3">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-4/5" />
        </div>
        
        {/* Тайлбар - 2 мөр */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Animal details badges */}
        <div className="flex gap-1 mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-12" />
          <div className="h-5 bg-gray-200 rounded-full w-16" />
          <div className="h-5 bg-gray-200 rounded-full w-14" />
        </div>
        
        {/* Location and contact */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        </div>
        
        {/* Action button skeleton */}
        <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 w-4 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardGridSkeleton({ count = 6 }: CardGridSkeletonProps) {
  return (
    <div className="mb-8">
      {/* Results count skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="hidden md:block">
          <div className="h-12 bg-gray-200 rounded-xl w-32 animate-pulse" />
        </div>
      </div>

      {/* Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        aria-label="Зар ачааллаж байна"
      >
        {Array.from({ length: count }, (_, index) => (
          <ClassifiedCardSkeleton key={`classified-skeleton-${index}`} />
        ))}
      </div>
    </div>
  );
}
