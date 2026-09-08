'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useNabta } from '@/context/NabtaContext';
import { AddFarmModal } from '@/components/farm/AddFarmModal';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  MapPin,
  Plus,
  ArrowRight,
  Satellite,
  Layers,
  Droplets,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export default function FarmsDirectoryPage() {
  const { farms, activeFarmId, setActiveFarmId, scenarios } = useNabta();
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              Multi-Sector Landholding
            </Badge>
            <span className="text-xs font-mono text-secondary">
              Total Plots: {farms.length}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            My Registered Agricultural Plots
          </h1>
          <p className="text-xs text-secondary mt-1">
            Directory of managed land sectors, precision irrigation grids, and live remote sensing status.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Farm Plot
        </Button>
      </div>

      {/* Farms Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => {
          const isActive = farm.id === activeFarmId;
          const activeSc = scenarios.find((s) => s.id === farm.activeScenarioId) || scenarios[0];

          return (
            <Card
              key={farm.id}
              className={`flex flex-col justify-between transition-all ${
                isActive ? 'border-2 border-primary ring-2 ring-primary/10 shadow-md' : 'hover:border-slate-300'
              }`}
            >
              <div>
                <CardHeader className="pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="mint" size="sm" dot>
                        {farm.analysisStatus}
                      </Badge>
                      <span className="text-[11px] font-mono text-secondary">
                        {farm.country}
                      </span>
                    </div>
                    <CardTitle className="text-base">{farm.name}</CardTitle>
                    <span className="text-xs text-secondary flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-secondary" />
                      {farm.location}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-lg font-bold text-on-surface block">
                      {farm.areaHectares}
                    </span>
                    <span className="text-[10px] font-mono text-secondary uppercase">Hectares</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-secondary">Current Crop Plan:</span>
                      <strong className="text-on-surface font-sans">{activeSc?.cropName || 'Tomato'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Irrigation Grid:</span>
                      <span className="truncate max-w-[170px] text-right font-sans">{farm.irrigationType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Canopy NDVI:</span>
                      <strong className="text-[#054f31]">{farm.ndviAverage} (Healthy)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Vitality Index:</span>
                      <strong className="text-primary">{farm.healthIndex} / 100</strong>
                    </div>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-3 flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant={isActive ? 'secondary' : 'ghost'}
                  onClick={() => setActiveFarmId(farm.id)}
                >
                  {isActive ? 'Active Plot' : 'Set as Active'}
                </Button>

                <Link href={`/farms/${farm.id}`}>
                  <Button size="sm" variant="primary" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View Farm Dashboard
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <AddFarmModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} />
    </div>
  );
}
