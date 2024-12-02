export interface TestResult {
  testName: string;
  totalRequests: number;
  timing: {
    min: number;
    max: number;
    avg: number;
    percentiles: {
      p50: number;
      p90: number;
      p95: number;
      p99: number;
    };
  };
}