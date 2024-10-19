import axios from "axios";
import { VscFilePdf } from "react-icons/vsc";

const OrderCards = ({
  currentOrders,
  getStatusBadge,
  renderLogo,
  t,
  handleItemsPerPageChange,
  itemsPerPage,
}) => {

  const generateContractPDF = async (order) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_TEST}/generate-pdf`,
        { orders: [order] },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = response.headers["content-type"];
      if (contentType !== "application/pdf") {
        throw new Error("Invalid PDF response");
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${order.invoiceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating contract PDF:", err);
      alert("Ошибка при загрузке PDF-документа. Пожалуйста, попробуйте позже.");
    }
  };

  return (
    <div className="md:hidden">
      <div className="grid grid-cols-1 gap-4">
        {currentOrders.length > 0 ? (
          currentOrders.map((order, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <div className="flex justify-end">
                <p className="text-xs">{getStatusBadge(order.status)}</p>
              </div>
              <h2 className="font-bold break-all">
                {t("invoice-number")}:{" "}
                {order?.course_id?.prefix || t("no-data")}
                {order.invoiceNumber || t("no-data")}
              </h2>
              <p className="break-all">
                <strong>{t("client")}:</strong>{" "}
                {order.clientName || t("no-data")}
              </p>
              <p className="break-all">
                <strong>{t("course")}:</strong>{" "}
                {order?.course_id?.title || t("no-data")}
              </p>
              <p className="break-all">
                <strong>{t("amount")}:</strong>
                {order.amount
                  ? order.status === "ОПЛАЧЕНО"
                    ? order.paymentType !== "Click"
                      ? `${order.amount / 100} ${t("currency")}`
                      : `${order.amount} ${t("currency")}`
                    : t("no-data")
                  : t("no-data")}
              </p>

              <p className="break-all">
                <strong>{t("created-date")}:</strong>{" "}
                {order.create_time
                  ? new Date(order.create_time).toLocaleDateString()
                  : t("no-data")}
              </p>
              <p className="break-all">
                <strong>{t("client-phone")}:</strong>{" "}
                {order.clientPhone || t("no-data")}
              </p>
              <p className="break-all">
                <strong>{t("client-address")}:</strong>{" "}
                {order.clientAddress || t("no-data")}
              </p>
              <p className="break-all">
                <strong>{t("tg-username")}:</strong>{" "}
                {order.tgUsername || t("no-data")}
              </p>
              <p className="break-all">
                <strong>{t("passport")}:</strong>{" "}
                {order.passport || t("no-data")}
              </p>
              <div>
                <strong>{t("service")}:</strong> {renderLogo(order.paymentType)}
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => generateContractPDF(order)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center"
                >
                  <VscFilePdf className="text-2xl mr-2" />
                  {t("download-pdf")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">{t("orders-not-found")}</div>
        )}
      </div>

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
