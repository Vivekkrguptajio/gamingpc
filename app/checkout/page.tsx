'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  Truck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, placeOrder, user } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    street: user.savedAddresses[0]?.street || '123 Gaming Street, Cyber City, Phase 2',
    city: user.savedAddresses[0]?.city || 'Bengaluru',
    state: user.savedAddresses[0]?.state || 'Karnataka',
    pincode: user.savedAddresses[0]?.pincode || '560100',
  });

  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('gaming@okhdfcbank');

  const shippingCost = deliveryOption === 'express' ? 499 : 0;
  const grandTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="mx-auto w-[95%] max-w-[1440px] px-4 py-24 text-center">
        <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
          No items in cart to <span className="gradient-text">checkout</span>
        </h1>
        <Link
          href="/gaming-pcs"
          className="mt-6 inline-block rounded-full bg-[#1D1D1F] text-white px-7 py-3.5 text-xs font-medium hover:bg-ember transition-all"
        >
          Explore Gaming Desktops
        </Link>
      </div>
    );
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step === 1 ? 2 : 3);
    } else {
      const newOrder = placeOrder({
        status: 'Confirmed',
        items: cart.map((item) => ({
          name: item.name,
          image: item.image,
          price: item.finalPrice,
          quantity: item.quantity,
          configSummary: item.selectedConfig?.ram
            ? `${item.selectedConfig.ram} / ${item.selectedConfig.storage}`
            : undefined,
        })),
        shippingAddress: formData,
        deliveryOption,
        paymentMethod,
        subtotal: cartTotal,
        discount: 0,
        shipping: shippingCost,
        total: grandTotal,
        estimatedDelivery:
          deliveryOption === 'express'
            ? 'Within 48 Hours'
            : '3 - 5 Business Days',
      });

      router.push(`/order-success?orderId=${newOrder.orderNumber}`);
    }
  };

  return (
    <div className="mx-auto w-[95%] max-w-[1440px] px-3 py-8 sm:px-6 lg:px-8 text-[#1D1D1F]">
      {/* Header & Steps Breadcrumb */}
      <div className="border-b border-[#E5E5E7] pb-6">
        <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
          Order <span className="gradient-text">Checkout</span>
        </h1>
        <div className="mt-4 flex items-center gap-3 text-xs">
          <span
            className={`flex items-center gap-2 font-medium ${
              step >= 1 ? 'text-ember' : 'text-[#6E6E73]'
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember/10 text-[11px]">
              1
            </span>
            <span>Shipping</span>
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-line" />

          <span
            className={`flex items-center gap-2 font-medium ${
              step >= 2 ? 'text-ember' : 'text-[#6E6E73]'
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember/10 text-[11px]">
              2
            </span>
            <span>Payment</span>
          </span>
          <ChevronRight className="h-3.5 w-3.5 text-line" />

          <span
            className={`flex items-center gap-2 font-medium ${
              step === 3 ? 'text-ember' : 'text-[#6E6E73]'
            }`}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ember/10 text-[11px]">
              3
            </span>
            <span>Review</span>
          </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Form Area (Col 7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleNextStep} className="space-y-6">
            {step === 1 && (
              <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-7 space-y-4">
                <h2 className="font-display font-normal tracking-[-0.02em] font-sans text-base text-[#1D1D1F]">
                  1. Contact & Shipping Address
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-[#6E6E73]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6E6E73]">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6E6E73]">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium text-[#6E6E73]">Street Address / House / Flat</label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6E6E73]">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6E6E73]">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#6E6E73]">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] outline-none focus:border-[#1D1D1F] focus:bg-[#F5F5F7]"
                    />
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mt-6 border-t border-[#E5E5E7] pt-5">
                  <h3 className="font-sans text-xs font-medium text-[#1D1D1F]">
                    Delivery Method
                  </h3>
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label
                      onClick={() => setDeliveryOption('standard')}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                        deliveryOption === 'standard'
                          ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                          : 'border-[#E5E5E7] bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-ember" />
                        <div>
                          <span className="block text-xs font-medium text-[#1D1D1F]">Standard Crate</span>
                          <span className="text-xs text-[#6E6E73]">3 - 5 business days</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-emerald-600">FREE</span>
                    </label>

                    <label
                      onClick={() => setDeliveryOption('express')}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                        deliveryOption === 'express'
                          ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                          : 'border-[#E5E5E7] bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="h-5 w-5 text-ember" />
                        <div>
                          <span className="block text-xs font-medium text-[#1D1D1F]">Express Air Priority</span>
                          <span className="text-xs text-[#6E6E73]">1 - 2 business days</span>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-[#1D1D1F]">₹499</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] text-white py-4 text-sm font-medium hover:bg-ember transition-all"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-7 space-y-4">
                <h2 className="font-display font-normal tracking-[-0.02em] font-sans text-base text-[#1D1D1F]">2. Payment Method</h2>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                        : 'border-[#E5E5E7] bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="h-5 w-5 text-ember" />
                      <div>
                        <span className="block text-xs font-medium text-[#1D1D1F]">
                          UPI (GPay, PhonePe, Paytm, BHIM)
                        </span>
                        <span className="text-xs text-[#6E6E73]">Zero Transaction Fees</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-ember">Instant</span>
                  </label>

                  {paymentMethod === 'upi' && (
                    <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-4 text-xs">
                      <label className="text-[#6E6E73] font-medium">Enter UPI ID / VPA</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3.5 py-2.5 text-[#1D1D1F] font-medium outline-none focus:border-ember"
                      />
                    </div>
                  )}

                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                        : 'border-[#E5E5E7] bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-ember" />
                      <div>
                        <span className="block text-xs font-medium text-[#1D1D1F]">Credit / Debit Card</span>
                        <span className="text-xs text-[#6E6E73]">Visa, MasterCard, RuPay, Amex</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                      paymentMethod === 'netbanking'
                        ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                        : 'border-[#E5E5E7] bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-[#1D1D1F]" />
                      <div>
                        <span className="block text-xs font-medium text-[#1D1D1F]">Net Banking</span>
                        <span className="text-xs text-[#6E6E73]">All major Indian banks supported</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-ember bg-[#F5F5F7] ring-2 ring-ember/20'
                        : 'border-[#E5E5E7] bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Banknote className="h-5 w-5 text-amber-600" />
                      <div>
                        <span className="block text-xs font-medium text-[#1D1D1F]">Cash on Delivery</span>
                        <span className="text-xs text-[#6E6E73]">Pay upon doorstep inspection</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-5 py-3.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-[#1D1D1F] text-white py-3.5 text-xs sm:text-sm font-medium hover:bg-ember transition-all"
                  >
                    Continue to Review
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-7 space-y-4">
                <h2 className="font-display font-normal tracking-[-0.02em] font-sans text-base text-[#1D1D1F]">3. Final Order Review</h2>

                <div className="rounded-xl bg-white/5 p-5 text-xs space-y-2.5 border border-[#E5E5E7]">
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Ship to:</span>
                    <span className="font-medium text-[#1D1D1F] text-right">
                      {formData.fullName}, {formData.street}, {formData.city}, {formData.state} - {formData.pincode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Contact:</span>
                    <span className="text-[#1D1D1F] font-medium">{formData.phone} | {formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Delivery Method:</span>
                    <span className="text-ember font-medium ">{deliveryOption}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E6E73]">Payment:</span>
                    <span className="text-[#1D1D1F] font-medium ">{paymentMethod}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-5 py-3.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-[#1D1D1F] text-white py-4 text-xs sm:text-sm font-medium hover:bg-ember transition-all"
                  >
                    Confirm & Place Order ({formatPrice(grandTotal)})
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Order Summary (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-7">
            <h3 className="font-sans text-base font-medium text-[#1D1D1F] mb-4">
              Hardware in Order ({cart.length})
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 divide-y divide-line">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-3 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-[#E5E5E7]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <span className="font-medium text-[#1D1D1F] block line-clamp-1">{item.name}</span>
                      <span className="text-xs text-[#6E6E73]">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-medium text-[#1D1D1F] shrink-0">
                    {formatPrice(item.finalPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[#E5E5E7] pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#6E6E73] font-medium">
                <span>Items Subtotal</span>
                <span className="font-medium text-[#1D1D1F]">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-[#6E6E73] font-medium">
                <span>Shipping</span>
                <span className={shippingCost === 0 ? 'text-emerald-600 font-medium' : 'text-[#1D1D1F]'}>
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="border-t border-[#E5E5E7] pt-3 flex items-baseline justify-between text-[#1D1D1F]">
                <span className="text-sm font-medium">Total Payable</span>
                <span className="font-sans text-2xl font-medium">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
