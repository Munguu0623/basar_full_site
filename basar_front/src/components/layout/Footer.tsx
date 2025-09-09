import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">BASAR</h3>
            <p className="text-gray-600 text-sm">
              Амьтанд хайртай нэгдэл – мэдээ, блог, байгууллага нэг дор.
            </p>
            <div className="flex items-center space-x-4">
              <Facebook size={20} className="text-gray-400 hover:text-blue-600 cursor-pointer" />
              <Twitter size={20} className="text-gray-400 hover:text-blue-400 cursor-pointer" />
              <Instagram size={20} className="text-gray-400 hover:text-pink-600 cursor-pointer" />
              <Mail size={20} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Холбоосууд</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/news" className="text-gray-600 hover:text-gray-900">Мэдээ</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Блог</Link></li>
              <li><Link href="/organizations" className="text-gray-600 hover:text-gray-900">Байгууллагууд</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Тусламж</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="text-gray-600 hover:text-gray-900">Тусламж</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Холбоо барих</Link></li>
              <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Нууцлалын бодлого</Link></li>
              <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Үйлчилгээний нөхцөл</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Мэдээлэл авах</h4>
            <p className="text-gray-600 text-sm mb-4">
              Шинэ мэдээ, блогийн мэдээллийг цаг тухайд нь авах
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="И-мэйл хаяг"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Бүртгэх
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 BASAR. Бүх эрх хуулиар хамгаалагдсан.</p>
        </div>
      </div>
    </footer>
  );
};
