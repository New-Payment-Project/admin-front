const OrderDetailsModal = ({ selectedOrder, t, getStatusBadge, renderLogo, closeModal }) => {
  if (!selectedOrder) return null;

  // Check if the status is "ОПЛАЧЕНО" (paid in Russian)
  const isPaid = selectedOrder.status === "ОПЛАЧЕНО";

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-gray-50 border-2 border-gray-200 rounded-lg p-6 font-mono">
        <h3 className="font-bold text-xl text-center mb-4">{t("order-details")}</h3>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-right font-bold">{t("invoice-number")}:</p>
            <p>{selectedOrder.course_id?.prefix || t("no-data")}{selectedOrder.invoiceNumber || t("no-data")}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right font-bold">{t("client")}:</p>
            <p>{selectedOrder.clientName || t("no-data")}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right font-bold">{t("course")}:</p>
            <p>{selectedOrder?.course_id?.title || t("no-data")}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right font-bold">{t("created-date")}:</p>
            <p>{selectedOrder.create_time
                  ? new Date(selectedOrder.create_time).toLocaleDateString("en-GB") +
                    " | " +
                    new Date(selectedOrder.create_time).toLocaleTimeString("en-GB", { hour12: false })
                  : t("no-data")}</p>
          </div>

          {/* New Fields */}
          <div className="flex justify-between">
            <p className="text-right font-bold">{t("client-phone")}:</p>
            <p>{selectedOrder.clientPhone || t("no-data")}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right font-bold">{t("client-address")}:</p>
            <p>{selectedOrder.clientAddress || t("no-data")}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right font-bold">{t("tg-username")}:</p>
            <p>{selectedOrder.tgUsername || t("no-data")}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right font-bold">{t("passport")}:</p>
            <p>{selectedOrder.passport || t("no-data")}</p>
          </div>
        </div>

        {/* Spacer for separating the bottom fields */}
        <div className="border-t border-gray-300 mt-6 pt-4 space-y-4">
          <div className="flex justify-between">
            <p className="text-right font-bold">{t("service")}:</p>
            <p>{renderLogo(selectedOrder.paymentType)}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right font-bold">{t("status")}:</p>
            <p>{getStatusBadge(selectedOrder.status)}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-right text-xl font-extrabold">{t("amount")}:</p>
            <p className="text-xl font-extrabold">
              {selectedOrder.amount
                ? isPaid
                  ? `${selectedOrder.amount / 100} ${t("currency")}` // Divide by 100 if status is "ОПЛАЧЕНО"
                  : `${selectedOrder.amount} ${t("currency")}`
                : t("no-data")}
            </p>
          </div>
        </div>

        <div className="modal-action justify-center mt-6">
          <button className="btn btn-outline" onClick={closeModal}>{t("close")}</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
