'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Search, ChevronRight, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { COMPONENTS } from '@/data/components';
import ProductCard from '@/components/shared/ProductCard';
import { formatPrice } from '@/lib/utils';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<'all' | 'gaming-pcs' | 'accessories' | 'components'>('all');

  const searchResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const matchedProducts = PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchSubtitle = p.subtitle.toLowerCase().includes(q);
      const matchGpu = p.specs.gpu.toLowerCase().includes(q);
      const matchCpu = p.specs.cpu.toLowerCase().includes(q);
      return matchName || matchSubtitle || matchGpu || matchCpu;
    });

    if (filterType === 'all') return matchedProducts;
    return matchedProducts.filter((p) => p.category === filterType);
  }, [query, filterType]);

  const componentResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q || (filterType !== 'all' && filterType !== 'components')) return [];

    return COMPONENTS.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.brand.toLowerCase().includes(q) ||
        c.specs.toLowerCase().includes(q)
      );
    });
  }, [query, filterType]);

  const totalFound = searchResults.length + componentResults.length;

  return (
    <div className="w-[95%] max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73] mb-6">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">Search Hardware</span>
      </nav>

      {/* Search Input Banner */}
      <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-6 sm:p-10 mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ember/10 text-ember text-xs font-medium mb-3">
            Hardware Catalog Search
          </div>
          <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
            Find Your Next Machine or <span className="gradient-text">Upgrade</span>
          </h1>
          <p className="mt-2 text-sm text-[#6E6E73]">
            Instant lookup across prebuilts, GPUs, CPUs, monitors, liquid coolers, and custom rigs.
          </p>

          <div className="relative mt-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by rig name, GPU (e.g. RTX 4080), CPU (e.g. i9, Ryzen), or accessory..."
              className="w-full rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-5 py-4 pl-12 text-sm text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-ember focus:ring-1 focus:ring-ember transition-all"
            />
            <Search className="absolute left-4 top-4.5 h-5 w-5 text-ember" />
          </div>

          {/* Trending Pills */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6E6E73] font-medium">Trending Searches:</span>
            {['RTX 4090', 'ShadowBlade 4060', 'Ryzen 7 7800X3D', 'Forge Elite 4070', 'Mechanical Keyboard', 'Liquid Cooled'].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3 py-1 font-medium text-[#1D1D1F] hover:border-ember hover:text-ember transition-colors"
                >
                  {term}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'gaming-pcs', label: 'Gaming Desktops' },
            { id: 'accessories', label: 'Accessories' },
            { id: 'components', label: 'Hardware Components' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={`rounded-xl px-4 py-2 font-medium whitespace-nowrap transition-all ${
                filterType === tab.id
                  ? 'bg-[#1D1D1F] text-white'
                  : 'border border-[#E5E5E7] bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#1D1D1F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {query && (
          <span className="text-xs text-[#6E6E73] hidden sm:block">
            Showing <strong className="text-[#1D1D1F] font-medium">{totalFound}</strong> results for &ldquo;{query}&rdquo;
          </span>
        )}
      </div>

      {/* Results Grid */}
      <div className="mt-8">
        {!query.trim() ? (
          <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-12 text-center">
            <Search className="h-10 w-10 text-ember mx-auto mb-3" />
            <h3 className="text-lg font-medium text-[#1D1D1F]">Start typing to explore the GameForge store</h3>
            <p className="mt-1 text-xs text-[#6E6E73] max-w-sm mx-auto">
              Search by component name, benchmark level, model number, or graphic architecture.
            </p>
          </div>
        ) : totalFound === 0 ? (
          <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-12 text-center">
            <h3 className="text-lg font-medium text-[#1D1D1F]">No results matching &ldquo;{query}&rdquo;</h3>
            <p className="mt-1 text-xs text-[#6E6E73] max-w-sm mx-auto">
              Try searching for terms like &ldquo;4060&rdquo;, &ldquo;4080&rdquo;, &ldquo;Intel&rdquo;, &ldquo;Ryzen&rdquo;, or &ldquo;Keyboard&rdquo;.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {searchResults.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display font-normal tracking-[-0.02em] text-xl text-[#1D1D1F]">Complete Systems & Peripherals</h2>
                    <p className="text-xs text-[#6E6E73]">{searchResults.length} systems found</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {searchResults.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {componentResults.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display font-normal tracking-[-0.02em] text-xl text-[#1D1D1F]">Individual Hardware Components</h2>
                    <p className="text-xs text-[#6E6E73]">{componentResults.length} components found</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {componentResults.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-4 flex items-center gap-4 hover:border-ember transition-all"
                    >
                      <div className="relative h-16 w-16 shrink-0 rounded-xl bg-white/5 border border-[#E5E5E7] p-1">
                        <img src={c.image} alt={c.name} className="h-full w-full object-cover rounded-xl" />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <span className="text-[11px] font-medium text-ember ">{c.brand}</span>
                        <h4 className="text-xs font-medium text-[#1D1D1F] line-clamp-1">{c.name}</h4>
                        <span className="text-xs font-medium text-[#1D1D1F] mt-1 block">
                          ₹{c.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <Link
                        href="/build-your-pc"
                        className="rounded-xl bg-white/5 p-2 text-[#6E6E73] hover:bg-ember hover:text-[#1D1D1F] transition-colors"
                        title="Configure in PC Builder"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#6E6E73]">Loading hardware catalog...</div>}>
      <SearchContent />
    </Suspense>
  );
}
