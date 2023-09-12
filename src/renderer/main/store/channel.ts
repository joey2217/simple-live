import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Channel {
  url: string
  name: string
  tvgId?: string
  tvgName?: string
  tvgLogo?: string
  groupTitle: string
}

interface ChannelState {
  playUrl: string
  channels: Channel[]
  setPlayURL: (url: string) => void
  toggleChannel: (c: Channel) => void
  removeChannel: (c: Channel) => void
}

export const useChannelStore = create<ChannelState>()(
  persist(
    (set) => ({
      playUrl: 'https://cntv.sbs/tv?auth=2309081833&id=cctv1',
      channels: [],
      setPlayURL: (url: string) => set(() => ({ playUrl: url })),
      toggleChannel: (c: Channel) =>
        set((state) => {
          const index = state.channels.findIndex((ch) => ch.name === c.name)
          if (index === -1) {
            return { channels: [c, ...state.channels] }
          } else {
            return {
              channels: [
                ...state.channels.slice(0, index),
                ...state.channels.slice(index + 1),
              ],
            }
          }
        }),
      removeChannel: (c: Channel) =>
        set((state) => ({
          channels: state.channels.filter((ch) => ch.url !== c.url),
        })),
    }),
    {
      name: 'local_channels',
    }
  )
)
