import { Module } from '@nestjs/common';
import { TestRunnerModule } from './modules/test-runner/test-runner.module';
import { HttpClientModule } from './modules/http-client/http-client.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { ResultsModule } from './modules/results/results.module';

@Module({
  imports: [
    TestRunnerModule,
    HttpClientModule,
    MetricsModule,
    ResultsModule,
  ],
})
export class AppModule {}