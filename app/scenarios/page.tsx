'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useNabta } from '@/context/NabtaContext';
import { ScenarioCard } from '@/components/scenarios/ScenarioCard';
import { TradeoffMatrix } from '@/components/scenarios/TradeoffMatrix';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Tabs } from '@/ui/Tabs';
import { Sliders, Table, LayoutGrid, ArrowRight, ShoppingBag } from 'lucide-react';

export default function ScenariosPage() {
  const { scenarios, activeFarm } = useNabta();
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              Decision Modeling
            </Badge>
            <span className="text-xs font-mono text-secondary">
              Active Plot: {activeFarm.name} ({activeFarm.areaHectares} ha)
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Scenario Comparison &amp; Tradeoff Matrix
          </h1>
          <p className="text-xs text-secondary mt-1">
            Evaluate agronomic risk, water consumption, growth cycle duration, and financial returns across competing cultivation paths.
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Tabs
            activeTab={viewMode}
            onChange={(id: string) => setViewMode(id as 'matrix' | 'cards')}
            tabs={[
              { id: 'matrix', label: 'Matrix Table', icon: <Table className="w-3.5 h-3.5" /> },
              { id: 'cards', label: 'Detailed Cards', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            ]}
          />
          <Link href="/recommendations/products">
            <Button variant="primary" size="sm" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
              Prescribed Inputs
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'matrix' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-base text-on-surface">
              Side-by-Side Tradeoff Analysis
            </h3>
            <span className="text-xs font-mono text-secondary">
              Click &quot;Select Plan&quot; to apply to active plot
            </span>
          </div>
          <TradeoffMatrix scenarios={scenarios} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </div>
      )}

      {/* Rationale Note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-secondary space-y-1">
        <span className="font-headline font-bold text-on-surface block">
          Decision Modeling Methodology:
        </span>
        <p>
          Calculations incorporate historical regional auction gate prices, local Eocene aquifer extraction coefficients, and verified seed yield trials. Selecting a scenario dynamically recalibrates your farm’s input prescription list in the global marketplace.
        </p>
      </div>
    </div>
  );
}
