'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  ChevronRight,
  Filter,
  ShoppingCart,
  Star,
  Search,
} from 'lucide-react';
import { COMPONENTS } from '@/data/components';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { ComponentItem } from '@/types';

function ComponentsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc'>('popularity');

  const { addToCart } = useStore();

  const categories = [
    { id: 'all', label: 'All Components' },
    { id: 'processor', label: 'Processors' },
    { id: 'gpu', label: 'Graphics Cards' },
    { id: 'motherboard', label: 'Motherboards' },
    { id: 'ram', label: 'Memory (RAM)' },
    { id: 'storage', label: 'SSDs & Storage' },
    { id: 'cooler', label: 'CPU Coolers' },
    { id: 'psu', label: 'Power Supplies' },
    { id: 'case', label: 'Cabinets / Cases' },
    { id: 'fans', label: 'Cooling Fans' },
  ];

  const brands = useMemo(() => {
    const list = Array.from(new Set(COMPONENTS.map((c) => c.brand)));
    return ['all', ...list];
  }, []);

  const filteredComponents = useMemo(() => {
    return COMPONENTS.filter((c) => {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && c.brand !== selectedBrand) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          c.name.toLowerCase().includes(query) ||
          c.specs.toLowerCase().includes(query) ||
          c.brand.toLowerCase().includes(query)
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return b.reviewCount - a.reviewCount;
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleAddToCart = (item: ComponentItem) => {
    addToCart({
      id: item.id,
      slug: item.id,
      name: item.name,
      subtitle: item.specs,
      category: 'components',
      price: item.price,
      originalPrice: item.originalPrice || item.price,
      discountPercent: item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0,
      rating: item.rating,
      reviewCount: item.reviewCount,
      inStock: item.inStock,
      image: item.image,
      gallery: [item.image],
      specs: {
        cpu: item.category === 'processor' ? item.name : 'N/A',
        gpu: item.category === 'gpu' ? item.name : 'N/A',
        ram: item.category === 'ram' ? item.name : 'N/A',
        storage: item.category === 'storage' ? item.name : 'N/A',
      },
      description: item.specs,
      features: [item.specs],
      technicalSpecs: {
        'Brand': item.brand,
        'Specifications': item.specs,
        'Power Requirement': `${item.wattage}W`,
      },
      faqs: [],
    });
  };

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 text-[#1D1D1F]">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73]">
        <Link href="/" className="hover:text-ember transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">Hardware Components</span>
      </nav>

      {/* Header */}
      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5E7] pb-6">
        <div>
          <h1 className="editorial-headline text-3xl font-semibold tracking-[-0.035em] text-[#1D1D1F] sm:text-5xl tracking-[-0.03em]">
            PC <span className="gradient-text">Components</span>
          </h1>
          <p className="mt-2 text-sm text-[#6E6E73] sm:text-base">
            Individual enthusiast-grade hardware from NVIDIA, Intel, AMD, ASUS, Corsair and Samsung.
          </p>
        </div>

        {/* Search bar inside page */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search GPUs, CPUs, RAM..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-2.5 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
          />
          <Search className="absolute right-3.5 top-3 h-4 w-4 text-[#6E6E73]" />
        </div>
      </div>

      {/* Category Pills Strip */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#1D1D1F] text-white'
                : 'border border-[#E5E5E7] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#1D1D1F] hover:text-[#1D1D1F]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Filter & Sort Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#E5E5E7] bg-white/5 p-3.5 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#6E6E73] font-medium">Brand:</span>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3 py-1.5 text-[#1D1D1F] font-medium outline-none"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === 'all' ? 'All Brands' : b}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#6E6E73] font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3 py-1.5 text-[#1D1D1F] font-medium outline-none"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Components Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredComponents.map((item) => (
          <div
            key={item.id}
            className="card-premium flex flex-col justify-between rounded-xl p-5 bg-[#F5F5F7]"
          >
            <div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/5 border border-[#E5E5E7] mb-3">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-ember text-xs">{item.brand}</span>
                <div className="flex items-center gap-1 text-[#6E6E73]">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-[#1D1D1F]">{item.rating}</span>
                </div>
              </div>

              <h3 className="mt-1 font-sans text-sm font-medium text-[#1D1D1F] line-clamp-2">
                {item.name}
              </h3>
              <p className="mt-1 text-xs text-[#6E6E73] line-clamp-2">{item.specs}</p>
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#E5E5E7]">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-sans text-lg font-medium text-[#1D1D1F]">
                  {formatPrice(item.price)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-xs text-[#6E6E73] line-through">
                    {formatPrice(item.originalPrice)}
                  </span>
                )}
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] text-white py-2.5 text-xs font-medium transition-all hover:bg-ember active:scale-98"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ComponentsCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#6E6E73]">Loading hardware components...</div>}>
      <ComponentsCatalogContent />
    </Suspense>
  );
}
