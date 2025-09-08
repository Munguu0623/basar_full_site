'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TOrganization } from '@/types';
import { getVerifiedOrganizations } from '@/lib/api';

interface OrganizationsStripProps {
  initialOrganizations?: TOrganization[];
}

export default function OrganizationsStrip({ initialOrganizations }: OrganizationsStripProps) {
  const [organizations, setOrganizations] = useState<TOrganization[]>(initialOrganizations || []);
  const [loading, setLoading] = useState(!initialOrganizations);

  useEffect(() => {
    if (!initialOrganizations) {
      fetchOrganizations();
    }
  }, [initialOrganizations]);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const data = await getVerifiedOrganizations();
      setOrganizations(data.slice(0, 6));
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏢 Баталгаажсан байгууллагууд
            </h2>
            <p className="text-lg text-gray-600">
              Амьтан хамгаалах, эмчлэх итгэмжлэгдсэн байгууллагууд
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (organizations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4 animate-float">🏢</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Баталгаажсан байгууллагууд
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Амьтан хамгаалах, эмчлэх, сургах итгэмжлэгдсэн байгууллагуудтай холбогдоорой
          </p>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {organizations.map((org, index) => (
            <Link
              key={org.id}
              href={`/organizations/${org.id}`}
              className="group text-center transform transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                {/* Logo */}
                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:from-emerald-200 group-hover:to-teal-200">
                  {org.logo ? (
                    <Image
                      src={org.logo}
                      alt={`${org.name} лого`}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      🏢
                    </div>
                  )}
                </div>

                {/* Verified Badge */}
                {org.verified && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-emerald-600 transition-colors">
                {org.name}
              </h3>
              
              {/* Type/Category */}
              <p className="text-xs text-gray-500">
                {org.name.includes('эмнэлэг') ? '🏥 Эмнэлэг'
                : org.name.includes('хамгаалах') ? '🏠 Хамгаалах төв'
                : org.name.includes('сургалт') ? '🎓 Сургалт'
                : org.name.includes('аврах') ? '🆘 Аврах'
                : '🏢 Байгууллага'}
              </p>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/organizations"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="mr-2">🔍</span>
            Бүх байгууллага үзэх
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
            <div className="text-3xl font-bold text-emerald-600 mb-1">50+</div>
            <div className="text-sm text-gray-600">Бүртгэлтэй байгууллага</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-1">25+</div>
            <div className="text-sm text-gray-600">Баталгаажсан үйлчилгээ</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-1">1000+</div>
            <div className="text-sm text-gray-600">Амьтан тусалсан</div>
          </div>
        </div>
      </div>
    </section>
  );
}