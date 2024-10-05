import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useTranslation } from "react-i18next";

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation()
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    route: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://course-server-327v.onrender.com/api/v1/courses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseData),
        }
      );

      if (response.ok) {
        toast.success("Курс успешно создан!");
        setCourseData({
          title: "",
          description: "",
          category: "",
          price: "",
          route: "",
        });
      } else {
        toast.error("Ошибка при создании курса!");
      }
    } catch (error) {
      toast.error("Что-то пошло не так!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 pb-12 bg-white rounded-lg shadow-lg max-w-full mx-auto">
      <ToastContainer />

      <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('create-course')}</h1>
      <p className="text-gray-600 mb-4">{t('course-desc')}</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="label">
          <span className="label-text font-semibold text-gray-700">{t('course-title')}</span>
        </label>
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
          placeholder={t('course-title-placeholder')}
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="label">
          <span className="label-text font-semibold text-gray-700">{t('course-price')}</span>
        </label>
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleInputChange}
          placeholder={t('course-price-placeholder')}
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="label">
          <span className="label-text font-semibold text-gray-700">{t('course-route')}</span>
        </label>
        <input
          type="text"
          name="route"
          value={courseData.route}
          onChange={handleInputChange}
          placeholder={t('course-route-placeholder')}
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span className="flex items-center gap-2">
              <IoIosAddCircleOutline size={20} />{t('create-course-btn')}
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
