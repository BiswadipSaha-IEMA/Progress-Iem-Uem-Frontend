import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscDiffAdded } from "react-icons/vsc";
import { FaBookBookmark } from "react-icons/fa6";
import { useGetReq } from "../../../hooks/useHttp";
import ResearchPaperGradeA from "../../../utils/Popup/FormPopUp/ResearchPaperGradeA";
import Header from "../../Header/Header";
import ConferenceGradeA from "../../../utils/Popup/FormPopUp/ConferenceGradeA";

export default function FacultyConferenceGradeAComp() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [getReq] = useGetReq();
  const [currentPage, setCurrentPage] = useState(1);
  const [detailedClick, setDetailedClick] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;

  const accessToken = sessionStorage.getItem("token").split('"')[1];

  useEffect(() => {
    const getBPData = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllPublications",
          accessToken
        );
        const arr = [];
        if (response.success) {
          response.data.data.forEach((data) => {
            if (
              data.publicationGrade === "Grade-A" &&
              data.publicationType === "Conference"
            )
              arr.push(data);
          });
          setData(arr);
          setData1(arr);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBPData();
  }, [showPopUp]);

  const handleSearch = (event) => {
    const searchData = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);
    const filteredData = data1.filter(
      (item) =>
        item.title.toLowerCase().includes(searchData) ||
        item.name.toLowerCase().includes(searchData) ||
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
    "Faculty",
    "Publisher Name",
    "Published Date",
    "Issue No",
    "Status",
    "Email",
    "Proof of Document",
  ];

  return (
    <div>
      <div className="flex-1 px-4 overflow-auto sm:px-10">
        <Header backPage="/faculty/dashboard" />
        <div className="flex flex-col justify-between mt-10 mb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Research Paper Published Conference Grade A
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-[300px] lg:w-[500px]">
              <input
                type="text"
                placeholder="Search by Paper Title"
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
              Add New Paper
              <VscDiffAdded className="text-[1.3rem]" />
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="mt-5 overflow-x-auto rounded-lg">
          <div className="min-w-full overflow-hidden bg-white rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#DEF4FF] h-12 text-center text-[#575757] font-semibold">
                    <th className="px-4 py-2 sticky left-0 bg-[#DEF4FF] z-10">
                      SL. No
                    </th>
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
                      <td className="sticky left-0 px-4 py-2 bg-white">
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
                        {item.name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item.date}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {item.issue}
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
        <div className="justify-end hidden mt-4 sm:flex">
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
      </div>

      {/* Pagination Controls for small screens */}
      <div className="sticky bottom-0 left-0 right-0 z-20 flex justify-end px-4 py-2 bg-white shadow-md sm:hidden">
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
        <ConferenceGradeA
          setUtilFor={"bpAddForm"}
          setShowPopup={setShowPopUp}
        />
      )}
    </div>
  );
}
