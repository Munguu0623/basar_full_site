'use client';

import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  Check, 
  X, 
  MapPin,
  Mail,
  Phone,
  Clock,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { OrgRequestFilters } from '@/components/admin/org/OrgRequestFilters';
import { DecisionDialog } from '@/components/admin/org/DecisionDialog';
import { AdminEmpty } from '@/components/empty/AdminEmpty';
import { api } from '@/lib/api';

interface OrgRequest {
  id: string;
  name: string;
  type: string;
  city: string;
  email: string;
  phone?: string;
  website?: string;
  logoUrl?: string;
  description: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedBy: {
    name: string;
    email: string;
  };
}

interface Filters {
  status: 'all' | 'pending' | 'approved' | 'rejected';
  type: string;
  city: string;
  q: string;
}

export default function OrganizationRequestsPage() {
  const [requests, setRequests] = useState<OrgRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [decisionDialogOpen, setDecisionDialogOpen] = useState(false);
  const [decisionType, setDecisionType] = useState<'approve' | 'reject'>('approve');
  const [targetRequest, setTargetRequest] = useState<string | null>(null);
  const [previewRequest, setPreviewRequest] = useState<OrgRequest | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: 'pending',
    type: '',
    city: '',
    q: ''
  });

  // Хүсэлтүүд ачаалах
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.type && { type: filters.type }),
        ...(filters.city && { city: filters.city }),
        ...(filters.q && { q: filters.q }),
      });

      const response = await api.get(`/api/admin/org-requests?${params}`);
      setRequests(response.data || []);
      setTotal(response.total || 0);
    } catch (error) {
      console.error('Хүсэлтүүд ачаалахад алдаа гарлаа:', error);
      setRequests([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, filters]);

  // Approve/Reject хийх
  const handleDecision = async (requestId: string, action: 'approve' | 'reject', reason?: string) => {
    try {
      await api.post(`/api/admin/org-requests/${requestId}/${action}`, {
        ...(reason && { reason })
      });
      
      // Optimistic update
      setRequests(prev => prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' as const }
          : req
      ));
      
      setDecisionDialogOpen(false);
      setTargetRequest(null);
    } catch (error) {
      console.error('Шийдвэр гаргахад алдаа гарлаа:', error);
      // Error үед мэдээлэл дахин ачаалах
      await fetchRequests();
    }
  };

  // Bulk actions
  const handleBulkAction = async (action: 'approve' | 'reject') => {
    if (selectedRequests.length === 0) return;
    
    const confirmed = confirm(
      `${selectedRequests.length} хүсэлтийг ${action === 'approve' ? 'батлах' : 'татгалзах'}даа итгэлтэй байна уу?`
    );
    
    if (!confirmed) return;

    try {
      await Promise.all(
        selectedRequests.map(id => 
          api.post(`/api/admin/org-requests/${id}/${action}`)
        )
      );
      
      setSelectedRequests([]);
      await fetchRequests();
    } catch (error) {
      console.error('Bulk үйлдэл хийхэд алдаа гарлаа:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success" size="sm">Батлагдсан</Badge>;
      case 'rejected':
        return <Badge variant="danger" size="sm">Татгалзсан</Badge>;
      default:
        return <Badge variant="warning" size="sm">Хүлээгдэж буй</Badge>;
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  if (loading) {
    return <RequestsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">
            Байгууллагын хүсэлтүүд
          </h1>
          <p className="text-slate-600 mt-1">
            Сайтад элсэх хүсэлт гаргасан байгууллагуудыг баталгаажуулах
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#278EE8] font-poppins">{total}</div>
          <div className="text-sm text-slate-600">Нийт хүсэлт</div>
        </div>
      </div>

      {/* Filters */}
      <OrgRequestFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Bulk actions */}
      {selectedRequests.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700">
              {selectedRequests.length} хүсэлт сонгогдсон
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => handleBulkAction('approve')}
              >
                <Check size={16} className="mr-2" />
                Бүгдийг батлах
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => handleBulkAction('reject')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <X size={16} className="mr-2" />
                Бүгдийг татгалзах
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Requests grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className={`bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer ${
              selectedRequests.includes(request.id) ? 'ring-2 ring-[#278EE8] border-[#278EE8]' : ''
            }`}
            onClick={() => setPreviewRequest(request)}
          >
            {/* Selection checkbox */}
            <div className="flex items-start justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRequests.includes(request.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    if (e.target.checked) {
                      setSelectedRequests([...selectedRequests, request.id]);
                    } else {
                      setSelectedRequests(selectedRequests.filter(id => id !== request.id));
                    }
                  }}
                  className="w-4 h-4 text-[#278EE8] border-slate-300 rounded focus:ring-[#278EE8] focus:ring-2"
                />
                <span className="sr-only">Хүсэлт сонгох</span>
              </label>
              {getStatusBadge(request.status)}
            </div>

            {/* Organization info */}
            <div className="flex items-start gap-3 mb-4">
              {request.logoUrl ? (
                <img
                  src={request.logoUrl}
                  alt={`${request.name} лого`}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                />
              ) : (
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Building2 size={24} className="text-slate-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 line-clamp-1">
                  {request.name}
                </h3>
                <p className="text-sm text-slate-600">{request.type}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={14} />
                {request.city}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail size={14} />
                {request.email}
              </div>
              {request.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={14} />
                  {request.phone}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={14} />
                {new Date(request.submittedAt).toLocaleDateString('mn-MN')}
              </div>
            </div>

            {/* Description preview */}
            <p className="text-sm text-slate-600 line-clamp-2 mb-4">
              {request.description}
            </p>

            {/* Actions */}
            {request.status === 'pending' && (
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTargetRequest(request.id);
                    setDecisionType('approve');
                    setDecisionDialogOpen(true);
                  }}
                  className="flex-1"
                >
                  <Check size={16} className="mr-2" />
                  Батлах
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTargetRequest(request.id);
                    setDecisionType('reject');
                    setDecisionDialogOpen(true);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <X size={16} className="mr-2" />
                  Татгалзах
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {!loading && requests.length === 0 && (
        <AdminEmpty
          icon={Building2}
          title={filters.status === 'pending' ? 'Хүлээгдэж буй хүсэлт алга' : 'Хүсэлт олдсонгүй'}
          description={
            filters.status === 'pending' 
              ? 'Одоогоор шинэ байгууллагын хүсэлт ирээгүй байна'
              : 'Таны хайсан нөхцөлд тохирох хүсэлт олдсонгүй'
          }
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="md"
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
          >
            Өмнөх
          </Button>
          
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
                  onClick={() => setPage(pageNumber)}
                  className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                    page === pageNumber 
                      ? 'bg-[#278EE8] text-white' 
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          
          <Button
            variant="ghost"
            size="md"
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
          >
            Дараах
          </Button>
        </div>
      )}

      {/* Decision dialog */}
      <DecisionDialog
        isOpen={decisionDialogOpen}
        onClose={() => {
          setDecisionDialogOpen(false);
          setTargetRequest(null);
        }}
        onConfirm={(reason) => targetRequest && handleDecision(targetRequest, decisionType, reason)}
        type={decisionType}
        organizationName={
          targetRequest ? requests.find(r => r.id === targetRequest)?.name || '' : ''
        }
      />

      {/* Preview panel - баруун талд харуулах (optional) */}
      {previewRequest && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-slate-200 p-6 overflow-y-auto z-40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 font-poppins">
              Дэлгэрэнгүй мэдээлэл
            </h3>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setPreviewRequest(null)}
              className="p-2"
            >
              <X size={20} />
            </Button>
          </div>
          
          {/* Preview content */}
          <div className="space-y-6">
            <div className="text-center">
              {previewRequest.logoUrl ? (
                <img
                  src={previewRequest.logoUrl}
                  alt={`${previewRequest.name} лого`}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 mx-auto mb-4"
                />
              ) : (
                <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 size={32} className="text-slate-400" />
                </div>
              )}
              <h4 className="text-xl font-semibold text-slate-900 font-poppins">
                {previewRequest.name}
              </h4>
              <p className="text-slate-600">{previewRequest.type}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-slate-900 mb-2">Холбоо барих</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={14} className="text-slate-400" />
                    {previewRequest.email}
                  </div>
                  {previewRequest.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-slate-400" />
                      {previewRequest.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-slate-400" />
                    {previewRequest.city}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-slate-900 mb-2">Тайлбар</h5>
                <p className="text-sm text-slate-600">
                  {previewRequest.description}
                </p>
              </div>

              <div>
                <h5 className="font-medium text-slate-900 mb-2">Илгээсэн</h5>
                <p className="text-sm text-slate-600">
                  {previewRequest.submittedBy.name} ({previewRequest.submittedBy.email})
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(previewRequest.submittedAt).toLocaleString('mn-MN')}
                </p>
              </div>
            </div>

            {/* Actions */}
            {previewRequest.status === 'pending' && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setTargetRequest(previewRequest.id);
                    setDecisionType('approve');
                    setDecisionDialogOpen(true);
                  }}
                  className="w-full"
                >
                  <Check size={16} className="mr-2" />
                  Батлах
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    setTargetRequest(previewRequest.id);
                    setDecisionType('reject');
                    setDecisionDialogOpen(true);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  <X size={16} className="mr-2" />
                  Татгалзах
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Loading skeleton
const RequestsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-64 bg-slate-200 rounded animate-shimmer mb-2"></div>
          <div className="h-4 w-96 bg-slate-200 rounded animate-shimmer"></div>
        </div>
        <div className="text-right">
          <div className="h-8 w-16 bg-slate-200 rounded animate-shimmer mb-1"></div>
          <div className="h-4 w-20 bg-slate-200 rounded animate-shimmer"></div>
        </div>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="h-10 bg-slate-200 rounded animate-shimmer"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-4 w-4 bg-slate-200 rounded animate-shimmer"></div>
                <div className="h-6 w-20 bg-slate-200 rounded-full animate-shimmer"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-lg animate-shimmer"></div>
                <div className="flex-1">
                  <div className="h-4 w-32 bg-slate-200 rounded animate-shimmer mb-2"></div>
                  <div className="h-3 w-24 bg-slate-200 rounded animate-shimmer"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded animate-shimmer"></div>
                <div className="h-3 bg-slate-200 rounded animate-shimmer"></div>
                <div className="h-3 bg-slate-200 rounded animate-shimmer"></div>
              </div>
              <div className="h-16 bg-slate-200 rounded animate-shimmer"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-slate-200 rounded flex-1 animate-shimmer"></div>
                <div className="h-10 bg-slate-200 rounded flex-1 animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
