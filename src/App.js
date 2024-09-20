import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'


const App = () => {
  return (
    <>
      <header></header>
      <main className='flex '>
        <aside><Sidebar /></aside>
        <div className='p-7 w-full overflow-y-auto'>
        <Outlet />
        </div>
      </main>
    </>
  )
}

export default App