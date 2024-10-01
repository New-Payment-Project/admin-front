import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://course-server-327v.onrender.com/api/v1/orders"
        );
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
        setLoading(false);
        console.log(response.data.data);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  return (
    <div className="px-4 md:px-8 py-2">
      {loading ? (
        <div className="text-center py-4 mx-auto">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <div className="max-w-full overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full table-auto text-xs md:text-sm text-left border border-gray-200">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Номер счета
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Клиент
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Курс
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Дата создания
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
                          {order.user_id?.invoiceNumber || "нет данных"}
                        </td>
                        <td className="px-4 py-2">
                          {order.user_id?.clientName || "нет данных"}
                        </td>
                        <td className="px-4 py-2">
                          {order.course_id?.title || "нет данных"}
                        </td>
                        <td className="px-4 py-2">
                          {order.amount ? `${order.amount} so'm` : "нет данных"}
                        </td>
                        <td className="px-4 py-2">
                          {order.status || "нет данных"}
                        </td>
                        <td className="px-4 py-2">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "нет данных"}
                        </td>
                      </tr>
                    ))
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
    </div>
  );
};

export default Orders;
