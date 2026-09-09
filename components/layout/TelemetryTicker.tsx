'use client';

import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function TelemetryTicker() {
  const { t } = useTranslation('common');

  return (
    <div className="w-full bg-[#003620] text-white py-2 px-4 border-b border-[#054f31] select-none text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-start">
        {/* Left: Live Satellite Feed Status */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6ffbbe]"></span>
          </span>
          <span className="font-mono uppercase font-bold tracking-wider text-[#6ffbbe] text-[11px] flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 inline" />
            {t('ticker.liveFeed')}
          </span>
          <span className="text-[#7fc099] hidden md:inline">|</span>
          <span className="text-slate-200 font-medium tracking-tight text-[11px] hidden sm:inline">
            {t('ticker.monitoringArea')}
          </span>
        </div>

        {/* Right: Key Metric Proofs */}
        <div className="flex items-center flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] text-[#d3e4fe]">
          <span className="text-[#aef1c8] font-bold whitespace-nowrap">{t('ticker.yieldProtected')}</span>
          <span className="text-slate-400">•</span>
          <span className="whitespace-nowrap">{t('ticker.forecastAccuracy')}</span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-white font-sans text-[10px] font-semibold tracking-wider whitespace-nowrap">
            <ShieldCheck className="w-3 h-3 text-[#10b981]" />
            {t('ticker.isoCertified')}
          </span>
        </div>
      </div>
    </div>
  );
}
