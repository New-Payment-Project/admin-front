import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import HeaderBox from './components/HeaderBox/HeaderBox';
import TotalBalanceBox from './components/TotalBalanceBox/TotalBalanceBox';
import MobileNav from './components/MobileNav/MobileNav';

const App = () => {
  const loggedIn = { firstname: "Asilbek", lastName: "Karimov" };

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='root-layout flex items-center justify-between p-4 w-full overflow-x-hidden'>
        <img src='/norbekov-logo.png' width={60} height={60} alt='menu icon' />
        <MobileNav user={loggedIn} />
      </div>

      <div className="flex flex-1">
        <aside className="h-full z-50 top-0 left-0 bg-gray-100 " style={{ userSelect: 'none' }}>
          <Sidebar user={loggedIn} />
        </aside>

        <div className="flex-1">
          <header className="home home-header">
            <div className="home-content">
              <HeaderBox
                type="greeting"
                title="Welcome"
                user={loggedIn?.firstname || 'Guest'}
                subtext="Access and manage your account and transactions efficiently"
              />
              <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={1250.35}
              />
            </div>
          </header>

          <main className="font-inter flex-1" style={{ userSelect: 'none' }} >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
