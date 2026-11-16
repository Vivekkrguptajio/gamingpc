'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, Trash2, ShoppingCart, ChevronRight, Plus, CheckCircle2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function ComparePage() {
  const { compareList, removeFromCompare, addToCart, addToCompare } = useStore();

  const gamingPCs = PRODUCTS.filter((p) => p.category === 'gaming-pcs');

  return (
    <div className="w-[95%] max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73] mb-6">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">Compare Products</span>
      </nav>

      {/* Header */}
      <div className="border-b border-[#E5E5E7] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ember/10 text-ember text-xs font-medium mb-2">
            Side-By-Side Spec Matrix
          </div>
          <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
            Compare Gaming <span className="gradient-text">Rigs</span>
          </h1>
          <p className="mt-1 text-sm text-[#6E6E73] max-w-2xl">
            Detailed hardware analysis to help you make the right choice for your battle station.
          </p>
        </div>
        {compareList.length > 0 && (
          <span className="text-xs font-medium text-[#6E6E73]">
            Comparing <strong className="text-[#1D1D1F] font-medium">{compareList.length}</strong> of 4 systems
          </span>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="mt-10 rounded-xl border border-[#E5E5E7] bg-white/5 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-ember/10 text-ember mb-4">
            <Scale className="h-8 w-8" />
          </div>
          <h2 className="font-display font-normal tracking-[-0.02em] text-xl text-[#1D1D1F]">No Systems in Comparison</h2>
          <p className="mt-1 text-xs text-[#6E6E73] max-w-md mx-auto">
            You haven&apos;t added any gaming rigs to compare yet. Click the compare icon on any product card or select from our top-rated systems below.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {gamingPCs.slice(0, 4).map((pc) => (
              <button
                key={pc.id}
                onClick={() => addToCompare(pc)}
                className="flex items-center gap-2 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-4 py-2.5 text-xs font-medium text-[#1D1D1F] hover:border-ember hover:text-ember transition-all"
              >
                <Plus className="h-4 w-4 text-ember" />
                <span>Add {pc.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto pb-8">
          <div className="min-w-[760px] rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] overflow-hidden">
            <table className="w-full border-collapse text-xs sm:text-sm">
              {/* Product preview cards header */}
              <thead>
                <tr className="border-b border-[#E5E5E7] bg-white/5/60">
                  <th className="w-1/5 p-6 text-left font-medium text-[#6E6E73] text-xs">
                    Rig Summary
                  </th>
                  {compareList.map((product) => (
                    <th key={product.id} className="p-6 text-center align-top border-l border-[#E5E5E7]">
                      <div className="flex flex-col items-center">
                        <div className="relative aspect-square w-32 sm:w-40 overflow-hidden rounded-xl bg-white/5 border border-[#E5E5E7] mb-4 p-2">
                          <Image src={product.image} alt={product.name} fill className="object-cover rounded-xl" />
                          <button
                            onClick={() => removeFromCompare(product.id)}
                            className="absolute right-2 top-2 rounded-full bg-[#1D1D1F]/90 border border-[#E5E5E7] p-1.5 text-[#6E6E73] hover:text-rose-400 hover:border-rose-500/30 transition-colors"
                            title="Remove from comparison"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link href={`/product/${product.slug}`} className="group">
                          <span className="font-medium text-sm text-[#1D1D1F] group-hover:text-ember transition-colors line-clamp-1">
                            {product.name}
                          </span>
                        </Link>

                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-base font-medium text-[#1D1D1F]">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#6E6E73] line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          className="mt-4 flex items-center justify-center gap-2 w-full rounded-full bg-[#1D1D1F] text-white px-4 py-2.5 text-xs font-medium hover:bg-ember transition-all"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Spec Rows */}
              <tbody className="divide-y divide-line">
                {/* Section Header: Core Engine */}
                <tr className="bg-white/5">
                  <td colSpan={compareList.length + 1} className="py-2.5 px-6 font-medium text-xs text-ember">
                    Core Performance Hardware
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Graphics Processing Unit</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-[#1D1D1F] border-l border-[#E5E5E7]">
                      <span className="inline-block px-3 py-1 rounded-full bg-ember/10 text-ember text-xs font-medium">
                        {p.specs.gpu}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Central Processor (CPU)</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-[#1D1D1F] border-l border-[#E5E5E7]">
                      {p.specs.cpu}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Memory (High-Speed RAM)</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-[#1D1D1F] border-l border-[#E5E5E7]">
                      {p.specs.ram}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Solid State Drive (Storage)</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center font-medium text-[#1D1D1F] border-l border-[#E5E5E7]">
                      {p.specs.storage}
                    </td>
                  ))}
                </tr>

                {/* Section Header: Thermal & Platform */}
                <tr className="bg-white/5">
                  <td colSpan={compareList.length + 1} className="py-2.5 px-6 font-medium text-xs text-ember">
                    Chassis, Power & Acoustics
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Motherboard</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center text-[#1D1D1F] border-l border-[#E5E5E7]">
                      {p.specs.motherboard || 'Custom Gaming Chipset (WiFi 6E)'}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Thermal Cooling Architecture</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center text-[#1D1D1F] border-l border-[#E5E5E7]">
                      {p.specs.cooling || 'AIO 240/360mm Liquid Cooler'}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Power Supply Unit (PSU)</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center text-[#1D1D1F] border-l border-[#E5E5E7]">
                      {p.specs.psu || '80+ Gold Certified Modular'}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Enclosure / Glass Case</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center text-[#1D1D1F] border-l border-[#E5E5E7]">
                      {p.specs.case || 'Tempered Glass Flow Case'}
                    </td>
                  ))}
                </tr>

                {/* Section Header: Warranty & Confidence */}
                <tr className="bg-white/5">
                  <td colSpan={compareList.length + 1} className="py-2.5 px-6 font-medium text-xs text-ember">
                    Coverage & Peace of Mind
                  </td>
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Warranty & In-Home RMA</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center border-l border-[#E5E5E7]">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        2 Years Comprehensive Onsite
                      </span>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="py-4 px-6 font-medium text-[#6E6E73]">Stress-Testing & Burn-in</td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-center text-xs text-[#6E6E73] border-l border-[#E5E5E7]">
                      24-Hour Benchmark Certified
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
