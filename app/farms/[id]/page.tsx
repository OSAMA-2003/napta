'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useNabta } from '@/context/NabtaContext';
import { SatelliteHealthMap } from '@/components/farm/SatelliteHealthMap';
import { SoilTelemetryCard } from '@/components/farm/SoilTelemetryCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  ArrowLeft,
  MapPin,
  Droplets,
  Sun,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

export default function FarmDetailPage() {
  const params = useParams();
  const farmId = params.id as string;
  const { farms, scenarios } = useNabta();

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
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landholding Directory</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="mint" size="sm" dot>
                Sentinel Synced
              </Badge>
              <span className="text-xs font-mono text-secondary">
                {farm.coordinates.lat.toFixed(4)}° N, {farm.coordinates.lng.toFixed(4)}° E
              </span>
            </div>
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              {farm.name} — Operational Dossier
            </h1>
            <p className="text-xs text-secondary mt-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>{farm.location}, {farm.country}</span>
              <span>•</span>
              <strong className="text-on-surface font-mono">{farm.areaHectares} Hectares</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/recommendations">
              <Button variant="secondary" size="sm">
                Run AI Diagnosis
              </Button>
            </Link>
            <Link href="/recommendations/products">
              <Button variant="primary" size="sm" icon={<ShoppingBag className="w-3.5 h-3.5" />}>
                Recommended Inputs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Current Crop & Scenario Snapshot */}
      <div className="p-6 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/5 via-white to-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono text-[#054f31] uppercase font-bold tracking-wider block mb-1">
            Active Agronomic Strategy
          </span>
          <h2 className="font-headline font-bold text-xl text-on-surface">
            {activeSc.cropName} ({activeSc.variety})
          </h2>
          <p className="text-xs text-secondary mt-1">
            Season: <strong>{activeSc.season}</strong> | Suitability Score:{' '}
            <strong className="text-[#054f31]">{activeSc.suitabilityScore}%</strong> | Target Yield:{' '}
            <strong>{activeSc.expectedProductionTonHa} MT/ha</strong>
          </p>
        </div>

        <Link href="/scenarios">
          <Button variant="secondary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
            Manage Cultivation Plan
          </Button>
        </Link>
      </div>

      {/* Visual & Soil Telemetry Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <SatelliteHealthMap farm={farm} />
        </div>
        <div className="lg:col-span-5">
          <SoilTelemetryCard soil={farm.soil} />
        </div>
      </div>

      {/* Climate & Water Infrastructure Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Climate Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-600" />
              <CardTitle>Climatic Calibration</CardTitle>
            </div>
            <Badge variant="slate" size="sm">{farm.climate.zone}</Badge>
          </CardHeader>
          <CardContent className="space-y-3 pt-2 text-xs font-mono">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-secondary">Growing Degree Days:</span>
              <strong className="text-on-surface">{farm.climate.growingDegreeDays} GDD</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-secondary">Average Summer Temperature:</span>
              <strong className="text-on-surface">{farm.climate.avgSummerTempC}°C</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-secondary">Annual Precipitation:</span>
              <strong className="text-on-surface">{farm.climate.annualRainfallMm} mm</strong>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-secondary">Frost Risk Exposure:</span>
              <strong className="text-emerald-700">{farm.climate.frostRiskDays} Days (Safe)</strong>
            </div>
          </CardContent>
        </Card>

        {/* Water Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-600" />
              <CardTitle>Hydrological Asset Profile</CardTitle>
            </div>
            <Badge variant="mint" size="sm">{farm.water.reliabilityRating} Reliability</Badge>
          </CardHeader>
          <CardContent className="space-y-3 pt-2 text-xs font-mono">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-secondary">Extraction Source:</span>
              <strong className="text-on-surface font-sans">{farm.water.source}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-secondary">Annual Quota Allocation:</span>
              <strong className="text-on-surface">{farm.water.allocationM3Ha} m³/ha</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-secondary">Water Salinity (TDS):</span>
              <strong className="text-on-surface">{farm.water.salinityTds} ppm</strong>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-secondary">Irrigation Grid Type:</span>
              <strong className="text-on-surface font-sans">{farm.irrigationType}</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
