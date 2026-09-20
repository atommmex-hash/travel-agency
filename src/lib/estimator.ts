/**
 * Trip Cost Estimator Math
 * Pure functions for calculating indicative trip estimates.
 * Source: design.md section 5 & 15
 */

export interface StayTier {
  id: string;
  name: string;
  multiplier: number;
}

export const DEFAULT_TIERS: StayTier[] = [
  { id: 'comfort', name: 'Comfort', multiplier: 1.0 },
  { id: 'premium', name: 'Premium', multiplier: 1.35 },
  { id: 'luxury', name: 'Luxury', multiplier: 1.8 }
];

/**
 * Calculates per-person rounded price for a given tier:
 * round(basePrice * multiplier / 100) * 100
 */
export function calculatePerPerson(basePrice: number, multiplier: number): number {
  return Math.round((basePrice * multiplier) / 100) * 100;
}

/**
 * Calculates total indicative trip price for n travellers:
 * calculatePerPerson(basePrice, multiplier) * travellers
 */
export function calculateTotalEstimate(
  basePrice: number,
  multiplier: number,
  travellers: number
): { perPerson: number; total: number } {
  const perPerson = calculatePerPerson(basePrice, multiplier);
  const total = perPerson * Math.max(1, travellers);
  return { perPerson, total };
}

/**
 * Format INR currency with Indian numbering system (e.g. ₹12,500)
 */
export function formatINR(amount: number): string {
  return '\u20B9' + amount.toLocaleString('en-IN');
}
