import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm border border-gray-100',
        hover && 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({ src, alt, className }) => {
  return (
    <div className={cn('relative w-full aspect-video overflow-hidden rounded-t-2xl', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        loading="lazy"
      />
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
};
