import { Module } from '@nestjs/common';
import { TestRunnerService } from './test-runner.service';
import { HttpClientModule } from '../http-client/http-client.module';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [HttpClientModule, MetricsModule],
  providers: [TestRunnerService],
  exports: [TestRunnerService],
})
export class TestRunnerModule {}