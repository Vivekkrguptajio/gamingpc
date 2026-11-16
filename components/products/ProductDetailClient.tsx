'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Star,
  Flame,
  Check,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Maximize2,
  X,
  Cpu,
  Tv,
  Layers,
  HardDrive,
  Heart,
} from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/shared/ProductCard';

interface ProductDetailClientProps {
  product: Product;
  relatedPCs: Product[];
}

export default function ProductDetailClient({
  product,
  relatedPCs,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const [selectedRam, setSelectedRam] = useState(
    product.configOptions?.ram?.[0]?.value || 'default'
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.configOptions?.storage?.[0]?.value || 'default'
  );
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews' | 'faqs'>('specs');

  const ramOption = product.configOptions?.ram?.find((r) => r.value === selectedRam);
  const storageOption = product.configOptions?.storage?.find((s) => s.value === selectedStorage);

  const ramDelta = ramOption?.priceDelta || 0;
  const storageDelta = storageOption?.priceDelta || 0;

  const currentPrice = product.price + ramDelta + storageDelta;
  const currentOriginalPrice = product.originalPrice + ramDelta + storageDelta;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1, {
      ram: ramOption?.label,
      ramPriceDelta: ramDelta,
      storage: storageOption?.label,
      storagePriceDelta: storageDelta,
    });
  };

  const handleBuyNow = () => {
    addToCart(product, 1, {
      ram: ramOption?.label,
      ramPriceDelta: ramDelta,
      storage: storageOption?.label,
      storagePriceDelta: storageDelta,
    });
    router.push('/checkout');
  };

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 text-[#1D1D1F]">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73]">
        <Link href="/" className="hover:text-ember transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/gaming-pcs" className="hover:text-ember transition-colors">
          Gaming Desktops
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[#6E6E73]">{product.subCategory || 'High Performance'}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">{product.name}</span>
      </nav>

      {/* 2. Top Product Section (Clean Apple-like hardware layout) */}
      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Product Gallery (Col 7) */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 lg:col-span-7">
          {/* Vertical Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[580px] shrink-0">
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-white/5 transition-all ${
                  selectedImageIndex === idx
                    ? 'border-ember ring-2 ring-ember/20'
                    : 'border-[#E5E5E7] hover:border-[#1D1D1F]/40'
                }`}
              >
                <Image src={img} alt={`${product.name} angle ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main Display Image */}
          <div className="relative flex-1 aspect-square sm:aspect-auto sm:h-[580px] overflow-hidden rounded-xl border border-[#E5E5E7] bg-white/5">
            {product.badge && (
              <span className="absolute left-5 top-5 z-10 rounded-full bg-[#1D1D1F] text-white px-3.5 py-1 text-xs font-medium ">
                {product.badge}
              </span>
            )}

            <button
              onClick={() => setFullscreenOpen(true)}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] text-[#6E6E73] transition-colors hover:text-[#1D1D1F] hover:border-[#1D1D1F]"
              title="Expand Image"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            <span className="absolute bottom-5 left-5 z-10 rounded-md bg-[#1D1D1F]/90 border border-[#E5E5E7] px-3 py-1 text-xs font-medium text-[#6E6E73]">
              {selectedImageIndex + 1} / {product.gallery.length}
            </span>

            <Image
              src={product.gallery[selectedImageIndex] || product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>

        {/* Right Column: Product Information & Customizer (Col 5) */}
        <div className="flex flex-col lg:col-span-5">
          {/* In Stock Badge */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-xs font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>In Stock & Ready to Ship</span>
            </span>
            <span className="text-xs text-[#6E6E73]">• 24-Hour Dispatch</span>
          </div>

          {/* Title & Subtitle */}
          <h1 className="editorial-headline mt-3 text-3xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-[-0.035em] leading-[1.08]">
            {product.name}
          </h1>
          <p className="mt-2 text-base font-normal text-[#6E6E73]">{product.subtitle}</p>

          {/* Ratings & Sold counter */}
          <div className="mt-4 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-medium text-[#1D1D1F]">{product.rating}</span>
              <span className="text-[#6E6E73]">({product.reviewCount} reviews)</span>
            </div>

            {product.soldCount && (
              <div className="flex items-center gap-1 text-amber-600 font-medium bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30/60">
                <Flame className="h-3.5 w-3.5 fill-current" />
                <span>{product.soldCount} Sold</span>
              </div>
            )}
          </div>

          {/* Price Box */}
          <div className="mt-6 border-y border-[#E5E5E7] py-5">
            <div className="flex items-baseline gap-3">
              <span className="font-sans text-4xl font-medium text-[#1D1D1F]">
                {formatPrice(currentPrice)}
              </span>
              {currentOriginalPrice > currentPrice && (
                <>
                  <span className="text-base text-[#6E6E73] line-through">
                    {formatPrice(currentOriginalPrice)}
                  </span>
                  <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    Save {product.discountPercent}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-[#6E6E73]">Inclusive of all GST, transit insurance & doorstep crate delivery</p>
          </div>

          {/* 4 Hardware Highlights */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-3 text-center">
              <Tv className="h-4 w-4 text-ember mx-auto mb-1" />
              <span className="text-[11px] text-[#6E6E73] block font-medium">GPU</span>
              <span className="text-xs font-medium text-[#1D1D1F] line-clamp-1">
                {product.specs.gpu.split('(')[0].replace('NVIDIA GeForce ', '')}
              </span>
            </div>

            <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-3 text-center">
              <Cpu className="h-4 w-4 text-ember mx-auto mb-1" />
              <span className="text-[11px] text-[#6E6E73] block font-medium">CPU</span>
              <span className="text-xs font-medium text-[#1D1D1F] line-clamp-1">
                {product.specs.cpu.split('(')[0].replace('Intel Core ', '').replace('AMD ', '')}
              </span>
            </div>

            <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-3 text-center">
              <Zap className="h-4 w-4 text-[#1D1D1F] mx-auto mb-1" />
              <span className="text-[11px] text-[#6E6E73] block font-medium">RAM</span>
              <span className="text-xs font-medium text-[#1D1D1F] line-clamp-1">
                {ramOption?.label.split(' ')[0] || product.specs.ram.split(' ')[0]}
              </span>
            </div>

            <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-3 text-center">
              <HardDrive className="h-4 w-4 text-ember mx-auto mb-1" />
              <span className="text-[11px] text-[#6E6E73] block font-medium">SSD</span>
              <span className="text-xs font-medium text-[#1D1D1F] line-clamp-1">
                {storageOption?.label.split(' ')[0] || product.specs.storage.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Customize Your Build (Clean Modern Radio Cards) */}
          {product.configOptions && (
            <div className="mt-8 space-y-5 rounded-xl border border-[#E5E5E7] bg-white/5 p-6">
              <div className="flex items-center gap-2 text-xs font-medium text-[#1D1D1F]">
                <Layers className="h-4 w-4 text-ember" />
                <span>Customize Factory Build</span>
              </div>

              {/* RAM Selection */}
              {product.configOptions.ram && (
                <div>
                  <span className="text-xs font-medium text-[#1D1D1F]">High-Speed Memory (DDR5)</span>
                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {product.configOptions.ram.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSelectedRam(opt.value)}
                        className={`relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                          selectedRam === opt.value
                            ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                            : 'border-[#E5E5E7] bg-[#F5F5F7] hover:border-[#1D1D1F]/40'
                        }`}
                      >
                        {selectedRam === opt.value && (
                          <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-ember text-[#1D1D1F]">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                        <span className="text-xs font-medium text-[#1D1D1F]">{opt.label}</span>
                        <span className="mt-1 text-xs font-medium text-ember">
                          {opt.priceDelta === 0 ? 'Included' : `+ ${formatPrice(opt.priceDelta)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Selection */}
              {product.configOptions.storage && (
                <div>
                  <span className="text-xs font-medium text-[#1D1D1F]">Primary Storage (Gen4 NVMe)</span>
                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {product.configOptions.storage.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSelectedStorage(opt.value)}
                        className={`relative flex flex-col items-start rounded-xl border p-3.5 text-left transition-all ${
                          selectedStorage === opt.value
                            ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                            : 'border-[#E5E5E7] bg-[#F5F5F7] hover:border-[#1D1D1F]/40'
                        }`}
                      >
                        {selectedStorage === opt.value && (
                          <span className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-ember text-[#1D1D1F]">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </span>
                        )}
                        <span className="text-xs font-medium text-[#1D1D1F]">{opt.label}</span>
                        <span className="mt-1 text-xs font-medium text-ember">
                          {opt.priceDelta === 0 ? 'Included' : `+ ${formatPrice(opt.priceDelta)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-[#1D1D1F] text-white py-4 text-sm font-medium transition-all hover:bg-ember active:scale-98"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full border-2 border-[#1D1D1F] bg-[#F5F5F7] py-4 text-sm font-medium transition-all hover:bg-[#1D1D1F] hover:text-white active:scale-98"
            >
              <Zap className="h-4 w-4" />
              <span>Buy Now</span>
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-colors ${
                isFavorited
                  ? 'border-rose-400 bg-rose-500/10 text-rose-400'
                  : 'border-[#E5E5E7] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#1D1D1F] hover:text-[#1D1D1F]'
              }`}
              title="Add to Wishlist"
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Value Props Row */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E5E5E7] pt-6 sm:grid-cols-4 text-xs text-[#6E6E73]">
            <div className="flex items-center gap-2.5">
              <Truck className="h-5 w-5 text-ember shrink-0" />
              <div>
                <span className="block font-medium text-[#1D1D1F]">Free Shipping</span>
                <span className="text-xs">All India Crate</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-ember shrink-0" />
              <div>
                <span className="block font-medium text-[#1D1D1F]">2 Years</span>
                <span className="text-xs">On-site Warranty</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Headphones className="h-5 w-5 text-[#1D1D1F] shrink-0" />
              <div>
                <span className="block font-medium text-[#1D1D1F]">Lifetime</span>
                <span className="text-xs">Engineer Access</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <RotateCcw className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <span className="block font-medium text-[#1D1D1F]">7 Days</span>
                <span className="text-xs">Easy Replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Below Fold Tabs & Technical Specifications */}
      <div className="mt-20 rounded-xl border border-[#E5E5E7] bg-white/5 p-6 sm:p-12">
        {/* Tab Buttons */}
        <div className="flex items-center gap-3 border-b border-[#E5E5E7] pb-4 overflow-x-auto">
          {[
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'desc', label: 'Architecture & Overview' },
            { id: 'reviews', label: `Verified Reviews (${product.reviewCount})` },
            { id: 'faqs', label: 'Common Questions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#F5F5F7] text-[#1D1D1F] border border-[#E5E5E7]'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
              {/* Technical Specifications Table */}
              <div className="lg:col-span-8">
                <h3 className="font-display text-2xl font-normal text-[#1D1D1F] mb-4">
                  Hardware Component Breakdown
                </h3>
                <div className="overflow-hidden rounded-xl border border-[#E5E5E7] bg-[#F5F5F7]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <tbody className="divide-y divide-line">
                      {Object.entries(product.technicalSpecs).map(([key, val], idx) => (
                        <tr
                          key={key}
                          className={idx % 2 === 0 ? 'bg-[#F5F5F7]' : 'bg-white/5/60'}
                        >
                          <td className="w-1/3 py-3.5 px-5 font-medium text-[#6E6E73]">
                            {key}
                          </td>
                          <td className="py-3.5 px-5 font-medium text-[#1D1D1F]">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Side Promo Card */}
              <div className="lg:col-span-4 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-7">
                <span className="rounded-md bg-ember/10 px-2.5 py-0.5 text-xs font-medium text-ember">
                  Factory Tuning
                </span>
                <h4 className="mt-4 text-2xl font-medium text-[#1D1D1F]">
                  Zero Thermal Bottlenecks
                </h4>
                <p className="mt-2 text-xs text-[#6E6E73] leading-relaxed">
                  Every {product.name} is stress-tested with Cinebench R23 and 3DMark TimeSpy to verify fan curves and memory latency before crating.
                </p>
                <div className="mt-6 border-t border-[#E5E5E7] pt-4">
                  <span className="text-xs font-medium text-[#1D1D1F] block">
                    Need a custom variation?
                  </span>
                  <Link
                    href="/build-your-pc"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-ember hover:underline"
                  >
                    <span>Launch Custom Configurator →</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="font-sans text-xl font-medium text-[#1D1D1F] mb-2">Design Philosophy</h3>
                <p className="text-sm leading-relaxed text-[#6E6E73]">{product.description}</p>
              </div>

              <div>
                <h4 className="font-sans text-base font-medium text-[#1D1D1F] mb-3">Key Highlights</h4>
                <ul className="space-y-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#6E6E73]">
                      <Check className="h-4 w-4 text-ember shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex items-center gap-6 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
                <div className="text-center">
                  <span className="text-5xl font-medium text-[#1D1D1F]">{product.rating}</span>
                  <div className="flex text-amber-600 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#6E6E73] mt-1 block">
                    {product.reviewCount} Ratings
                  </span>
                </div>
                <div className="border-l border-[#E5E5E7] pl-6 text-xs text-[#6E6E73]">
                  <p className="font-medium text-[#1D1D1F]">
                    98% of owners rate performance beyond expectation.
                  </p>
                  <p className="mt-1 text-emerald-600 font-medium">
                    ✓ 100% Verified Buyer Hardware Benchmark Validated
                  </p>
                </div>
              </div>

              {/* Sample User Reviews */}
              <div className="space-y-4">
                {[
                  {
                    author: 'Arjun M.',
                    date: '3 days ago',
                    rating: 5,
                    title: 'Crushes Cyberpunk at 1440p without breaking a sweat!',
                    comment:
                      'Packaging was extraordinary—arrived in an insulated foam crate with zero scratches. Plugged it in, installed Steam, and was playing Cyberpunk at 95+ FPS on Ultra with DLSS 3. Thermals stayed under 62°C.',
                  },
                  {
                    author: 'Siddharth R.',
                    date: '1 week ago',
                    rating: 5,
                    title: 'Phenomenal cable management and dead silent',
                    comment:
                      'The build quality is night and day compared to OEM prebuilts. Genuine retail components, clean combs on the cables, and the clean white chassis looks majestic in person.',
                  },
                ].map((rev, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#1D1D1F]">{rev.author}</span>
                        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-600 font-medium">
                          Verified Buyer
                        </span>
                      </div>
                      <span className="text-[#6E6E73]">{rev.date}</span>
                    </div>
                    <div className="flex text-amber-600">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <h5 className="text-sm font-medium text-[#1D1D1F]">{rev.title}</h5>
                    <p className="text-xs text-[#6E6E73] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4 max-w-3xl">
              {product.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6"
                >
                  <h4 className="font-sans text-sm font-medium text-[#1D1D1F]">{faq.question}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#6E6E73]">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. You May Also Like */}
      <section className="mt-20">
        <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-4 mb-8">
          <div>
            <span className="text-xs font-medium text-ember">
              Explore More
            </span>
            <h2 className="mt-1 font-display text-2xl font-normal text-[#1D1D1F] sm:text-4xl tracking-[-0.03em]">
              You May Also <span className="gradient-text">Like</span>
            </h2>
          </div>
          <Link
            href="/gaming-pcs"
            className="text-xs text-[#1D1D1F] hover:text-ember transition-colors"
          >
            View All Desktops →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedPCs.slice(0, 4).map((pc) => (
            <ProductCard key={pc.id} product={pc} />
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {fullscreenOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <button
            onClick={() => setFullscreenOpen(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-ember hover:text-[#1D1D1F] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative aspect-square max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-xl bg-[#F5F5F7] p-4">
            <Image
              src={product.gallery[selectedImageIndex] || product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
