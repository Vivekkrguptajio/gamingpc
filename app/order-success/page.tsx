'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Cpu,
  Truck,
  Home,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'GF-DEMO2026';
  const { orders } = useStore();

  const order = orders.find((o) => o.orderNumber === orderId) || orders[0];

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF6B2C', '#F4F1EA', '#9A968D', '#10b981'],
      });
    } catch {}
  }, []);

  return (
    <div className="mx-auto w-[95%] max-w-[1200px] px-3 py-16 sm:px-6 lg:px-8 text-[#1D1D1F]">
      {/* Success Hero */}
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600">
          <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
        </div>

        <h1 className="editorial-headline font-semibold tracking-[-0.035em] mt-6 text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
          Order Placed <span className="gradient-text">Successfully</span>
        </h1>
        <p className="mt-2 text-sm text-[#6E6E73]">
          Thank you for trusting <strong className="text-[#1D1D1F]">GameForge</strong>. Your order{' '}
          <span className="font-medium text-ember">#{order?.orderNumber || orderId}</span> is confirmed.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/account"
            className="rounded-full bg-[#1D1D1F] text-white px-7 py-3.5 text-xs font-medium transition-all hover:bg-ember"
          >
            View in Dashboard
          </Link>
          <Link
            href="/gaming-pcs"
            className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-7 py-3.5 text-xs font-medium text-[#1D1D1F] hover:border-[#1D1D1F]"
          >
            Continue Browsing
          </Link>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="mt-14 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-8">
        <h2 className="text-center font-sans text-sm font-medium text-[#6E6E73] mb-8">
          Order Fulfillment Pipeline
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1D1D1F] text-white">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <span className="mt-3 text-xs font-medium text-[#1D1D1F]">Order Confirmed</span>
            <span className="text-xs text-emerald-600 font-medium">Verified</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember/10 text-ember border border-ember/20">
              <Cpu className="h-6 w-6" />
            </div>
            <span className="mt-3 text-xs font-medium text-[#1D1D1F]">Lab Assembly</span>
            <span className="text-xs text-[#6E6E73]">Thermal Burn-in</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#6E6E73] border border-[#E5E5E7]">
              <Truck className="h-6 w-6" />
            </div>
            <span className="mt-3 text-xs font-medium text-[#6E6E73]">Out for Delivery</span>
            <span className="text-xs text-[#6E6E73]">Insured Crate</span>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[#6E6E73] border border-[#E5E5E7]">
              <Home className="h-6 w-6" />
            </div>
            <span className="mt-3 text-xs font-medium text-[#6E6E73]">Delivered</span>
            <span className="text-xs text-[#6E6E73]">Plug & Play</span>
          </div>
        </div>
      </div>

      {/* Order Details Breakdown */}
      {order && (
        <div className="mt-8 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-4">
            <div>
              <span className="text-xs text-[#6E6E73]">Order Reference</span>
              <h3 className="text-base font-medium text-[#1D1D1F]">{order.orderNumber}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-[#6E6E73]">Estimated Arrival</span>
              <p className="text-xs font-medium text-ember">{order.estimatedDelivery}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-medium text-[#6E6E73]">
              Purchased Hardware
            </h4>
            <div className="divide-y divide-line">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-[#E5E5E7]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="font-medium text-[#1D1D1F] block">{item.name}</span>
                      {item.configSummary && (
                        <span className="text-xs font-medium text-ember">{item.configSummary}</span>
                      )}
                      <span className="text-xs text-[#6E6E73] block">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-medium text-[#1D1D1F]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 border-t border-[#E5E5E7] pt-6 text-xs">
            <div>
              <span className="font-medium text-[#1D1D1F] block mb-1">Destination Address</span>
              <p className="text-[#6E6E73] leading-relaxed">
                {order.shippingAddress.fullName} <br />
                {order.shippingAddress.street} <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode} <br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>

            <div>
              <span className="font-medium text-[#1D1D1F] block mb-1">Payment Confirmation</span>
              <p className="text-[#6E6E73] leading-relaxed">
                Method: <strong className="text-[#1D1D1F] ">{order.paymentMethod}</strong> <br />
                Subtotal: {formatPrice(order.subtotal)} <br />
                Shipping: {order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)} <br />
                <span className="text-sm font-medium text-[#1D1D1F] mt-1.5 block">
                  Total Paid: {formatPrice(order.total)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-xs text-[#6E6E73]">Loading order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
