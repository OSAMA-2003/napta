'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { SatelliteHealthMap } from '@/components/farm/SatelliteHealthMap';
import { SoilTelemetryCard } from '@/components/farm/SoilTelemetryCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  ShoppingBag,
} from 'lucide-react';

export default function FarmDetailPage() {
  const params = useParams();
  const farmId = params.id as string;
  const { t, i18n } = useTranslation(['farm', 'common']);
  const { farms, scenarios, dir } = useNabta();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const NextArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const farm = farms.find((f) => f.id === farmId) || farms[0];
  const activeSc = scenarios.find((s) => s.id === farm.activeScenarioId) || scenarios[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Heading */}
      <div>
        <Link
          href="/farms"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface mb-3 transition-colors"
        >
          <BackArrow className="w-3.5 h-3.5" />
          <span>{t('farm:farmDetail.backToDirectory')}</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="mint" size="sm" dot>
                {t('farm:farmDetail.sentinelSynced')}
              </Badge>
              <span className="text-xs font-mono text-secondary">
                {farm.coordinates.lat.toFixed(4)}° N, {farm.coordinates.lng.toFixed(4)}° E
              </span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              {farm.name} — {t('farm:farmDetail.operationalDossier')}
            </h1>
            <p className="text-xs text-secondary mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>{farm.location}, {farm.country}</span>
              <span>•</span>
              <strong className="text-on-surface font-mono">{farm.areaHectares} {t('common:units.ha')}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/recommendations">
              <Button variant="secondary" size="sm">
                {t('farm:farmDetail.runDiagnosis')}
              </Button>
            </Link>
            <Link href="/recommendations/products">
              <Button variant="primary" size="sm" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
                {t('farm:farmDetail.recommendedInputs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Current Crop & Scenario Snapshot */}
      <div className="p-6 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 via-white to-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono text-[#054f31] uppercase font-bold tracking-wider block mb-1">
            {t('farm:farmDetail.activeStrategy')}
          </span>
          <h2 className="font-headline font-bold text-xl text-on-surface">
            {activeSc.cropName} ({activeSc.variety})
          </h2>
          <p className="text-xs text-secondary mt-1">
            {t('farm:farmDetail.season')}: <strong>{activeSc.season}</strong> | {t('farm:farmDetail.suitabilityScore')}:{' '}
            <strong className="text-[#054f31]">{activeSc.suitabilityScore}%</strong> | {t('farm:farmDetail.targetYield')}:{' '}
            <strong>{activeSc.expectedProductionTonHa} {t('common:units.mtPerHa')}</strong>
          </p>
        </div>

        <Link href="/scenarios">
          <Button variant="secondary" size="sm" icon={<NextArrow className="w-3.5 h-3.5" />}>
            {t('farm:farmDetail.managePlan')}
          </Button>
        </Link>
      </div>

      {/* Two-Column Telemetry View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SatelliteHealthMap farm={farm} />
        </div>
        <div className="lg:col-span-5">
          <SoilTelemetryCard soil={farm.soil} />
        </div>
      </div>
    </div>
  );
}
