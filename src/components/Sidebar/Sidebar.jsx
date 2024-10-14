import { Link, useLocation } from 'react-router-dom';
import { sidebarLinks } from '../../constants';
import UserInfo from '../UserInfo/UserInfo';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ user }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <section className="sidebar min-w-[100%] z-50 h-full flex flex-col justify-between">
      <nav className="flex flex-col gap-4 z-50">
        <div className="flex flex-col lg:flex-row">
          <Link to="/" className="lg:mb-12 flex items-center gap-2">
            <img
              src="/norbekov-logo.png"
              width={64}
              height={64}
              alt="Logo"
              className="w-16 h-16 max-xl:w-14 max-xl:h-14"
            />
            <h1 className="sidebar-logo">Norbekov</h1>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {sidebarLinks.map((item) => {
            const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);
            return (
              <Link
                to={item.route}
                key={item.label}
                className={`sidebar-link hover:bg-blue-100 hover:shadow hover:shadow-blue-300 duration-300 ${isActive ? 'bg-bank-gradient' : ''}`}
                style={{ userSelect: 'none' }}
              >
                <div className="flex relative w-6 h-6">
                  <img
                    src={item.imgURL}
                    alt={t(item.label)}
                    className={`${isActive ? 'brightness-[3] invert-0' : ''}`}
                  />
                </div>
                <p className={`sidebar-label ${isActive ? '!text-white' : ''}`}>
                  {t(item.label)}
                </p>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="flex items-center gap-2">
        <UserInfo />
        <LanguageSwitcher />
      </div>
    </section>
  );
};

export default Sidebar;
