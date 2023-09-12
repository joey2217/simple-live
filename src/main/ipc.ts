import { ipcMain } from 'electron'
import { setMainTitleBarOverlay } from './windows/main'

export default function handleIPC() {
  ipcMain.handle('TOGGLE_DEVTOOLS', (event) => {
    event.sender.toggleDevTools()
  })

  ipcMain.handle(
    'SET_MAIN_TITLE_BAR_OVERLAY',
    (e, options: Electron.TitleBarOverlayOptions) => {
      if (process.platform === 'win32') {
        setMainTitleBarOverlay(options)
      }
    }
  )

  // ipcMain.handle('SEND_TO_MAIN', (e, channel: string, ...args: any[]) => {
  //   sendToMain(channel, ...args)
  // })

  // ipcMain.handle('SHOW_ITEM_IN_FOLDER', (e, fullPath: string) => {
  //   shell.showItemInFolder(path.normalize(fullPath))
  // })

  // ipcMain.handle('OPEN_PATH', (e, fullPath: string) => {
  //   shell.openPath(path.normalize(fullPath))
  // })

  // ipcMain.handle('OPEN_DIALOG', (e, options: OpenDialogOptions) => {
  //   return showOpenDialog(options)
  // })

  // ipcMain.handle('TRASH_ITEM', (_e, itemPath: string) => {
  //   return shell.trashItem(path.normalize(itemPath))
  // })

  // ipcMain.handle('OPEN_EXTERNAL', (_e, url: string) => {
  //   return shell.openExternal(url)
  // })
}
