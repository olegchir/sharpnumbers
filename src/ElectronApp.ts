// tslint:disable/tslint:enable awaits you
import { app, BrowserWindow } from 'electron';

import main from './Main';
import * as url from 'url';
import * as path from 'path';

export class ElectronApp {
  public mainWindow:BrowserWindow
  public app:Electron.App

  constructor () {
    this.app = app
  }

  createWindow () { 
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })

    this.mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
    
    this.mainWindow.webContents.openDevTools()

    this.mainWindow.on('closed', function () {
      this.mainWindow = null
    })
  }
}
