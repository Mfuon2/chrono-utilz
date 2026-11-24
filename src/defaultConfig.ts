import { BusinessDayConfig } from './BusinessDayConfig';

/**
 * Default business day configuration
 * Monday through Friday (1-5) as working days
 */
export const defaultConfig: BusinessDayConfig = {
  workingDays: [1, 2, 3, 4, 5], // Monday to Friday
  holidays: new Set<string>(),
};
