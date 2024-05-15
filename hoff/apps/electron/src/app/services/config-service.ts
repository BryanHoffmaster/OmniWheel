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
        console.error(
          `Empty config file found in ConfigService.loadConfig with data: `,
          config
        );
        return ConfigService.config;
      }

      ConfigService.config = JSON.parse(config) as OmniwheelConfig;
      return ConfigService.config;
    } catch (error) {
      console.error('Error loading file in ConfigService.loadConfig : ', error);
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
      console.error(
        'Error writing the config.json file in ConfigService.saveConfig : ',
        error
      );
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

  private static loadConfigFromFile(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(ConfigService.configPath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  private static loadDefaultConfig(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, 'assets/default.config.json'),
        'utf-8',
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
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
      const rawData = await this.loadDefaultConfig();
      ConfigService.jsonData = rawData;
      ConfigService.config = JSON.parse(rawData) as OmniwheelConfig;
      console.log(
        'ServiceConfig.setDefaultConfig configuration loaded with data : ',
        ConfigService.config
      );
    } catch (error) {
      console.error(
        'Error setting the default-config.json file in ConfigService.setDefaultConfig : ',
        error
      );
    }
  }

  static async buildInstance(): Promise<ConfigService> {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }

    try {
      console.log('checking if file exists...');
      await ConfigService.checkFileExists();
      console.info(
        'Config file already exists in ConfigService.buildInstance, pulling in data...'
      );
      await ConfigService.loadConfig();
    } catch (error) {
      console.info(
        'No config file exists, generating default one in ConfigService.buildInstance :'
      );
      await ConfigService.setDefaultConfig();
    }

    return this.instance;
  }
}

export default ConfigService;
