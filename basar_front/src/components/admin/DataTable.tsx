'use client';

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface ColumnDef<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T = any> {
  columns: ColumnDef<T>[];
  rows: T[];
  page: number;
  pageSize: number;
  total: number;
  loading?: boolean;
  selectable?: boolean;
  selectedRows?: string[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onPageChange?: (page: number) => void;
  onRowSelect?: (rowId: string, selected: boolean) => void;
  onBulkSelect?: (allSelected: boolean) => void;
  onBulkAction?: (action: string, selectedIds: string[]) => void;
  bulkActions?: Array<{ key: string; label: string; variant?: 'primary' | 'secondary' | 'danger' }>;
  emptyMessage?: string;
  className?: string;
}

export const DataTable = <T extends { id: string }>({
  columns,
  rows,
  page,
  pageSize,
  total,
  loading = false,
  selectable = false,
  selectedRows = [],
  onSort,
  onPageChange,
  onRowSelect,
  onBulkSelect,
  onBulkAction,
  bulkActions = [],
  emptyMessage = 'Мэдээлэл олдсонгүй',
  className
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (!onSort) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    if (sortKey === key && sortDirection === 'asc') {
      direction = 'desc';
    }
    
    setSortKey(key);
    setSortDirection(direction);
    onSort(key, direction);
  };

  const handleBulkSelectToggle = () => {
    const allSelected = selectedRows.length === rows.length && rows.length > 0;
    onBulkSelect?.(!allSelected);
  };

  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);

  const getSortIcon = (key: string) => {
    if (sortKey !== key) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 overflow-hidden", className)}>
      {/* Bulk actions */}
      {selectable && selectedRows.length > 0 && bulkActions.length > 0 && (
        <div className="border-b border-slate-200 px-6 py-4 bg-blue-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">
              {selectedRows.length} элемент сонгогдсон
            </span>
            <div className="flex items-center gap-2">
              {bulkActions.map((action) => (
                <Button
                  key={action.key}
                  variant={action.variant === 'danger' ? 'secondary' : 'primary'}
                  size="md"
                  onClick={() => onBulkAction?.(action.key, selectedRows)}
                  className={cn(
                    action.variant === 'danger' && 'bg-red-600 hover:bg-red-700 text-white'
                  )}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {selectable && (
                <th className="w-12 px-6 py-4 text-left">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === rows.length && rows.length > 0}
                      onChange={handleBulkSelectToggle}
                      className="w-4 h-4 text-[#278EE8] border-slate-300 rounded focus:ring-[#278EE8] focus:ring-2"
                    />
                    <span className="sr-only">Бүгдийг сонгох</span>
                  </label>
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider",
                    column.width
                  )}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 hover:text-slate-700 transition-colors"
                    >
                      {column.header}
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length + (selectable ? 1 : 0)} 
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <MoreHorizontal size={24} className="text-slate-400" />
                    </div>
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr 
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={(e) => onRowSelect?.(row.id, e.target.checked)}
                          className="w-4 h-4 text-[#278EE8] border-slate-300 rounded focus:ring-[#278EE8] focus:ring-2"
                        />
                        <span className="sr-only">Мөр сонгох</span>
                      </label>
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-slate-900">
                      {column.render ? 
                        column.render((row as any)[column.key], row) : 
                        (row as any)[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-700">
              {startIndex}-{endIndex} / {total} үр дүн
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="md"
                onClick={() => onPageChange?.(page - 1)}
                disabled={page <= 1}
              >
                Өмнөх
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (page <= 3) {
                    pageNumber = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = page - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => onPageChange?.(pageNumber)}
                      className={cn(
                        "w-8 h-8 text-sm rounded-lg transition-colors",
                        page === pageNumber 
                          ? "bg-[#278EE8] text-white" 
                          : "text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <Button
                variant="ghost"
                size="md"
                onClick={() => onPageChange?.(page + 1)}
                disabled={page >= totalPages}
              >
                Дараах
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Table skeleton component
const TableSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="border-b border-slate-200">
        <div className="flex items-center h-12 px-6">
          <div className="h-4 bg-slate-200 rounded w-32 animate-shimmer"></div>
        </div>
      </div>
      <div className="space-y-0">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="flex items-center h-16 px-6 border-b border-slate-100 last:border-b-0">
            <div className="h-4 bg-slate-200 rounded w-full animate-shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
