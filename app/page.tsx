import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Cpu, Headphones, ShieldCheck, Truck } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import FeaturedRigCard from '@/components/home/FeaturedRigCard';
import PcViewer from '@/components/home/PcViewer';
import { formatPrice } from '@/lib/utils';

const wrap = 'mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12';
const eyebrow = 'font-mono text-[11px] uppercase tracking-[0.16em]';

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

const performanceTiers = [
  {
    level: '01',
    title: 'Esports & 1080p',
    rigName: 'Forge Nova 3060',
    description:
      'Maximum frames per rupee. High-refresh responsiveness in CS2, Valorant, Fortnite and Apex Legends.',
    price: 59999,
    gpu: 'RTX 3060 12GB',
    cpu: 'Core i5-12400F',
    image: '/images/products/forge-nova-3060.png',
    slug: 'forge-nova-3060',
    badge: 'Best value',
  },
  {
    level: '02',
    title: '1440p Competitive',
    rigName: 'ShadowBlade 4060',
    description:
      'The sweet spot for 1440p ray-traced visuals and smooth AAA gaming, powered by DLSS 3 Frame Generation.',
    price: 79999,
    gpu: 'RTX 4060 8GB',
    cpu: 'Core i5-14400F',
    image: '/images/products/shadowblade-4060.png',
    slug: 'shadowblade-4060',
    badge: 'Most popular',
  },
  {
    level: '03',
    title: 'High Performance',
    rigName: 'Forge Elite 4070',
    description:
      'A snow-white panoramic chassis with liquid cooling, white sleeved cables and high-frequency DDR5.',
    price: 119999,
    gpu: 'RTX 4070 12GB White',
    cpu: 'Core i7-14700F',
    image: '/images/products/forge-elite-4070.png',
    slug: 'forge-elite-4070',
    badge: 'Snow edition',
  },
  {
    level: '04',
    title: 'Enthusiast Flagship',
    rigName: 'Forge Titan 4090',
    description:
      'Uncapped 4K. A 24-core Core i9-14900K, GeForce RTX 4090 24GB and a custom liquid cooling loop.',
    price: 249999,
    gpu: 'RTX 4090 24GB',
    cpu: 'Core i9-14900K',
    image: '/images/products/forge-titan-4090.png',
    slug: 'forge-titan-4090',
    badge: 'Flagship',
  },
];

const accessoriesShowcase = [
  {
    id: 'acc-1',
    name: 'Apex Pro Mechanical Keyboard',
    category: 'Keyboards',
    specs: 'Linear optical · PBT keycaps · Per-key RGB',
    price: 6499,
    originalPrice: 7999,
    image: '/images/accessories/keyboard-rgb.png',
  },
  {
    id: 'acc-2',
    name: 'Viper Strike Wireless Mouse',
    category: 'Mice',
    specs: '54g · 26K DPI · 8000Hz polling',
    price: 3999,
    originalPrice: 4999,
    image: '/images/accessories/mouse-wireless.png',
  },
  {
    id: 'acc-3',
    name: 'AeroSound Pro Wireless Headset',
    category: 'Audio',
    specs: '50mm drivers · 2.4GHz · Dolby Atmos',
    price: 4999,
    originalPrice: 5999,
    image: '/images/accessories/headset-pro.png',
  },
  {
    id: 'acc-4',
    name: 'Quantum Horizon 34" Curved Monitor',
    category: 'Monitors',
    specs: '165Hz WQHD · 1000R · 1ms',
    price: 32999,
    originalPrice: 38999,
    image: '/images/accessories/monitor-curved.png',
  },
  {
    id: 'acc-5',
    name: 'Titan Pro Racing Chair',
    category: 'Chairs',
    specs: '4D armrests · Memory foam · Steel frame',
    price: 18999,
    originalPrice: 22999,
    image: '/images/accessories/gaming-chair.png',
  },
];

const heroLedger = [
  { label: 'Graphics', value: 'GeForce RTX 4090 24GB' },
  { label: 'Thermals', value: 'Sub-60°C custom loop' },
  { label: 'Memory', value: '64GB DDR5' },
  { label: 'Warranty', value: '2-year on-site RMA' },
];

const builderSpecs = [
  { label: 'Graphics', value: 'RTX 4090 24GB' },
  { label: 'Processor', value: 'Core i9-14900K' },
  { label: 'Memory', value: '64GB DDR5 RGB' },
  { label: 'Cooling', value: '360mm LCD AIO' },
];

