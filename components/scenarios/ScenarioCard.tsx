'use client';

import React from 'react';
import Link from 'next/link';
import { CropScenario } from '@/types/nabta';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Check, ArrowRight, Droplets, Clock, TrendingUp, DollarSign } from 'lucide-react';

interface ScenarioCardProps {
  scenario: CropScenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const { selectScenario, activeScenarioId, currency } = useNabta();
  const isSelected = scenario.id === activeScenarioId;

  return (
    <Card
      className={`flex flex-col justify-between transition-all ${
        isSelected
          ? 'border-2 border-primary ring-2 ring-primary/10 shadow-lg'
          : 'hover:border-slate-300 shadow-sm'
      }`}
    >
      <div>
        <CardHeader className="pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge
                variant={
                  scenario.status === 'Selected'
                    ? 'emerald'
                    : scenario.status === 'Analyzed'
                    ? 'mint'
                    : 'slate'
                }
                size="sm"
                dot
              >
                {scenario.status}
              </Badge>
              <span className="text-[11px] font-mono text-secondary">{scenario.season}</span>
            </div>
            <CardTitle className="text-base">{scenario.cropName}</CardTitle>
            <span className="text-xs font-mono text-secondary block">{scenario.variety}</span>
          </div>

          {/* Suitability Score Pill */}
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono font-bold text-xs text-[#004f34]">
                {scenario.suitabilityScore}% SUITABLE
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-3 text-xs">
          {/* Why This Crop Justification */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="font-headline font-semibold text-[11px] text-on-surface uppercase tracking-wider block mb-1">
              Agronomic Match Rationale
            </span>
            <p className="text-secondary font-body leading-relaxed text-[11px]">
              {scenario.whyThisCrop}
            </p>
          </div>

          {/* Compatibility Breakdown Triple */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono text-secondary uppercase block">Soil Fit</span>
              <span className="font-mono font-bold text-on-surface text-sm">
                {scenario.soilCompatibilityScore}%
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono text-secondary uppercase block">Climate Fit</span>
              <span className="font-mono font-bold text-on-surface text-sm">
                {scenario.climateCompatibilityScore}%
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono text-secondary uppercase block">Water Fit</span>
              <span className="font-mono font-bold text-on-surface text-sm">
                {scenario.waterCompatibilityScore}%
              </span>
            </div>
          </div>

          {/* Financials & Resource Matrix */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-blue-500" />
                Water Demand:
              </span>
              <span className="font-mono font-bold text-on-surface">
                {formatNumber(scenario.waterDemandM3Ha)} m³/ha ({scenario.waterDemandRating})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Growth Cycle:
              </span>
              <span className="font-mono font-bold text-on-surface">
                {scenario.durationDays} Days
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Expected Yield:
              </span>
              <span className="font-mono font-bold text-emerald-700">
                {scenario.expectedProductionTonHa} MT / ha
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                Estimated Cost:
              </span>
              <span className="font-mono font-bold text-on-surface">
                {formatCurrency(scenario.estimatedCostPerHa, currency)} / ha
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="font-semibold text-on-surface">Projected Net Profit:</span>
              <div className="text-right">
                <span className="font-mono font-bold text-primary text-sm block">
                  {formatCurrency(scenario.estimatedProfitPerHa, currency)} / ha
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                  +{scenario.roiPercent}% ROI
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <Link
          href={`/recommendations/products`}
          className="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1"
        >
          <span>Recommended Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Button
          size="sm"
          variant={isSelected ? 'secondary' : 'primary'}
          onClick={() => selectScenario(scenario.id)}
          icon={isSelected ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : undefined}
        >
          {isSelected ? 'Selected Scenario' : 'Select Scenario'}
        </Button>
      </CardFooter>
    </Card>
  );
}
