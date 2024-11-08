import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiX } from "react-icons/fi";
import ErrorLottie from "../../../Lottie/ErrorLottie";
import Lottie2 from "react-lottie";
import "./styles.css";
import DataTable from "react-data-table-component";
import Lottie from "react-lottie";
import { FaBookBookmark } from "react-icons/fa6";
import { CiFilter, CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import "../../../Components/StudentComp/customScrollbar.css";
import { usePostReq } from "../../../hooks/useHttp";
// import { useGetReq, usePutReq } from "../../hooks/useHttp";
import gsap from "gsap";

const SchemaCardsPopUp = ({ setPopupShow, setUtilFor, department }) => {
  const [selectedStream,setSelectedStream]=useState(null)
  const [tableData,setTableData]=useState([])
  const [loading,setLoading]=useState(false)

  const [postReq] = usePostReq();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: ErrorLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

    // Dummy data for the table (this would normally come from an API)
    const streamsData = {
        Book: [
            { id: 1, name: "AB", author: "Author A", count: 1 },
            { id: 2, name: "MD", author: "Author B", count: 2 },
        ],
        Conference: [
            { id: 1, name: "RG", location: "Location A", count: 3 },
            { id: 2, name: "RP", location: "Location B", count: 1 },
        ],
        Moocs: [
            { id: 1, name: "AN", provider: "Provider A", count: 8 },
            { id: 2, name: "SB", provider: "Provider B", count: 4 },
        ],
    };

    // Columns for the table
    const columns = [
        { name: "ID", selector: (row) => row.id, sortable: true },
        { name: "Name", selector: (row) => row.name, sortable: true },
        { name: "Submitted Count", selector: (row) => row.count, sortable: true },
        { name: "",
          cell: (row)=>(
            <button 
            onClick={()=>handleViewClick(row)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md">
                View
            </button>
          ),
          button:true,
        }
        // Add more columns depending on your data
    ];

    const handleViewClick=(row)=>{
        console.log("Viewing details for:",row)
    }

    const handleStreamClick=(stream)=>{
        setSelectedStream(stream);
        setTableData(streamsData[stream]||[])
    }

  return (
    <>
      {setUtilFor === "moderator" ? (
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-[-24px] left-0 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl alertcontent"
          style={{
            maxHeight: "95vh", // Set maximum height of the modal to 90% of the viewport height
            overflowY: "auto", // Make content scrollable if it exceeds the max height
          }}
          >
            <div className="flex justify-between p-5">
              <h2 className="text-4xl mb-4 font-bold flex justify-center items-center">
                {department}
              </h2>
              <div
                className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
                onClick={() => {setPopupShow(false);setSelectedStream(null)}}
              >
                <RxCross2 className="text-white" />
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-2 p-5 min-h-[70vh] overflow-y-auto">
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {["Book", "Conference", "Moocs"].map((stream) => (
                    <div className='w-[100%] sm:w-[20rem] p-7 rounded-xl flex flex-col justify-center' style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3) ' }}
                    onClick={()=>{handleStreamClick(stream);console.log(stream)}}
                    >
                      <div className="font-semibold text-[25px] sm:text-[1.5rem] text-[#555555] cursor-default mb-2" >{stream}</div>
                      <div className="border b-[#BFBFBF] mt-4 mb-4"></div>
                      {/* <div className='w-full flex justify-center items-center py-2 bg-[#03A8FD] text-[#fff] font-[500] rounded-md mb-4'>View File</div> */}
                    </div>
                  ))}
                </div>
              </div>
              {selectedStream&&(
                <div className="mt-6 p-6 sm:p-0">
                    <h3 className="text-2xl font-semibold mb-4">
                        Faculty published {selectedStream}
                    </h3>
                    <DataTable
                        columns={columns}
                        data={tableData}
                        noHeader
                        pagination
                        progressPending={loading}
                        highlightOnHover
                    />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SchemaCardsPopUp;
