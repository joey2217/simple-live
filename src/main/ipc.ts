import { ipcMain, app, shell, nativeTheme } from 'electron'
import * as path from 'path'
import {
  send as sendToMain,
  showOpenDialog,
  setMainTitleBarOverlay,
  setMainThumbarButtons,
} from './windows/main'
import type { OpenDialogOptions } from 'electron'

export default function handleIPC() {
  // nativeTheme.themeSource = 'dark'

  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle('SEND_TO_MAIN', (e, channel: string, ...args: any[]) => {
    sendToMain(channel, ...args)
  })

  ipcMain.handle('SHOW_ITEM_IN_FOLDER', (e, fullPath: string) => {
    shell.showItemInFolder(path.normalize(fullPath))
  })

  ipcMain.handle('OPEN_PATH', (e, fullPath: string) => {
    shell.openPath(path.normalize(fullPath))
  })

  ipcMain.handle('OPEN_DIALOG', (e, options: OpenDialogOptions) => {
    return showOpenDialog(options)
  })

  ipcMain.handle(
    'SET_MAIN_TITLE_BAR_OVERLAY',
    (e, options: Electron.TitleBarOverlayOptions) => {
      if (process.platform === 'win32') {
        setMainTitleBarOverlay(options)
      }
    }
  )

  ipcMain.handle(
    'SET_MAIN_THUMBAR_BUTTONS',
    (_e, playing: boolean, disabled = false) => {
      setMainThumbarButtons(playing, disabled)
    }
  )

  ipcMain.handle('TRASH_ITEM', (_e, itemPath: string) => {
    return shell.trashItem(path.normalize(itemPath))
  })

  ipcMain.handle('OPEN_EXTERNAL', (_e, url: string) => {
    return shell.openExternal(url)
  })
}