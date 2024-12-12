import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";
import CryptoJS from 'crypto-js';
import axios from "axios";


const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState(""); // Start with an empty string
  const { t } = useTranslation();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    route: "",
    prefix: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative numbers for the price input
    if (name === "price" && value < 0) {
      return; // Do nothing if the value is negative
    }

    setCourseData({ ...courseData, [name]: value });
  };

  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
  };

  const secretKey = process.env.REACT_APP_SECRET_KEY || 'your-secret-key';

  const decryptToken = () => {
    const encryptedToken = localStorage.getItem('token');
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const finalPrefix = prefix.trim() === "" ? "U" : prefix;
    const finalCourseData = { ...courseData, prefix: finalPrefix };

    try {
      const token = decryptToken();
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/courses`,
        finalCourseData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status === 409) {
        toast.error(t("course-route-exists"));
      } else if (response.status === 201) { // Assuming 201 for success
        toast.success(t("course-success"));
        setCourseData({
          title: "",
          description: "",
          category: "",
          price: "",
          route: "",
          prefix: ""
        });
        setPrefix(""); // Reset prefix to empty after submission
      } else {
        toast.error(t("course-error"));
      }
    } catch (error) {
      toast.error(t("course-fail"));
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 md:px-8 pb-12 bg-white rounded-lg shadow-lg max-w-full mx-auto">
      <ToastContainer />

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">{t("create-course")}</h1>
      <p className="text-gray-600 mb-4">{t("course-desc")}</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="label">
          <span className="label-text font-semibold text-gray-700">{t("course-title")}</span>
        </label>
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
          placeholder={t("course-title-placeholder")}
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="label">
          <span className="label-text font-semibold text-gray-700">{t("course-price")}</span>
        </label>
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleInputChange}
          style={{
            MozAppearance: 'textfield',
          }}
          placeholder={t("course-price-placeholder")}
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="label">
          <span className="label-text font-semibold text-gray-700">{t("course-route")}</span>
        </label>
        <input
          type="text"
          name="route"
          value={courseData.route}
          onChange={handleInputChange}
          placeholder={t("course-route-placeholder")}
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Prefix input with placeholder "U", value hidden unless edited */}
        <label className="label">
          <span className="label-text font-semibold text-gray-700">{t("course-prefix")}</span>
        </label>
        <input
          type="text"
          value={prefix}
          onChange={handlePrefixChange}
          placeholder="U" // Placeholder shows "U" but input is initially empty
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 justify-end flex-col md:flex-row">
          <button
            type="submit"
            className="md:w-1/4 mt-5 w-full text-white font-semibold py-3 rounded-lg  bg-bank-gradient active:scale-95 transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <span className="flex items-center gap-2">
                <IoIosAddCircleOutline size={20} />
                {t("create-course-btn")}
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
