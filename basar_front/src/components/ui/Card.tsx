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
        'bg-white rounded-xl shadow-sm border border-slate-200/60 backdrop-blur-sm',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50',
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
    <div className={cn('relative w-full aspect-video overflow-hidden rounded-t-xl', className)}>
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
