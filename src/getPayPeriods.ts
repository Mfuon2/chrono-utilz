import { ChronoUtilzError } from './ChronoUtilzError';
import { PayPeriodFrequency } from './PayPeriodFrequency';
import { addTime } from './addTime';
import { readDate } from './readDate';

/** Anchored at startDate. Semi-monthly uses the anchor then the next 15th/1st; monthly additions clamp month ends. Invalid frequencies throw. */
export function getPayPeriods(
  startDate: Date | string | number,
  endDate: Date | string | number,
  frequency: PayPeriodFrequency,
): Date[] {
  if (!['weekly', 'bi-weekly', 'semi-monthly', 'monthly'].includes(frequency))
    throw new ChronoUtilzError('Invalid pay frequency');

  const start = readDate(startDate);
  const end = readDate(endDate);

  const periods: Date[] = [];
  const current = new Date(start);

  while (current <= end) {
    periods.push(new Date(current));

    switch (frequency) {
      case 'weekly':
        current.setDate(current.getDate() + 7);
        break;
      case 'bi-weekly':
        current.setDate(current.getDate() + 14);
        break;
      case 'semi-monthly':
        // 1st and 15th of each month
        if (current.getDate() < 15) {
          current.setDate(15);
        } else {
          current.setMonth(current.getMonth() + 1, 1);
        }
        break;
      case 'monthly':
        current.setTime(addTime(current, 1, 'month').getTime());
        break;
    }
  }

  return periods;
}
