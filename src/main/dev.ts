const { app, session } = require('electron')
const path = require('path')
const os = require('os')

/** @link https://www.electronjs.org/zh/docs/latest/tutorial/devtools-extension */
export function loadDevTools() {
  // on windows
  const reactDevToolsPath = path.join(
    os.homedir(),
    '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.28.0_0'
  )
  app.whenReady().then(async () => {
    try {
      await session.defaultSession.loadExtension(reactDevToolsPath)
    } catch (error) {
      console.error('loadDevTools Error', error)
    }
  })
}
