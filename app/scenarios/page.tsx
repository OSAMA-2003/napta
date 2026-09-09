'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { ScenarioCard } from '@/components/scenarios/ScenarioCard';
import { TradeoffMatrix } from '@/components/scenarios/TradeoffMatrix';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Tabs } from '@/ui/Tabs';
import { Table, LayoutGrid, ShoppingBag } from 'lucide-react';

export default function ScenariosPage() {
  const { t } = useTranslation(['scenarios', 'common']);
  const { scenarios, activeFarm } = useNabta();
  const [viewMode, setViewMode] = useState<'matrix' | 'cards'>('matrix');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-start">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              {t('scenarios:badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('scenarios:farmContext')}: {activeFarm.name} ({activeFarm.areaHectares} {t('common:units.ha')})
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('scenarios:title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('scenarios:subtitle')}
          </p>
        </div>

        {/* View Switcher & Action */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Tabs
            activeTab={viewMode}
            onChange={(id: string) => setViewMode(id as 'matrix' | 'cards')}
            tabs={[
              { id: 'matrix', label: t('scenarios:tabs.matrix'), icon: <Table className="w-3.5 h-3.5" /> },
              { id: 'cards', label: t('scenarios:tabs.cards'), icon: <LayoutGrid className="w-3.5 h-3.5" /> },
            ]}
          />
          <Link href="/recommendations/products">
            <Button variant="primary" size="sm" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
              {t('scenarios:prescribedInputsBtn')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'matrix' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-base text-on-surface">
              {t('scenarios:matrix.title')}
            </h3>
            <span className="text-xs font-mono text-secondary">
              {t('scenarios:selectPrompt')}
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
          {t('scenarios:methodologyTitle')}
        </span>
        <p>
          {t('scenarios:methodologyDesc')}
        </p>
      </div>
    </div>
  );
}
