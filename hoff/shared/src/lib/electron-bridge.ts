
/**
 * This serves as a shared interface between the electron bridge APIs and
 * the apps that will consume them.
 */
export interface ElectronBridge {
  platform: string;
  // These will need to be tested
  send(channel: string,...data: unknown[]): void;
  receive: (channel: string, func: (...args: unknown[]) => void) => void;
  // invoke: (channel: string,...args: unknown[]) => Promise<unknown>;
  // sendSync: (channel: string,...args: unknown[]) => unknown;
  // sendToHost: (channel: string,...args: unknown[]) => void;
  // postMessage: (channel: string,...args: unknown[]) => void;
  //  #######

  /** Returns a Promise with the raw configuration JSON data. */
  getConfig: () => Promise<string>;

  /** Pass along the raw configuration JSON data to save it to a local file. */
  setConfig: (data: string) => Promise<void>;
  getAppVersion: ()=> Promise<string>;
  sayHello: ()=> Promise<string>;
  isDevMode: () => boolean;
  isProdMode: () => boolean;
  runCommand: (command: string) => Promise<void>;
  openFile: (fileURI: string) => Promise<void>;
}
