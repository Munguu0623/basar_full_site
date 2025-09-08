'use client';

import { useState } from 'react';
import { Flag, AlertTriangle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ReportButtonProps {
  classifiedId: string;
}

const reportReasons = [
  { value: 'spam', label: '📢 Спам эсвэл давтагдсан зар' },
  { value: 'fake', label: '🚫 Худал мэдээлэл' },
  { value: 'inappropriate', label: '⚠️ Зохисгүй контент' },
  { value: 'scam', label: '💰 Залилан мэхлэх' },
  { value: 'animal_abuse', label: '😢 Амьтны хүчирхийлэл' },
  { value: 'other', label: '🔍 Бусад' },
];

export default function ReportButton({ classifiedId }: ReportButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedReason || description.length < 10) return;
    
    setIsSubmitting(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('✅ Таны мэдэгдлийг хүлээн авлаа. Бид энэ зарыг шалгаж, шаардлагатай арга хэмжээ авна.');
      
      // Reset form
      setSelectedReason('');
      setDescription('');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('❌ Мэдэгдэл илгээхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setShowModal(false);
      setSelectedReason('');
      setDescription('');
    }
  };

  return (
    <>
      {/* Report button */}
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
        aria-label="Зарыг мэдэгдэх"
      >
        <Flag size={16} />
        <span className="hidden sm:inline">Мэдэгдэх</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={handleClose}
            ></div>

            {/* Modal content */}
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Flag className="text-red-500" size={24} />
                  Зар мэдэгдэх
                </h3>
                
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                  aria-label="Хаах"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Reason selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Шалтгаан сонгоно уу <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="space-y-2">
                    {reportReasons.map((reason) => (
                      <label
                        key={reason.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedReason === reason.value
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={reason.value}
                          checked={selectedReason === reason.value}
                          onChange={(e) => setSelectedReason(e.target.value)}
                          className="text-red-600 focus:ring-red-500"
                          disabled={isSubmitting}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {reason.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Тайлбар <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 ml-1">
                      (дор хаяж 10 тэмдэгт)
                    </span>
                  </label>
                  
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Энэ зарт юу буруутай байгааг дэлгэрэнгүй бичнэ үү..."
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none ${
                      description.length > 0 && description.length < 10
                        ? 'border-red-300'
                        : 'border-gray-300'
                    }`}
                    disabled={isSubmitting}
                  />
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className={`text-xs ${
                      description.length < 10 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {description.length}/10 тэмдэгт
                    </p>
                  </div>
                </div>

                {/* Warning note */}
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-amber-600 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-amber-800 mb-1">
                        Анхааруулга
                      </p>
                      <p className="text-xs text-amber-700">
                        Худал мэдэгдэл өгөх нь системийн үйлчилгээнээс хязгаарлагдахад хүргэж болзошгүй.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Цуцлах
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={!selectedReason || description.length < 10 || isSubmitting}
                    className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Илгээж байна...
                      </>
                    ) : (
                      <>
                        <Flag size={16} />
                        Мэдэгдэх
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
