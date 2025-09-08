'use client';

import React from 'react';
import { 
  FileText, 
  Building2, 
  Flag, 
  Users, 
  TrendingUp,
  Eye,
  MessageSquare,
  Heart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const statsData = [
  {
    title: 'Нийт мэдээ',
    value: '156',
    change: '+12%',
    changeType: 'positive',
    icon: FileText,
    color: 'blue'
  },
  {
    title: 'Байгууллагууд',
    value: '23',
    change: '+3',
    changeType: 'positive',
    icon: Building2,
    color: 'emerald'
  },
  {
    title: 'Хүлээгдэж буй гомдол',
    value: '7',
    change: '-2',
    changeType: 'negative',
    icon: Flag,
    color: 'amber'
  },
  {
    title: 'Идэвхтэй хэрэглэгч',
    value: '1,234',
    change: '+8%',
    changeType: 'positive',
    icon: Users,
    color: 'purple'
  }
];

const recentActivities = [
  {
    id: '1',
    type: 'news',
    title: 'Шинэ мэдээ нэмэгдсэн',
    description: '"Гэрийн тэжээвэр амьтдын өвлийн арчилгаа" мэдээ',
    time: '5 минутын өмнө',
    icon: FileText
  },
  {
    id: '2',
    type: 'organization',
    title: 'Байгууллага баталгаажсан',
    description: 'Амьтан хамгаалах холбоо баталгаажлаа',
    time: '2 цагийн өмнө',
    icon: Building2
  },
  {
    id: '3',
    type: 'report',
    title: 'Гомдол шийдвэрлэгдсэн',
    description: 'Хэрэглэгчийн гомдлыг шийдвэрлэлээ',
    time: '4 цагийн өмнө',
    icon: Flag
  }
];

const quickActions = [
  {
    title: 'Шинэ мэдээ үүсгэх',
    description: 'Сайтад шинэ мэдээ нэмэх',
    href: '/admin/news/new',
    icon: FileText,
    color: 'blue'
  },
  {
    title: 'Байгууллага баталгаажуулах',
    description: 'Хүлээгдэж буй хүсэлтүүдийг шалгах',
    href: '/admin/organizations/requests',
    icon: Building2,
    color: 'emerald'
  },
  {
    title: 'Гомдол шалгах',
    description: 'Хэрэглэгчдийн гомдлыг шийдвэрлэх',
    href: '/admin/reports',
    icon: Flag,
    color: 'amber'
  }
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-poppins">
            Хяналтын самбар
          </h1>
          <p className="text-slate-600 mt-1">
            BASAR.mn сайтын ерөнхий мэдээлэл
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Сүүлд нэвтэрсэн</div>
          <div className="text-slate-900 font-medium">Өнөөдөр 09:30</div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center">
                <div className={`
                  flex-shrink-0 p-3 rounded-lg
                  ${stat.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                  ${stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                  ${stat.color === 'amber' ? 'bg-amber-100 text-amber-600' : ''}
                  ${stat.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                `}>
                  <Icon size={24} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <div className={`
                      text-sm font-medium
                      ${stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'}
                    `}>
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900 font-poppins">
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activities */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 font-poppins">
              Сүүлийн үйл ажиллагаа
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-2 bg-slate-100 rounded-lg">
                      <Icon size={16} className="text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-slate-600 line-clamp-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 font-poppins">
              Түргэн үйлдлүүд
            </h3>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.title}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-[#278EE8] hover:bg-blue-50 transition-all group"
                  >
                    <div className={`
                      flex-shrink-0 p-2 rounded-lg group-hover:scale-110 transition-transform
                      ${action.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                      ${action.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                      ${action.color === 'amber' ? 'bg-amber-100 text-amber-600' : ''}
                    `}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 group-hover:text-[#278EE8]">
                        {action.title}
                      </div>
                      <div className="text-sm text-slate-600">
                        {action.description}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance overview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 font-poppins">
            Өнөөдрийн тойм
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg mx-auto mb-2">
                <Eye size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-poppins">2,456</div>
              <div className="text-sm text-slate-600">Нийт үзэлт</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg mx-auto mb-2">
                <MessageSquare size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-poppins">89</div>
              <div className="text-sm text-slate-600">Шинэ сэтгэгдэл</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-lg mx-auto mb-2">
                <Heart size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-poppins">340</div>
              <div className="text-sm text-slate-600">Дуртай</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-lg mx-auto mb-2">
                <TrendingUp size={20} />
              </div>
              <div className="text-2xl font-bold text-slate-900 font-poppins">+12%</div>
              <div className="text-sm text-slate-600">Өсөлт</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
