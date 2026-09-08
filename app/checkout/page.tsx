'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNabta } from '@/context/NabtaContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { ShieldCheck, CreditCard, Landmark, FileText, ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotalUSD, cartShippingUSD, cartTotalUSD, currency, createOrder, activeFarm } = useNabta();

  // Form State
  const [customerName, setCustomerName] = useState('Eng. Osama Farouk');
  const [customerEmail, setCustomerEmail] = useState('osama.farouk@agri-vanguard.com');
  const [street, setStreet] = useState('Wadi El Natrun Agro-Zone 4, KM 108');
  const [city, setCity] = useState('Sadat City District');
  const [region, setRegion] = useState('Beheira Governorate');
  const [country, setCountry] = useState(activeFarm.country);
  const [postalCode, setPostalCode] = useState('32958');
  const [paymentMethod, setPaymentMethod] = useState('NABTA Verified Escrow');
  const [placingOrder, setPlacingOrder] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-headline font-bold text-xl text-on-surface">No Items to Checkout</h2>
        <p className="text-xs text-secondary">Your procurement cart is currently empty.</p>
        <Link href="/marketplace">
          <Button variant="primary" size="sm">Return to Marketplace</Button>
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacingOrder(true);

    const order = createOrder({
      customerName,
      customerEmail,
      deliveryAddress: {
        street,
        city,
        region,
        country,
        postalCode,
      },
      paymentMethod,
    });

    setTimeout(() => {
      router.push(`/order-confirmation/${order.id}`);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Link */}
      <Link
        href="/cart"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Procurement Cart</span>
      </Link>

      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Checkout &amp; Customs Dispatch Agreement
          </h1>
          <p className="text-xs text-secondary mt-1">
            Complete institutional delivery coordinates and select trade settlement protocol.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Delivery & Payment (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Contact Information */}
          <Card className="p-6 space-y-4">
            <h3 className="font-headline font-bold text-base text-on-surface">
              1. Receiving Enterprise &amp; Agronomist Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-semibold text-on-surface mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </Card>

          {/* Section 2: Delivery Coordinates */}
          <Card className="p-6 space-y-4">
            <h3 className="font-headline font-bold text-base text-on-surface">
              2. Agricultural Delivery Address / Ex-Gate Warehouse
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Street / Highway Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">City / District</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">State / Governorate</label>
                  <input
                    type="text"
                    required
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 3: Trade Settlement Protocol (Payment) */}
          <Card className="p-6 space-y-4">
            <h3 className="font-headline font-bold text-base text-on-surface">
              3. Commercial Settlement Protocol (Mock Escrow)
            </h3>

            <div className="space-y-3">
              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'NABTA Verified Escrow'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="NABTA Verified Escrow"
                  checked={paymentMethod === 'NABTA Verified Escrow'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 text-primary"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="font-headline font-bold text-xs text-on-surface">
                      NABTA Cross-Border Agricultural Escrow (Recommended)
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary mt-1">
                    Funds are deposited into sovereign escrow and transferred to suppliers only after physical customs inspection and seal verification.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'Bank Wire Transfer'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Bank Wire Transfer"
                  checked={paymentMethod === 'Bank Wire Transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 text-primary"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-slate-700" />
                    <span className="font-headline font-bold text-xs text-on-surface">
                      Corporate SWIFT / IBAN Wire Transfer
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary mt-1">
                    Direct institutional wire against pro-forma invoice with 5-day settlement window.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  paymentMethod === 'AgriCredit Facility'
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="AgriCredit Facility"
                  checked={paymentMethod === 'AgriCredit Facility'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-1 text-primary"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-slate-700" />
                    <span className="font-headline font-bold text-xs text-on-surface">
                      AgriCredit 90-Day Seasonal Credit Facility
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary mt-1">
                    Pay post-harvest upon settlement of output contracts. (Pre-approved tier).
                  </p>
                </div>
              </label>
            </div>
          </Card>
        </div>

        {/* Right Summary (4 cols) */}
        <div className="lg:col-span-4">
          <Card className="sticky top-28 p-6 space-y-5">
            <h3 className="font-headline font-bold text-base text-on-surface pb-3 border-b border-slate-100">
              Procurement Summary ({cart.length} SKUs)
            </h3>

            {/* Quick item preview */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-xs font-mono">
                  <div className="truncate max-w-[170px]">
                    <span className="font-semibold text-on-surface">{item.product.name}</span>
                    <span className="text-[10px] text-secondary block">
                      Qty: {item.quantity} x {formatCurrency(item.product.priceUSD, currency)}
                    </span>
                  </div>
                  <span className="font-bold text-on-surface shrink-0">
                    {formatCurrency(item.product.priceUSD * item.quantity, currency)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200 text-xs font-mono">
              <div className="flex justify-between text-secondary">
                <span>Items Total:</span>
                <span>{formatCurrency(cartSubtotalUSD, currency)}</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span>Freight Logistics:</span>
                <span>{formatCurrency(cartShippingUSD, currency)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-headline">
                <span className="font-bold text-on-surface">Settlement Total:</span>
                <span className="font-extrabold text-primary text-base">
                  {formatCurrency(cartTotalUSD, currency)}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              variant="primary"
              disabled={placingOrder}
              className="w-full"
            >
              {placingOrder ? 'Confirming Escrow...' : 'Place Institutional Order'}
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
}
