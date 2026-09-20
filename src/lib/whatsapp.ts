/**
 * WhatsApp Message & Link Builder
 * Pure functions for constructing valid WhatsApp click-to-chat URLs.
 * Source: design.md section 10 & 13
 */

export interface TripEnquiryParams {
  brand: string;
  whatsapp: string;
  tripTitle: string;
  travellers: number;
  tierName: string;
}

export interface ShortlistEnquiryParams {
  brand: string;
  whatsapp: string;
  tripTitles: string[];
}

export interface FormEnquiryParams {
  brand: string;
  whatsapp: string;
  name: string;
  travellers: number;
  month: string;
  savedTrips?: string[];
  note?: string;
}

/**
 * Strips non-digit characters from phone number.
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Creates raw WhatsApp URL from number and message.
 */
export function buildWhatsAppUrl(whatsapp: string, message: string): string {
  const cleanNumber = sanitizePhone(whatsapp);
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * General inquiry message link.
 */
export function buildGeneralEnquiryUrl(brand: string, whatsapp: string): string {
  const msg = `Hi ${brand}! I'd like help planning a trip.`;
  return buildWhatsAppUrl(whatsapp, msg);
}

/**
 * Trip estimate inquiry link.
 */
export function buildTripEnquiryUrl(params: TripEnquiryParams): string {
  const { brand, whatsapp, tripTitle, travellers, tierName } = params;
  const travellerText = `${travellers} traveller${travellers > 1 ? 's' : ''}`;
  const msg = `Hi ${brand}! I'm interested in "${tripTitle}" for ${travellerText} (${tierName} stay). Could you share availability and the final quote?`;
  return buildWhatsAppUrl(whatsapp, msg);
}

/**
 * Shortlist sharing inquiry link.
 */
export function buildShortlistUrl(params: ShortlistEnquiryParams): string {
  const { brand, whatsapp, tripTitles } = params;
  const listText = tripTitles.join(', ');
  const msg = `Hi ${brand}! I'm shortlisting these trips: ${listText}. Can you help me plan?`;
  return buildWhatsAppUrl(whatsapp, msg);
}

/**
 * Enquiry form message link.
 */
export function buildFormEnquiryUrl(params: FormEnquiryParams): string {
  const { brand, whatsapp, name, travellers, month, savedTrips, note } = params;
  const travellerText = `${travellers} traveller${travellers > 1 ? 's' : ''}`;
  let msg = `Hi ${brand}! I'm ${name.trim()}. We are ${travellerText}, thinking of ${month}.`;

  if (savedTrips && savedTrips.length > 0) {
    msg += ` Saved trips: ${savedTrips.join(', ')}.`;
  }
  if (note && note.trim().length > 0) {
    msg += ` ${note.trim()}`;
  }

  return buildWhatsAppUrl(whatsapp, msg);
}
