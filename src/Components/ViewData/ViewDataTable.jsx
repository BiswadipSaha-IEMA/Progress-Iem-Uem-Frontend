import React, { useEffect, useState } from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import AddCommentPopup from "../DetailedSuperAdmin/Status/AddCommentPopup";
import { SlActionRedo } from "react-icons/sl";

const ViewDataTable = ({ name, dummyData, fetchData }) => {
  const [data, setData] = useState(dummyData);  // Initialize data with dummyData
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Update filtered data based on search term
  const filteredData = searchTerm
    ? dummyData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : dummyData;

  // Get current data for pagination based on filtered data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // Get column headers dynamically
  const getColumnHeaders = (data) => {
    if (data.length === 0) return [];
    const keys = Object.keys(data[0]);
    return keys.flatMap((key) => {
      if (typeof data[0][key] === "object" && data[0][key] !== null) {
        return Object.keys(data[0][key]).map((subKey) => `${key}.${subKey}`);
      }
      return key;
    });
  };

  const columnHeaders = getColumnHeaders(dummyData).filter(
    (header) => header !== "_id"
  );

  // Handle pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const [detailedClick, setDetailedClick] = useState(false);
  const [id, setId] = useState("");

  // Open popup for comments
  const handleCommentClick = (selectedData) => {
    setData(selectedData);
    setDetailedClick(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return " px-2 py-1 rounded-xl text-[#F3C623] "; // Yellow
      case "requesttoaccept":
      case "approved":
        return "px-2 py-1 rounded-xl text-green-500"; // Green
      case "requesttoreject":
      case "rejected":
        return "px-2 py-1 rounded-xl text-red-500"; // Red
      default:
        return "text-gray-500";
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);  // Reset to the first page when search term changes
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);  // Reset to first page when search is reset
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
              <CiSearch size={23} className="font-bold text-[#7A7A7A]" />
              <input
                className="outline-none w-full pl-3 py-2 mr-2"
                placeholder="Search by Book Name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div>
              <IoIosCloseCircleOutline size={25} onClick={handleResetSearch} className="font-bold text-[#7A7A7A]" />
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-auto mt-5 rounded-lg">
          <div className="min-w-full bg-white rounded-lg">
            <div className="table w-full">
              {/* Table Header */}
              <div className="table-header-group text-center items-center justify-center">
                <div className="table-row bg-[#DEF4FF] h-12 rounded-lg items-center justify-center">
                  <div className="table-cell px-4 py-2 text-[#1A1A1D] font-semibold">SL. No</div>
                  {columnHeaders.map((header, index) => (
                    <div key={index} className="table-cell px-4 py-2 text-[#1A1A1D] font-semibold">
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </div>
                  ))}
                  <div className="table-cell px-4 py-2 text-[#1A1A1D] font-semibold text-center">
                    Review Comments
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="table-row-group text-center">
                {currentRows.map((item, rowIndex) => (
                  <div key={rowIndex} className="table-row">
                    <div className="table-cell px-4 py-2">{indexOfFirstRow + rowIndex + 1}</div>
                    {columnHeaders.map((header, colIndex) => (
                      <div key={colIndex} className="table-cell px-4 py-2 text-center">
                        {header.toLowerCase() === "status" ? (
                          <span className={getStatusColor(item[header])}>
                            {item[header].toLowerCase() === "requesttoaccept"
                              ? "Acceptance Request"
                              : item[header].toLowerCase() === "requesttoreject"
                              ? "Rejection Request"
                              : item[header]}
                          </span>
                        ) : header === "Proof Of Document" || header === "Document Link" ? (
                          <a href={item[header]} target="_blank" className="text-[#03A8FD]">Link</a>
                        ) : (
                          item[header]
                        )}
                      </div>
                    ))}
                    <div className="table-cell px-4 py-2">
                      <span
                        className="flex items-center text-[#03A8FD] cursor-pointer pl-3 sm:w-[300px] md:w-[150px] lg:w-[150px] h-[30px] rounded-[10px] border backdrop-blur-lg s px-2 gap-2 justify-center text-sm sm:text-wrap"
                        onClick={() => handleCommentClick(item)}
                      >
                        <SlActionRedo size={16} />
                        Action
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Show Add Comment Popup if selected data */}
      {detailedClick && (
        <AddCommentPopup setShowPopup={setDetailedClick} data={data} name={name} fetchTableData={fetchData}/>
      )}
    </>
  );
};

export default ViewDataTable;
