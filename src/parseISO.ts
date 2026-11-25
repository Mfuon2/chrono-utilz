import { readDate } from './readDate';

/** Strict ISO subset: date-only, or T-separated time with optional seconds, 1-3 fractional digits and Z or numeric offset. Date-only is a local calendar date. Invalid dates return null. */
export function parseISO(isoString: string): Date | null {
  return typeof isoString === 'string' &&
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?)?$/.test(
      isoString,
    )
    ? readDate(isoString, {})
    : null;
}
