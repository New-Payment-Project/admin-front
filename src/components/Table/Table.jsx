import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/orders`
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
    if (status === "ОПЛАЧЕНО") {
      return "bg-green-50";
    } else if (status === "НЕ ОПЛАЧЕНО") {
      return "bg-red-50";
    } else if (status === "ВЫСТАВЛЕНО") {
      return "bg-yellow-500";
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
          new Date(transaction.create_time).toISOString().slice(0, 10) === date
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
                <img src="/icons/filter-lines.svg" className="text-red-600" alt="" />
                {t("filter")}
              </button>

              {/* Dropdown menu for status filtering */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded-lg shadow-xl z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange(null)}
                  >
                    {t("all")}
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange("ВЫСТАВЛЕНО")}
                  >
                    Выставлено
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange("ОПЛАЧЕНО")}
                  >
                    Оплачено
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => handleFilterChange("НЕ ОПЛАЧЕНО")}
                  >
                    Не оплачено
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
                      {t('client-name')}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t('amount')}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-4 py-2 text-xs font-medium uppercase tracking-wider">
                      {t('date')}
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
                        <td className="px-4 py-2">{transaction.clientName}</td>
                        <td className="px-4 py-2">{transaction.course_id.price} so'm</td>
                        <td className="px-4 py-2">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-1 ${transaction.status === "ОПЛАЧЕНО"
                              ? "bg-green-500"
                              : transaction.status === "НЕ ОПЛАЧЕНО"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                              }`}
                          ></span>
                          {transaction.status}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(transaction.create_time).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        {t('transaction-not-found')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
