'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, User, Heart, ShoppingCart, Menu, X, ChevronDown, Scale, ArrowUpRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const COMPONENT_LINKS = [
  { href: '/components?category=processor', label: 'Processors (CPUs)' },
  { href: '/components?category=gpu', label: 'Graphics Cards (GPUs)' },
  { href: '/components?category=motherboard', label: 'Motherboards' },
  { href: '/components?category=ram', label: 'Memory (RAM)' },
  { href: '/components?category=storage', label: 'Storage (M.2 NVMe)' },
  { href: '/components?category=cooler', label: 'Cooling & Fans' },
];

const ACCESSORY_LINKS = [
  { href: '/accessories?category=Keyboards', label: 'Keyboards' },
  { href: '/accessories?category=Mice', label: 'Gaming Mice' },
  { href: '/accessories?category=Headsets', label: 'Headsets & Audio' },
  { href: '/accessories?category=Monitors', label: 'Monitors' },
  { href: '/accessories?category=Chairs', label: 'Gaming Chairs' },
];

const MOBILE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/gaming-pcs', label: 'Gaming PCs' },
  { href: '/components', label: 'Components' },
  { href: '/accessories', label: 'Accessories' },
  { href: '/build-your-pc', label: 'Build your PC' },
  { href: '/compare', label: 'Compare' },
  { href: '/support', label: 'Support & RMA' },
];

const navLink = (active: boolean) =>
  `flex items-center gap-1 px-3.5 py-2 text-[13px] tracking-wide transition-colors ${
    active
      ? 'text-[#1D1D1F] font-semibold underline decoration-[#1D1D1F] decoration-2 underline-offset-[10px]'
      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
  }`;

const iconButton =
  'relative flex h-10 w-10 items-center justify-center rounded-full text-[#6E6E73] transition-colors hover:bg-black/5 hover:text-[#1D1D1F]';

const badge =
  'absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1D1D1F] px-1 text-[10px] font-semibold leading-none text-white';

function NavDropdown({
  label,
  href,
  active,
  items,
}: {
  label: string;
  href: string;
  active: boolean;
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <Link href={href} className={navLink(active)} aria-haspopup="true" aria-expanded={open}>
        <span>{label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </Link>

      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div className="w-60 rounded-xl border border-black/10 bg-white p-1.5 shadow-xl shadow-black/10">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3.5 py-2.5 text-[13px] text-[#6E6E73] transition-colors hover:bg-black/5 hover:text-[#1D1D1F]"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const store = useStore();
  // false on the server and during hydration, true afterwards. The store loads
  // from localStorage before this (Suspense-wrapped) tree hydrates, so badge
  // counts must wait for this flag or they mismatch the server HTML.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const cartCount = mounted ? store.cartCount : 0;
  const wishlist = mounted ? store.wishlist : [];
  const compareList = mounted ? store.compareList : [];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/80 text-[#1D1D1F] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-display text-[1.7rem] font-extrabold leading-none tracking-[-0.03em] text-[#1D1D1F]"
          aria-label="GameForge home"
        >
          Game<span className="gradient-text">Forge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center md:flex" aria-label="Primary">
          <Link href="/" className={navLink(pathname === '/')}>
            Home
          </Link>
          <Link href="/gaming-pcs" className={navLink(pathname.startsWith('/gaming-pcs'))}>
            Gaming PCs
          </Link>
          <NavDropdown
            label="Components"
            href="/components"
            active={pathname.startsWith('/components')}
            items={COMPONENT_LINKS}
          />
          <NavDropdown
            label="Accessories"
            href="/accessories"
            active={pathname.startsWith('/accessories')}
            items={ACCESSORY_LINKS}
          />
          <Link href="/support" className={navLink(pathname === '/support')}>
            Support
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Link
            href="/build-your-pc"
            className={`mr-2 hidden h-9 items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-colors lg:inline-flex ${
              pathname.startsWith('/build-your-pc')
                ? 'border-[#1D1D1F] bg-[#1D1D1F] text-white'
                : 'border-black/15 bg-transparent text-[#1D1D1F] hover:border-[#1D1D1F] hover:text-[#6E6E73]'
            }`}
          >
            Build your PC
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </Link>

          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search RTX 4080, i9, PCs…"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="h-10 w-44 rounded-full border border-black/10 bg-black/5 pl-4 pr-10 text-sm text-[#1D1D1F] outline-none transition-colors placeholder:text-[#6E6E73] focus:border-[#1D1D1F] focus:bg-white sm:w-64"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="absolute right-3 text-[#6E6E73] transition-colors hover:text-[#1D1D1F]"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={iconButton}
              title="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </button>
          )}

          <Link href="/account" aria-label="Account" className={`${iconButton} hidden sm:flex`} title="Account">
            <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </Link>

          <Link href="/compare" aria-label="Compare systems" className={`${iconButton} hidden sm:flex`} title="Compare">
            <Scale className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {compareList.length > 0 && <span className={badge}>{compareList.length}</span>}
          </Link>

          <Link href="/wishlist" aria-label="Wishlist" className={iconButton} title="Wishlist">
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {wishlist.length > 0 && <span className={badge}>{wishlist.length}</span>}
          </Link>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            title="Cart"
            className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#1D1D1F] text-white transition-colors hover:bg-black"
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#1D1D1F] px-1 text-[10px] font-semibold leading-none text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            className={`${iconButton} md:hidden`}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-black/10 bg-white px-5 pb-8 pt-4 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-black/10 py-4 font-display text-[2rem] leading-none tracking-[-0.02em] text-[#1D1D1F] transition-colors hover:text-[#6E6E73]"
              >
                {link.label}
                <ArrowUpRight className="h-5 w-5 text-[#6E6E73]" strokeWidth={1.25} />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
