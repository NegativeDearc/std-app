'use strict'

const path = require('path');
import {app, protocol, BrowserWindow, Tray, Menu, nativeImage} from 'electron'
import {
    createProtocol,
    // installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let appTray = null;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true})

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({height: 800, width: 1200})

    if (isDevelopment) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadFile('index.html')
    }

    //系统托盘右键菜单
    const trayMenuTemplate = [
        {
            label: 'Quit',
            click: function () {
                app.quit()
            }
        }
    ];

    const trayIcon = path.join(__static, 'icons/app.png')
    appTray = new Tray(nativeImage.createFromPath(trayIcon));
    //图标的上下文菜单
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

    //设置此托盘图标的悬停提示内容
    appTray.setToolTip('A To Do App Made By MOVE');

    //设置此图标的上下文菜单
    appTray.setContextMenu(contextMenu);
    //单击右下角小图标显示应用
    appTray.on('click',function(){
        win.isVisible() ? win.hide() : win.show()
    })

    win.on('show', () => {
        win.setSkipTaskbar(true)
        if(process.platform === "darwin") {
            appTray.setHighlightMode('never')
        }
    })
    win.on('hide', () => {
        win.setSkipTaskbar(false)
        if(process.platform === "darwin") {
            appTray.setHighlightMode('selection')
        }
    })

    win.on('close', (e) => {
        if(win.isMinimized()){
            win = null;
        }else{
            e.preventDefault();
            win.minimize();
        }
    });

    win.on('closed', () => {
        win = null
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    // if (isDevelopment && !process.env.IS_TEST) {
    //   // Install Vue Devtools
    //   await installVueDevtools()
    // }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    process.on('message', data => {
        if (data === 'graceful-exit') {
            app.quit()
        }
    })
}
