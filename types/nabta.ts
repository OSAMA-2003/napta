export type CurrencyCode = 'USD' | 'EUR' | 'EGP' | 'SAR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rateAgainstUSD: number; // multiplier from USD
}

export type UserRole = 'FARMER' | 'SUPPLIER' | 'ADMIN';

export interface SoilProfile {
  ph: number; // e.g. 6.8
  ec: number; // Electrical conductivity dS/m, e.g. 1.4
  texture: string; // e.g. "Sandy Loam"
  organicMatter: number; // percentage, e.g. 2.4%
  nitrogenPpm: number; // e.g. 42
  phosphorusPpm: number; // e.g. 28
  potassiumPpm: number; // e.g. 195
  calciumPpm: number; // e.g. 340
  magnesiumPpm: number; // e.g. 85
  salinityRisk: 'Low' | 'Moderate' | 'High';
}

export interface ClimateProfile {
  zone: string; // e.g. "Semi-Arid Arid Subtropical"
  growingDegreeDays: number; // GDD e.g. 2450
  avgSummerTempC: number;
  avgWinterTempC: number;
  annualRainfallMm: number;
  frostRiskDays: number;
  currentTempC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  solarRadiationWm2: number;
}

export interface WaterProfile {
  source: string; // e.g. "Deep Aquifer Well & Drip Grid"
  allocationM3Ha: number; // e.g. 6500
  qualityEc: number; // e.g. 0.9 dS/m
  salinityTds: number; // ppm e.g. 580
  reliabilityRating: 'High' | 'Moderate' | 'Constrained';
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  areaHectares: number;
  irrigationType: string;
  soil: SoilProfile;
  climate: ClimateProfile;
  water: WaterProfile;
  activeScenarioId?: string;
  analysisStatus: 'ANALYZED' | 'SCANNING' | 'PENDING_INPUT';
  lastSatellitePass: string;
  ndviAverage: number;
  healthIndex: number; // 0-100
}

export type ScenarioStatus = 'Draft' | 'Analyzed' | 'Selected' | 'Completed';

export interface CropScenario {
  id: string;
  farmId: string;
  cropName: string;
  variety: string;
  season: string; // e.g. "Summer 2026"
  status: ScenarioStatus;
  suitabilityScore: number; // 0 - 100
  whyThisCrop: string;
  soilCompatibilityScore: number; // 0 - 100
  climateCompatibilityScore: number; // 0 - 100
  waterCompatibilityScore: number; // 0 - 100
  
  // Tradeoff metrics
  waterDemandRating: 'Low' | 'Medium' | 'High';
  waterDemandM3Ha: number;
  durationDays: number;
  expectedProductionTonHa: number;
  estimatedCostPerHa: number; // USD
  expectedRevenuePerHa: number; // USD
  estimatedProfitPerHa: number; // USD
  roiPercent: number;
  carbonScoreKgPerTon: number;
  
  // Recommended inputs linkage
  recommendedCategoryIds: string[];
}

export type ProductCategory = 
  | 'seeds'
  | 'fertilizers'
  | 'crop-protection'
  | 'irrigation'
  | 'sensors-iot'
  | 'machinery'
  | 'greenhouses'
  | 'storage-packaging'
  | 'farm-produce';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  manufacturer: string;
  supplierName: string;
  supplierId: string;
  countryOfOrigin: string;
  priceUSD: number;
  unit: string; // e.g. "25kg Bag", "1,000 Seeds Packet", "100m Roll", "Unit"
  minOrderQuantity: number;
  availability: 'In Stock' | 'Low Stock' | 'Pre-Order' | 'Out of Stock';
  stockQuantity: number;
  rating: number; // 0 - 5
  reviewCount: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  certifications: string[];
  suitableCrops: string[];
  suitableSoilConditions: string[];
  shippingInformation: string;
  featured?: boolean;
  moderationStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  scenarioMatchReason?: string; // Engine compatibility justification
  producerHarvestDate?: string; // If farm produce
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  deliveryAddress: {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode: string;
  };
  items: CartItem[];
  subtotalUSD: number;
  shippingUSD: number;
  totalUSD: number;
  paymentMethod: string;
  status: 'Processing' | 'Customs Clearance' | 'In Transit' | 'Delivered';
  estimatedDeliveryDate: string;
  trackingNumber: string;
}

export interface ProduceListing {
  id: string;
  farmerName: string;
  farmName: string;
  productName: string;
  variety: string;
  quantityTons: number;
  location: string;
  pricePerTonUSD: number;
  harvestDate: string;
  images: string[];
  description: string;
  certifications: string[];
  availability: 'Immediate' | 'Upcoming Harvest';
  status: 'Active' | 'Sold' | 'Pending Review';
}
