/**
 * Holiday configuration interface
 */
export interface HolidayRule {
  name: string;
  date: string | ((year: number) => Date);
  type?: 'fixed' | 'floating';
}
