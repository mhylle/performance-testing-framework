import { Injectable } from '@nestjs/common';
import { TestResult } from '../../models/test-result.model';

/**
 * Service for calculating and aggregating performance metrics.
 * Provides methods to process test results and calculate statistical measures.
 *
 * @example
 * ```typescript
 * const metricsService = new MetricsService();
 * const results = metricsService.aggregateMetrics('api_test', [100, 150, 200]);
 * ```
 */
@Injectable()
export class MetricsService {
  /**
   * Calculates a specific percentile from an array of numbers.
   * 
   * @param numbers - Array of numbers to calculate percentile from
   * @param percentile - Desired percentile (0-100)
   * @returns Calculated percentile value
   * @throws {Error} If input array is empty or percentile is invalid
   * 
   * @example
   * ```typescript
   * const p95 = metricsService.calculatePercentile([10, 20, 30, 40, 50], 95);
   * ```
   */
  calculatePercentile(numbers: number[], percentile: number): number {
    if (numbers.length === 0) {
      throw new Error('Cannot calculate percentile of empty array');
    }
    if (percentile < 0 || percentile > 100) {
      throw new Error('Percentile must be between 0 and 100');
    }

    const sorted = [...numbers].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }

  /**
   * Aggregates test metrics into a TestResult object.
   * Calculates various statistics including min, max, average, and percentiles.
   * 
   * @param testName - Name of the test case
   * @param durations - Array of request durations in milliseconds
   * @returns Aggregated test results
   * @throws {Error} If durations array is empty
   * 
   * @example
   * ```typescript
   * const durations = [100, 150, 200, 175, 225];
   * const results = metricsService.aggregateMetrics('api_test', durations);
   * console.log(results.timing.avgMs);
   * ```
   */
  aggregateMetrics(testName: string, durations: number[]): TestResult {
    if (durations.length === 0) {
      throw new Error('Cannot aggregate metrics from empty durations array');
    }

    const result = new TestResult();
    const successfulDurations = durations.filter(d => d >= 0);
    const failedCount = durations.length - successfulDurations.length;

    result.results[testName] = {
      totalRequests: durations.length,
      successfulRequests: successfulDurations.length,
      failedRequests: failedCount,
      timing: {
        minMs: Math.min(...successfulDurations),
        maxMs: Math.max(...successfulDurations),
        avgMs: successfulDurations.reduce((a, b) => a + b, 0) / successfulDurations.length,
        percentiles: {
          p50: this.calculatePercentile(successfulDurations, 50),
          p90: this.calculatePercentile(successfulDurations, 90),
          p95: this.calculatePercentile(successfulDurations, 95),
          p99: this.calculatePercentile(successfulDurations, 99),
        },
      },
    };

    return result;
  }
}