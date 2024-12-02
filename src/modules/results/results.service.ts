import { Injectable } from '@nestjs/common';
import { TestResult } from '../../models/test-result.model';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Service responsible for managing test results persistence.
 * Handles saving and retrieving test results to/from the filesystem.
 *
 * @example
 * ```typescript
 * const resultsService = new ResultsService();
 * const filePath = await resultsService.saveResults(testResults);
 * ```
 */
@Injectable()
export class ResultsService {
  /** Directory where test results are stored */
  private readonly resultsDir = 'results';

  /**
   * Saves test results to a JSON file.
   * Creates a timestamped directory and stores results within it.
   * 
   * @param result - Test result object to save
   * @returns Path to the saved file
   * @throws {Error} If file creation or directory creation fails
   * 
   * @example
   * ```typescript
   * const testResult = new TestResult();
   * const filePath = await resultsService.saveResults(testResult);
   * console.log(`Results saved to: ${filePath}`);
   * ```
   */
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

  /**
   * Retrieves test results from a file.
   * 
   * @param resultPath - Path to the results file
   * @returns Parsed TestResult object
   * @throws {Error} If file reading or parsing fails
   * 
   * @example
   * ```typescript
   * const results = await resultsService.getResults('results/2024-12-02/test1.json');
   * console.log(results.testSuite);
   * ```
   */
  async getResults(resultPath: string): Promise<TestResult> {
    try {
      const content = await fs.readFile(resultPath, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read results: ${error.message}`);
    }
  }

  /**
   * Lists all available test results.
   * 
   * @returns Array of result file paths
   * @throws {Error} If directory reading fails
   * 
   * @example
   * ```typescript
   * const resultFiles = await resultsService.listResults();
   * for (const file of resultFiles) {
   *   console.log(`Found result file: ${file}`);
   * }
   * ```
   */
  async listResults(): Promise<string[]> {
    try {
      const entries = await fs.readdir(this.resultsDir, { withFileTypes: true });
      const resultFiles: string[] = [];

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const files = await fs.readdir(path.join(this.resultsDir, entry.name));
          resultFiles.push(...files.map(file => path.join(this.resultsDir, entry.name, file)));
        }
      }

      return resultFiles;
    } catch (error) {
      throw new Error(`Failed to list results: ${error.message}`);
    }
  }
}