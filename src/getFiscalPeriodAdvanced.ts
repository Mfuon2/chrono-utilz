import { ChronoUtilzError } from './ChronoUtilzError';
import { FiscalPeriod } from './FiscalPeriod';
import { FiscalYearConfig } from './FiscalYearConfig';
import { addTime } from './addTime';
import { createDate } from './createDate';
import { isBetweenDates } from './isBetweenDates';
import { readDate } from './readDate';

/** Fiscal years are named by starting calendar year. startDay is restricted to 1-28 so every quarter has an unambiguous anchor. End includes the final millisecond of the quarter. */
export function getFiscalPeriodAdvanced(
  date: Date | string | number,
  config: FiscalYearConfig = { startMonth: 1, startDay: 1 },
): FiscalPeriod {
  const d = readDate(date);
  if (
    !Number.isInteger(config.startMonth) ||
    config.startMonth < 1 ||
    config.startMonth > 12 ||
    !Number.isInteger(config.startDay) ||
    config.startDay < 1 ||
    config.startDay > 28
  )
    throw new ChronoUtilzError('Fiscal start must use month 1-12 and day 1-28');
  let year = d.getFullYear();
  let anchor = createDate(year, config.startMonth - 1, config.startDay);
  if (d < anchor) {
    year--;
    anchor = createDate(year, config.startMonth - 1, config.startDay);
  }
  let quarter = 1;
  while (quarter < 4 && d >= addTime(anchor, quarter * 3, 'month')) quarter++;
  const startDate = addTime(anchor, (quarter - 1) * 3, 'month');
  const endDate = new Date(addTime(startDate, 3, 'month').getTime() - 1);
  return {
    quarter,
    year,
    startDate,
    endDate,
    isCurrentPeriod: isBetweenDates(new Date(), startDate, endDate),
  };
}
