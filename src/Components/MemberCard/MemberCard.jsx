import React from 'react';
import { MdPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { TbEdit } from "react-icons/tb";

const MemberCard = ({ role, data }) => {
    return (
        <div className='m-4 sm:pb-4 ml-[0px] sm:ml-0 rounded-lg lg:w-[400px] md:w-[300px] min-w-[350px] min-h-[250px] flex flex-col' style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)' }}>
            <div className="ml-6 p-3 flex flex-col flex-wrap">
                <div className="flex justify-end">
                    <button className='bg-[#03A8FD] p-2 rounded-lg flex items-center gap-2'>
                        <div className="text-2xl text-[#fff]"><TbEdit /></div>
                        <div className='text-[#fff]'>Edit</div>
                    </button>
                </div>
                <div className="flex flex-wrap justify-start gap-4 my-2">
                    <div className="text-[#03A8FD] text-3xl">{data.name}</div>
                    <div className="bg-[#DCF3FF] flex items-center rounded-lg text-sm px-3">{role}</div>
                </div>
                <div className='w-[96%] flex text-center border border-[#D2D2D2]'></div>
                <div className="flex flex-wrap flex-col mt-2 gap-2">
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
                        {Array.isArray(data.department) ? (
                            <div className="flex flex-wrap gap-2">
                                {data.department.map((dept, index) => (
                                    <span key={index} className="bg-[#F3F3F3] px-2 py-1 rounded-md">{dept}</span>
                                ))}
                            </div>
                        ) : (
                            data.department
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
