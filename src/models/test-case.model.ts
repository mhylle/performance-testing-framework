export class TestCase {
  name: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  parallelUsers?: number;
  iterations?: number;
  timeout?: number;

  constructor(partial: Partial<TestCase>) {
    Object.assign(this, partial);
  }
}