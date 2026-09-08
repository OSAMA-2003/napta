'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  ArrowRight,
  Printer,
  Calendar,
  MapPin,
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { orders, currency } = useNabta();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-headline font-bold text-xl text-on-surface">Order Record Not Found</h2>
        <Link href="/marketplace">
          <Button variant="primary" size="sm">Return to Marketplace</Button>
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
          Escrow Deposited &amp; Confirmed
        </Badge>
        <h1 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight">
          Procurement Order Successfully Placed
        </h1>
        <p className="text-xs text-secondary max-w-lg mx-auto font-mono">
          Order Reference: <strong className="text-on-surface">{order.id}</strong> | Tracking ID:{' '}
          <strong className="text-primary">{order.trackingNumber}</strong>
        </p>
      </div>

      {/* Main Order Document */}
      <Card className="p-6 space-y-6">
        {/* Logistics Milestones Bar */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-on-surface">Logistics Status: {order.status}</span>
            <span className="text-secondary">Estimated Arrival: {order.estimatedDeliveryDate}</span>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded bg-[#054f31] text-white font-bold">
              1. Escrow Funded
            </div>
            <div className="p-2 rounded bg-primary/20 text-primary-container font-semibold">
              2. Phytosanitary Insp.
            </div>
            <div className="p-2 rounded bg-slate-100 text-slate-500">
              3. Port Customs
            </div>
            <div className="p-2 rounded bg-slate-100 text-slate-500">
              4. Farm Gate Delivery
            </div>
          </div>
        </div>

        {/* Delivery & Supplier Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-body pt-2 border-t border-slate-100">
          <div>
            <span className="font-headline font-bold text-on-surface uppercase text-[11px] block mb-1">
              Consignee &amp; Farm Delivery Coordinates
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
              Payment Protocol &amp; Guarantee
            </span>
            <p className="font-semibold text-on-surface">{order.paymentMethod}</p>
            <p className="text-secondary mt-1">
              Backed by ISO 22000 Trade Verification. Inspection seal registered under Copernicus logistics telemetry.
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <span className="font-headline font-bold text-on-surface uppercase text-[11px] block">
            Itemized Agricultural Manifest
          </span>

          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 font-mono text-[10px] text-secondary uppercase">
                <tr>
                  <th className="py-2.5 px-4 text-left">SKU Description</th>
                  <th className="py-2.5 px-4 text-left">Supplier</th>
                  <th className="py-2.5 px-4 text-center">Qty</th>
                  <th className="py-2.5 px-4 text-right">Price</th>
                  <th className="py-2.5 px-4 text-right">Amount</th>
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
                    <td className="py-3 px-4 text-right">
                      {formatCurrency(item.product.priceUSD, currency)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-on-surface">
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
              <span>Items Total:</span>
              <span>{formatCurrency(order.subtotalUSD, currency)}</span>
            </div>
            <div className="flex justify-between text-secondary">
              <span>Freight Logistics:</span>
              <span>{formatCurrency(order.shippingUSD, currency)}</span>
            </div>
            <div className="flex justify-between text-base font-headline font-bold text-on-surface pt-2 border-t border-slate-200">
              <span>Settled Total:</span>
              <span className="text-primary">{formatCurrency(order.totalUSD, currency)}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/orders" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
              Track Order in Portal
            </Button>
          </Link>

          <Link href="/marketplace" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full">
              Continue Sourcing
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
