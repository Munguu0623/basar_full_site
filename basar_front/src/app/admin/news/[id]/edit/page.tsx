'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { NewsForm } from '@/components/admin/news/NewsForm';
import { api } from '@/lib/api';

interface NewsData {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl?: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
}

export default function EditNewsPage() {
  const params = useParams();
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const newsId = params.id as string;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get<NewsData>(`/admin/news/${newsId}`);
        setNewsData(response);
      } catch (err) {
        console.error('Мэдээ ачаалахад алдаа гарлаа:', err);
        setError('Мэдээ олдсонгүй эсвэл алдаа гарлаа');
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNews();
    }
  }, [newsId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-200 rounded-lg animate-shimmer"></div>
          <div>
            <div className="h-8 w-48 bg-slate-200 rounded animate-shimmer mb-2"></div>
            <div className="h-4 w-64 bg-slate-200 rounded animate-shimmer"></div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-slate-200 rounded animate-shimmer"></div>
            <div className="h-10 bg-slate-200 rounded animate-shimmer"></div>
            <div className="h-6 w-24 bg-slate-200 rounded animate-shimmer"></div>
            <div className="h-10 bg-slate-200 rounded animate-shimmer"></div>
            <div className="h-32 bg-slate-200 rounded animate-shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/news">
            <Button variant="ghost" size="md" className="p-2">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-poppins">
              Мэдээ засах
            </h1>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="text-red-600 text-lg font-medium mb-2">
            Алдаа гарлаа
          </div>
          <p className="text-slate-600 mb-4">
            {error || 'Мэдээ олдсонгүй'}
          </p>
          <Link href="/admin/news">
            <Button variant="primary" size="md">
              Буцах
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/news">
          <Button variant="ghost" size="md" className="p-2">
            <ArrowLeft size={20} />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">
            Мэдээ засах
          </h1>
          <p className="text-slate-600 mt-1">
            &ldquo;{newsData.title}&rdquo; мэдээг засварлах
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-slate-200 rounded-xl">
        <NewsForm mode="edit" initialData={newsData} />
      </div>
    </div>
  );
}
