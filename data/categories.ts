export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'gaming-pcs',
    name: 'Gaming PCs',
    slug: 'gaming-pcs',
    image: '/images/categories/gaming-pcs.png',
    itemCount: 8,
    description: 'Engineered for esports dominance, streaming, and maximum FPS.',
  },
  {
    id: 'graphics-cards',
    name: 'Graphics Cards',
    slug: 'components?category=gpu',
    image: '/images/categories/graphics-cards.png',
    itemCount: 7,
    description: 'NVIDIA RTX 40-Series and AMD Radeon RX 7000 GPUs.',
  },
  {
    id: 'processors',
    name: 'Processors',
    slug: 'components?category=processor',
    image: '/images/categories/processors.png',
    itemCount: 6,
    description: 'Intel 14th Gen and AMD Ryzen 7000/9000 flagship CPUs.',
  },
  {
    id: 'ram',
    name: 'RAM',
    slug: 'components?category=ram',
    image: '/images/categories/ram.png',
    itemCount: 5,
    description: 'High-frequency DDR5 memory kits with RGB lightbars.',
  },
  {
    id: 'ssds',
    name: 'Storage',
    slug: 'components?category=storage',
    image: '/images/categories/storage.png',
    itemCount: 6,
    description: 'Ultra-fast PCIe Gen4 and Gen5 NVMe solid state drives.',
  },
  {
    id: 'motherboards',
    name: 'Motherboards',
    slug: 'components?category=motherboard',
    image: '/images/categories/motherboards.png',
    itemCount: 6,
    description: 'Z790, B760, and X670E gaming motherboards with armored VRMs.',
  },
  {
    id: 'coolers',
    name: 'Cooling',
    slug: 'components?category=cooler',
    image: '/images/categories/cooling.png',
    itemCount: 5,
    description: '360mm AIO liquid coolers with LCD displays and tower air coolers.',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    image: '/images/categories/accessories.png',
    itemCount: 8,
    description: 'Mechanical keyboards, lightweight mice, and spatial audio headsets.',
  },
];
