import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import OrganizationList from '@/components/org/OrganizationList';

// SEO metadata
export const metadata: Metadata = {
  title: 'Байгууллагууд | BASAR - Амьтан хамгаалах платформ',
  description: 'Амьтан хамгаалах, эмчлэх, үрчлэх байгууллагуудын жагсаалт. Баталгаажсан байгууллагуудаас үйлчилгээ авах, мэдээлэл олж авах.',
  keywords: 'амьтан, байгууллага, малын эмнэлэг, үрчлэх, хамгаалах, эмчилгээ, сургалт',
  openGraph: {
    title: 'Байгууллагууд - BASAR',
    description: 'Амьтан хамгаалах байгууллагуудтай холбогдоорой',
    type: 'website',
  },
};

export default async function OrganizationsPage() {
  // Server-side дээр анхны өгөгдлийг авах (demo зорилгоор хоосон)
  const initialData = {
    organizations: [],
    totalCount: 0,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-float">🏢</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Амьтан хамгаалах байгууллагууд
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Амьтан хамгаалах, эмчлэх, сургах байгууллагуудын баталгаажсан жагсаалт. 
              Та өөрийн хэрэгцээнд тохирсон байгууллагыг олж, холбогдож болно.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/organizations/apply"
                className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-2xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2">🚀</span>
                Байгууллага бүртгүүлэх
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <span className="mr-2">📰</span>
                Мэдээ үзэх
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-emerald-100">Бүртгэлтэй байгууллага</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">25+</div>
              <div className="text-emerald-100">Баталгаажсан үйлчилгээ</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-emerald-100">Амьтан тусалсан</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
            🏷️ Хурдан шүүлт
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/organizations?type=VETERINARY"
              className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors"
            >
              🏥 Малын эмнэлэг
            </Link>
            <Link
              href="/organizations?type=SHELTER"
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              🏠 Байр хамгаалах
            </Link>
            <Link
              href="/organizations?type=RESCUE"
              className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
            >
              🆘 Аврах үйлчилгээ
            </Link>
            <Link
              href="/organizations?type=TRAINING"
              className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
            >
              🎓 Сургалт
            </Link>
            <Link
              href="/organizations?verified=true"
              className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors"
            >
              ✓ Баталгаажсан
            </Link>
          </div>
        </div>

        {/* Organizations List */}
        <Suspense fallback={<div className="p-8 text-center">Байгууллагуудыг ачаалж байна...</div>}>
          <OrganizationList initialData={initialData} />
        </Suspense>
      </div>

      {/* Bottom CTA Section */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Та байгууллага эсвэл үйлчилгээ санал болгох уу?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Амьтан хамгаалах, эмчлэх үйлчилгээ үзүүлдэг бол бидэнтэй нэгдэж, 
              олон хүнд хүрч түгээрэй.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/organizations/apply"
                className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-medium rounded-2xl hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2">📝</span>
                Байгууллага бүртгүүлэх
              </Link>
              <a
                href="mailto:support@basar.mn"
                className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-medium rounded-2xl border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <span className="mr-2">📧</span>
                Холбоо барих
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
