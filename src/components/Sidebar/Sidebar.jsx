import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import { useRef } from 'react';

// Modal Component
const LogoutModal = ({ confirmLogout }) => {
  return (
    <dialog id="logout_modal" className="modal">
      <div className="modal-box">
        <p className="font-bold text-base text-red-600">Are you sure you want to logout?</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={confirmLogout}>Yes</button>
          <button className="btn" onClick={() => document.getElementById('logout_modal').close()}>No</button>
        </div>
      </div>
    </dialog>
  );
};

const Sidebar = ({ user }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const modalRef = useRef();

  // Confirm Logout Function
  const confirmLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    document.getElementById('logout_modal').close(); // Close modal after logout
  };

  // Open the Modal Function
  const openModal = () => {
    document.getElementById('logout_modal').showModal();
  };

  return (
    <section className="sidebar z-50">
      <nav className="flex flex-col gap-4 z-50">
        <Link to="/" className="mb-12 flex items-center gap-2" style={{userSelect: 'none'}}>
          <img
            src="/norbekov-logo.png"
            width={64}
            height={64}
            alt="Logo"
            className="w-16 h-16 max-xl:w-14 max-xl:h-14"
          />
          <h1 className="sidebar-logo">Norbekov</h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);
          return (
            <Link
              to={item.route}
              key={item.label}
              className={`sidebar-link ${isActive ? 'bg-bank-gradient' : ''}`}
              style={{ userSelect: 'none' }}
            >
              <div className="flex relative w-6 h-6">
                <img
                  src={item.imgURL}
                  alt={item.label}
                  className={`${isActive ? 'brightness-[3] invert-0' : ''}`}
                />
              </div>
              <p className={`sidebar-label ${isActive ? '!text-white' : ''}`}>{item.label}</p>
            </Link>
          );
        })}
        
        USER
      </nav>

      <button onClick={openModal} className='flex gap-2 items-center px-5'>
        <span className='text-base text-gray-700 font-semibold'>Logout</span>
        <img src='/icons/logout.svg' alt='logout-icon' />
      </button>

      <LogoutModal confirmLogout={confirmLogout} />
    </section>
  );
};

export default Sidebar;
