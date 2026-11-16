'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';

function AccessoriesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');

  const subCategories = ['all', 'Keyboards', 'Mice', 'Headsets', 'Monitors', 'Chairs', 'Mousepads'];

  const allAccessories = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'accessories'),
    []
  );

  const filteredAccessories = useMemo(() => {
    return allAccessories
      .filter((p) => {
        if (selectedSubCategory !== 'all' && p.subCategory !== selectedSubCategory) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return b.reviewCount - a.reviewCount;
      });
  }, [allAccessories, selectedSubCategory, sortBy]);

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 text-[#1D1D1F]">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73]">
        <Link href="/" className="hover:text-ember transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">Gaming Peripherals</span>
      </nav>

      {/* Header */}
      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5E7] pb-6">
        <div>
          <h1 className="editorial-headline text-3xl font-semibold tracking-[-0.035em] text-[#1D1D1F] sm:text-5xl tracking-[-0.03em]">
            Gaming <span className="gradient-text">Accessories</span>
          </h1>
          <p className="mt-2 text-sm text-[#6E6E73] sm:text-base">
            Level up your battlestation with esports-grade mechanical keyboards, lightweight mice, and spatial audio headsets.
          </p>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#6E6E73] font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3.5 py-2 font-medium text-[#1D1D1F] outline-none"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Subcategory Pills */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        {subCategories.map((sub) => (
          <button
            key={sub}
            onClick={() => setSelectedSubCategory(sub)}
            className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
              selectedSubCategory === sub
                ? 'bg-[#1D1D1F] text-white'
                : 'border border-[#E5E5E7] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#1D1D1F] hover:text-[#1D1D1F]'
            }`}
          >
            {sub === 'all' ? 'All Peripherals' : sub}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredAccessories.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function AccessoriesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#6E6E73]">Loading peripherals...</div>}>
      <AccessoriesContent />
    </Suspense>
  );
}
