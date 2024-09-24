import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../constants';

const MobileNav = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pathName = location.pathname;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='min-w-screen'>
      {/* Hamburger Menu Icon */}
      <img
        src='/icons/hamburger.svg'
        width={30}
        height={30}
        onClick={toggleSidebar}
        className="cursor-pointer"
        alt="Open Menu"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
        <nav className="flex flex-col gap-6 pt-4">
          {sidebarLinks.map((item) => {
            // Check if the current route matches the link's route
            const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);

            return (
              <Link
                to={item.route}
                key={item.label}
                className={`sidebar-link flex items-center gap-2 px-4 py-2 transition-colors duration-300 ${isActive ? 'bg-bank-gradient text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={toggleSidebar} // Optionally close sidebar on link click
              >
                <img
                  src={item.imgURL}
                  alt={item.label}
                  className="w-6 h-6"
                />
                <p>{item.label}</p>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;