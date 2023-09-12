import React from 'react'
import data from './data.json'
import { useChannelStore } from '../../store/channel'

const Channel: React.FC = () => {
  const channelNames = useChannelStore((state) =>
    state.channels.map((c) => c.name)
  )

  const toggleChannel = useChannelStore((state) => state.toggleChannel)
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>名称</th>
              <th>频道ID</th>
              <th>频道名称</th>
              <th>频道分组</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c, index) => (
              <tr key={c.url} className="hover">
                <th>{index + 1}</th>
                <td>{c.name}</td>
                <td>{c.tvgId}</td>
                <td>
                  <div className="flex items-center gap-4">
                    {c.tvgLogo && (
                      <img className="w-8" src={c.tvgLogo} alt={c.tvgName} />
                    )}
                    <span>{c.tvgName}</span>
                  </div>
                </td>
                <td>{c.groupTitle}</td>
                <td>
                  <button
                    onClick={() => toggleChannel(c)}
                    className={`btn btn-sm ${
                      channelNames.includes(c.name) ? 'text-red-400' : ''
                    }`}
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Channel
