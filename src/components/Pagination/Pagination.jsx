const Pagination = ({ currentPage, totalPages, handlePageChange, t }) => {
    return (
      <div className="flex justify-center mt-4">
        <nav className="flex items-center space-x-2">
          <button onClick={() => handlePageChange(currentPage - 1)} className="px-3 py-1 border rounded-md" disabled={currentPage === 1}>
            {t("pagination-previous")}
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 border rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-white"}`}>
                {page}
              </button>
            );
          })}
          <button onClick={() => handlePageChange(currentPage + 1)} className="px-3 py-1 border rounded-md" disabled={currentPage === totalPages}>
            {t("pagination-next")}
          </button>
        </nav>
      </div>
    );
  };
  
  export default Pagination;
  