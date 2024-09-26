import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircleOutline } from "react-icons/io";

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
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
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Создать Новый Курс</h1>
      <p className="text-gray-600 mb-4">Заполните информацию для добавления нового курса на платформу.</p>

      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="label">
          <span className="label-text font-semibold text-gray-700">Название Курса</span>
        </label>
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
          placeholder="Введите название курса"
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="label">
          <span className="label-text font-semibold text-gray-700">Цена Курса</span>
        </label>
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleInputChange}
          placeholder="Введите цену курса"
          className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="label">
          <span className="label-text font-semibold text-gray-700">Маршрут или Направление Курса</span>
        </label>
        <input
          type="text"
          name="route"
          value={courseData.route}
          onChange={handleInputChange}
          placeholder="Введите маршрут курса"
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
              <IoIosAddCircleOutline size={20} /> Создать Курс
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
