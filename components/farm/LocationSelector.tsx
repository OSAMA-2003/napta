'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { GLOBAL_COUNTRIES } from '@/lib/geoData';
import { CountryData, RegionData, CityData } from '@/types/geo';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  MapPin,
  ChevronDown,
  Info,
  CheckCircle2,
  FlaskConical,
  ArrowRight,
  ArrowLeft,
  Compass,
} from 'lucide-react';

interface LocationSelectorProps {
  onLocationChange?: (location: { country: CountryData; region: RegionData; city: CityData }) => void;
  standalone?: boolean;
  className?: string;
}

export function LocationSelector({
  onLocationChange,
  standalone = false,
  className = '',
}: LocationSelectorProps) {
  const { t, i18n } = useTranslation(['farm', 'common']);
  const { dir } = useNabta();
  const isAr = i18n.language === 'ar';

  // Selected State
  const [selectedCountryId, setSelectedCountryId] = useState<string>('country-eg');
  const [selectedRegionId, setSelectedRegionId] = useState<string>('reg-sohag');
  const [selectedCityId, setSelectedCityId] = useState<string>('city-sohag-center');

  // Derived Objects
  const currentCountry = useMemo(() => {
    return GLOBAL_COUNTRIES.find((c) => c.id === selectedCountryId) || null;
  }, [selectedCountryId]);

  const availableRegions = useMemo(() => {
    return currentCountry ? currentCountry.regions : [];
  }, [currentCountry]);

  const currentRegion = useMemo(() => {
    return availableRegions.find((r) => r.id === selectedRegionId) || null;
  }, [availableRegions, selectedRegionId]);

  const availableCities = useMemo(() => {
    return currentRegion ? currentRegion.cities : [];
  }, [currentRegion]);

  const currentCity = useMemo(() => {
    return availableCities.find((c) => c.id === selectedCityId) || null;
  }, [availableCities, selectedCityId]);

  // Handlers with cascading reset
  const handleCountrySelect = (countryId: string) => {
    setSelectedCountryId(countryId);
    const country = GLOBAL_COUNTRIES.find((c) => c.id === countryId);
    if (country && country.regions.length > 0) {
      const firstReg = country.regions[0];
      setSelectedRegionId(firstReg.id);
      if (firstReg.cities.length > 0) {
        setSelectedCityId(firstReg.cities[0].id);
        if (onLocationChange) {
          onLocationChange({ country, region: firstReg, city: firstReg.cities[0] });
        }
      } else {
        setSelectedCityId('');
      }
    } else {
      setSelectedRegionId('');
      setSelectedCityId('');
    }
  };

  const handleRegionSelect = (regionId: string) => {
    setSelectedRegionId(regionId);
    const region = availableRegions.find((r) => r.id === regionId);
    if (region && region.cities.length > 0) {
      setSelectedCityId(region.cities[0].id);
      if (onLocationChange && currentCountry) {
        onLocationChange({ country: currentCountry, region, city: region.cities[0] });
      }
    } else {
      setSelectedCityId('');
    }
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCityId(cityId);
    const city = availableCities.find((c) => c.id === cityId);
    if (onLocationChange && currentCountry && currentRegion && city) {
      onLocationChange({ country: currentCountry, region: currentRegion, city });
    }
  };

  // Dynamic Region Terminology
  const regionLabel = currentCountry
    ? isAr
      ? currentCountry.regionTerminologyAr
      : currentCountry.regionTerminologyEn
    : t('farm:locationSelector.regionLabelDefault');

  const NextArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <Card className={`overflow-hidden border border-slate-200/90 shadow-md ${className}`}>
      {/* Header with Explanatory Notice */}
      <CardHeader className="bg-slate-50/70 border-b border-slate-100 pb-4">
        <div className="flex items-start justify-between gap-3 w-full">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="emerald" size="sm" dot>
                {t('farm:locationSelector.badge')}
              </Badge>
              <span className="text-[11px] font-mono text-secondary">
                {currentCountry ? (isAr ? currentCountry.nameAr : currentCountry.nameEn) : ''}
              </span>
            </div>
            <CardTitle className="text-base sm:text-lg">
              {t('farm:locationSelector.heading')}
            </CardTitle>
            <p className="text-xs text-secondary mt-0.5 font-body">
              {t('farm:locationSelector.subtitle')}
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-secondary shrink-0">
            <Compass className="w-3.5 h-3.5 text-[#054f31]" />
            <span>GIS Sentinel WGS84</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 space-y-6">
        {/* Why Location Matters Notice Box */}
        <div className="rounded-xl bg-[#003620]/5 border border-[#10b981]/20 p-4 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-[#054F31] text-white shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="font-headline font-bold text-xs text-[#003620] block">
              {t('farm:locationSelector.noticeTitle')}
            </span>
            <p className="text-xs text-[#003620]/80 mt-0.5 leading-relaxed font-body">
              {t('farm:locationSelector.notice')}
            </p>
          </div>
        </div>

        {/* 3-Tier Cascading Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Country Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-on-surface">
              1. {t('farm:locationSelector.countryLabel')}
            </label>
            <div className="relative">
              <select
                value={selectedCountryId}
                onChange={(e) => handleCountrySelect(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-headline font-semibold text-on-surface focus:outline-none focus:border-[#054f31] focus:ring-1 focus:ring-[#054f31] shadow-sm transition-colors cursor-pointer"
              >
                {GLOBAL_COUNTRIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    [{c.code}] {isAr ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-secondary">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 2. Region / Governorate / State Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-on-surface">
              2. {regionLabel}
            </label>
            <div className="relative">
              <select
                disabled={!currentCountry || availableRegions.length === 0}
                value={selectedRegionId}
                onChange={(e) => handleRegionSelect(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-headline font-semibold text-on-surface focus:outline-none focus:border-[#054f31] focus:ring-1 focus:ring-[#054f31] shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                {availableRegions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {isAr ? r.nameAr : r.nameEn}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-secondary">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* 3. City / Agricultural Sector Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-on-surface">
              3. {t('farm:locationSelector.cityLabel')}
            </label>
            <div className="relative">
              <select
                disabled={!currentRegion || availableCities.length === 0}
                value={selectedCityId}
                onChange={(e) => handleCitySelect(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-headline font-semibold text-on-surface focus:outline-none focus:border-[#054f31] focus:ring-1 focus:ring-[#054f31] shadow-sm transition-colors cursor-pointer disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                {availableCities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isAr ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-secondary">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Selected Location Breadcrumb Feedback */}
        {currentCountry && currentRegion && currentCity && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-headline font-bold text-on-surface">
                {t('farm:locationSelector.activeSector')}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-primary font-semibold">
                <span>{isAr ? currentCountry.nameAr : currentCountry.nameEn}</span>
                <span className="text-slate-400">/</span>
                <span>{isAr ? currentRegion.nameAr : currentRegion.nameEn}</span>
                <span className="text-slate-400">/</span>
                <strong className="text-on-surface underline decoration-[#10b981] underline-offset-4">
                  {isAr ? currentCity.nameAr : currentCity.nameEn}
                </strong>
              </div>
            </div>

            <span className="text-[11px] font-mono text-secondary">
              Lat: {currentCity.coordinates.lat.toFixed(3)}°N, Lng: {currentCity.coordinates.lng.toFixed(3)}°E
            </span>
          </div>
        )}

        {/* Detailed Agronomic Blueprint of the Selected Sector */}
        {currentCity && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-primary" />
                <h4 className="font-headline font-bold text-xs sm:text-sm text-on-surface">
                  {t('farm:locationSelector.profileTitle')}
                </h4>
              </div>
              <Badge variant="mint" size="sm" dot>
                {t('farm:locationSelector.verifiedSoilBadge')}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-secondary uppercase block mb-1">
                  {t('farm:locationSelector.soilTypeLabel')}
                </span>
                <span className="font-sans font-semibold text-on-surface block text-[11px] leading-snug">
                  {isAr ? currentCity.soilTypeAr : currentCity.soilTypeEn}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-secondary uppercase block mb-1">
                  {t('farm:locationSelector.climateZoneLabel')}
                </span>
                <span className="font-sans font-semibold text-on-surface block text-[11px] leading-snug">
                  {isAr ? currentCity.climateZoneAr : currentCity.climateZoneEn}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-secondary uppercase block mb-1">
                  {t('farm:locationSelector.thermalSumLabel')}
                </span>
                <span className="font-bold text-on-surface text-base block">
                  {currentCity.avgGdd} GDD
                </span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">
                  {t('farm:locationSelector.vegetativePotential')}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-secondary uppercase block mb-1">
                  {t('farm:locationSelector.annualRainfallLabel')}
                </span>
                <span className="font-bold text-on-surface text-base block">
                  {currentCity.avgAnnualRainfallMm} mm
                </span>
                <span className="text-[10px] text-blue-700 block mt-0.5">
                  {t('farm:locationSelector.vriRequired')}
                </span>
              </div>
            </div>

            {/* Regionally Proven Crops Ribbon */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-headline font-semibold text-secondary text-[11px]">
                  {t('farm:locationSelector.topProvenCrops')}:
                </span>
                {(isAr ? currentCity.primaryCropsAr : currentCity.primaryCropsEn).map((crop) => (
                  <span
                    key={crop}
                    className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-headline font-semibold text-[11px]"
                  >
                    {crop}
                  </span>
                ))}
              </div>

              <Link href="/recommendations">
                <Button variant="primary" size="sm" icon={<NextArrow className="w-3.5 h-3.5" />}>
                  {t('farm:locationSelector.calibrateBtn')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
