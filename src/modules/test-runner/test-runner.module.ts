import { Module } from '@nestjs/common';
import { TestRunnerService } from './test-runner.service';
import { TestRunnerController } from './test-runner.controller';
import { HttpClientModule } from '../http-client/http-client.module';
import { MetricsModule } from '../metrics/metrics.module';
import { ResultsModule } from '../results/results.module';

@Module({
  imports: [HttpClientModule, MetricsModule, ResultsModule],
  providers: [TestRunnerService],
  controllers: [TestRunnerController],
  exports: [TestRunnerService],
})
export class TestRunnerModule {}