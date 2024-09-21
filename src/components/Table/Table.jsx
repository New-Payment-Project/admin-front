import React, { useState } from "react";
import { IoArrowBack, IoArrowForward, IoFilter } from "react-icons/io5"; // Importing arrow icons

const Table = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [selectedStatus, setSelectedStatus] = useState("All"); // For selected status filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown toggle state

  const itemsPerPage = 5; // Items per page

  // Filter transactions based on selected status
  const filteredTransactions = selectedStatus === "All"
    ? transactions
    : transactions.filter((transaction) => transaction.status === selectedStatus);

  // Get current items based on the current page and filtered transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Function to determine row background color based on status
  const getRowClass = (status) => {
    if (status === "Success") {
      return "bg-[#F6FEF9]"; // light green for success
    } else if (status === "Declined") {
      return "bg-[#FFFBFA]"; // light red for declined
    } else {
      return ""; // no color change for processing
    }
  };

  // Function to determine text color and icon for status
  const getStatusClass = (status) => {
    if (status === "Success") {
      return "text-green-500"; // green text for success
    } else if (status === "Declined") {
      return "text-red-500"; // red text for declined
    } else if (status === "Processing") {
      return "text-gray-500"; // gray text for processing
    }
    return "";
  };

  // Function to determine text color for amount
  const getAmountClass = (amount) => {
    if (amount.startsWith("+")) {
      return "text-green-500"; // green text for positive amounts
    } else if (amount.startsWith("-")) {
      return "text-red-500"; // red text for negative amounts
    } else {
      return ""; // default color for other amounts
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Previous button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Next button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle filter dropdown toggle
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle status selection
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
    setCurrentPage(1); // Reset to first page after filtering
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-[18px] font-semibold">Transaction history</p>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="btn btn-outline hover:bg-[#0179FE] hover:border-transparent"
          >
            <IoFilter />
            Apply Filter
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 z-50 bg-white border rounded-lg shadow-lg">
              <ul className="py-2">
                <li
                  className={`px-4 py-2 cursor-pointer ${selectedStatus === "All" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStatusChange("All")}
                >
                  All
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${selectedStatus === "Processing" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStatusChange("Processing")}
                >
                  Processing
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${selectedStatus === "Success" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStatusChange("Success")}
                >
                  Success
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer ${selectedStatus === "Declined" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStatusChange("Declined")}
                >
                  Declined
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-lg">
          {/* Table Head */}
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction, index) => (
                <tr key={index} className={getRowClass(transaction.status)}>
                  <td>{transaction.transaction}</td>
                  <td className={getAmountClass(transaction.amount)}>
                    {transaction.amount}
                  </td>
                  <td className={getStatusClass(transaction.status)}>
                    <span className="mr-2">•</span> {transaction.status}
                  </td>
                  <td>{transaction.date}</td>
                  <td>{transaction.category}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between mt-4 items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="btn btn-sm flex items-center"
            disabled={currentPage === 1}
          >
            <IoArrowBack className="mr-1" /> Previous
          </button>
          <nav>
            <ul className="pagination flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`btn btn-sm ${currentPage === index + 1 ? "btn-active" : ""}`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={handleNext}
            className="btn btn-sm flex items-center"
            disabled={currentPage === totalPages}
          >
            Next <IoArrowForward className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
