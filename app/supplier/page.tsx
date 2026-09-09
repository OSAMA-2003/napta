'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  Package,
  Plus,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Truck,
  ShieldCheck,
} from 'lucide-react';

export default function SupplierDashboardPage() {
  const { t, i18n } = useTranslation(['portals', 'common']);
  const isRtl = i18n.language === 'ar';
  const { products, currency } = useNabta();

  // Metrics
  const totalListings = products.length;
  const approvedListings = products.filter((p) => p.moderationStatus === 'APPROVED').length;
  const pendingModeration = products.filter((p) => p.moderationStatus === 'PENDING').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Supplier Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              {t('portals:supplier.badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('portals:supplier.tier')}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('portals:supplier.title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('portals:supplier.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/supplier/products">
            <Button variant="secondary" size="sm" icon={<Package className="w-3.5 h-3.5" />}>
              {t('portals:supplier.catalogManagerBtn')}
            </Button>
          </Link>
          <Link href="/supplier/products/new">
            <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              {t('portals:supplier.publishSkuBtn')}
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {t('portals:supplier.activeCatalogSkus')}
            </span>
            <Package className="w-4 h-4 text-primary" />
          </div>
          <span className="font-mono text-2xl font-bold text-on-surface">{approvedListings}</span>
          <span className="text-[10px] text-secondary block mt-0.5">
            {pendingModeration} {t('portals:supplier.pendingVerification')}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {t('portals:supplier.grossGmv')}
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="font-mono text-2xl font-bold text-primary">
            {formatCurrency(48500, currency)}
          </span>
          <span className="text-[10px] text-[#10b981] font-semibold block mt-0.5">
            {t('portals:supplier.escrowBacked')}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {t('portals:supplier.activeShipments')}
            </span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-mono text-2xl font-bold text-on-surface">6 {t('portals:supplier.batches')}</span>
          <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">
            {t('portals:supplier.zeroDelays')}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-secondary mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {t('portals:supplier.vendorRating')}
            </span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <span className="font-mono text-2xl font-bold text-on-surface">99.2%</span>
          <span className="text-[10px] text-secondary block mt-0.5">
            {t('portals:supplier.certBadges')}
          </span>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-on-surface">
                {t('portals:supplier.catalogInventoryTitle')}
              </h3>
              <p className="text-xs text-secondary mt-0.5">
                {t('portals:supplier.catalogInventoryDesc')}
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Link href="/supplier/products">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                icon={isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                iconPosition={isRtl ? 'left' : 'right'}
              >
                {t('portals:supplier.openCatalogBtn')} ({totalListings})
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#054F31] text-white">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-on-surface">
                {t('portals:supplier.publishNewSkuTitle')}
              </h3>
              <p className="text-xs text-secondary mt-0.5">
                {t('portals:supplier.publishNewSkuDesc')}
              </p>
            </div>
          </div>
          <div className="pt-2">
            <Link href="/supplier/products/new">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                icon={isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                iconPosition={isRtl ? 'left' : 'right'}
              >
                {t('portals:supplier.launchWizardBtn')}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
