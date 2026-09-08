import { CurrencyCode } from '@/types/nabta';

export const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  EGP: { symbol: 'E£', rate: 48.5, label: 'EGP (E£)' },
  SAR: { symbol: 'SAR ', rate: 3.75, label: 'SAR (SR)' },
};

export function formatCurrency(amountUSD: number, currency: CurrencyCode = 'USD'): string {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = amountUSD * config.rate;
  
  if (currency === 'EGP' || currency === 'SAR') {
    return `${config.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `${config.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatNumber(num: number, decimals: number = 0): string {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(val: number): string {
  return `${val.toFixed(1)}%`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
