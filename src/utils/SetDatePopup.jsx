import React, {useEffect, useState} from 'react'
import { RxCross2 } from 'react-icons/rx'
import { usePostReq, useGetReq } from '../hooks/useHttp'

export default function SetDatePopup({setShowPopup, setDateRange}) {

    const [postReq] = usePostReq();
    const [getReq] = useGetReq();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

    // api/v1/timeline/setTimeline -> set Date
    //field name setTimeLineStartDate setTimeLineEndDate
    // api/v1/timeline/getSetTimeline -> get date

    

    const handleSetDate = async (e) => {
        e.preventDefault();
        const res  = await postReq("api/v1/timeline/setTimeline", {
            setTimeLineStartDate: startDate,
            setTimeLineEndDate : endDate,
        }, accessToken
    );
    if (res.success) {
        setDateRange([startDate, endDate]);
        setShowPopup(false);
    }
    };



    return (
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
          <div className="bg-white pb-12 rounded-[14px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[800px] min-w-[300px]">
    
          <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
          onClick={() => setShowPopup(false)}
        >
          <RxCross2 className="text-white" />
        </div>
            <div className='w-full flex justify-center text-[2rem] font-[700] text-[#fff] bg-gradient-to-t from-cyan-500 to-blue-400 rounded-tl-[14px] py-4 rounded-tr-[14px]'>
              Set Date
            </div>
    
            <div className='flex flex-col gap-2  w-[50%] md:w-[100%] justify-center items-center md:flex-row '>
            <div className=''>
            <div className='font-[700] text-[19px] text-[#404040] pt-10 '>Start Date</div>
            <div>
            <input
                type="date"
                name="date1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[350px] p-3  border border-gray rounded-lg focus:ring-0 outline-none mt-2"
              />
            </div>
            </div>
            <div className=''>
            <div className='font-[700] text-[19px] text-[#404040] pt-10 '>End Date</div>
            <div>
            <input
                type="date"
                name="date2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[350px]  p-3  border border-gray rounded-lg focus:ring-0 outline-none mt-2 "
              />
            </div>
            </div>
    
            </div>
    
    
            <div className='w-full flex flex-col justify-center md:justify-end md:mr-24 mt-8 md:flex-row'>
                {/* <div className='w-[90%] ml-5 md:w-[230px] flex justify-center py-1 text-[20px] text-white bg-[#858585] rounded-[16px] hover:bg-[#616060] cursor-pointer'>
                  Change Date
                </div> */}
                <div className='p-2 ml-5 md:w-[230px] flex align-middle items-center justify-center text-[20px] text-white bg-[#03a8fd] rounded-[16px] hover:bg-blue-600 cursor-pointer' onClick={handleSetDate}>
                  Set Date
                </div>
            </div>  
    
    
          </div>
        </div>
      )
}
