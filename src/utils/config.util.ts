import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { TestCase } from '../models/test-case.model';

export class ConfigUtil {
  static loadConfig(configPath: string): TestCase[] {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(fileContents) as any;

    return config.test_suite.tests.map(test => ({
      name: test.name,
      baseUrl: config.test_suite.base_url,
      endpoint: test.endpoint,
      method: test.method,
      headers: test.headers,
      parallelUsers: test.parallel_users,
      iterations: test.iterations,
      timeout: test.timeout
    }));
  }
}