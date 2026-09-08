import React from 'react';
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
  // Determine if product is recommended for the active scenario
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
      <div className="rounded-xl border border-[#10b981]/40 bg-[#10b981]/10 p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#10b981] text-white shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-sm text-[#003620]">
                Why Nabta Recommends This Input
              </span>
              <span className="bg-[#054f31] text-white text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
                Scenario Verified
              </span>
            </div>
            <p className="text-xs text-[#003620]/90 mt-1 font-body leading-relaxed">
              {product.scenarioMatchReason ||
                `Engine verified for your active plot "${activeFarm.name}" and selected scenario (${activeScenario.cropName} - ${activeScenario.season}). Conforms to the soil chemistry requirements and irrigation regime calibrated for this field.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/10 p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#f59e0b] text-white shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-sm text-[#92400e]">
              Agronomic Advisory Notice
            </span>
            <span className="bg-[#b45309] text-white text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase">
              Secondary Match
            </span>
          </div>
          <p className="text-xs text-[#92400e]/90 mt-1 font-body leading-relaxed">
            This product is not directly calibrated for your current scenario (
            <strong>{activeScenario.cropName}</strong> on {activeFarm.name}). Review the technical
            specifications before purchasing or select an alternative scenario to verify compatibility.
          </p>
        </div>
      </div>
    </div>
  );
}
