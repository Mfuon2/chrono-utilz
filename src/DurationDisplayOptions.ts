import { TimeUnit } from './TimeUnit';

/**
 * Duration display options
 */
export interface DurationDisplayOptions {
  precision?: number;
  units?: TimeUnit[];
  format?: 'long' | 'short' | 'narrow';
  separator?: string;
  includeZeroValues?: boolean;
}
