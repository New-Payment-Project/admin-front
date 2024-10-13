const OrderDetailsModal = ({ selectedOrder, t, getStatusBadge, renderLogo, closeModal }) => {
    if (!selectedOrder) return null;
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{t("order-details")}</h3>
          <p><strong>{t("invoice-number")}:</strong> {selectedOrder.invoiceNumber || t("no-data")}</p>
          <p><strong>{t("client")}:</strong> {selectedOrder.clientName || t("no-data")}</p>
          <p><strong>{t("course")}:</strong> {selectedOrder?.course_id?.title || t("no-data")}</p>
          <p><strong>{t("amount")}:</strong> {selectedOrder.amount ? `${selectedOrder.amount} ${t("currency")}` : t("no-data")}</p>
          <p><strong>{t("status")}:</strong> {getStatusBadge(selectedOrder.status)}</p>
          <p><strong>{t("created-date")}:</strong> {selectedOrder.create_time ? new Date(selectedOrder.create_time).toLocaleDateString() : t("no-data")}</p>
          <p><strong>{t("service")}:</strong> {renderLogo(selectedOrder.paymentType)}</p>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>{t("close")}</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default OrderDetailsModal;
  