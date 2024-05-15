import { Injectable } from '@angular/core';
import { ElectronBridge } from "shared";


// TODO: this needs to be called "ElectronBridgeService" and have another
@Injectable({
  providedIn: 'root'
})
export class ShellServiceService {

  private electronBridge: ElectronBridge | null = null;

  constructor() {
    //@ts-expect-error 'electron' is the exposed API surface in main.preload.ts in the browser `window` object
    if (electron) {
      //@ts-expect-error 'electron' is the exposed API surface in main.preload.ts
      this.electronBridge = electron;
    } else {
      console.error('App not running inside Electron!');
    }
  }

  async runCommand(command: string) {
   const response = await this.electronBridge?.runCommand(command);
   console.log('response from runCommand:', response);
  }

  async sayHello () {
   const response =  await this.electronBridge?.sayHello()
   console.log('response from sayHello:', response);
  }

  openFile(fileURI: string){
    this.electronBridge?.openFile(fileURI);
  }
}
