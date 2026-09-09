'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { RecommendationBanner } from '@/components/marketplace/RecommendationBanner';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import {
  ArrowLeft,
  ArrowRight,
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
  const { t, i18n } = useTranslation(['marketplace', 'common']);
  const { products, activeScenario, activeFarm, addToCart, currency, dir } = useNabta();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState<number>(() => product?.minOrderQuantity || 1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-headline font-bold text-on-surface">
          {t('marketplace:notFound')}
        </h2>
        <p className="text-xs text-secondary">
          {t('marketplace:notFoundDesc')}
        </p>
        <Link href="/marketplace">
          <Button variant="primary" size="sm">
            {t('marketplace:details.back')}
          </Button>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-start">
      {/* Back Link */}
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors"
      >
        <BackArrow className="w-3.5 h-3.5" />
        <span>{t('marketplace:details.back')}</span>
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
              {t('marketplace:details.shippingTitle')}
            </span>
            <div className="flex items-start gap-2 text-secondary">
              <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{product.shippingInformation}</span>
            </div>
            <div className="flex items-center gap-2 text-secondary pt-1 border-t border-slate-200/60 font-mono text-[11px]">
              <Package className="w-3.5 h-3.5 text-secondary" />
              <span>{product.unit} (MOQ: {product.minOrderQuantity})</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Specifications & Order Terminal (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="emerald" size="sm">
                {product.category.toUpperCase()}
              </Badge>
              <span className="text-xs font-mono text-secondary">
                {t('marketplace:details.sku')}: {product.id}
              </span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              {product.name}
            </h1>
            <p className="text-xs font-mono text-secondary mt-1">
              {product.subcategory}
            </p>
          </div>

          {/* Supplier & Origin Credential Pill */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <div>
                <span className="text-[10px] text-secondary uppercase block">
                  {t('marketplace:card.supplier')}
                </span>
                <strong className="text-on-surface font-sans">{product.supplierName}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              <div>
                <span className="text-[10px] text-secondary uppercase block">
                  {t('marketplace:card.origin')}
                </span>
                <strong className="text-on-surface font-sans">{product.countryOfOrigin}</strong>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-on-surface font-mono">{product.rating.toFixed(1)}</span>
              <span className="text-secondary font-sans text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Pricing & Procurement Box */}
          <div className="p-6 rounded-2xl border-2 border-primary/20 bg-[#003620]/5 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-mono text-secondary uppercase block">
                  {t('marketplace:details.wholesalePrice')}
                </span>
                <span className="font-headline font-black text-3xl text-on-surface">
                  {formatCurrency(product.priceUSD, currency)}
                </span>
                <span className="text-xs text-secondary font-mono"> / {product.unit}</span>
              </div>

              <Badge
                variant={product.availability === 'In Stock' ? 'mint' : 'amber'}
                size="md"
                dot
              >
                {product.availability === 'In Stock' ? t('marketplace:card.inStock') : t('marketplace:card.lowStock')}
              </Badge>
            </div>

            {/* Quantity Selector */}
            <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-on-surface">
                  {t('marketplace:details.orderQuantity')}:
                </span>
                <div className="flex items-center rounded-lg border border-slate-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
                    className="px-3 py-1 text-sm font-mono font-bold text-secondary hover:bg-slate-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={product.minOrderQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrderQuantity, parseInt(e.target.value) || product.minOrderQuantity))}
                    className="w-16 text-center text-xs font-mono font-bold py-1 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-mono font-bold text-secondary hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-end">
                <span className="text-[10px] font-mono text-secondary uppercase block">
                  {t('marketplace:details.subtotal')}
                </span>
                <span className="font-mono text-xl font-bold text-primary">
                  {formatCurrency(product.priceUSD * quantity, currency)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center gap-3">
              <Button
                variant={added ? 'secondary' : 'primary'}
                size="md"
                className="flex-1"
                onClick={handleAddToCart}
                icon={added ? <Check className="w-4 h-4 text-emerald-600" /> : <ShoppingCart className="w-4 h-4" />}
              >
                {added ? t('marketplace:card.added') : t('marketplace:card.addToCart')}
              </Button>
              <Button variant="secondary" size="md" onClick={handleBuyNow}>
                {t('common:actions.checkout')}
              </Button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
              <span>{t('marketplace:details.escrowNotice')}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs">
            <h4 className="font-headline font-bold text-sm text-on-surface">
              {t('marketplace:details.agronomicDesc')}
            </h4>
            <p className="text-secondary font-body leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3 pt-2">
            <h4 className="font-headline font-bold text-sm text-on-surface">
              {t('marketplace:details.specsTitle')}
            </h4>
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <table className="w-full">
                <tbody className="divide-y divide-slate-100 font-mono">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <tr key={key} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 text-secondary bg-slate-50/50 w-1/3">{key}</td>
                      <td className="py-2.5 px-4 font-semibold text-on-surface">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
