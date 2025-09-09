'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  BarChart3, 
  FileText, 
  Building2, 
  Flag, 
  Home,
  Menu,
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    name: 'Хяналтын самбар',
    href: '/admin',
    icon: BarChart3,
    exact: true
  },
  {
    name: 'Мэдээ удирдах',
    href: '/admin/news',
    icon: FileText,
    exact: false
  },
  {
    name: 'Байгууллагууд',
    href: '/admin/organizations',
    icon: Building2,
    exact: false
  },
  {
    name: 'Гомдол шийдвэрлэлт',
    href: '/admin/reports',
    icon: Flag,
    exact: false
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-slate-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="/basar_logo.png"
                  alt="BASAR лого"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative h-6 w-20">
                <Image
                  src="/basar_title.png"
                  alt="BASAR.mn"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-lg hover:bg-slate-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      active 
                        ? "bg-[#278EE8] text-white shadow-sm" 
                        : "text-slate-700 hover:text-[#278EE8] hover:bg-blue-50"
                    )}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-slate-200" />

            {/* Bottom navigation */}
            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
              >
                <Home size={18} />
                Сайт руу буцах
              </Link>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors w-full text-left"
              >
                <Settings size={18} />
                Тохиргоо
              </button>
              <button
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut size={18} />
                Гарах
              </button>
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top header */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-slate-100 lg:hidden"
                >
                  <Menu size={20} />
                </button>
                <h1 className="text-xl font-semibold text-slate-900 font-poppins">
                  Админ удирдлага
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-slate-600">
                  Сайн байна уу, <span className="font-medium text-slate-900">Админ</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-[#278EE8] to-[#F48C06] rounded-full flex items-center justify-center text-white text-sm font-medium">
                  А
                </div>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
