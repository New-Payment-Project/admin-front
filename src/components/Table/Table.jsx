import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://payment-server-vo2y.onrender.com/api/transactions"
        );
        setTransactions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transactions");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Function to set row color based on status
  const getRowClass = (status) => {
    if (status === "completed") {
      return "bg-[#F6FEF9]"; // Light green background for completed
    } else if (status === "failed") {
      return "bg-[#FFFBFA]"; // Light red background for failed
    }
    return ""; // No specific color for other statuses
  };

  return (
    <div className="px-4 md:px-8">
      {loading ? (
        <div className="text-center py-4 mx-auto">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto z-0">
          <table className="table table-lg text-sm">
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
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={getRowClass(transaction.status)} // Apply dynamic class based on status
                  >
                    <td>{transaction.username}</td>
                    <td>{transaction.amount} so'm</td>
                    <td>
                      <span className="mr-2">•</span> {transaction.status}
                    </td>
                    <td>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
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
      )}
    </div>
  );
};

export default Table;
