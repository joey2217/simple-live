import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'
import type { IpcRendererEvent } from 'electron'

contextBridge.exposeInMainWorld('devAPI', {
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
})

contextBridge.exposeInMainWorld('electronAPI', {
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlayOptions) =>
    ipcRenderer.invoke('SET_MAIN_TITLE_BAR_OVERLAY', options),
  checkUpdate: () => ipcRenderer.invoke('CHECK_FOR_UPDATE'),
  onVersionUpdate: (
    callback: (
      e: IpcRendererEvent,
      info: string,
      status: 'normal' | 'error'
    ) => void
  ) => ipcRenderer.on('VERSION_UPDATE', callback),
})

contextBridge.exposeInMainWorld('versions', {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
})
