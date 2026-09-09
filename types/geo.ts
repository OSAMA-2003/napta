export type RegionTerminologyEn = 'Governorate' | 'State' | 'Province' | 'Region';
export type RegionTerminologyAr = 'محافظة' | 'ولاية' | 'منطقة' | 'إقليم';

export interface CityData {
  id: string;
  nameEn: string;
  nameAr: string;
  soilTypeEn: string;
  soilTypeAr: string;
  climateZoneEn: string;
  climateZoneAr: string;
  avgGdd: number;
  avgAnnualRainfallMm: number;
  primaryCropsEn: string[];
  primaryCropsAr: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RegionData {
  id: string;
  nameEn: string;
  nameAr: string;
  cities: CityData[];
}

export interface CountryData {
  id: string;
  code: string; // e.g. "EG", "SA", "US", "ES", "JO"
  nameEn: string;
  nameAr: string;
  regionTerminologyEn: RegionTerminologyEn;
  regionTerminologyAr: RegionTerminologyAr;
  regions: RegionData[];
}

export interface SelectedLocationState {
  country: CountryData | null;
  region: RegionData | null;
  city: CityData | null;
}
