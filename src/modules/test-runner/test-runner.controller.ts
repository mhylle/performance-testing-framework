import { Controller, Post, Body, Get } from '@nestjs/common';
import { TestRunnerService } from './test-runner.service';
import { TestCase } from '../../models/test-case.model';

@Controller('test-runner')
export class TestRunnerController {
  constructor(private readonly testRunner: TestRunnerService) {}

  @Post('run')
  async runTest(@Body() testCase: TestCase) {
    return this.testRunner.run(testCase);
  }

  @Post('run-parallel')
  async runParallelTest(@Body() testCase: TestCase) {
    return this.testRunner.runParallel(testCase);
  }

  @Get('health')
  async healthCheck() {
    return { status: 'ok' };
  }
}