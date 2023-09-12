import { BrowserWindow } from 'electron'
import * as path from 'path'

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
    if (import.meta.env.DEV) {
      win.webContents.openDevTools({ mode: 'bottom' })
    }
  })

  // win.on('close', (e) => {
  //   if (!quit) {
  //     e.preventDefault()
  //     win.hide()
  //   }
  // })

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

export function setMainTitleBarOverlay(
  options: Electron.TitleBarOverlayOptions
) {
  if (win) {
    win.setTitleBarOverlay(options)
  }
}

export function send(channel: string, ...args: any[]) {
  win.webContents.send(channel, ...args)
}