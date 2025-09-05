// Loading skeleton компонент
interface SkeletonListProps {
  count?: number;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Зургийн skeleton - 16:9 харьцаа */}
      <div className="aspect-video animate-shimmer relative">
        {/* Category badge skeleton */}
        <div className="absolute top-4 left-4">
          <div className="h-6 animate-shimmer rounded-full w-20" />
        </div>
      </div>
      
      {/* Контентын skeleton */}
      <div className="p-6">
        {/* Огноо ба read time */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 animate-shimmer rounded w-28" />
          <div className="h-4 animate-shimmer rounded w-16" />
        </div>
        
        {/* Гарчиг - 2 мөр */}
        <div className="space-y-3 mb-4">
          <div className="h-6 animate-shimmer rounded w-full" />
          <div className="h-6 animate-shimmer rounded w-4/5" />
        </div>
        
        {/* Тайлбар - 3 мөр */}
        <div className="space-y-2 mb-4">
          <div className="h-4 animate-shimmer rounded w-full" />
          <div className="h-4 animate-shimmer rounded w-full" />
          <div className="h-4 animate-shimmer rounded w-3/4" />
        </div>
        
        {/* Read more button */}
        <div className="flex items-center justify-between">
          <div className="h-4 animate-shimmer rounded w-32" />
          <div className="h-4 w-4 animate-shimmer rounded" />
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
