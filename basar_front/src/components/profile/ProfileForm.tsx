'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TProfile, TProfilePatch } from '@/types';

interface ProfileFormProps {
  profile: TProfile;
  onSave: (updatedProfile: TProfile) => void;
  onCancel: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState<TProfilePatch>({
    displayName: profile.displayName,
    bio: profile.bio || '',
    avatarUrl: profile.avatarUrl
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(profile.avatarUrl || null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName?.trim()) {
      newErrors.displayName = 'Харуулах нэр шаардлагатай';
    } else if (formData.displayName.length > 60) {
      newErrors.displayName = 'Харуулах нэр 60 тэмдэгтээс богино байх ёстой';
    }

    if (formData.bio && formData.bio.length > 280) {
      newErrors.bio = 'Био 280 тэмдэгтээс богино байх ёстой';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // File validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, avatar: 'JPEG, PNG эсвэл WebP форматын зураг оруулна уу' }));
      return;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, avatar: 'Зургийн хэмжээ 5MB-аас бага байх ёстой' }));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewImage(result);
      setFormData(prev => ({ ...prev, avatarUrl: result }));
      setErrors(prev => ({ ...prev, avatar: '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Mock API call: PATCH /api/me
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedProfile: TProfile = {
        ...profile,
        displayName: formData.displayName!,
        bio: formData.bio || null,
        avatarUrl: formData.avatarUrl || null
      };

      onSave(updatedProfile);
      
      // Mock success toast would be shown here
      console.log('Профайл амжилттай шинэчлэгдлээ');
      
    } catch (error) {
      console.error('Profile update error:', error);
      setErrors({ submit: 'Профайл шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Профайл засах</h3>

      {/* Submit Error */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm" role="alert">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Display Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
              Харуулах нэр <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="displayName"
              value={formData.displayName || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
              className={`block w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#278EE8] focus:border-transparent ${
                errors.displayName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Таны харуулах нэр"
              maxLength={60}
              aria-describedby={errors.displayName ? 'displayName-error' : 'displayName-help'}
            />
            {errors.displayName && (
              <p id="displayName-error" className="mt-1 text-sm text-red-600">{errors.displayName}</p>
            )}
            <p id="displayName-help" className="mt-1 text-sm text-gray-500">
              {formData.displayName?.length || 0}/60 тэмдэгт
            </p>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Био
            </label>
            <textarea
              id="bio"
              rows={4}
              value={formData.bio || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className={`block w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#278EE8] focus:border-transparent resize-none ${
                errors.bio ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Таны тухай товч мэдээлэл..."
              maxLength={280}
              aria-describedby={errors.bio ? 'bio-error' : 'bio-help'}
            />
            {errors.bio && (
              <p id="bio-error" className="mt-1 text-sm text-red-600">{errors.bio}</p>
            )}
            <p id="bio-help" className="mt-1 text-sm text-gray-500">
              {formData.bio?.length || 0}/280 тэмдэгт
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Профайл зураг
            </label>
            
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Профайл зургийн өмнөх харагдац"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">
                    {formData.displayName?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <input
                  type="file"
                  id="avatar"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-[#278EE8] focus-within:border-transparent"
                >
                  Зураг сонгох
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  JPEG, PNG, WebP. Хамгийн ихдээ 5MB.
                </p>
              </div>
            </div>
            
            {errors.avatar && (
              <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
            )}
          </div>

          {/* Remove Avatar */}
          {previewImage && (
            <div>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => {
                  setPreviewImage(null);
                  setFormData(prev => ({ ...prev, avatarUrl: null }));
                }}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Зураг устгах
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="ghost"
          size="md"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Цуцлах
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          className="px-6"
        >
          {isSubmitting ? 'Хадгалж байна...' : 'Хадгалах'}
        </Button>
      </div>
    </form>
  );
};
