import React from 'react';
import { Search, Edit, Users } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '1',
    title: 'Унш',
    description: 'Найдвартай мэдээ, блогоос хэрэгтэй мэдээлэл олж аваарай'
  },
  {
    icon: Edit,
    number: '2', 
    title: 'Хуваалц',
    description: 'Өөрийн туршлага, зөвлөгөөг community-тэй хуваалцаарай'
  },
  {
    icon: Users,
    number: '3',
    title: 'Холбогд',
    description: 'Ойролцоох verified байгууллагуудтай холбогдоорой'
  }
];

export const HowItWorksSteps: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Хэрхэн ажилладаг вэ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BASAR-ыг ашиглаж амьтанд хайртай хүмүүстэй холбогдох гурван алхам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            
            return (
              <div key={index} className="text-center group">
                {/* Step illustration */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <IconComponent size={40} className="text-blue-600" />
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                  
                  {/* Connection line (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -translate-y-0.5 z-0">
                      <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-300 rounded-full -translate-y-1/2"></div>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Бэлэн үү? Дараа нь эхлүүлье!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Одоо эхлэх
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Дэлгэрэнгүй мэдэх
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
