import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useGetReq } from "../../hooks/useHttp";


const FacultyList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const department = sessionStorage.getItem("dept");
  const [getReq] = useGetReq();

  let stream = "";
  if (department) {
    for (let i = 0; i < department.length; i++) {
      if (department.charCodeAt(i) >= 65 && department.charCodeAt(i) <= 90) {
        stream += department.charAt(i);
      }
    }
  }

  console.log(stream);

  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await getReq(
          `api/v1/user/getUser/${stream}`,
          accessToken
        );
        if (response.success) {
          console.log(response);
          setData(response.users);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (accessToken) {
      getFaculty();
    }
  }, [accessToken]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const totalPages = Math.ceil(data?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data?.slice(startIndex, endIndex);

  const handleRowClick = (eventId) => {
    console.log("View details for event:", eventId);
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
      <Header backPage="/"/>
      {/* <div className="bg-[#ECECEC] px-20 py-20"> */}
      <div className="lg:px-6 lg:py-5 flex flex-col justify-center items-center gap-5 bg-white rounded-lg ">
        <div className="overflow-x-auto font-poppins lg:w-[90%] h-[50%]">
          <div
            className="flex justify-left items-center text-[1.4rem] lg:text-[2.2rem] font-semibold text-[#03A8FD] py-5 shadow-lg"
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}
          >
            Faculty List
          </div>

          {/* <div className="bg-[#ECECEC] p-4 rounded-lg"> */}
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-[#03A8FD] text-white lg:text-[1.4rem] text-[1rem] lg:p-4 p-2 rounded-t-lg">
            <div className="text-center font-semibold py-3 flex justify-center items-center">
              Sl. No
            </div>
            <div className="text-center font-semibold py-3 flex justify-center items-center">
              Faculty Name
            </div>
            <div className="text-center font-semibold py-3 flex justify-center items-center">
              Actions
            </div>
          </div>

          {/* Data Rows */}
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <div className="bg-[#ECECEC] px-4 pt-2 pb-2 ">
                <div
                  key={item.userId}
                  className="grid grid-cols-3 bg-white my-2 rounded-lg shadow hover:bg-gray-100 p-5"
                >
                  <div className="text-center flex justify-center items-center lg:text-[1.3rem] text-[1rem]">
                    {startIndex + index + 1}
                  </div>
                  <div className="text-center flex justify-center items-center lg:text-[1.3rem] text-[1rem]">
                    {item.email|| "N/A"}
                  </div>
                  <div className="text-center flex justify-center items-center lg:text-[1.3rem] text-[0.8rem]">
                    <button
                      onClick={() => handleRowClick(item.userId)}
                      className="bg-[#03A8FD] lg:px-8 lg:py-2 px-4 py-1 rounded-md text-white"
                    >
                      View Data
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">No results found.</div>
          )}
          {/* </div> */}
        </div>

        {/* Pagination and Rows per Page */}
        <div className="flex justify-between mt-4 items-center gap-[72rem] text-[1.2rem]">
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 text-[1.2rem] bg-[#03A8FD] text-black rounded hover:bg-[#03A8FD] disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {currentPage > 5 && (
                <span className="px-3 py-1 text-[1.2rem]">...</span>
              )}
              {pageButtons.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 mx-1 text-[1.2rem] rounded hover:bg-[#03A8FD] ${
                    currentPage === page
                      ? "bg-[#03A8FD] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {page}
                </button>
              ))}
              {currentPage < totalPages - 4 && (
                <span className="px-3 py-1 text-[1.2rem]">...</span>
              )}
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 text-[1.2rem] bg-[#03A8FD] text-white rounded hover:bg-[#03A8FD] disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                setCurrentPage(1);
              }}
              className="p-2 border border-gray-300 rounded-md shadow-sm outline-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default FacultyList;
