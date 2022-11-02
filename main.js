// npm install --save-dev electron-packager
// npx electron-packager . QuinyxClassic --icon "quinyx.icns" 

const {app, BrowserWindow, Menu} = require('electron');
const path = require('path')

let pluginName = null;
switch (process.platform) {
  case 'win32':
    app.quit();
    break
  case 'linux':
    app.quit();
    break
  case 'darwin':
    pluginName = 'PepperFlashPlayer.plugin'
    break
}
app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName));

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      plugins: true
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile(path.join(__dirname, 'index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  var menu = Menu.buildFromTemplate([
  {
    label: 'Quinyx Classic',
    submenu: [
      {
        label: 'New window',
        click() {
          createWindow();
        }
      },
      {
        label: 'Exit',
        click() {
          app.quit();
        }
      }
    ]
  }]);
  Menu.setApplicationMenu(menu);
})

app.on('window-all-closed', () => {
  app.quit()
})
