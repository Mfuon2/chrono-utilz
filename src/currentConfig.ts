import { BusinessDayConfig } from './BusinessDayConfig';
import { defaultConfig } from './defaultConfig';

/**
 * Current business day configuration
 */
export const currentConfig: BusinessDayConfig = {
  ...defaultConfig,
  holidays: new Set(defaultConfig.holidays),
};
