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

  // Получаем фильтры из Redux
  const { statusFilter, paymentTypeFilter, startDate, endDate, courseNameFilter } = useSelector(
    (state) => state.filter
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(t("fetch-failed"));
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchOrders();
    fetchCourses();
  }, [t]);

  // Применение фильтров и вычисление отфильтрованных данных
  useEffect(() => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (paymentTypeFilter) {
      filtered = filtered.filter((order) => order.paymentType === paymentTypeFilter);
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
      filtered = filtered.filter((order) => order.course_id?.title === courseNameFilter);
    }

    setFilteredOrders(filtered);
    setCurrentPage(1); // Сброс страницы при изменении фильтров
  }, [statusFilter, paymentTypeFilter, startDate, endDate, courseNameFilter, orders]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        return <img src="/click.png" alt="Click Logo" className="w-12 h-[14px]" />;
      case "Uzum":
        return <img src="/uzum-bank.png" alt="Uzum Bank Logo" className="w-12 h-4" />;
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
          />
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
    </div>
  );
};

export default Home;
