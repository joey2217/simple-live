import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main id="main" className="mt-10">
        <Outlet />
      </main>
    </>
  )
}

export default memo(Layout)
