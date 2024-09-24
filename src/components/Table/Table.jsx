import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getRowClass = (status) => {
    if (status === "completed") {
      return "bg-[#F6FEF9]"; 
    } else if (status === "failed") {
      return "bg-[#FFFBFA]"; 
    }
    return ""; 
  };

  return (
    <div className="px-4 md:px-8 py-6">
      {loading ? (
        <div className="text-center py-4 mx-auto">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="hidden md:block">
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-full table-auto text-xs md:text-sm text-left">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="px-2 py-1 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-2 py-1 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-2 py-1 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-2 py-1 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-2 py-1 text-[10px] md:text-xs font-medium uppercase tracking-wider">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <tr
                        key={index}
                        className={`${getRowClass(transaction.status)} hover:bg-gray-50 transition-colors duration-200`}
                      >
                        <td className="px-2 py-1 text-[10px] md:text-sm">{transaction.username}</td>
                        <td className="px-2 py-1 text-[10px] md:text-sm">{transaction.amount} so'm</td>
                        <td className="px-2 py-1 text-[10px] md:text-sm">
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
                        <td className="px-2 py-1 text-[10px] md:text-sm">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-2 py-1 text-[10px] md:text-sm">{transaction.category}</td>
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
          </div>

          {/* Card view for smaller screens */}
          <div className="md:hidden space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg shadow-sm ${getRowClass(
                    transaction.status
                  )}`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-[12px] md:text-base text-gray-800">
                      {transaction.username}
                    </span>
                    <span className="text-[10px] md:text-sm text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] md:text-sm">
                    <div className="text-gray-700">
                      <strong>Amount:</strong> {transaction.amount} so'm
                    </div>
                    <div className="text-gray-700">
                      <strong>Status:</strong>{" "}
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
                    </div>
                    <div className="text-gray-700">
                      <strong>Category:</strong> {transaction.category}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No transactions found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
