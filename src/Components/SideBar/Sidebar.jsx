import React from "react";
import {
  LayoutDashboard,
  UserRoundPen,
  SlidersHorizontal,
  KeyRound,
  LogOut,
  FilePenLine,
  UserRound
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ showProfile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.pathname === "/edit";
  const isSuper = location.pathname === "/SuperAdminDashboard";
  const isAddMod = location.pathname === "/AddModerator";
  const isAddFac = location.pathname === "/AddFaculty";

  return (
    <>
      <div
        className={`left-2 fixed inset-0 bg-white shadow-md p-6 rounded-lg transform transition-transform lg:hidden flex flex-col ${
          showProfile ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <ProfileContent 
          isEdit={isEdit} 
          isSuper={isSuper} 
          isAddMod={isAddMod} 
          isAddFac={isAddFac} 
          navigate={navigate}
        />
      </div>

      <div
        className={`fixed inset-y-0 left-0 ${showProfile ? 'left-4' : 'left-0'} w-80 lg:h-[90vh] mt-6 bg-white shadow-md p-4 rounded-lg transform transition-transform duration-300 hidden lg:flex flex-col ${
          showProfile ? "translate-x-0 h-full" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <ProfileContent 
          isEdit={isEdit} 
          isSuper={isSuper} 
          isAddMod={isAddMod} 
          isAddFac={isAddFac} 
          navigate={navigate}
        />
      </div>
    </>
  );
};

const ProfileContent = ({ isEdit, isSuper, isAddMod, isAddFac, navigate }) => {
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
        <button
          className="w-full py-2 mb-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center font-semibold mr-2 gap-2"
          aria-label="Change Profile Picture"
        >
          <FilePenLine />
          Change Profile Picture
        </button>
        <button
          className="w-full py-2 mb-2 text-red-500 bg-transparent hover:text-red-600 transition-colors text-sm border-b border-gray-800"
          aria-label="Remove Profile Picture"
        >
          Remove Profile Picture
        </button>
        <SidebarButton 
          isActive={isSuper} 
          ariaLabel="Super Admin Dashboard" 
          icon={<LayoutDashboard color="#03A8FD" />} 
          label="Super Admin Dashboard" 
          onClick={() => navigate('/SuperAdminDashboard')} 
        />
        <SidebarButton 
          isActive={isAddMod} 
          ariaLabel="Add Moderator" 
          icon={<UserRoundPen color="#03A8FD" />} 
          label="Add Moderator" 
          onClick={() => navigate('/AddModerator')} 
        />
        <SidebarButton 
          isActive={isAddFac} 
          ariaLabel="Add Faculty" 
          icon={<UserRound color="#03A8FD" />} 
          label="Add Faculty" 
          onClick={() => navigate('/AddFaculty')} 
        />
        <SidebarButton 
          isActive={isEdit} 
          ariaLabel="Edit Account Details" 
          icon={<SlidersHorizontal color="#03A8FD" />} 
          label="Edit Account Details" 
          onClick={() => navigate('/edit')} 
        />
        <SidebarButton 
          ariaLabel="Change Password" 
          icon={<KeyRound color="#03A8FD" />} 
          label="Change Password" 
          onClick={() => navigate('/change-password')} // Adjust the path as needed
        />
        <SidebarButton 
          ariaLabel="Log Out" 
          icon={<LogOut  />} 
          label="Log Out" 
          onClick={() => navigate('/logout')} // Adjust the path as needed
        />
      </div>
    </>
  );
};

const SidebarButton = ({ isActive, ariaLabel, icon, label, onClick }) => (
  <button
    className={`w-full py-2 mb-2 rounded-md transition-colors flex items-center justify-start ${
      isActive ? "text-white bg-blue-500" : "text-black hover:text-white hover:bg-blue-500 active:bg-blue-50 duration-300"
    }`}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    <span className={`mr-2 ${isActive ? "text-white" : " hover:text-white"}`}>
      {React.cloneElement(icon, { color: isActive ? "white" : undefined })}
    </span>
    {label}
  </button>
);


export default Sidebar;
