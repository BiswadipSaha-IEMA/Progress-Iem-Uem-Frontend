import React, { useState, useEffect } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa"; 
import { IoIosCloseCircleOutline } from "react-icons/io";
import CommentModal from "./CommentModal"; 

const ViewDataTable = ({ name, dummyData, dummy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [comment, setComment] = useState(""); 
  const [data, setData] = useState(""); 

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Get current data for pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dummyData.slice(indexOfFirstRow, indexOfLastRow);

  // Get column headers dynamically from the keys of the first item in the dummyData array
  const columnHeaders = dummyData.length > 0 ? Object.keys(dummyData[0]) : [];

  // Handle pagination
  const totalPages = Math.ceil(dummyData.length / rowsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle row click to select the row for comments
  const handleRowClick = (rowData) => {
    setSelectedRow(rowData); // Set the selected row for the modal
    setIsModalOpen(true); // Open the modal for the selected row
  };

  // Handle comment submission
  const handleCommentSubmit = (newComment) => {
    setComment(newComment);
    console.log("Comment Submitted for ", selectedRow.name, ":", newComment);
    // You can also save this comment to a server or global state here.
  };

  return (
    <>
      <div className="px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start font-poppins">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">{name}</div>
          </div>

          <div className="w-full sm:w-[300px] lg:w-[500px] h-[50px] font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)] flex px-2 items-center justify-between">
            <div className="flex w-full justify-center items-center">
              <div>
                <CiSearch size={23} className="font-bold text-[#7A7A7A]" />
              </div>
              <input className="outline-none w-full pl-3 py-2 mr-2" placeholder="Search by Book Name" />
            </div>
            <div>
              <IoIosCloseCircleOutline size={25} className="font-bold text-[#7A7A7A]" />
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-auto mt-5 rounded-lg">
          <div className="min-w-full bg-white rounded-lg shadow">
            <div className="table w-full">
              {/* Table Header */}
              <div className="table-header-group">
                <div className="table-row bg-[#DEF4FF] h-12 rounded-lg items-center justify-center">
                  <div className="table-cell px-4 py-2 text-[#575757] font-semibold">SL. No</div>
                  {columnHeaders.map((header, index) => (
                    <div key={index} className="table-cell px-4 py-2 text-[#575757] font-semibold">
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </div>
                  ))}
                  <div className="table-cell px-4 py-2 text-[#575757] font-semibold">Any COMMENT</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="table-row-group">
                {currentRows.map((item, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="table-row border-b"
                    onClick={() => handleRowClick(item)} // Open modal on row click
                  >
                    {/* Sl. No Column */}
                    <div className="table-cell px-4 py-2 text-[#000]">{indexOfFirstRow + rowIndex + 1}</div>
                    {/* Dynamic Data Columns */}
                    {columnHeaders.map((header, colIndex) => (
                      <div key={colIndex} className="table-cell px-4 py-2 text-[#000]">
                        {item[header]}
                      </div>
                    ))}
                    <div className="table-cell px-4 py-2 text-[#000]">
                      <span className="flex items-center text-[#03A8FD] cursor-pointer gap-1">
                        <FaRegComments size={16} /> {/* Icon size adjustment */}
                        Add Comment
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50">
              Previous
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>

      
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCommentSubmit}
        selectedRow={selectedRow} 
      />
    </>
  );
};

export default ViewDataTable;
