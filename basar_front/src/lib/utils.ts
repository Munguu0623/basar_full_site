import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Огноо форматлах
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Тооны форматлах (1000 -> 1K)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
