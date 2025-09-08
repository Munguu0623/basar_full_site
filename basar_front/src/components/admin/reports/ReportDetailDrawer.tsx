'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Eye, 
  EyeOff, 
  Trash2, 
  Flag, 
  User, 
  Calendar, 
  MessageCircle,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

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

interface ReportDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
  onAction?: (action: 'hide' | 'delete' | 'dismiss', reason?: string) => void;
}

export const ReportDetailDrawer: React.FC<ReportDetailDrawerProps> = ({
  isOpen,
  onClose,
  report,
  onAction
}) => {
  const [actionReason, setActionReason] = useState('');
  const [showActionForm, setShowActionForm] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'hide' | 'delete' | 'dismiss'>('hide');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setActionReason('');
    setShowActionForm(false);
  }, [report]);

  const handleAction = (action: 'hide' | 'delete' | 'dismiss') => {
    setSelectedAction(action);
    setShowActionForm(true);
  };

  const handleConfirmAction = () => {
    if (onAction) {
      onAction(selectedAction, actionReason.trim() || undefined);
    }
    setShowActionForm(false);
    setActionReason('');
  };

  if (!isOpen || !report) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge variant="success" size="sm">Шийдвэрлэгдсэн</Badge>;
      case 'dismissed':
        return <Badge variant="default" size="sm">Татгалзсан</Badge>;
      default:
        return <Badge variant="warning" size="sm">Хүлээгдэж буй</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'hide': return <EyeOff size={16} />;
      case 'delete': return <Trash2 size={16} />;
      case 'dismiss': return <X size={16} />;
      default: return null;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'hide': return 'Нуух';
      case 'delete': return 'Устгах';
      case 'dismiss': return 'Татгалзах';
      default: return '';
    }
  };

  const getActionDescription = (action: string) => {
    switch (action) {
      case 'hide': 
        return 'Энэ контент хэрэглэгчдэд харагдахгүй болно';
      case 'delete': 
        return 'Энэ контент бүрэн устгагдана';
      case 'dismiss': 
        return 'Энэ гомдол хүчинтэй биш гэж үзнэ';
      default: 
        return '';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Flag size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 font-poppins">
                  Гомдлын дэлгэрэнгүй
                </h3>
                <p className="text-sm text-slate-600">
                  {report.entityType === 'post' ? 'Нийтлэл' : 'Сэтгэгдэл'} #{report.entityId.slice(-6)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(report.status)}
              <Button
                variant="ghost"
                size="md"
                onClick={onClose}
                className="p-2"
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Report info */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h4 className="font-medium text-red-900 mb-3 flex items-center gap-2">
              <AlertTriangle size={18} />
              Гомдлын мэдээлэл
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-red-700">Шалтгаан:</span>
                <div className="mt-1">
                  <Badge variant="warning" size="sm">{report.reason}</Badge>
                </div>
              </div>
              {report.description && (
                <div>
                  <span className="text-sm font-medium text-red-700">Дэлгэрэнгүй тайлбар:</span>
                  <p className="mt-1 text-sm text-red-800 bg-red-100 rounded-lg p-3">
                    {report.description}
                  </p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-red-700">Гомдол гаргасан:</span>
                <div className="mt-1 flex items-center gap-2">
                  <User size={16} className="text-red-600" />
                  <span className="text-sm text-red-800">{report.reporter.name}</span>
                  <span className="text-xs text-red-600">({report.reporter.email})</span>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-red-700">Огноо:</span>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar size={16} className="text-red-600" />
                  <span className="text-sm text-red-800">
                    {new Date(report.createdAt).toLocaleString('mn-MN')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reported content */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
              {report.entityType === 'post' ? (
                <FileText size={18} className="text-blue-500" />
              ) : (
                <MessageCircle size={18} className="text-emerald-500" />
              )}
              Гомдол иргэсэн контент
            </h4>
            <div className="space-y-3">
              {report.reportedContent.title && (
                <div>
                  <span className="text-sm font-medium text-slate-700">Гарчиг:</span>
                  <p className="mt-1 text-sm text-slate-900 font-medium">
                    {report.reportedContent.title}
                  </p>
                </div>
              )}
              <div>
                <span className="text-sm font-medium text-slate-700">Агуулга:</span>
                <div className="mt-1 p-3 bg-white border border-slate-200 rounded-lg">
                  <p className="text-sm text-slate-800">
                    {report.reportedContent.excerpt}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">Зохиогч:</span>
                <p className="mt-1 text-sm text-slate-900">{report.reportedContent.author}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">Үүсгэсэн огноо:</span>
                <p className="mt-1 text-sm text-slate-600">
                  {new Date(report.reportedContent.createdAt).toLocaleString('mn-MN')}
                </p>
              </div>
            </div>
          </div>

          {/* Resolution history */}
          {report.status === 'resolved' && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <h4 className="font-medium text-emerald-900 mb-3 flex items-center gap-2">
                <CheckCircle size={18} />
                Шийдвэрлэсэн түүх
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-emerald-700">Үйлдэл:</span>
                  <div className="mt-1">
                    <Badge variant="success" size="sm">
                      {report.resolution === 'hide' ? 'Нуугдсан' : 
                       report.resolution === 'delete' ? 'Устгагдсан' : 'Татгалзсан'}
                    </Badge>
                  </div>
                </div>
                {report.resolutionReason && (
                  <div>
                    <span className="text-sm font-medium text-emerald-700">Шалтгаан:</span>
                    <p className="mt-1 text-sm text-emerald-800 bg-emerald-100 rounded-lg p-3">
                      {report.resolutionReason}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium text-emerald-700">Шийдвэрлэсэн:</span>
                  <p className="mt-1 text-sm text-emerald-800">
                    {report.resolvedBy} - {report.resolvedAt && new Date(report.resolvedAt).toLocaleString('mn-MN')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          {report.status === 'pending' && !showActionForm && (
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h4 className="font-medium text-slate-900 mb-4">Арга хэмжээ авах</h4>
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleAction('hide')}
                  className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <EyeOff size={16} />
                  Контент нуух
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => handleAction('delete')}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Trash2 size={16} />
                  Контент устгах
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => handleAction('dismiss')}
                  className="flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Гомдол татгалзах
                </Button>
              </div>
            </div>
          )}

          {/* Action form */}
          {showActionForm && (
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h4 className="font-medium text-slate-900 mb-4 flex items-center gap-2">
                {getActionIcon(selectedAction)}
                {getActionText(selectedAction)}
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                {getActionDescription(selectedAction)}
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Шалтгаан (заавал биш)
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="Энэ үйлдэл хийх шалтгаанаа бичнэ үү..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] resize-vertical"
                />
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleConfirmAction}
                  className={selectedAction === 'delete' ? 'bg-red-600 hover:bg-red-700' : ''}
                >
                  Батлах
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setShowActionForm(false)}
                >
                  Цуцлах
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
