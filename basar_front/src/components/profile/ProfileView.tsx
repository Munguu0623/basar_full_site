'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { TProfile } from '@/types';

interface ProfileViewProps {
  profile: TProfile;
  onEdit: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onEdit }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Хувийн мэдээлэл</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Харуулах нэр
              </label>
              <p className="text-slate-900 bg-slate-50/80 rounded-lg px-3 py-2 border border-slate-200/60">
                {profile.displayName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                И-мэйл хаяг
              </label>
              <p className="text-slate-900 bg-slate-50/80 rounded-lg px-3 py-2 border border-slate-200/60">
                {profile.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Бүртгүүлсэн огноо
              </label>
              <p className="text-slate-900 bg-slate-50/80 rounded-lg px-3 py-2 border border-slate-200/60">
                {formatDate(profile.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Нэмэлт мэдээлэл</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Био
              </label>
              <div className="bg-slate-50/80 rounded-lg px-3 py-2 min-h-[80px] border border-slate-200/60">
                {profile.bio ? (
                  <p className="text-slate-900 whitespace-pre-wrap">{profile.bio}</p>
                ) : (
                  <p className="text-slate-500 italic">Био оруулаагүй байна</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Профайл зураг
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={`${profile.displayName}-ийн профайл зураг`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                      {profile.displayName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {profile.avatarUrl ? 'Профайл зураг байна' : 'Профайл зураг байхгүй'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          onClick={onEdit}
          variant="primary"
          size="md"
          className="px-6"
        >
          Профайл засах
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-emerald-50/80 to-amber-50/80 rounded-xl p-6 mt-6 border border-slate-200/60">
        <h4 className="text-lg font-semibold text-slate-900 mb-4">📊 Статистик</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">0</div>
            <div className="text-sm text-slate-600">📝 Нийтлэл</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-slate-600">💬 Сэтгэгдэл</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">0</div>
            <div className="text-sm text-slate-600">❤️ Лайк</div>
          </div>
        </div>
      </div>
    </div>
  );
};
