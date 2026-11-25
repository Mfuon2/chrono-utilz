import { DateParseOptions } from './DateParseOptions';
import { parseWith } from './parseCore';

type Options = Omit<DateParseOptions, 'timezone'>;

/** Internal parseDate without timezone support, so callers do not bundle the Intl timezone code. Unlike parseDate it throws by default; pass options (such as {}) to get null for invalid input. */
export const readDate = parseWith as {
  (input: string | number | Date, options?: Options & { throwError: true }): Date;
  (input: string | number | Date, options: Options): Date | null;
};
