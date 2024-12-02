export class TestResult {
  testSuite: string;
  timestamp: string;
  environment: {
    nodeVersion: string;
    platform: string;
    cpuCores: number;
  };
  results: {
    [key: string]: {
      totalRequests: number;
      successfulRequests: number;
      failedRequests: number;
      timing: {
        minMs: number;
        maxMs: number;
        avgMs: number;
        percentiles: {
          p50: number;
          p90: number;
          p95: number;
          p99: number;
        };
      };
      parallelExecution?: {
        concurrentUsers: number;
        totalDurationMs: number;
      };
    };
  };

  constructor() {
    this.timestamp = new Date().toISOString();
    this.environment = {
      nodeVersion: process.version,
      platform: process.platform,
      cpuCores: require('os').cpus().length,
    };
    this.results = {};
  }
}