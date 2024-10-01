import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown dropdown-end text-[#000]">
      <label tabIndex={0} className="btn m-1 rounded-full">
        <img src={t('language')} className='h-[15px]' alt="" /> 
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            onClick={() => changeLanguage('ru')}
            className="text-black"
          >
            <img src="/flags/ru.png" className='h-[15px]' alt="" /> 
            Русский
          </button>
        </li>
        <li>
          <button onClick={() => changeLanguage('uz')}>
          <img src="/flags/uzb.png" className='h-[15px]' alt="" /> 
            O'zbek
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
