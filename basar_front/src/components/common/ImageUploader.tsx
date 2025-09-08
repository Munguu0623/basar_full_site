'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Camera, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

export default function ImageUploader({ 
  images, 
  onChange, 
  maxImages = 8,
  className = '' 
}: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((files: FileList) => {
    setError('');
    
    const newImages: string[] = [];
    const remainingSlots = maxImages - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    if (files.length > remainingSlots) {
      setError(`Зөвхөн ${remainingSlots} зураг нэмж болно`);
    }

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Зөвхөн зургийн файл оруулах боломжтой');
        continue;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Зургийн хэмжээ 5MB-аас ихгүй байх ёстой');
        continue;
      }

      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
    }

    if (newImages.length > 0) {
      onChange([...images, ...newImages]);
    }
  }, [images, maxImages, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
    // Reset input value
    e.target.value = '';
  }, [handleFileSelect]);

  const removeImage = useCallback((index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    setError('');
  }, [images, onChange]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Зургууд ({images.length}/{maxImages})
        <span className="text-red-500 ml-1">*</span>
      </label>

      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : images.length === 0
            ? 'border-gray-300 hover:border-gray-400'
            : 'border-gray-200'
        } ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={images.length < maxImages ? openFileDialog : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={images.length >= maxImages}
        />

        {images.length === 0 ? (
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-gray-400">
              <Camera className="w-full h-full" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                🖼️ Амьтны зураг оруулах
              </p>
              <p className="text-sm text-gray-600">
                Зургаа энд чирэж оруулах эсвэл дарж сонгоно уу
              </p>
              <p className="text-xs text-gray-500 mt-2">
                PNG, JPG файл. Максимум {maxImages} зураг, тус бүр 5MB хүртэл
              </p>
            </div>
          </div>
        ) : images.length < maxImages ? (
          <div className="space-y-2">
            <Upload className="mx-auto w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              {maxImages - images.length} зураг цааш нэмж болно
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              ✅ Бүх зураг ({maxImages}) орлоо
            </p>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* Image preview grid */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            >
              <Image
                src={image}
                alt={`Зураг ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              
              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center hover:bg-red-600"
                aria-label={`${index + 1} дугаар зургийг устгах`}
              >
                <X size={14} />
              </button>

              {/* Main photo indicator */}
              {index === 0 && (
                <div className="absolute bottom-2 left-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                    ⭐ Үндсэн
                  </span>
                </div>
              )}

              {/* Photo order number */}
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-black/50 text-white">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help text */}
      <p className="mt-2 text-xs text-gray-500">
        💡 Эхний зураг нь үндсэн зураг болно. Зургуудыг чирж байршлыг өөрчлөх боломжтой.
      </p>
    </div>
  );
}
