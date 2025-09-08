'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export const SocialButtons: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<'google' | 'facebook' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(provider);
    setError(null);

    try {
      // Mock OAuth flow - бодит backend-ээр солигдоно
      // Backend OAuth endpoint руу redirect хийх ёстой
      // window.location.href = `/api/auth/${provider}`;
      
      // Mock амжилттай login
      await new Promise(resolve => setTimeout(resolve, 1500)); // Loading simulation
      
      // Mock JWT cookie үүссэн гэж үзээд profile руу redirect
      router.push('/profile');
      
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setError(`${provider === 'google' ? 'Google' : 'Facebook'}-ээр нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.`);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Error Banner */}
      {error && (
        <div 
          className="bg-red-50/80 border border-red-200/60 rounded-xl p-4 text-red-700 text-sm backdrop-blur-sm"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-700 ml-2"
              aria-label="Алдааны мэдээллийг хаах"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Google Login Button */}
      <Button
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading !== null}
        className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 focus:ring-slate-300 flex items-center justify-center gap-3 font-medium shadow-sm"
        aria-label="Google-ээр нэвтрэх"
      >
        {isLoading === 'google' ? (
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        )}
        {isLoading === 'google' ? 'Нэвтэрж байна...' : 'Google-ээр нэвтрэх'}
      </Button>

      {/* Facebook Login Button */}
      <Button
        onClick={() => handleSocialLogin('facebook')}
        disabled={isLoading !== null}
        className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center justify-center gap-3 font-medium focus:ring-[#1877F2]"
        aria-label="Facebook-ээр нэвтрэх"
      >
        {isLoading === 'facebook' ? (
          <div className="w-5 h-5 border-2 border-blue-200 border-t-white rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        )}
        {isLoading === 'facebook' ? 'Нэвтэрж байна...' : 'Facebook-ээр нэвтрэх'}
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">эсвэл</span>
        </div>
      </div>

      {/* Info text */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Шинэ хэрэглэгч үү?{' '}
          <span className="text-[#278EE8] font-medium">
            Автоматаар бүртгэгдэнэ!
          </span>
        </p>
      </div>
    </div>
  );
};
