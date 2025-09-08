'use client';

import React from 'react';
import Image from 'next/image';
import { SocialButtons } from '@/components/auth/SocialButtons';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/30 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="w-12 h-12 relative">
            <Image
              src="/basar_logo.png"
              alt="BASAR лого"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="relative h-10 w-32">
            <Image
              src="/basar_title.png"
              alt="BASAR.mn"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          BASAR-д тавтай морилно уу
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Амьтадын орчин дахь нэгдсэн платформ
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/90 py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-slate-200/60 backdrop-blur-sm">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">
                Нэвтрэх
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                Та дараах аргуудын аль нэгээр нэвтэрч орно уу
              </p>
            </div>

            <SocialButtons />

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Нэвтрэх нь манай{' '}
                <a href="/terms" className="text-[#278EE8] hover:underline">
                  Үйлчилгээний нөхцөл
                </a>{' '}
                ба{' '}
                <a href="/privacy" className="text-[#278EE8] hover:underline">
                  Нууцлалын бодлого
                </a>-той танилцаж зөвшөөрсөн гэсэн үг
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
