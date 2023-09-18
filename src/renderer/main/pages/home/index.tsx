import React from 'react'
import Player from '../../components/Player'
import useLocalStorage from '../../hooks/useLocalStorage'
import { useChannelStore } from '../../store/channel'
import { PlayIcon } from '../../components/Icons'

const Home: React.FC = () => {
  const [showTab, setShowTab] = useLocalStorage('local_tab', true)

  const channels = useChannelStore((state) => state.channels)
  const playUrl = useChannelStore((state) => state.playUrl)
  const removeChannel = useChannelStore((state) => state.removeChannel)
  const setPlayURL = useChannelStore((state) => state.setPlayURL)

  return (
    <div className="flex h-full items-center overflow-hidden">
      <div className="flex-1">
        <Player liveUrl={playUrl} />
      </div>
      <div
        className={`${
          showTab ? 'w-80 py-4 px-3' : 'w-0'
        } relative rounded-l-lg bg-slate-600  h-full duration-100 ease-in-out`}
        style={{
          transitionProperty: 'width',
        }}
      >
        <button
          onClick={() => setShowTab((s) => !s)}
          className="absolute z-50 top-1/2 -translate-y-1/2 -left-6 w-6 bg-gray-500/60 text-4xl p-1 rounded-l-lg"
        >
          {showTab ? '❮' : '❯'}
        </button>
        <div className="divide-y">
          {channels.map((c) => (
            <div key={c.url} className="flex items-center gap-2 py-1">
              <div className="w-4">{playUrl === c.url && <PlayIcon />}</div>
              <div
                className="cursor-pointer flex-1"
                title="点击播放"
                onClick={() => setPlayURL(c.url)}
              >
                {c.name}
              </div>
              <button
                className="btn btn-circle btn-xs"
                onClick={() => removeChannel(c)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
