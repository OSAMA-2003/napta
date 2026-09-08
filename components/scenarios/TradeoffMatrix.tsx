'use client';

import React from 'react';
import { CropScenario } from '@/types/nabta';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { Check } from 'lucide-react';

interface TradeoffMatrixProps {
  scenarios: CropScenario[];
}

export function TradeoffMatrix({ scenarios }: TradeoffMatrixProps) {
  const { activeScenarioId, selectScenario, currency } = useNabta();

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-200 text-secondary font-mono text-[11px] uppercase">
            <th className="py-3.5 px-4 font-semibold min-w-[200px]">Decision Factor / Metric</th>
            {scenarios.map((sc) => {
              const isSelected = sc.id === activeScenarioId;
              return (
                <th
                  key={sc.id}
                  className={`py-3.5 px-4 min-w-[180px] font-bold ${
                    isSelected ? 'bg-primary-container/10 text-primary-container' : 'text-on-surface'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{sc.cropName}</span>
                    {isSelected && (
                      <span className="text-[9px] bg-primary text-white px-1.5 py-0.2 rounded font-sans uppercase">
                        Active
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
            <td className="py-3 px-4 font-semibold text-on-surface">Overall Suitability Index</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-bold text-sm text-[#054f31]">
                {sc.suitabilityScore}% Match
              </td>
            ))}
          </tr>

          {/* Water Demand */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary">Seasonal Water Demand</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono">
                <span className="font-semibold text-on-surface">
                  {formatNumber(sc.waterDemandM3Ha)} m³/ha
                </span>
                <span className="text-[10px] text-secondary block">({sc.waterDemandRating})</span>
              </td>
            ))}
          </tr>

          {/* Growth Duration */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary">Cycle Duration (Field Days)</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-medium text-on-surface">
                {sc.durationDays} Days
              </td>
            ))}
          </tr>

          {/* Expected Yield */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary">Expected Harvest Output</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-semibold text-emerald-800">
                {sc.expectedProductionTonHa} MT / ha
              </td>
            ))}
          </tr>

          {/* Capex / Input Cost */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary">Estimated Input &amp; Operating Cost</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-medium text-slate-700">
                {formatCurrency(sc.estimatedCostPerHa, currency)} / ha
              </td>
            ))}
          </tr>

          {/* Gross Revenue */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary">Projected Gross Revenue</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-medium text-on-surface">
                {formatCurrency(sc.expectedRevenuePerHa, currency)} / ha
              </td>
            ))}
          </tr>

          {/* Net Profit */}
          <tr className="bg-slate-50/40 hover:bg-slate-50">
            <td className="py-3 px-4 font-semibold text-on-surface">Projected Net Margin</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-bold text-base text-primary">
                {formatCurrency(sc.estimatedProfitPerHa, currency)} / ha
              </td>
            ))}
          </tr>

          {/* ROI % */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary">Projected ROI (%)</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono font-bold text-emerald-600">
                +{sc.roiPercent}%
              </td>
            ))}
          </tr>

          {/* Carbon Footprint */}
          <tr className="hover:bg-slate-50/50">
            <td className="py-3 px-4 text-secondary">Carbon Intensity</td>
            {scenarios.map((sc) => (
              <td key={sc.id} className="py-3 px-4 font-mono text-[11px] text-slate-500">
                {sc.carbonScoreKgPerTon} kg CO₂e / MT
              </td>
            ))}
          </tr>

          {/* Selection Action Row */}
          <tr className="bg-white">
            <td className="py-4 px-4 font-semibold text-secondary">Scenario Selection</td>
            {scenarios.map((sc) => {
              const isSelected = sc.id === activeScenarioId;
              return (
                <td key={sc.id} className="py-4 px-4">
                  <Button
                    size="sm"
                    variant={isSelected ? 'secondary' : 'primary'}
                    onClick={() => selectScenario(sc.id)}
                    className="w-full"
                    icon={isSelected ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : undefined}
                  >
                    {isSelected ? 'Active Plan' : 'Select Plan'}
                  </Button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
