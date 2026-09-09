'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types/nabta';
import { Card } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Star, ShoppingCart, ShieldCheck, MapPin, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation(['marketplace', 'common']);
  const { currency, addToCart, activeScenario } = useNabta();
  const [added, setAdded] = React.useState(false);

  const isRecommended =
    product.scenarioMatchReason !== undefined ||
    product.suitableCrops.some((c) =>
      activeScenario.cropName.toLowerCase().includes(c.toLowerCase()) ||
      c.toLowerCase() === 'all horticulture'
    );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const availabilityLabel =
    product.availability === 'In Stock'
      ? t('marketplace:card.inStock')
      : product.availability === 'Low Stock'
      ? t('marketplace:card.lowStock')
      : t('marketplace:card.preOrder');

  return (
    <Card className="group overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-md transition-all text-start">
      {/* Product Image Slot */}
      <Link href={`/marketplace/${product.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 block">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Engine Match Tag */}
        {isRecommended && (
          <div className="absolute top-2.5 start-2.5 bg-[#003620]/90 backdrop-blur-sm text-white border border-[#10b981]/50 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#10b981]" />
            {t('marketplace:card.scenarioMatch')}
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-2.5 end-2.5">
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
            {availabilityLabel}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Supplier & Country Header */}
          <div className="flex items-center justify-between text-[11px] text-secondary font-mono">
            <span className="truncate max-w-[140px]">{product.supplierName}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3 h-3 text-secondary" />
              {product.countryOfOrigin}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/marketplace/${product.id}`} className="block mt-1">
            <h4 className="font-headline font-semibold text-sm text-on-surface line-clamp-2 hover:text-[#054f31] transition-colors">
              {product.name}
            </h4>
          </Link>

          {/* Rating */}
          <div className="mt-1.5 flex items-center gap-1 text-xs text-secondary">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ms-1 font-mono font-bold text-on-surface text-xs">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">
              ({product.reviewCount} {t('marketplace:card.reviews')})
            </span>
          </div>
        </div>

        {/* Technical Specification Chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
          {product.certifications.slice(0, 2).map((cert) => (
            <span
              key={cert}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
            >
              {cert}
            </span>
          ))}
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            {t('marketplace:card.moq')}: {product.minOrderQuantity}
          </span>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono text-secondary uppercase block">
              {t('marketplace:card.unitPrice')}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-headline font-bold text-base text-on-surface">
                {formatCurrency(product.priceUSD, currency)}
              </span>
              <span className="text-[10px] text-secondary">/ {product.unit}</span>
            </div>
          </div>

          <Button
            size="sm"
            variant={added ? 'secondary' : 'primary'}
            onClick={handleAddToCart}
            icon={added ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          >
            {added ? t('marketplace:card.added') : t('marketplace:card.addToCart')}
          </Button>
        </div>
      </div>
    </Card>
  );
}
