import { Injectable } from '@angular/core';
import { ElectronBridge, OmniwheelConfig } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configuration: OmniwheelConfig | null = null;
  electronBridge: ElectronBridge | null = null;

  constructor() {
    //@ts-expect-error 'electron' is the exposed API surface in main.preload.ts in the browser `window` object
    if (electron) {
      //@ts-expect-error 'electron' is the exposed API surface in main.preload.ts
      this.electronBridge = electron;
      this.getConfig();
    } else {
      console.error('App not running inside Electron!');
    }
  }

  async setConfig(config: OmniwheelConfig): Promise<void> {
    try {
      await this.electronBridge?.setConfig(JSON.stringify(config));
      this.configuration = config;
    } catch (error) {
      console.error('Error writing the config.json file', error);
    }
  }

  async getConfig(): Promise<OmniwheelConfig | unknown> {
    try {
      console.info('checking if electron bridge exists...', this.electronBridge);
      const config = await this.electronBridge?.getConfig();
      if (!config) {
        console.error(
          'Empty or No config file found in ConfigService.getConfig with data: ',
          config
        );
      } else {
        this.configuration = JSON.parse(config) as OmniwheelConfig;
        console.info('ConfigService.getConfig result : ', config);
      }
      return config;
    } catch (error) {
      console.error(
        'Error reading the config.json file in ConfigService.getConfig',
        error
      );
      return null;
    }
  }
}
