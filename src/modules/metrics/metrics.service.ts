import { Injectable } from '@nestjs/common';
import { TestResult } from '../../models/test-result.model';

@Injectable()
export class MetricsService {
  calculatePercentile(numbers: number[], percentile: number): number {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const pos = (sorted.length - 1) * percentile;
    const base = Math.floor(pos);
    const rest = pos - base;
    
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
      return sorted[base];
    }
  }

  aggregateMetrics(testName: string, durations: number[]): TestResult {
    const sortedDurations = durations.slice().sort((a, b) => a - b);
    
    return {
      testName,
      totalRequests: durations.length,
      timing: {
        min: Math.min(...durations),
        max: Math.max(...durations),
        avg: durations.reduce((a, b) => a + b, 0) / durations.length,
        percentiles: {
          p50: this.calculatePercentile(sortedDurations, 0.5),
          p90: this.calculatePercentile(sortedDurations, 0.9),
          p95: this.calculatePercentile(sortedDurations, 0.95),
          p99: this.calculatePercentile(sortedDurations, 0.99)
        }
      }
    };
  }
}