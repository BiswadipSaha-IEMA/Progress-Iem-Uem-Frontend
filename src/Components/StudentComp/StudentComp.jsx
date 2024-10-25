import React, { useEffect, useState } from "react";
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
import NoFilesPresent from "../../Lottie/NoFilesPresent.json";
import Lottie from "react-lottie";
import { useGetReq } from "../../hooks/useHttp";

function StudentComp() {
  const [recordsOfBp, setRecordsOfBp] = useState([]);
  const [originalData] = useState(booksPublishedData);
  const [getReq] = useGetReq();
  const [storeData, setStoreData] = useState(null)
  const bookDataArr= []
  const [bookDataArrState, setBookDataArrState]= useState(null)
  const [bookDataSubmittedArrState, setBookDataSubmittedArrState]= useState(null)

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: NoFilesPresent,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  // const accessTokenObj = JSON.parse(accessToken);
  // console.log(`${accessToken}`);
  // console.log({})

  useEffect(() => {
    const allInfo = async () => {
      const response = await getReq(
        "api/v1/document/getAllPublications",
       accessToken
      );
      if(response.success){
        setStoreData(response.data.data)
        setBookDataSubmittedArrState(response.data.userSubmittedCounts)
        console.log(response)
      }
      
    };
    allInfo()
  }, []);

  useEffect(() => {
    console.log(storeData);
    if(storeData!==null){
      console.log(bookDataSubmittedArrState)
      const booksData = storeData.map((item) => {
        return item.publicationType === 'Book';
      });

      for(let i=0;i<booksData.length;i++){
        if(booksData[i]===true){
          bookDataArr.push(storeData[i])
        }
      }
      setBookDataArrState(bookDataArr)
    }
  }, [storeData]);

  useEffect(()=>{
    console.log(bookDataArrState);
    if(bookDataArrState!==null)
      setRecordsOfBp(bookDataArrState);
  })
  
  useEffect(()=>{
    if(bookDataArr!==null && bookDataSubmittedArrState!== null){
      for(let i=0; i<bookDataSubmittedArrState.length;i++){
        // const margeData= bookDataArr.forEach((element)=>{
        //   if(element.createdBy=== bookDataSubmittedArrState.)
        // })
        console.log('====================================');
        console.log('nnklnbdlqendqledlqbndlednb');
        console.log('====================================');
        console.log(bookDataSubmittedArrState)
      }
    }
  })
  

  

  const columnsBp = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {row.serial}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Name</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Book Name</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.title}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          ISBN/ISSN No.
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.isbn}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Publisher Name
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.publisher}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Published Date
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Submitted Forms
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-blue-500">
          {row.submitted}
        </div>
      ),
    },
  ];

  const columns = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {row.serial}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Name</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Journal/conference/Bookchapter
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.journal_name}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Paper Name</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.paper_name}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Vol. No.</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.vol}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Issue No.</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.issue}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">pp No.</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.pp}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Published Date
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {new Date(row.published_date).toLocaleDateString("en-US")}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Submitted Forms
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-blue-500">
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

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:justify-between sm:items-center md:justify-between md:items-start">
          <div className="flex items-center gap-5 mb-4 sm:mb-0 md:items-start md:justify-start">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Book Published
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearch}
              placeholder="Search with Name or ISS..."
            />
            {/* <RxCrossCircled className="absolute top-3 text-[#b4b7bd] text-[20px] right-2" /> */}
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            {/* <div className="text-[0.85rem] sm:text-[1rem] md:text-[1.25rem] font-semibold">{"<"}</div> */}
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
            {/* <div className="text-[0.85rem] sm:text-[1rem] md:text-[1.25rem] font-semibold">{">"}</div> */}
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px]  bg-opacity-50 flex justify-center items-center sm:items-center left-[-30px] z-50 "
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-lg h-[250px] overflow-scroll overflow-x-hidden custom-scrollbar flex justify-center align-middle items-center">
          {recordsOfBp?.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Files Submitted
              </div>
            </div>
          ) : (
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
              className="mt-10"
            />
          )}
        </div>
      </div>

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Research Paper Published (Grade-A) -(SCI, SCIE, Scopus, WoS, ESCI,
              Nature)
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearch}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[250px] overflow-auto custom-scrollbar">
          {researchPapersGradeAData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Files Submitted
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={researchPapersGradeAData}
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
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>
      </div>

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:justify-between sm:items-center md:justify-between md:items-start">
          <div className="flex items-center gap-5 mb-4 sm:mb-0 md:items-start md:justify-start">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Book Published
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearch}
              placeholder="Search with Name or ISS..."
            />
            {/* <RxCrossCircled className="absolute top-3 text-[#b4b7bd] text-[20px] right-2" /> */}
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            {/* <div className="text-[0.85rem] sm:text-[1rem] md:text-[1.25rem] font-semibold">{"<"}</div> */}
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
            {/* <div className="text-[0.85rem] sm:text-[1rem] md:text-[1.25rem] font-semibold">{">"}</div> */}
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px]  bg-opacity-50 flex justify-center items-center sm:items-center left-[-30px] z-50 "
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-lg h-[250px] overflow-scroll overflow-x-hidden custom-scrollbar flex justify-center align-middle items-center">
          {recordsOfBp.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Files Submitted
              </div>
            </div>
          ) : (
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
              className="mt-10"
            />
          )}
        </div>
      </div>
      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:justify-between sm:items-center md:justify-between md:items-start">
          <div className="flex items-center gap-5 mb-4 sm:mb-0 md:items-start md:justify-start">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Book Published
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearch}
              placeholder="Search with Name or ISS..."
            />
            {/* <RxCrossCircled className="absolute top-3 text-[#b4b7bd] text-[20px] right-2" /> */}
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            {/* <div className="text-[0.85rem] sm:text-[1rem] md:text-[1.25rem] font-semibold">{"<"}</div> */}
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
            {/* <div className="text-[0.85rem] sm:text-[1rem] md:text-[1.25rem] font-semibold">{">"}</div> */}
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px]  bg-opacity-50 flex justify-center items-center sm:items-center left-[-30px] z-50 "
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 rounded-lg h-[250px] overflow-scroll overflow-x-hidden custom-scrollbar flex justify-center align-middle items-center">
          {recordsOfBp.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Files Submitted
              </div>
            </div>
          ) : (
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
              className="mt-10"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default StudentComp;
