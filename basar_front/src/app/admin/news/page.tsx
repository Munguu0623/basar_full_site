'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { NewsFilters } from '@/components/admin/news/NewsFilters';
import { AdminEmpty } from '@/components/empty/AdminEmpty';
import { api } from '@/lib/api';

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  author: string;
  viewCount: number;
}

interface Filters {
  status: 'all' | 'draft' | 'published';
  category: string;
  q: string;
  dateRange?: { from: string; to: string };
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    category: '',
    q: '',
  });

  // News list үүсгэх
  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.category && { category: filters.category }),
        ...(filters.q && { q: filters.q }),
      });

      const response = await api.get(`/api/admin/news?${params}`);
      setNews(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Мэдээ ачаалахад алдаа гарлаа:', error);
      setNews([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [page, filters]);

  // Мэдээ устгах
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/admin/news/${id}`);
      await fetchNews();
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Мэдээ устгахад алдаа гарлаа:', error);
    }
  };

  // Bulk үйлдлүүд
  const handleBulkAction = async (action: string, selectedIds: string[]) => {
    try {
      switch (action) {
        case 'publish':
          await api.patch('/api/admin/news/bulk', {
            ids: selectedIds,
            action: 'publish'
          });
          break;
        case 'unpublish':
          await api.patch('/api/admin/news/bulk', {
            ids: selectedIds,
            action: 'unpublish'
          });
          break;
        case 'delete':
          if (confirm(`${selectedIds.length} мэдээг устгахдаа итгэлтэй байна уу?`)) {
            await api.delete('/api/admin/news/bulk', {
              data: { ids: selectedIds }
            });
          }
          break;
      }
      setSelectedRows([]);
      await fetchNews();
    } catch (error) {
      console.error('Bulk үйлдэл хийхэд алдаа гарлаа:', error);
    }
  };

  // Table баганын тодорхойлолт
  const columns: ColumnDef<NewsItem>[] = [
    {
      key: 'title',
      header: 'Гарчиг',
      sortable: true,
      width: 'min-w-64',
      render: (value: string, row: NewsItem) => (
        <div>
          <div className="font-medium text-slate-900 line-clamp-2">
            {value}
          </div>
          <div className="text-sm text-slate-500">
            /{row.slug}
          </div>
        </div>
      )
    },
    {
      key: 'category',
      header: 'Ангилал',
      sortable: true,
      render: (value: string) => (
        <Badge variant="info" size="sm">
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Төлөв',
      sortable: true,
      render: (value: string) => (
        <Badge 
          variant={value === 'published' ? 'success' : 'default'}
          size="sm"
        >
          {value === 'published' ? 'Нийтлэгдсэн' : 'Ноорог'}
        </Badge>
      )
    },
    {
      key: 'publishedAt',
      header: 'Нийтлэгдсэн',
      sortable: true,
      render: (value: string, row: NewsItem) => (
        <div className="text-sm">
          {value ? (
            <div className="flex items-center gap-1 text-slate-700">
              <Calendar size={14} />
              {new Date(value).toLocaleDateString('mn-MN')}
            </div>
          ) : (
            <span className="text-slate-500">-</span>
          )}
        </div>
      )
    },
    {
      key: 'viewCount',
      header: 'Үзэлт',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-1 text-slate-700">
          <Eye size={14} />
          {value.toLocaleString()}
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Үйлдэл',
      render: (_, row: NewsItem) => (
        <div className="flex items-center gap-1">
          <Link href={`/admin/news/${row.id}/edit`}>
            <Button variant="ghost" size="md" className="p-2">
              <Edit size={16} />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="md" 
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              setDeleteTarget(row.id);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )
    }
  ];

  const bulkActions = [
    { key: 'publish', label: 'Нийтлэх', variant: 'primary' as const },
    { key: 'unpublish', label: 'Буцаах', variant: 'secondary' as const },
    { key: 'delete', label: 'Устгах', variant: 'danger' as const }
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">
            Мэдээ удирдах
          </h1>
          <p className="text-slate-600 mt-1">
            Сайт дээрх мэдээ нийтлэлүүдийг удирдах
          </p>
        </div>
        <Link href="/admin/news/new">
          <Button variant="primary" size="md">
            <Plus size={18} className="mr-2" />
            Шинэ мэдээ
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <NewsFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Data table */}
      <DataTable
        columns={columns}
        rows={news}
        page={page}
        pageSize={pageSize}
        total={total}
        loading={loading}
        selectable={true}
        selectedRows={selectedRows}
        onRowSelect={(rowId, selected) => {
          if (selected) {
            setSelectedRows([...selectedRows, rowId]);
          } else {
            setSelectedRows(selectedRows.filter(id => id !== rowId));
          }
        }}
        onBulkSelect={(allSelected) => {
          if (allSelected) {
            setSelectedRows(news.map(item => item.id));
          } else {
            setSelectedRows([]);
          }
        }}
        onBulkAction={handleBulkAction}
        bulkActions={bulkActions}
        onPageChange={setPage}
        emptyMessage="Одоогоор мэдээ алга байна"
      />

      {/* Empty state */}
      {!loading && news.length === 0 && filters.q === '' && filters.status === 'all' && (
        <AdminEmpty
          icon={Plus}
          title="Мэдээ алга байна"
          description="Эхний мэдээгээ үүсгэж эхлээрэй"
          actionLabel="Шинэ мэдээ үүсгэх"
          onAction={() => window.location.href = '/admin/news/new'}
        />
      )}

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Мэдээ устгах"
        description="Энэ мэдээг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй."
        variant="danger"
        confirmText="Устгах"
        cancelText="Цуцлах"
      />
    </div>
  );
}
