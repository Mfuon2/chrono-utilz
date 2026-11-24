import { BusinessDayConfig } from './BusinessDayConfig';
import { currentConfig } from './currentConfig';
import { customHolidays } from './customHolidays';
import { defaultConfig } from './defaultConfig';
import { getBusinessDayConfig } from './getBusinessDayConfig';

/**
 * Resets business day configuration to defaults
 * @returns The reset configuration
 */
export function resetBusinessDayConfig(): BusinessDayConfig {
  currentConfig.workingDays = [...defaultConfig.workingDays];
  currentConfig.holidays = new Set();
  customHolidays.clear();
  return getBusinessDayConfig();
}
