import React from 'react';
import classnames from 'classnames';
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
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <button
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <div className="arrow left">ARROW LEFT</div>
      </button>
      {paginationRange.map(pageNumber => {
        count += 1;
        if (pageNumber === DOTS) {
          return <li key={`dots-${pageNumber}-${count_id}`} className="pagination-item dots">...</li>;
        }
		
        return (
          <li
            key={`dots-${pageNumber}-${count_id}`}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <button
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
        disabled={currentPage === lastPage}
      >
        <div className="arrow right">ARROW RIGHT</div>
      </button>
    </ul>
  );
};

export default Pagination;