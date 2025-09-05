import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "BASAR - Амьтанд хайртай нэгдэл",
  description: "Найдвартай мэдээ унш, туршлагаа хуваалц, verified байгууллагыг ол",
  keywords: "амьтан, тэжээвэр амьтан, нохой, муур, эмнэлэг, блог, мэдээ",
  authors: [{ name: "BASAR Team" }],
  openGraph: {
    title: "BASAR - Амьтанд хайртай нэгдэл",
    description: "Найдвартай мэдээ унш, туршлагаа хуваалц, verified байгууллагыг ол",
    type: "website",
    locale: "mn_MN",
  },
  twitter: {
    card: "summary_large_image",
    title: "BASAR - Амьтанд хайртай нэгдэл",
    description: "Найдвартай мэдээ унш, туршлагаа хуваалц, verified байгууллагыг ол",
  },
  robots: "index, follow",
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className={`${inter.variable} ${poppins.variable} font-inter antialiased bg-white text-gray-900`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
