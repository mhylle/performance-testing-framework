import { Test, TestingModule } from '@nestjs/testing';
import { TestRunnerService } from './test-runner.service';
import { HttpClientService } from '../http-client/http-client.service';
import { MetricsService } from '../metrics/metrics.service';
import { ResultsLoggerService } from '../results/results.service';

describe('TestRunnerService', () => {
  let service: TestRunnerService;
  let httpClientService: HttpClientService;
  let metricsService: MetricsService;
  let resultsLoggerService: ResultsLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestRunnerService,
        {
          provide: HttpClientService,
          useValue: {
            request: jest.fn(),
          },
        },
        {
          provide: MetricsService,
          useValue: {
            aggregateMetrics: jest.fn(),
          },
        },
        {
          provide: ResultsLoggerService,
          useValue: {
            logResult: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TestRunnerService>(TestRunnerService);
    httpClientService = module.get<HttpClientService>(HttpClientService);
    metricsService = module.get<MetricsService>(MetricsService);
    resultsLoggerService = module.get<ResultsLoggerService>(ResultsLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('run', () => {
    it('should execute a single test case', async () => {
      const testCase = {
        name: 'Test API',
        baseUrl: 'http://api.test',
        endpoint: '/users',
        method: 'GET',
        timeout: 30,
      };

      const mockResponse = { data: {}, status: 200 };
      const mockDuration = 100;

      (httpClientService.request as jest.Mock).mockResolvedValue({
        response: mockResponse,
        duration: mockDuration,
      });

      await service.run(testCase);

      expect(httpClientService.request).toHaveBeenCalledWith({
        method: testCase.method,
        url: `${testCase.baseUrl}${testCase.endpoint}`,
        headers: undefined,
        timeout: testCase.timeout * 1000,
      });
    });
  });
});