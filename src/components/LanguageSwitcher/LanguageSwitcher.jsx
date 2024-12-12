import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown dropdown-top text-[#000] z-50">
      <label tabIndex={0} className="btn m-1 bg-transparent rounded-full">
        <span className="block md:hidden lg:block">{t("language-change")}</span><img src={t("language")} className="h-[15px] w-[15px]" alt="" />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 w-28 md:w-52 z-50"
      >
        <li>
          <button onClick={() => changeLanguage("ru")} className="text-black flex items-center gap-2">
            <img src="/flags/ru.png" className="h-[15px] w-auto" alt="Russian flag" />
            Русский
          </button>
        </li>
        <li>
          <button onClick={() => changeLanguage("uz")} className="flex items-center gap-2">
            <img src="/flags/uzb.png" className="h-[15px] w-auto" alt="Uzbek flag" />
            O'zbek
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
