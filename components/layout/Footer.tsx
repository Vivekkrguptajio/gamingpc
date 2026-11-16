'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

const HARDWARE_LINKS = [
  { href: '/gaming-pcs', label: 'Gaming PCs' },
  { href: '/build-your-pc', label: 'Custom PC Builder' },
  { href: '/components', label: 'PC Components' },
  { href: '/accessories', label: 'Gaming Accessories' },
  { href: '/compare', label: 'Compare Systems' },
];

const SUPPORT_LINKS = [
  { href: '/support', label: 'Customer Support' },
  { href: '/support#faqs', label: 'Hardware FAQs' },
  { href: '/support#warranty', label: '2-Year Onsite Warranty' },
  { href: '/support', label: 'Shipping & Crate Delivery' },
  { href: '/account', label: 'Order Status & Tracking' },
];

const SOCIAL_LINKS = [
  { name: 'Discord', href: 'https://discord.gg/gameforge' },
  { name: 'YouTube', href: 'https://youtube.com' },
  { name: 'X', href: 'https://x.com' },
  { name: 'Instagram', href: 'https://instagram.com' },
];

const eyebrow = 'font-mono text-[11px] uppercase tracking-[0.16em]';
const linkClass = 'text-sm text-[#6E6E73] transition-colors hover:text-[#1D1D1F]';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="border-t border-black/10 bg-[#F5F5F7] text-[#6E6E73]">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-20 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link
              href="/"
              className="font-display text-4xl sm:text-5xl font-semibold leading-none tracking-[-0.035em] text-[#1D1D1F]"
              aria-label="GameForge home"
            >
              Game<span className="gradient-text">Forge</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed">
              Built to play beyond. Hand-built gaming machines, enthusiast components and competitive
              gear for those who play different.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${eyebrow} text-[10px] text-[#6E6E73] transition-colors hover:text-[#6E6E73]`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hardware */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <h4 className={`${eyebrow} text-[#1D1D1F]`}>Hardware</h4>
            <ul className="flex flex-col gap-3">
              {HARDWARE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <h4 className={`${eyebrow} text-[#1D1D1F]`}>Support &amp; care</h4>
            <ul className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-4">
            <h4 className={`${eyebrow} text-[#1D1D1F]`}>The dispatch</h4>
            <p className="max-w-sm text-sm leading-relaxed">
              New architecture drops, benchmark guides and private build allocations. Occasional, never noisy.
            </p>
            <form onSubmit={handleSubscribe} className="relative max-w-md">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="h-12 w-full rounded-full border border-black/15 bg-white pl-5 pr-14 text-sm text-[#1D1D1F] outline-none transition-colors placeholder:text-[#6E6E73] focus:border-[#1D1D1F]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#1D1D1F] text-white transition-colors hover:bg-black"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </form>
            <p aria-live="polite" className="min-h-5 text-xs text-[#1D1D1F]">
              {subscribed && (
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                  <Check className="h-3.5 w-3.5" strokeWidth={2} />
                  You&apos;re on the list.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-8 text-xs sm:flex-row sm:items-center">
          <p>© 2026 GameForge Systems Inc. Crafted for peak performance.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/support#privacy" className="transition-colors hover:text-[#1D1D1F]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/support#terms" className="transition-colors hover:text-[#1D1D1F]">
                Terms of Sale
              </Link>
            </li>
            <li>
              <Link href="/support#warranty" className="transition-colors hover:text-[#1D1D1F]">
                Warranty &amp; Returns
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
