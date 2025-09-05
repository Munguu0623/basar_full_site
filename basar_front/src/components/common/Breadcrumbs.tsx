import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" aria-hidden="true" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                          rounded px-1 py-0.5"
              >
                {item.label}
              </Link>
            ) : (
              <span 
                className={`${
                  isLast 
                    ? 'text-gray-900 font-medium line-clamp-1' 
                    : 'text-gray-600'
                } px-1 py-0.5`}
                {...(isLast && { 'aria-current': 'page' })}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
