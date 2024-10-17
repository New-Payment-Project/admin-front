import React from 'react';
import axios from 'axios';

const OrderTable = ({
  currentOrders,
  t,
  getStatusBadge,
  renderLogo,
  handleItemsPerPageChange,
  itemsPerPage,
  setSelectedOrder,
}) => {

  // Function to trigger PDF generation
  const generatePDF = async (filteredOrders) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL_TEST}/generate-pdf`, {
        orders: filteredOrders  // Send the current orders data
      }, { responseType: 'blob' });  // Ensure responseType is 'blob'

      // Create a link to download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'orders.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  return (
    <div className="hidden md:block max-w-full overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto text-xs md:text-sm text-left border border-gray-200">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-2 py-2 text-xs font-medium uppercase tracking-wider">
              {t("invoice-number")}
            </th>
            <th className="px-2 py-2 text-xs font-medium uppercase tracking-wider">
              {t("client")}
            </th>
            <th className="px-2 py-2 text-xs font-medium uppercase tracking-wider">
              {t("course")}
            </th>
            <th className="px-2 py-2 text-xs font-medium uppercase tracking-wider">
              {t("amount")}
            </th>
            <th className="px-2 py-2 text-xs font-medium uppercase tracking-wider">
              {t("status")}
            </th>
            <th className="px-2 py-2 text-xs font-medium uppercase tracking-wider">
              {t("created-date")}
            </th>
            <th className="px-2 py-2 text-xs font-medium uppercase tracking-wider">
              {t("service")}
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentOrders.map((order, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              onClick={() => setSelectedOrder(order)} // Open modal with selected order
            >
              <td className="px-2 py-2 truncate">
                {order?.course_id?.prefix ? order?.course_id?.prefix : "U"}{order.invoiceNumber || t("no-data")}
              </td>
              <td className="px-2 py-2 truncate">
                {order.clientName || t("no-data")}
              </td>
              <td className="px-2 py-2 truncate">
                {order?.course_id?.title ? order?.course_id?.title : t("no-data")}
              </td>
              <td className="px-2 py-2 truncate">
                {order.amount
                  ? order.status === "ОПЛАЧЕНО"
                    ? `${order.amount / 100} ${t("currency")}`
                    : `${order.amount} ${t("currency")}`
                  : t("no-data")}
              </td>
              <td className="px-2 py-2 text-xs truncate">
                {getStatusBadge(order.status)}
              </td>
              <td className="px-2 py-2 truncate">
                {order.create_time
                  ? new Date(order.create_time).toLocaleDateString("en-GB") +
                  " | " +
                  new Date(order.create_time).toLocaleTimeString("en-GB", { hour12: false })
                  : t("no-data")}
              </td>
              <td className="px-2 py-2 text-xs truncate">
                {renderLogo(order.paymentType)}
              </td>
              <td className="text-right mt-4">
                <button
                  onClick={() => generatePDF([order])}  // Trigger the PDF generation
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {t("download-pdf")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add button to download PDF */}

    </div>
  );
};

export default OrderTable;
