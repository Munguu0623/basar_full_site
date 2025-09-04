import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TValueProp } from '@/types';
import { Newspaper, MessageCircle, Building } from 'lucide-react';

const valueProps: TValueProp[] = [
  {
    icon: 'newspaper',
    title: 'Найдвартай мэдээ',
    description: 'Баталгаажсан эх сурвалжаас олж авсан шинэ мэдээллүүд',
    linkText: 'Дэлгэрэнгүй',
    linkHref: '/news'
  },
  {
    icon: 'message-circle',
    title: 'Community блог',
    description: 'Хэрэглэгчдийн туршлага, зөвлөгөө болон хуваалцсан контент',
    linkText: 'Дэлгэрэнгүй',
    linkHref: '/blog'
  },
  {
    icon: 'building',
    title: 'Verified байгууллага',
    description: 'Албан ёсоор баталгаажсан амьтны байгууллагуудын мэдээлэл',
    linkText: 'Дэлгэрэнгүй',
    linkHref: '/organizations'
  }
];

const IconComponent = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'newspaper':
      return <Newspaper size={32} className="text-orange-600" />;
    case 'message-circle':
      return <MessageCircle size={32} className="text-blue-600" />;
    case 'building':
      return <Building size={32} className="text-green-600" />;
    default:
      return <Newspaper size={32} className="text-gray-600" />;
  }
};

export const ValueProps3: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            BASAR юугаараа онцгой вэ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Амьтанд хайртай хүмүүсийг нэгтгэсэн цогц платформ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <Card key={index} className="text-center group">
              <CardContent className="p-8">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors">
                    <IconComponent icon={prop.icon} />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {prop.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {prop.description}
                </p>
                
                {prop.linkText && prop.linkHref && (
                  <Button 
                    variant="ghost" 
                    size="md"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {prop.linkText} →
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
