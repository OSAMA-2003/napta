'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Package, ArrowRight, ArrowLeft, Clock } from 'lucide-react';

export default function MyOrdersPage() {
  const { t, i18n } = useTranslation(['orders', 'common']);
  const isRtl = i18n.language === 'ar';
  const { orders, currency } = useNabta();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="sm" dot>
              {t('orders:myOrders.badge')}
            </Badge>
            <span className="text-xs font-mono text-secondary">
              {t('orders:myOrders.activeShipments')}: {orders.filter((o) => o.status !== 'Delivered').length}
            </span>
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('orders:myOrders.title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('orders:myOrders.subtitle')}
          </p>
        </div>

        <Link href="/marketplace">
          <Button variant="primary" size="sm">
            {t('orders:myOrders.browseCatalogBtn')}
          </Button>
        </Link>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="p-6 space-y-4 hover:border-slate-300 transition-all">
            {/* Top Row: ID, Date, Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-secondary">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-headline font-bold text-sm text-on-surface">
                    {t('orders:myOrders.order')} {order.id}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-secondary font-mono">
                    <span>{t('orders:myOrders.date')}: {order.date}</span>
                    <span>•</span>
                    <span>{t('orders:myOrders.tracking')}: <strong className="text-primary">{order.trackingNumber}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    order.status === 'Delivered'
                      ? 'mint'
                      : order.status === 'In Transit'
                      ? 'emerald'
                      : 'amber'
                  }
                  size="md"
                  dot
                >
                  {order.status}
                </Badge>
                <span className="font-headline font-bold text-base text-on-surface">
                  {formatCurrency(order.totalUSD, currency)}
                </span>
              </div>
            </div>

            {/* Middle: Items Summary & Delivery Coordinates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-headline font-semibold text-secondary uppercase text-[10px] block mb-1">
                  {t('orders:myOrders.orderedInputs')} ({order.items.length} SKUs)
                </span>
                <ul className="space-y-1 font-body">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between font-mono text-[11px]">
                      <span className="truncate max-w-[220px]">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="text-secondary">{item.product.supplierName}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="font-body text-secondary border-t md:border-t-0 md:border-s border-slate-100 md:ps-4 pt-2 md:pt-0">
                <span className="font-headline font-semibold text-secondary uppercase text-[10px] block mb-1">
                  {t('orders:myOrders.consigneeDestination')}
                </span>
                <p className="font-semibold text-on-surface">{order.customerName}</p>
                <p className="text-[11px]">{order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                <p className="text-[11px]">{order.deliveryAddress.country} ({order.deliveryAddress.postalCode})</p>
                <div className="flex items-center gap-1.5 text-primary text-[11px] mt-1 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t('orders:myOrders.estArrival')}: {order.estimatedDeliveryDate}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: View Confirmation / Receipt */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <Link href={`/order-confirmation/${order.id}`}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition={isRtl ? 'left' : 'right'}
                >
                  {t('orders:myOrders.viewReceiptBtn')}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
