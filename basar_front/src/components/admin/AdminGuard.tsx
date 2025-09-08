'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface AdminGuardProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        // ТҮРЭЭМЖЭЭР: Backend API бэлтгэх хүртэл админыг нээж өгөх
        // Бодит хэрэглэлтэд энэ хэсгийг устгаж, доорх коммент хийсэн кодыг ашиглана
        console.log('🔓 Хөгжүүлэлтийн горим: Админ хэсэгт нэвтрэх боломжтой');
        setIsAuthorized(true);
        setIsLoading(false);
        return;
        
        /* Бодит API ашиглах код:
        const response = await api.get<User>('/api/me');
        
        if (response.role === 'ROLE_ADMIN') {
          setIsAuthorized(true);
        } else {
          // Admin биш бол нүүр хуудас руу шилжүүлэх
          router.push('/');
          // Toast харуулах (toast системээр)
          console.warn('Зөвхөн админ хэрэглэгч нэвтрэх боломжтой');
        }
        */
      } catch (error) {
        console.error('Admin эрх шалгахад алдаа гарлаа:', error);
        // Нэвтрээгүй эсвэл алдаа гарсан бол login хуудас руу шилжүүлэх
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, [router]);

  // Ачаалж байгаа үед loading spinner харуулах
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#278EE8]"></div>
          <p className="mt-4 text-slate-600">Эрх шалгаж байна...</p>
        </div>
      </div>
    );
  }

  // Admin эрхтэй бол дэлгэцийг харуулах
  if (isAuthorized) {
    return <>{children}</>;
  }

  // Эрхгүй бол юм ч харуулахгүй (redirect хийгдэж байгаа)
  return null;
};
