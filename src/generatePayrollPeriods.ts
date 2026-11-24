import { ChronoUtilzError } from './ChronoUtilzError';
import { addTime } from './addTime';
import { endOf } from './endOf';
import { isValidDate } from './isValidDate';

/** Calendar-year periods; final end is clipped to year end and includes the final millisecond. Pay date remains the scheduled date even when the period is clipped. No jurisdiction-specific payroll policy. */
export function generatePayrollPeriods(
  year: number,
  frequency: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly',
  startDate?: Date,
): Array<{ startDate: Date; endDate: Date; payDate: Date }> {
  if (
    !Number.isInteger(year) ||
    year < 1000 ||
    year > 9999 ||
    !['weekly', 'biweekly', 'semimonthly', 'monthly'].includes(frequency)
  )
    throw new ChronoUtilzError('Invalid payroll year or frequency');
  if (startDate && (!isValidDate(startDate) || startDate.getFullYear() !== year))
    throw new ChronoUtilzError('Payroll start must belong to the requested year');

  const periods: Array<{ startDate: Date; endDate: Date; payDate: Date }> = [];

  let current = startDate || new Date(year, 0, 1);
  const yearEnd = new Date(year + 1, 0, 0); // Last day of year

  while (current.getFullYear() === year) {
    let periodEnd: Date;
    let payDate: Date;

    switch (frequency) {
      case 'weekly':
        periodEnd = addTime(current, 6, 'day');
        payDate = addTime(periodEnd, 3, 'day'); // Pay 3 days after period end
        break;
      case 'biweekly':
        periodEnd = addTime(current, 13, 'day');
        payDate = addTime(periodEnd, 3, 'day');
        break;
      case 'semimonthly':
        if (current.getDate() <= 15) {
          periodEnd = new Date(current.getFullYear(), current.getMonth(), 15);
          payDate = new Date(current.getFullYear(), current.getMonth(), 20);
        } else {
          periodEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
          payDate = new Date(current.getFullYear(), current.getMonth() + 1, 5);
        }
        break;
      case 'monthly':
        periodEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
        payDate = new Date(current.getFullYear(), current.getMonth() + 1, 5);
        break;
    }

    periods.push({
      startDate: new Date(current),
      endDate: endOf(periodEnd > yearEnd ? yearEnd : periodEnd, 'day'),
      payDate: payDate,
    });

    // Move to next period
    switch (frequency) {
      case 'weekly':
        current = addTime(current, 7, 'day');
        break;
      case 'biweekly':
        current = addTime(current, 14, 'day');
        break;
      case 'semimonthly':
        if (current.getDate() <= 15) {
          current = new Date(current.getFullYear(), current.getMonth(), 16);
        } else {
          current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
        }
        break;
      case 'monthly':
        current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
        break;
    }

    if (current > yearEnd) break;
  }

  return periods;
}
