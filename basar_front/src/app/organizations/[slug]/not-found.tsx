import Link from 'next/link';

export default function OrganizationNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto text-center px-4">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          {/* 404 Animation */}
          <div className="text-6xl mb-4 animate-bounce">🐾</div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Байгууллага олдсонгүй
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Таны хайж буй байгууллага олдсонгүй байна. 
            Магадгүй URL буруу байгаа эсвэл байгууллага устгагдсан байж болно.
          </p>

          {/* Cute illustration */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 mb-6">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-sm text-gray-500">
              Амьтан гэр бүлээ хайж олж чадахгүй байна...
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Link
              href="/organizations"
              className="block w-full bg-emerald-600 text-white font-medium py-3 px-4 rounded-2xl hover:bg-emerald-700 transition-colors"
            >
              🏢 Бүх байгууллага үзэх
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              🏠 Нүүр хуудас руу буцах
            </Link>
          </div>

          {/* Help text */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Байгууллага бүртгүүлэх хүсэлтэй бол{' '}
              <Link 
                href="/organizations/apply" 
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                энд дарж бүртгүүлээрэй
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
