import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Pagination from '../Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pagination with correct page numbers', () => {
    render(
      <Pagination
        page={3}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('shows ellipsis for large page counts', () => {
    render(
      <Pagination
        page={5}
        pageSize={10}
        total={200}
        onPageChange={mockOnPageChange}
      />
    );

    const ellipsis = screen.getAllByText('...');
    expect(ellipsis).toHaveLength(2);
  });

  it('handles previous button click', () => {
    render(
      <Pagination
        page={3}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Өмнөх хуудас руу шилжих' });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('handles next button click', () => {
    render(
      <Pagination
        page={3}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: 'Дараах хуудас руу шилжих' });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('handles page number click', () => {
    render(
      <Pagination
        page={3}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByRole('button', { name: '5 дугаар хуудас руу шилжих' });
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        page={1}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Өмнөх хуудас руу шилжих' });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        page={10}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole('button', { name: 'Дараах хуудас руу шилжих' });
    expect(nextButton).toBeDisabled();
  });

  it('shows current page with aria-current', () => {
    render(
      <Pagination
        page={3}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    const currentPageButton = screen.getByRole('button', { name: '3 дугаар хуудас руу шилжих' });
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('handles keyboard navigation', () => {
    render(
      <Pagination
        page={3}
        pageSize={10}
        total={100}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByRole('button', { name: '5 дугаар хуудас руу шилжих' });
    
    fireEvent.keyDown(pageButton, { key: 'Enter' });
    expect(mockOnPageChange).toHaveBeenCalledWith(5);

    fireEvent.keyDown(pageButton, { key: ' ' });
    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('displays correct item range information', () => {
    render(
      <Pagination
        page={2}
        pageSize={10}
        total={25}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('25 мэдээнээс 11-20 харуулж байна')).toBeInTheDocument();
  });

  it('does not render when total pages is 1 or less', () => {
    const { container } = render(
      <Pagination
        page={1}
        pageSize={10}
        total={5}
        onPageChange={mockOnPageChange}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
