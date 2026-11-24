/**
 * Working hours schedule interface
 */
export interface WorkingSchedule {
  start: string; // HH:mm format
  end: string; // HH:mm format
  days?: number[]; // Optional specific days
}
