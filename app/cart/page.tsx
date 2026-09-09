'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const { t, i18n } = useTranslation(['orders', 'common']);
  const isRtl = i18n.language === 'ar';
  const { cart, removeFromCart, updateCartQuantity, cartSubtotalUSD, cartShippingUSD, cartTotalUSD, currency } = useNabta();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-secondary">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="font-headline font-bold text-2xl text-on-surface">
          {t('orders:cart.emptyTitle')}
        </h2>
        <p className="text-xs text-secondary max-w-sm mx-auto">
          {t('orders:cart.emptyDesc')}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/recommendations/products">
            <Button variant="primary" size="sm">
              {t('orders:cart.viewRecommendedBtn')}
            </Button>
          </Link>
          <Link href="/marketplace">
            <Button variant="secondary" size="sm">
              {t('orders:cart.browseMarketplaceBtn')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            {t('orders:cart.title')}
          </h1>
          <p className="text-xs text-secondary mt-1">
            {t('orders:cart.subtitle')}
          </p>
        </div>
        <Link href="/marketplace">
          <Button
            variant="secondary"
            size="sm"
            icon={isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            iconPosition={isRtl ? 'right' : 'left'}
          >
            {t('orders:cart.continueSourcingBtn')}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="border border-slate-200 rounded-2xl bg-white shadow-sm divide-y divide-slate-100 overflow-hidden">
            {cart.map((item) => (
              <div key={item.product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Thumb and Info */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-xl object-cover border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div>
                    <Link
                      href={`/marketplace/${item.product.id}`}
                      className="font-headline font-semibold text-sm text-on-surface hover:text-primary transition-colors block"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-xs text-secondary font-mono block mt-0.5">
                      {t('orders:cart.supplierLabel')}: <strong>{item.product.supplierName}</strong> ({item.product.countryOfOrigin})
                    </span>
                    <span className="text-xs font-mono text-primary font-semibold block mt-1">
                      {formatCurrency(item.product.priceUSD, currency)} / {item.product.unit}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-xs text-secondary hover:bg-slate-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-mono text-xs font-bold text-on-surface">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-xs text-secondary hover:bg-slate-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-end min-w-[100px]">
                    <span className="font-headline font-bold text-sm text-on-surface block">
                      {formatCurrency(item.product.priceUSD * item.quantity, currency)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-secondary hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title={t('orders:cart.removeBtn')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-secondary">
            <Truck className="w-4 h-4 text-primary shrink-0" />
            <span>
              {t('orders:cart.logisticsNotice')}
            </span>
          </div>
        </div>

        {/* Right: Summary Box (4 cols) */}
        <div className="lg:col-span-4">
          <Card className="sticky top-28 p-6 space-y-5">
            <h3 className="font-headline font-bold text-base text-on-surface pb-3 border-b border-slate-100">
              {t('orders:cart.orderSummaryTitle')}
            </h3>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-secondary">
                <span>{t('orders:cart.subtotal')}:</span>
                <span className="font-bold text-on-surface">{formatCurrency(cartSubtotalUSD, currency)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>{t('orders:cart.shipping')}:</span>
                <span className="font-bold text-on-surface">{formatCurrency(cartShippingUSD, currency)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>{t('orders:cart.customsTariffs')}:</span>
                <span className="text-emerald-700 font-semibold">{t('orders:cart.included')}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-sm font-headline">
                <span className="font-bold text-on-surface">{t('orders:cart.total')}:</span>
                <span className="font-extrabold text-primary text-base">
                  {formatCurrency(cartTotalUSD, currency)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                {t('orders:cart.escrowNoticeCart')}
              </span>
            </div>

            <Link href="/checkout" className="block">
              <Button
                size="lg"
                variant="primary"
                className="w-full"
                icon={isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                iconPosition={isRtl ? 'left' : 'right'}
              >
                {t('orders:cart.proceedToCheckoutBtn')}
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
