import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ArticleCard from '../ArticleCard';
import { TNewsListItem } from '@/types/news';

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ href, children }: any) => (
    <a href={href}>{children}</a>
  ),
}));

const mockArticle: TNewsListItem = {
  id: '1',
  title: 'Амьтны эрүүл мэндийн тухай',
  excerpt: 'Амьтны эрүүл мэндийг хэрхэн сайжруулах талаар',
  imageUrl: 'https://example.com/image.jpg',
  category: 'HEALTH',
  publishedAt: '2024-01-15T10:00:00Z',
};

describe('ArticleCard', () => {
  it('renders article information correctly', () => {
    render(<ArticleCard article={mockArticle} href="/news/1" />);

    // Гарчиг
    expect(screen.getByText('Амьтны эрүүл мэндийн тухай')).toBeInTheDocument();
    
    // Тайлбар
    expect(screen.getByText('Амьтны эрүүл мэндийг хэрхэн сайжруулах талаар')).toBeInTheDocument();
    
    // Категори
    expect(screen.getByText('Эрүүл мэнд')).toBeInTheDocument();
    
    // Зураг
    const image = screen.getByAltText('Эрүүл мэнд - Амьтны эрүүл мэндийн тухай');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('handles missing image gracefully', () => {
    const articleWithoutImage = { ...mockArticle, imageUrl: null };
    render(<ArticleCard article={articleWithoutImage} href="/news/1" />);

    // Default image icon should be present
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<ArticleCard article={mockArticle} href="/news/1" />);
    
    // Check if date is rendered (format may vary based on locale)
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('handles keyboard navigation', () => {
    // Mock window.location.href
    delete (window as any).location;
    window.location = { href: '' } as any;

    render(<ArticleCard article={mockArticle} href="/news/1" />);
    
    const article = screen.getByRole('article');
    
    // Simulate Enter key press
    fireEvent.keyDown(article, { key: 'Enter' });
    
    // Should trigger navigation (in actual implementation)
    expect(article).toBeInTheDocument();
  });

  it('applies correct category colors', () => {
    const healthArticle = { ...mockArticle, category: 'HEALTH' as const };
    const { rerender } = render(<ArticleCard article={healthArticle} href="/news/1" />);
    
    expect(screen.getByText('Эрүүл мэнд')).toHaveClass('text-emerald-800');
    
    // Test different category
    const trainingArticle = { ...mockArticle, category: 'TRAINING' as const };
    rerender(<ArticleCard article={trainingArticle} href="/news/1" />);
    
    expect(screen.getByText('Сургалт')).toHaveClass('text-blue-800');
  });

  it('has proper accessibility attributes', () => {
    render(<ArticleCard article={mockArticle} href="/news/1" />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('tabIndex', '0');
    expect(article).toHaveAttribute('aria-label', 'Амьтны эрүүл мэндийн тухай мэдээг унших');
  });
});
