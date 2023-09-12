import { create } from 'zustand'
import {
  type StateStorage,
  persist,
  createJSONStorage,
} from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  setTheme: (t: Theme) => void
}

const LOCAL_THEME = 'local_theme'

const storage: StateStorage = {
  getItem: (name: string): string => {
    const localData = localStorage.getItem(name)
    if (localData) {
      return localData
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return '{"state":{"theme":"dark"}}'
    }
    return '{"state":{"theme":"light"}}'
  },
  setItem: (name: string, value: string) => {
    localStorage.setItem(name, value)
  },
  removeItem: localStorage.removeItem,
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: 'light',
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: LOCAL_THEME,
      storage: createJSONStorage(() => storage),
    }
  )
)

const THEME_ATTR = 'data-theme'

const DARK_BACK_COLOR = '#1d232a'

export function setAppTheme(theme: Theme) {
  console.log('setAppTheme', theme)
  document.documentElement.setAttribute(THEME_ATTR, theme)
  if (theme === 'dark') {
    window.electronAPI.setMainTitleBarOverlay({ color: DARK_BACK_COLOR })
  } else {
    window.electronAPI.setMainTitleBarOverlay({ color: '#fff' })
  }
}
