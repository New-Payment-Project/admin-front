import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterDate, setFilterDate] = useState(""); // Date filter state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://payment-server-vo2y.onrender.com/api/transactions"
        );
        setTransactions(response.data);
        setFilteredTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getRowClass = (status) => {
    if (status === "completed") {
      return "bg-green-50";
    } else if (status === "failed") {
      return "bg-red-50";
    }
    return "bg-white";
  };

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    applyFilters(status, filterDate);
    setIsDropdownOpen(false);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setFilterDate(date);
    applyFilters(filterStatus, date);
  };

  const applyFilters = (status, date) => {
    let filtered = transactions;
    if (status) {
      filtered = filtered.filter((transaction) => transaction.status === status);
    }
    if (date) {
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.createdAt).toISOString().slice(0, 10) === date
      );
    }
    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          {/* Filter Section */}
          <div className="w-full flex justify-end py-4 space-x-4">
            <div className="relative">
              {/* Date Filter */}
              <input
                type="date"
                value={filterDate}
                onChange={handleDateChange}
                className="w-48 h-12 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <button
                className="btn btn-outline btn-primary h-12"
                onClick={toggleDropdown}
              >
                <img
                  src="/icons/filter-lines.svg"
                  className="w-6 h-6"
                  alt="Filter"
                />
                Фильтр
              </button>

              {/* Dropdown menu for status filtering */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange(null)}
                  >
                    Все
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange("pending")}
                  >
                    Выставлен
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange("processing")}
                  >
                    В процессе
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange("completed")}
                  >
                    Успешно
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange("failed")}
                  >
                    Неуспешно
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="hidden md:block">
            <div className="max-w-full overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full table-auto text-xs md:text-sm text-left border border-gray-200">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Транзакции
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Дата
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      Категория
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction, index) => (
                      <tr
                        key={index}
                        className={`${getRowClass(
                          transaction.status
                        )} hover:bg-gray-50 transition-colors duration-200`}
                      >
                        <td className="px-4 py-2">{transaction.username}</td>
                        <td className="px-4 py-2">{transaction.amount} so'm</td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              transaction.status === "completed"
                                ? "bg-green-500"
                                : transaction.status === "failed"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                            }`}
                          ></span>
                          {transaction.status}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">{transaction.category}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Транзакции не найдены
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white text-gray-600 border rounded disabled:opacity-50 flex items-center gap-2"
            >
              <img src="icons/arrow-left.svg" alt="Previous" />
              Пред.
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
              След.
              <img src="icons/arrow-right.svg" alt="Next" />
            </button>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg shadow-md ${getRowClass(
                    transaction.status
                  )}`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-sm text-gray-800">
                      {transaction.username}
                    </span>
                    <span className="text-xs text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs mt-2">
                    <div className="flex items-center gap-1">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          transaction.status === "completed"
                            ? "bg-green-500"
                            : transaction.status === "failed"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      {transaction.status}
                    </div>
                    <p>Сумма: {transaction.amount} so'm</p>
                    <p>Категория: {transaction.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4">Транзакции не найдены</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
