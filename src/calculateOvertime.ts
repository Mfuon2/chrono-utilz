import { ChronoUtilzError } from './ChronoUtilzError';

/** Returns pay factors assuming hourly rate 1. Explicit thresholds are arithmetic inputs, not jurisdiction-specific payroll rules. */
export function calculateOvertime(
  hoursWorked: number,
  regularHours = 40,
  overtimeMultiplier = 1.5,
  doubleTimeThreshold?: number,
): {
  regularHours: number;
  overtimeHours: number;
  doubleTimeHours: number;
  totalRegularPay: number;
  totalOvertimePay: number;
  totalDoubleTimePay: number;
} {
  if (
    ![hoursWorked, regularHours, overtimeMultiplier].every(Number.isFinite) ||
    overtimeMultiplier < 0 ||
    (doubleTimeThreshold !== undefined &&
      (!Number.isFinite(doubleTimeThreshold) || doubleTimeThreshold < regularHours))
  )
    throw new ChronoUtilzError('Invalid overtime configuration');

  if (hoursWorked < 0 || regularHours < 0) {
    throw new ChronoUtilzError('Hours cannot be negative');
  }

  const regular = Math.min(hoursWorked, regularHours);
  let overtime = 0;
  let doubleTime = 0;

  if (hoursWorked > regularHours) {
    const excessHours = hoursWorked - regularHours;

    if (doubleTimeThreshold && hoursWorked > doubleTimeThreshold) {
      doubleTime = hoursWorked - doubleTimeThreshold;
      overtime = doubleTimeThreshold - regularHours;
    } else {
      overtime = excessHours;
    }
  }

  // Calculate pay (assuming hourly rate of 1 for proportional calculation)
  const regularPay = regular;
  const overtimePay = overtime * overtimeMultiplier;
  const doubleTimePay = doubleTime * 2;

  return {
    regularHours: regular,
    overtimeHours: overtime,
    doubleTimeHours: doubleTime,
    totalRegularPay: regularPay,
    totalOvertimePay: overtimePay,
    totalDoubleTimePay: doubleTimePay,
  };
}
