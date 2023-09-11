import { BrowserWindow, dialog } from 'electron'
import log from 'electron-log'
import * as path from 'path'
import type { OpenDialogOptions } from 'electron'

let win: BrowserWindow = null!

let quit = false

export function create() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#fff',
      symbolColor: '#4f46e5',
      height: 40,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: import.meta.env.PROD,
    },
  })
  win.once('ready-to-show', () => {
    win.show()
    // win.webContents.openDevTools({ mode: 'bottom' })
  })

  win.on('close', (e) => {
    if (!quit) {
      e.preventDefault()
      win.hide()
    }
  })

  if (import.meta.env.DEV) {
    win.loadURL('http://localhost:5174')
  } else {
    win.loadFile(path.join(__dirname, 'renderer/index.html'))
  }
}

export function focus() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
  }
}

export function send(channel: string, ...args: any[]) {
  win.webContents.send(channel, ...args)
}

export function showOpenDialog(options: OpenDialogOptions) {
  return dialog.showOpenDialog(win, options)
}

export function setMainTitleBarOverlay(
  options: Electron.TitleBarOverlayOptions
) {
  if (win) {
    win.setTitleBarOverlay(options)
  }
}

 
export function beforeQuit() {
  quit = true
}

export function mainNavigate(to: string) {
  send('NAVIGATE', to)
}
