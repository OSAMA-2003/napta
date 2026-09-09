'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { SoilProfile } from '@/types/nabta';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { FlaskConical } from 'lucide-react';

interface SoilTelemetryCardProps {
  soil: SoilProfile;
}

export function SoilTelemetryCard({ soil }: SoilTelemetryCardProps) {
  const { t } = useTranslation(['farm', 'common']);

  const riskLabel =
    soil.salinityRisk === 'Low'
      ? t('farm:soilTelemetry.lowRisk')
      : soil.salinityRisk === 'Moderate'
      ? t('farm:soilTelemetry.moderateRisk')
      : t('farm:soilTelemetry.highRisk');

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary-container">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <CardTitle>{t('farm:soilTelemetry.title')}</CardTitle>
            <p className="text-xs text-secondary">{t('farm:soilTelemetry.subtitle')}</p>
          </div>
        </div>
        <Badge
          variant={soil.salinityRisk === 'Low' ? 'mint' : soil.salinityRisk === 'Moderate' ? 'amber' : 'crimson'}
          dot
          size="sm"
        >
          {riskLabel}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Top 3 Core Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono text-secondary uppercase block">{t('farm:soilTelemetry.ph')}</span>
            <span className="text-xl font-mono font-bold text-on-surface">{soil.ph.toFixed(1)}</span>
            <span className="text-[10px] text-[#054f31] font-semibold block">6.5-7.2</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono text-secondary uppercase block">{t('farm:soilTelemetry.ec')}</span>
            <span className="text-xl font-mono font-bold text-on-surface">{soil.ec.toFixed(2)}</span>
            <span className="text-[10px] text-secondary block">dS/m</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono text-secondary uppercase block">{t('farm:soilTelemetry.organicMatter')}</span>
            <span className="text-xl font-mono font-bold text-on-surface">{soil.organicMatter}%</span>
            <span className="text-[10px] text-[#f59e0b] font-semibold block">2.0%+</span>
          </div>
        </div>

        {/* N-P-K Macro Readouts */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-secondary mb-2">
            <span>{t('farm:soilTelemetry.macroNutrients')}</span>
            <span className="font-mono text-[10px]">
              {t('farm:soilTelemetry.texture')}: {soil.texture}
            </span>
          </div>
          <div className="space-y-2.5 text-xs">
            {/* Nitrogen */}
            <div>
              <div className="flex justify-between font-mono mb-1 text-[11px]">
                <span className="text-secondary font-medium">{t('farm:soilTelemetry.nitrogen')}</span>
                <span className="font-bold text-on-surface">{soil.nitrogenPpm} ppm</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${Math.min((soil.nitrogenPpm / 80) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Phosphorus */}
            <div>
              <div className="flex justify-between font-mono mb-1 text-[11px]">
                <span className="text-secondary font-medium">{t('farm:soilTelemetry.phosphorus')}</span>
                <span className="font-bold text-on-surface">{soil.phosphorusPpm} ppm</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#10b981] rounded-full"
                  style={{ width: `${Math.min((soil.phosphorusPpm / 50) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Potassium */}
            <div>
              <div className="flex justify-between font-mono mb-1 text-[11px]">
                <span className="text-secondary font-medium">{t('farm:soilTelemetry.potassium')}</span>
                <span className="font-bold text-on-surface">{soil.potassiumPpm} ppm</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#054f31] rounded-full"
                  style={{ width: `${Math.min((soil.potassiumPpm / 300) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
