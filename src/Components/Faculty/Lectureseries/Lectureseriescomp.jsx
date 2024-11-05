import React, { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { VscDiffAdded } from "react-icons/vsc";
// import FacultyCardBP from './FacultyCardBP'
import { FaBookBookmark } from "react-icons/fa6";
import { useGetReq, usePostReq } from "../../../hooks/useHttp";
import ManagePopUp from "../../../utils/Popup/FormPopUp/ManagePopUp";
import BookPublished from "../../../utils/Popup/FormPopUp/BookPublished";
import LectureSeriesPopUp from '../../../utils/Popup/FormPopUp/LectureSeriesPopUp'

import LectureSeriescard from "./Lectureseriescard";

function Lectureseriescomp() {
  const BpNumber = 30;
  const [showPopUp, setShowPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [getReq] = useGetReq();

  const accessToken = sessionStorage.getItem("token").split('"')[1];

  useEffect(() => {
    const getBPData = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        if (response.success) {
          console.log(response.data);
          setData(response.data.data);
          setData1(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBPData();
  }, [showPopUp]);

  const handleSearch = (event) => {
    if (data) {
      const searchData = event.target.value;
      const filteredData = data1.filter((item) =>
        item.title.toLowerCase().includes(searchData.toLowerCase())
      );
      setData(filteredData);
      if (searchData === "") setData(data1);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="relative flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8">
        <MdOutlineSearch className="absolute bottom-3 md:bottom-9 left-4 md:left-10 text-[1.5rem] md:text-[2rem] text-[#979da7] z-10" />

        <div className="relative w-full">
          <input
            type="text"
            placeholder="search for a Lecture"
            onChange={handleSearch}
            className="w-full py-2 px-10 md:px-12 font-[400] text-[16px] md:text-[18px] outline-none border-[#03A8FD] backdrop-blur-lg shadow-[0_0_8px_2px_rgba(3,168,253,0.7)] rounded-md"
          />
          <RxCross2 className="absolute right-2 top-2 md:right-3 md:top-3 border-[#979da7] border-[2px] rounded-full text-[1rem] md:text-[1.2rem] p-1 cursor-pointer" />
        </div>

        <div
          className="bg-[#03A8FD] text-[#fff] flex justify-center items-center rounded-md w-[300px] py-2 cursor-pointer"
          onClick={() => {
            setShowPopUp(true);
          }}
        >
          <div className="w-full flex justify-center items-center gap-2 md:gap-3 text-[1rem] md:text-[1.15rem]">
            Add New Lecture
            <VscDiffAdded className="text-[1.3rem] md:text-[1.5rem] mt-1" />
          </div>
        </div>
      </div>

      <div className="w-full p-4 md:p-8 pt-0">
        <div
          className={`shadow-2xl rounded-md p-4 md:p-8 ${
            BpNumber <= 8 ? "h-[600px] md:h-[800px]" : "h-auto"
          }`}
        >
          <div className="text-[1.5rem] md:text-[2rem] font-[500] flex items-center mb-6 md:mb-10 gap-2">
            <FaBookBookmark className="text-[1.5rem] md:text-[2rem] text-[#03A8FD]" />
            Talks and Distinguished Lecture Series
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8 w-full h-full">
            {/* <FacultyCardBP status="pending" title={'hello world'} date="01/05/2000" name="Biswadip Saha" ISBN="00000000" />
                <FacultyCardBP status="approved" title={'hello world'} date="01/05/2000" name="Biswadip Saha" ISBN="00000000" />
                <FacultyCardBP status="rejected" title={'hello world'} date="01/05/2000" name="Biswadip Saha" ISBN="00000000" /> */}
            {data
              ?.filter((item) => item.eventType === "Lecture")
              .map((item, index) => (
                <LectureSeriescard
                  key={index}
                  status={item.status}
                  title={item.topicName}
                  date={item.date}
                  name={item.topicName}
                  // ISBN={item.isbn}
                />
              ))}
          </div>
        </div>
      </div>

      {showPopUp && (
        <LectureSeriesPopUp setUtilFor={"bpAddForm"} setShowPopup={setShowPopUp} />
      )}
    </div>
  );
}

export default Lectureseriescomp;
