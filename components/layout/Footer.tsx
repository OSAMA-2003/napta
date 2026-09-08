import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Globe2, Cpu, CheckCircle2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#0b1c30] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Sovereignty */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#054F31] flex items-center justify-center p-1.5 shadow-sm">
                <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                  <path
                    d="M16 6C16 6 8 13.5 8 20C8 24.4 11.6 28 16 28C20.4 28 24 24.4 24 20C24 13.5 16 6 16 6Z"
                    fill="#10B981"
                  />
                  <path
                    d="M16 9V24M16 16L11 12.5M16 19L21 15.5"
                    stroke="#FFFFFF"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                  <circle cx="25" cy="7" r="3.5" fill="#84CC16" />
                </svg>
              </div>
              <span className="font-headline font-extrabold text-xl text-white tracking-tight">
                NABTA AGRI-INTELLIGENCE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-body leading-relaxed max-w-sm">
              The Sovereign Agronomic Operating System bridging planetary-scale remote sensing,
              stochastic yield modeling, and international agricultural input procurement.
            </p>

            {/* Certifications Row */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
                ISO 14064 Carbon Audited
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                GLOBALG.A.P. Standard
              </div>
            </div>
          </div>

          {/* Col 2: Telemetry & Intelligence */}
          <div>
            <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-4">
              Intelligence
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/farm-intelligence" className="hover:text-white transition-colors">
                  Sentinel Remote Sensing
                </Link>
              </li>
              <li>
                <Link href="/recommendations" className="hover:text-white transition-colors">
                  Crop Recommendation Engine
                </Link>
              </li>
              <li>
                <Link href="/scenarios" className="hover:text-white transition-colors">
                  Scenario Tradeoff Matrix
                </Link>
              </li>
              <li>
                <Link href="/farms" className="hover:text-white transition-colors">
                  Precision Soil Profiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Global Marketplace */}
          <div>
            <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-4">
              B2B Marketplace
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/marketplace?category=seeds" className="hover:text-white transition-colors">
                  Certified Seeds &amp; Germplasm
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=fertilizers" className="hover:text-white transition-colors">
                  Water-Soluble Fertigation
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=irrigation" className="hover:text-white transition-colors">
                  Pressure Drip Systems
                </Link>
              </li>
              <li>
                <Link href="/marketplace?category=sensors-iot" className="hover:text-white transition-colors">
                  Sub-surface IoT Probes
                </Link>
              </li>
              <li>
                <Link href="/seller/new" className="hover:text-white transition-colors">
                  Sell Produce (Growers)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Compliance */}
          <div>
            <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-4">
              Enterprise Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/supplier" className="hover:text-white transition-colors">
                  Supplier Logistics Hub
                </Link>
              </li>
              <li>
                <Link href="/supplier/products/new" className="hover:text-white transition-colors">
                  Publish Input SKU
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Compliance &amp; Moderation
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-white transition-colors">
                  System Settings &amp; API
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-slate-400" />
            <span>NABTA GLOBAL AGROTECHNOLOGIES CORP. &copy; 2026. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#10b981] font-semibold">STATUS: SYSTEMS NOMINAL</span>
            <span>•</span>
            <span>SENTINEL-2C CONNECTED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
