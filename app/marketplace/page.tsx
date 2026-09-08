'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNabta } from '@/context/NabtaContext';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { MarketplaceFilters, CATEGORIES } from '@/components/marketplace/MarketplaceFilters';
import { Badge } from '@/ui/Badge';
import { Search, Globe2, ShieldCheck, SlidersHorizontal } from 'lucide-react';

export default function MarketplacePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Marketplace Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              Global B2B Sourcing Hub
            </Badge>
            <span className="text-xs font-mono text-secondary">
              Verified Cross-Border Procurement
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Global Agricultural Input Marketplace
          </h1>
          <p className="text-xs text-secondary mt-1">
            Direct procurement of certified seeds, specialized fertigation, drip automation, and telemetry sensors.
          </p>
        </div>

        {/* Global Stats Badge */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-xs font-mono">
          <Globe2 className="w-4 h-4 text-primary" />
          <div>
            <span className="text-secondary text-[10px] uppercase block">Catalog Density</span>
            <span className="font-bold text-on-surface">18 Countries / 100% Verified</span>
          </div>
        </div>
      </div>

      {/* Search & Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search agricultural products, active ingredients, suppliers, or crops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="lg:hidden px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-xs font-semibold text-on-surface flex items-center justify-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4 text-secondary" />
          <span>Filters</span>
        </button>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Filters Sidebar (3 cols) */}
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

        {/* Right Products Catalog (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="flex items-center justify-between text-xs text-secondary pb-2">
            <span>
              Showing <strong className="text-on-surface font-mono">{filteredProducts.length}</strong> products
            </span>
            <span className="font-mono text-[11px]">
              Currency: <strong>Escrow Protected</strong>
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 space-y-3">
              <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-headline font-semibold text-base text-on-surface">
                No matching products found
              </h4>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                No agricultural items match your current filter selection. Try resetting filters or expanding search keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-primary underline"
              >
                Reset all filters
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
