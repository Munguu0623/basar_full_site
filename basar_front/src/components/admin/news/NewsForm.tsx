'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Eye, AlertCircle, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { api } from '@/lib/api';

interface NewsData {
  id?: string;
  title: string;
  slug: string;
  category: string;
  imageUrl?: string;
  excerpt: string;
  content: string;
  status: 'draft' | 'published';
}

interface NewsFormProps {
  mode: 'create' | 'edit';
  initialData?: NewsData;
}

const categoryOptions = [
  { value: 'news', label: 'Мэдээ' },
  { value: 'announcement', label: 'Зарлал' },
  { value: 'rescue', label: 'Аврах' },
  { value: 'adoption', label: 'Үрчлэгээ' },
  { value: 'care', label: 'Арчилгаа' }
];

export const NewsForm: React.FC<NewsFormProps> = ({ mode, initialData }) => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const [formData, setFormData] = useState<NewsData>({
    title: '',
    slug: '',
    category: 'news',
    imageUrl: '',
    excerpt: '',
    content: '',
    status: 'draft',
    ...initialData
  });

  // Form өөрчлөлт хадгалах
  useEffect(() => {
    const initialFormData = {
      title: '',
      slug: '',
      category: 'news',
      imageUrl: '',
      excerpt: '',
      content: '',
      status: 'draft' as const,
      ...initialData
    };
    
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData);
    setHasUnsavedChanges(hasChanges);
  }, [formData, initialData]);

  // Гарах үед сануулах
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Title-аас автомат slug үүсгэх
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof NewsData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Title өөрчлөгдөхөд slug автомат засварлах
      ...(field === 'title' && { slug: generateSlug(value) })
    }));
    
    // Алдаа арилгах
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Client-side validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Гарчиг заавал бөглөнө үү';
    } else if (formData.title.length > 120) {
      newErrors.title = 'Гарчиг 120 тэмдэгтээс хэтрэхгүй';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug заавал бөглөнө үү';
    }

    if (!formData.category) {
      newErrors.category = 'Ангилал сонгоно уу';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Товч агуулга заавал бөглөнө үү';
    } else if (formData.excerpt.length > 160) {
      newErrors.excerpt = 'Товч агуулга 160 тэмдэгтээс хэтрэхгүй';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Агуулга заавал бөглөнө үү';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit
  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const submitData = { ...formData, status };
      
      if (mode === 'create') {
        await api.post('/admin/news', submitData);
      } else {
        await api.patch(`/admin/news/${formData.id}`, submitData);
      }

      setHasUnsavedChanges(false);
      router.push('/admin/news');
    } catch (error: unknown) {
      console.error('Мэдээ хадгалахад алдаа гарлаа:', error);
      
      // Server error-уудыг харуулах
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { errors?: Record<string, string> } } };
        if (apiError.response?.data?.errors) {
          setErrors(apiError.response.data.errors);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      {/* Sticky header */}
      <div className="sticky top-0 bg-white border-b border-slate-200 -mx-6 px-6 py-4 mb-6 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant={formData.status === 'published' ? 'success' : 'default'}>
              {formData.status === 'published' ? 'Нийтлэгдсэн' : 'Ноорог'}
            </Badge>
            {hasUnsavedChanges && (
              <Badge variant="warning" size="sm">
                Хадгалагдаагүй өөрчлөлт
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="md"
              onClick={() => {
                if (hasUnsavedChanges) {
                  if (confirm('Хадгалагдаагүй өөрчлөлт алдагдана. Гарахдаа итгэлтэй байна уу?')) {
                    router.push('/admin/news');
                  }
                } else {
                  router.push('/admin/news');
                }
              }}
            >
              Цуцлах
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => handleSubmit('draft')}
              disabled={saving}
            >
              <Save size={16} className="mr-2" />
              Ноорог хадгалах
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleSubmit('published')}
              disabled={saving}
            >
              <Eye size={16} className="mr-2" />
              Нийтлэх
            </Button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Гарчиг <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Мэдээний гарчиг..."
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] text-lg font-medium ${
              errors.title ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.title && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.title}
            </div>
          )}
          <div className="text-xs text-slate-500 mt-1">
            {formData.title.length}/120 тэмдэгт
          </div>
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            URL Slug <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <span className="text-slate-500 text-sm">basar.mn/news/</span>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              placeholder="url-slug"
              className={`flex-1 px-3 py-2 border rounded-r-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] border-l-0 ${
                errors.slug ? 'border-red-300' : 'border-slate-300'
              }`}
            />
          </div>
          {errors.slug && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.slug}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Ангилал <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] ${
                errors.category ? 'border-red-300' : 'border-slate-300'
              }`}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors.category}
              </div>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Зургийн URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={formData.imageUrl || ''}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8]"
              />
              <Button variant="ghost" size="md" className="p-2">
                <Upload size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Товч агуулга <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => handleInputChange('excerpt', e.target.value)}
            placeholder="Мэдээний товч агуулга..."
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] resize-vertical ${
              errors.excerpt ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.excerpt && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.excerpt}
            </div>
          )}
          <div className="text-xs text-slate-500 mt-1">
            {formData.excerpt.length}/160 тэмдэгт
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Агуулга <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Мэдээний дэлгэрэнгүй агуулга..."
            rows={12}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#278EE8] focus:border-[#278EE8] resize-vertical font-mono text-sm ${
              errors.content ? 'border-red-300' : 'border-slate-300'
            }`}
          />
          {errors.content && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <AlertCircle size={16} />
              {errors.content}
            </div>
          )}
          <div className="text-xs text-slate-500 mt-1">
            Markdown форматыг дэмждэг
          </div>
        </div>
      </div>
    </div>
  );
};
