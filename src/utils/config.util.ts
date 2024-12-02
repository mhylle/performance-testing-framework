import * as yaml from 'yaml';
import * as fs from 'fs/promises';

/**
 * Utility class for handling configuration loading and processing.
 * Provides methods to load YAML configurations and resolve environment variables.
 *
 * @example
 * ```typescript
 * const config = await ConfigUtil.loadConfig('config.yaml');
 * const resolvedConfig = ConfigUtil.resolveEnvVars(config);
 * ```
 */
export class ConfigUtil {
  /**
   * Loads and parses a YAML configuration file.
   * 
   * @param configPath - Path to the YAML configuration file
   * @returns Parsed configuration object
   * @throws {Error} If file reading or parsing fails
   * 
   * @example
   * ```typescript
   * const config = await ConfigUtil.loadConfig('./config/test-config.yaml');
   * ```
   */
  static async loadConfig(configPath: string): Promise<any> {
    try {
      const fileContent = await fs.readFile(configPath, 'utf-8');
      return yaml.parse(fileContent);
    } catch (error) {
      throw new Error(`Failed to load config: ${error.message}`);
    }
  }

  /**
   * Resolves environment variables in configuration values.
   * Replaces ${VAR_NAME} patterns with corresponding environment variable values.
   * 
   * @param config - Configuration object with potential environment variables
   * @returns Configuration with resolved variables
   * @throws {Error} If parsing of the stringified config fails
   * 
   * @example
   * ```typescript
   * const config = { url: 'https://${API_HOST}/v1' };
   * const resolved = ConfigUtil.resolveEnvVars(config);
   * // If API_HOST=api.example.com, result will be:
   * // { url: 'https://api.example.com/v1' }
   * ```
   */
  static resolveEnvVars(config: any): any {
    try {
      const stringified = JSON.stringify(config);
      const resolved = stringified.replace(/\${([^}]+)}/g, (_, varName) => {
        const value = process.env[varName];
        if (value === undefined) {
          console.warn(`Environment variable ${varName} is not defined`);
          return '';
        }
        return value;
      });
      return JSON.parse(resolved);
    } catch (error) {
      throw new Error(`Failed to resolve environment variables: ${error.message}`);
    }
  }

  /**
   * Validates a configuration object against required fields.
   * 
   * @param config - Configuration object to validate
   * @param requiredFields - Array of required field paths (dot notation)
   * @throws {Error} If any required field is missing
   * 
   * @example
   * ```typescript
   * const config = { test: { name: 'Test1', url: 'http://api.com' } };
   * ConfigUtil.validateConfig(config, ['test.name', 'test.url']);
   * ```
   */
  static validateConfig(config: any, requiredFields: string[]): void {
    for (const field of requiredFields) {
      const value = field.split('.').reduce((obj, key) => obj?.[key], config);
      if (value === undefined) {
        throw new Error(`Missing required configuration field: ${field}`);
      }
    }
  }
}