'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Card, CardContent } from '@/ui/Card';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { LocationSelector } from '@/components/farm/LocationSelector';
import {
  Satellite,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FlaskConical,
  Store,
  CheckCircle2,
  Globe2,
  Sliders,
  Sprout,
  ShoppingBag,
  BarChart3,
  MapPin,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export default function HomePage() {
  const { t, i18n } = useTranslation(['home', 'common', 'farm']);
  const { activeFarm, scenarios, products, currency, dir } = useNabta();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const NextArrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const ChevronIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const flowSteps = [
    {
      num: t('home:flow.step1Num'),
      title: t('home:flow.step1Title'),
      desc: t('home:flow.step1Desc'),
      icon: MapPin,
      badge: `${t('home:flow.stagePrefix')} 01`,
      accent: 'border-emerald-500/30 text-emerald-600 bg-emerald-50',
    },
    {
      num: t('home:flow.step2Num'),
      title: t('home:flow.step2Title'),
      desc: t('home:flow.step2Desc'),
      icon: Satellite,
      badge: `${t('home:flow.stagePrefix')} 02`,
      accent: 'border-blue-500/30 text-blue-600 bg-blue-50',
    },
    {
      num: t('home:flow.step3Num'),
      title: t('home:flow.step3Title'),
      desc: t('home:flow.step3Desc'),
      icon: Sprout,
      badge: `${t('home:flow.stagePrefix')} 03`,
      accent: 'border-teal-500/30 text-teal-600 bg-teal-50',
    },
    {
      num: t('home:flow.step4Num'),
      title: t('home:flow.step4Title'),
      desc: t('home:flow.step4Desc'),
      icon: FlaskConical,
      badge: `${t('home:flow.stagePrefix')} 04`,
      accent: 'border-amber-500/30 text-amber-600 bg-amber-50',
    },
    {
      num: t('home:flow.step5Num'),
      title: t('home:flow.step5Title'),
      desc: t('home:flow.step5Desc'),
      icon: Store,
      badge: `${t('home:flow.stagePrefix')} 05`,
      accent: 'border-indigo-500/30 text-indigo-600 bg-indigo-50',
    },
  ];

  const capabilities = [
    {
      title: t('home:capabilities.understandFarm'),
      icon: MapPin,
    },
    {
      title: t('home:capabilities.analyzeSoil'),
      icon: FlaskConical,
    },
    {
      title: t('home:capabilities.chooseCrops'),
      icon: Sprout,
    },
    {
      title: t('home:capabilities.estimateFinances'),
      icon: BarChart3,
    },
    {
      title: t('home:capabilities.prescribedProducts'),
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#f8f9ff] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Engine Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 mb-6 shadow-sm">
            <Satellite className="w-4 h-4 text-[#054f31]" />
            <span className="font-mono text-[11px] text-[#054f31] uppercase font-bold tracking-wider">
              {t('home:hero.badge')}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
            <span className="text-xs text-secondary font-medium">{t('home:hero.engine')}</span>
          </div>

          {/* Headline */}
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl text-on-surface max-w-4xl tracking-tight leading-[1.18] mb-6">
            {t('home:hero.headlinePart1')}{' '}
            <span className="text-primary underline decoration-[#10b981] decoration-4 underline-offset-8">
              {t('home:hero.headlineHighlight')}
            </span>{' '}
            {t('home:hero.headlinePart2')}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg text-secondary max-w-2xl mb-8 leading-relaxed">
            {t('home:hero.subtitle')}
          </p>

          {/* Actionable CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md mb-14">
            <Link href="/recommendations" className="w-full sm:w-auto flex-1">
              <Button size="lg" className="w-full" icon={<NextArrow className="w-4 h-4" />}>
                {t('home:hero.ctaStartAnalysis')}
              </Button>
            </Link>
            <Link href="/marketplace" className="w-full sm:w-auto flex-1">
              <Button
                size="lg"
                variant="secondary"
                className="w-full"
                icon={<Store className="w-4 h-4 text-primary" />}
                iconPosition="left"
              >
                {t('home:hero.ctaExploreMarketplace')}
              </Button>
            </Link>
          </div>

          {/* 2. SENTINEL ENGINE HUD SHOWCASE */}
          <div className="w-full rounded-2xl border border-slate-800 bg-[#0b1c30] shadow-2xl overflow-hidden text-start relative">
            {/* HUD Top Bar */}
            <div className="px-5 py-3 border-b border-slate-800 bg-[#06101d] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#aef1c8] font-bold uppercase tracking-wider">
                  {t('home:hud.telemetryTitle')} — {activeFarm.name.toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
                <span>{t('home:hud.orbit')}</span>
                <span>{t('home:hud.spectralBands')}</span>
                <span className="text-[#10b981] font-semibold">{t('home:hud.calibrated')}</span>
              </div>
            </div>

            {/* Hero Visual Area with Telemetry Overlays */}
            <div
              className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')`,
              }}
            >
              {/* Telemetry Scrim & Grid */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30] via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

              {/* Floating Analytical HUD Badges */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white text-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    {t('home:hud.canopyVigor')}
                  </span>
                  <span className="font-mono text-xl font-bold text-[#10b981]">
                    {activeFarm.ndviAverage}
                  </span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    {t('home:hud.optimalPhoto')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white text-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    {t('home:hud.moistureDeficit')}
                  </span>
                  <span className="font-mono text-xl font-bold text-blue-400">-12%</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    {t('home:hud.dripRegulated')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white text-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    {t('home:hud.thermalStress')}
                  </span>
                  <span className="font-mono text-xl font-bold text-[#f59e0b]">
                    {t('home:hud.lowRisk')}
                  </span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    {t('home:hud.diurnalSpan')}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white text-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">
                    {t('home:hud.topCrop')}
                  </span>
                  <span className="font-mono text-xl font-bold text-[#6ffbbe]">
                    {t('home:hud.tomatoScore')}
                  </span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">
                    {t('home:hud.estRoi')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE FARMER VALUE PROPOSITION */}
      <section className="py-10 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div>
              <Badge variant="emerald" size="sm">
                {t('home:capabilities.badge')}
              </Badge>
              <h2 className="font-headline font-bold text-lg sm:text-xl text-on-surface mt-1">
                {t('home:capabilities.heading')}
              </h2>
            </div>
            <Link
              href="/recommendations"
              className="text-xs font-semibold text-primary inline-flex items-center gap-1.5 hover:underline"
            >
              <span>{t('home:hero.ctaStartAnalysis')}</span>
              <NextArrow className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all text-start"
                >
                  <div className="h-7 w-7 rounded-lg bg-emerald-100/70 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-medium text-slate-700 leading-snug">
                    {cap.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. STRUCTURED LOCATION SELECTOR WITH AGRONOMIC CONTEXT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto">
          <LocationSelector />
        </div>
      </section>

      {/* 4. END-TO-END 5-STEP PRODUCT FLOW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="emerald" size="md" className="mb-3">
              {t('home:flow.badge')}
            </Badge>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface tracking-tight mb-3">
              {t('home:flow.heading')}
            </h2>
            <p className="text-secondary text-sm font-body leading-relaxed">
              {t('home:flow.subtitle')}
            </p>
          </div>

          {/* 5-Step Connected Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col h-full text-start group">
                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-primary transition-colors">
                        {step.num}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${step.accent}`}
                      >
                        {step.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Title */}
                    <h3 className="font-headline font-bold text-sm sm:text-base text-on-surface mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-secondary font-body leading-relaxed mt-auto">
                      {step.desc}
                    </p>
                  </div>

                  {/* Flow Connector Arrow between cards on desktop */}
                  {idx < flowSteps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -end-3 transform -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                      <ChevronIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. GLOBAL POSITIONING STATS RIBBON */}
      <section className="bg-[#054f31] text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-[#003620]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#aef1c8] text-xs font-mono mb-3">
                <Globe2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span>{t('home:globalRibbon.badge')}</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t('home:globalRibbon.title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
                {t('home:globalRibbon.desc')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 text-center min-w-[130px]">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#6ffbbe] block">
                  {t('home:globalRibbon.stat1Val')}
                </span>
                <span className="text-[11px] text-slate-200 font-medium block mt-1">
                  {t('home:globalRibbon.stat1Label')}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 text-center min-w-[130px]">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#aef1c8] block">
                  {t('home:globalRibbon.stat2Val')}
                </span>
                <span className="text-[11px] text-slate-200 font-medium block mt-1">
                  {t('home:globalRibbon.stat2Label')}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 text-center min-w-[130px]">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-[#84cc16] block">
                  {t('home:globalRibbon.stat3Val')}
                </span>
                <span className="text-[11px] text-slate-200 font-medium block mt-1">
                  {t('home:globalRibbon.stat3Label')}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 text-center min-w-[130px]">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white block">
                  {t('home:globalRibbon.stat4Val')}
                </span>
                <span className="text-[11px] text-slate-200 font-medium block mt-1">
                  {t('home:globalRibbon.stat4Label')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUR CORE PLATFORM PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="emerald" size="md" className="mb-3">
            {t('home:pillars.badge')}
          </Badge>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface tracking-tight mb-3">
            {t('home:pillars.heading')}
          </h2>
          <p className="text-secondary text-sm font-body leading-relaxed">
            {t('home:pillars.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
          {/* Pillar 1 */}
          <Card className="hover:border-slate-300 transition-all">
            <CardContent className="space-y-3 pt-6">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Satellite className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-semibold text-base text-on-surface">
                {t('home:pillars.p1Title')}
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                {t('home:pillars.p1Desc')}
              </p>
              <Link
                href="/farm-intelligence"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2"
              >
                <span>{t('home:pillars.p1Link')}</span>
                <NextArrow className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Pillar 2 */}
          <Card className="hover:border-slate-300 transition-all">
            <CardContent className="space-y-3 pt-6">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-semibold text-base text-on-surface">
                {t('home:pillars.p2Title')}
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                {t('home:pillars.p2Desc')}
              </p>
              <Link
                href="/farms"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2"
              >
                <span>{t('home:pillars.p2Link')}</span>
                <NextArrow className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Pillar 3 */}
          <Card className="hover:border-slate-300 transition-all">
            <CardContent className="space-y-3 pt-6">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-semibold text-base text-on-surface">
                {t('home:pillars.p3Title')}
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                {t('home:pillars.p3Desc')}
              </p>
              <Link
                href="/scenarios"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2"
              >
                <span>{t('home:pillars.p3Link')}</span>
                <NextArrow className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>

          {/* Pillar 4 */}
          <Card className="hover:border-slate-300 transition-all">
            <CardContent className="space-y-3 pt-6">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-semibold text-base text-on-surface">
                {t('home:pillars.p4Title')}
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                {t('home:pillars.p4Desc')}
              </p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2"
              >
                <span>{t('home:pillars.p4Link')}</span>
                <NextArrow className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 7. SCENARIOS BENCHMARK PREVIEW */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4 text-start">
            <div>
              <Badge variant="mint" size="sm" dot className="mb-2">
                {t('home:scenariosPreview.badge')}
              </Badge>
              <h2 className="font-headline font-bold text-2xl text-on-surface">
                {t('home:scenariosPreview.heading')}
              </h2>
              <p className="text-xs text-secondary mt-1">
                {t('home:scenariosPreview.subtitle')} — {activeFarm.name} ({activeFarm.areaHectares} ha,{' '}
                {activeFarm.soil.texture})
              </p>
            </div>
            <Link href="/scenarios">
              <Button variant="secondary" size="sm" icon={<NextArrow className="w-3.5 h-3.5" />}>
                {t('home:scenariosPreview.fullMatrix')}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            {scenarios.slice(0, 3).map((sc) => (
              <Card key={sc.id} className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-secondary">{sc.season}</span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10b981]/15 text-[#004f34] text-xs font-mono font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                    {sc.suitabilityScore}% {t('home:scenariosPreview.match')}
                  </div>
                </div>

                <div>
                  <h4 className="font-headline font-semibold text-base text-on-surface">
                    {sc.cropName}
                  </h4>
                  <span className="text-xs text-secondary font-mono">{sc.variety}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 font-mono border border-slate-200/60">
                  <div className="flex justify-between">
                    <span className="text-secondary">{t('home:scenariosPreview.expectedYield')}:</span>
                    <strong className="text-on-surface">
                      {sc.expectedProductionTonHa} {t('common:units.mtPerHa')}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">{t('home:scenariosPreview.waterBudget')}:</span>
                    <strong className="text-on-surface">
                      {formatNumber(sc.waterDemandM3Ha)} {t('common:units.m3PerHa')}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">{t('home:scenariosPreview.cycle')}:</span>
                    <strong className="text-on-surface">
                      {sc.durationDays} {t('common:units.days')}
                    </strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-primary">
                    <span className="font-bold font-sans">{t('home:scenariosPreview.netProfit')}:</span>
                    <strong className="text-sm font-bold">
                      {formatCurrency(sc.estimatedProfitPerHa, currency)}/{t('common:units.ha')}
                    </strong>
                  </div>
                </div>

                <Link href="/recommendations" className="block">
                  <Button variant="secondary" size="sm" className="w-full">
                    {t('home:scenariosPreview.reportBtn')}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FEATURED INPUTS FROM MARKETPLACE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4 text-start">
          <div>
            <Badge variant="slate" size="sm" className="mb-2">
              {t('home:featuredInputs.badge')}
            </Badge>
            <h2 className="font-headline font-bold text-2xl text-on-surface">
              {t('home:featuredInputs.heading')}
            </h2>
            <p className="text-xs text-secondary mt-1">
              {t('home:featuredInputs.subtitle')}
            </p>
          </div>
          <Link href="/marketplace">
            <Button variant="primary" size="sm" icon={<NextArrow className="w-3.5 h-3.5" />}>
              {t('home:featuredInputs.openMarketplace')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 9. TRUST & GLOBAL STANDARDS */}
      <section className="bg-[#0b1c30] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#6ffbbe] uppercase tracking-widest font-bold">
              {t('home:trust.badge')}
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t('home:trust.heading')}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <ShieldCheck className="w-6 h-6 text-[#10b981] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">{t('home:trust.isoTitle')}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{t('home:trust.isoDesc')}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-[#10b981] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">{t('home:trust.globalGapTitle')}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{t('home:trust.globalGapDesc')}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <Satellite className="w-6 h-6 text-[#6ffbbe] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">{t('home:trust.sentinelTitle')}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{t('home:trust.sentinelDesc')}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <Globe2 className="w-6 h-6 text-[#84cc16] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">{t('home:trust.escrowTitle')}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{t('home:trust.escrowDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
