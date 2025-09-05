'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TOrganization } from '@/types';
// import { getVerifiedOrganizations } from '@/lib/api'; // Unused for now
import { Building, MapPin, ArrowRight } from 'lucide-react';

// Mock data for demo
const mockOrgData: TOrganization[] = [
  {
    id: '1',
    name: 'Амьтны эмнэлэг №1',
    logo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    verified: true,
    description: '24 цагийн турш үйлчилгээ үзүүлдэг амьтны эмнэлэг',
    address: 'СБД, 1-р хороо'
  },
  {
    id: '2',
    name: 'Тэжээвэр амьтны дэлгүүр',
    logo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    verified: true,
    description: 'Амьтны хоол, тоглоом, аксессуар',
    address: 'ХУД, 12-р хороо'
  },
  {
    id: '3',
    name: 'Гэрэлтүүлэг амьтны байгууллага',
    logo: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    verified: true,
    description: 'Гэрэлтүүлэг амьтдыг хамгаалах',
    address: 'БГД, 3-р хороо'
  },
  {
    id: '4',
    name: 'Амьтны үрчлэгч төв',
    logo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    verified: true,
    description: 'Эзэнгүй амьтдад шинэ гэр олгох',
    address: 'СХД, 8-р хороо'
  },
  {
    id: '5',
    name: 'Тэжээвэр амьтны сургалт',
    logo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    verified: true,
    description: 'Нохой муурны сахилга батын сургалт',
    address: 'БЗД, 15-р хороо'
  },
  {
    id: '6',
    name: 'Амьтны үү, арчилгаа',
    logo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    verified: true,
    description: 'Үү, арчилгаа, гоо сайхны үйлчилгээ',
    address: 'ЧД, 6-р хороо'
  },
  {
    id: '7',
    name: 'Амьтны хүүхэдтэй харьцах сургалт',
    logo: 'https://www.workingnurse.com/wp-content/uploads/2025/01/Therapy-CHLA.jpg',
    verified: true,
    description: 'Хүүхэдтэй амьтны аюулгүй харьцаа',
    address: 'НТД, 4-р хороо'
  },
  {
    id: '8',
    name: 'Экологийн амьтны төв',
    logo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80',
    verified: true,
    description: 'Зэрлэг амьтныг хамгаалах ажил',
    address: 'БГД, 20-р хороо'
  }
];

export const OrganizationsStrip: React.FC = () => {
  const [organizations, setOrganizations] = useState<TOrganization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call
    setTimeout(() => {
      setOrganizations(mockOrgData);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Итгэлтэй байгууллагууд
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Албан ёсоор баталгаажсан амьтны үйлчилгээ үзүүлэгч байгууллагууд
          </p>
          <Badge variant="verified" className="text-sm px-4 py-2">
            Бүгд verified шошготой
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {organizations.slice(0, 8).map((org) => (
            <Card key={org.id} className="text-center group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl mx-auto flex items-center justify-center overflow-hidden">
                    {org.logo ? (
                      <Image 
                        src={org.logo} 
                        alt={`${org.name} лого`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building size={32} className="text-gray-400" />
                    )}
                  </div>
                  {org.verified && (
                    <div className="absolute -top-1 -right-1">
                      <Badge 
                        variant="verified" 
                        className="p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        title="Албан ёсоор баталгаажсан"
                      >
                        ✓
                      </Badge>
                    </div>
                  )}
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {org.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {org.description}
                </p>
                
                {org.address && (
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <MapPin size={12} />
                    {org.address}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            Бүх байгууллага <ArrowRight size={16} />
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            Байгууллага нэмэх
          </Button>
        </div>
      </div>
    </section>
  );
};

const SkeletonLoader: React.FC = () => (
  <section className="py-16 lg:py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto mb-8 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-full w-32 mx-auto animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-36 animate-pulse"></div>
      </div>
    </div>
  </section>
);
