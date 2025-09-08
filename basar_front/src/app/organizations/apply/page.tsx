import { Metadata } from 'next';
import Link from 'next/link';
import OrganizationApplyForm from '@/components/org/OrganizationApplyForm';

// SEO metadata
export const metadata: Metadata = {
  title: 'Байгууллага бүртгүүлэх | BASAR - Амьтан хамгаалах платформ',
  description: 'Амьтан хамгаалах, эмчлэх байгууллагаа BASAR платформ дээр бүртгүүлж, олон хүнд хүрээрэй. Хялбар бүртгэлийн процесс.',
  keywords: 'байгууллага бүртгүүлэх, амьтан, эмнэлэг, хамгаалах төв, сургалт, үйлчилгээ',
  openGraph: {
    title: 'Байгууллага бүртгүүлэх - BASAR',
    description: 'Амьтан хамгаалах байгууллагаа бидэнтэй нэгдээрэй',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OrganizationApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              🏠 Нүүр
            </Link>
            <span>/</span>
            <Link href="/organizations" className="hover:text-gray-700 transition-colors">
              Байгууллагууд
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              Бүртгүүлэх
            </span>
          </nav>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-bounce">🤝</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Байгууллага бүртгүүлэх
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Амьтан хамгаалах, эмчлэх үйлчилгээ үзүүлдэг байгууллага бол бидэнтэй нэгдэж, 
              олон хүнд хүрч, нөлөө үзүүлээрэй.
            </p>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-bold text-gray-900 mb-2">Илүү олон хүн</h3>
                <p className="text-sm text-gray-600">Платформын олон хэрэглэгчид таны үйлчилгээг олж хэрэглэх боломжтой</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-bold text-gray-900 mb-2">Итгэл үнэмшил</h3>
                <p className="text-sm text-gray-600">Баталгаажсан байгууллага болж, хэрэглэгчдийн итгэлийг олох</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
                <div className="text-3xl mb-3">🆓</div>
                <h3 className="font-bold text-gray-900 mb-2">Үнэ төлбөргүй</h3>
                <p className="text-sm text-gray-600">Бүртгэл болон платформ ашиглах бүрэн үнэ төлбөргүй</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🚀 Бүртгэлийн алхмууд
            </h2>
            <p className="text-gray-600">
              Энгийн 3 алхмаар байгууллагаа бүртгүүлээрэй
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Мэдээлэл бөглөх</h3>
              <p className="text-gray-600 text-sm">Байгууллагын үндсэн мэдээлэл, холбоо барих мэдээлэл оруулах</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Шалгалт хүлээх</h3>
              <p className="text-gray-600 text-sm">2-3 хоногийн дотор бидний баг таны мэдээллийг шалгаж баталгаажуулна</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Идэвхжүүлэх</h3>
              <p className="text-gray-600 text-sm">Баталгаажсны дараа платформ дээр профайл таны идэвхжиж харагдана</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OrganizationApplyForm />
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Асуулт байна уу?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Бүртгэлийн процессын талаар асуулт байвал бидэнтэй холбогдоорой. 
            Бид танд туслахад бэлэн байна.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@basar.mn"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">📧</span>
              И-мэйлээр асуух
            </a>
            <a
              href="tel:+976-7700-1234"
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-200"
            >
              <span className="mr-2">📞</span>
              Утсаар холбогдох
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ❓ Түгээмэл асуулт хариулт
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Бүртгэл хэдэн хоног үргэлжилнэ вэ?</h3>
              <p className="text-gray-600">Мэдээлэл бөглөх 5-10 минут, манай багийн шалгалт 2-3 хоног үргэлжилнэ.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Ямар байгууллага бүртгүүлэх боломжтой вэ?</h3>
              <p className="text-gray-600">Амьтан хамгаалах, эмчлэх, сургах, үрчлэх үйлчилгээ үзүүлдэг бүх байгууллага бүртгүүлэх боломжтой.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Төлбөр төлөх шаардлагатай юу?</h3>
              <p className="text-gray-600">Үгүй, бүртгэл болон платформ ашиглах бүрэн үнэ төлбөргүй.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Хүсэлт татгалзагдвал яах вэ?</h3>
              <p className="text-gray-600">Татгалзсан шалтгаанаа тайлбарлаж, засвар хийх зөвлөмж өгөх болно.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
