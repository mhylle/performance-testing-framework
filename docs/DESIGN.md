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
- Make REST API calls using NestJS HTTP module
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

## Test Configuration Format (Unchanged)
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

## Result Structure (Unchanged)
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

## Initial Implementation Plan

### Phase 1: Core NestJS Setup
1. Initialize NestJS project with TypeScript
2. Set up core modules and dependency injection
3. Implement HTTP client service
4. Create basic test runner

### Phase 2: Feature Implementation
1. Add metrics collection using RxJS
2. Implement parallel execution using scheduling
3. Add configuration support
4. Implement results logging

### Phase 3: Future Expansion (Planned)
1. Add support for different protocols
2. Implement resource monitoring
3. Create visualization capabilities
4. Add distributed load testing support

## Usage Example
```typescript
import { TestRunner } from './modules/test-runner/test-runner.service';
import { TestCase } from './models/test-case.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  constructor(private readonly testRunner: TestRunner) {}

  async runTest() {
    const testCase = new TestCase({
      name: "Get User Profile",
      endpoint: "https://api.example.com/users/profile",
      method: "GET",
      headers: { Authorization: "Bearer token" },
      parallelUsers: 10,
      iterations: 100
    });

    const results = await this.testRunner.run(testCase);
    console.log(`Average response time: ${results.timing.avg_ms}ms`);
    console.log(`95th percentile: ${results.timing.percentiles.p95}ms`);
  }
}
```

## Best Practices
1. Follow NestJS best practices and conventions
2. Use dependency injection for loose coupling
3. Implement proper error handling and timeouts
4. Use TypeScript types and interfaces
5. Follow SOLID principles
6. Regular cleanup of old test results
7. Monitor system resources during tests

## Error Handling
- Use NestJS exception filters
- Implement retry strategies
- Handle timeout scenarios
- Proper resource cleanup
- Parallel execution error handling

## Security Considerations
1. Use environment variables for credentials
2. Implement proper request sanitization
3. Use rate limiting and throttling
4. Implement access control
5. Follow OWASP security guidelines

## Development Setup
1. Prerequisites:
   - Node.js 18+
   - npm or yarn
   - TypeScript

2. Installation:
```bash
npm install
```

3. Running tests:
```bash
npm run test
```

4. Building:
```bash
npm run build
```