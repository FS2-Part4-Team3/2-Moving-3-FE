import type { PaginationProps } from '@/interfaces/CommonComp/PaginationInterface';

export default function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>

      {adjustedStartPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {adjustedStartPage > 2 && <span>...</span>}
        </>
      )}

      {Array.from({ length: endPage - adjustedStartPage + 1 }, (_, index) => {
        const pageNumber = adjustedStartPage + index;
        return (
          <button
            key={pageNumber}
            className={currentPage === pageNumber ? 'font-bold' : ''}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
