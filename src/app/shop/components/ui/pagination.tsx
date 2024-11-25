export const Pagination: React.FC<{
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const delta = 2; // Number of neighbors to show before and after the current page

    // Add the first page
    if (currentPage > delta + 2) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={`px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm lg:text-base mx-1 md:mx-3 lg:mx-5  rounded-[3.125rem] ${
            currentPage === 1 ? "bg-brown-1 text-white" : ""
          }`}
        >
          1
        </button>
      );
      pages.push(<span key="start-ellipsis">...</span>);
    }

    // Add the range of pages around the current page
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages, currentPage + delta);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm lg:text-base mx-1 md:mx-3 lg:mx-5  rounded-[3.125rem] ${
            currentPage === i ? "bg-brown-1 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    // Add the last page
    if (currentPage < totalPages - delta - 1) {
      pages.push(<span key="end-ellipsis">...</span>);
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm lg:text-base mx-1 md:mx-3 lg:mx-5  rounded-[3.125rem] ${
            currentPage === totalPages ? "bg-brown-1 text-white" : ""
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm lg:text-base  text-white  rounded-[3.125rem] disabled:opacity-30 bg-green-1 hover:bg-green-1/80"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 md:px-4 lg:px-6 py-2 md:py-3 text-sm lg:text-base  text-white  rounded-[3.125rem] disabled:opacity-30 bg-green-1 hover:bg-green-1/80"
      >
        Next
      </button>
    </div>
  );
};
