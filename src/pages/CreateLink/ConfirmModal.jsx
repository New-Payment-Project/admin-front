import React from "react";
import { useTranslation } from "react-i18next";

const ConfirmModal = ({ message, onClose, onConfirm }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal modal-open">
        <div className="modal-box max-w-sm">
          <h2 className="text-lg font-semibold mb-4">{t("confirmation")}</h2>
          <p>{message}</p>

          {/* Action Buttons */}
          <div className="modal-action justify-between">
            <button onClick={onClose} className="btn text-white btn-error">
              {t("cancel")}
            </button>
            <button onClick={onConfirm} className="btn text-white btn-primary">
              {t("confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
