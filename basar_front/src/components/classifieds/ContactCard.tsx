'use client';

import { useState } from 'react';
import { Phone, Mail, Copy, Share2, MessageCircle, Check, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TClassified } from '@/types';

interface ContactCardProps {
  classified: TClassified;
}

export default function ContactCard({ classified }: ContactCardProps) {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(classified.contactPhone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (error) {
      console.error('Failed to copy phone:', error);
    }
  };

  const handleCopyEmail = async () => {
    if (!classified.contactEmail) return;
    
    try {
      await navigator.clipboard.writeText(classified.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${classified.contactPhone}`;
  };

  const handleEmail = () => {
    if (!classified.contactEmail) return;
    
    const subject = encodeURIComponent(`${classified.title} - зарын талаар`);
    const body = encodeURIComponent(`Сайн байна уу, таны "${classified.title}" зарын талаар асууж байна.`);
    window.location.href = `mailto:${classified.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Сайн байна уу, таны "${classified.title}" зарын талаар асууж байна.`);
    window.open(`https://wa.me/976${classified.contactPhone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: classified.title,
      text: `${classified.title} - BASAR амьтдын зар`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback - copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('🔗 Холбоос хуулагдлаа!');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const maskedPhone = classified.contactPhone.replace(/(\d{4})(\d{4})/, '$1••••');

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
            📞 Холбогдох
          </h3>
          <p className="text-gray-600 text-sm">
            Амьтны эзэнтэй шууд харилцаарай
          </p>
        </div>

        {/* Contact methods */}
        <div className="space-y-4">
          {/* Phone */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-green-900">Утасны дугаар</p>
                <p className="text-green-700 font-mono text-lg">
                  {phoneRevealed ? classified.contactPhone : maskedPhone}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {!phoneRevealed ? (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setPhoneRevealed(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Eye size={16} />
                  Харуулах
                </Button>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleCall}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    📞 Залгах
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={handleCopyPhone}
                    className="w-full"
                  >
                    {copiedPhone ? <Check size={16} /> : <Copy size={16} />}
                    {copiedPhone ? 'Хуулагдлаа' : 'Хуулах'}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Email */}
          {classified.contactEmail && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-900">И-мэйл хаяг</p>
                  <p className="text-blue-700 font-mono text-sm break-all">
                    {classified.contactEmail}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleEmail}
                  className="w-full"
                >
                  ✉️ Мэйл илгээх
                </Button>
                
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleCopyEmail}
                  className="w-full"
                >
                  {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                  {copiedEmail ? 'Хуулагдлаа' : 'Хуулах'}
                </Button>
              </div>
            </div>
          )}

          {/* Quick messaging */}
          {phoneRevealed && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-purple-900">Шуурхай мессеж</p>
                  <p className="text-purple-700 text-sm">
                    WhatsApp-аар хурдан холбогдох
                  </p>
                </div>
              </div>
              
              <Button
                variant="secondary"
                size="md"
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                💬 WhatsApp
              </Button>
            </div>
          )}
        </div>

        {/* Share button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            variant="ghost"
            size="md"
            onClick={handleShare}
            className="w-full"
          >
            <Share2 size={16} />
            Зарыг хуваалцах
          </Button>
        </div>

        {/* Safety note */}
        <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-2">
            <span className="text-amber-600 text-lg">⚠️</span>
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">
                Аюулгүй байдлын зөвлөмж
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Амьтантай уулзахаасаа өмнө олон нийтийн газарт уулзаж, 
                хувийн мэдээллээ болгоомжтой хуваалцаарай.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
