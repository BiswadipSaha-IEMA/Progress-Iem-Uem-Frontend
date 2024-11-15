import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { usePostReq } from '../../../hooks/useHttp';

function TimerPopUp({ setShowPopup }) {
  const [dates, setDates] = useState([]); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [postReq] = usePostReq();
  
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const options = ['IEMN', 'IEMS', 'UEMJ'] ;

  const handleSetDate = async() => {
    if (startDate && endDate && selectedOption) {
      const newDateEntry = { startDate, endDate, selectedOption };
      setDates([...dates, newDateEntry]);
      
      const response= await postReq('api/v1/timeline/fetchTimeline',
        {
          fetchTimelineStartDate: startDate,
          fetchTimelineEndDate: endDate,
          
        },
        accessToken
      )
      //send reponse for dropdown value
      const response1 = await postReq('',{
        

      })

      console.log(response)

      setShowPopup(false)
      
      setStartDate('');
      setEndDate('');
      setSelectedOption('');
    } else {
      alert('Please select both start and end dates.');
    }
  };

  return (
    <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
      <div className="bg-white pb-12 rounded-[14px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[800px] min-w-[300px]">
        <div
          className="absolute p-2 transition-colors duration-200 bg-red-500 rounded-full cursor-pointer right-5 top-5 hover:bg-red-600"
          onClick={() => setShowPopup(false)}
        >
          <RxCross2 className="text-white" />
        </div>
        <div className='w-full flex justify-center text-[2rem] font-[700] text-[#fff] bg-gradient-to-t from-cyan-500 to-blue-400 rounded-tl-[14px] py-4 rounded-tr-[14px]'>
          Set Date
        </div>

        <div className='flex flex-col gap-2 w-[50%] md:w-[100%] justify-center items-center md:flex-row'>
          <div className=''>
            <div className='font-[700] text-[19px] text-[#404040] pt-10'>Start Date</div>
            <div>
              <input
                type="date"
                name="date1"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-[350px] p-3 border border-gray rounded-lg focus:ring-0 outline-none mt-2"
              />
            </div>
          </div>
          <div className=''>
            <div className='font-[700] text-[19px] text-[#404040] pt-10'>End Date</div>
            <div>
              <input
                type="date"
                name="date2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-[350px] p-3 border border-gray rounded-lg focus:ring-0 outline-none mt-2"
              />
            </div>
          </div>
        </div>

        {/* dropdown */}
        <div className='w-[350px] mt-4'>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full p-3 border rounded-lg outline-none border-gray focus:ring-0"
          >
            {/* <option value="">Select an option</option> */}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col justify-center w-full mt-8 md:justify-end md:mr-24 md:flex-row'>
          <div
            className='w-[90%] ml-5 md:w-[230px] flex align-middle items-center justify-center text-[20px] py-2 text-white bg-[#03a8fd] rounded-[16px] hover:bg-blue-600 cursor-pointer'
            onClick={handleSetDate}
          >
            Set 
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerPopUp;
