import React from "react";
import {
  LayoutDashboard,
  UserRoundPen,
  SlidersHorizontal,
  KeyRound,
  LogOut,
  FilePenLine,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const Sidebar = ({ showProfile }) => {
  const location = useLocation();
  const isEdit = location.pathname === "/edit";
  

  return (
    <>
      <div
        className={`left-2 fixed inset-0 bg-white shadow-md p-6 rounded-lg transform transition-transform lg:hidden flex flex-col ${
          showProfile ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <ProfileContent isEdit={isEdit}  />
      </div>

      <div
        className={`fixed inset-y-0 left-0 ${showProfile?'left-4': 'left-0'} w-80 lg:h-[90vh] mt-6  bg-white shadow-md p-4 rounded-lg transform transition-transform duration-300 hidden lg:flex flex-col ${
          showProfile ? "translate-x-0 h-full" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <ProfileContent isEdit={isEdit}  />
      </div>
    </>
  );
};

const ProfileContent = ({ isEdit }) => {
  return (
    <>
      <div className="flex justify-center mb-4 relative">
        <img
          src="/src/assets/dp.jpeg"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mt-10"
        />
        <span className="absolute mt-10 ml-28 bg-gray-300 text-xs p-1 font-bold top-5 text-black rounded-md shadow-md">
          Student
        </span>
      </div>
      <div className="flex-grow">
        <button className="w-full py-2 mb-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center font-semibold mr-2 gap-2">
          <FilePenLine />
          Change Profile Picture
        </button>
        <button className="w-full py-2 mb-2 text-red-500 bg-transparent hover:text-red-600 transition-colors text-sm border-b border-gray-800">
          Remove Profile Picture
        </button>
        <button className="w-full py-2 mb-2 rounded-md transition-colors flex items-center justify-start text-black hover:text-[#03A8FD] hover:bg-blue-50 active:bg-blue-50 duration-300">
          <LayoutDashboard color="#03A8FD" className="w-4 h-4 ml-7 mr-2" />
          Super Admin Dashboard
        </button>
        <button className="w-full py-2 mb-2 rounded-md transition-colors flex items-center justify-start text-black hover:text-[#03A8FD] hover:bg-blue-50 active:bg-blue-50 duration-300">
          <UserRoundPen color="#03A8FD" className="w-4 h-4 ml-7 mr-2" />
          Add Moderator
        </button>
        <button
          className={`w-full py-2 mb-2 rounded-md transition-colors flex items-center justify-start ${
            isEdit
              ? "text-[#03A8FD] bg-blue-50"
              : isView
              ? "text-black"
              : "text-black hover:text-[#03A8FD] hover:bg-blue-50 active:bg-blue-50 duration-300"
          }`}
        >
          <SlidersHorizontal color="#03A8FD" className="w-4 h-4 ml-7 mr-2" />
          Edit Account Details
        </button>
        <button className="w-full py-2 mb-2 rounded-md transition-colors flex items-center justify-start text-black hover:text-[#03A8FD] hover:bg-blue-50 active:bg-blue-50 duration-300">
          <KeyRound color="#03A8FD" className="w-4 h-4 ml-7 mr-2" />
          Change Password
        </button>
        <button className="w-full py-2 mb-2 rounded-md transition-colors flex items-center justify-start text-black hover:text-[#03A8FD] hover:bg-blue-50 active:bg-blue-50 duration-300">
          <LogOut color="#03A8FD" className="w-4 h-4 ml-7 mr-2" />
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
