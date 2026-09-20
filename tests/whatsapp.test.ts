import { describe, it, expect } from 'vitest';
import {
  sanitizePhone,
  buildWhatsAppUrl,
  buildGeneralEnquiryUrl,
  buildTripEnquiryUrl,
  buildShortlistUrl,
  buildFormEnquiryUrl
} from '../src/lib/whatsapp';

describe('WhatsApp Link & Message Builder', () => {
  it('sanitizes phone numbers with non-digits', () => {
    expect(sanitizePhone('+91 (900) 000-0000')).toBe('919000000000');
    expect(sanitizePhone('919876543210')).toBe('919876543210');
  });

  it('builds general enquiry URL', () => {
    const url = buildGeneralEnquiryUrl('Himal Trails', '919000000000');
    expect(url).toBe(
      'https://wa.me/919000000000?text=Hi%20Himal%20Trails!%20I\'d%20like%20help%20planning%20a%20trip.'
    );
  });

  it('builds trip enquiry URL with singular/plural traveller grammar', () => {
    const single = buildTripEnquiryUrl({
      brand: 'Himal Trails',
      whatsapp: '919000000000',
      tripTitle: 'Darjeeling Tea and Toy Train',
      travellers: 1,
      tierName: 'Comfort'
    });
    expect(decodeURIComponent(single)).toContain('for 1 traveller (Comfort stay)');

    const plural = buildTripEnquiryUrl({
      brand: 'Himal Trails',
      whatsapp: '919000000000',
      tripTitle: 'Gangtok and Tsomgo Lake',
      travellers: 4,
      tierName: 'Premium'
    });
    expect(decodeURIComponent(plural)).toContain('for 4 travellers (Premium stay)');
  });

  it('builds shortlist URL with multiple trips', () => {
    const url = buildShortlistUrl({
      brand: 'Himal Trails',
      whatsapp: '919000000000',
      tripTitles: ['Trip A', 'Trip B']
    });
    expect(decodeURIComponent(url)).toContain(
      "Hi Himal Trails! I'm shortlisting these trips: Trip A, Trip B. Can you help me plan?"
    );
  });

  it('builds enquiry form URL with optional note and saved trips', () => {
    const url = buildFormEnquiryUrl({
      brand: 'Himal Trails',
      whatsapp: '919000000000',
      name: 'Rohan',
      travellers: 2,
      month: 'October 2026',
      savedTrips: ['Darjeeling Tea'],
      note: 'Travelling with senior parents.'
    });
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain("Hi Himal Trails! I'm Rohan. We are 2 travellers, thinking of October 2026.");
    expect(decoded).toContain('Saved trips: Darjeeling Tea.');
    expect(decoded).toContain('Travelling with senior parents.');
  });
});
