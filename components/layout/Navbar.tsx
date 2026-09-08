'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingCart,
  Menu,
  X,
  Globe,
  User,
  LayoutDashboard,
  Layers,
  Store,
  Compass,
  Building2,
  Package,
  ShieldAlert,
  ChevronDown,
} from 'lucide-react';
import { useNabta } from '@/context/NabtaContext';
import { CURRENCY_RATES } from '@/lib/utils';
import { CurrencyCode, UserRole } from '@/types/nabta';

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, currency, setCurrency, role, setRole, activeFarm } = useNabta();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/farm-intelligence', label: 'Farm Intelligence' },
    { href: '/recommendations', label: 'Crop Recommendation' },
    { href: '/scenarios', label: 'Scenarios' },
    { href: '/marketplace', label: 'Marketplace' },
    { href: '/farms', label: 'My Farms' },
    { href: '/orders', label: 'Orders' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Logo & Nav Links */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-lg bg-[#054F31] flex items-center justify-center p-1.5 shadow-sm group-hover:bg-[#003620] transition-colors">
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
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline font-extrabold text-xl tracking-tight text-[#0b1c30]">
                  NABTA
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#054F31] text-white px-1.5 py-0.2 rounded uppercase tracking-wider">
                  AgriTech
                </span>
              </div>
              <span className="text-[9px] font-mono text-secondary tracking-widest uppercase hidden sm:block">
                Intelligence &amp; Trade
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-primary-container/10 text-primary-container'
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
        <div className="flex items-center gap-2.5">
          {/* Active Farm Micro-Indicator */}
          <Link
            href={`/farms/${activeFarm.id}`}
            className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 text-xs transition-colors"
          >
            <span className="h-2 w-2 rounded-full bg-[#10b981]"></span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono uppercase text-secondary leading-none">
                Active Plot
              </span>
              <span className="font-semibold text-on-surface truncate max-w-[120px]">
                {activeFarm.name}
              </span>
            </div>
          </Link>

          {/* Currency Switcher */}
          <div className="relative">
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
              <div className="absolute right-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCurrencyChange(c)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between hover:bg-slate-50 ${
                      currency === c ? 'text-primary-container font-bold bg-primary/5' : 'text-secondary'
                    }`}
                  >
                    <span>{CURRENCY_RATES[c].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setRoleDropdownOpen(!roleDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-on-surface hover:bg-slate-200 transition-colors"
            >
              <span className="capitalize">{role.toLowerCase()}</span>
              <ChevronDown className="w-3 h-3 text-secondary" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3 py-1 text-[10px] font-mono uppercase text-secondary border-b border-slate-100">
                  Switch Portal Role
                </div>
                <button
                  onClick={() => handleRoleChange('FARMER')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                    role === 'FARMER' ? 'font-bold text-primary-container bg-primary/5' : 'text-on-surface'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-secondary" />
                  <span>Farmer / Operator</span>
                </button>
                <Link
                  href="/supplier"
                  onClick={() => handleRoleChange('SUPPLIER')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                    role === 'SUPPLIER' ? 'font-bold text-primary-container bg-primary/5' : 'text-on-surface'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-secondary" />
                  <span>Supplier Portal</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => handleRoleChange('ADMIN')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                    role === 'ADMIN' ? 'font-bold text-primary-container bg-primary/5' : 'text-on-surface'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-secondary" />
                  <span>Admin Moderation</span>
                </Link>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 rounded-lg text-on-surface hover:bg-slate-100 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 h-4 min-w-4 px-1 rounded-full bg-[#054F31] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Settings / Profile */}
          <Link
            href="/settings"
            className="p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-slate-100 transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-secondary hover:text-on-surface hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold ${
                pathname === link.href
                  ? 'bg-primary-container/10 text-primary-container'
                  : 'text-secondary hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/supplier"
              onClick={() => {
                setRole('SUPPLIER');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-xs font-semibold text-secondary hover:bg-slate-50 rounded-lg flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Supplier Portal &amp; Product Management
            </Link>
            <Link
              href="/seller/new"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-secondary hover:bg-slate-50 rounded-lg flex items-center gap-2"
            >
              <Store className="w-4 h-4" />
              Sell Your Produce (Farmer Direct)
            </Link>
            <Link
              href="/admin"
              onClick={() => {
                setRole('ADMIN');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-xs font-semibold text-secondary hover:bg-slate-50 rounded-lg flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              Admin Moderation Console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
