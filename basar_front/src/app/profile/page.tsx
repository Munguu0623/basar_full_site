'use client';

import React, { useState, useEffect } from 'react';
import { ProfileView } from '@/components/profile/ProfileView';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Contributions } from '@/components/profile/Contributions';
import { TProfile } from '@/types';

export default function ProfilePage() {
  const [profile, setProfile] = useState<TProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'contributions'>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock profile data
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      // Mock API call: GET /api/me
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfile: TProfile = {
        id: 'user_001',
        email: 'example@gmail.com',
        displayName: 'Болдбаатар',
        bio: 'Амьтанд хайртай, 5 жилийн туршлагатай малын эмч. Тэжээвэр амьтны эрүүл мэндэд анхаарал тавьдаг.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        createdAt: '2023-01-15T00:00:00Z'
      };
      
      setProfile(mockProfile);
      setIsLoading(false);
    };

    loadProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Профайл олдсонгүй</h2>
          <p className="text-gray-600">Та эхлээд нэвтрэх шаардлагатай.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-amber-50/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden mb-8 backdrop-blur-sm border border-slate-200/60">
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5 -mt-12">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={`${profile.displayName}-ийн профайл зураг`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-bold">
                      {profile.displayName.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:min-w-0 sm:flex-1 mt-6 sm:mt-0">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {profile.displayName}
                  </h1>
                  <p className="text-gray-500 text-sm">{profile.email}</p>
                  {profile.bio && (
                    <p className="text-gray-700 mt-2">{profile.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/90 rounded-2xl shadow-xl backdrop-blur-sm border border-slate-200/60">
          <div className="border-b border-slate-200/60">
            <nav className="flex space-x-8 px-6" aria-label="Табууд">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Ерөнхий мэдээлэл
              </button>
              <button
                onClick={() => setActiveTab('contributions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'contributions'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Миний оруулсан контент
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                {isEditing ? (
                  <ProfileForm
                    profile={profile}
                    onSave={(updatedProfile: TProfile) => {
                      setProfile(updatedProfile);
                      setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <ProfileView
                    profile={profile}
                    onEdit={() => setIsEditing(true)}
                  />
                )}
              </div>
            )}

            {activeTab === 'contributions' && (
              <Contributions />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
