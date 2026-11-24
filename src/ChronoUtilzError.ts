/**
 * ChronoUtilz error class
 */
export class ChronoUtilzError extends Error {
  constructor(message: string) {
    super(`ChronoUtilz Error: ${message}`);
    this.name = 'ChronoUtilzError';

    // Support proper stack traces in modern environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ChronoUtilzError);
    }
  }
}
