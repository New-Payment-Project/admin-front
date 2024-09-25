import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { IoIosAddCircleOutline } from "react-icons/io";


const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    route: ""  // Изменено с instructor на route
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await fetch("https://course-server-327v.onrender.com/api/v1/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        toast.success("Курс успешно создан!");
        setCourseData({
          title: "",
          description: "",
          category: "",
          price: "",
          route: ""  // Сброс поля route
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
    <div className="px-8 pb-10 bg-base-100 rounded-lg shadow-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-bold">Создать курс</h1>
      <p className="mb-6">Заполните данные, чтобы создать курс</p>

      <form onSubmit={handleSubmit} className="space-y- lg:flex lg:justify-center gap-[15%] w-full">
        <div className="w-full flex-1">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Название курса</span>
            </label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              placeholder="Введите название курса"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Описание курса</span>
            </label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              placeholder="Введите описание курса"
              rows="4"
              className="textarea textarea-bordered pb-5 w-full"
              required
            />
          </div>
        </div>

        <div className="w-full flex-1">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Категория курса</span>
            </label>
            <input
              type="text"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Введите категорию курса"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Цена курса</span>
            </label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
              placeholder="Введите цену курса"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Тема</span>
            </label>
            <input
              type="text"
              name="route"
              value={courseData.route}
              onChange={handleInputChange}
              placeholder="Введите маршрут курса"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button 
            type="submit" 
            className="text-white bg-blue-700 mt-3 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-3 text-center flex items-center justify-center"
            disabled={loading} 
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
                <span className="flex ">
                    <IoIosAddCircleOutline className="w-5 h-5 mr-2" />
                    Создать курс
                </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
