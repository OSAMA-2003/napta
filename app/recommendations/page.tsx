'use client';

import React from 'react';
import Link from 'next/link';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Droplets,
  DollarSign,
  Clock,
  FlaskConical,
  Sun,
  Layers,
  ShoppingBag,
  Sliders,
} from 'lucide-react';

export default function RecommendationsPage() {
  const { activeFarm, activeScenario, scenarios, selectScenario, currency } = useNabta();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              AI Agronomic Intelligence
            </Badge>
            <span className="text-xs font-mono text-secondary">
              Farm: {activeFarm.name}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Final Crop Recommendation &amp; Intelligence Report
          </h1>
          <p className="text-xs text-secondary mt-1">
            Algorithmic ranking synthesized from soil chemistry, water allocations, and multi-spectral historical trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/scenarios">
            <Button variant="secondary" size="sm" icon={<Sliders className="w-3.5 h-3.5" />}>
              Compare Scenarios
            </Button>
          </Link>
          <Link href="/recommendations/products">
            <Button variant="primary" size="sm" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
              View Recommended Products
            </Button>
          </Link>
        </div>
      </div>

      {/* TOP: Primary Recommended Crop Spotlight Card */}
      <div className="rounded-2xl border-2 border-[#10b981]/50 bg-gradient-to-br from-white via-[#f8f9ff] to-[#eff4ff] p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#054F31] text-white text-xs font-mono font-bold tracking-wider uppercase">
                Primary Recommendation
              </span>
              <span className="text-xs font-mono text-secondary">{activeScenario.season}</span>
            </div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl text-on-surface tracking-tight">
              {activeScenario.cropName}
            </h2>
            <p className="text-sm font-mono text-secondary mt-0.5">
              Cultivar / Hybrid: <strong>{activeScenario.variety}</strong>
            </p>
          </div>

          {/* Suitability Gauge */}
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-right">
              <span className="text-[10px] font-mono text-secondary uppercase block">
                Suitability Score
              </span>
              <span className="font-mono text-3xl font-extrabold text-[#054f31]">
                {activeScenario.suitabilityScore}%
              </span>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-[#10b981] flex items-center justify-center bg-[#10b981]/10">
              <CheckCircle2 className="w-7 h-7 text-[#054f31]" />
            </div>
          </div>
        </div>

        {/* Why this crop rationale */}
        <div className="pt-6 space-y-4">
          <div>
            <h4 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider mb-2">
              Why Nabta Recommends This Crop
            </h4>
            <p className="text-sm text-secondary font-body leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
              {activeScenario.whyThisCrop} Based on your plot’s active soil profile (pH{' '}
              {activeFarm.soil.ph}, EC {activeFarm.soil.ec} dS/m, texture {activeFarm.soil.texture}),
              this variety maximizes nutrient uptake while remaining within your seasonal water
              budget of {formatNumber(activeFarm.water.allocationM3Ha)} m³/ha.
            </p>
          </div>

          {/* Agronomic Triad: Soil, Climate, Water */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-blue-600" />
                  <span className="font-headline font-semibold text-xs text-on-surface">Soil Compatibility</span>
                </div>
                <span className="font-mono font-bold text-sm text-primary">
                  {activeScenario.soilCompatibilityScore}%
                </span>
              </div>
              <p className="text-[11px] text-secondary">
                Optimal compatibility with {activeFarm.soil.texture} and high potassium retention (
                {activeFarm.soil.potassiumPpm} ppm).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span className="font-headline font-semibold text-xs text-on-surface">Climate Compatibility</span>
                </div>
                <span className="font-mono font-bold text-sm text-primary">
                  {activeScenario.climateCompatibilityScore}%
                </span>
              </div>
              <p className="text-[11px] text-secondary">
                Thermal degree sum of {activeFarm.climate.growingDegreeDays} GDD aligns with flowering kinetics and minimizes heat drop.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <span className="font-headline font-semibold text-xs text-on-surface">Water Compatibility</span>
                </div>
                <span className="font-mono font-bold text-sm text-primary">
                  {activeScenario.waterCompatibilityScore}%
                </span>
              </div>
              <p className="text-[11px] text-secondary">
                Seasonal consumption of {formatNumber(activeScenario.waterDemandM3Ha)} m³/ha fits safely within allocated quota.
              </p>
            </div>
          </div>

          {/* Financial & Production Matrix */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-secondary uppercase block mb-1">Expected Production</span>
              <span className="font-mono text-xl font-bold text-on-surface">
                {activeScenario.expectedProductionTonHa} MT / ha
              </span>
              <span className="text-[10px] text-secondary block mt-0.5">
                Total Plot: {formatNumber(activeScenario.expectedProductionTonHa * activeFarm.areaHectares, 0)} MT
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-secondary uppercase block mb-1">Estimated Cost</span>
              <span className="font-mono text-xl font-bold text-slate-700">
                {formatCurrency(activeScenario.estimatedCostPerHa, currency)} / ha
              </span>
              <span className="text-[10px] text-secondary block mt-0.5">
                Total: {formatCurrency(activeScenario.estimatedCostPerHa * activeFarm.areaHectares, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <span className="text-[10px] font-mono text-secondary uppercase block mb-1">Expected Revenue</span>
              <span className="font-mono text-xl font-bold text-on-surface">
                {formatCurrency(activeScenario.expectedRevenuePerHa, currency)} / ha
              </span>
              <span className="text-[10px] text-secondary block mt-0.5">
                Total: {formatCurrency(activeScenario.expectedRevenuePerHa * activeFarm.areaHectares, currency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#003620] text-white text-center">
              <span className="text-[10px] font-mono text-[#6ffbbe] uppercase block mb-1">Estimated Net Profit</span>
              <span className="font-mono text-xl font-bold text-[#aef1c8]">
                {formatCurrency(activeScenario.estimatedProfitPerHa, currency)} / ha
              </span>
              <span className="text-[10px] text-[#6ffbbe] font-semibold block mt-0.5">
                +{activeScenario.roiPercent}% Return on Capital
              </span>
            </div>
          </div>
        </div>

        {/* Action Bridge to Recommended Products */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h5 className="font-headline font-bold text-sm text-on-surface">
              Required Inputs for this Scenario
            </h5>
            <p className="text-xs text-secondary mt-0.5">
              Order the exact fertilizers, hybrid seeds, and irrigation components verified for {activeScenario.cropName}.
            </p>
          </div>

          <Link href="/recommendations/products">
            <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              View Recommended Products
            </Button>
          </Link>
        </div>
      </div>

      {/* ALTERNATIVE SCENARIOS LIST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-on-surface">
              Alternative Evaluated Crop Candidates
            </h3>
            <p className="text-xs text-secondary">
              Switch selection to recalculate input specifications and market trade-offs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((sc) => {
            const isCurrent = sc.id === activeScenario.id;
            return (
              <Card
                key={sc.id}
                className={`p-5 flex flex-col justify-between transition-all ${
                  isCurrent ? 'border-2 border-primary bg-primary/5' : 'hover:border-slate-300'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={isCurrent ? 'emerald' : 'slate'} size="sm">
                      {isCurrent ? 'Selected Scenario' : sc.season}
                    </Badge>
                    <span className="font-mono font-bold text-xs text-primary">
                      {sc.suitabilityScore}% Match
                    </span>
                  </div>

                  <div>
                    <h4 className="font-headline font-semibold text-base text-on-surface">{sc.cropName}</h4>
                    <span className="text-xs text-secondary font-mono">{sc.variety}</span>
                  </div>

                  <p className="text-xs text-secondary line-clamp-2">{sc.whyThisCrop}</p>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-secondary">Expected Output:</span>
                      <strong>{sc.expectedProductionTonHa} MT/ha</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Net Profit:</span>
                      <strong className="text-primary">{formatCurrency(sc.estimatedProfitPerHa, currency)}/ha</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant={isCurrent ? 'secondary' : 'primary'}
                    className="w-full"
                    onClick={() => selectScenario(sc.id)}
                  >
                    {isCurrent ? 'Active Scenario' : 'Select This Crop'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
