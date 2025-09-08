'use client';

import React, { useEffect } from 'react';
import { X, AlertTriangle, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  requireTypedConfirmation?: boolean;
  confirmationWord?: string;
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Баталгаажуулах',
  cancelText = 'Цуцлах',
  variant = 'danger',
  requireTypedConfirmation = false,
  confirmationWord = 'DELETE',
  loading = false
}) => {
  const [typedConfirmation, setTypedConfirmation] = React.useState('');
  const [canConfirm, setCanConfirm] = React.useState(!requireTypedConfirmation);

  useEffect(() => {
    if (requireTypedConfirmation) {
      setCanConfirm(typedConfirmation === confirmationWord);
    }
  }, [typedConfirmation, confirmationWord, requireTypedConfirmation]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    if (canConfirm && !loading) {
      onConfirm();
    }
  };

  const handleClose = () => {
    if (!loading) {
      setTypedConfirmation('');
      onClose();
    }
  };

  if (!isOpen) return null;

  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <Trash2 size={24} className="text-red-600" />;
      case 'warning':
        return <AlertTriangle size={24} className="text-amber-600" />;
      default:
        return <Check size={24} className="text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-100';
      case 'warning':
        return 'bg-amber-100';
      default:
        return 'bg-blue-100';
    }
  };

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
            <div className={cn("flex-shrink-0 p-2 rounded-lg", getIconBg())}>
              {getIcon()}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 font-poppins">
              {title}
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
            {description}
          </p>

          {requireTypedConfirmation && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Баталгаажуулахын тулд <span className="font-bold text-red-600">{confirmationWord}</span> гэж бичнэ үү:
              </label>
              <input
                type="text"
                value={typedConfirmation}
                onChange={(e) => setTypedConfirmation(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] disabled:opacity-50"
                placeholder={confirmationWord}
              />
            </div>
          )}

          <div className="flex items-center gap-3 justify-end">
            <Button
              variant="ghost"
              size="md"
              onClick={handleClose}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={variant === 'danger' ? 'secondary' : 'primary'}
              size="md"
              onClick={handleConfirm}
              disabled={!canConfirm || loading}
              className={cn(
                variant === 'danger' && 'bg-red-600 hover:bg-red-700 text-white',
                loading && 'opacity-50 cursor-not-allowed'
              )}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ачаалж байна...
                </div>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
