/**
 * Date comparison result
 */
export interface DateComparison {
  isBefore: boolean;
  isAfter: boolean;
  isSame: boolean;
  difference: {
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
}
