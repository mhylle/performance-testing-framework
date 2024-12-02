export interface TestCase {
  name: string;
  baseUrl: string;
  endpoint: string;
  method: string;
  headers?: Record<string, string>;
  parallelUsers?: number;
  iterations?: number;
  timeout?: number;
}