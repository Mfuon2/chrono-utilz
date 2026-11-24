/**
 * DateFormat options for formatting dates
 */
export type DateFormat =
  | 'YYYY-MM-DD' // 2025-05-07
  | 'MM/DD/YYYY' // 05/07/2025
  | 'DD/MM/YYYY' // 07/05/2025
  | 'YYYY-MM-DD HH:mm:ss' // 2025-05-07 14:30:00
  | 'DD MMM YYYY' // 07 May 2025
  | 'MMM DD, YYYY' // May 07, 2025
  | 'HH:mm:ss' // 14:30:00
  | 'hh:mm A';
