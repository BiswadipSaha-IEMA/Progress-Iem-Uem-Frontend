import React, { useState } from "react";
import Header from "../Header/Header";
import { FaBookBookmark } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ViewDataTable = () => {
  // Dummy data to simulate dynamic table rows and columns
  const dummyData = [
    { name: "John Doe", bookName: "React Basics", isbn: "123-4567890123", publisher: "Tech Books", date: "2022-01-15", submittedForms: "Yes" },
    { name: "Jane Smith", bookName: "Advanced CSS", isbn: "987-6543210987", publisher: "Design Press", date: "2021-08-30", submittedForms: "No" },
    { name: "Alice Johnson", bookName: "JavaScript Essentials", isbn: "321-6549871234", publisher: "Coding World", date: "2020-05-22", submittedForms: "Yes" },
    { name: "Bob Lee", bookName: "UI/UX Principles", isbn: "654-3219876543", publisher: "Art Books", date: "2019-11-12", submittedForms: "Yes" },
    { name: "Chris Martin", bookName: "Node.js Guide", isbn: "432-1098765432", publisher: "Tech Guides", date: "2023-03-01", submittedForms: "No" },
    { name: "Emma Wilson", bookName: "Data Science 101", isbn: "567-8901234567", publisher: "Data Books", date: "2022-07-18", submittedForms: "Yes" },
    { name: "James Brown", bookName: "Machine Learning Basics", isbn: "876-5432109876", publisher: "AI Press", date: "2021-02-25", submittedForms: "No" },
  ];

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

  return (
    <>
      <Header backPage="" />

      <div className="px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start font-poppins">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Books Published
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
                      {header.charAt(0).toUpperCase() + header.slice(1)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Table Body */}
              <div className="table-row-group">
                {currentRows.map((item, rowIndex) => (
                  <div key={rowIndex} className="table-row border-b">
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
                        {item[header]}
                      </div>
                    ))}
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
    </>
  );
};

export default ViewDataTable;
