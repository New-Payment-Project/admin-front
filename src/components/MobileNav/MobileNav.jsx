import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../constants';
import UserInfo from '../UserInfo/UserInfo';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

const MobileNav = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;
  const { t } = useTranslation()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='min-w-screen min-h-full'>
      {/* Hamburger Menu Icon */}
      <div className='flex items-center gap-2'>
      <LanguageSwitcher/>
      <img
        src='/icons/hamburger.svg'
        width={30}
        height={30}
        onClick={toggleSidebar}
        className="cursor-pointer brightness-[3] invert-0"
        alt="Open Menu"
      />
      </div>

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >

        {/* Sidebar Content */}
        <Link to="/" className="mb-12 flex items-center gap-1 px-4">
          <img
            src="/norbekov-logo.png"
            width={64}
            height={64}
            alt="Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Norbekov
          </h1>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 pt-4 px-4">
          {sidebarLinks.map((item) => {
            // Check if the current route matches the link's route
            const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);

            return (
              <Link
                to={item.route}
                key={t(item.label)}
                className={`rounded-lg py-3 flex items-center gap-2 px-4 transition-colors duration-300 ${isActive ? 'bg-bank-gradient text-white bg-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={toggleSidebar}
              >
                <img
                  src={item.imgURL}
                  alt={t(item.label)}
                  className={`size-6 ${isActive && 'brightness-[3] invert-0'}`}
                />
                <p>{t(item.label)}</p>
              </Link>
            );
          })}
        </nav>
        <UserInfo/>
      </div>
    </div>
  );
};

export default MobileNav;