'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNabta } from '@/context/NabtaContext';
import { ProductCategory } from '@/types/nabta';
import { Button } from '@/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/ui/Card';
import { ArrowLeft, Plus, Check } from 'lucide-react';

export default function AddSupplierProductPage() {
  const router = useRouter();
  const { addProduct } = useNabta();

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('fertilizers');
  const [subcategory, setSubcategory] = useState('Specialty Soluble Fertigation');
  const [manufacturer, setManufacturer] = useState('EuroAgro Chemical Corp');
  const [supplierName, setSupplierName] = useState('EuroAgro International B.V.');
  const [countryOfOrigin, setCountryOfOrigin] = useState('Netherlands');
  const [priceUSD, setPriceUSD] = useState('85.00');
  const [unit, setUnit] = useState('25kg Polyethylene Bag');
  const [minOrderQuantity, setMinOrderQuantity] = useState('10');
  const [stockQuantity, setStockQuantity] = useState('500');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80');
  const [suitableCrops, setSuitableCrops] = useState('Tomato, Bell Pepper, Cucumber');
  const [certifications, setCertifications] = useState('ISO 9001, GLOBALG.A.P., OMRI');
  const [shippingInformation, setShippingInformation] = useState('Direct air or sea container dispatch in climate-shield packaging.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addProduct({
      name,
      category,
      subcategory,
      manufacturer,
      supplierName,
      countryOfOrigin,
      priceUSD: parseFloat(priceUSD) || 50,
      unit,
      minOrderQuantity: parseInt(minOrderQuantity) || 1,
      stockQuantity: parseInt(stockQuantity) || 100,
      availability: 'In Stock',
      description,
      images: [imageUrl],
      suitableCrops: suitableCrops.split(',').map((s) => s.trim()),
      certifications: certifications.split(',').map((s) => s.trim()),
      shippingInformation,
      specifications: {
        'Quality Standard': 'Grade A Export',
        'Purity Guarantee': '99.5%',
      },
    });

    router.push('/supplier/products');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/supplier/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-on-surface mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Product Management</span>
        </Link>

        <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
          Publish New Agricultural Input SKU
        </h1>
        <p className="text-xs text-secondary mt-1">
          Submit product specifications and phytosanitary certificates for automated algorithmic matching in the NABTA Marketplace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <Card className="p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-on-surface">
            1. Product Classification &amp; Identity
          </h3>

          <div className="space-y-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Commercial Product Name</label>
              <input
                type="text"
                required
                placeholder="e.g. SoluPotash High-K 12-12-36 + Chelated TE"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Product Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                >
                  <option value="seeds">Seeds &amp; Germplasm</option>
                  <option value="fertilizers">Fertilizers &amp; Nutrients</option>
                  <option value="crop-protection">Crop Protection &amp; Bio-Agents</option>
                  <option value="irrigation">Precision Irrigation Equipment</option>
                  <option value="sensors-iot">Sensors &amp; IoT Telemetry</option>
                  <option value="machinery">Machinery &amp; UAVs</option>
                  <option value="greenhouses">Greenhouses &amp; Climate Shields</option>
                  <option value="storage-packaging">Storage &amp; Cold Chain</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Subcategory / Line</label>
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Manufacturer</label>
                <input
                  type="text"
                  required
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-semibold text-on-surface mb-1">Supplier Entity</label>
                <input
                  type="text"
                  required
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-semibold text-on-surface mb-1">Country of Origin</label>
                <input
                  type="text"
                  required
                  value={countryOfOrigin}
                  onChange={(e) => setCountryOfOrigin(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Section 2: Pricing & Logistics */}
        <Card className="p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-on-surface">
            2. Commercial Terms, Volume &amp; Packaging
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Price (USD)</label>
              <input
                type="number"
                step="0.1"
                required
                value={priceUSD}
                onChange={(e) => setPriceUSD(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">Packaging Unit</label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">Minimum Order (MOQ)</label>
              <input
                type="number"
                min="1"
                required
                value={minOrderQuantity}
                onChange={(e) => setMinOrderQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-on-surface mb-1">In-Stock Quantity</label>
              <input
                type="number"
                min="1"
                required
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-on-surface mb-1">Shipping &amp; Logistics Notes</label>
            <input
              type="text"
              value={shippingInformation}
              onChange={(e) => setShippingInformation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </Card>

        {/* Section 3: Technical Specifications & Image */}
        <Card className="p-6 space-y-4">
          <h3 className="font-headline font-bold text-base text-on-surface">
            3. Technical Specs, Agronomic Suitability &amp; Image
          </h3>

          <div className="space-y-4 text-xs font-body">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Product Description</label>
              <textarea
                rows={3}
                required
                placeholder="Describe active ingredients, formulation, and field benefits..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Product Image URL</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Suitable Crops (comma separated)</label>
                <input
                  type="text"
                  value={suitableCrops}
                  onChange={(e) => setSuitableCrops(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Certifications (comma separated)</label>
                <input
                  type="text"
                  value={certifications}
                  onChange={(e) => setCertifications(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/supplier/products">
            <Button type="button" variant="secondary">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" size="lg">
            Submit SKU for Verification
          </Button>
        </div>
      </form>
    </div>
  );
}
