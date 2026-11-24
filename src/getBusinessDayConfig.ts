import { BusinessDayConfig } from './BusinessDayConfig';
import { currentConfig } from './currentConfig';

/**
 * Gets the current business day configuration
 * @returns A copy of the current configuration
 */
export function getBusinessDayConfig(): BusinessDayConfig {
  return {
    workingDays: [...currentConfig.workingDays],
    holidays: new Set(currentConfig.holidays),
  };
}
