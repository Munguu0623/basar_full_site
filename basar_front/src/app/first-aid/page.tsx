'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Heart, MessageSquare, Bot } from 'lucide-react';
import { AIChatInterface } from '@/components/common/AIChatInterface';
import { QuestionForm } from '@/components/common/QuestionForm';

// export const metadata: Metadata = {
//   title: 'Анхны тусламж - BASAR',
//   description: 'Амьтанд зориулсан AI туслах - асуулт асуугаад шуурхай хариулт аваарай',
//   keywords: 'анхны тусламж, амьтан, AI туслах, асуулт хариулт, chatbot',
// };

export default function FirstAidPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'form'>('chat');

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50">
      {/* Emergency Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <AlertTriangle size={24} className="text-emerald-100" />
            </div>
            <h1 className="text-3xl font-bold">АНХНЫ ТУСЛАМЖ</h1>
          </div>
          <p className="text-emerald-100 text-lg mb-6 opacity-95 max-w-2xl mx-auto">
            Амьтдын эрүүл мэнд, анхны тусламжийн талаар шуурхай тусламж авна
          </p>
          
          {/* Tab Selection */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 rounded-xl font-medium transition-all shadow-md ${
                activeTab === 'chat'
                  ? 'bg-white text-emerald-700 shadow-xl scale-105'
                  : 'bg-emerald-500/80 text-white hover:bg-emerald-400/90 backdrop-blur-sm'
              }`}
            >
              <Bot size={20} className="inline mr-2" />
              AI-тай ярилцах
            </button>
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-3 rounded-xl font-medium transition-all shadow-md ${
                activeTab === 'form'
                  ? 'bg-white text-emerald-700 shadow-xl scale-105'
                  : 'bg-emerald-500/80 text-white hover:bg-emerald-400/90 backdrop-blur-sm'
              }`}
            >
              <MessageSquare size={20} className="inline mr-2" />
              Асуулт бичих
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-600">
            <li><Link href="/" className="hover:text-emerald-600">Нүүр</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/animals" className="hover:text-emerald-600">Амьтад</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-slate-900">Анхны тусламж</li>
          </ol>
        </nav>

        {/* Main Content */}
        <section className="py-8">
          {activeTab === 'chat' && <AIChatInterface />}
          {activeTab === 'form' && <QuestionForm />}
        </section>

        {/* Back to Animals Center */}
        <section className="text-center">
          <div className="bg-emerald-50 rounded-xl p-8">
            <Heart className="mx-auto mb-4 text-emerald-600" size={48} />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Амьтныхаа эрүүл мэндийг хамгаалаарай
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              AI туслахаас гадна амьтдын арчилгаа, сургалт, эрүүл мэндийн талаар илүү их мэдээлэл аваарай
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/animals">
                <Button variant="primary" size="lg" className="px-8">
                  🐾 Амьтдын төв рүү буцах
                </Button>
              </Link>
              <Link href="/organizations">
                <Button variant="secondary" size="lg" className="px-8">
                  🏥 Эмнэлэг хайх
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
