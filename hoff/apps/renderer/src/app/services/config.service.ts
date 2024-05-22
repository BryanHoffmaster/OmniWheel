import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ElectronBridge, Omniwheel, OmniwheelConfig } from 'shared'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configuration: OmniwheelConfig | null = null
  private electronBridge: ElectronBridge | null = null

  private _omniwheel: BehaviorSubject<Omniwheel> = new BehaviorSubject<Omniwheel>(new Omniwheel())
  omniwheel$ = this._omniwheel.asObservable()

  constructor() {
    //@ts-expect-error 'electron' is the exposed API surface in main.preload.ts in the browser `window` object
    if (electron) {
      //@ts-expect-error 'electron' is the exposed API surface in main.preload.ts
      this.electronBridge = electron
      this.getConfig()
    } else {
      console.error('App not running inside Electron!')
    }
  }

  async setConfig(config: OmniwheelConfig): Promise<void> {
    try {
      await this.electronBridge?.setConfig(JSON.stringify(config))
      this.configuration = config
    } catch (error) {
      console.error('Error writing the config.json file', error)
    }
  }

  async getConfig(): Promise<OmniwheelConfig | unknown> {
    try {
      console.info('checking if electron bridge exists...', this.electronBridge)
      const config = await this.electronBridge?.getConfig()
      if (!config) {
        console.error('Empty or No config file found in ConfigService.getConfig with data: ', config)
      } else {
        console.info('ConfigService.getConfig result : ', config)
        const parsedConfig = JSON.parse(config)
        const omniwheel = new Omniwheel(parsedConfig)
        this._omniwheel.next(omniwheel)
      }
      return config
    } catch (error) {
      console.error('Error reading the config.json file in ConfigService.getConfig', error)
      return null
    }
  }

  async randomizeNodeConfig(): Promise<void> {
    const randomHex = () => {
      // Random Hex color values
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    // make a copy of current omniwheel- update node color values and next the value
    const currentOmniwheel = this._omniwheel.getValue()
    const newOmniwheel = new Omniwheel(currentOmniwheel)
    newOmniwheel.nodes.forEach((node) => {
      node.bgColor = randomHex()
      node.textColor = randomHex()
    })

    this._omniwheel.next(newOmniwheel)
  }
}
