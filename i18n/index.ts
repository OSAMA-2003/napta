'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import farmEn from './locales/en/farm.json';
import recommendationsEn from './locales/en/recommendations.json';
import scenariosEn from './locales/en/scenarios.json';
import marketplaceEn from './locales/en/marketplace.json';
import ordersEn from './locales/en/orders.json';
import portalsEn from './locales/en/portals.json';

import commonAr from './locales/ar/common.json';
import homeAr from './locales/ar/home.json';
import farmAr from './locales/ar/farm.json';
import recommendationsAr from './locales/ar/recommendations.json';
import scenariosAr from './locales/ar/scenarios.json';
import marketplaceAr from './locales/ar/marketplace.json';
import ordersAr from './locales/ar/orders.json';
import portalsAr from './locales/ar/portals.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    farm: farmEn,
    recommendations: recommendationsEn,
    scenarios: scenariosEn,
    marketplace: marketplaceEn,
    orders: ordersEn,
    portals: portalsEn,
  },
  ar: {
    common: commonAr,
    home: homeAr,
    farm: farmAr,
    recommendations: recommendationsAr,
    scenarios: scenariosAr,
    marketplace: marketplaceAr,
    orders: ordersAr,
    portals: portalsAr,
  },
} as const;

export const getInitialLanguage = (): 'en' | 'ar' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('nabta_lang') || localStorage.getItem('i18nextLng');
    if (saved === 'ar' || saved === 'en') return saved;
  }
  return 'en';
};

if (!i18n.isInitialized) {
  const initialLang = getInitialLanguage();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLang,
      fallbackLng: 'en',
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
    });

  if (typeof window !== 'undefined') {
    document.documentElement.lang = initialLang;
    document.documentElement.dir = initialLang === 'ar' ? 'rtl' : 'ltr';
  }
}

export default i18n;
