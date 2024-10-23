import React, { useState } from "react";
import IEM from "../../assets/IEM.png";
import UEM from "../../assets/UEM.png";
import { FaBookBookmark } from "react-icons/fa6";
import { CiFilter, CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DataTable from "react-data-table-component";
import {
  booksPublishedData,
  researchPapersGradeAData,
  researchPapersGradeBData,
  researchPapersGradeCData,
} from "../../constants/studentData";

import "./customScrollbar.css";
import { RxCrossCircled } from "react-icons/rx";

function StudentComp() {
  const [recordsOfBp, setRecordsOfBp] = useState(booksPublishedData);
  const [originalData] = useState(booksPublishedData);

  const columnsBp = [
    {
      name: <div className="w-full flex justify-center">SL. No.</div>,
      cell: (row) => (
        <div className="w-full flex justify-center items-center text-gray-800">
          {row.serial}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full flex justify-center">Name</div>,
      cell: (row) => (
        <div className="w-full flex justify-center items-center text-gray-800">
          {row.name}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full flex justify-center">
          Book Name Along With ISBN/ISSN No.
        </div>
      ),
      cell: (row) => (
        <div className="w-full flex justify-center items-center text-gray-800">
          {row.issn_isbn}
        </div>
      ),
    },
    {
      name: <div className="w-full flex justify-center">Publisher Name</div>,
      cell: (row) => (
        <div className="w-full flex justify-center items-center text-gray-800">
          {row.publisher_name}
        </div>
      ),
    },
    {
      name: <div className="w-full flex justify-center">Published Date</div>,
      cell: (row) => (
        <div className="w-full flex justify-center items-center text-gray-800">
          {new Date(row.published_date).toLocaleDateString("en-US")}
        </div>
      ),
    },
    {
      name: <div className="w-full flex justify-center">Submitted Forms</div>,
      cell: (row) => (
        <div className="w-full flex justify-center items-center text-blue-500">
          {row.submitted}
        </div>
      ),
    },
  ];

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = originalData.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchValue) ||
        row.issn_isbn.toLowerCase().includes(searchValue) ||
        row.publisher_name.toLowerCase().includes(searchValue)
      );
    });
    setRecordsOfBp(filteredData);
  };

  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [calendarShow, setCalendarShow] = useState(false);

  const onDateChange = (date) => {
    setCurrentMonth(
      new Date(date).toLocaleString("default", { month: "long" })
    );
    setCalendarShow(false);
  };

  const handleCloseCalendar = (e) => {
    if (e.target.id === "calendar-overlay") {
      setCalendarShow(false);
    }
  };

  return (
    <>
      <div className="flex justify-between px-5 sm:px-10 py-5">
        <img src={IEM} alt="IEM" className="h-20 w-16 mr-4" />
        <div className="relative mt-4 sm:mt-10">
          <div
            className="text-[2rem] sm:text-[4rem] lg:text-[6rem] font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            style={{
              backgroundImage: "radial-gradient(circle, #fff, #cceeff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            IEM-UEM
          </div>
          <div className="absolute top-[20%] sm:top-[38%] left-[10%] sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
            IEM - UEM Progress
          </div>
        </div>
        <img src={UEM} alt="UEM" className="h-20 w-16 mr-4" />
      </div>

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-10 mr-10 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">Book Published</div>
          </div>

          <div className="relative">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[400px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearch}
              placeholder="Search with Name or ISSN or ISBN number"
            />
            <RxCrossCircled className="absolute top-3 text-[#b4b7bd] text-[20px] right-2" 
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-wrap">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1">
            <CiFilter className="text-[2rem] text-[#b4b7bd]" />
          </div>
          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-5 py-1">
            <GoSortDesc className="text-[2rem] text-[#b4b7bd]" />
            <div className="text-[#b4b7bd]">Sort: Chronological</div>
          </div>
          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-3 gap-5 cursor-pointer"
            onClick={() => {
              setCalendarShow(true);
            }}
          >
            <div className="text-[#b4b7bd] font-semibold">{"<"}</div>
            <div className="text-[#b4b7bd] font-semibold">{currentMonth}</div>
            <div className="text-[#b4b7bd] font-semibold">{">"}</div>
          </div>
          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-lg h-[250px] overflow-scroll overflow-x-hidden custom-scrollbar">
          <DataTable
            columns={columnsBp}
            data={recordsOfBp}
            defaultSortField="serial"
            defaultSortAsc={true}
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#def4ff",
                  color: "#333",
                  fontWeight: "bold",
                  textAlign: "center",
                },
              },
              headRow: {
                style: {
                  backgroundColor: "#def4ff",
                  border: "none",
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default StudentComp;
