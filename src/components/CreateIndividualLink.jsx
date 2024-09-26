import React, { useState, useEffect } from 'react';

const CreateIndividualLink = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://course-server-327v.onrender.com/api/v1/courses/');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    const course = courses.find(c => c._id === courseId);
    setSelectedCourse(course);
  };

  const handleCreateLink = () => {
    if (selectedCourse) {
      alert(`Individual link created for ${selectedCourse.title}`);
    } else {
      alert('Please select a course first');
    }
  };

  return (
    <div className="w-full p-6 space-y-6 justify-end flex">
      <button
        className="btn btn-primary btn-outline"
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        Create Link
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select a Course</h3>

          <div className="space-y-4 py-4">
            <label htmlFor="courseSelect" className="block text-sm font-medium text-gray-700">
              Select a course ({courses.length} courses available):
            </label>
            <div className="relative">
              <select
                id="courseSelect"
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleCourseChange}
                defaultValue=""
              >
                <option value="" disabled>Choose a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {selectedCourse && (
              <div className="space-y-2">
                <label htmlFor="coursePrice" className="block text-sm font-medium text-gray-700">
                  Course Price:
                </label>
                <input
                  type="text"
                  id="coursePrice"
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={`${selectedCourse.price} so'm`}
                  readOnly
                />
              </div>
            )}

            <button
              onClick={handleCreateLink}
              className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Create Individual Link
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateIndividualLink;
