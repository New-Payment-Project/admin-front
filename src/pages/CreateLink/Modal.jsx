import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Modal = ({ course, onClose, onConfirm }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: course.title,
    prefix: course.prefix,
    price: course.price,
    route: course.route,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    onConfirm(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal modal-open">
        <div className="modal-box max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {t("edit-course")}
          </h2>

          {/* Title Input */}
          <div className="form-control mb-4">
            <label className="label font-medium">{t("course-title")}</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder={t("course-title-placeholder")}
            />
          </div>

          {/* Prefix Input */}
          <div className="form-control mb-4">
            <label className="label font-medium">{t("course-prefix")}</label>
            <input
              name="prefix"
              value={formData.prefix}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder={t("enter-prefix")}
            />
          </div>

          {/* Price Input */}
          <div className="form-control mb-4">
            <label className="label font-medium">{t("course-price")}</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder={t("course-price-placeholder")}
              type="number"
            />
          </div>

          {/* Route Input */}
          <div className="form-control mb-4">
            <label className="label font-medium">{t("course-route")}</label>
            <input
              name="route"
              value={formData.route}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder={t("course-route-placeholder")}
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-action justify-between">
            <button onClick={onClose} className="btn text-white btn-error">
              {t("cancel")}
            </button>
            <button onClick={handleConfirm} className="btn text-white btn-primary">
              {t("confirm")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
