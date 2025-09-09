'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Send, CheckCircle, AlertCircle, User, Mail, Phone } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  animalType: string;
  urgency: string;
  question: string;
  symptoms: string;
}

export const QuestionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    animalType: '',
    urgency: 'normal',
    question: '',
    symptoms: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const urgencyOptions = [
    { value: 'emergency', label: '🚨 Яаралтай (амьд үхэлтэй)', color: 'text-red-700' },
    { value: 'urgent', label: '⚡ Яаралтай (24 цагийн дотор)', color: 'text-orange-700' },
    { value: 'normal', label: '📝 Энгийн асуулт', color: 'text-emerald-700' }
  ];

  const animalTypes = [
    '🐕 Нохой',
    '🐱 Муур', 
    '🐰 Туулай',
    '🐦 Шувуу',
    '🐠 Загас',
    '🐹 Хомяк',
    '🦎 Мөлхөгч',
    '🐴 Морь',
    '🐄 Мал амьтан',
    '🦎 Бусад'
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Асуулт амжилттай илгээгдлээ!
          </h2>
          <p className="text-slate-600 mb-6">
            Таны асуултыг хүлээн авлаа. Манай мэргэжилтнүүд удахгүй хариулт өгөх болно.
            {formData.urgency === 'emergency' && (
              <span className="block mt-2 text-red-600 font-medium">
                🚨 Яаралтай тохиолдол учир эмчид шууд хандаарай!
              </span>
            )}
          </p>
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-slate-900 mb-2">Хариулт хүлээх хугацаа:</h3>
            <div className="text-sm text-slate-600">
              {formData.urgency === 'emergency' && '🚨 Шууд утсаар холбогдох болно'}
              {formData.urgency === 'urgent' && '⚡ 2-4 цагийн дотор'}
              {formData.urgency === 'normal' && '📝 24 цагийн дотор'}
            </div>
          </div>
          <Button 
            variant="primary" 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                animalType: '',
                urgency: 'normal',
                question: '',
                symptoms: ''
              });
            }}
            className="px-8"
          >
            Өөр асуулт асуух
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Mail size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Асуулт бичиж илгээх</h2>
              <p className="text-blue-100 text-sm">Мэргэжилтнээс дэлгэрэнгүй хариулт авна</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <User size={16} className="inline mr-1" />
                Таны нэр *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Нэрээ оруулна уу"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Phone size={16} className="inline mr-1" />
                Утасны дугаар *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="99xxxxxx"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Mail size={16} className="inline mr-1" />
              И-мэйл хаяг
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="example@email.com"
            />
          </div>

          {/* Animal Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Амьтны төрөл *
            </label>
            <select
              name="animalType"
              value={formData.animalType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              <option value="">Амьтны төрлийг сонгоно уу</option>
              {animalTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Асуултын яаралтай байдал *
            </label>
            <div className="space-y-2">
              {urgencyOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="urgency"
                    value={option.value}
                    checked={formData.urgency === option.value}
                    onChange={handleInputChange}
                    className="mr-3 text-blue-500"
                  />
                  <span className={`${option.color} font-medium`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          {formData.urgency !== 'normal' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <AlertCircle size={16} className="inline mr-1" />
                Ямар шинж тэмдэг ажиглагдаж байна вэ?
              </label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                placeholder="Амьтны одоогийн байдал, шинж тэмдгийг дэлгэрэнгүй бичнэ үү..."
              />
            </div>
          )}

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Асуулт *
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="Таны асуултыг дэлгэрэнгүй бичнэ үү..."
            />
          </div>

          {/* Emergency Warning */}
          {formData.urgency === 'emergency' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">
                    🚨 Яаралтай тохиолдол!
                  </h4>
                  <p className="text-red-700 text-sm">
                    Амьд үхэлтэй холбоотой асуудал бол энэ формоос илүү эхнийд ойр дэх амьтны эмнэлэгт шууд утсаар холбогдоно уу!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="lg"
              className="w-full py-4 text-lg bg-blue-500 hover:bg-blue-600"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Илгээж байна...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Send size={20} />
                  Асуулт илгээх
                </div>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-xs text-slate-600 text-center">
            * Заавал бөглөх талбар. Таны мэдээллийг бид хамгаална.
          </p>
        </div>
      </div>
    </div>
  );
};
