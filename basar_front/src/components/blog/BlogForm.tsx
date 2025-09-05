'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createBlog } from '@/lib/api';
import { TBlogCreateRequest } from '@/types';
import { cn } from '@/lib/utils';

interface BlogFormProps {
  className?: string;
}

export const BlogForm: React.FC<BlogFormProps> = ({ className }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<TBlogCreateRequest>({
    title: '',
    content: '',
    imageUrl: null,
    category: 'LIFESTYLE',
    tags: [],
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<TBlogCreateRequest>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  // Validation
  const validateForm = (): boolean => {
    const newErrors: Partial<TBlogCreateRequest> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Гарчиг оруулна уу';
    } else if (formData.title.length > 120) {
      newErrors.title = 'Гарчиг 120 тэмдэгтээс хэтрэхгүй байх ёстой';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Контент оруулна уу';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Контент дор хаяж 20 тэмдэгт байх ёстой';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name as keyof TBlogCreateRequest]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setGlobalError('Зөвхөн зураг файл оруулах боломжтой');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setGlobalError('Зургийн хэмжээ 5MB-аас бага байх ёстой');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setFormData(prev => ({ ...prev, imageUrl: result }));
      setGlobalError(null);
    };
    reader.readAsDataURL(file);
  };

  // Remove image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setGlobalError(null);

    try {
      const response = await createBlog(formData);
      router.push(`/blog/${response.id}`);
    } catch (error) {
      console.error('Blog create error:', error);
      setGlobalError('Блог нийтлэл үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.back();
  };

  // Text formatting functions
  const insertTextAtCursor = (beforeText: string, afterText: string = '') => {
    if (!textareaRef) return;
    
    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newText = beforeText + selectedText + afterText;
    
    const newContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end);
    
    setFormData(prev => ({ ...prev, content: newContent }));
    
    // Set cursor position after inserted text
    setTimeout(() => {
      if (textareaRef) {
        const newCursorPos = start + beforeText.length + selectedText.length + afterText.length;
        textareaRef.setSelectionRange(newCursorPos, newCursorPos);
        textareaRef.focus();
      }
    }, 0);
  };

  const formatBold = () => insertTextAtCursor('**', '**');
  const formatItalic = () => insertTextAtCursor('*', '*');
  const formatHeading = () => insertTextAtCursor('\n## ', '\n');
  const formatList = () => insertTextAtCursor('\n- ', '\n');
  const formatNumberedList = () => insertTextAtCursor('\n1. ', '\n');
  const formatQuote = () => insertTextAtCursor('\n> ', '\n');
  const formatCode = () => insertTextAtCursor('`', '`');

  // Format line break
  const addLineBreak = () => {
    if (!textareaRef) return;
    const cursorPos = textareaRef.selectionStart;
    const newContent = 
      formData.content.substring(0, cursorPos) + 
      '\n\n' + 
      formData.content.substring(cursorPos);
    
    setFormData(prev => ({ ...prev, content: newContent }));
    
    setTimeout(() => {
      if (textareaRef) {
        textareaRef.setSelectionRange(cursorPos + 2, cursorPos + 2);
        textareaRef.focus();
      }
    }, 0);
  };

  // Preview content with markdown-like formatting
  const renderPreview = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-3 mb-2">$1</h3>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">1. $1</li>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-300 pl-4 italic text-gray-600">$1</blockquote>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/```\n([\s\S]*?)\n```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className={cn('max-w-5xl mx-auto', className)}>
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-3">
              <span className="text-3xl mr-3 animate-bounce">✨</span>
              <h1 className="text-2xl md:text-3xl font-bold">
                Шинэ блог нийтлэл үүсгэх
              </h1>
              <span className="text-3xl ml-3 animate-bounce" style={{animationDelay: '0.5s'}}>📝</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">💡</span>
              <p className="text-pink-100">
                Блогынхоо гарчиг, контент болон зураг оруулаад нийтэлнэ үү
              </p>
              <span className="text-xl">🎨</span>
            </div>
          </div>
        </div>
        
        <div className="p-8 md:p-12">

          {/* Global Error */}
          {globalError && (
            <div 
              role="alert"
              className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700 shadow-lg animate-pulse"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span className="font-medium">{globalError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input */}
            <div className="group">
              <label 
                htmlFor="blog-title"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3"
              >
                <span className="text-lg">📝</span>
                Гарчиг 
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="blog-title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  maxLength={120}
                  className={cn(
                    'w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-300 text-lg font-medium shadow-lg',
                    errors.title 
                      ? 'border-red-300 focus:ring-red-500/25 focus:border-red-500' 
                      : 'border-gray-200 focus:ring-pink-500/25 focus:border-pink-500 hover:border-pink-300'
                  )}
                  placeholder="🎯 Блогийн гарчгийг оруулна уу..."
                  aria-describedby={errors.title ? 'title-error' : undefined}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="text-sm font-medium">{formData.title.length}/120</span>
                </div>
              </div>
              {errors.title && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-red-500">❌</span>
                  <p id="title-error" className="text-sm text-red-600 font-medium">
                    {errors.title}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-blue-500 animate-pulse">💡</span>
                <p className="text-sm text-gray-600">
                  Сонирхолтой, анхаарал татахуйц гарчиг бичээрэй
                </p>
              </div>
              
              {/* Helpful suggestions */}
              {formData.title.length > 0 && formData.title.length < 10 && (
                <div className="mt-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl animate-slideDown">
                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <span className="animate-bounce">💭</span>
                    <span>Гарчгийг арай удаан болгоно уу - илүү анхаарал татахуйц болох болно!</span>
                  </div>
                </div>
              )}
            </div>

            {/* Content Textarea */}
            <div className="group">
              <div className="flex items-center justify-between mb-3">
                <label 
                  htmlFor="blog-content"
                  className="flex items-center gap-2 text-sm font-bold text-gray-800"
                >
                  <span className="text-lg">📖</span>
                  Контент 
                  <span className="text-red-500">*</span>
                </label>
                
                {/* Preview Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={cn(
                      'px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2',
                      isPreviewMode
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    <span>{isPreviewMode ? '👁️' : '✍️'}</span>
                    {isPreviewMode ? 'Засах' : 'Урьдчилан харах'}
                  </button>
                </div>
              </div>

              {/* Formatting Toolbar */}
              {!isPreviewMode && (
                <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 mr-2">📝 Форматлах:</span>
                      
                      <button
                        type="button"
                        onClick={formatBold}
                        className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-gray-300 hover:border-blue-300 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-1"
                        title="Тод (Bold)"
                      >
                        <span className="font-bold">B</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={formatItalic}
                        className="px-3 py-1.5 bg-white hover:bg-blue-50 border border-gray-300 hover:border-blue-300 rounded-lg text-sm italic transition-all duration-200 flex items-center gap-1"
                        title="Налуу (Italic)"
                      >
                        <span className="italic">I</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={formatHeading}
                        className="px-3 py-1.5 bg-white hover:bg-purple-50 border border-gray-300 hover:border-purple-300 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-1"
                        title="Гарчиг"
                      >
                        H2
                      </button>
                      
                      <button
                        type="button"
                        onClick={formatList}
                        className="px-3 py-1.5 bg-white hover:bg-green-50 border border-gray-300 hover:border-green-300 rounded-lg text-sm transition-all duration-200 flex items-center gap-1"
                        title="Жагсаалт"
                      >
                        <span>📋</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={formatNumberedList}
                        className="px-3 py-1.5 bg-white hover:bg-yellow-50 border border-gray-300 hover:border-yellow-300 rounded-lg text-sm transition-all duration-200 flex items-center gap-1"
                        title="Дугаарлагдсан жагсаалт"
                      >
                        <span>🔢</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={formatQuote}
                        className="px-3 py-1.5 bg-white hover:bg-indigo-50 border border-gray-300 hover:border-indigo-300 rounded-lg text-sm transition-all duration-200 flex items-center gap-1"
                        title="Иш татах"
                      >
                        <span>💬</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={formatCode}
                        className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg text-sm font-mono transition-all duration-200 flex items-center gap-1"
                        title="Код"
                      >
                        <span>💻</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={addLineBreak}
                        className="px-3 py-1.5 bg-white hover:bg-pink-50 border border-gray-300 hover:border-pink-300 rounded-lg text-sm transition-all duration-200 flex items-center gap-1"
                        title="Мөр таслах"
                      >
                        <span>↵</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-600 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span>💡</span>
                      <span>Текст сонгоод товч дарж форматла</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>🎨</span>
                      <span>**тод**, *налуу*, ## гарчиг</span>
                    </span>
                  </div>
                </div>
              )}
              
              <div className="relative">
                {!isPreviewMode ? (
                  <textarea
                    ref={setTextareaRef}
                    id="blog-content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={16}
                    className={cn(
                      'w-full px-6 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-300 text-base leading-relaxed resize-y shadow-lg',
                      errors.content 
                        ? 'border-red-300 focus:ring-red-500/25 focus:border-red-500' 
                        : 'border-gray-200 focus:ring-pink-500/25 focus:border-pink-500 hover:border-pink-300'
                    )}
                    placeholder="✍️ Блогийн контентийг энд бичнэ үү...\n\n🎯 Санаа:\n• Амьтны талаар сонирхолтой мэдээлэл\n• Хувийн туршлага, түүх\n• Практик зөвлөгөө\n• Хэрэгтэй мэдлэг\n\n📝 Форматлах жишээ:\n## Гарчиг\n**Тод текст**, *налуу текст*\n- Жагсаалт\n> Иш татах"
                    aria-describedby={errors.content ? 'content-error' : undefined}
                  />
                ) : (
                  <div className="w-full min-h-[400px] px-6 py-4 border-2 border-gray-200 rounded-2xl bg-white shadow-lg">
                    <div className="prose max-w-none">
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: renderPreview(formData.content || 'Урьдчилан харахын тулд контент бичнэ үү...') 
                        }}
                        className="leading-relaxed"
                      />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-1 text-xs font-medium text-gray-600 border">
                  {formData.content.length} тэмдэгт
                </div>
              </div>
              {errors.content && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-red-500">❌</span>
                  <p id="content-error" className="text-sm text-red-600 font-medium">
                    {errors.content}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-green-500 animate-pulse">✨</span>
                <p className="text-sm text-gray-600">
                  Дор хаяж 20 тэмдэгт - уншигчдад хэрэгтэй, сонирхолтой агуулга бичээрэй
                </p>
              </div>
              
              {/* Content length encouragement */}
              {formData.content.length >= 50 && formData.content.length < 200 && (
                <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl animate-slideDown">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <span className="animate-bounce">🌟</span>
                    <span>Сайхан эхлэж байна! Илүү дэлгэрэнгүй болгож мэдээлэл нэмээрэй</span>
                  </div>
                </div>
              )}
              
              {formData.content.length >= 200 && (
                <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl animate-slideDown">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <span className="animate-bounce">🎉</span>
                    <span>Гайхалтай! Маш дэлгэрэнгүй, хэрэгтэй агуулга болж байна</span>
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="group">
              <label 
                htmlFor="blog-category"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3"
              >
                <span className="text-lg">🏷️</span>
                Ангилал 
                <span className="text-gray-400 font-normal">(хүссэн)</span>
              </label>
              <div className="relative">
                <select
                  id="blog-category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as TBlogCreateRequest['category'] }))}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-pink-500/25 focus:border-pink-500 bg-white transition-all duration-300 text-base font-medium shadow-lg hover:border-pink-300 cursor-pointer"
                >
                  <option value="LIFESTYLE">💫 Амьдралын хэв маяг</option>
                  <option value="TIPS">💡 Зөвлөгөө</option>
                  <option value="STORIES">📖 Түүх</option>
                  <option value="HEALTH">🏥 Эрүүл мэнд</option>
                  <option value="TRAINING">🎓 Сургалт</option>
                  <option value="ADOPTION">🏠 Үрчлэлт</option>
                  <option value="OTHER">📝 Бусад</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-purple-500">🎯</span>
                <p className="text-sm text-gray-600">
                  Блогийн агуулгад хамгийн тохирох ангиллыг сонгоно уу
                </p>
              </div>
            </div>

            {/* Tags Input */}
            <div className="group">
              <label 
                htmlFor="blog-tags"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3"
              >
                <span className="text-lg">🏷️</span>
                Таг 
                <span className="text-gray-400 font-normal">(хүссэн)</span>
              </label>
              <div className="relative">
                <input
                  id="blog-tags"
                  type="text"
                  placeholder="🏷️ муур, арчлага, эрүүл_мэнд (таслалаар тусгаарлана)"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-pink-500/25 focus:border-pink-500 transition-all duration-300 text-base shadow-lg hover:border-pink-300"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                    setFormData(prev => ({ ...prev, tags }));
                  }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <span className="text-lg">🔖</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-indigo-500">🔍</span>
                <p className="text-sm text-gray-600">
                  Хайлтад тус болохуйц түлхүүр үгсийг оруулна уу
                </p>
              </div>
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="group/tag inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border-2 border-purple-200 hover:from-pink-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-base">🏷️</span>
                      #{tag}
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = formData.tags?.filter((_, i) => i !== index) || [];
                          setFormData(prev => ({ ...prev, tags: newTags }));
                        }}
                        className="ml-1 hover:bg-red-200 rounded-full p-1 text-red-600 hover:text-red-800 transition-all duration-200 group-hover/tag:scale-110"
                        aria-label={`${tag} таг устгах`}
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <span className="text-lg">🖼️</span>
                Зураг 
                <span className="text-gray-400 font-normal">(хүссэн)</span>
              </label>
              
              {!imagePreview ? (
                <div
                  className="border-3 border-dashed border-pink-300 rounded-3xl p-12 text-center hover:border-pink-500 transition-all duration-300 cursor-pointer bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 group-hover:scale-[1.02] transform shadow-lg hover:shadow-xl"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-gray-600">
                    <div className="mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl text-white animate-bounce">📸</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-medium">
                        <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">🎨 Зураг сонгох</span> эсвэл энд чирэн оруулна уу
                      </p>
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <span>📁</span>
                        PNG, JPG дэмжигдэнэ (максимум 5MB)
                        <span>✨</span>
                      </p>
                      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <span>🐱</span>
                          Амьтны зураг
                        </span>
                        <span className="flex items-center gap-1">
                          <span>🌈</span>
                          Өнгөлөг дизайн
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative group/image">
                  <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover group-hover/image:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full p-3 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-2xl transform hover:scale-110 group-hover/image:scale-100"
                    aria-label="Зургийг устгах"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 text-sm font-medium text-gray-700 shadow-lg">
                    <span className="flex items-center gap-2">
                      <span>✅</span>
                      Зураг орууллаа
                    </span>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Зураг сонгох"
              />
              
              <div className="flex items-center gap-2 mt-3">
                <span className="text-green-500 animate-pulse">💡</span>
                <p className="text-sm text-gray-600">
                  Блогт тохирох зураг нэмэх нь уншигчдын анхаарлыг татахад тусална
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none sm:px-12 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>📝 Нийтэлж байна...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl">🚀</span>
                    <span>Нийтлэх</span>
                    <span className="text-xl">✨</span>
                  </div>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none sm:px-12 py-4 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-gray-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl">❌</span>
                  <span>Цуцлах</span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
