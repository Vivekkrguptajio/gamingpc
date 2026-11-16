'use client';

import ProductCard from '@/components/shared/ProductCard';
import { Product } from '@/types';

export default function FeaturedRigCard({ product }: { product: Product }) {
  return <ProductCard product={product} />;
}
