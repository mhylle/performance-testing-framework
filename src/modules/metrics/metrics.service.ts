import { Injectable } from '@nestjs/common';
import { TestResult } from '../../models/test-result.model';

@Injectable()
export class MetricsService {
  calculatePercentile(numbers: number[], percentile: number): number {
    const sorted = [...numbers].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }

  aggregateMetrics(testName: string, durations: number[]): TestResult {
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