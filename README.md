# Performance Testing Framework

A simple yet extensible performance testing framework for REST APIs.

## Features
- Single and parallel request execution
- Response time measurements
- Structured result logging
- Extensible architecture
- Real-time metrics calculation
- Support for parallel user simulation

## Getting Started

### Prerequisites
- Node.js (>= 16.x)
- npm (>= 8.x)

### Installation
```bash
git clone https://github.com/mhylle/performance-testing-framework.git
cd performance-testing-framework
npm install
```

### Configuration
Create a test configuration file in `config/test-config.yaml`:

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

### Running Tests
```bash
# Start the server
npm run start

# Run a single test
curl -X POST http://localhost:3000/test-runner/run -H "Content-Type: application/json" -d @config/test-config.yaml

# Run parallel tests
curl -X POST http://localhost:3000/test-runner/run-parallel -H "Content-Type: application/json" -d @config/test-config.yaml
```

## Architecture

The framework is built using NestJS and follows a modular architecture:

### Core Modules
- **TestRunnerModule**: Orchestrates test execution
- **HttpClientModule**: Handles HTTP communications
- **MetricsModule**: Calculates performance metrics
- **ResultsModule**: Manages test results storage

### Directory Structure
```
src/
├── modules/
│   ├── test-runner/
│   ├── http-client/
│   ├── metrics/
│   └── results/
├── models/
├── utils/
└── main.ts
```

## Development

### Running Tests
```bash
# unit tests
npm run test

# test coverage
npm run test:cov
```

### Code Style
```bash
# format code
npm run format

# lint code
npm run lint
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
MIT
