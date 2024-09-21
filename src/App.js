import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <>
      <header></header>
      <main className='flex h-screen'>
        <aside className='fixed top-0 left-0 h-full z-50'><Sidebar /></aside>
        <div className='lg:ml-[280px] p-7 w-full h-full overflow-y-auto'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default App;
