import * as yaml from 'yaml';
import * as fs from 'fs/promises';

export class ConfigUtil {
  static async loadConfig(configPath: string): Promise<any> {
    try {
      const fileContent = await fs.readFile(configPath, 'utf-8');
      return yaml.parse(fileContent);
    } catch (error) {
      throw new Error(`Failed to load config: ${error.message}`);
    }
  }

  static resolveEnvVars(config: any): any {
    const stringified = JSON.stringify(config);
    const resolved = stringified.replace(/\${([^}]+)}/g, (_, varName) => {
      return process.env[varName] || '';
    });
    return JSON.parse(resolved);
  }
}