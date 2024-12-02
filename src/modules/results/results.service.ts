import { Injectable } from '@nestjs/common';
import { TestResult } from '../../models/test-result.model';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ResultsService {
  private readonly resultsDir = 'results';

  async saveResults(result: TestResult): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const dirPath = path.join(this.resultsDir, timestamp);
    
    try {
      await fs.mkdir(dirPath, { recursive: true });
      const filePath = path.join(dirPath, 'results.json');
      await fs.writeFile(filePath, JSON.stringify(result, null, 2));
      return filePath;
    } catch (error) {
      throw new Error(`Failed to save results: ${error.message}`);
    }
  }

  async getResults(resultPath: string): Promise<TestResult> {
    try {
      const content = await fs.readFile(resultPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read results: ${error.message}`);
    }
  }
}