import type { Metadata } from 'next';
import { Bodoni_Moda, Italiana, Cinzel, Plus_Jakarta_Sans, Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import CustomCursor from '@/components/CustomCursor/CustomCursor';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italiana',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUXE — Luxury Bridal & Editorial Makeup Artistry',
  description:
    'Premium bridal and editorial makeup artistry by Luxe Bridal Artistry. Serving brides, fashion editorials, and couture campaigns across India.',
  keywords: ['bridal makeup', 'editorial makeup', 'luxury makeup artist', 'Mumbai', 'LUXE'],
  openGraph: {
    title: "LUXE — Luxury Bridal & Editorial Makeup Artistry",
    description: "Premium bridal and editorial makeup artistry by Luxe Bridal Artistry. Serving brides, fashion editorials, and couture campaigns across India.",
    type: "website",
    locale: "en_US",
    siteName: "LUXE Makeup Artistry",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXE — Luxury Bridal & Editorial Makeup Artistry",
    description: "Premium bridal and editorial makeup artistry by Luxe Bridal Artistry.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodoni.variable} ${italiana.variable} ${cinzel.variable} ${jakarta.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased bg-charcoal overflow-x-hidden text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
