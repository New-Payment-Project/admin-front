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
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
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

    if (paymentTypeFilter) {
      filtered = filtered.filter(
        (order) => order.paymentType === paymentTypeFilter
      );
    }

    if (dateFilter) {
      const selectedDate = new Date(dateFilter);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.create_time);
        return (
          orderDate.getFullYear() === selectedDate.getFullYear() &&
          orderDate.getMonth() === selectedDate.getMonth() &&
          orderDate.getDate() === selectedDate.getDate()
        );
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [statusFilter, paymentTypeFilter, dateFilter, orders]);

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

  const handleProgressBarChange = (e) => {
    const page = parseInt(e.target.value, 10);
    handlePageChange(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "НЕ ОПЛАЧЕНО":
        return <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-[10px] font-semibold">{t("failed")}</span>;
      case "ВЫСТАВЛЕНО":
        return <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-[10px] font-semibold">{t("process")}</span>;
      case "ОПЛАЧЕНО":
        return <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-semibold">{t("success")}</span>;
      case "ОТМЕНЕНО":
        return <span className="px-2 py-1 rounded bg-red-500 text-red-100 text-[10px] font-semibold">{t("cancelled")}</span>;
      default:
        return <span>{t("no-data")}</span>;
    }
  };

  const renderLogo = (paymentType) => {
    switch (paymentType) {
      case "Payme":
        return <img src="/payme.png" alt="Payme Logo" className="w-12 h-4" />;
      case "Click":
        return <img src="/click.png" alt="Click Logo" className="w-12 h-[14px]" />;
      case "Uzum":
        return <img src="/uzum-bank.png" alt="Uzum Bank Logo" className="w-12 h-4" />;
      default:
        return <span>{t("No service")}</span>;
    }
  };

  return (
    <div className="px-4 md:px-8 py-2">
      <h1 className="text-2xl mb-2 font-semibold">{t("orders")}</h1>
      <div className="mb-4 flex flex-col md:flex-row md:justify-between md:space-y-0 space-y-4">
        <div>
          <p className="text-sm">{t("filter-status")}</p>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 border-2 border-slate-200 rounded w-full md:w-auto"
          >
            <option value="">{t("all-statuses")}</option>
            <option value="НЕ ОПЛАЧЕНО">{t("failed")}</option>
            <option value="ВЫСТАВЛЕНО">{t("process")}</option>
            <option value="ОПЛАЧЕНО">{t("success")}</option>
            <option value="ОТМЕНЕНО">{t("cancelled")}</option>
          </select>
        </div>

        <div>
          <p className="text-sm">{t("filter-service")}</p>
          <select
            value={paymentTypeFilter}
            onChange={(e) => setPaymentTypeFilter(e.target.value)}
            className="pl-3 pr-12 border-2 border-slate-200 rounded w-full md:w-auto"
          >
            <option value="">{t("All services")}</option>
            <option value="Payme">{t("Payme")}</option>
            <option value="Click">{t("Click")}</option>
            <option value="Uzum">{t("Uzum")}</option>
          </select>
        </div>

        <div>
          <p className="text-sm">{t("filter-date")}</p>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 border-2 border-slate-200 rounded outline-none w-full md:w-auto"
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
          {/* Table for larger screens */}
          <div className="hidden md:block max-w-full overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto text-xs md:text-sm text-left border border-gray-200">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">{t("invoice-number")}</th>
                  <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">{t("client")}</th>
                  <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">{t("course")}</th>
                  <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">{t("amount")}</th>
                  <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">{t("status")}</th>
                  <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">{t("created-date")}</th>
                  <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">{t("service")}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.length > 0 ? (
                  currentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer" onClick={() => handleOrderClick(order)}>
                      <td className="px-4 py-2 truncate">{order.invoiceNumber || t("no-data")}</td>
                      <td className="px-4 py-2 truncate">{order.clientName || t("no-data")}</td>
                      <td className="px-4 py-2 truncate">{order?.course_id?.title || t("no-data")}</td>
                      <td className="px-4 py-2 truncate">{order.amount ? `${order.amount} ${t("currency")}` : t("no-data")}</td>
                      <td className="px-4 py-2 text-xs truncate">{getStatusBadge(order.status)}</td>
                      <td className="px-4 py-2 truncate">{order.create_time ? new Date(order.create_time).toLocaleDateString() : t("no-data")}</td>
                      <td className="px-4 py-2 text-xs truncate">{renderLogo(order.paymentType)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">{t("orders-not-found")}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards for smaller screens */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <div key={index} className="bg-white p-4 rounded shadow-md" onClick={() => handleOrderClick(order)}>
                  <div className="flex justify-end">
                    <p className="text-xs">{getStatusBadge(order.status)}</p>
                  </div>
                  <h2 className="font-bold">{t("invoice-number")}: {order.invoiceNumber || t("no-data")}</h2>
                  <p><strong>{t("client")}:</strong> {order.clientName || t("no-data")}</p>
                  <p><strong>{t("course")}:</strong> {order?.course_id?.title || t("no-data")}</p>
                  <p><strong>{t("amount")}:</strong> {order.amount ? `${order.amount} ${t("currency")}` : t("no-data")}</p>
                  <p><strong>{t("created-date")}:</strong> {order.create_time ? new Date(order.create_time).toLocaleDateString() : t("no-data")}</p>
                  <div><strong>{t("service")}:</strong> {renderLogo(order.paymentType)}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">{t("orders-not-found")}</div>
            )}
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">{t("order-details")}</h3>
            <p><strong>{t("invoice-number")}:</strong> {selectedOrder.invoiceNumber || t("no-data")}</p>
            <p><strong>{t("client")}:</strong> {selectedOrder.clientName || t("no-data")}</p>
            <p><strong>{t("course")}:</strong> {selectedOrder?.course_id?.title || t("no-data")}</p>
            <p><strong>{t("amount")}:</strong> {selectedOrder.amount ? `${selectedOrder.amount} ${t("currency")}` : t("no-data")}</p>
            <p><strong>{t("status")}:</strong> {getStatusBadge(selectedOrder.status)}</p>
            <p><strong>{t("created-date")}:</strong> {selectedOrder.create_time ? new Date(selectedOrder.create_time).toLocaleDateString() : t("no-data")}</p>
            <p><strong>{t("service")}:</strong> {renderLogo(selectedOrder.paymentType)}</p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>{t("close")}</button>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar with previous and next buttons for mobile pagination */}
      {/* Pagination for smaller screens (Mobile) */}
{totalPages > 1 && (
  <div className="md:hidden flex flex-col items-center justify-between my-4">
    {/* Page Indicator */}
    <span className="text-sm font-medium mb-2">
      {t("page")} {currentPage} / {totalPages}
    </span>

    <div className="flex items-center w-full justify-between">
      <button
        className="px-3 py-1 border rounded-md"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        {t("pagination-previous")}
      </button>

      <div className="flex-1 mx-4">
        <input
          id="pagination-progress"
          type="range"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={handleProgressBarChange}
          className="w-full"
        />
      </div>

      <button
        className="px-3 py-1 border rounded-md"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {t("pagination-next")}
      </button>
    </div>
  </div>
)}

    </div>
  );
};
export default Home;
