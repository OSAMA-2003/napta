'use client';

import React, { useState } from 'react';
import { useNabta } from '@/context/NabtaContext';
import { CURRENCY_RATES } from '@/lib/utils';
import { CurrencyCode, UserRole } from '@/types/nabta';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  User,
  Globe,
  Bell,
  Shield,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage() {
  const { currency, setCurrency, role, setRole, activeFarm } = useNabta();

  const [savedNotice, setSavedNotice] = useState(false);
  const [userName, setUserName] = useState('Eng. Osama Farouk');
  const [userEmail, setUserEmail] = useState('osama.farouk@agri-vanguard.com');
  const [language, setLanguage] = useState('en');
  const [phone, setPhone] = useState('+20 100 482 9102');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              Global Preferences
            </Badge>
            <span className="text-xs font-mono text-secondary">
              Account: {userName}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Profile, Regional &amp; Enterprise Settings
          </h1>
          <p className="text-xs text-secondary mt-1">
            Configure cross-border settlement currency, preferred agronomic dialect, notification triggers, and user role.
          </p>
        </div>

        {savedNotice && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Preferences Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: User Profile */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-primary" />
            <h3 className="font-headline font-bold text-base text-on-surface">
              1. Operator Identity &amp; Contact Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Official Email Address</label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Phone Number (E.164)</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Active Portal Mode</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary font-semibold"
              >
                <option value="FARMER">Farmer / Agronomist</option>
                <option value="SUPPLIER">Input Supplier &amp; Vendor</option>
                <option value="ADMIN">System Administrator</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Section 2: Global Currencies & Localization */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-headline font-bold text-base text-on-surface">
              2. Internationalization &amp; Settlement Currency
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Preferred Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary font-mono font-bold"
              >
                {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((c) => (
                  <option key={c} value={c}>
                    {CURRENCY_RATES[c].label}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-secondary mt-1 block">
                Prices and scenario calculations across the entire application update dynamically.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Interface Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              >
                <option value="en">English (International Technical)</option>
                <option value="ar">العربية (Arabic - Regional Agricultural)</option>
                <option value="es">Español (Agronomía)</option>
                <option value="fr">Français (Agriculture de précision)</option>
              </select>
              <span className="text-[10px] text-secondary mt-1 block">
                Full bilingual RTL reflow ready for multi-region operators.
              </span>
            </div>
          </div>
        </Card>

        {/* Section 3: Farm Overview Snapshot */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-primary" />
            <h3 className="font-headline font-bold text-base text-on-surface">
              3. Default Operating Farm
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-headline font-bold text-on-surface block">
              {activeFarm.name} ({activeFarm.areaHectares} ha)
            </span>
            <p className="text-secondary">{activeFarm.location}, {activeFarm.country}</p>
            <p className="text-secondary font-mono text-[11px]">
              Irrigation: {activeFarm.irrigationType} | Soil: {activeFarm.soil.texture}
            </p>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <Button type="submit" variant="primary" size="md">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
