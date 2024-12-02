/**
 * Utility class for handling time-related operations.
 * Provides methods for delays, timeouts, and time measurements.
 *
 * @example
 * ```typescript
 * await TimeUtil.sleep(1000); // Sleep for 1 second
 * const result = await TimeUtil.withTimeout(promise, 5000);
 * ```
 */
export class TimeUtil {
  /**
   * Creates a promise that resolves after a specified number of milliseconds.
   * 
   * @param ms - Number of milliseconds to sleep
   * @returns Promise that resolves after the specified time
   * 
   * @example
   * ```typescript
   * console.log('Start');
   * await TimeUtil.sleep(1000);
   * console.log('After 1 second');
   * ```
   */
  static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Wraps a promise with a timeout.
   * If the promise doesn't resolve within the specified time, it rejects with a timeout error.
   * 
   * @param promise - Promise to wrap with timeout
   * @param timeoutMs - Timeout in milliseconds
   * @returns Promise that resolves with the original promise result or rejects on timeout
   * @throws {Error} If the timeout is reached before the promise resolves
   * 
   * @example
   * ```typescript
   * try {
   *   const result = await TimeUtil.withTimeout(
   *     fetch('https://api.example.com'),
   *     5000
   *   );
   * } catch (error) {
   *   console.error('Request timed out');
   * }
   * ```
   */
  static async withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
    });

    return Promise.race([promise, timeout]);
  }

  /**
   * Measures the execution time of a function or promise.
   * 
   * @param fn - Function or promise to measure
   * @returns Promise resolving to [result, duration in ms]
   * 
   * @example
   * ```typescript
   * const [result, duration] = await TimeUtil.measureTime(
   *   async () => {
   *     await someOperation();
   *     return 'done';
   *   }
   * );
   * console.log(`Operation took ${duration}ms`);
   * ```
   */
  static async measureTime<T>(fn: (() => Promise<T>) | Promise<T>): Promise<[T, number]> {
    const startTime = process.hrtime();
    const promise = typeof fn === 'function' ? fn() : fn;
    const result = await promise;
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const duration = seconds * 1000 + nanoseconds / 1000000;
    return [result, duration];
  }
}