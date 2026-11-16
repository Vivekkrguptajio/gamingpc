'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Plus, Heart, Scale, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, removeFromCompare, isInCompare } =
    useStore();

  const isFavorited = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const isGamingPC =
    product.category === 'gaming-pcs' &&
    Boolean(product.specs?.gpu) &&
    product.specs.gpu !== 'N/A';

  const gpu = isGamingPC
    ? product.specs.gpu.split('(')[0].replace('NVIDIA GeForce ', '').trim()
    : '';
  const cpu = isGamingPC ? product.specs.cpu.split('(')[0].trim() : '';
  const ram = isGamingPC ? product.specs.ram.split(' ')[0] : '';

  const specSummary = isGamingPC
    ? [gpu, cpu, ram].filter(Boolean).join(' · ')
    : product.subtitle;

  const badgeText =
    product.badge ??
    (product.category === 'gaming-pcs' ? 'Gaming Desktop' : product.subCategory || 'Hardware');

  // List View (Used when toggled on /gaming-pcs)
  if (viewMode === 'list') {
    return (
      <article className="group relative flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-[#E5E5E7] bg-white p-6 sm:p-7 transition-all duration-300 hover:border-ember/40 hover:bg-[#F5F5F7] hover:shadow-lg">
        {/* Product Image */}
        <Link
          href={`/product/${product.slug}`}
          className="relative h-52 w-52 shrink-0 flex items-center justify-center"
        >
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 rounded-full bg-black/8 blur-sm pointer-events-none group-hover:scale-95 transition-transform duration-300" />
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, 240px"
          />
        </Link>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between self-stretch">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs text-[#6E6E73]">
                {badgeText}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    isCompared ? removeFromCompare(product.id) : addToCompare(product);
                  }}
                  aria-label="Compare"
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isCompared
                      ? 'bg-ember/10 text-ember'
                      : 'text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
                  }`}
                  title="Compare"
                >
                  <Scale className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                  }}
                  aria-label="Wishlist"
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isFavorited
                      ? 'text-rose-500'
                      : 'text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
                  }`}
                  title="Wishlist"
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`}
                    strokeWidth={1.5}
                  />
                </button>
                <Link
                  href={`/product/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#6E6E73] transition-colors hover:bg-[#F5F5F7] hover:text-ember"
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#1D1D1F]">
              <Link href={`/product/${product.slug}`} className="hover:text-ember transition-colors">
                {product.name}
              </Link>
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-[#6E6E73]">
              {specSummary}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-[#E5E5E7] pt-4">
            <div>
              <span className="block text-2xl font-semibold tabular-nums text-[#1D1D1F]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="mt-0.5 block text-xs tabular-nums text-[#6E6E73]">
                  <span className="line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="ml-2 font-medium text-ember">−{product.discountPercent}%</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => addToCart(product)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#E5E5E7] bg-white px-5 text-xs font-medium transition-all hover:border-ember hover:bg-ember hover:text-white shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
              Add to cart
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Grid View (Exact match to Landing Page Featured Rig Card)
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-[#E5E5E7] bg-white p-6 transition-all duration-300 hover:border-ember/40 hover:bg-[#F5F5F7] hover:shadow-lg sm:p-7">
      <div>
        {/* Top meta row */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs text-[#6E6E73]">
            {badgeText}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                isCompared ? removeFromCompare(product.id) : addToCompare(product);
              }}
              aria-label="Compare"
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                isCompared
                  ? 'bg-ember/10 text-ember'
                  : 'text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
              }`}
              title="Compare"
            >
              <Scale className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              aria-label="Wishlist"
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                isFavorited
                  ? 'text-rose-500'
                  : 'text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]'
              }`}
              title="Wishlist"
            >
              <Heart
                className={`h-3.5 w-3.5 ${isFavorited ? 'fill-current' : ''}`}
                strokeWidth={1.5}
              />
            </button>
            <Link
              href={`/product/${product.slug}`}
              aria-label={`View ${product.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[#6E6E73] transition-colors hover:bg-[#F5F5F7] hover:text-ember"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
            </Link>
          </div>
        </div>

        {/* 3D Showcase Image */}
        <Link
          href={`/product/${product.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="relative my-6 block h-[240px] w-full"
        >
          {/* Natural soft contact shadow */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 rounded-full bg-black/8 blur-sm pointer-events-none group-hover:scale-95 transition-transform duration-300" />
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
          />
        </Link>

        {/* Title */}
        <h3 className="font-display text-[1.35rem] sm:text-[1.45rem] font-semibold leading-tight tracking-[-0.025em] text-[#1D1D1F] line-clamp-1">
          <Link href={`/product/${product.slug}`} className="hover:text-ember transition-colors">
            {product.name}
          </Link>
        </h3>

        {/* Spec summary */}
        <p className="mt-2.5 text-xs leading-relaxed text-[#6E6E73] line-clamp-1">
          {specSummary}
        </p>
      </div>

      {/* Pricing & Add to cart button */}
      <div className="mt-7 flex items-end justify-between gap-4 border-t border-[#E5E5E7] pt-5">
        <div>
          <span className="block text-xl font-semibold tabular-nums text-[#1D1D1F]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="mt-0.5 block text-xs tabular-nums text-[#6E6E73]">
              <span className="line-through">{formatPrice(product.originalPrice)}</span>
              <span className="ml-2 font-medium text-ember">−{product.discountPercent}%</span>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#E5E5E7] bg-white px-4 text-xs font-medium transition-all hover:border-ember hover:bg-ember hover:text-white shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
          Add to cart
        </button>
      </div>
    </article>
  );
}
