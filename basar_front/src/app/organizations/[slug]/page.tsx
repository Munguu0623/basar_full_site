import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import OrganizationDetail from '@/components/org/OrganizationDetail';
import { TOrganization } from '@/types';

interface OrganizationPageProps {
  params: {
    slug: string;
  };
}

// Mock функц - өнөөдөр демо зорилгоор
async function getOrganization(slug: string): Promise<{ organization: TOrganization; relatedOrganizations: TOrganization[] } | null> {
  try {
    // Real app дээр API дуудна
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/organizations/${slug}`, {
      next: { revalidate: 300 }, // 5 минут cache
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch organization:', error);
    return null;
  }
}

// Dynamic metadata generation
export async function generateMetadata(
  { params }: OrganizationPageProps
): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getOrganization(resolvedParams.slug);
  
  if (!data) {
    return {
      title: 'Байгууллага олдсонгүй | BASAR',
    };
  }

  const { organization } = data;

  return {
    title: `${organization.name} | BASAR - Амьтан хамгаалах платформ`,
    description: organization.description || `${organization.name} - Амьтан хамгаалах байгууллага`,
    keywords: `${organization.name}, амьтан, байгууллага, ${organization.services?.join(', ')}`,
    openGraph: {
      title: organization.name,
      description: organization.description || `${organization.name} - Амьтан хамгаалах байгууллага`,
      type: 'website',
      images: organization.logo ? [{ url: organization.logo }] : [],
    },
    alternates: {
      canonical: `/organizations/${resolvedParams.slug}`,
    },
  };
}

export default async function OrganizationPage({ params }: OrganizationPageProps) {
  const resolvedParams = await params;
  const data = await getOrganization(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  const { organization, relatedOrganizations } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              🏠 Нүүр
            </Link>
            <span>/</span>
            <Link href="/organizations" className="hover:text-gray-700 transition-colors">
              Байгууллагууд
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">
              {organization.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrganizationDetail 
          organization={organization} 
          relatedOrganizations={relatedOrganizations}
        />
      </div>

      {/* Back to list button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center">
          <Link
            href="/organizations"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Бүх байгууллага руу буцах
          </Link>
        </div>
      </div>

      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": organization.name,
            "description": organization.description,
            "address": organization.address ? {
              "@type": "PostalAddress",
              "streetAddress": organization.address,
            } : undefined,
            "telephone": organization.phone,
            "email": organization.email,
            "url": organization.website,
            "logo": organization.logo,
            "sameAs": organization.website ? [organization.website] : undefined,
          }),
        }}
      />
    </div>
  );
}

// Generate static paths for ISR (Incremental Static Regeneration)
export async function generateStaticParams() {
  // Real app дээр DB-аас авна
  return [
    { slug: '1' },
    { slug: '2' },
    { slug: '3' },
  ];
}
