'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ClassifiedForm from '@/components/classifieds/ClassifiedForm';
import { TClassifiedCreateRequest } from '@/types';

export default function CreateClassifiedPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (_data: TClassifiedCreateRequest) => {
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success response - generate fake ID
      const newId = Math.random().toString(36).substring(7);
      
      // Show success message
      alert('🎉 Зар амжилттай үүслээ!');
      
      // Redirect to detail page
      router.push(`/classifieds/${newId}`);
    } catch (error) {
      console.error('Error creating classified:', error);
      alert('❌ Зар үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <span className="text-5xl">📝</span>
            Шинэ зар үүсгэх
            <span className="text-5xl">🐾</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Амьтныхаа мэдээллийг дэлгэрэнгүй бөглөж, 
            олон хүнд хүргэхийн тулд зарыг үүсгээрэй.
          </p>
        </div>

        {/* Back navigation */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Буцах
          </button>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <ClassifiedForm 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
