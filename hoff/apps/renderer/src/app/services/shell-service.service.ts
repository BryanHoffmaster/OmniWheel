import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

export interface ElectronBridge {
  ipcRenderer?: IpcRenderer,
  platform: Promise<string>;
  // These will need to be tested
  send(channel: string,...args: unknown[]): void;
  receive: (channel: string, func: (...args: unknown[]) => void) => void;
  invoke: (channel: string,...args: unknown[]) => Promise<unknown>;
  sendSync: (channel: string,...args: unknown[]) => unknown;
  sendToHost: (channel: string,...args: unknown[]) => void;
  postMessage: (channel: string,...args: unknown[]) => void;
  //  #######

  getAppVersion: () => Promise<string>;
  sayHello: () => Promise<void>;
  isDevMode: () => Promise<boolean>;
  isProdMode: () => Promise<boolean>;
  runCommand: (command: string) => Promise<void>;
  openFile: (fileURI: string) => Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class ShellServiceService {

  private electronBridge: ElectronBridge | null = null;

  // TODO: Figure out why __dirname was throwing in the electron 'nodeModules' that was being imported here
  //       and see if you can expose that information to the imported service from the Nx project on build.
  //       Could be fruitless endeavor.

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
