'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { t, i18n } = useTranslation(['orders', 'common']);
  const isRtl = i18n.language === 'ar';
  const { orders, currency } = useNabta();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-headline font-bold text-xl text-on-surface">
          {t('orders:confirmation.notFound')}
        </h2>
        <Link href="/marketplace">
          <Button variant="primary" size="sm">
            {t('orders:checkout.returnBtn')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Hero Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border-2 border-[#10b981] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-[#054f31]" />
        </div>
        <Badge variant="mint" size="md">
          {t('orders:confirmation.badge')}
        </Badge>
        <h1 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight">
          {t('orders:confirmation.title')}
        </h1>
        <p className="text-xs text-secondary max-w-lg mx-auto font-mono">
          {t('orders:confirmation.orderRef')}: <strong className="text-on-surface">{order.id}</strong> | {t('orders:confirmation.trackingId')}:{' '}
          <strong className="text-primary">{order.trackingNumber}</strong>
        </p>
      </div>

      {/* Main Order Document */}
      <Card className="p-6 space-y-6">
        {/* Logistics Milestones Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-on-surface">
              {t('orders:confirmation.logisticsStatus')}: {order.status}
            </span>
            <span className="text-secondary">
              {t('orders:confirmation.estimatedArrival')}: {order.estimatedDeliveryDate}
            </span>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded bg-[#054f31] text-white font-bold">
              {t('orders:confirmation.step1')}
            </div>
            <div className="p-2 rounded bg-primary/20 text-primary-container font-semibold">
              {t('orders:confirmation.step2')}
            </div>
            <div className="p-2 rounded bg-slate-100 text-slate-500">
              {t('orders:confirmation.step3')}
            </div>
            <div className="p-2 rounded bg-slate-100 text-slate-500">
              {t('orders:confirmation.step4')}
            </div>
          </div>
        </div>

        {/* Delivery & Supplier Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-body pt-2 border-t border-slate-100">
          <div>
            <span className="font-headline font-bold text-on-surface uppercase text-[11px] block mb-1">
              {t('orders:confirmation.consigneeTitle')}
            </span>
            <p className="font-semibold text-on-surface">{order.customerName}</p>
            <p className="text-secondary">{order.deliveryAddress.street}</p>
            <p className="text-secondary">
              {order.deliveryAddress.city}, {order.deliveryAddress.region}
            </p>
            <p className="text-secondary">
              {order.deliveryAddress.country} ({order.deliveryAddress.postalCode})
            </p>
          </div>

          <div>
            <span className="font-headline font-bold text-on-surface uppercase text-[11px] block mb-1">
              {t('orders:confirmation.paymentGuaranteeTitle')}
            </span>
            <p className="font-semibold text-on-surface">{order.paymentMethod}</p>
            <p className="text-secondary mt-1">
              {t('orders:confirmation.paymentGuaranteeDesc')}
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <span className="font-headline font-bold text-on-surface uppercase text-[11px] block">
            {t('orders:confirmation.manifestTitle')}
          </span>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 font-mono text-[10px] text-secondary uppercase">
                <tr>
                  <th className="py-2.5 px-4 text-start">{t('orders:confirmation.skuDesc')}</th>
                  <th className="py-2.5 px-4 text-start">{t('orders:confirmation.supplier')}</th>
                  <th className="py-2.5 px-4 text-center">{t('orders:cart.qty')}</th>
                  <th className="py-2.5 px-4 text-end">{t('orders:confirmation.price')}</th>
                  <th className="py-2.5 px-4 text-end">{t('orders:confirmation.amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-sans font-semibold text-on-surface">
                      {item.product.name}
                    </td>
                    <td className="py-3 px-4 text-secondary">
                      {item.product.supplierName} ({item.product.countryOfOrigin})
                    </td>
                    <td className="py-3 px-4 text-center font-bold">{item.quantity}</td>
                    <td className="py-3 px-4 text-end">
                      {formatCurrency(item.product.priceUSD, currency)}
                    </td>
                    <td className="py-3 px-4 text-end font-bold text-on-surface">
                      {formatCurrency(item.product.priceUSD * item.quantity, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total calculation */}
        <div className="flex justify-end pt-2 text-xs font-mono">
          <div className="w-64 space-y-1.5">
            <div className="flex justify-between text-secondary">
              <span>{t('orders:confirmation.itemsTotal')}:</span>
              <span>{formatCurrency(order.subtotalUSD, currency)}</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>{t('orders:confirmation.freightLogistics')}:</span>
              <span>{formatCurrency(order.shippingUSD, currency)}</span>
            </div>
            <div className="flex justify-between text-base font-headline font-bold text-on-surface pt-2 border-t border-slate-200">
              <span>{t('orders:confirmation.settledTotal')}:</span>
              <span className="text-primary">{formatCurrency(order.totalUSD, currency)}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/orders" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              icon={isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              iconPosition={isRtl ? 'left' : 'right'}
            >
              {t('orders:confirmation.trackOrderBtn')}
            </Button>
          </Link>

          <Link href="/marketplace" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full">
              {t('orders:cart.continueSourcingBtn')}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
