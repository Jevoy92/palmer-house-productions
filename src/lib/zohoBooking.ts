// Centralized Zoho booking URL management
export const ZOHO_BOOKING_URLS = {
  STRATEGY_CALL: 'https://palmerhouseproductions.zohobookings.com/#/4740771000000078004',
  GENERAL_CONSULTATION: 'https://palmerhouseproductions.zohobookings.com/#/4740771000000078320'
} as const;

export type BookingType = keyof typeof ZOHO_BOOKING_URLS;

/**
 * Get the appropriate Zoho booking URL
 * @param type - The type of booking (strategy call or general consultation)
 * @returns The Zoho booking URL
 */
export function getZohoBookingUrl(type: BookingType = 'STRATEGY_CALL'): string {
  return ZOHO_BOOKING_URLS[type];
}

/**
 * Open a Zoho booking in a new tab with proper security attributes
 * @param type - The type of booking
 */
export function openZohoBooking(type: BookingType = 'STRATEGY_CALL'): void {
  const url = getZohoBookingUrl(type);
  const newWindow = window.open(url, '_blank');
  if (newWindow) {
    newWindow.opener = null;
  }
}