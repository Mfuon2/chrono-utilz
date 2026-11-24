import { zoneOffset } from './zone';

/**
 * Gets timezone offset in minutes for a specific IANA zone
 */
export function getTimezoneOffsetForZone(date: Date, timezone: string): number {
  return zoneOffset(date, timezone);
}
