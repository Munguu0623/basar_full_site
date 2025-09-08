'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface OrganizationApplyFormData {
  name: string;
  description: string;
  type: string;
  city: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  logo: File | null;
}

interface FormErrors {
  [key: string]: string;
}

const orgTypes = [
  { value: '', label: 'Төрлөө сонгоно уу' },
  { value: 'VETERINARY', label: '🏥 Малын эмнэлэг' },
  { value: 'SHELTER', label: '🏠 Байр хамгаалах' },
  { value: 'RESCUE', label: '🆘 Аврах үйлчилгээ' },
  { value: 'TRAINING', label: '🎓 Сургалт' },
  { value: 'OTHER', label: '🏢 Бусад' },
];

const cities = [
  { value: '', label: 'Хотоо сонгоно уу' },
  { value: 'UB', label: '🏙️ Улаанбаатар' },
  { value: 'ERDENET', label: '🏭 Эрдэнэт' },
  { value: 'DARKHAN', label: '🏘️ Дархан' },
  { value: 'CHOIBALSAN', label: '🌾 Чойбалсан' },
  { value: 'OTHER', label: '🏞️ Бусад' },
];

export default function OrganizationApplyForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<OrganizationApplyFormData>({
    name: '',
    description: '',
    type: '',
    city: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    logo: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Байгууллагын нэр заавал оруулна уу';
    }

    if (!formData.type) {
      newErrors.type = 'Байгууллагын төрлийг сонгоно уу';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'И-мэйл хаяг заавал оруулна уу';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'И-мэйл хаягийн формат буруу байна';
    }

    if (!formData.city) {
      newErrors.city = 'Хотыг сонгоно уу';
    }

    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Утасны дугаарын формат буруу байна';
    }

    if (formData.website && !formData.website.includes('.')) {
      newErrors.website = 'Веб сайтын хаягийн формат буруу байна';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, logo: 'Зургийн хэмжээ 5MB-аас бага байх ёстой' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, logo: 'Зөвхөн зураг файл оруулах боломжтой' }));
        return;
      }

      setFormData(prev => ({ ...prev, logo: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear logo error
      if (errors.logo) {
        setErrors(prev => ({ ...prev, logo: '' }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        router.push('/organizations');
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Хүсэлт амжилттай илгээгдлээ!
          </h2>
          <p className="text-gray-600 mb-6">
            Таны байгууллага бүртгүүлэх хүсэлт хүлээн авлаа. Бид 2-3 хоногийн дотор шалгаж, хариу өгөх болно.
          </p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
            <p className="text-emerald-800 text-sm">
              📧 Баталгаажуулах мэйл {formData.email} хаяг руу илгээгдлээ
            </p>
          </div>
          <button
            onClick={() => router.push('/organizations')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-medium hover:bg-emerald-700 transition-colors"
          >
            Байгууллагууд руу буцах
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🏢</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Байгууллага бүртгүүлэх
          </h1>
          <p className="text-gray-600">
            Амьтан хамгаалах, эмчлэх байгууллагаа бидэнтэй нэгдээрэй
          </p>
        </div>

        {/* Error banner */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <span>❌</span>
              <span className="font-medium">Алдаа гарлаа</span>
            </div>
            <p className="text-red-700 text-sm mt-1">
              Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Байгууллагын нэр */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Байгууллагын нэр *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 ${
                errors.name ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="Жишээ: Амьтан хайр малын эмнэлэг"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Төрөл */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Байгууллагын төрөл *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 appearance-none bg-white ${
                errors.type ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              {orgTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
          </div>

          {/* И-мэйл */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              И-мэйл хаяг *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 ${
                errors.email ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="info@organization.mn"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Хот */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              Хот *
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 appearance-none bg-white ${
                errors.city ? 'border-red-300' : 'border-gray-200'
              }`}
            >
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Утас */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Утасны дугаар
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 ${
                errors.phone ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="7700-1234"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Хаяг */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Хаяг
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200"
              placeholder="Дүүрэг, хороо, гудамж"
            />
          </div>

          {/* Веб сайт */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Веб сайт
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 ${
                errors.website ? 'border-red-300' : 'border-gray-200'
              }`}
              placeholder="https://www.organization.mn"
            />
            {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website}</p>}
          </div>

          {/* Тайлбар */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Тайлбар
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400 transition-all duration-200 resize-none"
              placeholder="Байгууллагын үйл ажиллагаа, зорилго, үзүүлэх үйлчилгээний талаар товч тайлбар бичээрэй..."
            />
          </div>

          {/* Лого */}
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
              Лого зураг
            </label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-gray-200">
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  🏢
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  📁 Зураг сонгох
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG форматтай, 5MB-аас бага хэмжээтэй
                </p>
              </div>
            </div>
            {errors.logo && <p className="text-red-600 text-sm mt-1">{errors.logo}</p>}
          </div>

          {/* Submit button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-2xl font-medium transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                  </svg>
                  Илгээж байна...
                </span>
              ) : (
                '🚀 Хүсэлт илгээх'
              )}
            </button>
          </div>

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">ℹ️</span>
              <div className="text-blue-800 text-sm">
                <p className="font-medium mb-1">Анхаар:</p>
                <ul className="space-y-1">
                  <li>• Хүсэлт хүлээн авсны дараа 2-3 хоногийн дотор шалгана</li>
                  <li>• Баталгаажсаны дараа та админ эрх авч үйл ажиллагаагаа удирдах боломжтой</li>
                  <li>• Асуулт гарвал <strong>support@basar.mn</strong> руу хандаарай</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
