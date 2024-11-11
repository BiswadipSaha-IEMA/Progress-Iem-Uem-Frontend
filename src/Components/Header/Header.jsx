import React from 'react'
import IEM from "../../assets/IEM.png";
import UEM from "../../assets/UEM.png";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Header({backPage}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between px-5 sm:px-10 py-5 relative">
        <img src={IEM} alt="IEM" className="h-20 w-16 mr-4" />
        <div
          className="absolute bottom-0 flex items-center gap-2 cursor-pointer" onClick={()=> {
            navigate(backPage)
          }}
        >
          <FaLongArrowAltLeft className="text-[1rem]" />
          <div className="font-[700]">Back</div>
        </div>
        <div className="relative mt-4 sm:mt-10">
          <div
            className="text-[2rem] sm:text-[4rem] lg:text-[6rem] font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            style={{
              backgroundImage: "radial-gradient(circle, #fff, #cceeff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            IEM-UEM
          </div>
          <div className="absolute top-[20%] sm:top-[38%] left-[10%] sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
            IEM - UEM Progress
          </div>
        </div>
        <img src={UEM} alt="UEM" className="h-20 w-16 mr-4" />
      </div>
  )
}
