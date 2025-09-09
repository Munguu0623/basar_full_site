import { AnimalLanding } from '@/components/common/AnimalLanding';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Амьтдын төв - BASAR',
  description: 'Тэжээвэр амьтныхаа эрүүл мэнд, арчилгаа, сургалтын талаар бүх мэдээллийг нэг дороос олоорой',
  keywords: 'амьтан, тэжээвэр амьтан, нохой, муур, арчилгаа, сургалт, эрүүл мэнд, анхны тусламж',
  openGraph: {
    title: 'Амьтдын төв - BASAR',
    description: 'Тэжээвэр амьтныхаа эрүүл мэнд, арчилгаа, сургалтын талаар бүх мэдээллийг нэг дороос олоорой',
    type: 'website',
  },
};

export default function AnimalsPage() {
  return <AnimalLanding />;
}
