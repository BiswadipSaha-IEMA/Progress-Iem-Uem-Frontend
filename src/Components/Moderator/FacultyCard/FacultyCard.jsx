import React from 'react'
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export const FacultyCard = ({data}) => {
  console.log(data)
  return (
    <div className='w-[100%] sm:w-[20rem] p-7 rounded-xl' style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3) ' }}>
      <div className="font-semibold text-[25px] sm:text-[35px] text-[#555555]">{data.name}</div>
      <div className="flex justify-between flex-col sm:flex-row gap-4 text-[14px]">
        <div className="bg-[#115476] p-1 w-12 flex justify-center rounded-lg text-[#EEF3F5] font-semibold">CSE</div>
        <div className="bg-[#AEE4FF] p-1 w-28 flex justify-center rounded-lg text-[#51646F] font-semibold">Faculty</div>
        <div className="bg-[#DCF3FF] p-1 w-48 flex justify-center rounded-lg  text-[#51646F] font-semibold">Research Grade A</div>
      </div>
      <div className="border b-[#BFBFBF] mt-5"></div>
      <div className="flex items-center flex-col sm:flex-row gap-6 justify-center mt-5">
        <button className='bg-[#D6FFCE] p-2 text-[#1C6229] flex items-center justify-around w-full sm:w-[35%] font-medium rounded-xl text-[19px]'>Accept<TiTick className="text-[40px]" /></button>
        <button className='bg-[#FFDBDB] p-2 text-[#C66666] flex items-center justify-around w-full sm:w-[35%] font-medium rounded-xl text-[19px]'>Reject<ImCross className="text-[14px]" /></button>
      </div>
    </div>
  )
}
