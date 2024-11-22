import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscDiffAdded } from "react-icons/vsc";
import { FaBookBookmark } from "react-icons/fa6";
import { useGetReq } from "../../../hooks/useHttp";
import TriMentoringPopUp from "../../../utils/Popup/FormPopUp/TriMentoringPopUp";
import FacultyPopup from "../../DetailedSuperAdmin/FacultyPopup";
import Header from "../../../Components/Header/Header";
import Lottie from "react-lottie";
import NoDataFaculty from '../../../Lottie/NoDataFaculty.json';

const Component = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [getReq] = useGetReq();
  const [currentPage, setCurrentPage] = useState(1);
  const [detailedClick, setDetailedClick] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const rowsPerPage = 10;
  const accessToken = sessionStorage.getItem("token")?.split('"')[1];

  const options = {
    loop: true,
    autoplay: true,
    animationData: NoDataFaculty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    const getBPData = async () => {
      setIsLoading(true);
      setIsLoading(true);
      try {
        const response = await getReq("api/v1/document/getAllEvents", accessToken);
        if (response.success) {
          const filteredData = response.data.data.filter((item) => item.eventType === "Tri-Mentoring");
          setData(filteredData);
          setData1(filteredData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getBPData();
  }, [accessToken, showPopUp]);

  const handleSearch = (event) => {
    const searchData = event.target.value.toLowerCase();
    setSearchTerm(searchData);
    const filteredData = data1.filter(
      (item) =>
        item.attendedBy?.toLowerCase().includes(searchData) ||
        item.takenBy?.toLowerCase().includes(searchData) ||
        item.organizedBy?.toLowerCase().includes(searchData)
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
    "Faculty",
    "Organized By",
    "Date",
    "Taken By",
    "Attended By",
    "Status",
    "Email",
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
                <div className="text-[20px] sm:text-[25px] font-semibold">
                  Tri-Mentoring Systems
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-[300px] lg:w-[500px]">
                  <input
                    type="text"
                    placeholder="Search by Tri-Mentoring System"
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
                  Add New Tri-Mentoring System
                  <VscDiffAdded className="text-[1.3rem]" />
                </button>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="mt-5 overflow-x-auto rounded-lg">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
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
                      <td className="px-4 py-2 whitespace-nowrap">{item.createdBy.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.organizedBy}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.date}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.takenBy}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{item.attendedBy}</td>
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

        {showPopUp && <TriMentoringPopUp setUtilFor={"bpAddForm"} setShowPopup={setShowPopUp} />}
        {detailedClick && <FacultyPopup setShowPopup={setDetailedClick} data={selectedData} />}
      </div>
    </div>
  );
};

export default Component;
