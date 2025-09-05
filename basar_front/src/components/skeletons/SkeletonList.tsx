// Loading skeleton компонент
interface SkeletonListProps {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      {/* Зургийн skeleton - 16:9 харьцаа with gradient */}
      <div className="aspect-video relative bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
        {/* Category badge skeleton */}
        <div className="absolute top-4 left-4">
          <div className="h-6 bg-gray-200 rounded-full w-20" />
        </div>
        
        {/* Type indicator skeleton */}
        <div className="absolute top-4 right-4">
          <div className="h-5 bg-gray-200 rounded-full w-12" />
        </div>
        
        {/* Animated paw print */}
        <div className="absolute top-2 right-2">
          <div className="h-6 w-6 bg-gray-200 rounded-full opacity-30" />
        </div>
      </div>
      
      {/* Контентын skeleton */}
      <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
        {/* Tags skeleton (блогт) */}
        <div className="flex gap-1 mb-3">
          <div className="h-4 bg-gray-200 rounded-full w-12" />
          <div className="h-4 bg-gray-200 rounded-full w-16" />
          <div className="h-4 bg-gray-200 rounded-full w-14" />
        </div>
        
        {/* Огноо ба read time */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded-full w-28 px-3 py-1" />
          <div className="h-4 bg-gray-200 rounded-full w-16 px-3 py-1" />
        </div>
        
        {/* Гарчиг - 2 мөр */}
        <div className="space-y-3 mb-4">
          <div className="h-6 bg-gray-200 rounded w-full" />
          <div className="h-6 bg-gray-200 rounded w-4/5" />
        </div>
        
        {/* Тайлбар - 3 мөр */}
        <div className="space-y-2 mb-5">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
        
        {/* Author info skeleton */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
        
        {/* Read more button skeleton */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkeletonList({ count = 10 }: SkeletonListProps) {
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="Мэдээ ачааллаж байна"
    >
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
