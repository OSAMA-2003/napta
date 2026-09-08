'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNabta } from '@/context/NabtaContext';
import { Button } from '@/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { ArrowLeft, Store, CheckCircle2 } from 'lucide-react';

export default function SellerProduceListingPage() {
  const router = useRouter();
  const { addProduceListing, activeFarm } = useNabta();

  const [productName, setProductName] = useState('Export Grade Vine Tomatoes');
  const [variety, setVariety] = useState('Tycoon F1');
  const [quantityTons, setQuantityTons] = useState('80');
  const [pricePerTonUSD, setPricePerTonUSD] = useState('650');
  const [harvestDate, setHarvestDate] = useState('2026-11-20');
  const [location, setLocation] = useState(activeFarm.location);
  const [description, setDescription] = useState('Vine-ripened export cluster tomatoes grown with solar-powered drip fertigation.');
  const [certifications, setCertifications] = useState('GLOBALG.A.P., GRASP');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addProduceListing({
      productName,
      variety,
      quantityTons: parseFloat(quantityTons) || 50,
      pricePerTonUSD: parseFloat(pricePerTonUSD) || 600,
      harvestDate,
      location,
      description,
      certifications: certifications.split(',').map((s) => s.trim()),
      images: [imageUrl],
      availability: 'Upcoming Harvest',
    });

    router.push('/marketplace?category=farm-produce');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>

        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
          Sell Your Produce — Direct Grower Listing
        </h1>
        <p className="text-xs text-secondary mt-1">
          List your upcoming or harvested farm yield directly on the global agricultural terminal market for verified wholesale buyers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-on-surface">
            1. Crop &amp; Harvest Parameters
          </h3>

          <div className="space-y-4 text-xs font-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Crop Type</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cluster Tomato"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Variety / Cultivar</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tycoon F1 Hybrid"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Available Batch (Metric Tons)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  required
                  value={quantityTons}
                  onChange={(e) => setQuantityTons(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Price per MT (USD)</label>
                <input
                  type="number"
                  min="50"
                  step="10"
                  required
                  value={pricePerTonUSD}
                  onChange={(e) => setPricePerTonUSD(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Harvest / Dispatch Date</label>
                <input
                  type="date"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Farm Origin &amp; Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-on-surface">
            2. Quality, Certifications &amp; Documentation
          </h3>

          <div className="space-y-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Harvest Description &amp; Brix / Sizing Specs</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Certifications (comma separated)</label>
                <input
                  type="text"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Produce Photograph URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/marketplace">
            <Button type="button" variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" size="lg" icon={<Store className="w-4 h-4" />}>
            List Produce on Marketplace
          </Button>
        </div>
      </form>
    </div>
  );
}
