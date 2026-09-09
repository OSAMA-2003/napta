'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  Menu,
  X,
  Globe,
  User,
  Store,
  Building2,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';
import { useNabta } from '@/context/NabtaContext';
import { CURRENCY_RATES } from '@/lib/utils';
import { CurrencyCode, UserRole } from '@/types/nabta';

export function Navbar() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation('common');
  const {
    cartCount,
    currency,
    setCurrency,
    role,
    setRole,
    activeFarm,
    setLanguage,
  } = useNabta();

  const currentLang = i18n.language === 'ar' ? 'ar' : 'en';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('nav.overview') },
    { href: '/farm-intelligence', label: t('nav.farmIntelligence') },
    { href: '/recommendations', label: t('nav.cropRecommendation') },
    { href: '/scenarios', label: t('nav.scenarios') },
    { href: '/marketplace', label: t('nav.marketplace') },
    { href: '/farms', label: t('nav.myFarms') },
    { href: '/orders', label: t('nav.orders') },
  ];

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setRoleDropdownOpen(false);
  };

  const handleCurrencyChange = (c: CurrencyCode) => {
    setCurrency(c);
    setCurrencyDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4  md:px-0 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Logo & Nav Links */}
        <div className="flex items-center gap-3 sm:gap-6 xl:gap-5 2xl:gap-8 shrink-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-[#054F31] flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#003620] transition-colors shrink-0">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path
                  d="M16 4C16 4 6 12 6 20C6 25.5 10.5 30 16 30C21.5 30 26 25.5 26 20C26 12 16 4 16 4Z"
                  fill="#10B981"
                  fillOpacity="0.25"
                />
                <path
                  d="M16 6C16 6 8 13.5 8 20C8 24.4 11.6 28 16 28C20.4 28 24 24.4 24 20C24 13.5 16 6 16 6Z"
                  fill="#10B981"
                />
                <path
                  d="M16 9V24M16 16L11 12.5M16 19L21 15.5"
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="25" cy="7" r="3.5" fill="#84CC16" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#054F31] group-hover:text-[#003620] transition-colors">
                NABTA
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#006A44]">
                AgriTech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5 flex-nowrap shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2.5 2xl:px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all whitespace-nowrap shrink-0 ${isActive
                    ? 'bg-primary-container/10 text-primary-container font-bold'
                    : 'text-secondary hover:text-on-surface hover:bg-slate-100/60'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Switcher Segmented Control */}
          <div className="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold shrink-0">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-all text-xs ${currentLang === 'en'
                ? 'bg-white text-on-surface shadow-xs font-bold'
                : 'text-secondary hover:text-on-surface'
                }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2 sm:px-2.5 py-1 rounded-md transition-all text-xs font-arabic ${currentLang === 'ar'
                ? 'bg-white text-on-surface shadow-xs font-bold text-[#054f31]'
                : 'text-secondary hover:text-on-surface'
                }`}
              title="العربية"
            >
              العربية
            </button>
          </div>

          {/* Active Farm Micro-Indicator (visible on 2xl+) */}
          {activeFarm && (
            <Link
              href={`/farms/${activeFarm.id}`}
              className="hidden 2xl:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs transition-colors shrink-0"
            >
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              <div className="flex flex-col text-start">
                <span className="text-[10px] font-mono uppercase text-secondary leading-none">
                  {t('nav.activePlot')}
                </span>
                <span className="font-semibold text-on-surface truncate max-w-[110px]">
                  {activeFarm.name}
                </span>
              </div>
            </Link>
          )}

          {/* Currency Switcher (hidden on phones < 640px) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setRoleDropdownOpen(false);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-medium text-secondary hover:text-on-surface hover:bg-slate-100 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-secondary" />
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-secondary" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute end-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCurrencyChange(c)}
                    className={`w-full text-start px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-slate-50 ${currency === c ? 'text-primary-container font-bold bg-primary/5' : 'text-secondary'
                      }`}
                  >
                    <span>{CURRENCY_RATES[c].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher (visible on 2xl+) */}
          <div className="relative hidden 2xl:block">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-on-surface hover:bg-slate-200 transition-colors"
            >
              <span>
                {role === 'FARMER'
                  ? t('roles.farmer')
                  : role === 'SUPPLIER'
                    ? t('roles.supplier')
                    : t('roles.admin')}
              </span>
              <ChevronDown className="w-3 h-3 text-secondary" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute end-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-mono uppercase text-secondary border-b border-slate-100">
                  {t('nav.switchRole')}
                </div>
                <button
                  onClick={() => handleRoleChange('FARMER')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${role === 'FARMER' ? 'font-bold text-primary-container bg-primary/5' : 'text-on-surface'
                    }`}
                >
                  <User className="w-3.5 h-3.5 text-secondary" />
                  <span>{t('roles.farmer')}</span>
                </button>
                <Link
                  href="/supplier"
                  onClick={() => handleRoleChange('SUPPLIER')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${role === 'SUPPLIER' ? 'font-bold text-primary-container bg-primary/5' : 'text-on-surface'
                    }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-secondary" />
                  <span>{t('roles.supplier')}</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => handleRoleChange('ADMIN')}
                  className={`w-full text-start px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${role === 'ADMIN' ? 'font-bold text-primary-container bg-primary/5' : 'text-on-surface'
                    }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-secondary" />
                  <span>{t('roles.admin')}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 rounded-lg text-on-surface hover:bg-slate-100 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 end-1 h-4 min-w-[16px] px-1 rounded-full bg-[#054F31] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Settings / Profile */}
          <Link
            href="/settings"
            className="hidden sm:flex p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-slate-100 transition-colors"
            aria-label="Settings"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Toggle (visible < xl) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full xl:hidden border-t border-b border-slate-200 bg-white px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl z-50">
          {/* Active Plot Status Card on Mobile */}
          {activeFarm && (
            <Link
              href={`/farms/${activeFarm.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981] shrink-0 animate-pulse" />
                <div className="text-start">
                  <span className="text-[10px] font-mono uppercase text-secondary block leading-none">
                    {t('nav.activePlot')}
                  </span>
                  <span className="font-semibold text-on-surface text-sm">
                    {activeFarm.name}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-secondary px-2 py-0.5 rounded bg-white border border-slate-200">
                {activeFarm.areaHectares} {t('common:units.ha')}
              </span>
            </Link>
          )}

          {/* Primary Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${pathname === link.href
                  ? 'bg-[#054F31]/10 text-[#054F31] font-bold'
                  : 'text-secondary hover:bg-slate-50 hover:text-on-surface'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Currency Selector */}
          <div className="pt-3 border-t border-slate-100 sm:hidden">
            <span className="text-[10px] font-mono uppercase text-secondary block mb-1.5 text-start">
              Currency / العملة
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => handleCurrencyChange(c)}
                  className={`py-1.5 text-xs font-mono rounded-lg border text-center font-semibold transition-all ${currency === c
                    ? 'bg-[#054F31] text-white border-[#054F31] shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-secondary hover:bg-slate-100'
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Role Switching & Portals inside mobile drawer */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-secondary block mb-1 text-start">
              {t('nav.switchRole')}
            </span>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              <button
                onClick={() => {
                  handleRoleChange('FARMER');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs rounded-lg border text-center font-semibold transition-all ${role === 'FARMER'
                  ? 'bg-[#054F31] text-white border-[#054F31]'
                  : 'bg-slate-50 border-slate-200 text-secondary'
                  }`}
              >
                {t('roles.farmer')}
              </button>
              <Link
                href="/supplier"
                onClick={() => {
                  handleRoleChange('SUPPLIER');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs rounded-lg border text-center font-semibold transition-all flex items-center justify-center ${role === 'SUPPLIER'
                  ? 'bg-[#054F31] text-white border-[#054F31]'
                  : 'bg-slate-50 border-slate-200 text-secondary'
                  }`}
              >
                {t('roles.supplier')}
              </Link>
              <Link
                href="/admin"
                onClick={() => {
                  handleRoleChange('ADMIN');
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-xs rounded-lg border text-center font-semibold transition-all flex items-center justify-center ${role === 'ADMIN'
                  ? 'bg-[#054F31] text-white border-[#054F31]'
                  : 'bg-slate-50 border-slate-200 text-secondary'
                  }`}
              >
                {t('roles.admin')}
              </Link>
            </div>

            <Link
              href="/seller/new"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-secondary hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4 text-emerald-600" />
                {t('nav.sellProduce')}
              </span>
            </Link>
            <Link
              href="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-secondary hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-secondary" />
                Settings & API
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}