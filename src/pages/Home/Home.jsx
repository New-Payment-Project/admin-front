import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Filter from "../../components/Filter/Filter";
import OrderTable from "../../components/OrderTable/OrderTable";
import Pagination from "../../components/Pagination/Pagination";
import OrderCards from "../../components/OrderCards/OrderCards";
import OrderDetailsModal from "../../components/OrderFetailsModal/OrderDetailsModal";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [courses, setCourses] = useState([]);
  const { t } = useTranslation();

  const {
    statusFilter,
    paymentTypeFilter,
    startDate,
    endDate,
    courseNameFilter,
  } = useSelector((state) => state.filter);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders`
        );

        const reversedOrders = response.data.data.reverse();
        setOrders(reversedOrders);
        console.log("aassssssss", reversedOrders);
        setFilteredOrders(reversedOrders);
        setLoading(false);
      } catch (err) {
        setError(t("fetch-failed"));
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchOrders();
    fetchCourses();
  }, [t]);

  const handleNewOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setFilteredOrders((prevFilteredOrders) => [
      newOrder,
      ...prevFilteredOrders,
    ]);
    setCurrentPage(1);
  };

  useEffect(() => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (paymentTypeFilter) {
      filtered = filtered.filter(
        (order) => order.paymentType === paymentTypeFilter
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.create_time);
        return orderDate >= start && orderDate <= end;
      });
    }

    if (courseNameFilter) {
      filtered = filtered.filter(
        (order) => order.course_id?.title === courseNameFilter
      );
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [
    statusFilter,
    paymentTypeFilter,
    startDate,
    endDate,
    courseNameFilter,
    orders,
  ]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const closeModal = () => setSelectedOrder(null);

  const getStatusBadge = (status) => {
    console.log(status);
    switch (status) {
      case "НЕ ОПЛАЧЕНО":
        return (
          <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-[10px] font-semibold">
            {t("failed")}
          </span>
        );
      case "ВЫСТАВЛЕНО":
        return (
          <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-[10px] font-semibold">
            {t("process")}
          </span>
        );
      case "ОПЛАЧЕНО":
        return (
          <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-semibold">
            {t("success")}
          </span>
        );
      case "ОТМЕНЕНО":
        return (
          <span className="px-2 py-1 rounded bg-red-500 text-red-100 text-[10px] font-semibold">
            {t("cancelled")}
          </span>
        );
      default:
        return <span>{t("no-data")}</span>;
    }
  };

  const renderLogo = (paymentType) => {
    switch (paymentType) {
      case "Payme":
        return <img src="/payme.png" alt="Payme Logo" className="w-12 h-4" />;
      case "Click":
        return (
          <img src="/click.png" alt="Click Logo" className="w-12 h-[14px]" />
        );
      case "Uzum":
        return (
          <img src="/uzum-bank.png" alt="Uzum Bank Logo" className="w-12 h-5" />
        );
      default:
        return <span>{t("no-service")}</span>;
    }
  };

  return (
    <div className="px-4 md:px-8 py-2">
      <h1 className="text-2xl mb-2 font-semibold">{t("orders")}</h1>

      <Filter courses={courses} t={t} />
      {loading ? (
        <div className="text-center py-4 mx-auto">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <>
          <OrderTable
            currentOrders={currentOrders}
            t={t}
            getStatusBadge={getStatusBadge}
            renderLogo={renderLogo}
            handleItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPage={itemsPerPage}
            setSelectedOrder={setSelectedOrder} // Pass the setSelectedOrder function
          />

<<<<<<< HEAD
          <div className="hidden md:block">
            <div className="max-w-full overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full table-auto text-xs md:text-sm text-left border border-gray-200">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("invoice-number")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("client")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("course")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("amount")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("status")}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t("created-date")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order, index) => {
                      console.log(order); // Log the order object to inspect the structure
                      return (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-4 py-2">
                            {order.invoiceNumber || "нет данных"}
                          </td>
                          <td className="px-4 py-2">
                            {order.clientName || "нет данных"}
                          </td>
                          <td className="px-4 py-2">
                            {order.course_id?.title || "нет данных"}
                          </td>
                          <td className="px-4 py-2">
                            {order.amount
                              ? `${order.amount} so'm`
                              : "нет данных"}
                          </td>
                          <td className="px-4 py-2">
                            {getStatusBadge(order.status)}
                          </td>
                          <td className="px-4 py-2">
                            {order.createdAt
                              ? new Date(order.createdAt).toLocaleDateString()
                              : "нет данных"}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Заказы не найдены
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:hidden">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border rounded-lg shadow-md bg-white"
                >
                  <p className="mb-2">
                    <strong>{t("invoice-number")}:</strong>{" "}
                    {order.user_id?.invoiceNumber || t("no-data")}
                  </p>
                  <p className="mb-2">
                    <strong>{t("client")}:</strong>{" "}
                    {order.user_id?.clientName || t("no-data")}
                  </p>
                  <p className="mb-2">
                    <strong>Курс:</strong>{" "}
                    {order.course_id?.title || "нет данных"}
                  </p>
                  <p className="mb-2">
                    <strong>{t("amount")}:</strong>{" "}
                    {order.amount
                      ? `${order.amount} ${t("currency")}`
                      : t("no-data")}
                  </p>
                  <p className="mb-2">
                    <strong>{t("status")}:</strong>{" "}
                    {getStatusBadge(order.status)}
                  </p>
                  <p className="mb-2">
                    <strong>{t("created-date")}:</strong>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : t("no-data")}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-4">{t("orders-not-found")}</div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white text-gray-600 border rounded disabled:opacity-50 flex items-center gap-2"
            >
              Назад
            </button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white text-gray-600 border rounded disabled:opacity-50 flex items-center gap-2"
            >
              Вперед
            </button>
          </div>
        </div>
      )}
=======
          <OrderCards
            currentOrders={currentOrders}
            getStatusBadge={getStatusBadge}
            renderLogo={renderLogo}
            t={t}
            handleItemsPerPageChange={handleItemsPerPageChange}
            itemsPerPage={itemsPerPage}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            t={t}
          />
        </>
      )}
      <OrderDetailsModal
        selectedOrder={selectedOrder}
        t={t}
        getStatusBadge={getStatusBadge}
        renderLogo={renderLogo}
        closeModal={closeModal}
      />
>>>>>>> c35650ca7e06db6a159d64a3b54130116e5bb9a9
    </div>
  );
};

export default Home;
