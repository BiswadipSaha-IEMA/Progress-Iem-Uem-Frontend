import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate 
      previousLabel={"< Prev"}
      nextLabel={"Next >"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination flex space-x-2 text-blue-500 font-semibold"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link px-4 py-2 bg-gray-200 rounded-md"}
      activeClassName={"active"}
      activeLinkClassName={"bg-blue-500 text-blue-900 font-bold"}
      
    />
  );
};

export default Pagination;
