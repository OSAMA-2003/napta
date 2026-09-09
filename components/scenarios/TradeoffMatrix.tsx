'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { CropScenario } from '@/types/nabta';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { Check } from 'lucide-react';

interface TradeoffMatrixProps {
  scenarios: CropScenario[];
}

export function TradeoffMatrix({ scenarios }: TradeoffMatrixProps) {
  const { t } = useTranslation(['scenarios', 'common']);
  const { activeScenarioId, selectScenario, currency } = useNabta();

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm text-start">
      <table className="w-full text-start text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-secondary font-mono text-[11px] uppercase">
            <th className="py-3.5 px-4 font-semibold min-w-[200px] text-start">
              {t('scenarios:matrix.colMetric')}
            </th>
            {scenarios.map((sc) => {
              const isSelected = sc.id === activeScenarioId;
              return (
                <th
                  key={sc.id}
                  className={`py-3.5 px-4 min-w-[180px] font-bold text-start ${
                    isSelected ? 'bg-primary-container/10 text-primary-container' : 'text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{sc.cropName}</span>
                    {isSelected && (
                      <span className="text-[9px] bg-primary text-white px-1.5 py-0.2 rounded font-sans uppercase">
                        {t('scenarios:matrix.selectedBtn')}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-normal text-secondary block font-sans">
                    {sc.variety}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-body">
          {/* Suitability Index */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 font-semibold text-on-surface text-start">
              {t('scenarios:matrix.suitabilityIndex')}
            </td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-bold text-sm text-[#054f31]">
                {sc.suitabilityScore}% {t('scenarios:card.suitable')}
              </td>
            ))}
          </tr>

          {/* Water Demand */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary text-start">{t('scenarios:card.waterBudget')}</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono">
                <span className="font-semibold text-on-surface">
                  {formatNumber(sc.waterDemandM3Ha)} {t('common:units.m3PerHa')}
                </span>
                <span className="text-[10px] text-secondary block">({sc.waterDemandRating})</span>
              </td>
            ))}
          </tr>

          {/* Growth Duration */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary text-start">
              {t('scenarios:matrix.cycleDuration')}
            </td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-medium text-on-surface">
                {sc.durationDays} {t('common:units.days')}
              </td>
            ))}
          </tr>

          {/* Expected Yield */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary text-start">{t('scenarios:card.expectedYield')}</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-semibold text-emerald-800">
                {sc.expectedProductionTonHa} {t('common:units.mtPerHa')}
              </td>
            ))}
          </tr>

          {/* Capex / Input Cost */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary text-start">{t('scenarios:card.capex')}</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-medium text-slate-700">
                {formatCurrency(sc.estimatedCostPerHa, currency)} / {t('common:units.ha')}
              </td>
            ))}
          </tr>

          {/* Gross Revenue */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary text-start">{t('scenarios:card.grossRevenue')}</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-medium text-on-surface">
                {formatCurrency(sc.expectedRevenuePerHa, currency)} / {t('common:units.ha')}
              </td>
            ))}
          </tr>

          {/* Net Profit */}
          <tr className="bg-slate-50/40 hover:bg-slate-50">
            <td className="py-3 px-4 font-semibold text-on-surface text-start">{t('scenarios:card.netProfit')}</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-bold text-base text-primary">
                {formatCurrency(sc.estimatedProfitPerHa, currency)} / {t('common:units.ha')}
              </td>
            ))}
          </tr>

          {/* ROI % */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary text-start">{t('scenarios:matrix.projectedRoi')}</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-bold text-emerald-600">
                +{sc.roiPercent}%
              </td>
            ))}
          </tr>

          {/* Carbon Footprint */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary text-start">{t('scenarios:matrix.carbonIntensity')}</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono text-[11px] text-slate-500">
                {sc.carbonScoreKgPerTon} kg CO₂e / MT
              </td>
            ))}
          </tr>

          {/* Action Row */}
          <tr className="bg-slate-50/80">
            <td className="py-3 px-4 font-semibold text-on-surface text-start">{t('scenarios:matrix.colAction')}</td>
            {scenarios.map((sc) => {
              const isSelected = sc.id === activeScenarioId;
              return (
                <td key={sc.id} className="py-3 px-4">
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-primary">
                      <Check className="w-4 h-4 text-[#10b981]" />
                      {t('scenarios:matrix.selectedBtn')}
                    </span>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => selectScenario(sc.id)}
                    >
                      {t('scenarios:matrix.selectBtn')}
                    </Button>
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
