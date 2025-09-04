import { Hero } from '@/components/home/Hero';
import { ValueProps3 } from '@/components/home/ValueProps3';
import { FeaturedNewsGrid } from '@/components/home/FeaturedNewsGrid';
import { TrendingBlogsCarousel } from '@/components/home/TrendingBlogsCarousel';
import { OrganizationsStrip } from '@/components/home/OrganizationsStrip';
import { HowItWorksSteps } from '@/components/home/HowItWorksSteps';
import { CommunityProof } from '@/components/home/CommunityProof';
import { BottomCTA } from '@/components/home/BottomCTA';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ValueProps3 />
      <FeaturedNewsGrid />
      <TrendingBlogsCarousel />
      <OrganizationsStrip />
      <HowItWorksSteps />
      <CommunityProof />
      <BottomCTA />
    </main>
  );
}
