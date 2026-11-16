'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, showToast } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GAMEFORGE10' || couponCode.trim().toUpperCase() === 'FORGE10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      showToast('10% discount coupon applied successfully!', 'success');
    } else {
      showToast('Invalid coupon code. Try GAMEFORGE10', 'warning');
    }
  };

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = cartTotal - discountAmount;

  if (cart.length === 0) {
    return (
      <div className="mx-auto w-[95%] max-w-[1440px] px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl border border-[#E5E5E7] bg-white/5 text-[#6E6E73]">
          <ShoppingBag className="h-10 w-10 text-ember" />
        </div>
        <h1 className="editorial-headline font-semibold tracking-[-0.035em] mt-6 text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
          Your Cart is <span className="gradient-text">Empty</span>
        </h1>
        <p className="mt-2 text-sm text-[#6E6E73]">
          Discover our next-generation prebuilt gaming desktops, custom builder, and esports accessories.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/gaming-pcs"
            className="rounded-full bg-[#1D1D1F] text-white px-6 py-3.5 text-xs font-medium transition-all hover:bg-ember"
          >
            Explore Gaming Desktops
          </Link>
          <Link
            href="/build-your-pc"
            className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-6 py-3.5 text-xs font-medium text-[#1D1D1F] hover:border-[#1D1D1F]"
          >
            Custom PC Builder
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 text-[#1D1D1F]">
      <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-6">
        <div>
          <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
            Shopping <span className="gradient-text">Cart</span>
          </h1>
          <p className="mt-1 text-sm text-[#6E6E73]">
            Review your hardware before proceeding to insured dispatch checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-medium text-rose-400 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Cart Item Rows (Col 8) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="card-premium flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl p-5 bg-[#F5F5F7]"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-[#E5E5E7] bg-white/5">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div>
                  <h3 className="font-sans text-base font-medium text-[#1D1D1F]">{item.name}</h3>

                  {item.selectedConfig && (
                    <div className="mt-1 flex flex-wrap gap-2 text-xs font-medium text-ember">
                      {item.selectedConfig.ram && (
                        <span className="rounded-md bg-ember/10 px-2 py-0.5">
                          {item.selectedConfig.ram}
                        </span>
                      )}
                      {item.selectedConfig.storage && (
                        <span className="rounded-md bg-ember/10 px-2 py-0.5">
                          {item.selectedConfig.storage}
                        </span>
                      )}
                    </div>
                  )}

                  {item.isCustomBuild && item.customComponents && (
                    <div className="mt-1.5 text-xs text-[#6E6E73] font-medium">
                      {item.customComponents.length} Custom Components Configured
                    </div>
                  )}

                  <span className="mt-2 block font-sans text-sm font-medium text-[#6E6E73]">
                    {formatPrice(item.finalPrice)} each
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 border-t border-[#E5E5E7] sm:border-0 pt-3 sm:pt-0">
                {/* Qty pill */}
                <div className="flex items-center rounded-xl border border-[#E5E5E7] bg-white/5 p-1">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-xl text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-medium text-[#1D1D1F]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-xl text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] transition-all"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Subtotal */}
                <span className="font-sans text-lg font-medium text-[#1D1D1F] shrink-0">
                  {formatPrice(item.finalPrice * item.quantity)}
                </span>

                {/* Trash */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-[#6E6E73] transition-colors hover:text-rose-400"
                  title="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Link
              href="/gaming-pcs"
              className="inline-flex items-center gap-2 text-xs font-medium text-ember hover:underline"
            >
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-7">
            <h2 className="font-display font-normal tracking-[-0.02em] font-sans text-lg text-[#1D1D1F]">Order Summary</h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Coupon (GAMEFORGE10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 rounded-xl border border-[#E5E5E7] bg-white/5 px-3.5 py-2.5 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7] font-medium"
              />
              <button
                type="submit"
                className="rounded-full border border-[#E5E5E7] bg-white/5 px-4 py-2.5 text-xs font-medium hover:bg-[#1D1D1F] hover:text-white transition-colors"
              >
                Apply
              </button>
            </form>

            {couponApplied && (
              <p className="mt-2.5 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Coupon GAMEFORGE10 (10% off) applied!</span>
              </p>
            )}

            {/* Breakdown */}
            <div className="mt-6 space-y-3.5 border-t border-[#E5E5E7] pt-5 text-xs">
              <div className="flex justify-between text-[#6E6E73] font-medium">
                <span>Hardware Subtotal</span>
                <span className="font-medium text-[#1D1D1F]">{formatPrice(cartTotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Insider Discount (10%)</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#6E6E73] font-medium">
                <span>Shipping & Insurance</span>
                <span className="font-medium text-emerald-600">FREE</span>
              </div>

              <div className="flex justify-between text-[#6E6E73] font-medium">
                <span>Taxes (GST)</span>
                <span>Included</span>
              </div>

              <div className="border-t border-[#E5E5E7] pt-4 flex items-baseline justify-between">
                <span className="text-base font-medium text-[#1D1D1F]">Grand Total</span>
                <span className="font-sans text-3xl font-medium text-[#1D1D1F]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout button */}
            <button
              onClick={() => router.push('/checkout')}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] text-white py-4 text-sm font-medium transition-all hover:bg-ember active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Secure Checkout badge */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6E6E73]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>256-Bit SSL Encrypted & Doorstep Insured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
