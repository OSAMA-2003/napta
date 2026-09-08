'use client';

import React, { useState } from 'react';
import { Modal } from '@/ui/Modal';
import { Button } from '@/ui/Button';
import { useNabta } from '@/context/NabtaContext';

interface AddFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFarmModal({ isOpen, onClose }: AddFarmModalProps) {
  const { addFarm } = useNabta();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('Egypt');
  const [areaHectares, setAreaHectares] = useState('60');
  const [irrigationType, setIrrigationType] = useState('Solar-Powered Precision Drip System');
  const [soilTexture, setSoilTexture] = useState('Sandy Clay Loam');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addFarm({
      name,
      location,
      country,
      areaHectares: parseFloat(areaHectares) || 50,
      irrigationType,
      soil: {
        ph: 6.8,
        ec: 1.3,
        texture: soilTexture,
        organicMatter: 2.2,
        nitrogenPpm: 42,
        phosphorusPpm: 28,
        potassiumPpm: 210,
        calciumPpm: 360,
        magnesiumPpm: 90,
        salinityRisk: 'Low',
      },
    });

    setName('');
    setLocation('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Agricultural Plot"
      description="Connect satellite spectral monitoring and calibrate baseline soil parameters."
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
        <div>
          <label className="block font-semibold text-on-surface mb-1">Plot / Farm Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Nile Oasis Sector 08"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#054f31] focus:ring-1 focus:ring-[#054f31]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-on-surface mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#054f31]"
            >
              <option value="Egypt">Egypt</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="UAE">United Arab Emirates</option>
              <option value="Jordan">Jordan</option>
              <option value="Morocco">Morocco</option>
              <option value="Spain">Spain</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-on-surface mb-1">Total Area (Hectares)</label>
            <input
              type="number"
              min="1"
              step="0.5"
              required
              value={areaHectares}
              onChange={(e) => setAreaHectares(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#054f31]"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-on-surface mb-1">Regional Location</label>
          <input
            type="text"
            required
            placeholder="e.g. Sadat City Industrial & Agro Zone"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#054f31]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-on-surface mb-1">Irrigation System</label>
            <select
              value={irrigationType}
              onChange={(e) => setIrrigationType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#054f31]"
            >
              <option value="Solar-Powered Precision Drip System">Precision Drip System</option>
              <option value="Center Pivot VRI (Variable Rate Irrigation)">Center Pivot VRI</option>
              <option value="Closed-Loop Hydroponic Recirculation">Hydroponic Recirculation</option>
              <option value="Sub-Surface Micro Drip">Sub-Surface Micro Drip</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-on-surface mb-1">Primary Soil Texture</label>
            <select
              value={soilTexture}
              onChange={(e) => setSoilTexture(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:outline-none focus:border-[#054f31]"
            >
              <option value="Sandy Clay Loam">Sandy Clay Loam</option>
              <option value="Loamy Sand">Loamy Sand</option>
              <option value="Alluvial Silt Loam">Alluvial Silt Loam</option>
              <option value="Hydroponic Inert Substrate">Hydroponic Substrate</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Register &amp; Launch Analysis
          </Button>
        </div>
      </form>
    </Modal>
  );
}
