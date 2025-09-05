import Link from 'next/link';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline';

type ErrorStateProps = {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRetry?: boolean;
  onRetry?: () => void;
  className?: string;
};

export default function ErrorState({
  title = "Мэдээ олдсонгүй",
  message = "Таны хайж буй мэдээ олдсонгүй. Линк буруу эсвэл мэдээ устгагдсан байж магадгүй.",
  showHomeButton = true,
  showRetry = false,
  onRetry,
  className = ""
}: ErrorStateProps) {
  return (
    <div className={`max-w-md mx-auto text-center py-12 px-4 ${className}`}>
      {/* Error icon */}
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
        <ExclamationTriangleIcon className="h-8 w-8 text-red-600" aria-hidden="true" />
      </div>

      {/* Error title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h1>

      {/* Error message */}
      <p className="text-gray-600 mb-8 leading-relaxed">
        {message}
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {showHomeButton && (
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent 
                     text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     transition-colors duration-200"
          >
            <HomeIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Нүүр хуудас
          </Link>
        )}

        <Link
          href="/news"
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 
                   text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                   transition-colors duration-200"
        >
          Бүх мэдээ рүү
        </Link>

        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 
                     text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                     transition-colors duration-200"
          >
            Дахин оролдох
          </button>
        )}
      </div>

      {/* Additional help text */}
      <p className="text-sm text-gray-500 mt-6">
        Хэрэв асуудал үргэлжилвэл манайд{' '}
        <a 
          href="mailto:support@basar.mn" 
          className="text-blue-600 hover:text-blue-500 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          мэдэгдээрэй
        </a>
        .
      </p>
    </div>
  );
}
