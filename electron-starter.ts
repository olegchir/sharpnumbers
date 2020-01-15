import { ElectronApp } from './ElectronApp'

export function start():void {
    const controller = new ElectronApp();
    const app = controller.app;

    app.on('ready', controller.createWindow);

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
          app.quit()
      }
    })

    app.on('activate', function () {
      if (controller.mainWindow === null) {
          controller.createWindow()
      }
    })
}