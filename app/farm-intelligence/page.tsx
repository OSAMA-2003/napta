'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useNabta } from '@/context/NabtaContext';
import { SatelliteHealthMap } from '@/components/farm/SatelliteHealthMap';
import { SoilTelemetryCard } from '@/components/farm/SoilTelemetryCard';
import { AddFarmModal } from '@/components/farm/AddFarmModal';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  Satellite,
  Plus,
  ArrowRight,
  Sun,
  Droplets,
  Wind,
  Layers,
  Thermometer,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export default function FarmIntelligencePage() {
  const { farms, activeFarmId, setActiveFarmId, activeFarm } = useNabta();
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Farm Switcher */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              Real-Time Sentinel Telemetry
            </Badge>
            <span className="text-xs font-mono text-secondary">
              Resolution: 10m Ground Sample
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Farm Operations &amp; Telemetry Dashboard
          </h1>
          <p className="text-xs text-secondary mt-1">
            Continuous remote sensing, sub-surface soil diagnostics, and micro-climate observation.
          </p>
        </div>

        {/* Farm Switcher and Add Button */}
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <select
            value={activeFarmId}
            onChange={(e) => setActiveFarmId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-300 font-headline font-semibold text-xs text-on-surface shadow-sm focus:outline-none focus:border-primary"
          >
            {farms.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.areaHectares} ha) - {f.country}
              </option>
            ))}
          </select>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setAddModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Register Plot
          </Button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">NDVI Vegetation Health</span>
            <Satellite className="w-4 h-4 text-primary" />
          </div>
          <span className="font-mono text-2xl font-bold text-on-surface">
            {activeFarm.ndviAverage}
          </span>
          <span className="text-[10px] text-[#10b981] font-semibold block mt-0.5">
            +4.2% vs 30-day baseline
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Surface Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-mono text-2xl font-bold text-on-surface">
            {activeFarm.climate.currentTempC}°C
          </span>
          <span className="text-[10px] text-secondary block mt-0.5">
            Diurnal Span: {activeFarm.climate.avgSummerTempC - activeFarm.climate.avgWinterTempC}°C
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Water Allocation</span>
            <Droplets className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-mono text-2xl font-bold text-on-surface">
            {activeFarm.water.allocationM3Ha} m³
          </span>
          <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">
            EC: {activeFarm.water.qualityEc} dS/m (Good)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">Overall Vitality Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-mono text-2xl font-bold text-primary">
            {activeFarm.healthIndex} / 100
          </span>
          <span className="text-[10px] text-secondary block mt-0.5">
            Status: {activeFarm.analysisStatus}
          </span>
        </div>
      </div>

      {/* Main Grid: Orbit View & Soil Chemistry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Satellite GIS View (7 cols) */}
        <div className="lg:col-span-7">
          <SatelliteHealthMap farm={activeFarm} />
        </div>

        {/* Soil Diagnostics (5 cols) */}
        <div className="lg:col-span-5">
          <SoilTelemetryCard soil={activeFarm.soil} />
        </div>
      </div>

      {/* Climate Station & Micro-Sensors Strip */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <CardTitle>Micro-Climate &amp; Environmental Telemetry</CardTitle>
              <p className="text-xs text-secondary font-mono">
                Zone: {activeFarm.climate.zone}
              </p>
            </div>
          </div>
          <Badge variant="slate" size="sm">
            Station Calibrated
          </Badge>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-secondary uppercase block mb-1">Growing Degree Days</span>
              <span className="text-lg font-bold text-on-surface">{activeFarm.climate.growingDegreeDays} GDD</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Thermal sum on track</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-secondary uppercase block mb-1">Solar Radiation</span>
              <span className="text-lg font-bold text-on-surface">{activeFarm.climate.solarRadiationWm2} W/m²</span>
              <span className="text-[10px] text-secondary block mt-0.5">High PAR intensity</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-secondary uppercase block mb-1">Relative Humidity</span>
              <span className="text-lg font-bold text-on-surface">{activeFarm.climate.humidityPercent}%</span>
              <span className="text-[10px] text-secondary block mt-0.5">Vapor pressure 1.8 kPa</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-secondary uppercase block mb-1">Surface Wind Velocity</span>
              <span className="text-lg font-bold text-on-surface">{activeFarm.climate.windSpeedKmh} km/h</span>
              <span className="text-[10px] text-secondary block mt-0.5">Spray drift safe</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Navigation Banner */}
      <div className="p-6 rounded-2xl bg-[#003620] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-[10px] font-mono text-[#6ffbbe] uppercase tracking-wider font-bold">
            Agronomic Next Action
          </span>
          <h3 className="font-headline text-lg font-bold">
            Generate Multi-Scenario Recommendation for {activeFarm.name}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Pass live N-P-K reserves and thermal degree days into the recommendation engine to generate optimal crop choices and input prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/recommendations" className="w-full sm:w-auto">
            <Button
              variant="telemetry"
              size="md"
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Launch Crop AI Engine
            </Button>
          </Link>
        </div>
      </div>

      <AddFarmModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
}
