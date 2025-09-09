'use client';

import { useState } from 'react';
import { AlertCircle, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ImageUploader from '@/components/common/ImageUploader';
import { TClassifiedCreateRequest, TClassified } from '@/types';

interface ClassifiedFormProps {
  onSubmit: (data: TClassifiedCreateRequest) => void;
  isSubmitting: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const categoryOptions = [
  { value: '', label: 'Ангилал сонгоно уу' },
  { value: 'LOST', label: '🔍 Алдагдсан' },
  { value: 'FOUND', label: '✨ Олдсон' },
  { value: 'ADOPTION', label: '🏠 Үрчлүүлэх' },
  { value: 'MARKETPLACE', label: '💰 Худалдах' },
  { value: 'SERVICE', label: '🔧 Үйлчилгээ' },
];

const animalTypeOptions = [
  { value: '', label: 'Амьтны төрөл сонгоно уу' },
  { value: 'DOG', label: '🐕 Нохой' },
  { value: 'CAT', label: '🐱 Муур' },
  { value: 'OTHER', label: '🐾 Бусад' },
];

const sexOptions = [
  { value: '', label: 'Хүйс' },
  { value: 'M', label: '♂️ Эр' },
  { value: 'F', label: '♀️ Эм' },
];

const ageOptions = [
  { value: '', label: 'Нас' },
  { value: 'BABY', label: '🍼 Бага насны' },
  { value: 'YOUNG', label: '🌱 Залуу' },
  { value: 'ADULT', label: '💪 Насанд хүрсэн' },
];

const sizeOptions = [
  { value: '', label: 'Хэмжээ' },
  { value: 'S', label: '🤏 Жижиг' },
  { value: 'M', label: '🐕 Дунд зэрэг' },
  { value: 'L', label: '🐕‍🦺 Том' },
];

const cities = [
  'Улаанбаатар',
  'Дархан',
  'Эрдэнэт',
  'Чойбалсан',
  'Мөрөн',
  'Ховд',
  'Өлгий',
  'Сайншанд'
];

export default function ClassifiedForm({ onSubmit, isSubmitting }: ClassifiedFormProps) {
  const [formData, setFormData] = useState<TClassifiedCreateRequest>({
    category: '' as TClassified['category'],
    animalType: '' as TClassified['animalType'],
    breed: '',
    sex: null,
    age: null,
    size: null,
    title: '',
    description: '',
    photos: [],
    locationCity: '',
    locationDistrict: '',
    price: null,
    contactPhone: '',
    contactEmail: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Required fields
    if (!formData.category) newErrors.category = 'Ангилал сонгоно уу';
    if (!formData.animalType) newErrors.animalType = 'Амьтны төрөл сонгоно уу';
    if (!formData.title.trim()) newErrors.title = 'Гарчиг оруулна уу';
    if (formData.title.length > 120) newErrors.title = 'Гарчиг 120 тэмдэгтээс хэтэрч болохгүй';
    if (!formData.description.trim()) newErrors.description = 'Тайлбар оруулна уу';
    if (formData.description.length < 30) newErrors.description = 'Тайлбар дор хаяж 30 тэмдэгт байх ёстой';
    if (formData.photos.length === 0) newErrors.photos = 'Дор хаяж 1 зураг оруулна уу';
    if (!formData.locationCity) newErrors.locationCity = 'Хот/аймаг сонгоно уу';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Утасны дугаар оруулна уу';

    // Phone validation
    const phoneRegex = /^[0-9]{8}$/;
    if (formData.contactPhone && !phoneRegex.test(formData.contactPhone.replace(/\D/g, ''))) {
      newErrors.contactPhone = 'Утасны дугаар 8 оронтой байх ёстой';
    }

    // Email validation (optional)
    if (formData.contactEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.contactEmail)) {
        newErrors.contactEmail = 'И-мэйл хаягийн форматыг шалгана уу';
      }
    }

    // Price validation (for marketplace)
    if (formData.category === 'MARKETPLACE') {
      if (!formData.price || formData.price <= 0) {
        newErrors.price = 'Үнэ оруулна уу';
      }
    }

    return newErrors;
  };

  const handleInputChange = (field: keyof TClassifiedCreateRequest, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Clean up data before submit
      const submitData = {
        ...formData,
        breed: formData.breed || null,
        sex: formData.sex || null,
        age: formData.age || null,
        size: formData.size || null,
        locationDistrict: formData.locationDistrict || null,
        price: formData.category === 'MARKETPLACE' ? formData.price : null,
        contactEmail: formData.contactEmail || null,
      };
      
      onSubmit(submitData);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      {!showPreview ? (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header */}
          <div className="text-center pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">📝 Зарын мэдээлэл</h2>
            <p className="text-gray-600">Амьтныхаа мэдээллийг дэлгэрэнгүй бөглөнө үү</p>
          </div>

          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ангилал <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.category ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.category}
                </div>
              )}
            </div>

            {/* Animal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Амьтны төрөл <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.animalType}
                onChange={(e) => handleInputChange('animalType', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.animalType ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                {animalTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.animalType && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.animalType}
                </div>
              )}
            </div>
          </div>

          {/* Animal details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Breed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Үүлдэр
              </label>
              <input
                type="text"
                value={formData.breed || ''}
                onChange={(e) => handleInputChange('breed', e.target.value)}
                placeholder="Жишээ: Герман овчинд"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Sex */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Хүйс
              </label>
              <select
                value={formData.sex || ''}
                onChange={(e) => handleInputChange('sex', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sexOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Нас
              </label>
              <select
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {ageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Хэмжээ
              </label>
              <select
                value={formData.size || ''}
                onChange={(e) => handleInputChange('size', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Зарын гарчиг <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-1">({formData.title.length}/120)</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Жишээ: Алдагдсан хар өнгөтэй нохой"
              maxLength={120}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.title}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дэлгэрэнгүй тайлбар <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 ml-1">({formData.description.length} тэмдэгт)</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Амьтныхаа дэлгэрэнгүй тайлбарыг бичнэ үү..."
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.description}
              </div>
            )}
          </div>

          {/* Photos */}
          <div>
            <ImageUploader
              images={formData.photos}
              onChange={(photos) => handleInputChange('photos', photos)}
              maxImages={8}
            />
            {errors.photos && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.photos}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Хот/Аймаг <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.locationCity}
                onChange={(e) => handleInputChange('locationCity', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.locationCity ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Хот/аймаг сонгоно уу</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.locationCity && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.locationCity}
                </div>
              )}
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дүүрэг/Сум
              </label>
              <input
                type="text"
                value={formData.locationDistrict || ''}
                onChange={(e) => handleInputChange('locationDistrict', e.target.value)}
                placeholder="Жишээ: Сүхбаатар дүүрэг"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Price (for marketplace) */}
          {formData.category === 'MARKETPLACE' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Үнэ (₮) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price || ''}
                onChange={(e) => handleInputChange('price', Number(e.target.value))}
                placeholder="0"
                min="0"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.price && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.price}
                </div>
              )}
            </div>
          )}

          {/* Contact info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Утасны дугаар <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="99887766"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.contactPhone ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.contactPhone && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.contactPhone}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                И-мэйл хаяг
              </label>
              <input
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="example@email.com"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.contactEmail && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  {errors.contactEmail}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => setShowPreview(true)}
              className="flex-1"
            >
              <Eye size={20} />
              Урьдчилан харах
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Хадгалж байна...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Зар нийтлэх
                </>
              )}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-6">
          {/* Preview content would go here */}
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🔍 Урьдчилан харах</h3>
            <p className="text-gray-600 mb-6">Зарын дэлгэрэнгүй харагдах байдал</p>
            
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setShowPreview(false)}
                className="flex-1"
              >
                Засварлах
              </Button>
              
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Хадгалж байна...' : 'Зар нийтлэх'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
