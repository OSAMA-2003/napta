'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CropScenario } from '@/types/nabta';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Check, ArrowRight, ArrowLeft, Droplets, Clock, TrendingUp, DollarSign } from 'lucide-react';

interface ScenarioCardProps {
  scenario: CropScenario;
}

export function ScenarioCard({ scenario }: ScenarioCardProps) {
  const { t, i18n } = useTranslation(['scenarios', 'common']);
  const { selectScenario, activeScenarioId, currency, dir } = useNabta();
  const isSelected = scenario.id === activeScenarioId;
  const NextArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <Card
      className={`flex flex-col justify-between transition-all text-start ${
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
                {scenario.status === 'Selected'
                  ? t('scenarios:card.selected')
                  : t('scenarios:card.analyzed')}
              </Badge>
              <span className="text-[11px] font-mono text-secondary">{scenario.season}</span>
            </div>
            <CardTitle className="text-base">{scenario.cropName}</CardTitle>
            <span className="text-xs font-mono text-secondary block">{scenario.variety}</span>
          </div>

          {/* Suitability Score Pill */}
          <div className="text-end">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30">
              <span className="h-2 w-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="font-mono font-bold text-xs text-[#004f34]">
                {scenario.suitabilityScore}% {t('scenarios:card.suitable')}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-3 text-xs">
          {/* Why This Crop Justification */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="font-headline font-semibold text-[11px] text-on-surface uppercase tracking-wider block mb-1">
              {t('scenarios:card.agronomicRationale')}
            </span>
            <p className="text-secondary font-body leading-relaxed text-[11px]">
              {scenario.whyThisCrop}
            </p>
          </div>

          {/* Compatibility Breakdown Triple */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono text-secondary uppercase block">
                {t('scenarios:card.soilFit')}
              </span>
              <span className="font-mono font-bold text-on-surface text-sm">
                {scenario.soilCompatibilityScore}%
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono text-secondary uppercase block">
                {t('scenarios:card.climateFit')}
              </span>
              <span className="font-mono font-bold text-on-surface text-sm">
                {scenario.climateCompatibilityScore}%
              </span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono text-secondary uppercase block">
                {t('scenarios:card.waterFit')}
              </span>
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
                {t('scenarios:card.waterBudget')}:
              </span>
              <span className="font-mono font-bold text-on-surface">
                {formatNumber(scenario.waterDemandM3Ha)} {t('common:units.m3PerHa')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {t('scenarios:card.duration')}:
              </span>
              <span className="font-mono font-bold text-on-surface">
                {scenario.durationDays} {t('common:units.days')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                {t('scenarios:card.expectedYield')}:
              </span>
              <span className="font-mono font-bold text-emerald-700">
                {scenario.expectedProductionTonHa} {t('common:units.mtPerHa')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-secondary flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                {t('scenarios:card.capex')}:
              </span>
              <span className="font-mono font-bold text-on-surface">
                {formatCurrency(scenario.estimatedCostPerHa, currency)} / {t('common:units.ha')}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              <span className="font-semibold text-on-surface">{t('scenarios:card.netProfit')}:</span>
              <div className="text-end">
                <span className="font-mono font-bold text-sm text-primary block">
                  {formatCurrency(scenario.estimatedProfitPerHa, currency)} / {t('common:units.ha')}
                </span>
                <span className="text-[10px] text-emerald-600 font-mono">
                  +{scenario.roiPercent}% ROI
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {isSelected ? (
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-primary">
            <Check className="w-4 h-4 text-[#10b981]" />
            <span>{t('scenarios:card.activeCalibrated')}</span>
          </div>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={() => selectScenario(scenario.id)}
          >
            {t('scenarios:card.selectScenarioBtn')}
          </Button>
        )}

        <Link href="/recommendations">
          <Button variant="secondary" size="sm" icon={<NextArrow className="w-3.5 h-3.5" />}>
            {t('scenarios:card.inspectReportBtn')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
