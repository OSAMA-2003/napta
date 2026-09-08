'use client';

import React from 'react';
import Link from 'next/link';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { ProductCard } from '@/components/marketplace/ProductCard';
import {
  Satellite,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  FlaskConical,
  Store,
  Layers,
  Activity,
  CheckCircle2,
  Cpu,
  Globe2,
  Sliders,
} from 'lucide-react';

export default function HomePage() {
  const { activeFarm, scenarios, products, currency } = useNabta();
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-[#f8f9ff] py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Engine Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 mb-6 shadow-sm">
            <Satellite className="w-4 h-4 text-[#054f31]" />
            <span className="font-mono text-[11px] text-[#054f31] uppercase font-bold tracking-wider">
              Planetary-Scale Bio-Intelligence Suite
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
            <span className="text-xs text-secondary font-medium">Sentinel-2C Engine</span>
          </div>

          {/* Headline */}
          <h1 className="font-headline font-extrabold text-3xl sm:text-5xl lg:text-6xl text-on-surface max-w-4xl tracking-tight leading-[1.15] mb-6">
            The Operating System for{' '}
            <span className="text-primary underline decoration-[#10b981] decoration-4 underline-offset-8">
              Precision Agriculture
            </span>{' '}
            &amp; Global Input Sourcing
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg text-secondary max-w-2xl mb-8 leading-relaxed">
            NABTA combines multi-spectral satellite telemetry, chemical soil modeling, and stochastic yield forecasting
            to determine optimal crop selection, optimize water and nutrient allocation, and seamlessly source certified
            inputs required to maximize grower profit.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center max-w-md mb-14">
            <Link href="/recommendations" className="w-full sm:w-auto flex-1">
              <Button size="lg" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                Start Farm Analysis
              </Button>
            </Link>
            <Link href="/marketplace" className="w-full sm:w-auto flex-1">
              <Button size="lg" variant="secondary" className="w-full" icon={<Store className="w-4 h-4 text-primary" />} iconPosition="left">
                Explore Marketplace
              </Button>
            </Link>
          </div>

          {/* 2. SENTINEL ENGINE HUD SHOWCASE */}
          <div className="w-full rounded-2xl border border-slate-800 bg-[#0b1c30] shadow-2xl overflow-hidden text-left relative">
            {/* HUD Top Bar */}
            <div className="px-5 py-3 border-b border-slate-800 bg-[#06101d] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-[#aef1c8] font-bold uppercase tracking-wider">
                  TELEMETRY SENSOR GRID — {activeFarm.name.toUpperCase()}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
                <span>ORBIT: 786 KM SSO</span>
                <span>SPECTRAL BANDS: B4/B8/B11</span>
                <span className="text-[#10b981] font-semibold">CALIBRATED</span>
              </div>
            </div>

            {/* Hero Visual Area with Telemetry Overlays */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80')` }}>
              {/* Telemetry Scrim & Grid */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30] via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

              {/* Floating Analytical HUD Badges */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Canopy Vigor (NDVI)</span>
                  <span className="font-mono text-xl font-bold text-[#10b981]">{activeFarm.ndviAverage}</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">Optimal Photosynthesis</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Soil Moisture Deficit</span>
                  <span className="font-mono text-xl font-bold text-blue-400">-12%</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">Drip VRI Regulated</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Thermal Stress</span>
                  <span className="font-mono text-xl font-bold text-[#f59e0b]">Low Risk</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">Diurnal Span: 14.2°C</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0b1c30]/90 backdrop-blur-md border border-slate-700/80 text-white">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Top Recommended Crop</span>
                  <span className="font-mono text-xl font-bold text-[#6ffbbe]">Tomato (92%)</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">Est. Margin: +251% ROI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE PLATFORM PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="emerald" size="md" className="mb-3">
            Integrated Architecture
          </Badge>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-on-surface tracking-tight mb-3">
            From Satellite Observation to Commercial Settlement
          </h2>
          <p className="text-secondary text-sm font-body leading-relaxed">
            Eliminating guesswork in agriculture by connecting raw telemetry data directly to financial scenario models and global supply chains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <Card className="hover:border-slate-300 transition-all">
            <CardContent className="space-y-3 pt-6">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Satellite className="w-5 h-5" />
              </div>
              <h3 className="font-headline font-semibold text-base text-on-surface">
                1. Remote Sensing Telemetry
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                Sentinel-2 and PlanetScope satellite imagery ingested every 3 days. Real-time NDVI, moisture stress (CWSI), and thermal indices calibrated to plot coordinates.
              </p>
              <Link href="/farm-intelligence" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2">
                <span>View Live Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                2. Chemical Soil Modeling
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                In-depth soil profiling covering pH, electrical conductivity (EC), organic matter, and N-P-K reserves. Continuous salinity risk tracking to protect plant vigor.
              </p>
              <Link href="/farms" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2">
                <span>Inspect Soil Profiles</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                3. Scenario Trade-off Matrix
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                Compare multi-crop strategies side-by-side. Calculate exact water consumption (m³/ha), field duration, capex inputs, and anticipated net margin per hectare.
              </p>
              <Link href="/scenarios" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2">
                <span>Compare Scenarios</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                4. Verified B2B Marketplace
              </h3>
              <p className="text-xs text-secondary font-body leading-relaxed">
                Automated matching between the chosen farming scenario and verified international input suppliers. Order hybrid seeds, specialty fertilizers, and drip systems with escrow.
              </p>
              <Link href="/marketplace" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline pt-2">
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. SCENARIOS BENCHMARK PREVIEW */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <Badge variant="mint" size="sm" dot className="mb-2">
                Active Farm Calibration
              </Badge>
              <h2 className="font-headline font-bold text-2xl text-on-surface">
                Real-Time Crop Profitability Projections
              </h2>
              <p className="text-xs text-secondary mt-1">
                Calibrated against {activeFarm.name} ({activeFarm.areaHectares} ha, {activeFarm.soil.texture})
              </p>
            </div>
            <Link href="/scenarios">
              <Button variant="secondary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Full Trade-off Matrix
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scenarios.slice(0, 3).map((sc) => (
              <Card key={sc.id} className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-secondary">{sc.season}</span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10b981]/15 text-[#004f34] text-xs font-mono font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                    {sc.suitabilityScore}% MATCH
                  </div>
                </div>

                <div>
                  <h4 className="font-headline font-semibold text-base text-on-surface">{sc.cropName}</h4>
                  <span className="text-xs text-secondary font-mono">{sc.variety}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1.5 font-mono border border-slate-200/60">
                  <div className="flex justify-between">
                    <span className="text-secondary">Expected Yield:</span>
                    <strong className="text-on-surface">{sc.expectedProductionTonHa} MT/ha</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Water Budget:</span>
                    <strong className="text-on-surface">{formatNumber(sc.waterDemandM3Ha)} m³/ha</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Cycle:</span>
                    <strong className="text-on-surface">{sc.durationDays} Days</strong>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-primary">
                    <span className="font-bold font-sans">Net Profit:</span>
                    <strong className="text-sm font-bold">{formatCurrency(sc.estimatedProfitPerHa, currency)}/ha</strong>
                  </div>
                </div>

                <Link href="/recommendations" className="block">
                  <Button variant="secondary" size="sm" className="w-full">
                    Inspect Agronomic Report
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED INPUTS FROM MARKETPLACE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="slate" size="sm" className="mb-2">
              International Procurement
            </Badge>
            <h2 className="font-headline font-bold text-2xl text-on-surface">
              Featured Agricultural Inputs
            </h2>
            <p className="text-xs text-secondary mt-1">
              Direct from verified suppliers in Netherlands, Belgium, Spain, Germany, and Egypt
            </p>
          </div>
          <Link href="/marketplace">
            <Button variant="primary" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />}>
              Open Marketplace (10+ SKUs)
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. TRUST & GLOBAL STANDARDS */}
      <section className="bg-[#0b1c30] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-[#6ffbbe] uppercase tracking-widest font-bold">
              Institutional Standards
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Engineered for Enterprise Compliance &amp; Sovereign Food Security
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <ShieldCheck className="w-6 h-6 text-[#10b981] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">ISO 14064 Verified</h5>
              <p className="text-[11px] text-slate-400 mt-1">Automated greenhouse gas &amp; carbon footprint computation per harvest lot.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-[#10b981] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">GLOBALG.A.P. Standard</h5>
              <p className="text-[11px] text-slate-400 mt-1">Full traceability protocols from germplasm dispatch to ex-gate packing.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <Satellite className="w-6 h-6 text-[#6ffbbe] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">Copernicus Sentinel Feed</h5>
              <p className="text-[11px] text-slate-400 mt-1">Direct European Space Agency radiometric calibrated surface reflectance.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <Globe2 className="w-6 h-6 text-[#84cc16] mb-2" />
              <h5 className="font-headline font-bold text-xs text-white">B2B Escrow Settlement</h5>
              <p className="text-[11px] text-slate-400 mt-1">Funds held securely in trade escrow until customs clearance confirmation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
