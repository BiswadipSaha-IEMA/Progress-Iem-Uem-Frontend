import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscDiffAdded } from "react-icons/vsc";
import { FaBookBookmark } from "react-icons/fa6";
import { useGetReq } from "../../../hooks/useHttp";
import BookPublished from "../../../utils/Popup/FormPopUp/BookPublished";
import Header from "../../../Components/Header/Header";

import EditFormPopUp from "./EditFormPopUp";

// lottie
import Lottie from "react-lottie";
import NoDataFaculty from "../../../Lottie/NoDataFaculty.json";
// import noDataFound from "../../../Lottie/noDataFound.json"

export default function FacultyBookPublished() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [getReq] = useGetReq();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;
  const [editBpData, setEditBpData] = useState(false);

  // lottie
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = sessionStorage.getItem("token").split('"')[1];
  const getBookData = async () => {
    // lottie
    setIsLoading(true);
    try {
      const response = await getReq(
        "api/v1/document/getAllPublications",
        accessToken
      );
      const arr = [];
      if (response.success) {
        response.data.data.forEach((data) => {
          if (data.publicationType === "Book") arr.push(data);
        });
        setData(arr);
        setData1(arr);
        // console.log(arr)
      }
    } catch (error) {
      console.log(error);
    } finally {
      // lottie
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookData();
  }, [showPopUp]);

  const handleSearch = (event) => {
    const searchData = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);
    const filteredData = data1.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchData) ||
        item.name?.toLowerCase().includes(searchData) ||
        item.isbn?.toLowerCase().includes(searchData)
    );
    setData(filteredData);
    setCurrentPage(1);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const columnHeaders = [
    "Author Type",
    "Title",
    "Faculty Name",
    "Published Date",
    "Publisher Name",
    "ISBN Number",
    "Email Address",
    "Status",
    "Proof of Document",
  ];

  // lottie
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: NoDataFaculty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <div className="flex-1 overflow-auto px-4 sm:px-10 pb-16 md:pb-2">
        <Header backPage="/faculty/dashboard" />
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 mt-10">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Books Published
            </div>
          </div>
        </div>
        {/* lottie */}
        {isLoading ? (
          <div className="flex justify-center items-center"></div>
        ) : data.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-8 m-10 bg-white rounded-lg font-poppins">
            {/* <Lottie options={lottieOptions} height={250} width={250} /> */}
            <p>No results found. Please try searching with different keywords.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
              <div className="relative w-full sm:w-[300px] lg:w-[500px] mr-4">
                <input
                  type="text"
                  placeholder="Search by Book Published"
                  onChange={handleSearch}
                  value={searchTerm}
                  className="w-full h-[50px] font-semibold py-2 pl-10 outline-none pr-10 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
                />
                <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A]" />
                <RxCross2
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A] cursor-pointer"
                  onClick={() => {
                    setSearchTerm("");
                    setData(data1);
                  }}
                />
              </div>
              <button
                className="bg-[#03A8FD] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                onClick={() => setShowPopUp(true)}
              >
                Publish New Book
                <VscDiffAdded className="text-[1.3rem]" />
              </button>
            </div>

            {/* Responsive Table */}
            <div className="mt-5 overflow-x-auto rounded-lg">
              <div className="min-w-full bg-white rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    {/* Table Header */}
                    <thead>
                      <tr className="bg-[#DEF4FF] h-12 text-center text-[#1A1A1D] font-semibold">
                        <th className="px-4 py-2 sticky left-0 bg-[#DEF4FF] z-10">
                          SL. No
                        </th>
                        {columnHeaders.map((header, index) => (
                          <th
                            key={index}
                            className="px-4 py-2 whitespace-nowrap"
                          >
                            {header}
                          </th>
                        ))}
                        <th className="px-4 py-2 sticky left-0 bg-[#DEF4FF] z-10">
                          Any Update
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {currentRows.map((item, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="border-b h-[50px] text-center hover:bg-gray-100"
                        >
                          <td className="px-4 py-2 sticky left-0 bg-white">
                            {indexOfFirstRow + rowIndex + 1}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.authorType}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.title}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.createdBy.name}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.isbn}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.createdBy.email}
                          </td>
                          <td
                            className={`px-4 py-2 whitespace-nowrap ${
                              item.status === "Approved"
                                ? "text-green-600"
                                : item.status === "Rejected"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {item.status}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.proofDocument ? (
                              <a
                                href={item.proofDocument}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#3FBDFE] no-underline"
                              >
                                Link
                              </a>
                            ) : (
                              "NA"
                            )}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.status === "Rejected" ? (
                              <button
                                className="bg-[#03A8FD] text-[#fff] px-10 py-2 rounded-lg"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditBpData(true);
                                  setSelectedData(item);
                                }}
                              >
                                Edit
                              </button>
                            ) : (
                              <button className="bg-[#C7C8CC] text-[#F9F3F3] px-10 py-2 rounded-lg cursor-not-allowed" >
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 hidden md:flex justify-end">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50"
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
          </>
        )}
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white py-2 px-4 shadow-md flex justify-end z-20">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-[#03A8FD] text-white font-semibold rounded-lg disabled:opacity-50"
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

      {showPopUp && (
        <BookPublished setUtilFor={"bpAddForm"} setShowPopup={setShowPopUp} />
      )}

      {editBpData && (
        <EditFormPopUp
          data={selectedData}
          setShowPopup={setEditBpData}
          fetchData={getBookData}
        />
      )}
    </div>
  );
}
