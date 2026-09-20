import { describe, it, expect } from 'vitest';
import { calculatePerPerson, calculateTotalEstimate, formatINR, DEFAULT_TIERS } from '../src/lib/estimator';

describe('Estimator Math', () => {
  it('correctly rounds per-person prices to nearest 100 as per design.md', () => {
    // base: 12500, comfort: 1.0 -> 12500
    expect(calculatePerPerson(12500, 1.0)).toBe(12500);

    // base: 12500, premium: 1.35 -> 12500 * 1.35 = 16875 -> rounded to nearest 100 = 16900
    expect(calculatePerPerson(12500, 1.35)).toBe(16900);

    // base: 12500, luxury: 1.8 -> 12500 * 1.8 = 22500 -> 22500
    expect(calculatePerPerson(12500, 1.8)).toBe(22500);

    // base: 18900, premium: 1.35 -> 18900 * 1.35 = 25515 -> 25500
    expect(calculatePerPerson(18900, 1.35)).toBe(25500);
  });

  it('calculates total based on travellers', () => {
    const res = calculateTotalEstimate(12500, 1.35, 3);
    expect(res.perPerson).toBe(16900);
    expect(res.total).toBe(16900 * 3);
  });

  it('handles minimum traveller bounds', () => {
    const res = calculateTotalEstimate(10000, 1.0, 0);
    expect(res.total).toBe(10000);
  });

  it('formats INR correctly with symbol', () => {
    expect(formatINR(12500)).toBe('₹12,500');
    expect(formatINR(1234567)).toBe('₹12,34,567');
  });

  it('has all three standard tiers configured', () => {
    expect(DEFAULT_TIERS.map((t) => t.name)).toEqual(['Comfort', 'Premium', 'Luxury']);
    expect(DEFAULT_TIERS[0].multiplier).toBe(1.0);
    expect(DEFAULT_TIERS[1].multiplier).toBe(1.35);
    expect(DEFAULT_TIERS[2].multiplier).toBe(1.8);
  });
});
