import React from "react";
import { useTranslation } from "react-i18next";

const LogoutModal = ({ confirmLogout, modalRef }) => {
  const { t } = useTranslation()
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box text-black-2">
        <h3 className="font-bold text-lg">{t('confirm-exit')}</h3>
        <p className="py-4 text-[17px] font-semibold">
        {t('exit-desc')}
        </p>
        <div className="modal-action">
          <button
            className="btn bg-red-500 hover:bg-red-700 text-white"
            onClick={confirmLogout}
          >
            {t('exit')}
          </button>
          <button className="btn" onClick={() => modalRef.current.close()}>
          {t('stay')}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default LogoutModal;
