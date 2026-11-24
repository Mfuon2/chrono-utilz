import { ChronoUtilzError } from './ChronoUtilzError';
import { WorkingTimeConfig } from './WorkingTimeConfig';
import { calculateWorkingHours } from './calculateWorkingHours';
import { isValidRange } from './isValidRange';

/**
 * Calculates service level agreement (SLA) compliance
 * @param incidentDate - When the incident was reported
 * @param resolvedDate - When the incident was resolved
 * @param slaHours - SLA requirement in hours
 * @param config - Working time configuration
 * @returns SLA compliance information
 */
export function calculateSLACompliance(
  incidentDate: Date | string | number,
  resolvedDate: Date | string | number,
  slaHours: number,
  config: WorkingTimeConfig = { startHour: 9, endHour: 17, workingDays: [1, 2, 3, 4, 5] },
): {
  actualHours: number;
  slaHours: number;
  isCompliant: boolean;
  breachHours: number;
  percentageOfSLA: number;
} {
  if (!Number.isFinite(slaHours) || slaHours <= 0)
    throw new ChronoUtilzError('SLA hours must be positive');
  if (!isValidRange(incidentDate, resolvedDate))
    throw new ChronoUtilzError('Resolution must follow incident');

  const actualHours = calculateWorkingHours(incidentDate, resolvedDate, config);
  const isCompliant = actualHours <= slaHours;
  const breachHours = Math.max(0, actualHours - slaHours);
  const percentageOfSLA = (actualHours / slaHours) * 100;

  return {
    actualHours,
    slaHours,
    isCompliant,
    breachHours,
    percentageOfSLA,
  };
}
