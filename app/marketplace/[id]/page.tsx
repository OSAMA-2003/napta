'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useNabta } from '@/context/NabtaContext';
import { RecommendationBanner } from '@/components/marketplace/RecommendationBanner';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  MapPin,
  Building2,
  Check,
  Package,
} from 'lucide-react';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { products, activeScenario, activeFarm, addToCart, currency } = useNabta();

  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState<number>(() => product?.minOrderQuantity || 1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-headline font-bold text-on-surface">Product Not Found</h2>
        <p className="text-xs text-secondary">The requested agricultural input SKU does not exist or has been discontinued.</p>
        <Link href="/marketplace">
          <Button variant="primary" size="sm">Return to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Global Catalog</span>
      </Link>

      {/* Dynamic Agricultural Engine Compatibility Banner */}
      <RecommendationBanner
        product={product}
        activeScenario={activeScenario}
        activeFarm={activeFarm}
      />

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-headline font-bold text-on-surface uppercase text-[11px] block">
              Logistics &amp; Customs
            </span>
            <div className="flex items-start gap-2 text-secondary">
              <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{product.shippingInformation}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary pt-1 border-t border-slate-200/60 font-mono text-[11px]">
              <Package className="w-3.5 h-3.5 text-secondary" />
              <span>Standard Unit: {product.unit} (MOQ: {product.minOrderQuantity})</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Details & Buy Box (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Title & Origin */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={
                  product.availability === 'In Stock'
                    ? 'mint'
                    : product.availability === 'Low Stock'
                    ? 'amber'
                    : 'slate'
                }
                size="sm"
                dot
              >
                {product.availability} ({product.stockQuantity} Available)
              </Badge>
              <span className="text-xs font-mono text-secondary uppercase tracking-wider">
                Category: {product.category}
              </span>
            </div>

            <h1 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface tracking-tight">
              {product.name}
            </h1>

            {/* Supplier and Manufacturer */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-secondary mt-2">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Supplier: <strong className="text-on-surface">{product.supplierName}</strong>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Origin: <strong className="text-on-surface">{product.countryOfOrigin}</strong>
              </span>
              <span>•</span>
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 font-bold text-on-surface">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400 ml-1">({product.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Pricing & Purchase Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono text-secondary uppercase block">
                  Wholesale Price
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline font-extrabold text-3xl text-on-surface">
                    {formatCurrency(product.priceUSD, currency)}
                  </span>
                  <span className="text-xs text-secondary font-mono">/ {product.unit}</span>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full font-semibold">
                B2B Volume Verified
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
              <span className="text-xs font-semibold text-on-surface">Order Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
                  className="px-3 py-1.5 text-xs text-secondary hover:bg-slate-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min={product.minOrderQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || 1))}
                  className="w-16 text-center font-mono text-xs font-semibold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-xs text-secondary hover:bg-slate-100"
                >
                  +
                </button>
              </div>
              <span className="text-xs font-mono text-secondary">
                Subtotal: <strong>{formatCurrency(product.priceUSD * quantity, currency)}</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Button
                variant={added ? 'secondary' : 'primary'}
                size="md"
                onClick={handleAddToCart}
                icon={added ? <Check className="w-4 h-4 text-emerald-600" /> : <ShoppingCart className="w-4 h-4" />}
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button variant="secondary" size="md" onClick={handleBuyNow}>
                Proceed to Checkout
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs font-body">
            <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">
              Product Overview
            </h3>
            <p className="text-secondary leading-relaxed">{product.description}</p>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-2">
            <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">
              Technical Specifications
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full divide-y divide-slate-200">
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-mono font-semibold text-secondary w-1/3 bg-slate-50/50">
                        {key}
                      </td>
                      <td className="py-2.5 px-4 font-body text-on-surface">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Suitable Crops & Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-headline font-bold text-on-surface text-[11px] uppercase tracking-wider block">
                Suitable Crop Varieties
              </span>
              <div className="flex flex-wrap gap-1">
                {product.suitableCrops.map((c) => (
                  <span key={c} className="px-2 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-headline font-bold text-on-surface text-[11px] uppercase tracking-wider block">
                Standard Certifications
              </span>
              <div className="flex flex-wrap gap-1">
                {product.certifications.map((cert) => (
                  <span key={cert} className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-semibold">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
