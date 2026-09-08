import React from 'react';
import { SoilProfile } from '@/types/nabta';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { FlaskConical, Thermometer, Droplets } from 'lucide-react';

interface SoilTelemetryCardProps {
  soil: SoilProfile;
}

export function SoilTelemetryCard({ soil }: SoilTelemetryCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary-container">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <CardTitle>Soil Chemistry &amp; Macro-Nutrients</CardTitle>
            <p className="text-xs text-secondary">Real-time telemetry from sub-surface sensors</p>
          </div>
        </div>
        <Badge
          variant={soil.salinityRisk === 'Low' ? 'mint' : soil.salinityRisk === 'Moderate' ? 'amber' : 'crimson'}
          dot
          size="sm"
        >
          {soil.salinityRisk} Salinity Risk
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Top 3 Core Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono text-secondary uppercase block">Soil pH</span>
            <span className="text-xl font-mono font-bold text-on-surface">{soil.ph.toFixed(1)}</span>
            <span className="text-[10px] text-[#054f31] font-semibold block">Optimum 6.5-7.2</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono text-secondary uppercase block">EC (dS/m)</span>
            <span className="text-xl font-mono font-bold text-on-surface">{soil.ec.toFixed(2)}</span>
            <span className="text-[10px] text-secondary block">Bulk Conductivity</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-mono text-secondary uppercase block">Organic Matter</span>
            <span className="text-xl font-mono font-bold text-on-surface">{soil.organicMatter}%</span>
            <span className="text-[10px] text-[#f59e0b] font-semibold block">Conditioning Rec.</span>
          </div>
        </div>

        {/* N-P-K Macro Readouts */}
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-secondary mb-2">
            <span>Macro-Nutrient Reserves (PPM)</span>
            <span className="font-mono text-[10px]">Texture: {soil.texture}</span>
          </div>
          <div className="space-y-2.5 text-xs">
            {/* Nitrogen */}
            <div>
              <div className="flex justify-between font-mono mb-1 text-[11px]">
                <span className="text-secondary font-medium">Nitrogen (N)</span>
                <span className="font-bold text-on-surface">{soil.nitrogenPpm} ppm (Moderate)</span>
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
                <span className="text-secondary font-medium">Phosphorus (P)</span>
                <span className="font-bold text-on-surface">{soil.phosphorusPpm} ppm (Optimal)</span>
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
                <span className="text-secondary font-medium">Potassium (K)</span>
                <span className="font-bold text-on-surface">{soil.potassiumPpm} ppm (High)</span>
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

        {/* Secondary Micronutrients */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-secondary">
          <span>Calcium: <strong className="text-on-surface">{soil.calciumPpm} ppm</strong></span>
          <span>Magnesium: <strong className="text-on-surface">{soil.magnesiumPpm} ppm</strong></span>
        </div>
      </CardContent>
    </Card>
  );
}
