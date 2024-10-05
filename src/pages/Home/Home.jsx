import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const itemsPerPage = 5;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://course-server-327v.onrender.com/api/v1/orders"
        );
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(t("fetch-failed"));
        setLoading(false);
      }
    };

    fetchOrders();
  }, [t]);

  useEffect(() => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getFullYear() === selectedDate.getFullYear() &&
          orderDate.getMonth() === selectedDate.getMonth() &&
          orderDate.getDate() === selectedDate.getDate()
        );
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [statusFilter, dateFilter, orders]);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case "НЕ ОПЛАЧЕНО":
        return (
          <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold">
            {t("failed")}
          </span>
        );
      case "ВЫСТАВЛЕНО":
        return (
          <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">
            {t("process")}
          </span>
        );
      case "ОПЛАЧЕНО":
        return (
          <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
            {t("success")}
          </span>
        );
      default:
        return <span>{t("no-data")}</span>;
    }
  };

  return (
    <div className="px-4 md:px-8 py-2">
      <div className="mb-4 flex flex-col md:flex-row md:justify-between">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border-2 border-slate-200 rounded select"
          >
            <option value="">{t("all-statuses")}</option>
            <option value="НЕ ОПЛАЧЕНО">{t("failed")}</option>
            <option value="ВЫСТАВЛЕНО">{t("process")}</option>
            <option value="ОПЛАЧЕНО">{t("success")}</option>
          </select>
        </div>

        <div className="mt-4 md:mt-0">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border-2 border-slate-200 rounded outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4 mx-auto">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto mb-10">
          <h1 className="text-2xl mb-2 font-semibold">{t("orders")}</h1>

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
                    currentOrders.map((order, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-4 py-2">
                          {order.user_id?.invoiceNumber || t("no-data")}
                        </td>
                        <td className="px-4 py-2">
                          {order.user_id?.clientName || t("no-data")}
                        </td>
                        <td className="px-4 py-2">
                          {order.course_id?.title || t("no-data")}
                        </td>
                        <td className="px-4 py-2">
                          {order.amount
                            ? `${order.amount} ${t("currency")}`
                            : t("no-data")}
                        </td>
                        <td className="px-4 py-2">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="px-4 py-2">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : t("no-data")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        {t("orders-not-found")}
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
                    <strong>{t("course")}:</strong>{" "}
                    {order.course_id?.title || t("no-data")}
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
        </div>
      )}

{totalPages > 1 && (
  <div className="flex justify-center mt-4">
    <nav className="flex items-center w-full justify-between space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-1 border rounded-md text-sm md:text-base"
        disabled={currentPage === 1}
      >
        {t("pagination-previous")}
      </button>

      <div className="flex gap-1 md:gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-2 py-1 border rounded-md text-sm md:px-3 md:py-1 md:text-base ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-1 border rounded-md text-sm md:text-base"
        disabled={currentPage === totalPages}
      >
        {t("pagination-next")}
      </button>
    </nav>
  </div>
)}

    </div>
  );
};

export default Home;
