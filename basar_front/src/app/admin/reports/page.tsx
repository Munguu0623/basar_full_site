'use client';

import React, { useState, useEffect } from 'react';
import { 
  Flag, 
  Eye, 
  EyeOff, 
  Trash2, 
  X, 
  FileText,
  MessageCircle,
  Calendar,
  User,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DataTable, ColumnDef } from '@/components/admin/DataTable';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { ReportFilters } from '@/components/admin/reports/ReportFilters';
import { ReportDetailDrawer } from '@/components/admin/reports/ReportDetailDrawer';
import { AdminEmpty } from '@/components/empty/AdminEmpty';
import { api } from '@/lib/api';

interface Report {
  id: string;
  entityType: 'post' | 'comment';
  entityId: string;
  reason: string;
  description?: string;
  reporter: {
    id: string;
    name: string;
    email: string;
  };
  reportedContent: {
    title?: string;
    excerpt: string;
    author: string;
    createdAt: string;
  };
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
  resolution?: 'hide' | 'delete' | 'dismiss';
  resolutionReason?: string;
}

interface Filters {
  status: 'all' | 'pending' | 'resolved' | 'dismissed';
  entityType: 'all' | 'post' | 'comment';
  q: string;
  dateRange?: { from: string; to: string };
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [total, setTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'hide' | 'delete' | 'dismiss'>('hide');
  const [targetReport, setTargetReport] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: 'pending',
    entityType: 'all',
    q: ''
  });

  // Reports ачаалах
  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.entityType !== 'all' && { entityType: filters.entityType }),
        ...(filters.q && { q: filters.q }),
      });

      const response = await api.get<{data: Report[], total: number}>(`/admin/reports?${params}`);
      setReports(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Гомдлууд ачаалахад алдаа гарлаа:', error);
      setReports([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [page, filters]);

  // Action хийх
  const handleAction = async (reportId: string, action: 'hide' | 'delete' | 'dismiss', reason?: string) => {
    try {
      await api.post(`/admin/reports/${reportId}/action`, {
        action,
        reason
      });
      
      // Optimistic update
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { 
              ...report, 
              status: 'resolved',
              resolution: action,
              resolvedAt: new Date().toISOString(),
              resolvedBy: 'Админ', // Админы нэрийг API-аас авах
              resolutionReason: reason
            }
          : report
      ));
      
      setActionDialogOpen(false);
      setTargetReport(null);
    } catch (error) {
      console.error('Үйлдэл хийхэд алдаа гарлаа:', error);
      await fetchReports();
    }
  };

  // Bulk actions
  const handleBulkAction = async (action: 'hide' | 'delete' | 'dismiss') => {
    if (selectedRows.length === 0) return;
    
    const actionText = action === 'hide' ? 'нуух' : action === 'delete' ? 'устгах' : 'татгалзах';
    const confirmed = confirm(
      `${selectedRows.length} гомдлыг ${actionText} үйлдэл хийхдээ итгэлтэй байна уу?`
    );
    
    if (!confirmed) return;

    try {
      await Promise.all(
        selectedRows.map(id => 
          api.post(`/admin/reports/${id}/action`, { action })
        )
      );
      
      setSelectedRows([]);
      await fetchReports();
    } catch (error) {
      console.error('Bulk үйлдэл хийхэд алдаа гарлаа:', error);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedRows.length === 0) return;
      
      // Ctrl/Cmd modifier шаардлагатай
      if (!(e.ctrlKey || e.metaKey)) return;
      
      switch (e.key.toLowerCase()) {
        case 'h':
          e.preventDefault();
          handleBulkAction('hide');
          break;
        case 'd':
          e.preventDefault();
          handleBulkAction('delete');
          break;
        case 'x':
          e.preventDefault();
          handleBulkAction('dismiss');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedRows]);

  // Table columns
  const columns: ColumnDef<Report>[] = [
    {
      key: 'entityType',
      header: 'Төрөл',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-2">
          {(value as string) === 'post' ? (
            <FileText size={16} className="text-blue-500" />
          ) : (
            <MessageCircle size={16} className="text-emerald-500" />
          )}
          <span className="capitalize">
            {(value as string) === 'post' ? 'Нийтлэл' : 'Сэтгэгдэл'}
          </span>
        </div>
      )
    },
    {
      key: 'entityId',
      header: 'Контент',
      render: (value: unknown, row: Report) => (
        <div>
          <div className="font-medium text-slate-900 line-clamp-1">
            {row.reportedContent.title || `${row.entityType} #${(value as string).slice(-6)}`}
          </div>
          <div className="text-sm text-slate-600 line-clamp-1">
            {row.reportedContent.excerpt}
          </div>
          <div className="text-xs text-slate-500">
            {row.reportedContent.author}
          </div>
        </div>
      )
    },
    {
      key: 'reason',
      header: 'Шалтгаан',
      sortable: true,
      render: (value: unknown) => (
        <Badge variant="warning" size="sm">
          {value as string}
        </Badge>
      )
    },
    {
      key: 'reporter',
      header: 'Гомдол гаргагч',
      render: (value: unknown) => (
        <div className="flex items-center gap-2">
          <User size={14} className="text-slate-400" />
          <div>
            <div className="font-medium text-slate-900">{(value as {name: string, email: string}).name}</div>
            <div className="text-xs text-slate-500">{(value as {name: string, email: string}).email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'createdAt',
      header: 'Огноо',
      sortable: true,
      render: (value: unknown) => (
        <div className="flex items-center gap-1 text-sm text-slate-600">
          <Calendar size={14} />
          {new Date(value as string).toLocaleDateString('mn-MN')}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Төлөв',
      sortable: true,
      render: (value: unknown, row: Report) => {
        switch (value as string) {
          case 'resolved':
            return (
              <div>
                <Badge variant="success" size="sm">Шийдвэрлэгдсэн</Badge>
                {row.resolution && (
                  <div className="text-xs text-slate-500 mt-1">
                    {row.resolution === 'hide' ? 'Нуугдсан' : 
                     row.resolution === 'delete' ? 'Устгагдсан' : 'Татгалзсан'}
                  </div>
                )}
              </div>
            );
          case 'dismissed':
            return <Badge variant="default" size="sm">Татгалзсан</Badge>;
          default:
            return <Badge variant="warning" size="sm">Хүлээгдэж буй</Badge>;
        }
      }
    },
    {
      key: 'actions',
      header: 'Үйлдэл',
      render: (_, row: Report) => (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="md" 
            className="p-2"
            onClick={() => {
              setSelectedReport(row);
              setDrawerOpen(true);
            }}
            title="Дэлгэрэнгүй харах"
          >
            <Eye size={16} />
          </Button>
          
          {row.status === 'pending' && (
            <>
              <Button 
                variant="ghost" 
                size="md" 
                className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                onClick={() => {
                  setTargetReport(row.id);
                  setActionType('hide');
                  setActionDialogOpen(true);
                }}
                title="Нуух (Ctrl+H)"
              >
                <EyeOff size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="md" 
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  setTargetReport(row.id);
                  setActionType('delete');
                  setActionDialogOpen(true);
                }}
                title="Устгах (Ctrl+D)"
              >
                <Trash2 size={16} />
              </Button>
              <Button 
                variant="ghost" 
                size="md" 
                className="p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  setTargetReport(row.id);
                  setActionType('dismiss');
                  setActionDialogOpen(true);
                }}
                title="Татгалзах (Ctrl+X)"
              >
                <X size={16} />
              </Button>
            </>
          )}
        </div>
      )
    }
  ];

  const bulkActions = [
    { key: 'hide', label: 'Нуух (Ctrl+H)', variant: 'secondary' as const },
    { key: 'delete', label: 'Устгах (Ctrl+D)', variant: 'danger' as const },
    { key: 'dismiss', label: 'Татгалзах (Ctrl+X)', variant: 'secondary' as const }
  ];

  const getActionTitle = (action: string) => {
    switch (action) {
      case 'hide': return 'Контент нуух';
      case 'delete': return 'Контент устгах';
      case 'dismiss': return 'Гомдол татгалзах';
      default: return 'Үйлдэл';
    }
  };

  const getActionDescription = (action: string) => {
    switch (action) {
      case 'hide': 
        return 'Энэ контент хэрэглэгчдэд харагдахгүй болно, гэхдээ бүрэн устгагдахгүй.';
      case 'delete': 
        return 'Энэ контент бүрэн устгагдана. Энэ үйлдлийг буцаах боломжгүй.';
      case 'dismiss': 
        return 'Энэ гомдол хүчинтэй биш гэж үзэн татгалзана. Контент өөрчлөгдөхгүй.';
      default: 
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">
            Гомдол шийдвэрлэлт
          </h1>
          <p className="text-slate-600 mt-1">
            Хэрэглэгчдийн гомдлыг шалгаж арга хэмжээ авах
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#278EE8] font-poppins">{total}</div>
          <div className="text-sm text-slate-600">Нийт гомдол</div>
        </div>
      </div>

      {/* Keyboard shortcuts help */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-2 text-sm text-blue-800">
          <AlertTriangle size={16} />
          <span className="font-medium">Гарын товч:</span>
          <code className="bg-blue-100 px-2 py-1 rounded">Ctrl+H</code> Нуух,
          <code className="bg-blue-100 px-2 py-1 rounded">Ctrl+D</code> Устгах,
          <code className="bg-blue-100 px-2 py-1 rounded">Ctrl+X</code> Татгалзах
        </div>
      </div>

      {/* Filters */}
      <ReportFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Data table */}
      <DataTable
        columns={columns}
        rows={reports}
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
            setSelectedRows(reports.filter(r => r.status === 'pending').map(r => r.id));
          } else {
            setSelectedRows([]);
          }
        }}
        onBulkAction={(action) => handleBulkAction(action as 'hide' | 'delete' | 'dismiss')}
        bulkActions={bulkActions}
        onPageChange={setPage}
        emptyMessage="Гомдол олдсонгүй"
      />

      {/* Empty state */}
      {!loading && reports.length === 0 && filters.q === '' && filters.status === 'pending' && (
        <AdminEmpty
          icon={Flag}
          title="Шинэ гомдол алга байна"
          description="Одоогоор шийдвэрлэх шаардлагатай гомдол байхгүй байна"
        />
      )}

      {/* Action confirmation dialog */}
      <ConfirmDialog
        isOpen={actionDialogOpen}
        onClose={() => {
          setActionDialogOpen(false);
          setTargetReport(null);
        }}
        onConfirm={() => targetReport && handleAction(targetReport, actionType)}
        title={getActionTitle(actionType)}
        description={getActionDescription(actionType)}
        variant={actionType === 'delete' ? 'danger' : 'warning'}
        confirmText={actionType === 'delete' ? 'Устгах' : 'Батлах'}
        cancelText="Цуцлах"
        requireTypedConfirmation={actionType === 'delete'}
        confirmationWord="DELETE"
      />

      {/* Report detail drawer */}
      <ReportDetailDrawer
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedReport(null);
        }}
        report={selectedReport}
        onAction={(action, reason) => {
          if (selectedReport) {
            handleAction(selectedReport.id, action, reason);
          }
          setDrawerOpen(false);
          setSelectedReport(null);
        }}
      />
    </div>
  );
}
