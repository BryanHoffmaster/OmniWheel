/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { exec } from 'child_process';
import { app, ipcMain, shell } from 'electron';
import { environment } from '../../environments/environment';
import ConfigService from '../services/config-service';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', () => {
  console.log(`Fetching application version... [v${environment.version}]`);

  return environment.version;
});

// We need commands to interact with the config service CRUD operations
ipcMain.handle('get-config', async () => {
  console.log(`config data: ${ConfigService.jsonData}`);
  if (!ConfigService.jsonData) {
    await ConfigService.loadConfig();
    return ConfigService.jsonData;
  }
});

ipcMain.handle('set-config', async (event, data: string) => {
  console.log(`config data: ${data}`);
  await ConfigService.saveConfig(data);
  return ConfigService.jsonData;
});

// TODO: in the future handle this async with a promise and use the event.reply, and a signal (in exec properties) to call back to the frontend

ipcMain.handle('run-command', (event, command: string) => {
  console.log('Running command: ', command);
  //! NEVER PASS THIS COMMAND UNSANITIZED DATA
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return error;
    } else if (stderr) {
      console.error(`stderr: ${stderr}`);
      return stderr;
    } else if (stdout) {
      console.log(`stdout: ${stdout}`);
      return stdout;
    }
  });

  // Using `spawn` you can do similar things as well, for now exec will do.
  // const child = spawn(command, { shell: true });
  // child.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });
});

ipcMain.handle('say-hello', () => {
  console.log('Hello from WITHIN Electron!');
  return 'Hello FROM Electron!';
});

// Attempt to open a file in the file explorer
ipcMain.handle('open-file', (event, file) => {
  console.log('Opening file manager with file URI : ', file);
  shell.showItemInFolder(file);
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
