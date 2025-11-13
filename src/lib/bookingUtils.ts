// Centralized booking utility functions
export const BOOKING_URL = 'https://calendar.app.google/TjXSG2EjNF7KZzcJ8';

/**
 * Open the booking calendar in a new tab
 */
export function openBookingCalendar(): void {
  window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
}
