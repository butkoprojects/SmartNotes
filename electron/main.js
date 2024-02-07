const { app, BrowserWindow, screen: electronScreen } = require('electron');
// const { installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const isDev = require('electron-is-dev');
const path = require('path');
let child = null;

const createMainWindow = () => {
  let mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: false,
      devTools: isDev
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // 'build/index.html'
    mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    // spawn java child process running backend jar
  }

  console.log('attempt to start server')
  const jarPath = isDev 
    ? '/Users/ybutko/Documents/Projects/smart-notes/backend/SmartNotes-0.0.1-SNAPSHOT.jar'
    : path.join(process.resourcesPath, '/SmartNotes-0.0.1-SNAPSHOT.jar');
  child = require('child_process').spawn('java', ['-Dspring.profiles.active=desktop', '-jar', jarPath]);

  if (child) {
    child.stdout.on('data',
        function (data) {
            console.log('output: ' + data);
        });
    child.stderr.on('data', function (data) {
        //throw errors
        console.log('err: ' + data);
    });
    console.log('started')
  }

  mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    // @ts-ignore
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (child) {
    child.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
