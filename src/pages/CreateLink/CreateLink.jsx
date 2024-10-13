import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateIndividualLink from "../../components/CreateIndividualLink";
import { useTranslation } from "react-i18next";
import Pagination from "../../components/Pagination/Pagination"; // Import your Pagination component

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [successfulPurchases, setSuccessfulPurchases] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage] = useState(5); // Can make this dynamic if needed
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses`
        );
        setCourses(response.data);
        setFilteredCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders`
        );
        const orders = response.data.data;

        // Filter for successful orders (based on the status being "ОПЛАЧЕНО")
        const successfulOrders = orders.filter(
          (order) => order.status === "ОПЛАЧЕНО"
        );

        // Calculate the number of successful orders for each course
        const successfulOrdersCount = {};
        courses.forEach((course) => {
          const courseOrders = successfulOrders.filter(
            (order) => order.course_id.title === course.title // Matching based on course title
          );
          successfulOrdersCount[course.title] = courseOrders.length;
        });

        setSuccessfulPurchases(successfulOrdersCount);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (courses.length > 0) {
      fetchOrders();
    }
  }, [courses]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="px-4 md:px-8 py-2">
      <CreateIndividualLink />
      {loading ? (
        <div className="text-center py-4 mx-auto">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div>
          {/* Table for larger screens */}
          <div className="hidden md:block">
            <div className="max-w-full overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full table-auto text-xs md:text-sm text-left border border-gray-200">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("table-course-title")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("table-course-price")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("table-course-route")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("table-successful-purchases")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCourses.length > 0 ? (
                    currentCourses.map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{course.title}</td>
                        <td className="px-4 py-2">
                          {course.price} {t("currency")}
                        </td>
                        <td className="px-4 py-2">{course.route}</td>
                        <td className="px-4 py-2">
                          {successfulPurchases[course.title] || 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        {t("course-not-found")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card layout for mobile screens */}
          <div className="block md:hidden">
            {currentCourses.length > 0 ? (
              currentCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg mb-4 p-4"
                >
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {t("table-course-price")}: {course.price} {t("currency")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {t("table-course-route")}: {course.route}
                  </p>
                  <p className="text-sm text-gray-600 flex">
                    {t("table-successful-purchases")}:{" "}
                    {successfulPurchases[course.title] || 0}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-4">{t("course-not-found")}</div>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            t={t}
          />
        </div>
      )}
    </div>
  );
};

export default CoursesTable;
