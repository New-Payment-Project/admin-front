import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../constants';
import UserInfo from '../UserInfo/UserInfo';

const Sidebar = ({ user }) => {
  const location = useLocation();
  const pathName = location.pathname;

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
      </nav>
        <UserInfo/>
    </section>
  );
};

export default Sidebar;
