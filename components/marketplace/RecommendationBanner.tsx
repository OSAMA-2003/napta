'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product, CropScenario, Farm } from '@/types/nabta';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface RecommendationBannerProps {
  product: Product;
  activeScenario: CropScenario;
  activeFarm: Farm;
}

export function RecommendationBanner({
  product,
  activeScenario,
  activeFarm,
}: RecommendationBannerProps) {
  const { t } = useTranslation(['marketplace', 'common']);

  const isCropMatch =
    product.suitableCrops.some((c) =>
      activeScenario.cropName.toLowerCase().includes(c.toLowerCase()) ||
      c.toLowerCase().includes(activeScenario.cropName.toLowerCase()) ||
      c.toLowerCase() === 'all horticulture' ||
      c.toLowerCase() === 'row crops' ||
      c.toLowerCase() === 'universal'
    );

  const isScenarioEssential = activeScenario.recommendedCategoryIds.includes(product.category);
  const isRecommended = isCropMatch || isScenarioEssential;

  if (isRecommended) {
    return (
      <div className="rounded-xl border border-[#10b981]/40 bg-[#10b981]/10 p-4 text-start">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#10b981] text-white shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm text-[#003620]">
                {t('marketplace:banner.whyRecommended')}
              </span>
              <span className="bg-[#054f31] text-white text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
                {t('marketplace:banner.scenarioVerified')}
              </span>
            </div>
            <p className="text-xs text-[#003620]/90 mt-1 font-body leading-relaxed">
              {product.scenarioMatchReason ||
                t('marketplace:banner.verifiedReason', {
                  farmName: activeFarm.name,
                  cropName: activeScenario.cropName,
                  season: activeScenario.season,
                })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/10 p-4 text-start">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#f59e0b] text-white shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-sm text-[#92400e]">
              {t('marketplace:banner.advisoryNotice')}
            </span>
            <span className="bg-[#b45309] text-white text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
              {t('marketplace:banner.secondaryMatch')}
            </span>
          </div>
          <p className="text-xs text-[#92400e]/90 mt-1 font-body leading-relaxed">
            {t('marketplace:banner.advisoryDesc', {
              cropName: activeScenario.cropName,
              farmName: activeFarm.name,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
