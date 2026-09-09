'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Tabs } from '@/ui/Tabs';
import { Plus, ArrowLeft, ArrowRight, Trash2, Eye } from 'lucide-react';

export default function SupplierProductsManagementPage() {
  const { t, i18n } = useTranslation(['portals', 'common']);
  const isRtl = i18n.language === 'ar';
  const { products, deleteProduct, currency } = useNabta();
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'pending'>('all');

  const filtered = products.filter((p) => {
    if (activeTab === 'published') return p.moderationStatus === 'APPROVED';
    if (activeTab === 'pending') return p.moderationStatus === 'PENDING';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div>
        <Link
          href="/supplier"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface mb-3 transition-colors"
        >
          {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{t('portals:supplier.backToDashboard')}</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
              {t('portals:supplier.catalogTitle')}
            </h1>
            <p className="text-xs text-secondary mt-1">
              {t('portals:supplier.catalogSubtitle')}
            </p>
          </div>

          <Link href="/supplier/products/new">
            <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              {t('portals:supplier.addNewProduct')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={(id: string) => setActiveTab(id as 'all' | 'published' | 'pending')}
        tabs={[
          { id: 'all', label: t('portals:supplier.tabAll'), count: products.length },
          { id: 'published', label: t('portals:supplier.tabPublished'), count: products.filter((p) => p.moderationStatus === 'APPROVED').length },
          { id: 'pending', label: t('portals:supplier.tabPending'), count: products.filter((p) => p.moderationStatus === 'PENDING').length },
        ]}
      />

      {/* Table */}
      <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden text-xs">
        <table className="w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 font-mono text-[10px] text-secondary uppercase">
            <tr>
              <th className="py-3 px-4 text-start">{t('portals:supplier.colProduct')}</th>
              <th className="py-3 px-4 text-start">{t('portals:supplier.colCategory')}</th>
              <th className="py-3 px-4 text-start">{t('portals:supplier.colOrigin')}</th>
              <th className="py-3 px-4 text-center">{t('portals:supplier.colStock')}</th>
              <th className="py-3 px-4 text-end">{t('portals:supplier.colPrice')}</th>
              <th className="py-3 px-4 text-center">{t('portals:supplier.colStatus')}</th>
              <th className="py-3 px-4 text-end">{t('portals:supplier.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 bg-slate-50 shrink-0"
                    />
                    <div>
                      <span className="font-sans font-semibold text-on-surface line-clamp-1">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-secondary">{product.manufacturer}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-secondary uppercase text-[10px]">
                  {product.category}
                </td>
                <td className="py-3 px-4 text-on-surface font-sans">
                  {product.countryOfOrigin}
                </td>
                <td className="py-3 px-4 text-center font-bold">
                  {product.stockQuantity} {product.unit}
                </td>
                <td className="py-3 px-4 text-end font-bold text-on-surface">
                  {formatCurrency(product.priceUSD, currency)}
                </td>
                <td className="py-3 px-4 text-center">
                  <Badge
                    variant={
                      product.moderationStatus === 'APPROVED'
                        ? 'mint'
                        : product.moderationStatus === 'PENDING'
                        ? 'amber'
                        : 'crimson'
                    }
                    size="sm"
                    dot
                  >
                    {product.moderationStatus}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-end">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/marketplace/${product.id}`}>
                      <button className="p-1.5 rounded hover:bg-slate-100 text-secondary hover:text-on-surface" title={t('portals:supplier.viewInCatalog')}>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1.5 rounded hover:bg-rose-50 text-secondary hover:text-rose-600"
                      title={t('portals:supplier.deleteProduct')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
