import React from 'react'
import { MdPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";


const MemberCard = ({role,data}) => {

    return (
        <div className= ' m-4 pb-4 rounded-2xl lg:w-[400px] md:w-[300px] min-w-[200px] '  style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3) ' }}>
            <div className="ml-6 p-3">
                <div className="flex justify-start">
                    <button className='bg-[#03A8FD] p-2 rounded-lg flex items-center gap-2'>
                        <div className="text-2xl text-[#fff]"><TbEdit /></div>
                        <div className='text-[#fff]'>Edit</div>
                    </button>
                </div>
                <div className="flex flex-wrap justify-start gap-4 my-2">
                    <div className="text-[#03A8FD] text-3xl">{data.name} </div>
                    <div className="bg-[#DCF3FF] flex items-center  rounded-lg text-sm px-3">{role}</div>
                </div>
                <div className='w-[96%] flex text-center border border-[#D2D2D2]'></div>
                <div className="flex flex-wrap flex-col">
                    <div className="flex gap-2 items-center">
                        <MdPhone />
                        {data.contact}
                    </div>
                    <div className="flex gap-2 items-center">
                        <CiMail />
                        <span className="flex flex-wrap">{data.email}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <HiMiniBuildingOffice />
                        {data.department}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberCard