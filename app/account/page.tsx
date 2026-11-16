'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  CreditCard,
  Sparkles,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';

export default function AccountDashboardPage() {
  const { user, orders, wishlist } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'settings'>('dashboard');

  const totalSaved = orders.reduce((acc, o) => acc + o.discount, 0) + 8240;

  return (
    <div className="w-[95%] max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73] mb-6">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">My Account</span>
      </nav>

      {/* Header */}
      <div className="mb-8 border-b border-[#E5E5E7] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ember/10 text-ember text-xs font-medium mb-2">
            GameForge Elite Lounge
          </div>
          <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-5xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
            Welcome back, <span className="gradient-text">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="mt-1 text-sm text-[#6E6E73]">
            Manage your hardware orders, builds, saved gear, and delivery details.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/gaming-pcs"
            className="inline-flex items-center gap-2 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-4 py-2 text-xs font-medium text-[#1D1D1F] hover:border-ember hover:text-ember transition-all"
          >
            <span>Explore PCs</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/build-your-pc"
            className="inline-flex items-center gap-2 rounded-full bg-[#1D1D1F] text-white px-4 py-2 text-xs font-medium hover:bg-ember transition-all"
          >
            <span>Custom Studio</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
        {/* Left Navigation Sidebar (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
            {/* User Profile Info */}
            <div className="flex items-center gap-4 border-b border-[#E5E5E7] pb-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ember text-xl font-medium text-[#1D1D1F]">
                VG
              </div>
              <div className="overflow-hidden">
                <h2 className="font-display font-normal tracking-[-0.02em] text-base text-[#1D1D1F] truncate">{user.name}</h2>
                <span className="text-xs text-[#6E6E73] block truncate">{user.email}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-ember">
                  <Sparkles className="h-3 w-3" /> VIP Elite Member
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="mt-5 space-y-1.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#1D1D1F] text-white'
                    : 'text-[#6E6E73] hover:bg-white/5 hover:text-[#1D1D1F]'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#1D1D1F] text-white'
                    : 'text-[#6E6E73] hover:bg-white/5 hover:text-[#1D1D1F]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="h-4 w-4" />
                  <span>My Orders</span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-[#1D1D1F]/10 text-[#1D1D1F]' : 'bg-white/5 text-[#6E6E73]'}`}>
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all ${
                  activeTab === 'wishlist'
                    ? 'bg-[#1D1D1F] text-white'
                    : 'text-[#6E6E73] hover:bg-white/5 hover:text-[#1D1D1F]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${activeTab === 'wishlist' ? 'bg-[#1D1D1F]/10 text-[#1D1D1F]' : 'bg-white/5 text-[#6E6E73]'}`}>
                  {wishlist.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  activeTab === 'addresses'
                    ? 'bg-[#1D1D1F] text-white'
                    : 'text-[#6E6E73] hover:bg-white/5 hover:text-[#1D1D1F]'
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>Saved Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                  activeTab === 'settings'
                    ? 'bg-[#1D1D1F] text-white'
                    : 'text-[#6E6E73] hover:bg-white/5 hover:text-[#1D1D1F]'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Account Preferences</span>
              </button>

              <div className="pt-3 border-t border-[#E5E5E7]">
                <button
                  onClick={() => alert('Demo Account Logged Out.')}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-rose-400 font-medium transition-colors hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Quick Help Card */}
          <div className="rounded-xl border border-[#E5E5E7] bg-white/5 p-6 text-xs space-y-2">
            <span className="font-medium text-[#1D1D1F] block text-sm">Need System Assistance?</span>
            <p className="text-[#6E6E73]">
              Our system engineers are available 24/7 for technical advice or warranty queries.
            </p>
            <Link
              href="/support"
              className="inline-flex items-center gap-1 font-medium text-ember hover:underline pt-1"
            >
              <span>Visit Support Center</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Tab Content (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Counters */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
                  <span className="text-xs font-medium text-[#6E6E73]">Total Orders</span>
                  <span className="mt-2 block text-3xl font-medium text-[#1D1D1F]">
                    {orders.length}
                  </span>
                  <span className="mt-1 text-xs text-[#6E6E73]">All builds delivered safely</span>
                </div>

                <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
                  <span className="text-xs font-medium text-[#6E6E73]">Saved Wishlist</span>
                  <span className="mt-2 block text-3xl font-medium text-[#1D1D1F]">
                    {wishlist.length}
                  </span>
                  <span className="mt-1 text-xs text-[#6E6E73]">Products bookmarked</span>
                </div>

                <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6">
                  <span className="text-xs font-medium text-[#6E6E73]">Member Savings</span>
                  <span className="mt-2 block text-3xl font-medium text-ember">
                    {formatPrice(totalSaved)}
                  </span>
                  <span className="mt-1 text-xs text-[#6E6E73]">VIP discounts unlocked</span>
                </div>
              </div>

              {/* Recent Orders List */}
              <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-[#E5E5E7] pb-4">
                  <h3 className="font-medium text-base text-[#1D1D1F]">Recent Hardware Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-medium text-ember hover:underline"
                  >
                    View All Orders
                  </button>
                </div>

                <div className="mt-4 divide-y divide-line">
                  {orders.slice(0, 3).map((ord) => (
                    <div key={ord.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-[#E5E5E7] p-1">
                          <Image
                            src={ord.items[0]?.image || '/images/products/shadowblade-4060.jpg'}
                            alt="Order item"
                            fill
                            className="object-cover rounded-xl"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-sm text-[#1D1D1F] block">
                            Order #{ord.orderNumber}
                          </span>
                          <span className="text-[#6E6E73]">{ord.items.length} item(s) • Placed on {ord.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="text-base font-medium text-[#1D1D1F]">
                          {formatPrice(ord.total)}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                              : 'bg-ember/10 text-ember border border-ember/20'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 sm:p-8 space-y-6">
              <h3 className="font-medium text-lg text-[#1D1D1F]">Complete Order History</h3>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="rounded-xl border border-[#E5E5E7] bg-white/5 p-5 text-xs space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E7] pb-3">
                      <div>
                        <span className="font-medium text-sm text-[#1D1D1F]">#{ord.orderNumber}</span>
                        <span className="text-[#6E6E73] ml-2 text-xs">Placed on {ord.date}</span>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 text-emerald-800 px-3 py-0.5 font-medium text-xs">
                        {ord.status}
                      </span>
                    </div>

                    <div className="divide-y divide-line">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="py-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] p-1">
                              <Image src={it.image} alt={it.name} fill className="object-cover rounded-xl" />
                            </div>
                            <div>
                              <span className="text-[#1D1D1F] font-medium block">{it.name}</span>
                              <span className="text-[#6E6E73]">Quantity: {it.quantity}</span>
                            </div>
                          </div>
                          <span className="font-medium text-sm text-[#1D1D1F]">{formatPrice(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between border-t border-[#E5E5E7] pt-3 font-medium text-sm text-[#1D1D1F]">
                      <span>Total Paid</span>
                      <span className="text-ember font-medium">{formatPrice(ord.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 sm:p-8">
              <h3 className="font-medium text-lg text-[#1D1D1F] mb-6">Saved Wishlist ({wishlist.length})</h3>
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xs text-[#6E6E73]">Your wishlist is currently empty.</p>
                  <Link
                    href="/gaming-pcs"
                    className="mt-4 inline-block rounded-full bg-[#1D1D1F] text-white px-4 py-2 text-xs font-medium hover:bg-ember"
                  >
                    Browse Gaming PCs
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-[#E5E5E7] bg-white/5 p-4 text-xs hover:border-ember transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F5F5F7] border border-[#E5E5E7] p-1">
                          <Image src={item.image} alt={item.name} fill className="object-cover rounded-xl" />
                        </div>
                        <div>
                          <span className="font-medium text-sm text-[#1D1D1F] block">{item.name}</span>
                          <span className="text-sm font-medium text-ember">{formatPrice(item.price)}</span>
                        </div>
                      </div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="rounded-full bg-[#1D1D1F] text-white px-4 py-2 text-xs font-medium hover:bg-ember transition-all"
                      >
                        View Product
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg text-[#1D1D1F]">Saved Shipping Addresses</h3>
                  <p className="text-xs text-[#6E6E73]">Manage doorstep delivery locations for your builds.</p>
                </div>
                <button
                  onClick={() => alert('Add Address Modal')}
                  className="flex items-center gap-1.5 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] px-3.5 py-2 text-xs font-medium text-[#1D1D1F] hover:border-ember hover:text-ember transition-all"
                >
                  <Plus className="h-4 w-4 text-ember" />
                  <span>Add New</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {user.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="rounded-xl border border-[#E5E5E7] bg-white/5 p-5 text-xs space-y-2 relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="rounded-md bg-ember/10 px-2.5 py-0.5 font-medium text-ember text-xs">
                        {addr.tag}
                      </span>
                      {addr.isDefault && (
                        <span className="text-xs text-emerald-600 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          Default Shipping
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-sm text-[#1D1D1F]">{user.name}</p>
                    <p className="text-[#6E6E73]">{addr.street}</p>
                    <p className="text-[#6E6E73]">
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-[#6E6E73] pt-1">Phone: {user.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-medium text-lg text-[#1D1D1F]">Account Preferences</h3>
                <p className="text-xs text-[#6E6E73]">Update your personal profile details and contact information.</p>
              </div>

              <div className="space-y-4 text-xs max-w-md">
                <div>
                  <label className="text-[#6E6E73] font-medium">Display Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-2.5 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
                  />
                </div>
                <div>
                  <label className="text-[#6E6E73] font-medium">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-2.5 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
                  />
                </div>
                <div>
                  <label className="text-[#6E6E73] font-medium">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={user.phone}
                    className="mt-1 w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-2.5 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => alert('Settings updated successfully')}
                  className="rounded-full bg-[#1D1D1F] text-white px-6 py-2.5 font-medium hover:bg-ember transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
