import { AdvancedFormatOptions } from './AdvancedFormatOptions';
import { ChronoUtilzError } from './ChronoUtilzError';
import { IANATimezone } from './IANATimezone';
import { readDate } from './readDate';

/**
 * Formats date in a specific timezone
 * @param date - Date to format
 * @param timezone - IANA timezone identifier
 * @param options - Formatting options
 * @returns Formatted date in specified timezone
 */
export function formatTimezone(
  date: Date | string | number,
  timezone: IANATimezone,
  options: AdvancedFormatOptions = {},
): string {
  const safeDate = readDate(date);

  try {
    if (options.timezone && options.timezone !== timezone)
      throw new ChronoUtilzError('Conflicting timezone options');
    const formatOptions: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    if (options.includeTime !== false) {
      formatOptions.hour = '2-digit';
      formatOptions.minute = '2-digit';

      if (options.includeSeconds) {
        formatOptions.second = '2-digit';
      }

      formatOptions.hour12 = !options.use24Hour;
    }

    if (options.includeDayOfWeek) {
      formatOptions.weekday = 'long';
    }

    if (options.includeTimezone) {
      formatOptions.timeZoneName = 'short';
    }

    return safeDate.toLocaleString(options.locale || 'en-US', formatOptions);
  } catch (error) {
    throw new ChronoUtilzError(`Failed to format date in timezone ${timezone}: ${error}`);
  }
}
