import { assertTimezone } from './zone';
import { ChronoUtilzError } from './ChronoUtilzError';
import { WorkingTimeConfig } from './WorkingTimeConfig';

/** Validate working intervals. Equal start/end is rejected; end before start means overnight. */
export function validateWorkingConfig(config: WorkingTimeConfig): void {
  if (
    !Array.isArray(config.workingDays) ||
    !config.workingDays.length ||
    !config.workingDays.every((d) => Number.isInteger(d) && d >= 0 && d <= 6)
  )
    throw new ChronoUtilzError('At least one valid working day is required');
  if (
    ![config.startHour, config.endHour].every(Number.isFinite) ||
    config.startHour < 0 ||
    config.startHour >= 24 ||
    config.endHour < 0 ||
    config.endHour > 24 ||
    config.startHour === config.endHour
  )
    throw new ChronoUtilzError('Invalid working interval');
  if (config.timezone) assertTimezone(config.timezone);
}
