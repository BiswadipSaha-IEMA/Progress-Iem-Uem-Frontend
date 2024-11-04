import React,{useState} from "react";
import { RxCross2 } from "react-icons/rx";
import { FaBookBookmark } from "react-icons/fa6";
import { CiFilter, CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import DataTable from "react-data-table-component";

export default function SeminarPopUp({ setPopupShow, setUtilFor, takeData }) {

    const [calendarShow, setCalendarShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = (e) => setSearchInput(e.target.value);
  return (
    <>
      {setUtilFor === "viewSeminarTable" && (
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
          <div className="bg-white py-10 px-4 rounded-[0px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1000px] min-w-[300px] h-full lg:h-[600px] md:h-[600px] lg:rounded-[14px] md:rounded-[14px]">
            {/* Close Button */}
            <div
              className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
              onClick={() => setPopupShow(false)}
            >
              <RxCross2 className="text-white" />
            </div>

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6 mt-10">
              <div className="flex items-center gap-3">
                <FaBookBookmark className="text-3xl text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Seminar Organized
                </h2>
              </div>

              {/* Search Field */}
              <div className="relative w-full sm:w-1/2">
                <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search with Name or ISS..."
                  value={searchInput}
                  onChange={handleSearch}
                  className="w-full pl-12 py-2 rounded-lg border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                />
              </div>
            </div>

            {/* Filter & Sort Section */}
            <div className="flex gap-4 mt-6 w-full overflow-x-auto">
              <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                <CiFilter className="text-lg" />
                <span>Filter</span>
              </button>
              <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                <GoSortDesc className="text-lg" />
                <span>Sort: Chronological</span>
              </button>
              <button
                className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150"
                onClick={() => setCalendarShow(!calendarShow)}
              >
                <span>Current Month</span>
              </button>
            </div>

            {/* Calendar Overlay */}
            {calendarShow && (
              <div
                id="calendar-overlay"
                className="fixed top-[150px] flex justify-center items-center left-0 z-50 w-full h-full bg-black bg-opacity-25"
                onClick={() => setCalendarShow(false)}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-center text-lg font-semibold">
                    Calendar Component
                  </div>
                </div>
              </div>
            )}

            {/* DataTable Section */}
            <div className="w-full h-[300px] overflow-x-auto mt-6 bg-gray-100 rounded-lg p-4 shadow-inner">
              {takeData[0].length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Lottie options={defaultOptions} height={200} width={200} />
                  <p className="text-2xl font-bold text-blue-500 mt-4">
                    No Files Submitted
                  </p>
                </div>
              ) : (
                <DataTable
                  columns={takeData[0]}
                  data={takeData[1].map((row, i) => ({
                    ...row,
                    ref: (el) => (rowRefs.current[i] = el),
                  }))}
                  defaultSortField="serial"
                  defaultSortAsc={true}
                  customStyles={{
                    headCells: {
                      style: {
                        backgroundColor: "#e0f7ff",
                        color: "#333",
                        fontWeight: "bold",
                        textAlign: "center",
                      },
                    },
                    headRow: {
                      style: {
                        backgroundColor: "#e0f7ff",
                      },
                    },
                    cells: {
                      style: {
                        backgroundColor: "#fff",
                        color: "#333",
                        textAlign: "center",
                        fontSize: "14px",
                      },
                    },
                  }}
                  className=""
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
