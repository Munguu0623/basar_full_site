import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import Image from 'next/image';

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

// Mock function - Бодитоор API дуудах ёстой
async function getBlogDetail(id: string) {
  // TODO: Бодит API endpoint дуудах
  // return api<TBlogResponse>(`/blog/${id}`);
  
  // Mock data
  return {
    id,
    title: 'Амьтан хайрлах талаар',
    content: `Амьтан хайрлах бол хүний амьдралд маш чухал зүйл юм. Амьтад бидний найз нөхөд, гэр бүлийн гишүүд болдог.

Амьтан хайрлах нь:
- Хайр энхрийг төрүүлдэг
- Хариуцлага мэдрэмжийг хөгжүүлдэг  
- Амьдралыг баялагжуулдаг
- Сэтгэл санааны эрүүл мэндэд сайнаар нөлөөлдөг

Тийм учраас амьтдаа хайртай хандаж, тэдгээрийг хамгаалж, асрах хэрэгтэй.`,
    imageUrl: '/hero_image.png',
    author: { 
      id: 'user_123', 
      name: 'Test User' 
    },
    createdAt: new Date().toISOString(),
  };
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const blog = await getBlogDetail(id);
    
    return {
      title: `${blog.title} | BASAR Blog`,
      description: blog.content.slice(0, 160) + '...',
      openGraph: {
        title: blog.title,
        description: blog.content.slice(0, 160) + '...',
        images: blog.imageUrl ? [blog.imageUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Блог олдсонгүй | BASAR',
    };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  
  let blog;
  try {
    blog = await getBlogDetail(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardContent className="p-0">
            {/* Hero Image */}
            {blog.imageUrl && (
              <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-t-2xl">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {blog.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {blog.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{blog.author.name}</span>
                  </div>
                  
                  <span>•</span>
                  
                  <time dateTime={blog.createdAt}>
                    {new Date(blog.createdAt).toLocaleDateString('mn-MN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {blog.content}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex gap-4">
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Таалагдсан
                  </button>
                  
                  <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Хуваалцах
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
