const Pagination = ({ currentPage, totalPages, handlePageChange, t }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 13) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftSide = 5;
      const rightSide = totalPages - 4;

      if (currentPage > leftSide && currentPage < rightSide) {
        pageNumbers.push(1, 2, 3, 4, 5, '...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      }
      else if (currentPage <= leftSide) {
        for (let i = 1; i <= leftSide; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      }
      else if (currentPage >= rightSide) {
        pageNumbers.push(1, 2, 3, 4, 5, '...');
        for (let i = rightSide; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-4">
      <div className="hidden md:flex items-center space-x-2">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="px-3 py-1 border rounded-md" 
          disabled={currentPage === 1}
        >
          {t("pagination-previous")}
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && handlePageChange(page)}
            className={`px-3 py-1 border rounded-md ${currentPage === page ? "bg-blue-500 text-white" : "bg-white"}`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="px-3 py-1 border rounded-md" 
          disabled={currentPage === totalPages}
        >
          {t("pagination-next")}
        </button>
      </div>

      <div className="md:hidden flex flex-col items-center sm:w-full">
        <div className="mb-2 text-lg font-semibold">
          {t("pagination-page")} {currentPage} / {totalPages}
        </div>

        <div className="flex items-center justify-between w-full space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border rounded-md bg-gray-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            {t("pagination-previous")}
          </button>

          <div className="w-full max-w-xs">
            <input
              type="range"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

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
