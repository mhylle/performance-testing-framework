/**
 * Represents a single performance test case configuration.
 * This class defines all parameters needed to execute a performance test
 * against a specific API endpoint.
 *
 * @example
 * ```typescript
 * const testCase = new TestCase({
 *   name: 'Get User Profile',
 *   endpoint: 'https://api.example.com/users/1',
 *   method: 'GET',
 *   headers: { 'Authorization': 'Bearer token' },
 *   parallelUsers: 10,
 *   iterations: 100
 * });
 * ```
 */
export class TestCase {
  /** Unique identifier for the test case */
  name: string;

  /** Complete URL or endpoint path for the API call */
  endpoint: string;

  /** HTTP method to be used for the API call */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';

  /** Optional HTTP headers to be included in the request */
  headers?: Record<string, string>;

  /** Optional request body for POST/PUT requests */
  body?: any;

  /** Number of concurrent users/threads for parallel execution */
  parallelUsers?: number;

  /** Number of times to repeat the test */
  iterations?: number;

  /** Timeout in milliseconds for each request */
  timeout?: number;

  /**
   * Creates a new TestCase instance.
   * 
   * @param partial - Partial object containing test case properties
   * @throws {Error} If required fields (name, endpoint, method) are missing
   * 
   * @example
   * ```typescript
   * const testCase = new TestCase({
   *   name: 'API Test',
   *   endpoint: '/api/data',
   *   method: 'GET'
   * });
   * ```
   */
  constructor(partial: Partial<TestCase>) {
    if (!partial.name || !partial.endpoint || !partial.method) {
      throw new Error('TestCase requires name, endpoint, and method');
    }
    Object.assign(this, partial);
  }

  /**
   * Validates the test case configuration.
   * 
   * @returns {boolean} True if the configuration is valid
   * @throws {Error} If any validation rules are violated
   */
  validate(): boolean {
    if (this.parallelUsers && this.parallelUsers < 1) {
      throw new Error('parallelUsers must be greater than 0');
    }
    if (this.iterations && this.iterations < 1) {
      throw new Error('iterations must be greater than 0');
    }
    if (this.timeout && this.timeout < 0) {
      throw new Error('timeout must be non-negative');
    }
    return true;
  }
}