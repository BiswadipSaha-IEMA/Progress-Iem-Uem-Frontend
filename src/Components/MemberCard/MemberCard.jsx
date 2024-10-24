import React from 'react'
import { MdPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";


const MemberCard = ({role,data}) => {

    return (
        <div className='m-4 pb-4 rounded-lg w-[80%]' style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="ml-6 p-3">
                <div className="flex justify-end">
                    <button className='bg-[#03A8FD] p-2 rounded-lg flex items-center gap-2'>
                        <div className="text-2xl"><TbEdit /></div>
                        Edit
                    </button>
                </div>
                <div className="flex justify-start gap-4 my-2">
                    <div className="text-[#03A8FD] text-3xl">Soham Dutta</div>
                    <div className="bg-[#DCF3FF] flex items-center px-1 rounded-lg text-sm">User</div>
                </div>
                <div className='w-[96%] flex text-center border border-[#D2D2D2]'></div>
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <MdPhone />
                        {data.phone}
                    </div>
                    <div className="flex gap-2 items-center">
                        <CiMail />
                        {data.email}
                    </div>
                    <div className="flex gap-2 items-center">
                        <HiMiniBuildingOffice />
                        {data.dept}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberCard