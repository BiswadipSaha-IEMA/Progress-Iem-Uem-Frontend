import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscDiffAdded } from "react-icons/vsc";
import { FaBookBookmark } from "react-icons/fa6";
import { useGetReq } from "../../../hooks/useHttp";
import IndustrialPopup from "../../../utils/Popup/FormPopUp/IndustrialPopup";
import FacultyPopup from "../../DetailedSuperAdmin/FacultyPopup";
import Header from "../../../Components/Header/Header";
import Lottie from "react-lottie";
import NoDataFaculty from '../../../Lottie/NoDataFaculty.json';

export default function IndustrialTour() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]); // Keep all data for resetting search
  const [getReq] = useGetReq();
  const [currentPage, setCurrentPage] = useState(1);
  const [detailedClick, setDetailedClick] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For loading state

  const options = {
    loop: true,
    autoplay: true,
    animationData: NoDataFaculty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const rowsPerPage = 10;
  const accessToken = sessionStorage.getItem("token").split('"')[1];

  useEffect(() => {
    const getBPData = async () => {
      try {
        setIsLoading(true); // Show loading animation
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        const arr = [];
        if (response.success) {
          console.log(response.data.data);

          response.data.data.forEach((data) => {
            if (data.eventType === "IndustrialTour") arr.push(data);
          });

          setData(arr);
          setData1(arr); // Store the original data to reset after search
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Hide loading animation
      }
    };

    getBPData();
  }, [showPopUp]);

  const handleSearch = (event) => {
    const searchData = event.target.value.toLowerCase();
    setSearchTerm(searchData);

    // Filter data based on search term
    const filteredData = data1.filter(
      (item) =>
        item.attendedBy?.toLowerCase().includes(searchData) ||
        item.industryName?.toLowerCase().includes(searchData) ||
        item.organizedBy?.toLowerCase().includes(searchData)
    );

    setData(filteredData);
    setCurrentPage(1); // Reset to page 1 after search
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
    "Faculty",
    "Organized By",
    "Date",
    "Industry Name",
    "Attended By",
    "Status",
    "Email",
    "Proof of Document",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-auto px-4 sm:px-10">
        <Header backPage="/faculty/dashboard" />
        {isLoading ? (
          <div className="flex items-center w-full h-[70vh] justify-center">
            <div className="flex justify-center items-center">
              <Lottie options={options} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 mt-10">
              <div className="flex items-center gap-5 mb-4 sm:mb-0">
                <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
                <div className="text-[20px] sm:text-[25px] font-semibold">
                  Industrial Tour
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-[300px] lg:w-[500px]">
                  <input
                    type="text"
                    placeholder="Search by Tour Name"
                    onChange={handleSearch}
                    value={searchTerm}
                    className="w-full h-[50px] font-semibold py-2 pl-10 outline-none pr-10 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
                  />
                  <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A]" />
                  <RxCross2
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A] cursor-pointer"
                    onClick={() => {
                      setSearchTerm("");
                      setData(data1); // Reset to original data
                    }}
                  />
                </div>
                <button
                  className="bg-[#03A8FD] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                  onClick={() => setShowPopUp(true)}
                >
                  Add New Tour
                  <VscDiffAdded className="text-[1.3rem]" />
                </button>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="mt-5 overflow-x-auto rounded-lg">
              <div className="min-w-full bg-white rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    {/* Table Header */}
                    <thead>
                      <tr className="bg-[#DEF4FF] h-12 text-center text-[#575757] font-semibold">
                        <th className="px-4 py-2 sticky left-0 bg-[#DEF4FF] z-10">SL. No</th>
                        {columnHeaders.map((header, index) => (
                          <th key={index} className="px-4 py-2 whitespace-nowrap">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                      {currentRows.map((item, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="border-b h-[50px] text-center cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            setSelectedData(item);
                            setDetailedClick(true);
                          }}
                        >
                          <td className="px-4 py-2 sticky left-0 bg-white">
                            {indexOfFirstRow + rowIndex + 1}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.createdBy.name}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.organizedBy}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.industryName}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.attendedBy}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.status}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.createdBy.email}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            {item.proofDocument ? (
                              <a
                                href={item.proofDocument}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 no-underline"
                              >
                                Link
                              </a>
                            ) : (
                              "NA"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Pagination Controls for large screens */}
            <div className="hidden sm:flex justify-end mt-4">
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

        {/* Pop-up for Adding Tour */}
        {showPopUp && (
          <IndustrialPopup setUtilFor={"bpAddForm"} setShowPopup={setShowPopUp} />
        )}

        {/* Detailed view pop-up */}
        {detailedClick && (
          <FacultyPopup setShowPopup={setDetailedClick} data={selectedData} />
        )}
      </div>
    </div>
  );
}
