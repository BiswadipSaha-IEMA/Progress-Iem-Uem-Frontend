import React from 'react'
import { useState, useEffect,useRef } from "react";
import { useGetReq, usePutReq } from '../../../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../Sidebar/ModeratorSidebar";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FacultyCard } from "../FacultyCard/FacultyCard";
import { CiFilter, CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import { FaLongArrowAltLeft } from "react-icons/fa";

const PendingRequests = () => {
    const [formCount, setFormCount] = useState(0);
    const [recordsOfBp, setRecordsOfBp] = useState([]);
    const [pendingData, setPendingData] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [bookDataArrState, setBookDataArrState] = useState(null);

    const [getReq] = useGetReq();
    const [putReq] = usePutReq();
    const navigate = useNavigate();
    
    const toggleProfile = () => setShowProfile((prev) => !prev);
    
    const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  useEffect(() => {
    const allInfo = async () => {
      try {
        // Fetch publication counts
        const response = await getReq("api/v1/document/getAllPublications", accessToken);
        if (response.success) {
          setFormCount(response.data.pendingCount);
          // console.log("Publication Count Response:", response.data.data);
          const filteredData=response.data.data
          .filter((publication)=>publication.status==='Pending')
          setPendingData(filteredData)
        //   console.log(filteredData)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    allInfo();
  }, [accessToken]);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    // console.log("====================================");
    // console.log(searchValue);
    // console.log("====================================");

    const filteredData = pendingData.filter((row) =>
      row.name.toLowerCase().includes(searchValue)
    );
    // console.log("hello", filteredData)
    setRecordsOfBp(filteredData);
    if (searchValue === "") setRecordsOfBp(bookDataArrState);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
        <div className="flex gap-2 sm:gap-10 justify-between mb-10 mt-6">
            <div className="w-[100%] relative flex items-center ml-4">
                <div className="absolute text-3xl left-2">
                    <CiSearch />
                </div>
                <input className="w-full rounded-lg p-2 pl-12 border border-[#03A8FD] shadow-[0_0_10px_3px_rgba(3,168,253,0.7)] text-wrap" onChange={handleSearch} />
                <button className="absolute right-2 text-3xl hidden sm:block">
                    <IoIosCloseCircleOutline />
                </button>
            </div>
            <div className="border rounded-md bg-white border-[#757D8A] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#757D8A] text-xl">
                <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
                <button className="text-[0.85rem] sm:text-[1rem]">
                    Sort: Chronological
                </button>
            </div>
        </div>
        {/* back button */}
        {/* <div
          className="flex items-center gap-2 cursor-pointer mb-4"
          onClick={() => {
            navigate("/moderator/dashboard");
          }}
        >
          <FaLongArrowAltLeft className="text-[1rem]" />
          <div className="font-[700]">Back</div>
        </div> */}
        <div>
            {/* Account - details Section */}
            <div className="rounded-lg bg-white p-12 shadow-md flex-grow flex gap-8 flex-col">
                <div className="flex justify-between">
                    <h2 className="mb-4 text-xl font-semibold text-[#03A8FD] text-[33px] sm:text-[40px]">Request Approval</h2>
                </div>
                <div className="flex gap-8 flex-row flex-wrap">
                    {pendingData&&pendingData.map((data)=><FacultyCard key={data.id} data={data} />)}
                </div>
            </div>
        </div>
    </div>
  )
}
export default PendingRequests;