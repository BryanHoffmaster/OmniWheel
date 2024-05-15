// Build a set of functions that can perform CRUD operations on a local configuration file, using nodeJS APIs

import * as fs from 'fs';
import * as path from 'path';
import { OmniwheelConfig } from 'shared';

class ConfigService {
  static instance: ConfigService = null;
  static config: OmniwheelConfig = null;
  static configPath = path.join(__dirname, '../config.json');
  static jsonData = '';

  constructor() {
    if (!ConfigService.instance) {
      ConfigService.instance = this;
    }
  }

  static async loadConfig(): Promise<OmniwheelConfig> {
    try {
      const config = await this.loadConfigFromFile();

      if (!config) {
        throw new Error('Empty or No config file found');
      }

      ConfigService.config = config;
      return ConfigService.config;
    } catch (error) {
      console.error('Error reading the config.json file', error);
      return null;
    }
  }

  static async saveConfig(config: string): Promise<void> {
    try {
      ConfigService.jsonData = config;
      const parsedData = JSON.parse(config) as OmniwheelConfig;
      ConfigService.config = parsedData;
      await this.saveConfigToFile(parsedData);
    } catch (error) {
      console.error('Error writing the config.json file', error);
    }
  }

  private static saveConfigToFile(config: OmniwheelConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        ConfigService.configPath,
        JSON.stringify(config),
        'utf-8',
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  private static loadConfigFromFile(): Promise<OmniwheelConfig> {
    return new Promise((resolve, reject) => {
      fs.readFile(ConfigService.configPath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          ConfigService.jsonData = data;
          resolve(JSON.parse(data));
        }
      });
    });
  }

  private static loadDefaultConfig(): Promise<OmniwheelConfig> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../default-config.json'),
        'utf-8',
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  private static async checkFileExists(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.access(ConfigService.configPath, fs.constants.F_OK, (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  private static async setDefaultConfig(): Promise<void> {
    try {
      await this.loadDefaultConfig();
    } catch (error) {
      console.error('Error setting the default-config.json file', error);
    }
  }

  static async buildInstance(): Promise<ConfigService> {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }

    const fileExists = await ConfigService.checkFileExists();
    if (!fileExists) {
      await ConfigService.setDefaultConfig();
    }

    return this.instance;
  }
}

export default ConfigService;
