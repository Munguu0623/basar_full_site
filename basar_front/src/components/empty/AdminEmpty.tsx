import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AdminEmptyProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const AdminEmpty: React.FC<AdminEmptyProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className
}) => {
  return (
    <div className={`text-center py-12 px-6 ${className || ''}`}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Icon size={32} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2 font-poppins">
          {title}
        </h3>
        <p className="text-slate-600 mb-6 max-w-md">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button variant="primary" size="md" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
