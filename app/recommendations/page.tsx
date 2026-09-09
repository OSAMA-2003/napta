'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Droplets,
  DollarSign,
  Clock,
  FlaskConical,
  Sun,
  ShoppingBag,
  Sliders,
} from 'lucide-react';

export default function RecommendationsPage() {
  const { t } = useTranslation(['recommendations', 'common']);
  const { activeFarm, activeScenario, scenarios, selectScenario, currency, dir } = useNabta();
  const NextArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 text-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              {t('recommendations:badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('recommendations:farmLabel')}: {activeFarm.name}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('recommendations:title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('recommendations:subtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <Link href="/scenarios" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto" icon={<Sliders className="w-3.5 h-3.5" />}>
              {t('recommendations:compareScenariosBtn')}
            </Button>
          </Link>
          <Link href="/recommendations/products" className="w-full sm:w-auto">
            <Button variant="primary" size="sm" className="w-full sm:w-auto" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
              {t('recommendations:viewRecommendedProductsBtn')}
            </Button>
          </Link>
        </div>
      </div>

      {/* TOP: Primary Recommended Crop Spotlight Card */}
      <div className="rounded-2xl border-2 border-[#10b981]/50 bg-gradient-to-br from-white via-[#f8f9ff] to-[#eff4ff] p-6 sm:p-8 shadow-md text-start">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#054F31] text-white text-xs font-mono font-bold tracking-wider uppercase">
                {t('recommendations:primaryRecommendation')}
              </span>
              <span className="text-xs font-mono text-secondary">{activeScenario.season}</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
              {activeScenario.cropName}
            </h2>
            <p className="text-sm font-mono text-secondary mt-0.5">
              {t('recommendations:cultivar')}: <strong>{activeScenario.variety}</strong>
            </p>
          </div>

          {/* Suitability Gauge */}
          <div className="flex items-center gap-4 bg-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-slate-200 shadow-sm w-full sm:w-auto justify-between sm:justify-start">
            <div className="text-start sm:text-end">
              <span className="text-[10px] font-mono text-secondary uppercase block">
                {t('recommendations:suitabilityScore')}
              </span>
              <span className="font-mono text-3xl font-extrabold text-[#054f31]">
                {activeScenario.suitabilityScore}%
              </span>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-[#10b981] flex items-center justify-center bg-[#10b981]/10 shrink-0">
              <CheckCircle2 className="w-7 h-7 text-[#054f31]" />
            </div>
          </div>
        </div>

        {/* Why this crop rationale */}
        <div className="pt-6 space-y-4">
          <div>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider mb-2">
              {t('recommendations:whyThisCrop')}
            </h4>
            <p className="text-sm text-secondary font-body leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
              {activeScenario.whyThisCrop}{' '}
              {t('recommendations:whyThisCropDetail', {
                ph: activeFarm.soil.ph,
                ec: activeFarm.soil.ec,
                texture: activeFarm.soil.texture,
                waterAllocation: formatNumber(activeFarm.water.allocationM3Ha),
              })}
            </p>
          </div>

          {/* Agronomic Triad: Soil, Climate, Water */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-blue-600" />
                  <span className="font-headline font-semibold text-xs text-on-surface">
                    {t('recommendations:soilCompatibility')}
                  </span>
                </div>
                <span className="font-mono font-bold text-sm text-primary">
                  {activeScenario.soilCompatibilityScore}%
                </span>
              </div>
              <p className="text-[11px] text-secondary">
                {t('recommendations:soilCompatDetail', {
                  texture: activeFarm.soil.texture,
                  potassium: activeFarm.soil.potassiumPpm,
                })}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span className="font-headline font-semibold text-xs text-on-surface">
                    {t('recommendations:climateCompatibility')}
                  </span>
                </div>
                <span className="font-mono font-bold text-sm text-primary">
                  {activeScenario.climateCompatibilityScore}%
                </span>
              </div>
              <p className="text-[11px] text-secondary">
                {t('recommendations:climateCompatDetail', {
                  gdd: activeFarm.climate.growingDegreeDays,
                })}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span className="font-headline font-semibold text-xs text-on-surface">
                    {t('recommendations:waterCompatibility')}
                  </span>
                </div>
                <span className="font-mono font-bold text-sm text-primary">
                  {activeScenario.waterCompatibilityScore}%
                </span>
              </div>
              <p className="text-[11px] text-secondary">
                {t('recommendations:waterCompatDetail', {
                  demand: formatNumber(activeScenario.waterDemandM3Ha),
                })}
              </p>
            </div>
          </div>

          {/* Financial & Production Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-secondary uppercase block mb-1">
                {t('recommendations:expectedYield')}
              </span>
              <span className="font-mono text-xl font-bold text-on-surface">
                {activeScenario.expectedProductionTonHa} {t('common:units.mtPerHa')}
              </span>
              <span className="text-[10px] text-secondary block mt-0.5">
                {t('recommendations:totalPlot')}: {formatNumber(activeScenario.expectedProductionTonHa * activeFarm.areaHectares, 0)} MT
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-secondary uppercase block mb-1">
                {t('recommendations:capexInputs')}
              </span>
              <span className="font-mono text-xl font-bold text-slate-700">
                {formatCurrency(activeScenario.estimatedCostPerHa, currency)} / {t('common:units.ha')}
              </span>
              <span className="text-[10px] text-secondary block mt-0.5">
                {t('recommendations:total')}: {formatCurrency(activeScenario.estimatedCostPerHa * activeFarm.areaHectares, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-secondary uppercase block mb-1">
                {t('recommendations:grossRevenue')}
              </span>
              <span className="font-mono text-xl font-bold text-on-surface">
                {formatCurrency(activeScenario.expectedRevenuePerHa, currency)} / {t('common:units.ha')}
              </span>
              <span className="text-[10px] text-secondary block mt-0.5">
                {t('recommendations:total')}: {formatCurrency(activeScenario.expectedRevenuePerHa * activeFarm.areaHectares, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#003620] text-white text-center">
              <span className="text-[10px] font-mono text-[#6ffbbe] uppercase block mb-1">
                {t('recommendations:netProfit')}
              </span>
              <span className="font-mono text-xl font-bold text-[#aef1c8]">
                {formatCurrency(activeScenario.estimatedProfitPerHa, currency)} / {t('common:units.ha')}
              </span>
              <span className="text-[10px] text-[#6ffbbe] font-semibold block mt-0.5">
                +{activeScenario.roiPercent}% {t('recommendations:returnOnCapital')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternatives Preview Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-headline font-bold text-xl text-on-surface">
              {t('recommendations:alternativesTitle')}
            </h3>
            <p className="text-xs text-secondary mt-0.5">
              {t('recommendations:alternativesSubtitle')}
            </p>
          </div>
          <Link href="/scenarios" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto" icon={<NextArrow className="w-3.5 h-3.5" />}>
              {t('recommendations:compareScenariosBtn')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {scenarios.map((sc) => (
            <Card
              key={sc.id}
              className={`p-5 space-y-3 transition-all ${
                sc.id === activeScenario.id
                  ? 'border-2 border-primary ring-2 ring-primary/10'
                  : 'hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-secondary">{sc.season}</span>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#004f34] text-xs font-mono font-bold">
                  {sc.suitabilityScore}% {t('recommendations:suitabilityLabel')}
                </div>
              </div>

              <div>
                <h4 className="font-headline font-semibold text-base text-on-surface">{sc.cropName}</h4>
                <span className="text-xs text-secondary font-mono">{sc.variety}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 font-mono border border-slate-200/60">
                <div className="flex justify-between">
                  <span className="text-secondary">{t('recommendations:expectedYield')}:</span>
                  <strong className="text-on-surface">{sc.expectedProductionTonHa} MT/ha</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">{t('recommendations:waterBudget')}:</span>
                  <strong className="text-on-surface">{formatNumber(sc.waterDemandM3Ha)} m³/ha</strong>
                </div>
                <div className="flex justify-between text-primary font-bold pt-1 border-t border-slate-200">
                  <span>{t('recommendations:netProfit')}:</span>
                  <span>{formatCurrency(sc.estimatedProfitPerHa, currency)}/ha</span>
                </div>
              </div>

              {sc.id !== activeScenario.id ? (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => selectScenario(sc.id)}
                >
                  {t('recommendations:selectAlternativeBtn')}
                </Button>
              ) : (
                <div className="text-center text-xs font-mono font-bold text-primary py-1">
                  {t('recommendations:currentlyActive')}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
