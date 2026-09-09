'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Tabs } from '@/ui/Tabs';
import {
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { t, i18n } = useTranslation(['portals', 'common', 'marketplace']);
  const isRtl = i18n.language === 'ar';
  const { products, farms, scenarios, orders, updateProductModeration, currency } = useNabta();
  const [adminTab, setAdminTab] = useState<'moderation' | 'suppliers' | 'farms'>('moderation');

  const pendingProducts = products.filter((p) => p.moderationStatus === 'PENDING');
  const allProducts = products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="crimson" size="sm" dot>
              {t('portals:admin.badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('portals:admin.security')}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('portals:admin.title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('portals:admin.subtitle')}
          </p>
        </div>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 text-xs font-mono">
        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-secondary text-[10px] uppercase block">
            {t('portals:admin.registeredFarms')}
          </span>
          <span className="font-bold text-lg text-on-surface">{farms.length}</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-secondary text-[10px] uppercase block">
            {t('portals:admin.activeScenarios')}
          </span>
          <span className="font-bold text-lg text-on-surface">{scenarios.length}</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-secondary text-[10px] uppercase block">
            {t('portals:admin.totalProducts')}
          </span>
          <span className="font-bold text-lg text-on-surface">{products.length}</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-secondary text-[10px] uppercase block">
            {t('portals:admin.pendingReview')}
          </span>
          <span className="font-bold text-lg text-amber-600">{pendingProducts.length}</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-secondary text-[10px] uppercase block">
            {t('portals:admin.totalOrders')}
          </span>
          <span className="font-bold text-lg text-on-surface">{orders.length}</span>
        </div>

        <div className="p-3 rounded-xl bg-white border border-slate-200">
          <span className="text-secondary text-[10px] uppercase block">
            {t('portals:admin.monitoredArea')}
          </span>
          <span className="font-bold text-lg text-primary">
            {farms.reduce((acc, f) => acc + f.areaHectares, 0)} {t('common:units.ha')}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={adminTab}
        onChange={(id: string) => setAdminTab(id as 'moderation' | 'suppliers' | 'farms')}
        tabs={[
          { id: 'moderation', label: t('portals:admin.tabModeration'), count: pendingProducts.length },
          { id: 'suppliers', label: t('portals:admin.tabSuppliers'), count: 6 },
          { id: 'farms', label: t('portals:admin.tabFarms'), count: farms.length },
        ]}
      />

      {/* Tab Content 1: Product Moderation */}
      {adminTab === 'moderation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-base text-on-surface">
              {t('portals:admin.pendingTitle')}
            </h3>
            <span className="text-xs font-mono text-secondary">
              {t('portals:admin.pendingSubtitle')}
            </span>
          </div>

          {pendingProducts.length === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#10b981] mx-auto" />
              <h4 className="font-headline font-semibold text-sm text-on-surface">
                {t('portals:admin.queueClear')}
              </h4>
              <p className="text-xs text-secondary">
                {t('portals:admin.queueClearDesc')}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingProducts.map((p) => (
                <Card key={p.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-50"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="amber" size="sm" dot>
                          {t('portals:admin.pendingReview')}
                        </Badge>
                        <span className="text-[11px] font-mono text-secondary uppercase">
                          {p.category}
                        </span>
                      </div>
                      <h4 className="font-headline font-bold text-sm text-on-surface">{p.name}</h4>
                      <p className="text-xs text-secondary font-mono">
                        {t('orders:cart.supplierLabel')}: <strong>{p.supplierName}</strong> ({p.countryOfOrigin}) | {t('orders:confirmation.price')}: {formatCurrency(p.priceUSD, currency)} / {p.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => updateProductModeration(p.id, 'APPROVED')}
                      icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    >
                      {t('portals:admin.approvePublish')}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => updateProductModeration(p.id, 'REJECTED')}
                      icon={<XCircle className="w-3.5 h-3.5" />}
                    >
                      {t('portals:admin.reject')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* All Catalog Table for Reference */}
          <div className="pt-6">
            <h4 className="font-headline font-bold text-sm text-on-surface mb-3">
              {t('portals:admin.allSubmissions')} ({allProducts.length})
            </h4>
            <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden text-xs">
              <table className="w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 font-mono text-[10px] text-secondary uppercase">
                  <tr>
                    <th className="py-3 px-4 text-start">{t('portals:admin.colSku')}</th>
                    <th className="py-3 px-4 text-start">{t('portals:admin.colSupplier')}</th>
                    <th className="py-3 px-4 text-start">{t('portals:admin.colCategory')}</th>
                    <th className="py-3 px-4 text-center">{t('portals:admin.colStatus')}</th>
                    <th className="py-3 px-4 text-end">{t('portals:admin.colActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {allProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-sans font-semibold text-on-surface">
                        {p.name}
                      </td>
                      <td className="py-3 px-4 text-secondary">{p.supplierName}</td>
                      <td className="py-3 px-4 uppercase text-[10px] text-secondary">{p.category}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge
                          variant={
                            p.moderationStatus === 'APPROVED'
                              ? 'mint'
                              : p.moderationStatus === 'PENDING'
                              ? 'amber'
                              : 'crimson'
                          }
                          size="sm"
                          dot
                        >
                          {p.moderationStatus}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-end">
                        {p.moderationStatus === 'APPROVED' ? (
                          <button
                            onClick={() => updateProductModeration(p.id, 'REJECTED')}
                            className="text-xs text-rose-600 hover:underline"
                          >
                            {t('portals:admin.revokeApproval')}
                          </button>
                        ) : (
                          <button
                            onClick={() => updateProductModeration(p.id, 'APPROVED')}
                            className="text-xs text-emerald-600 hover:underline font-semibold"
                          >
                            {t('portals:admin.approveBtn')}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: Registered Suppliers */}
      {adminTab === 'suppliers' && (
        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden text-xs">
          <table className="w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 font-mono text-[10px] text-secondary uppercase">
              <tr>
                <th className="py-3 px-4 text-start">{t('portals:admin.colSupplierEntity')}</th>
                <th className="py-3 px-4 text-start">{t('portals:admin.colCountry')}</th>
                <th className="py-3 px-4 text-start">{t('portals:admin.colCerts')}</th>
                <th className="py-3 px-4 text-center">{t('portals:admin.colStatus')}</th>
                <th className="py-3 px-4 text-end">{t('portals:admin.colSettlementRating')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans font-semibold text-on-surface">AgroBio International</td>
                <td className="py-3 px-4">Netherlands</td>
                <td className="py-3 px-4 text-secondary">ISTA, GLOBALG.A.P.</td>
                <td className="py-3 px-4 text-center">
                  <Badge variant="mint" size="sm" dot>{t('portals:admin.verified')}</Badge>
                </td>
                <td className="py-3 px-4 text-end font-bold text-primary">99.4%</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans font-semibold text-on-surface">EuroAgro Chemical Corp</td>
                <td className="py-3 px-4">Belgium</td>
                <td className="py-3 px-4 text-secondary">REACH, ISO 14001</td>
                <td className="py-3 px-4 text-center">
                  <Badge variant="mint" size="sm" dot>{t('portals:admin.verified')}</Badge>
                </td>
                <td className="py-3 px-4 text-end font-bold text-primary">98.8%</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans font-semibold text-on-surface">Netafim Ltd.</td>
                <td className="py-3 px-4">Egypt / Israel</td>
                <td className="py-3 px-4 text-secondary">ISO 9261</td>
                <td className="py-3 px-4 text-center">
                  <Badge variant="mint" size="sm" dot>{t('portals:admin.verified')}</Badge>
                </td>
                <td className="py-3 px-4 text-end font-bold text-primary">99.8%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Tab Content 3: Monitored Farms Audit */}
      {adminTab === 'farms' && (
        <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden text-xs">
          <table className="w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 font-mono text-[10px] text-secondary uppercase">
              <tr>
                <th className="py-3 px-4 text-start">{t('portals:admin.colSectorFarm')}</th>
                <th className="py-3 px-4 text-start">{t('portals:admin.colLocation')}</th>
                <th className="py-3 px-4 text-center">{t('portals:admin.colHectares')}</th>
                <th className="py-3 px-4 text-center">{t('portals:admin.colCanopyNdvi')}</th>
                <th className="py-3 px-4 text-end">{t('portals:admin.colAuditStatus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {farms.map((farm) => (
                <tr key={farm.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-sans font-semibold text-on-surface">{farm.name}</td>
                  <td className="py-3 px-4 text-secondary">{farm.location}</td>
                  <td className="py-3 px-4 text-center font-bold">{farm.areaHectares} {t('common:units.ha')}</td>
                  <td className="py-3 px-4 text-center font-bold text-primary">{farm.ndviAverage}</td>
                  <td className="py-3 px-4 text-end">
                    <Badge variant="mint" size="sm" dot>{t('portals:admin.compliant')}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
