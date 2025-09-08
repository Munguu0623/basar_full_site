'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TOrganization } from '@/types';

interface OrganizationDetailProps {
  organization: TOrganization;
  relatedOrganizations?: TOrganization[];
}

// Байгууллагын төрөлд тохирсон өнгө
const typeColors = {
  VETERINARY: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  SHELTER: 'bg-blue-100 text-blue-800 border-blue-200',
  RESCUE: 'bg-orange-100 text-orange-800 border-orange-200',
  TRAINING: 'bg-purple-100 text-purple-800 border-purple-200',
  OTHER: 'bg-gray-100 text-gray-800 border-gray-200',
} as const;

const typeLabels = {
  VETERINARY: '🏥 Малын эмнэлэг',
  SHELTER: '🏠 Байр хамгаалах',
  RESCUE: '🆘 Аврах үйлчилгээ',
  TRAINING: '🎓 Сургалт',
  OTHER: '🏢 Бусад',
} as const;

const typeGradients = {
  VETERINARY: 'from-emerald-400 to-green-600',
  SHELTER: 'from-blue-400 to-indigo-600',
  RESCUE: 'from-orange-400 to-red-600',
  TRAINING: 'from-purple-400 to-pink-600',
  OTHER: 'from-gray-400 to-slate-600',
} as const;

type OrganizationType = keyof typeof typeColors;

export default function OrganizationDetail({ organization, relatedOrganizations }: OrganizationDetailProps) {
  const [imageError, setImageError] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const {
    name,
    logo,
    verified,
    description,
    address,
    phone,
    email,
    website,
    coverImage,
    services,
    hours,
  } = organization;

  // Байгууллагын төрөлийг тодорхойлох (demo-д хэрэглэх)
  const orgType: OrganizationType = name.includes('эмнэлэг') ? 'VETERINARY' 
    : name.includes('хамгаалах') ? 'SHELTER'
    : name.includes('аврах') ? 'RESCUE' 
    : name.includes('сургалт') ? 'TRAINING'
    : 'OTHER';

  // Хуваалцах функц
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: description || `${name} - Амьтны тэжээвэр хамгаалах байгууллага`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    // Toast notification would go here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section with Cover & Logo */}
      <div className="relative">
        {/* Cover Image */}
        <div className={`relative h-64 md:h-80 rounded-3xl overflow-hidden bg-gradient-to-br ${typeGradients[orgType]}`}>
          {coverImage ? (
            <Image
              src={coverImage}
              alt={`${name} cover зураг`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-white/90">
                <div className="text-8xl mb-4 animate-float">
                  {orgType === 'VETERINARY' && '🏥'}
                  {orgType === 'SHELTER' && '🏠'}
                  {orgType === 'RESCUE' && '🆘'}
                  {orgType === 'TRAINING' && '🎓'}
                  {orgType === 'OTHER' && '🏢'}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
                <p className="text-xl opacity-90">{typeLabels[orgType]}</p>
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShare}
              className="relative bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-200 focus:ring-2 focus:ring-white/50"
              aria-label="Хуваалцах"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              
              {showShareMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48">
                  <button
                    onClick={copyToClipboard}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    📋 Холбоос хуулах
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Logo & Basic Info */}
        <div className="relative -mt-16 px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
            {/* Logo */}
            <div className="relative">
              {logo && !imageError ? (
                <Image
                  src={logo}
                  alt={`${name} лого`}
                  width={128}
                  height={128}
                  className="w-32 h-32 rounded-3xl bg-white p-4 shadow-xl border-4 border-white object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${typeGradients[orgType]} flex items-center justify-center text-white text-4xl shadow-xl border-4 border-white`}>
                  {orgType === 'VETERINARY' && '🏥'}
                  {orgType === 'SHELTER' && '🏠'}
                  {orgType === 'RESCUE' && '🆘'}
                  {orgType === 'TRAINING' && '🎓'}
                  {orgType === 'OTHER' && '🏢'}
                </div>
              )}
            </div>

            {/* Name & Badges */}
            <div className="flex-1 min-h-32 flex flex-col justify-end">
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${typeColors[orgType]}`}>
                    {typeLabels[orgType]}
                  </span>
                  {verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-emerald-500 text-white animate-pulse-glow">
                      ✓ Баталгаажсан
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{name}</h1>
                {description && (
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              📞 Холбоо барих
            </h2>
            <div className="space-y-4">
              {address && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">📍</span>
                  <div>
                    <p className="font-medium text-gray-900">Хаяг</p>
                    <p className="text-gray-600">{address}</p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm mt-1">
                      📍 Газрын зураг дээр харах
                    </button>
                  </div>
                </div>
              )}
              
              {phone && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">📞</span>
                  <div>
                    <p className="font-medium text-gray-900">Утас</p>
                    <a href={`tel:${phone}`} className="text-blue-600 hover:text-blue-700">
                      {phone}
                    </a>
                  </div>
                </div>
              )}
              
              {email && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">📧</span>
                  <div>
                    <p className="font-medium text-gray-900">И-мэйл</p>
                    <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-700">
                      {email}
                    </a>
                  </div>
                </div>
              )}
              
              {website && (
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">🌐</span>
                  <div>
                    <p className="font-medium text-gray-900">Веб сайт</p>
                    <a 
                      href={website.startsWith('http') ? website : `https://${website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          {services && services.length > 0 && (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                🔧 Үйлчилгээ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-emerald-500">✓</span>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Hours */}
          {hours && (
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                🕒 Ажиллах цаг
              </h3>
              <p className="text-gray-600">{hours}</p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              ⚡ Шуурхай үйлдэл
            </h3>
            <div className="space-y-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
                >
                  📞 Залгах
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
                >
                  📧 И-мэйл илгээх
                </a>
              )}
              {website && (
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
                >
                  🌐 Сайт үзэх
                </a>
              )}
            </div>
          </div>

          {/* Trust Badge */}
          {verified && (
            <div className="bg-gradient-to-br from-emerald-400 to-green-600 rounded-3xl p-6 text-white text-center">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="font-bold mb-1">Баталгаажсан байгууллага</h3>
              <p className="text-sm text-emerald-100">
                Энэ байгууллага албан ёсоор шалгагдаж баталгаажсан байна
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Organizations */}
      {relatedOrganizations && relatedOrganizations.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            🏢 Холбоотой байгууллагууд
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedOrganizations.slice(0, 3).map((relatedOrg) => (
              <Link
                key={relatedOrg.id}
                href={`/organizations/${relatedOrg.id}`}
                className="group p-4 border border-gray-200 rounded-2xl hover:border-emerald-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {relatedOrg.logo ? (
                    <Image
                      src={relatedOrg.logo}
                      alt={`${relatedOrg.name} лого`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-xl object-contain bg-gray-50"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-xl">
                      🏢
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                      {relatedOrg.name}
                    </h3>
                    {relatedOrg.verified && (
                      <span className="text-xs text-emerald-600 font-medium">✓ Баталгаажсан</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
