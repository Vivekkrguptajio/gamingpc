'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronRight,
  Clock,
  Wrench,
  Truck,
  Sparkles,
} from 'lucide-react';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'hardware',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', orderNumber: '', subject: 'hardware', message: '' });
  };

  return (
    <div className="w-[95%] max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#6E6E73] mb-6">
        <Link href="/" className="hover:text-ember transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ember font-medium">Customer Support</span>
      </nav>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 rounded-full bg-ember/10 px-3.5 py-1 text-xs font-medium text-ember mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>GameForge White-Glove Support</span>
        </div>
        <h1 className="editorial-headline font-semibold tracking-[-0.035em] text-3xl sm:text-6xl font-normal text-[#1D1D1F] tracking-[-0.03em]">
          Engineering Support & <span className="gradient-text">In-Home RMA</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#6E6E73] leading-relaxed">
          Connect directly with certified hardware engineers, track replacement parts, or get expert guidance on custom configuration builds.
        </p>
      </div>

      {/* Support Channel Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 text-center hover:border-ember transition-all">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ember/10 text-ember mb-4">
            <Phone className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium text-[#1D1D1F]">Toll-Free Hotline</h3>
          <p className="mt-1 text-xs font-medium text-[#1D1D1F]">+91 (800) 426-3367</p>
          <span className="mt-2 block text-xs text-[#6E6E73]">Mon - Sat: 9 AM - 9 PM IST</span>
        </div>

        <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 text-center hover:border-ember transition-all">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ember/10 text-ember mb-4">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium text-[#1D1D1F]">Engineer Desk</h3>
          <p className="mt-1 text-xs font-medium text-[#1D1D1F]">support@gameforge.com</p>
          <span className="mt-2 block text-xs text-[#6E6E73]">Average reply under 2 hours</span>
        </div>

        <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 text-center hover:border-ember transition-all">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-ember/10 text-ember mb-4">
            <MessageSquare className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium text-[#1D1D1F]">Discord Guild</h3>
          <p className="mt-1 text-xs font-medium text-[#1D1D1F]">discord.gg/gameforge</p>
          <span className="mt-2 block text-xs text-[#6E6E73]">24/7 Live gamer community</span>
        </div>

        <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 text-center hover:border-ember transition-all">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-medium text-[#1D1D1F]">On-Site Warranty</h3>
          <p className="mt-1 text-xs font-medium text-emerald-600">2 Years Pan-India</p>
          <span className="mt-2 block text-xs text-[#6E6E73]">Doorstep pickup & technician</span>
        </div>
      </div>

      {/* Contact Form & FAQs Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        {/* Contact Form (Col 6) */}
        <div className="lg:col-span-6 rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-6 sm:p-10">
          <div className="border-b border-[#E5E5E7] pb-4 mb-6">
            <h2 className="font-display font-normal tracking-[-0.02em] text-xl text-[#1D1D1F]">Direct Hardware Inquiry</h2>
            <p className="mt-1 text-xs text-[#6E6E73]">
              Send your questions or custom PC requests directly to our assembly lab.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-[#1D1D1F] font-medium block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[#1D1D1F] font-medium block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
                />
              </div>

              <div>
                <label className="text-[#1D1D1F] font-medium block mb-1">Order ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. GF-12345678"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[#1D1D1F] font-medium block mb-1">Inquiry Topic</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
              >
                <option value="hardware">Custom PC Component Compatibility</option>
                <option value="status">Order Tracking & Shipping Logistics</option>
                <option value="warranty">Warranty Claim & On-site RMA</option>
                <option value="partnership">Bulk / Esports Arena Inquiries</option>
              </select>
            </div>

            <div>
              <label className="text-[#1D1D1F] font-medium block mb-1">Detailed Message</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your gaming requirements, desired frame rates, or specific hardware questions..."
                className="w-full rounded-xl border border-[#E5E5E7] bg-white/5 px-4 py-3 text-[#1D1D1F] outline-none focus:border-ember focus:bg-[#F5F5F7] transition-all"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] text-white py-3 text-xs font-medium hover:bg-ember transition-all"
            >
              <Send className="h-4 w-4" />
              <span>Send Message to Engineers</span>
            </button>

            {submitted && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-800 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Message delivered! A GameForge engineer will respond within 2 hours.</span>
              </div>
            )}
          </form>
        </div>

        {/* FAQs Section (Col 6) */}
        <div id="faqs" className="lg:col-span-6 space-y-4">
          <div className="mb-6">
            <h2 className="font-display font-normal tracking-[-0.02em] text-xl text-[#1D1D1F]">Frequently Asked Questions</h2>
            <p className="mt-1 text-xs text-[#6E6E73]">
              Clear answers regarding our shipping packaging, warranty terms, and testing standards.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-5">
              <h4 className="font-medium text-[#1D1D1F] text-sm flex items-center gap-2">
                <Truck className="h-4 w-4 text-ember" />
                How is my gaming PC packaged and safely shipped?
              </h4>
              <p className="mt-2 text-[#6E6E73] leading-relaxed">
                Every desktop is packed with internal expandable instapak expanding foam to secure the GPU and cooler, sealed in an anti-static bag, double-boxed, and shipped in a reinforced wooden crate with comprehensive transit insurance.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-5">
              <h4 className="font-medium text-[#1D1D1F] text-sm flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-ember" />
                What does the 2-Year On-Site Warranty cover?
              </h4>
              <p className="mt-2 text-[#6E6E73] leading-relaxed">
                Our warranty covers 100% parts replacement, lab repair labor, and two-way doorstep pickup and return anywhere in India. If a component fails, our technical team sends an engineer or replacement parts promptly.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-5">
              <h4 className="font-medium text-[#1D1D1F] text-sm flex items-center gap-2">
                <Wrench className="h-4 w-4 text-ember" />
                Can I upgrade components in the future without voiding warranty?
              </h4>
              <p className="mt-2 text-[#6E6E73] leading-relaxed">
                Yes! We never use proprietary connectors or locked BIOSes. You have total freedom to swap or upgrade storage, RAM, or graphics cards without voiding your warranty on other untouched components.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E5E7] bg-[#F5F5F7] p-5">
              <h4 className="font-medium text-[#1D1D1F] text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-ember" />
                How long does assembly and stress testing take?
              </h4>
              <p className="mt-2 text-[#6E6E73] leading-relaxed">
                Ready-to-ship prebuilts ship within 24 hours. Custom builder orders go through a thorough 24-hour FurMark and Prime95 stress test and ship within 48 to 72 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
