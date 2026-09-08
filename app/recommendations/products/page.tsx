'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useNabta } from '@/context/NabtaContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import {
  ShieldCheck,
  ArrowLeft,
  ShoppingCart,
  Check,
  Sparkles,
  Layers,
  Store,
} from 'lucide-react';

export default function RecommendedProductsPage() {
  const { activeScenario, activeFarm, products, addToCart } = useNabta();
  const [bulkAdded, setBulkAdded] = useState(false);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back link & Top bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Crop Intelligence Report</span>
          </Link>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              Scenario-Bound Inputs
            </Badge>
            <span className="text-xs font-mono text-secondary">
              Target: {activeScenario.cropName} ({activeScenario.variety})
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Prescribed Agricultural Inputs &amp; Equipment
          </h1>
          <p className="text-xs text-secondary mt-1">
            Verified materials directly calibrated to satisfy the nutritional, genetic, and irrigation parameters of your selected scenario.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/cart">
            <Button variant="secondary" size="sm" icon={<ShoppingCart className="w-3.5 h-3.5" />}>
              View Cart
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddAll}
            icon={bulkAdded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ShoppingCart className="w-3.5 h-3.5" />}
          >
            {bulkAdded ? 'All Essentials Added!' : 'Add All Scenario Essentials to Cart'}
          </Button>
        </div>
      </div>

      {/* Scenario Context Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary text-white">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm text-on-surface">
                Calibrated for {activeFarm.name}
              </span>
              <Badge variant="mint" size="sm">
                Suitability: {activeScenario.suitabilityScore}%
              </Badge>
            </div>
            <p className="text-xs text-secondary mt-0.5">
              Target Yield: <strong>{activeScenario.expectedProductionTonHa} MT/ha</strong> | Water Quota:{' '}
              <strong>{activeScenario.waterDemandM3Ha} m³/ha</strong> | Soil pH:{' '}
              <strong>{activeFarm.soil.ph}</strong>
            </p>
          </div>
        </div>

        <Link href="/marketplace">
          <Button variant="secondary" size="sm" icon={<Store className="w-3.5 h-3.5" />}>
            Browse Full Catalog
          </Button>
        </Link>
      </div>

      {/* Recommended Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-lg text-on-surface">
            Recommended Items ({recommendedProducts.length} Prescriptions)
          </h3>
          <span className="text-xs font-mono text-secondary">
            Verified International Suppliers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
