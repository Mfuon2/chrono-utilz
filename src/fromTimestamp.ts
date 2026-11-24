import { checkedDate } from './zone';
/** Unix milliseconds by default. Pass inSeconds:true for Unix seconds. No magnitude guessing. */
export function fromTimestamp(timestamp: number, inSeconds = false): Date {
  if (!Number.isFinite(timestamp)) throw new RangeError('Timestamp must be finite');
  return checkedDate(timestamp * (inSeconds ? 1000 : 1));
}
