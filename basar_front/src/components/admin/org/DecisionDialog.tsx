'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DecisionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  type: 'approve' | 'reject';
  organizationName: string;
  loading?: boolean;
}

export const DecisionDialog: React.FC<DecisionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type,
  organizationName,
  loading = false
}) => {
  const [reason, setReason] = useState('');
  const [isReasonRequired, setIsReasonRequired] = useState(false);

  useEffect(() => {
    // Reject үед шалтгаан заавал шаардах
    setIsReasonRequired(type === 'reject');
    setReason('');
  }, [type, isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    if (!loading) {
      setReason('');
      onClose();
    }
  };

  const handleConfirm = () => {
    if (isReasonRequired && !reason.trim()) {
      return;
    }
    
    onConfirm(reason.trim() || undefined);
  };

  const canConfirm = !isReasonRequired || (isReasonRequired && reason.trim().length > 0);

  if (!isOpen) return null;

  const isApprove = type === 'approve';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-slideDown">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className={`flex-shrink-0 p-2 rounded-lg ${
              isApprove ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
              {isApprove ? (
                <Check size={24} className="text-emerald-600" />
              ) : (
                <AlertTriangle size={24} className="text-red-600" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 font-poppins">
              {isApprove ? 'Хүсэлт батлах' : 'Хүсэлт татгалзах'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-slate-600 mb-4">
            {isApprove ? (
              <>
                <span className="font-medium text-slate-900">"{organizationName}"</span> байгууллагын 
                хүсэлтийг батлахдаа итгэлтэй байна уу?
              </>
            ) : (
              <>
                <span className="font-medium text-slate-900">"{organizationName}"</span> байгууллагын 
                хүсэлтийг татгалзахдаа итгэлтэй байна уу?
              </>
            )}
          </p>

          {isApprove && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-emerald-900 mb-2">Батлагдсаны дараа:</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Байгууллага сайтад харагдана</li>
                <li>• "Баталгаажсан" статустай болно</li>
                <li>• Хэрэглэгчид холбогдож болно</li>
                <li>• Мэдээ, нийтлэл оруулах боломжтой</li>
              </ul>
            </div>
          )}

          {/* Reason input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {isApprove ? 'Нэмэлт тэмдэглэл (заавал биш)' : 'Татгалзах шалтгаан'} 
              {!isApprove && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={loading}
              placeholder={
                isApprove 
                  ? 'Байгууллагад илгээх нэмэлт мессеж...'
                  : 'Яагаад татгалзаж байгаагаа тайлбарлана уу...'
              }
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] disabled:opacity-50 resize-vertical"
            />
            {isReasonRequired && (
              <p className="text-xs text-slate-500 mt-1">
                Татгалзах шалтгаанг заавал бичнэ үү. Энэ нь байгууллагад илгээгдэнэ.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 justify-end">
            <Button
              variant="ghost"
              size="md"
              onClick={handleClose}
              disabled={loading}
            >
              Цуцлах
            </Button>
            <Button
              variant={isApprove ? 'primary' : 'secondary'}
              size="md"
              onClick={handleConfirm}
              disabled={!canConfirm || loading}
              className={`${
                !isApprove && 'bg-red-600 hover:bg-red-700 text-white'
              } ${
                (!canConfirm || loading) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ачаалж байна...
                </div>
              ) : (
                <>
                  {isApprove ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Батлах
                    </>
                  ) : (
                    <>
                      <X size={16} className="mr-2" />
                      Татгалзах
                    </>
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
