'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Check,
  Store,
} from 'lucide-react';

export default function RecommendedProductsPage() {
  const { t, i18n } = useTranslation(['recommendations', 'common', 'marketplace']);
  const { activeScenario, activeFarm, products, addToCart, dir } = useNabta();
  const [bulkAdded, setBulkAdded] = useState(false);
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  // Filter products matching scenario
  const recommendedProducts = products.filter((p) => {
    const isCropMatch = p.suitableCrops.some((c) =>
      activeScenario.cropName.toLowerCase().includes(c.toLowerCase()) ||
      c.toLowerCase() === 'all horticulture' ||
      c.toLowerCase() === 'row crops'
    );
    const isScenarioEssential = activeScenario.recommendedCategoryIds.includes(p.category);
    return isCropMatch || isScenarioEssential;
  });

  const handleAddAll = () => {
    recommendedProducts.forEach((p) => addToCart(p, p.minOrderQuantity || 1));
    setBulkAdded(true);
    setTimeout(() => setBulkAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 text-start">
      {/* Back link & Top bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors"
          >
            <BackArrow className="w-3.5 h-3.5" />
            <span>{t('recommendations:products.backToReport')}</span>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="emerald" size="sm" dot>
              {t('recommendations:products.badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('recommendations:products.targetLabel')}: {activeScenario.cropName} ({activeScenario.variety})
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('recommendations:products.title')}
          </h1>
          <p className="text-xs sm:text-sm text-secondary max-w-2xl">
            {t('recommendations:products.subtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <Link href="/cart" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto" icon={<ShoppingCart className="w-3.5 h-3.5" />}>
              {t('recommendations:products.viewCart')}
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            className="w-full sm:w-auto whitespace-nowrap"
            onClick={handleAddAll}
            icon={bulkAdded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          >
            {bulkAdded ? t('recommendations:products.allAdded') : t('recommendations:products.addAllBtn')}
          </Button>
        </div>
      </div>

      {/* Scenario Context Banner */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 w-full md:w-auto">
          <div className="p-2.5 rounded-xl bg-primary text-white shrink-0 mt-0.5 sm:mt-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-headline font-bold text-sm sm:text-base text-on-surface">
                {t('recommendations:products.calibratedFor', { farmName: activeFarm.name })}
              </span>
              <Badge variant="mint" size="sm">
                {t('recommendations:suitabilityScore')}: {activeScenario.suitabilityScore}%
              </Badge>
            </div>
            
            {/* Responsive metric badges */}
            <div className="flex flex-wrap items-center gap-2 mt-2 font-mono">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-primary/15 text-xs shadow-2xs">
                <span className="text-secondary">{t('recommendations:products.targetYieldLabel')}:</span>
                <strong className="text-on-surface">{activeScenario.expectedProductionTonHa} {t('common:units.mtPerHa')}</strong>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-primary/15 text-xs shadow-2xs">
                <span className="text-secondary">{t('recommendations:products.waterQuotaLabel')}:</span>
                <strong className="text-on-surface">{activeScenario.waterDemandM3Ha} {t('common:units.m3PerHa')}</strong>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-primary/15 text-xs shadow-2xs">
                <span className="text-secondary">{t('recommendations:products.soilPhLabel')}:</span>
                <strong className="text-on-surface">{activeFarm.soil.ph}</strong>
              </div>
            </div>
          </div>
        </div>

        <Link href="/marketplace" className="w-full md:w-auto shrink-0">
          <Button variant="secondary" size="sm" className="w-full md:w-auto" icon={<Store className="w-3.5 h-3.5" />}>
            {t('recommendations:products.browseMarketplace')}
          </Button>
        </Link>
      </div>

      {/* Recommended Products Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-headline font-bold text-lg sm:text-xl text-on-surface">
            {t('recommendations:products.itemsCount', { count: recommendedProducts.length })}
          </h3>
          <span className="text-xs font-mono text-secondary">
            {t('recommendations:products.verifiedSuppliers')}
          </span>
        </div>

        {recommendedProducts.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-xs sm:text-sm text-secondary">{t('recommendations:products.noProductsFound')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
