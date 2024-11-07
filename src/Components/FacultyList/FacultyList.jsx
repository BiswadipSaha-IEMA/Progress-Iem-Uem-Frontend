import { useState } from "react";
import Header from "../Header/Header.jsx";

const FacultyList=() => {
  // Dummy data for the table (20 items for demonstration)
  const data = Array.from({ length: 50 }, (_, i) => ({
    userId: i + 1,
    user: { name: `User ${i + 1}` },
  }));

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Calculate pagination details
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handleRowClick = (userId) => {
    console.log("View details for user:", userId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(currentPage - 5, 0),
    Math.min(currentPage + 4, totalPages)
  );

  return (
    <>
      <Header />

      {/* Table */}
      <div className="overflow-x-auto bg-white">
        <div className="flex justify-center items-center sm:text-[1.5rem] lg:text-[2.5rem] font-semibold text-[#03A8FD] font-poppins py-5">Faculty List</div>

        <table className="min-w-full border border-gray-200 font-poppins">
          <thead className="bg-[#03A8FD] text-white py-3">
            <tr>
              <th className="px-4 py-2 text-center font-semibold">Sl. No</th>
              <th className="px-4 py-2 text-center font-semibold">Faculty Name</th>
              <th className="px-4 py-2text-center"/>
            </tr>
          </thead>
          <tbody className="bg-[#ECECEC] mx-2">
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr
                  key={item.userId}
                  className="bg-white hover:bg-gray-100 cursor-pointer px-4"
                >
                  <td className="px-4 py-2 border text-center">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {item.user?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleRowClick(item.userId)}
                      className="bg-[#03A8FD] px-8 py-2 rounded-md text-white"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center border">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination and Rows per Page */}
      <div className="flex justify-between mt-4 items-center">
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 mx-1 text-sm bg-[#03A8FD] text-white rounded hover:[#03A8FD] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {currentPage > 5 && <span className="px-3 py-1 text-sm">...</span>}
            {pageButtons.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 mx-1 text-sm rounded hover:bg-[#03A8FD] ${
                  currentPage === page
                    ? "bg-[#03A8FD] text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages - 4 && (
              <span className="px-3 py-1 text-sm">...</span>
            )}
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 mx-1 text-sm bg-[#03A8FD] text-white rounded hover:[#03A8FD] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Rows per Page */}
        <div className="flex items-center">
          <label className="mr-2">Rows per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setCurrentPage(1); // Reset to first page on page size change
            }}
            className="p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default FacultyList;
