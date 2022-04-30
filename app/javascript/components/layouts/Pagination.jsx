import React from 'react';
import { UsePagination, DOTS } from './UsePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = UsePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  let count_id = 0;

   return (
    <div className="pagination-container">
      <div className="pagination-controls">
         <button
          id={currentPage === 1 ? "disabled-page-btn" : ""}
          className="arrow-left"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        {paginationRange.map(pageNumber => {
          count_id += 1;
          if (pageNumber === DOTS) {
            return <div key={`dots-${pageNumber}-${count_id}`} className="page-dots">...</div>;
          }
      
          return (
            <button
              key={`dots-${pageNumber}-${count_id}`}
              className="page-number"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
         <button
          id={currentPage === lastPage ? "disabled-page-btn" : ""}
          className="arrow-right"
          onClick={onNext}
          disabled={currentPage === lastPage}
        >
          <i class="fa-solid fa-right-long"></i>
        </button>
      </div>   
    </div>
  );
};

export default Pagination;