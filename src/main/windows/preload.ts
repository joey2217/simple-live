import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../../../package.json'
import type { OpenDialogOptions, IpcRendererEvent } from 'electron'

/**
 * 不能加载常量,sandbox无法加载
 */
contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system'),
})

contextBridge.exposeInMainWorld('devAPI', {
  toggleDevtools: () => ipcRenderer.invoke('TOGGLE_DEVTOOLS'),
})

contextBridge.exposeInMainWorld('electronAPI', {
  getDownloadsPath: () => ipcRenderer.invoke('GET_DOWNLOADS_PATH'),
  showItemInFolder: (fullPath: string) =>
    ipcRenderer.invoke('SHOW_ITEM_IN_FOLDER', fullPath),
  openPath: (fullPath: string) => ipcRenderer.invoke('OPEN_PATH', fullPath),
  showOpenDialog: (options: OpenDialogOptions) =>
    ipcRenderer.invoke('OPEN_DIALOG', options),
  setMainTitleBarOverlay: (options: Electron.TitleBarOverlayOptions) =>
    ipcRenderer.invoke('SET_MAIN_TITLE_BAR_OVERLAY', options),
  setMainThumbarButtons: (playing: boolean, disabled = false) =>
    ipcRenderer.invoke('SET_MAIN_THUMBAR_BUTTONS', playing, disabled),
  trashItem: (path: string) => ipcRenderer.invoke('TRASH_ITEM', path),
  setPlaying: (playing: boolean) => ipcRenderer.invoke('SET_PLAYING', playing),
  setCurrentPlay: (name: string) =>
    ipcRenderer.invoke('SET_CURRENT_PLAY', name),
  checkUpdate: () => ipcRenderer.invoke('CHECK_FOR_UPDATE'),
  openExternal: (url: string) => ipcRenderer.invoke('OPEN_EXTERNAL', url),
  onMusicControl: (
    callback: (
      e: IpcRendererEvent,
      type: 'prev' | 'play' | 'pause' | 'next'
    ) => void
  ) => ipcRenderer.on('MUSIC_CONTROL', callback),
  onDownloadFinish: (
    callback: (e: IpcRendererEvent, rid: number, success: boolean) => void
  ) => ipcRenderer.on('DOWNLOAD_FINISHED', callback),
  onNavigate: (callback: (e: IpcRendererEvent, to: string) => void) =>
    ipcRenderer.on('NAVIGATE', callback),
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