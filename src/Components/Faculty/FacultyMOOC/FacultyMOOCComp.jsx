import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscDiffAdded } from "react-icons/vsc";
import { FaBookBookmark } from "react-icons/fa6";
import { useGetReq } from "../../../hooks/useHttp";
import MoocsPopUp from "../../../utils/Popup/FormPopUp/MoocsPopUp";
import FacultyPopup from "../../DetailedSuperAdmin/FacultyPopup";
import Header from "../../../Components/Header/Header";
import Lottie from "react-lottie";
import NoDataFaculty from '../../../Lottie/NoDataFaculty.json';

import EditFormPopUp from "./EditFormPopUp";

export default function Component() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]); // Store original data for resetting
  const [getReq] = useGetReq();
  const [currentPage, setCurrentPage] = useState(1);
  const [detailedClick, setDetailedClick] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const options = {
    loop: true,
    autoplay: true,
    animationData: NoDataFaculty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const rowsPerPage = 10;
  const accessToken = sessionStorage.getItem("token").split('"')[1];

  useEffect(() => {
    const getMoocsData = async () => {
      setIsLoading(true); // Set loading state to true before fetching data
      try {
        const response = await getReq("api/v1/document/getAllMoocs", accessToken);
        if (response.success) {
          setData(response.data.data);
          setData1(response.data.data); // Store the original data for resetting search
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching
      }
    };
    getMoocsData();
  }, [showPopUp]);

  const handleSearch = (event) => {
    const searchData = event.target.value.toLowerCase();
    setSearchTerm(searchData);
    const filteredData = data1.filter(
      (item) =>
        item.faculty?.toLowerCase().includes(searchData) ||
        item.developedModule?.toLowerCase().includes(searchData) ||
        item.facility?.toLowerCase().includes(searchData) ||
        item.efacility?.toLowerCase().includes(searchData) ||
        item.platformUsed?.toLowerCase().includes(searchData)
    );
    setData(filteredData);
    setCurrentPage(1); // Reset to first page after search
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
    "Name of the module developed",
    "Platform on which module is developed",
    "Date of launching e content",
    "Link to the relevant document and facility available in the institution",
    "List of the e-content development facility available",
    "Status",
    "Email",
    "Proof of Document"
  ];

  return (
    <div className="flex flex-col min-h-screen">
     <div className="flex-1 overflow-auto px-4 sm:px-10 pb-16 md:pb-2">
        <Header backPage="/faculty/dashboard" />
        {isLoading ? (
          <div className="flex items-center w-full h-[70vh] justify-center">
          <div className=" flex justify-center items-center ">
            <Lottie options={options}  className=''/>
          </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 mt-10">
              <div className="flex items-center gap-5 mb-4 sm:mb-0">
                <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
                <div className="text-[20px] sm:text-[25px] font-semibold">Moocs</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-[300px] lg:w-[500px]">
                  <input
                    type="text"
                    placeholder="Search by Module Name"
                    onChange={handleSearch}
                    value={searchTerm}
                    className="w-full h-[50px] font-semibold py-2 pl-10 outline-none pr-10 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
                  />
                  <MdOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A]" />
                  <RxCross2
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[1.5rem] text-[#7A7A7A] cursor-pointer"
                    onClick={() => {
                      setSearchTerm("");
                      setData(data1); // Reset data to original
                    }}
                  />
                </div>
                <button
                  className="bg-[#03A8FD] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                  onClick={() => setShowPopUp(true)}
                >
                  Add New Moocs
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
                          <th key={index} className="px-4 py-2 whitespace-nowrap">{header}</th>
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
                          <td className="px-4 py-2 sticky left-0 bg-white">{indexOfFirstRow + rowIndex + 1}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.faculty}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.developedModule}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.platformUsed}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.dateOfLaunch}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.facility}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.eFacility}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.status}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.createdBy.email}</td>
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

            {/* Pagination Controls */}
            <div className="flex justify-end mt-4">
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

        {/* Pop-ups */}
        {showPopUp && (
          <MoocsPopUp setUtilFor={"bpAddForm"} setShowPopup={setShowPopUp} />
        )}
        {detailedClick && (
          <FacultyPopup setShowPopup={setDetailedClick} data={selectedData} />
        )}
      </div>
    </div>
  );
}
