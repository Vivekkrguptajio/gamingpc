import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import { StoreProvider } from '@/context/StoreContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ToastContainer from '@/components/shared/ToastContainer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GameForge | Thoughtfully Engineered Gaming PCs & Custom Hardware',
  description:
    'Built to Play Beyond. Discover premium custom-built gaming computers, minimalist setups, and enthusiast hardware.',
  keywords: 'Gaming PC, Custom PC Builder, RTX 4090, Intel i9, High Performance PC, White Theme Gaming PC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} bg-white`}
    >
      <body className="min-h-screen bg-white font-sans text-[#1D1D1F] antialiased flex flex-col justify-between selection:bg-ember selection:text-white">
        <StoreProvider>
          <Suspense fallback={<div className="h-16 w-full border-b border-black/10 bg-white" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
