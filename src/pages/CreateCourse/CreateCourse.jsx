import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    route: ""  
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
        toast.success("Course created successfully!");
        setCourseData({
          title: "",
          description: "",
          category: "",
          price: "",
          route: ""  
        });
      } else {
        toast.error("Error creating course!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="px-8 py-12 bg-white rounded-lg shadow-lg max-w-full mx-auto mt-12">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Create New Course</h1>
      <p className="text-gray-600 mb-8">Fill in the details to add a new course to the platform.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Course Name</span>
              </label>
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                placeholder="Enter course name"
                className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Course Description</span>
              </label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                rows="4"
                className="textarea textarea-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Course Category</span>
              </label>
              <input
                type="text"
                name="category"
                value={courseData.category}
                onChange={handleInputChange}
                placeholder="Enter category of course"
                className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Course Price</span>
              </label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleInputChange}
                placeholder="Enter course price"
                className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">Course Route</span>
              </label>
              <input
                type="text"
                name="route"
                value={courseData.route}
                onChange={handleInputChange}
                placeholder="Enter course route"
                className="input input-bordered w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Create Course"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
