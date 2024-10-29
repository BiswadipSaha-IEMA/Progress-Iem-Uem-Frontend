import React from "react";
import { FaBookBookmark } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import { LuLoader } from "react-icons/lu";
import rolebg from '../../../assets/rolebg.png'

export default function Faculty() {
  const bookDetails = [
    {
      title: "The AI Blueprint",
      status: "Approved",
    },
    {
      title: "The AI Blueprint",
      status: "Pending",
    },
    {
      title: "The AI Blueprint",
      status: "Rejected",
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-[#D6FFCE]",
          text: "text-[#1C6229]",
          icon: <TiTick className="text-[#1C6229]" />,
        };
      case "Pending":
        return {
          bg: "bg-[#FFC8A0]",
          text: "text-[#873D22]",
          icon: <LuLoader className="text-[#873D22]" />,
        };
      case "Rejected":
        return {
          bg: "bg-[#FFD6D6]",
          text: "text-[#D60000]",
          icon: <RiCloseFill className="text-[#C66666]" />,
        };
      default:
        return {
          bg: "bg-gray-200",
          text: "text-gray-600",
          icon: <RiCloseFill />,
        };
    }
  };

  return (
    <div className="bg-[#ECECEC] h-screen p-5 flex flex-col gap-4">
      <div className="flex justify-center items-center relative rounded-lg overflow-hidden">
        <div className="flex justify-center items-center text-[4.375rem] font-bold text-[#437F9E] absolute">
          <h1>Faculty</h1>
        </div>
        <img
          src={rolebg}
          alt="img"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[...Array(4)].map((_, cellIndex) => (
          <div
            key={cellIndex}
            className="bg-[#fff] rounded-lg p-[1.5rem] flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <FaBookBookmark className="text-blue-700 w-[2rem] h-[2rem]" />
                <h1 className="font-semibold text-[1.5rem]">Books Published</h1>
              </div>
              <button className="bg-[#03A8FD] text-white p-1 rounded-md w-[7rem]">
                View All
              </button>
            </div>
            {bookDetails.map((book, index) => {
              const { bg, text, icon } = getStatusStyles(book.status);
              return (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#EFEFEF] rounded-md p-2"
                >
                  <h1>{book.title}</h1>
                  <div
                    className={`${bg} p-1 rounded-md flex items-center justify-center gap-1 w-[7rem]`}
                  >
                    {icon}
                    <p className={`${text}`}>{book.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
