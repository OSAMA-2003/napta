'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProductCategory } from '@/types/nabta';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Filter, RotateCcw } from 'lucide-react';

interface MarketplaceFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedCountry: string;
  onSelectCountry: (c: string) => void;
  selectedAvailability: string;
  onSelectAvailability: (a: string) => void;
  onReset: () => void;
}

export function MarketplaceFilters({
  selectedCategory,
  onSelectCategory,
  selectedCountry,
  onSelectCountry,
  selectedAvailability,
  onSelectAvailability,
  onReset,
}: MarketplaceFiltersProps) {
  const { t } = useTranslation(['marketplace', 'common']);

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: t('marketplace:categories.all') },
    { id: 'seeds', label: t('marketplace:categories.seeds') },
    { id: 'fertilizers', label: t('marketplace:categories.fertilizers') },
    { id: 'crop-protection', label: t('marketplace:categories.cropProtection') },
    { id: 'irrigation', label: t('marketplace:categories.irrigation') },
    { id: 'sensors-iot', label: t('marketplace:categories.sensorsIot') },
    { id: 'machinery', label: t('marketplace:categories.machinery') },
    { id: 'greenhouses', label: t('marketplace:categories.greenhouses') },
    { id: 'storage-packaging', label: t('marketplace:categories.storagePackaging') },
    { id: 'farm-produce', label: t('marketplace:categories.farmProduce') },
  ];

  const countries = [
    { id: 'All Countries', label: t('marketplace:filters.allCountries') },
    { id: 'Egypt', label: t('marketplace:filters.countries.Egypt') },
    { id: 'Netherlands', label: t('marketplace:filters.countries.Netherlands') },
    { id: 'Spain', label: t('marketplace:filters.countries.Spain') },
    { id: 'Germany', label: t('marketplace:filters.countries.Germany') },
    { id: 'France', label: t('marketplace:filters.countries.France') },
    { id: 'Saudi Arabia', label: t('marketplace:filters.countries.Saudi Arabia') },
    { id: 'UAE', label: t('marketplace:filters.countries.UAE') },
  ];

  const availabilities = [
    { id: 'All Availability', label: t('marketplace:filters.allAvailability') },
    { id: 'In Stock', label: t('marketplace:card.inStock') },
    { id: 'Low Stock', label: t('marketplace:card.lowStock') },
    { id: 'Pre-Order', label: t('marketplace:card.preOrder') },
  ];

  return (
    <Card className="h-fit text-start">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <CardTitle>{t('marketplace:filtersTitle')}</CardTitle>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-secondary hover:text-on-surface flex items-center gap-1 font-mono transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          {t('marketplace:resetFilters')}
        </button>
      </CardHeader>

      <CardContent className="space-y-6 pt-2 text-xs">
        {/* Categories */}
        <div>
          <span className="font-headline font-bold text-on-surface uppercase text-[11px] tracking-wider block mb-2.5">
            {t('marketplace:filters.categoryLabel')}
          </span>
          <div className="space-y-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full text-start px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-primary-container/10 text-primary-container font-bold'
                      : 'text-secondary hover:text-on-surface hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Country of Origin */}
        <div className="pt-4 border-t border-slate-100">
          <span className="font-headline font-bold text-on-surface uppercase text-[11px] tracking-wider block mb-2.5">
            {t('marketplace:filters.countryLabel')}
          </span>
          <div className="space-y-1">
            {countries.map((c) => {
              const active = selectedCountry === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCountry(c.id)}
                  className={`w-full text-start px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-primary-container/10 text-primary-container font-bold'
                      : 'text-secondary hover:text-on-surface hover:bg-slate-50'
                  }`}
                >
                  <span>{c.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability */}
        <div className="pt-4 border-t border-slate-100">
          <span className="font-headline font-bold text-on-surface uppercase text-[11px] tracking-wider block mb-2.5">
            {t('marketplace:filters.availabilityLabel')}
          </span>
          <div className="space-y-1">
            {availabilities.map((avail) => {
              const active = selectedAvailability === avail.id;
              return (
                <button
                  key={avail.id}
                  onClick={() => onSelectAvailability(avail.id)}
                  className={`w-full text-start px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-primary-container/10 text-primary-container font-bold'
                      : 'text-secondary hover:text-on-surface hover:bg-slate-50'
                  }`}
                >
                  <span>{avail.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />}
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
