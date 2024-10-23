import React, { useState } from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import MemberCard from '../MemberCard/MemberCard'
// import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const AddUserComp = () => {
    const [sidebar,setSidebar]=useState(false)
  return (
    <div className="flex">
        {/* <Sidebar showProfile={sidebar} /> */}
        <div
          className={`flex-grow rounded-lg mb-8 duration-300 ${
            sidebar ? "lg:w-[calc(100% - 340px)] lg:ml-[320px]" : "lg:w-full lg:ml-0"
          } bg-[url('/src/assets/image2.svg')]`}
        >
            <button onClick={()=>{setSidebar(!sidebar)}}><Menu /></button>
            <div className="flex justify-between items-center">
                <div className="w-[83%] relative flex items-center">
                    <button className="absolute text-3xl left-2"><CiSearch/></button>
                    <input className='w-full rounded-lg p-2 pl-12 focus:border-[#03A8FD] focus:shadow-[#03A8FD]'/>
                    <button className="absolute right-2 text-3xl"><IoIosCloseCircleOutline /></button>
                </div>
                <button className='bg-[#03A8FD] p-1 text-lg right-0 rounded-lg flex items-center pl-4 pr-4 text-white'>
                    Add New User 
                    <div className="text-2xl"><CiSquarePlus /> </div>
                </button>
            </div>
            <div className="bg-white grid p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 rounded-lg ">
                {/* No Moderators Found */}
                <Cards role={'moderator'}/>
            </div>
        </div>
    </div>
  )
}

export default AddUserComp


const data=[
    {
        phone:'64641313687',
        email:'ahsdfkh@mail.com',
        dept:'CSE'
    },
    {
        phone:'64641313687',
        email:'ahsdfkh@mail.com',
        dept:'CSE'
    },
    {
        phone:'64641313687',
        email:'ahsdfkh@mail.com',
        dept:'CSE'
    }
]

const Cards=({role})=>{
    return(
        <>
            {
                data.map((element,index)=>(
                    <MemberCard key={index} role={role} data={element} />
                ))
            }
        </>
    )
}