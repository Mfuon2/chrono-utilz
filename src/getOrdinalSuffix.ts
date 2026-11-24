/**
 * Gets ordinal suffix for a number (1st, 2nd, 3rd, etc.)
 */
export function getOrdinalSuffix(n: number): string {
  const suffix = ['th', 'st', 'nd', 'rd'];
  const value = n % 100;
  return n + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
}
