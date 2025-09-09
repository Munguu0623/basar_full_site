import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Нохойн арчилгаа - BASAR',
  description: 'Нохойн эрүүл мэнд, хооллолт, сургалт, арчилгааны талаарх дэлгэрэнгүй мэдээлэл',
};

export default function DogPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-slate-600">
            <li><Link href="/" className="hover:text-emerald-600">Нүүр</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/animals" className="hover:text-emerald-600">Амьтад</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-slate-900">Нохой</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🐕</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Нохойн арчилгаа
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Нохойн эрүүл мэнд, хооллолт, сургалт, арчилгааны талаарх бүрэн мэдээлэл
          </p>
        </div>

        {/* Topic Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/animals/dog/care">
            <Button variant="secondary" size="lg" className="px-8">
              🛁 Арчилгаа
            </Button>
          </Link>
          <Link href="/animals/dog/health">
            <Button variant="secondary" size="lg" className="px-8">
              💉 Эрүүл мэнд
            </Button>
          </Link>
          <Link href="/animals/dog/training">
            <Button variant="secondary" size="lg" className="px-8">
              🎓 Сургалт
            </Button>
          </Link>
          <Link href="/animals/dog/safety">
            <Button variant="secondary" size="lg" className="px-8">
              🛡️ Аюулгүй байдал
            </Button>
          </Link>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/animals/dog/care/feeding">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🍽️</div>
              <h3 className="font-semibold text-lg text-slate-900 mb-3">
                Хооллолт
              </h3>
              <p className="text-slate-600">
                Нохойн насны бүлэг тус бүрийн хоол хүнсний онцлог, хэмжээ
              </p>
            </div>
          </Link>

          <Link href="/animals/dog/training/basic">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🎓</div>
              <h3 className="font-semibold text-lg text-slate-900 mb-3">
                Суурь сургалт
              </h3>
              <p className="text-slate-600">
                Суух, ирэх, хүлээх зэрэг үндсэн тушаалуудыг заах арга
              </p>
            </div>
          </Link>

          <Link href="/animals/dog/health/vaccine-schedule">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">💉</div>
              <h3 className="font-semibold text-lg text-slate-900 mb-3">
                Вакцины календарь
              </h3>
              <p className="text-slate-600">
                Нохойг хэзээ, ямар вакцинаар тариулах талаарх хуваарь
              </p>
            </div>
          </Link>

          <Link href="/animals/dog/care/grooming">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🛁</div>
              <h3 className="font-semibold text-lg text-slate-900 mb-3">
                Арьс арчилгаа
              </h3>
              <p className="text-slate-600">
                Усанд оруулах, үс самлах, хумсны арчилгаа
              </p>
            </div>
          </Link>

          <Link href="/animals/training/socialization">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-semibold text-lg text-slate-900 mb-3">
                Нийгэмшүүлэх
              </h3>
              <p className="text-slate-600">
                Нохойг хүмүүс болон бусад амьтадтай танилцуулах
              </p>
            </div>
          </Link>

          <Link href="/first-aid">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🆘</div>
              <h3 className="font-semibold text-lg text-red-700 mb-3">
                Анхны тусламж
              </h3>
              <p className="text-red-600">
                Яаралтай тохиолдолд хэрэг болох анхны тусламж
              </p>
            </div>
          </Link>
        </div>

        {/* Back Button */}
        <div className="text-center mt-12">
          <Link href="/animals">
            <Button variant="secondary" size="lg" className="px-8">
              ← Амьтдын төв рүү буцах
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
