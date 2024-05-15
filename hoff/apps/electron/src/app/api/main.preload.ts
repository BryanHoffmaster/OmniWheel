import { contextBridge, ipcRenderer } from 'electron';
import { ElectronBridge } from "shared";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', <ElectronBridge>{
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
  sayHello: () => ipcRenderer.invoke('say-hello'),
  isDevMode: () => process.env.NODE_ENV === 'development',
  isProdMode: () => process.env.NODE_ENV === 'production',
  runCommand: (command: string) => ipcRenderer.invoke('run-command', command),
  openFile: (fileURI: string) => ipcRenderer.invoke('open-file', fileURI),

  getConfig: () => ipcRenderer.invoke('get-config'),
  setConfig: (data: string) => ipcRenderer.invoke('set-config', data),

  // The following are basic ways to setup a send/receive channel from the renderer to the main process
  send: (channel: string, ...data: unknown[]) => {
    // whitelist channels
    const validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel: string, func: (...args: unknown[]) => void) => {
    const validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
});
