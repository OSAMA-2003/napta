'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Satellite, RefreshCw, Eye } from 'lucide-react';
import { Farm } from '@/types/nabta';

interface SatelliteHealthMapProps {
  farm: Farm;
}

export function SatelliteHealthMap({ farm }: SatelliteHealthMapProps) {
  const { t } = useTranslation(['farm', 'common']);

  const [activeBand, setActiveBand] = useState<'NDVI' | 'TRUE_COLOR' | 'MOISTURE'>('NDVI');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-[#054F31] text-white">
            <Satellite className="w-4 h-4" />
          </div>
          <div>
            <CardTitle>{t('farm:farmIntelligence.healthMapTitle')}</CardTitle>
            <p className="text-xs text-secondary font-mono">
              Lat: {farm.coordinates.lat.toFixed(3)}°N, Lng: {farm.coordinates.lng.toFixed(3)}°E
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="mint" dot size="sm">
            {t('farm:farmIntelligence.liveStream')}
          </Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefresh}
            icon={<RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />}
          >
            {t('common:actions.reset')}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 relative flex-1 min-h-[300px] bg-[#0b1c30] flex flex-col justify-between">
        {/* Satellite Map Canvas Simulation */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all opacity-80"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')`,
          }}
        >
          {/* NDVI Green Gradient Scrim Overlay */}
          <div
            className={`absolute inset-0 transition-opacity ${
              activeBand === 'NDVI'
                ? 'bg-gradient-to-tr from-[#054f31]/60 via-[#10b981]/40 to-transparent'
                : activeBand === 'MOISTURE'
                ? 'bg-gradient-to-tr from-blue-900/60 via-cyan-600/30 to-transparent'
                : 'bg-black/20'
            }`}
          />

          {/* Precision Grid & Telemetry HUD Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

          {/* Target Reticle / Sector Pins */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-20 h-20 border border-[#10b981] rounded-full animate-pulse flex items-center justify-center">
              <div className="w-2 h-2 bg-[#84cc16] rounded-full" />
            </div>
            <span className="mt-2 bg-[#0b1c30]/90 text-[#6ffbbe] border border-[#10b981]/40 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider">
              ZONE A-1: NDVI {farm.ndviAverage}
            </span>
          </div>
        </div>

        {/* Top HUD Stats Overlay */}
        <div className="relative z-10 p-4 flex items-center justify-between text-white text-xs font-mono">
          <div className="bg-[#0b1c30]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80">
            <span className="text-slate-400 block text-[9px] uppercase">
              {t('farm:farmIntelligence.sentinelResolution')}
            </span>
            <span className="text-[#6ffbbe] font-bold">10m / Ground Sample</span>
          </div>
          <div className="bg-[#0b1c30]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-end">
            <span className="text-slate-400 block text-[9px] uppercase">
              {t('farm:farmIntelligence.canopyHealthIndex')}
            </span>
            <span className="text-[#10b981] font-bold text-sm">{farm.healthIndex} / 100</span>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="relative z-10 p-4 bg-gradient-to-t from-[#0b1c30] to-transparent flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex rounded-lg bg-[#0b1c30]/90 p-1 border border-slate-700">
            <button
              onClick={() => setActiveBand('NDVI')}
              className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeBand === 'NDVI'
                  ? 'bg-[#10b981] text-[#002111] shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              NDVI (Canopy Vigor)
            </button>
            <button
              onClick={() => setActiveBand('MOISTURE')}
              className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeBand === 'MOISTURE'
                  ? 'bg-blue-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              NDMI (Soil Moisture)
            </button>
            <button
              onClick={() => setActiveBand('TRUE_COLOR')}
              className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                activeBand === 'TRUE_COLOR'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              True Color (B4/B3/B2)
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#aef1c8] font-mono">
            <Eye className="w-3.5 h-3.5" />
            <span>Sentinel-2C Overpass: 14h ago</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
