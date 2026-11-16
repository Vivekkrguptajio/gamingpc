import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductDetailClient from '@/components/products/ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedPCs = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 5);

  return <ProductDetailClient product={product} relatedPCs={relatedPCs} />;
}
