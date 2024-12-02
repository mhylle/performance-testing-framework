import { Module } from '@nestjs/common';
import { ResultsLoggerService } from './results.service';

@Module({
  providers: [ResultsLoggerService],
  exports: [ResultsLoggerService],
})
export class ResultsModule {}