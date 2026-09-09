'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';
import { Badge } from '@/ui/Badge';
import { Search, Globe2, SlidersHorizontal } from 'lucide-react';

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { t, i18n } = useTranslation(['marketplace', 'common']);
  const { products } = useNabta();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedCountry, setSelectedCountry] = useState<string>('All Countries');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All Availability');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Moderation check
      if (p.moderationStatus === 'REJECTED') return false;

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Country
      if (selectedCountry !== 'All Countries' && p.countryOfOrigin !== selectedCountry) {
        return false;
      }

      // Availability
      if (selectedAvailability !== 'All Availability' && p.availability !== selectedAvailability) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchName = p.name.toLowerCase().includes(term);
        const matchDesc = p.description.toLowerCase().includes(term);
        const matchSupplier = p.supplierName.toLowerCase().includes(term);
        const matchCrops = p.suitableCrops.some((c) => c.toLowerCase().includes(term));
        if (!matchName && !matchDesc && !matchSupplier && !matchCrops) {
          return false;
        }
      }

      return true;
    });
  }, [products, selectedCategory, selectedCountry, selectedAvailability, searchTerm]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCountry('All Countries');
    setSelectedAvailability('All Availability');
    setSearchTerm('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-start">
      {/* Marketplace Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              {t('marketplace:badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('marketplace:verifiedCrossBorder')}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('marketplace:title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('marketplace:subtitle')}
          </p>
        </div>

        {/* Global Stats Badge */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-mono">
          <Globe2 className="w-4 h-4 text-primary" />
          <div>
            <span className="text-secondary text-[10px] uppercase block">
              {t('marketplace:catalogDensity')}
            </span>
            <span className="font-bold text-on-surface">
              {t('marketplace:countriesVerified')}
            </span>
          </div>
        </div>
      </div>

      {/* Search & Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-secondary absolute start-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('marketplace:searchPlaceholder')}
            className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-on-surface placeholder:text-slate-400 focus:outline-none focus:border-primary shadow-xs"
          />
        </div>

        {/* Mobile Filter Trigger */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-on-surface shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4 text-secondary" />
          <span>{t('marketplace:filtersTitle')}</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (3 cols) */}
        <div className={`lg:col-span-3 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <MarketplaceFilters
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
            selectedAvailability={selectedAvailability}
            onSelectAvailability={setSelectedAvailability}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Catalog Grid (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-secondary font-mono pb-2 border-b border-slate-100">
            <span>
              {t('marketplace:showingCount', { count: filteredProducts.length })}
            </span>
            <span>{t('marketplace:sortedByFit')}</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <p className="font-headline font-bold text-base text-on-surface">
                {t('marketplace:noInputsFound')}
              </p>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                {t('marketplace:noInputsFoundDesc')}
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 text-xs font-semibold text-primary underline"
              >
                {t('marketplace:resetFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-secondary">Loading Marketplace...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
