'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { CURRENCY_RATES } from '@/lib/utils';
import { CurrencyCode, UserRole } from '@/types/nabta';
import { Card } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  User,
  Globe,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export default function SettingsPage() {
  const { t, i18n } = useTranslation(['portals', 'common']);
  const { currency, setCurrency, role, setRole, activeFarm, language, setLanguage } = useNabta();

  const [savedNotice, setSavedNotice] = useState(false);
  const [userName, setUserName] = useState('Eng. Osama Farouk');
  const [userEmail, setUserEmail] = useState('osama.farouk@agri-vanguard.com');
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
              {t('portals:settings.badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('portals:settings.account')}: {userName}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('portals:settings.title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('portals:settings.subtitle')}
          </p>
        </div>

        {savedNotice && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{t('portals:settings.savedNotice')}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: User Profile */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <User className="w-4 h-4 text-primary" />
            <h3 className="font-headline font-bold text-base text-on-surface">
              {t('portals:settings.section1Title')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                {t('portals:settings.fullNameLabel')}
              </label>
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">
                {t('portals:settings.emailLabel')}
              </label>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">
                {t('portals:settings.phoneLabel')}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">
                {t('portals:settings.activePortalMode')}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary font-semibold"
              >
                <option value="FARMER">{t('common:roles.farmer')}</option>
                <option value="SUPPLIER">{t('common:roles.supplier')}</option>
                <option value="ADMIN">{t('common:roles.admin')}</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Section 2: Global Currencies & Localization */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-headline font-bold text-base text-on-surface">
              {t('portals:settings.section2Title')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">
                {t('portals:settings.preferredCurrency')}
              </label>
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
                {t('portals:settings.currencyHint')}
              </span>
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">
                {t('portals:settings.interfaceLanguage')}
              </label>
              <select
                value={language}
                onChange={(e) => {
                  const newLang = e.target.value as 'en' | 'ar';
                  setLanguage(newLang);
                  i18n.changeLanguage(newLang);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary font-medium"
              >
                <option value="en">English (International AgriTech)</option>
                <option value="ar">العربية (Arabic - Regional Agricultural)</option>
              </select>
              <span className="text-[10px] text-secondary mt-1 block">
                {t('portals:settings.languageHint')}
              </span>
            </div>
          </div>
        </Card>

        {/* Section 3: Farm Overview Snapshot */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-primary" />
            <h3 className="font-headline font-bold text-base text-on-surface">
              {t('portals:settings.section3Title')}
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <span className="font-headline font-bold text-on-surface block">
              {activeFarm.name} ({activeFarm.areaHectares} {t('common:units.ha')})
            </span>
            <p className="text-secondary">{activeFarm.location}, {activeFarm.country}</p>
            <p className="text-secondary font-mono text-[11px]">
              {t('portals:settings.irrigation')}: {activeFarm.irrigationType} | {t('portals:settings.soil')}: {activeFarm.soil.texture}
            </p>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex items-center justify-end">
          <Button type="submit" variant="primary" size="md">
            {t('portals:settings.saveBtn')}
          </Button>
        </div>
      </form>
    </div>
  );
}
