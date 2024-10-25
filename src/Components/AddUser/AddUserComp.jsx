import React, { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiUserAddFill } from "react-icons/ri";
import MemberCard from "../MemberCard/MemberCard";
import Sidebar from "../SideBar/Sidebar";
import { Menu } from "lucide-react";

import gsap from "gsap";
import ManagePopUp from "../../utils/Popup/FormPopUp/ManagePopUp";

const AddUserComp = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [utilFor, setUtilFor] = useState("");

  const handleAddUserClick = () => {
    setUtilFor("modarator");
    setShowPopup(true);
  };

  return (
    <div className="flex w-full overflow-x-hidden">
      <div className="relative">
        <Sidebar showProfile={sidebar} />
        {sidebar && (
          <button
            className={`bg-slate-200 p-2 rounded absolute lxs:hidden`}
            onClick={() => {
              setSidebar(!sidebar);
            }}
          >
            <Menu />
          </button>
        )}
      </div>
      <div
        className={`flex-grow rounded-lg mb-8 duration-300 ${
          sidebar
            ? "lg:w-[calc(100%-320px)] lg:ml-[320px]"
            : "lg:w-full lg:ml-0"
        } bg-[url('/src/assets/image2.svg')]`}
      >
        <div className="flex justify-between items-center mt-4">
          <button
            className={`bg-slate-200 p-2 rounded `}
            onClick={() => {
              setSidebar(!sidebar);
            }}
          >
            <Menu />
          </button>
          <div className="w-[83%] relative flex items-center ml-4">
            <button className="absolute text-3xl left-2">
              <CiSearch />
            </button>
            <input className="w-full rounded-lg p-2 pl-12 focus:border-[#03A8FD] focus:shadow-[#03A8FD]" />
            <button className="absolute right-2 text-3xl">
              <IoIosCloseCircleOutline />
            </button>
          </div>

          <button
            className="bg-[#03A8FD] ml-4 sm:pl-5 lg:h-12 h-11 lg:text-lg text-base p-4 right-0 rounded-lg flex items-center lg:pl-4 lg:pr-4 text-white lg:gap-2 gap-2"
            onClick={handleAddUserClick}
          >
            <span className="hidden lg:block">Add Moderator</span>

            <div className="text-2xl">
              <RiUserAddFill size={20} />
              {/* <CiSquarePlus /> */}
            </div>
          </button>

          {/* <button
            className="bg-[#03A8FD] ml-4 sm:pl-5 lg:h-12 h-14 lg:text-lg text-base p-3 right-0 rounded-lg lg:rounded-lg flex items-center lg:pl-4 lg:pr-4 text-white lg:gap-2 gap-2"
            onClick={handleAddUserClick}
          >
            Add Moderator
            <div className="text-2xl">
              <RiUserAddFill size={20}/>
              
            </div>
          </button> */}
        </div>

        <div className="bg-white p-4 flex flex-wrap w-full mt-8 rounded-lg">
          <Cards role={"user"} sidebar={sidebar} />
        </div>
      </div>

      {showPopup && (
        <ManagePopUp setPopupShow={setShowPopup} setUtilFor={utilFor} />
      )}
    </div>
  );
};

export default AddUserComp;

const data = [
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
  {
    phone: "64641313687",
    email: "ahsdfkh@mail.com",
    dept: "CSE",
  },
];

const Cards = ({ role, sidebar }) => {
  const currentDiv = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      currentDiv.current,
      {
        opacity: 0,
        y: 50,
        scaleX: 0,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 2,
        scaleX: 1,
        ease: "elastic",
      }
    );
  }, []);

  return (
    <>
      {data.map((element, index) => (
        <div
          key={index}
          ref={(ele) => (currentDiv.current[index] = ele)}
          className={`${sidebar ? "ml-12" : "lg:ml-0"}`}
          // className="w-[calc(100%/4)] m-12"
          // className={`w-[calc(100%)] lg:w-[calc(100%/4)] md:w-[calc(100%/4)]
          //      ${sidebar? 'm-12':'m-32 md:m-24 sm:1 lg:m-2'}`
          // }
        >
          <MemberCard role={role} data={element} />
        </div>
      ))}
    </>
  );
};
