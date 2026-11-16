'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/shared/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto w-[95%] max-w-[1440px] px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#E5E5E7] bg-[#F5F5F7] text-[#6E6E73]">
          <Heart className="h-10 w-10 text-rose-400" />
        </div>
        <h1 className="editorial-headline font-semibold tracking-[-0.035em] mt-6 text-3xl sm:text-5xl text-[#1D1D1F]">
          Your Wishlist is <span className="gradient-text">Empty</span>
        </h1>
        <p className="mt-2 text-sm text-[#6E6E73]">
          Save your favorite gaming rigs, graphics cards, and accessories to review anytime.
        </p>
        <Link
          href="/gaming-pcs"
          className="mt-8 inline-block rounded-full bg-[#1D1D1F] px-7 py-3.5 text-xs font-medium text-white transition-all hover:bg-ember shadow-xs"
        >
          Explore Gaming Desktops
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 text-[#1D1D1F]">
      <div className="border-b border-[#E5E5E7] pb-6">
        <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-5xl text-[#1D1D1F]">
          My Saved <span className="gradient-text">Wishlist</span>
        </h1>
        <p className="mt-1 text-sm text-[#6E6E73]">
          You have {wishlist.length} saved hardware item{wishlist.length > 1 ? 's' : ''}.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
