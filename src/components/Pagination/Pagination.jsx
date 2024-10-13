const Pagination = ({ currentPage, totalPages, handlePageChange, t }) => {
  const handleDrag = (e) => {
    const newPage = parseInt(e.target.value, 10);
    handlePageChange(newPage);
  };

  return (
    <div className="flex justify-center mt-4">
      {/* Desktop: Pagination with numeration */}
      <div className="hidden md:flex items-center space-x-2">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="px-3 py-1 border rounded-md" 
          disabled={currentPage === 1}
        >
          {t("pagination-previous")}
        </button>
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-white"}`}
            >
              {page}
            </button>
          );
        })}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="px-3 py-1 border rounded-md" 
          disabled={currentPage === totalPages}
        >
          {t("pagination-next")}
        </button>
      </div>

      {/* Mobile: Pagination with progress bar and buttons */}
      <div className="md:hidden flex flex-col items-center sm:w-full">
        {/* Current page label */}
        <div className="mb-2 text-lg font-semibold">
          {t("pagination-page")} {currentPage} / {totalPages}
        </div>

        {/* Progress bar and navigation buttons */}
        <div className="flex items-center justify-center w-full space-x-4">
          {/* Previous button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            {t("pagination-previous")}
          </button>

          {/* Progress bar with slider */}
          <div className="w-full max-w-xs">
            <input
              type="range"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={handleDrag}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Next button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            {t("pagination-next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
