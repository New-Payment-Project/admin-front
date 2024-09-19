import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <header></header>
      <main>
        <aside>Sidebar</aside>
        <Outlet />
      </main>
    </>
  )
}

export default App