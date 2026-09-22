import { describe, it, expect } from 'vitest';
import { tripSchema, siteSchema, bannerSchema, bannersSchema } from '../src/lib/schemas';

describe('Content Schema Validation', () => {
  const validTrip = {
    id: 'test-trip',
    title: 'Test Mountain Trek',
    destination: 'Sikkim',
    nights: 4,
    pricePerPerson: 15000,
    highestPointMetres: 3200,
    tag: 'Popular',
    featured: false,
    highlights: ['Scenic Ridge', 'Alpine Lake'],
    days: [
      {
        label: 'Day 1',
        title: 'Arrival',
        text: 'Arrive at basecamp.'
      }
    ],
    included: ['Guide', 'Cab'],
    plate: {
      seed: 5,
      px: 0.5,
      py: 0.5,
      bg: ['#14324A', '#0E1A2B']
    }
  };

  const validBanner = {
    id: 'promo-test',
    tripId: 'test-trip',
    badge: 'TRENDING DEAL',
    badgeType: 'trending' as const,
    title: 'Test Banner Title',
    subtitle: 'Test Banner Subtitle',
    perks: ['Perk 1', 'Perk 2'],
    price: '₹9,999',
    mrp: '₹12,999',
    image: '/images/banners/test.jpg',
    alt: 'Test Banner Alt'
  };

  it('valid trip passes schema validation', () => {
    expect(() => tripSchema.parse(validTrip)).not.toThrow();
  });

  it('fails clearly when trip price is negative or zero', () => {
    const badTrip = { ...validTrip, pricePerPerson: -500 };
    expect(() => tripSchema.parse(badTrip)).toThrow(/Price per person must be positive/);
  });

  it('fails clearly when title is empty', () => {
    const badTrip = { ...validTrip, title: '' };
    expect(() => tripSchema.parse(badTrip)).toThrow(/Trip title is required/);
  });

  it('fails clearly when nights is not a positive integer', () => {
    const badTrip = { ...validTrip, nights: 0 };
    expect(() => tripSchema.parse(badTrip)).toThrow(/Nights must be a positive integer/);
  });

  it('fails clearly when highlights are empty', () => {
    const badTrip = { ...validTrip, highlights: [] };
    expect(() => tripSchema.parse(badTrip)).toThrow(/At least 1 highlight required/);
  });

  it('fails clearly when site email is invalid', () => {
    const badSite = {
      brand: 'Test Agency',
      whatsapp: '919000000000',
      phone: '+919000000000',
      email: 'not-an-email',
      hours: '9am-9pm',
      hero: {
        headline: 'Test',
        lead: 'Lead',
        peak: { name: 'Peak', metres: 5000 }
      },
      finePrint: 'Fine print'
    };
    expect(() => siteSchema.parse(badSite)).toThrow();
  });

  it('valid banner passes schema validation', () => {
    expect(() => bannerSchema.parse(validBanner)).not.toThrow();
    expect(() => bannersSchema.parse({ banners: [validBanner] })).not.toThrow();
  });

  it('fails clearly when banner badgeType is invalid', () => {
    const badBanner = { ...validBanner, badgeType: 'unknown-type' };
    expect(() => bannerSchema.parse(badBanner)).toThrow();
  });

  it('fails clearly when banner perks are empty', () => {
    const badBanner = { ...validBanner, perks: [] };
    expect(() => bannerSchema.parse(badBanner)).toThrow(/At least 1 perk is required/);
  });
});

