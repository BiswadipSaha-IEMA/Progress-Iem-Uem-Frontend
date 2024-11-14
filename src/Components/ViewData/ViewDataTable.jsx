import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { FaBookBookmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import FacultyPopup from "../DetailedSuperAdmin/FacultyPopup";
import { FaCommentDots } from "react-icons/fa";
import AddCommentPopup from "../DetailedSuperAdmin/Status/AddCommentPopup";

const ViewDataTable = ({ name, dummyData, dummy }) => {
  const [data, setData] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Get current data for pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dummyData.slice(indexOfFirstRow, indexOfLastRow);

  // Get column headers dynamically, accounting for nested properties
  const getColumnHeaders = (data) => {
    if (data.length === 0) return [];
    const keys = Object.keys(data[0]);
    return keys.flatMap((key) => {
      if (typeof data[0][key] === 'object' && data[0][key] !== null) {
        return Object.keys(data[0][key]).map((subKey) => `${key}.${subKey}`);
      }
      return key;
    });
  };

  const columnHeaders = getColumnHeaders(dummyData);

  // Handle pagination
  const totalPages = Math.ceil(dummyData.length / rowsPerPage);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start font-poppins">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              {name}
            </div>
          </div>

          <div className="w-full sm:w-[300px] lg:w-[500px] h-[50px] font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)] flex px-2 items-center justify-between">
            <div className="flex w-full justify-center items-center">
              <div>
                <CiSearch size={23} className="font-bold text-[#7A7A7A]" />
              </div>
              <input
                className="outline-none w-full pl-3 py-2 mr-2"
                placeholder="Search by Book Name"
              />
            </div>
            <div>
              <IoIosCloseCircleOutline
                size={25}
                className="font-bold text-[#7A7A7A]"
              />
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
                  <div className="table-cell px-4 py-2 text-[#575757] font-semibold">
                    SL. No
                  </div>
                  {columnHeaders.map((header, index) => (
                    <div
                      key={index}
                      className="table-cell px-4 py-2 text-[#575757] font-semibold"
                    >
                      {header.split('.').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')}
                    </div>
                  ))}
                  <div className="table-cell px-4 py-2 text-[#575757] font-semibold">
                    Comments
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="table-row-group">
                {currentRows.map((item, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="table-row border-b"
                  >
                    {/* Sl. No Column */}
                    <div className="table-cell px-4 py-2 text-[#000]">
                      {indexOfFirstRow + rowIndex + 1}
                    </div>
                    {/* Dynamic Data Columns */}
                    {columnHeaders.map((header, colIndex) => (
                      <div
                        key={colIndex}
                        className="table-cell px-4 py-2 text-[#000]"
                      >
                        {header.includes('.')
                          ? header.split('.').reduce((acc, part) => acc?.[part], item) || ''
                          : item[header]}
                      </div>
                    ))}
                    {/* Comments Column */}
                    <div className="table-cell px-4 py-2 text-[#000]">
                      <FaCommentDots
                        className="text-[#03A8FD] cursor-pointer"
                        onClick={() => handleCommentClick(item)}
                      />
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
      {detailedClick && (
        // <FacultyPopup setShowPopup={setDetailedClick} data={data} />
        <AddCommentPopup setShowPopup={setDetailedClick} data={data} />
      )}
    </>
  );
};

export default ViewDataTable;
