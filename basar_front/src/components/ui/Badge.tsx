import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'news' | 'blog' | 'photo' | 'verified' | 'default' | 'outline';
  className?: string;
  title?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className, title }) => {
  const variants = {
    title: 'bg-orange-100 text-orange-800',
    news: 'bg-orange-100 text-orange-800',
    blog: 'bg-blue-100 text-blue-800',
    photo: 'bg-purple-100 text-purple-800',
    verified: 'bg-green-100 text-green-800',
    default: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-600 bg-white hover:bg-gray-50'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      title={title}
    >
      {variant === 'verified' && <Check size={12} />}
      {children}
    </span>
  );
};

export { Badge };
export default Badge;
