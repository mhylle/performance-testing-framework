/**
 * Represents the results of a performance test execution.
 * This class contains all metrics and measurements collected during
 * test execution, including timing statistics and error counts.
 *
 * @example
 * ```typescript
 * const result = new TestResult();
 * result.addTestResults('api_test', {
 *   totalRequests: 100,
 *   successfulRequests: 98,
 *   failedRequests: 2,
 *   timing: { ... }
 * });
 * ```
 */
export class TestResult {
  /** Name of the test suite */
  testSuite: string;

  /** ISO timestamp when the test was executed */
  timestamp: string;

  /** Information about the execution environment */
  environment: {
    /** Node.js version used for test execution */
    nodeVersion: string;
    /** Operating system platform */
    platform: string;
    /** Number of CPU cores available */
    cpuCores: number;
  };

  /** Collection of test results keyed by test name */
  results: {
    [key: string]: {
      /** Total number of requests executed */
      totalRequests: number;
      /** Number of successful requests */
      successfulRequests: number;
      /** Number of failed requests */
      failedRequests: number;
      /** Timing statistics for the requests */
      timing: {
        /** Minimum response time in milliseconds */
        minMs: number;
        /** Maximum response time in milliseconds */
        maxMs: number;
        /** Average response time in milliseconds */
        avgMs: number;
        /** Response time percentiles */
        percentiles: {
          /** 50th percentile (median) response time */
          p50: number;
          /** 90th percentile response time */
          p90: number;
          /** 95th percentile response time */
          p95: number;
          /** 99th percentile response time */
          p99: number;
        };
      };
      /** Optional parallel execution statistics */
      parallelExecution?: {
        /** Number of concurrent users/threads */
        concurrentUsers: number;
        /** Total test execution duration in milliseconds */
        totalDurationMs: number;
      };
    };
  };

  /**
   * Creates a new TestResult instance with basic environment information.
   * 
   * @example
   * ```typescript
   * const result = new TestResult();
   * console.log(result.environment.nodeVersion);
   * ```
   */
  constructor() {
    this.timestamp = new Date().toISOString();
    this.environment = {
      nodeVersion: process.version,
      platform: process.platform,
      cpuCores: require('os').cpus().length,
    };
    this.results = {};
  }

  /**
   * Adds test results for a specific test case.
   * 
   * @param testName - Name of the test case
   * @param results - Results data for the test case
   * @throws {Error} If results for the test name already exist
   * 
   * @example
   * ```typescript
   * result.addTestResults('api_test', {
   *   totalRequests: 100,
   *   successfulRequests: 98,
   *   failedRequests: 2,
   *   timing: {
   *     minMs: 10,
   *     maxMs: 200,
   *     avgMs: 50,
   *     percentiles: { p50: 45, p90: 150, p95: 180, p99: 190 }
   *   }
   * });
   * ```
   */
  addTestResults(testName: string, results: any): void {
    if (this.results[testName]) {
      throw new Error(`Results for test '${testName}' already exist`);
    }
    this.results[testName] = results;
  }

  /**
   * Serializes the test results to a JSON string.
   * 
   * @returns {string} JSON string representation of the results
   * 
   * @example
   * ```typescript
   * const jsonResults = result.toJSON();
   * fs.writeFileSync('results.json', jsonResults);
   * ```
   */
  toJSON(): string {
    return JSON.stringify(this, null, 2);
  }
}