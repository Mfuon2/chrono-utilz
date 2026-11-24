/**
 * Fiscal period information
 */
export interface FiscalPeriod {
  quarter: number;
  year: number;
  startDate: Date;
  endDate: Date;
  isCurrentPeriod: boolean;
}
