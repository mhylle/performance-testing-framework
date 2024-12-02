import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../http-client/http-client.service';
import { MetricsService } from '../metrics/metrics.service';
import { TestCase } from '../../models/test-case.model';
import { TestResult } from '../../models/test-result.model';

@Injectable()
export class TestRunnerService {
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly metricsService: MetricsService,
  ) {}

  async run(testCase: TestCase): Promise<TestResult> {
    // Implementation coming in next phase
    return new TestResult();
  }

  async runParallel(testCase: TestCase, parallel: number): Promise<TestResult> {
    // Implementation coming in next phase
    return new TestResult();
  }
}