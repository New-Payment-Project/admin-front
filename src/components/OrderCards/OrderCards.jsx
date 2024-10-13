const OrderCards = ({ currentOrders, getStatusBadge, renderLogo, t, handleItemsPerPageChange, itemsPerPage }) => {
  return (
    <div className="md:hidden">
      <div className="grid grid-cols-1 gap-4">
        {currentOrders.length > 0 ? (
          currentOrders.map((order, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
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

      {/* Items per page dropdown */}
      <div className="flex justify-end mt-4">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="select select-bordered w-full"
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
      </div>
    </div>
  );
};

export default OrderCards;
