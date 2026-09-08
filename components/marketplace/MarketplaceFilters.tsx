'use client';

import React from 'react';
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

export const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'seeds', label: 'Seeds & Germplasm' },
  { id: 'fertilizers', label: 'Fertilizers & Nutrients' },
  { id: 'crop-protection', label: 'Crop Protection & Bio-Agents' },
  { id: 'irrigation', label: 'Precision Irrigation' },
  { id: 'sensors-iot', label: 'Sensors & IoT Telemetry' },
  { id: 'machinery', label: 'Machinery & Drones' },
  { id: 'greenhouses', label: 'Greenhouses & Climate Shield' },
  { id: 'storage-packaging', label: 'Storage & Cold-Chain' },
  { id: 'farm-produce', label: 'Farm Produce (Grower Direct)' },
];

export const COUNTRIES = ['All Countries', 'Egypt', 'Netherlands', 'Spain', 'Germany', 'France', 'Saudi Arabia', 'UAE'];
export const AVAILABILITIES = ['All Availability', 'In Stock', 'Low Stock', 'Pre-Order'];

export function MarketplaceFilters({
  selectedCategory,
  onSelectCategory,
  selectedCountry,
  onSelectCountry,
  selectedAvailability,
  onSelectAvailability,
  onReset,
}: MarketplaceFiltersProps) {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <CardTitle>Catalog Filters</CardTitle>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-secondary hover:text-on-surface flex items-center gap-1 font-mono transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </CardHeader>

      <CardContent className="space-y-6 pt-2 text-xs">
        {/* Categories */}
        <div>
          <span className="font-headline font-bold text-on-surface uppercase text-[11px] tracking-wider block mb-2.5">
            Category
          </span>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
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
            Country of Origin
          </span>
          <div className="space-y-1">
            {COUNTRIES.map((country) => {
              const active = selectedCountry === country;
              return (
                <button
                  key={country}
                  onClick={() => onSelectCountry(country)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-primary-container/10 text-primary-container font-bold'
                      : 'text-secondary hover:text-on-surface hover:bg-slate-50'
                  }`}
                >
                  <span>{country}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Availability */}
        <div className="pt-4 border-t border-slate-100">
          <span className="font-headline font-bold text-on-surface uppercase text-[11px] tracking-wider block mb-2.5">
            Stock Availability
          </span>
          <div className="space-y-1">
            {AVAILABILITIES.map((avail) => {
              const active = selectedAvailability === avail;
              return (
                <button
                  key={avail}
                  onClick={() => onSelectAvailability(avail)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'bg-primary-container/10 text-primary-container font-bold'
                      : 'text-secondary hover:text-on-surface hover:bg-slate-50'
                  }`}
                >
                  <span>{avail}</span>
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
