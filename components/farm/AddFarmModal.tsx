'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/ui/Modal';
import { Button } from '@/ui/Button';
import { useNabta } from '@/context/NabtaContext';

interface AddFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFarmModal({ isOpen, onClose }: AddFarmModalProps) {
  const { t } = useTranslation(['farm', 'common']);
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
      title={t('farm:addFarmModal.title')}
      description={t('farm:addFarmModal.description')}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body text-start">
        <div>
          <label className="block font-semibold text-on-surface mb-1">
            {t('farm:addFarmModal.nameLabel')}
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('farm:addFarmModal.namePlaceholder')}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-primary text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-on-surface mb-1">
              {t('farm:addFarmModal.locationLabel')}
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={t('farm:addFarmModal.locationPlaceholder')}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-primary text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-on-surface mb-1">
              {t('farm:addFarmModal.countryLabel')}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-primary text-xs bg-white"
            >
              <option value="Egypt">{t('common:countries.Egypt')}</option>
              <option value="Saudi Arabia">{t('common:countries.Saudi Arabia')}</option>
              <option value="Spain">{t('common:countries.Spain')}</option>
              <option value="USA">{t('common:countries.USA')}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-on-surface mb-1">
              {t('farm:addFarmModal.areaLabel')}
            </label>
            <input
              type="number"
              min="1"
              max="5000"
              value={areaHectares}
              onChange={(e) => setAreaHectares(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-primary text-xs font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-on-surface mb-1">
              {t('farm:addFarmModal.soilLabel')}
            </label>
            <select
              value={soilTexture}
              onChange={(e) => setSoilTexture(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-primary text-xs bg-white"
            >
              <option value="Sandy Clay Loam">Sandy Clay Loam</option>
              <option value="Alluvial Silt Loam">Alluvial Silt Loam</option>
              <option value="Arid Calcareous Sand">Arid Calcareous Sand</option>
              <option value="Clay">Heavy Clay</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-on-surface mb-1">
            {t('farm:addFarmModal.irrigationLabel')}
          </label>
          <select
            value={irrigationType}
            onChange={(e) => setIrrigationType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-primary text-xs bg-white"
          >
            <option value="Solar-Powered Precision Drip System">Solar-Powered Precision Drip System</option>
            <option value="Center Pivot Sprinkler System">Center Pivot Sprinkler System</option>
            <option value="Sub-surface Drip (SDI)">Sub-surface Drip (SDI)</option>
            <option value="Gated Pipe Furrow System">Gated Pipe Furrow System</option>
          </select>
        </div>

        <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            {t('common:actions.cancel')}
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {t('farm:addFarmModal.submitBtn')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
