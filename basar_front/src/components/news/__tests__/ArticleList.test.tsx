import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter, useSearchParams } from 'next/navigation';
import ArticleList from '../ArticleList';
import { getNewsList } from '@/lib/api';
import { TNewsListResponse } from '@/types/news';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock API function
vi.mock('@/lib/api', () => ({
  getNewsList: vi.fn(),
}));

// Mock child components
vi.mock('../ArticleCard', () => ({
  default: ({ article }: any) => (
    <div data-testid="article-card">{article.title}</div>
  ),
}));

vi.mock('../../common/Pagination', () => ({
  default: ({ page, total }: any) => (
    <div data-testid="pagination">Page {page} of {Math.ceil(total / 10)}</div>
  ),
}));

vi.mock('../../skeletons/SkeletonList', () => ({
  default: () => <div data-testid="skeleton-list">Loading...</div>,
}));

vi.mock('../../empty/EmptyState', () => ({
  default: () => <div data-testid="empty-state">No articles found</div>,
}));

const mockRouter = {
  push: vi.fn(),
};

const mockSearchParams = {
  get: vi.fn(),
};

const mockArticles: TNewsListResponse = {
  items: [
    {
      id: '1',
      title: 'Test Article 1',
      excerpt: 'Test excerpt 1',
      category: 'HEALTH',
      publishedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      title: 'Test Article 2',
      excerpt: 'Test excerpt 2',
      category: 'TRAINING',
      publishedAt: '2024-01-14T10:00:00Z',
    },
  ],
  totalCount: 25,
};

describe('ArticleList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
    (useSearchParams as any).mockReturnValue(mockSearchParams);
    mockSearchParams.get.mockReturnValue('1');
  });

  it('renders initial data correctly', () => {
    render(<ArticleList initialData={mockArticles} />);

    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('shows loading state when fetching data', async () => {
    (getNewsList as any).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockArticles), 100))
    );

    render(<ArticleList />);

    expect(screen.getByTestId('skeleton-list')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    });
  });

  it('shows empty state when no articles', async () => {
    (getNewsList as any).mockResolvedValue({
      items: [],
      totalCount: 0,
    });

    render(<ArticleList />);

    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
    });
  });

  it('shows error state and retry functionality', async () => {
    (getNewsList as any).mockRejectedValue(new Error('API Error'));

    render(<ArticleList />);

    await waitFor(() => {
      expect(screen.getByText('Мэдээний жагсаалт ачаалахад алдаа гарлаа')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Дахин оролдох' })).toBeInTheDocument();
    });
  });

  it('fetches data with correct parameters', async () => {
    (getNewsList as any).mockResolvedValue(mockArticles);

    render(
      <ArticleList 
        categoryFilter="HEALTH" 
        tagFilter="test-tag" 
      />
    );

    await waitFor(() => {
      expect(getNewsList).toHaveBeenCalledWith({
        page: 1,
        pageSize: 10,
        category: 'HEALTH',
        tag: 'test-tag',
      });
    });
  });

  it('handles page changes correctly', async () => {
    mockSearchParams.get.mockReturnValue('2');
    (getNewsList as any).mockResolvedValue(mockArticles);

    render(<ArticleList />);

    await waitFor(() => {
      expect(getNewsList).toHaveBeenCalledWith({
        page: 2,
        pageSize: 10,
        category: undefined,
        tag: undefined,
      });
    });
  });
});
