import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../http-client/http-client.service';
import { MetricsService } from '../metrics/metrics.service';
import { ResultsLoggerService } from '../results/results.service';
import { TestCase } from '../../models/test-case.model';
import { TestResult } from '../../models/test-result.model';

@Injectable()
export class TestRunnerService {
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly metrics: MetricsService,
    private readonly results: ResultsLoggerService,
  ) {}

  async run(testCase: TestCase): Promise<TestResult> {
    const startTime = Date.now();
    const response = await this.httpClient.request({
      method: testCase.method,
      url: `${testCase.baseUrl}${testCase.endpoint}`,
      headers: testCase.headers,
      timeout: testCase.timeout * 1000,
    });

    const duration = Date.now() - startTime;
    const result = this.metrics.aggregateMetrics(testCase.name, [duration]);
    
    await this.results.logResult(testCase.name, result);
    return result;
  }

  async runParallel(testCase: TestCase): Promise<TestResult> {
    const durations: number[] = [];
    const promises = Array(testCase.parallelUsers).fill(null).map(() => this.run(testCase));
    
    const results = await Promise.all(promises);
    results.forEach(result => durations.push(result.timing.duration));
    
    const aggregateResult = this.metrics.aggregateMetrics(testCase.name, durations);
    await this.results.logResult(testCase.name, aggregateResult);
    
    return aggregateResult;
  }
}