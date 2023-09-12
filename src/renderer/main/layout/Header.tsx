import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeButton from './ThemeButton'

const Header: React.FC = () => {
  return (
    <header
      id="titleBarContainer"
      className="w-full border-b border-slate-900/20 dark:border-slate-50/20"
    >
      <div id="titleBar" className="px-4">
        <div className="w-full flex items-center h-10 gap-4">
          <div>LOGO</div>
          <nav className="flex items-center gap-4">
            <NavLink className="link" to="/">
              首页
            </NavLink>
            <NavLink className="link" to="/channel">
              频道
            </NavLink>
          </nav>
          <div className="flex-1 h-full draggable"></div>
          <button
            className="btn btn-sm"
            onClick={() => window.devAPI.toggleDevtools()}
          >
            toggleDevtools
          </button>
          <ThemeButton />
        </div>
      </div>
    </header>
  )
}

export default Header
