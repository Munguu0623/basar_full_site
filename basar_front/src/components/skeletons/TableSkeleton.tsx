import React from 'react';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ 
  rows = 10, 
  columns = 5 
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header skeleton */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="flex items-center h-12 px-6 gap-6">
          {Array.from({ length: columns }, (_, i) => (
            <div key={i} className="h-4 bg-slate-200 rounded animate-shimmer flex-1"></div>
          ))}
        </div>
      </div>
      
      {/* Rows skeleton */}
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center h-16 px-6 gap-6">
            {Array.from({ length: columns }, (_, j) => (
              <div key={j} className="h-4 bg-slate-200 rounded animate-shimmer flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
