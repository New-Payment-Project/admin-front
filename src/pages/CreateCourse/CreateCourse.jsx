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
    route: ""  // Changed from instructor to route
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
          route: ""  // Reset route
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
    <div className="px-8 pb-10 bg-base-100 rounded-lg shadow-lg mx-auto">
      <ToastContainer />
      <h1 className="text-3xl font-bold">Create Course</h1>
      <p className="mb-6">Fill in the details to create a course</p>

      <form onSubmit={handleSubmit} className="space-y-2 lg:flex lg:justify-center gap-[15%] w-full">
        <div className="w-full flex-1">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Course Name</span>
            </label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              placeholder="Enter course name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Course Description</span>
            </label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              placeholder="Enter course description"
              rows="4"
              className="textarea textarea-bordered pb-5 w-full"
              required
            />
          </div>
        </div>

        <div className="w-full flex-1">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Course Category</span>
            </label>
            <input
              type="text"
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter category of course"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Course Price</span>
            </label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
              placeholder="Enter course price"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Route</span>
            </label>
            <input
              type="text"
              name="route"
              value={courseData.route}
              onChange={handleInputChange}
              placeholder="Enter course route"
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
              "Create Course"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
