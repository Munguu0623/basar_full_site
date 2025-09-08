'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { NewsForm } from '@/components/admin/news/NewsForm';

export default function NewNewsPage() {
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
            Шинэ мэдээ үүсгэх
          </h1>
          <p className="text-slate-600 mt-1">
            Сайт дээр нийтлэх шинэ мэдээ бэлтгэнэ үү
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-slate-200 rounded-xl">
        <NewsForm mode="create" />
      </div>
    </div>
  );
}
