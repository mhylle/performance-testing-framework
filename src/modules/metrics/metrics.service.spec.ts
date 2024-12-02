import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsService],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculatePercentile', () => {
    it('should calculate percentiles correctly', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      
      expect(service.calculatePercentile(numbers, 0.5)).toBe(5.5); // 50th percentile (median)
      expect(service.calculatePercentile(numbers, 0.9)).toBe(9.1); // 90th percentile
    });
  });

  describe('aggregateMetrics', () => {
    it('should aggregate metrics correctly', () => {
      const testName = 'Test API';
      const durations = [100, 150, 200, 250, 300];

      const result = service.aggregateMetrics(testName, durations);

      expect(result).toEqual({
        testName,
        totalRequests: 5,
        timing: {
          min: 100,
          max: 300,
          avg: 200,
          percentiles: {
            p50: 200,
            p90: 280,
            p95: 290,
            p99: 298
          }
        }
      });
    });
  });
});