const trust = [
  {
    icon: Cpu,
    title: 'Carefully selected parts',
    body: 'Tier-one silicon from NVIDIA, Intel, AMD, ASUS and Corsair. Nothing proprietary, nothing generic.',
  },
  {
    icon: ShieldCheck,
    title: 'Two-year warranty',
    body: 'Parts, labour and doorstep pickup across India, with no hidden fees.',
  },
  {
    icon: Headphones,
    title: 'Lifetime support',
    body: 'Talk to the engineers who built your machine, for upgrades, BIOS updates and diagnostics.',
  },
  {
    icon: Truck,
    title: 'Crated and insured',
    body: 'Expanding-foam bracing, double-wall cartons and fully insured freight to your door.',
  },
];

function SectionHead({
  index,
  label,
  title,
  href,
  cta,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  href?: string;
  cta?: string;
  light?: boolean;
}) {
  return (
    <div className="reveal mb-12 flex flex-col justify-between gap-6 sm:mb-16 sm:flex-row sm:items-end">
      <div>
        <p className={`${eyebrow} text-[#6E6E73]`}>
          <span className="gradient-text">{index}</span>
          <span className="mx-3 opacity-40">/</span>
          {label}
        </p>
        <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1D1D1F]">
          {title}
        </h2>
      </div>
      {href && cta && (
        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#6E6E73] text-[#1D1D1F]"
        >
          <span className="border-b border-current pb-0.5">{cta}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  const featuredPCs = PRODUCTS.filter((p) => p.category === 'gaming-pcs').slice(0, 4);

  return (
    <div className="w-full bg-white text-[#1D1D1F]">
      {/* 01 — Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className={`${wrap} pb-12 pt-16 text-center sm:pt-24`}>
          <p className="rise text-lg font-semibold sm:text-xl">
            <span className="gradient-text">GameForge Flagship</span>
          </p>

          <h1
            className="rise mx-auto mt-3 max-w-4xl font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#1D1D1F]"
            style={delay(0.08)}
          >
            Built to play
            <br />
            <span className="gradient-text">beyond.</span>
          </h1>

          <p
            className="rise mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#6E6E73] sm:text-xl"
            style={delay(0.16)}
          >
            Hand-built gaming PCs, burn-tested for 24 hours and backed by a two-year on-site
            warranty across India.
          </p>

          <div className="rise mt-8 flex flex-wrap items-center justify-center gap-4" style={delay(0.24)}>
            <Link
              href="/gaming-pcs"
              className="inline-flex h-11 items-center rounded-full bg-[#1D1D1F] px-6 text-[15px] font-medium text-white transition-colors hover:bg-black"
            >
              Shop gaming PCs
            </Link>
            <Link
              href="/build-your-pc"
              className="group inline-flex items-center gap-1 text-[15px] font-medium text-[#1D1D1F] hover:underline"
            >
              Build your own
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className={`${wrap} pb-6`}>
          <div
            className="rise relative h-[480px] overflow-hidden rounded-[2rem] bg-[#F5F5F7] sm:h-[620px] sm:rounded-[2.5rem] lg:h-[700px]"
            style={delay(0.3)}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-[8%] top-[10%] h-72 w-72 rounded-full bg-[#8b5cf6]/25 blur-[90px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-[#ec4899]/25 blur-[90px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[-6%] left-[38%] h-64 w-64 rounded-full bg-[#f59e0b]/25 blur-[90px]"
            />
            <PcViewer />
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {heroLedger.map((item) => (
              <div key={item.label} className="text-center">
                <dt className="text-xs font-medium text-[#6E6E73]">{item.label}</dt>
                <dd className="mt-1 text-sm font-semibold text-[#1D1D1F]">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 02 — Categories */}
      <section className="border-t border-[#D2D2D7] py-20 sm:py-28">
        <div className={wrap}>
          <SectionHead
            index="01"
            label="Shop by category"
            title={
              <>
                Everything a rig <span className="gradient-text">needs.</span>
              </>
            }
            href="/gaming-pcs"
            cta="View all systems"
          />

          <ul className="reveal grid grid-cols-2 border-l border-t border-[#D2D2D7] sm:grid-cols-4 lg:grid-cols-8">
            {CATEGORIES.map((cat) => (
              <li key={cat.id} className="border-b border-r border-[#D2D2D7]">
                <Link
                  href={`/${cat.slug}`}
                  className="group flex h-full flex-col items-center px-3 py-7 text-center transition-colors duration-300 hover:bg-[#F5F5F7]"
                >
                  <span className="relative block h-16 w-16">
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      sizes="64px"
                    />
                  </span>
                  <span className="mt-5 text-sm font-medium text-[#1D1D1F] transition-colors group-hover:text-[#6E6E73]">
                    {cat.name}
                  </span>
                  <span className={`${eyebrow} mt-1.5 text-[10px] text-[#6E6E73]`}>{cat.itemCount} models</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Featured rigs */}
      <section className="border-t border-[#D2D2D7] py-20 sm:py-28">
        <div className={wrap}>
          <SectionHead
            index="02"
            label="Flagship rigs"
            title={
              <>
                Meet your next <span className="gradient-text">machine.</span>
              </>
            }
            href="/gaming-pcs"
            cta="View all gaming PCs"
          />

          <div className="reveal grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPCs.map((pc) => (
              <FeaturedRigCard key={pc.id} product={pc} />
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Custom builder */}
      <section className="border-y border-[#D2D2D7] bg-[#F5F5F7] py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-14 lg:grid-cols-12 lg:gap-10`}>
          <div className="reveal lg:col-span-5">
            <p className={`${eyebrow} text-[#6E6E73]`}>
              <span className="gradient-text">03</span>
              <span className="mx-3 opacity-40">/</span>
              Custom build studio
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.75rem,5.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1D1D1F]">
              Your vision.
              <br />
              <span className="gradient-text">Your machine.</span>
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-[#6E6E73]">
              Choose the parts, shape the performance. Every combination is checked for socket,
              memory generation, wattage and thermal clearance before it reaches the bench.
            </p>

            <ol className="mt-10 border-t border-[#D2D2D7] text-sm">
              {[
                'Live CPU socket, RAM generation and wattage validation',
                'Cleanroom hand-assembly with braided cable routing',
                '24-hour stress-burn benchmark certificate included',
              ].map((item, i) => (
                <li key={item} className="flex items-baseline gap-5 border-b border-[#D2D2D7] py-4">
                  <span className={`${eyebrow} gradient-text`}>0{i + 1}</span>
                  <span className="text-[#1D1D1F] font-medium">{item}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/build-your-pc"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-[#1D1D1F] px-7 text-sm font-medium text-white transition-colors hover:bg-black"
              >
                Start building
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1D1F] transition-colors hover:text-[#6E6E73]"
              >
                <span className="border-b border-current pb-0.5">Explore components</span>
              </Link>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <Image
                src="/images/products/forge-titan-4090.png"
                alt="Forge Titan 4090 custom assembly showcase"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 90vw, 560px"
              />
            </div>
            <dl className="mt-6 grid grid-cols-2 border-t border-[#D2D2D7] sm:grid-cols-4">
              {builderSpecs.map((item) => (
                <div
                  key={item.label}
                  className="border-[#D2D2D7] py-5 pr-4 sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className={`${eyebrow} text-[#6E6E73]`}>{item.label}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-[#1D1D1F]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 05 — Performance tiers */}
      <section className="bg-white py-20 text-[#1D1D1F] sm:py-28 border-b border-[#D2D2D7]">
        <div className={wrap}>
          <SectionHead
            index="04"
            label="Performance collections"
            title={
              <>
                Tuned for your <span className="gradient-text">resolution.</span>
              </>
            }
          />

          <div className="reveal grid border-t border-[#D2D2D7] sm:grid-cols-2 lg:grid-cols-4">
            {performanceTiers.map((tier) => (
              <article
                key={tier.level}
                className="group flex flex-col border-b border-[#D2D2D7] p-6 sm:p-8 sm:odd:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0 transition-colors hover:bg-[#F5F5F7]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-[5rem] font-bold leading-none tracking-[-0.04em] text-[#1D1D1F]">
                    {tier.level}
                  </span>
                  <span className={`${eyebrow} mt-2 flex items-center gap-2 text-[10px] text-[#6E6E73]`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1D1D1F]" />
                    {tier.badge}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#1D1D1F]">{tier.title}</h3>
                <p className={`${eyebrow} mt-1.5 text-[#6E6E73]`}>{tier.rigName}</p>

                <Link
                  href={`/product/${tier.slug}`}
                  aria-label={`View ${tier.rigName}`}
                  className="relative my-7 block h-[210px] w-full"
                >
                  <Image
                    src={tier.image}
                    alt={tier.rigName}
                    fill
                    className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                  />
                </Link>

                <p className="text-sm leading-relaxed text-[#6E6E73]">{tier.description}</p>
                <p className={`${eyebrow} mt-5 text-[10px] leading-relaxed text-[#1D1D1F]`}>
                  {tier.gpu}
                  <br />
                  {tier.cpu}
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#D2D2D7] pt-5">
                  <div className="mt-6">
                    <span className={`${eyebrow} block text-[10px] text-[#6E6E73]`}>From</span>
                    <span className="text-xl font-semibold tabular-nums text-[#1D1D1F]">{formatPrice(tier.price)}</span>
                  </div>
                  <Link
                    href={`/product/${tier.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#6E6E73] text-[#1D1D1F]"
                  >
                    <span className="border-b border-current pb-0.5">Configure</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Accessories */}
      <section className="py-20 sm:py-28 bg-[#F5F5F7]">
        <div className={wrap}>
          <SectionHead
            index="05"
            label="Precision peripherals"
            title={
              <>
                Gear that keeps <span className="gradient-text">up.</span>
              </>
            }
            href="/accessories"
            cta="View all accessories"
          />

          <ul className="reveal grid border-t border-[#D2D2D7] sm:grid-cols-2 lg:grid-cols-5">
            {accessoriesShowcase.map((acc) => (
              <li
                key={acc.id}
                className="border-b border-[#D2D2D7] bg-white sm:odd:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0"
              >
                <Link
                  href="/accessories"
                  className="group flex h-full flex-col p-6 transition-all duration-300 hover:bg-[#F5F5F7]"
                >
                  <span className={`${eyebrow} text-[10px] text-[#6E6E73]`}>{acc.category}</span>

                  <span className="relative my-6 block h-40 w-full">
                    <Image
                      src={acc.image}
                      alt=""
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 18vw"
                    />
                  </span>

                  <h3 className="font-display text-lg font-bold tracking-tight text-[#1D1D1F] transition-colors group-hover:text-[#6E6E73]">
                    {acc.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#6E6E73]">{acc.specs}</p>

                  <div className="mt-auto flex items-end justify-between pt-6">
                    <div>
                      <span className="block text-base font-semibold tabular-nums text-[#1D1D1F]">{formatPrice(acc.price)}</span>
                      <span className="block text-xs tabular-nums text-[#6E6E73] line-through">
                        {formatPrice(acc.originalPrice)}
                      </span>
                    </div>
                    <ArrowUpRight
                      className="h-5 w-5 text-[#6E6E73] transition-colors group-hover:text-[#6E6E73]"
                      strokeWidth={1.25}
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — Brand story */}
      <section className="relative isolate overflow-hidden border-t border-[#D2D2D7] bg-white">
        <Image
          src="/images/banners/brand-battlestation.jpg"
          alt=""
          fill
          className="-z-20 object-cover opacity-20"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/95 to-white/70"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white to-transparent"
        />

        <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
          <div className="reveal">
            <p className={`${eyebrow} text-[#6E6E73]`}>
              <span className="gradient-text">06</span>
              <span className="mx-3 opacity-40">/</span>
              The GameForge philosophy
            </p>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.75rem,6.2vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#1D1D1F]">
              Made for those who <span className="gradient-text">play different.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#6E6E73]">
              True performance comes from hardware that works together, not from corporate compromises.
              Every GameForge desktop is built by hand, tuned for quiet, cool running and stress-tested
              before it reaches your desk.
            </p>
          </div>

          <dl className="reveal mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-[#D2D2D7] pt-10 lg:grid-cols-4">
            {[
              { value: '100%', label: 'Retail components, no proprietary parts' },
              { value: '24h', label: 'Thermal burn-in on every build' },
              { value: 'Zero', label: 'Bloatware or factory junk' },
              { value: '2 yrs', label: 'Pan-India in-home warranty' },
            ].map((stat) => (
              <div key={stat.value}>
                <dt className="font-display text-5xl leading-none tracking-[-0.02em] text-[#1D1D1F] sm:text-6xl">
                  {stat.value}
                </dt>
                <dd className="mt-3 max-w-[16rem] text-sm leading-relaxed text-[#6E6E73]">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 08 — Trust */}
      <section className="border-t border-[#D2D2D7] bg-[#F5F5F7] py-20 sm:py-24">
        <div className={wrap}>
          <ul className="reveal grid border-t border-[#D2D2D7] sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((item, i) => (
              <li
                key={item.title}
                className="border-b border-[#D2D2D7] bg-white p-6 sm:p-8 sm:odd:border-r sm:last:border-r-0 lg:border-r lg:last:border-r-0 lg:first:pl-0"
              >
                <div className="flex items-center justify-between">
                  <item.icon className="h-6 w-6 text-[#1D1D1F]" strokeWidth={1.25} />
                  <span className={`${eyebrow} text-[10px] text-[#6E6E73]`}>0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-xl font-normal text-[#1D1D1F]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E6E73]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
