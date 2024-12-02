import { Injectable } from '@nestjs/common';
import { TestResult } from '../../models/test-result.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ResultsLoggerService {
  private readonly resultsDir = 'results';

  constructor() {
    this.ensureResultsDirectory();
  }

  private ensureResultsDirectory(): void {
    if (!fs.existsSync(this.resultsDir)) {
      fs.mkdirSync(this.resultsDir, { recursive: true });
    }
  }

  async logResult(testName: string, result: TestResult): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:]/g, '-');
    const fileName = `${testName}-${timestamp}.json`;
    const filePath = path.join(this.resultsDir, fileName);

    const resultWithMetadata = {
      ...result,
      timestamp,
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        cpuCores: require('os').cpus().length
      }
    };

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(resultWithMetadata, null, 2)
    );
  }
}