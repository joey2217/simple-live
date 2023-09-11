import { BrowserWindow, app } from 'electron'
import log from 'electron-log'
import { loadDevTools } from './dev'
import {
  beforeQuit,
  create as createMainWindow,
  focus as focusMainWindow,
} from './windows/main'
import handleIPC from './ipc'
import './menu'
import './tray'
import './proxy'

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到Window这个窗口
    focusMainWindow()
  })
  app.whenReady().then(() => {
    createMainWindow()
    handleIPC()
  })
}

if (import.meta.env.DEV) {
  loadDevTools()
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  } else {
    focusMainWindow()
  }
})

app.on('before-quit', beforeQuit)

// TODO mac 音乐控制
