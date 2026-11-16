'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Filter,
  Grid,
  List,
  RotateCcw,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/shared/ProductCard';

export default function GamingPCsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedGPUs, setSelectedGPUs] = useState<string[]>([]);
  const [selectedRAMs, setSelectedRAMs] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allPCs = useMemo(() => PRODUCTS.filter((p) => p.category === 'gaming-pcs'), []);

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedGPUs([]);
    setSelectedRAMs([]);
    setPriceRanges([]);
    setInStockOnly(false);
  };

  const filteredPCs = useMemo(() => {
    return allPCs
      .filter((pc) => {
        if (inStockOnly && !pc.inStock) return false;

        if (selectedBrands.length > 0) {
          const hasBrand = selectedBrands.some((brand) =>
            pc.specs.cpu.toLowerCase().includes(brand.toLowerCase())
          );
          if (!hasBrand) return false;
        }

        if (selectedGPUs.length > 0) {
          const hasGpu = selectedGPUs.some((gpu) =>
            pc.specs.gpu.toLowerCase().includes(gpu.toLowerCase())
          );
          if (!hasGpu) return false;
        }

        if (selectedRAMs.length > 0) {
          const hasRam = selectedRAMs.some((ram) =>
            pc.specs.ram.toLowerCase().includes(ram.toLowerCase())
          );
          if (!hasRam) return false;
        }

        if (priceRanges.length > 0) {
          const matchesPrice = priceRanges.some((range) => {
            if (range === '50-75') return pc.price >= 50000 && pc.price <= 75000;
            if (range === '75-100') return pc.price > 75000 && pc.price <= 100000;
            if (range === '100-150') return pc.price > 100000 && pc.price <= 150000;
            if (range === '150+') return pc.price > 150000;
            return true;
          });
          if (!matchesPrice) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      });
  }, [allPCs, inStockOnly, selectedBrands, selectedGPUs, selectedRAMs, priceRanges, sortBy]);

  const activeFiltersCount =
    selectedBrands.length +
    selectedGPUs.length +
    selectedRAMs.length +
    priceRanges.length +
    (inStockOnly ? 1 : 0);

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73]">
        <Link href="/" className="hover:text-ember transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">Gaming Desktops</span>
      </nav>

      {/* Header */}
      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E5E7] pb-6">
        <div>
          <h1 className="editorial-headline text-3xl font-semibold tracking-[-0.035em] text-[#1D1D1F] sm:text-5xl tracking-[-0.03em]">
            Gaming <span className="gradient-text">Desktops</span>
          </h1>
          <p className="mt-2 text-sm text-[#6E6E73] sm:text-base">
            Precision engineered systems. Filter by architecture, GPU family, memory configuration, and budget.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-4 py-2.5 text-xs font-medium text-[#1D1D1F] lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-ember" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-medium text-[#6E6E73] sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3.5 py-2 text-xs font-medium text-[#1D1D1F] outline-none focus:border-[#1D1D1F]"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center rounded-xl border border-[#E5E5E7] bg-white/5 p-1">
            <button
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`rounded-xl p-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-[#F5F5F7] text-[#1D1D1F]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              aria-label="List view"
              className={`rounded-xl p-1.5 transition-colors ${
                viewMode === 'list' ? 'bg-[#F5F5F7] text-[#1D1D1F]' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Products Grid) */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Desktop Sidebar Filters (Col 3) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-4">
              <span className="font-sans text-sm font-medium text-[#1D1D1F] flex items-center gap-2">
                <Filter className="h-4 w-4 text-ember" />
                <span>Filters</span>
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs font-medium text-ember hover:underline"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Price Range */}
            <div className="mt-5 border-b border-[#E5E5E7] pb-5">
              <h4 className="text-xs font-medium text-[#1D1D1F]">Price Range</h4>
              <div className="mt-3 space-y-2.5 text-xs text-[#6E6E73]">
                {[
                  { id: '50-75', label: '₹50,000 - ₹75,000' },
                  { id: '75-100', label: '₹75,000 - ₹1,00,000' },
                  { id: '100-150', label: '₹1,00,000 - ₹1,50,000' },
                  { id: '150+', label: '₹1,50,000+' },
                ].map((range) => (
                  <label key={range.id} className="flex items-center gap-2.5 cursor-pointer font-medium hover:text-[#1D1D1F]">
                    <input
                      type="checkbox"
                      checked={priceRanges.includes(range.id)}
                      onChange={() => toggleFilter(priceRanges, setPriceRanges, range.id)}
                      className="rounded border-[#E5E5E7] text-ember focus:ring-0"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand (CPU) */}
            <div className="mt-5 border-b border-[#E5E5E7] pb-5">
              <h4 className="text-xs font-medium text-[#1D1D1F]">CPU Platform</h4>
              <div className="mt-3 space-y-2.5 text-xs text-[#6E6E73]">
                {['Intel', 'AMD'].map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer font-medium hover:text-[#1D1D1F]">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                      className="rounded border-[#E5E5E7] text-ember focus:ring-0"
                    />
                    <span>{brand} Core/Ryzen</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Graphics Card */}
            <div className="mt-5 border-b border-[#E5E5E7] pb-5">
              <h4 className="text-xs font-medium text-[#1D1D1F]">Graphics Family</h4>
              <div className="mt-3 space-y-2.5 text-xs text-[#6E6E73]">
                {['RTX 3060', 'RTX 4060', 'RTX 4070', 'RTX 4080', 'RTX 4090', 'RX 7600'].map(
                  (gpu) => (
                    <label key={gpu} className="flex items-center gap-2.5 cursor-pointer font-medium hover:text-[#1D1D1F]">
                      <input
                        type="checkbox"
                        checked={selectedGPUs.includes(gpu)}
                        onChange={() => toggleFilter(selectedGPUs, setSelectedGPUs, gpu)}
                        className="rounded border-[#E5E5E7] text-ember focus:ring-0"
                      />
                      <span>{gpu}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* RAM */}
            <div className="mt-5 border-b border-[#E5E5E7] pb-5">
              <h4 className="text-xs font-medium text-[#1D1D1F]">RAM Capacity</h4>
              <div className="mt-3 space-y-2.5 text-xs text-[#6E6E73]">
                {['16GB', '32GB', '64GB'].map((ram) => (
                  <label key={ram} className="flex items-center gap-2.5 cursor-pointer font-medium hover:text-[#1D1D1F]">
                    <input
                      type="checkbox"
                      checked={selectedRAMs.includes(ram)}
                      onChange={() => toggleFilter(selectedRAMs, setSelectedRAMs, ram)}
                      className="rounded border-[#E5E5E7] text-ember focus:ring-0"
                    />
                    <span>{ram} DDR5</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock status */}
            <div className="mt-5">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#1D1D1F]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#E5E5E7] text-ember focus:ring-0"
                />
                <span>Ready to Ship (In Stock Only)</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Product Grid Area (Col 9) */}
        <div className="lg:col-span-9">
          <div className="mb-4 flex items-center justify-between text-xs text-[#6E6E73]">
            <span>
              Showing <strong className="text-[#1D1D1F]">{filteredPCs.length}</strong> of{' '}
              <strong className="text-[#1D1D1F]">{allPCs.length}</strong> Configured Desktops
            </span>
          </div>

          {filteredPCs.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E5E5E7] bg-[#F5F5F7] p-14 text-center">
              <Filter className="h-10 w-10 text-[#6E6E73] mb-3" />
              <h3 className="text-base font-medium text-[#1D1D1F]">No Desktops match your filter criteria</h3>
              <p className="mt-1 text-xs text-[#6E6E73]">
                Try adjusting your GPU, CPU, or price ranges to reveal more machines.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-full bg-[#1D1D1F] text-white px-5 py-2.5 text-xs font-medium hover:bg-ember transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPCs.map((pc) => (
                <ProductCard key={pc.id} product={pc} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredPCs.map((pc) => (
                <ProductCard key={pc.id} product={pc} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 lg:hidden backdrop-blur-sm">
          <div className="h-full w-full max-w-xs overflow-y-auto bg-[#F5F5F7] p-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-4">
              <span className="font-sans text-base font-medium text-[#1D1D1F]">Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-[#6E6E73] hover:text-[#1D1D1F]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-6">
              <div>
                <h4 className="text-xs font-medium text-[#1D1D1F]">Price Range</h4>
                <div className="mt-2 space-y-2 text-xs text-[#6E6E73]">
                  {[
                    { id: '50-75', label: '₹50,000 - ₹75,000' },
                    { id: '75-100', label: '₹75,000 - ₹1,00,000' },
                    { id: '100-150', label: '₹1,00,000 - ₹1,50,000' },
                    { id: '150+', label: '₹1,50,000+' },
                  ].map((range) => (
                    <label key={range.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={priceRanges.includes(range.id)}
                        onChange={() => toggleFilter(priceRanges, setPriceRanges, range.id)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-[#1D1D1F]">Graphics Family</h4>
                <div className="mt-2 space-y-2 text-xs text-[#6E6E73]">
                  {['RTX 3060', 'RTX 4060', 'RTX 4070', 'RTX 4080', 'RTX 4090'].map((gpu) => (
                    <label key={gpu} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedGPUs.includes(gpu)}
                        onChange={() => toggleFilter(selectedGPUs, setSelectedGPUs, gpu)}
                      />
                      <span>{gpu}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full rounded-full bg-[#1D1D1F] text-white py-3 text-xs font-medium hover:bg-ember"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
