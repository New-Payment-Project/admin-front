const OrderTable = ({
  currentOrders,
  t,
  getStatusBadge,
  renderLogo,
  handleItemsPerPageChange,
  itemsPerPage,
  setSelectedOrder, // Add this prop to handle order selection for the modal
}) => {
  const truncateTitle = (title) => {
    return title.length > 20 ? title.substring(0, 20) + "..." : title;
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
                {order?.course_id?.title
                  ? truncateTitle(order?.course_id?.title)
                  : t("no-data")}
              </td>
              <td className="px-2 py-2 truncate">
                {order.amount ? `${order.amount / 100} ${t("currency")}` : t("no-data")}
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
            </tr>
          ))}
          <tr>
            <td colSpan="7" className="text-right p-3">
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="select select-bordered w-full max-w-20"
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
