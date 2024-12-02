# Performance Testing Framework Design Document

## Overview
This document outlines the design for a simple yet extensible performance testing framework focused on REST APIs, implemented using NestJS. The framework will initially support basic performance measurements with the ability to expand functionality in future iterations.

## Core Components

### 1. Test Runner Module (`TestRunnerModule`)
Primary responsibility: Orchestrate the execution of performance tests
- Initialize test configurations through dependency injection
- Execute single and parallel test runs using NestJS scheduling
- Collect and aggregate results
- Handle test lifecycle (setup, execution, teardown)
- Implements `@Injectable()` for DI support

### 2. HTTP Client Service (`HttpClientService`)
Primary responsibility: Handle HTTP communications
- Make REST API calls using Axios
- Support different HTTP methods (GET, POST, PUT, DELETE)
- Handle headers and authentication
- Measure response times
- Handle timeouts and retries
- Implements `@Injectable()` for DI support

### 3. Performance Metrics Service (`MetricsService`)
Primary responsibility: Gather and calculate performance metrics
- Record individual request times using RxJS
- Calculate statistics (min, max, average, percentiles)
- Track parallel execution metrics
- Monitor system resources (future expansion)
- Implements `@Injectable()` for DI support

### 4. Results Logger Service (`ResultsLoggerService`)
Primary responsibility: Store test results
- Write results to disk in structured format (JSON)
- Create timestamped test runs
- Organize results by test suite/case
- Support different output formats (future expansion)
- Implements `@Injectable()` for DI support

## Directory Structure
```
src/
├── modules/
│   ├── test-runner/
│   │   ├── test-runner.module.ts
│   │   ├── test-runner.service.ts
│   │   └── test-runner.controller.ts
│   ├── http-client/
│   │   ├── http-client.module.ts
│   │   └── http-client.service.ts
│   ├── metrics/
│   │   ├── metrics.module.ts
│   │   └── metrics.service.ts
│   └── results/
│       ├── results.module.ts
│       └── results.service.ts
├── models/
│   ├── test-case.model.ts
│   └── test-result.model.ts
├── utils/
│   ├── config.util.ts
│   └── time.util.ts
├── app.module.ts
└── main.ts
test/
├── e2e/
└── unit/
results/
└── [timestamp]/
config/
└── test-config.yaml
```

## Test Configuration Format
```yaml
test_suite:
  name: "API Performance Test Suite"
  base_url: "https://api.example.com"
  tests:
    - name: "Get User Profile"
      endpoint: "/users/profile"
      method: "GET"
      headers:
        Authorization: "Bearer ${TOKEN}"
      parallel_users: 10
      iterations: 100
      timeout: 30
```

## Result Structure
```json
{
  "test_suite": "API Performance Test Suite",
  "timestamp": "2024-12-02T10:00:00Z",
  "environment": {
    "node_version": "18.12.0",
    "platform": "Linux",
    "cpu_cores": 8
  },
  "results": {
    "get_user_profile": {
      "total_requests": 1000,
      "successful_requests": 998,
      "failed_requests": 2,
      "timing": {
        "min_ms": 45,
        "max_ms": 890,
        "avg_ms": 120,
        "percentiles": {
          "p50": 115,
          "p90": 200,
          "p95": 250,
          "p99": 400
        }
      },
      "parallel_execution": {
        "concurrent_users": 10,
        "total_duration_ms": 12000
      }
    }
  }
}
```

## Implementation Details

### Core Services Implementation

#### TestRunnerService
```typescript
@Injectable()
export class TestRunnerService {
  constructor(
    private readonly httpClient: HttpClientService,
    private readonly metrics: MetricsService,
    private readonly results: ResultsService,
  ) {}

  async run(testCase: TestCase): Promise<TestResult> {
    // Single test execution
  }

  async runParallel(testCase: TestCase): Promise<TestResult> {
    // Parallel test execution
  }
}
```

#### HttpClientService
```typescript
@Injectable()
export class HttpClientService {
  async request(config: AxiosRequestConfig): Promise<{ response: AxiosResponse; duration: number }> {
    // HTTP request execution with timing
  }
}
```

#### MetricsService
```typescript
@Injectable()
export class MetricsService {
  calculatePercentile(numbers: number[], percentile: number): number {
    // Percentile calculation
  }

  aggregateMetrics(testName: string, durations: number[]): TestResult {
    // Metrics aggregation
  }
}
```

### Test Execution Flow
1. Load test configuration
2. Initialize services through DI
3. Execute test cases:
   - Single execution: Sequential requests
   - Parallel execution: Concurrent requests using RxJS
4. Collect metrics during execution
5. Aggregate results
6. Store results to disk

### Error Handling Strategy
1. Request Level
   - Timeout handling
   - Retry logic
   - Error response tracking

2. Test Level
   - Invalid configuration handling
   - Resource cleanup
   - Parallel execution failures

3. System Level
   - Resource monitoring
   - Process crashes
   - File system errors

## Security Considerations
1. Data Handling
   - Secure storage of credentials
   - Sanitization of logged data
   - Encryption of sensitive data

2. Execution Safety
   - Rate limiting
   - Resource quotas
   - Access control

3. Configuration Security
   - Environment variable protection
   - Secure config file handling
   - Audit logging

## Best Practices
1. Development
   - Follow NestJS conventions
   - Use TypeScript features
   - Implement comprehensive tests
   - Document all components

2. Testing
   - Include timeout configurations
   - Implement proper cleanup
   - Use meaningful test names
   - Monitor system resources

3. Deployment
   - Version control configurations
   - Regular cleanup of results
   - Monitor disk usage
   - Backup important data

## Future Enhancements
1. Additional Features
   - WebSocket testing support
   - Custom metric collection
   - Real-time monitoring
   - Report generation

2. Performance Improvements
   - Caching mechanisms
   - Stream processing
   - Result compression
   - Distributed testing

3. Integration Options
   - CI/CD pipeline integration
   - Alert system integration
   - Dashboard integration
   - External monitoring tools
