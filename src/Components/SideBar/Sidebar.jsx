import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UserRoundPen,
  SlidersHorizontal,
  KeyRound,
  LogOut,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetReq } from "../../hooks/useHttp";
// import {username} from "../SuperAdminDashboard/SuperAdminDashboardComp"
const Sidebar = ({ showProfile, isChangePasswords,username }) => {
  const [superAdminData, setSuperAdminData] = useState({});
  const [getReq, { error, loading }] = useGetReq();
  
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.pathname === "/";
  const isSuper = location.pathname === "/SuperAdminDashboard";
  const isAddMod = location.pathname === "/AddModerator";
  const isAddFac = location.pathname === "/AddFaculty";



  return (
    <>
      <div
        className={`fixed inset-0 bg-white shadow-md p-6 rounded-lg transform transition-transform lg:hidden flex flex-col ${showProfile ? "translate-x-0" : "-translate-x-full"} overflow-y-auto`}
      >
        <ProfileContent
          username={username}
          isEdit={isEdit}
          isSuper={isSuper}
          isAddMod={isAddMod}
          isAddFac={isAddFac}
          isChangePasswords={isChangePasswords}
          navigate={navigate}
        />
      </div>

      <div
        className={`fixed inset-y-0 left-0 ${showProfile ? "left-4" : "left-0"} w-80 lg:h-[90vh] mt-6 bg-white shadow-md p-4 rounded-lg transform transition-transform duration-300 hidden lg:flex flex-col ${showProfile ? "translate-x-0 h-full" : "-translate-x-full"} `}
      >
        <ProfileContent
          username={username}
          isEdit={isEdit}
          isSuper={isSuper}
          isAddMod={isAddMod}
          isAddFac={isAddFac}
          isChangePasswords={isChangePasswords}
          navigate={navigate}
        />
      </div>
    </>
  );
};

const ProfileContent = ({
  username,
  isEdit,
  isSuper,
  isAddMod,
  isAddFac,
  isChangePasswords,
  navigate,
}) => {
  return (
    <>
      <div className="flex left-5 bottom-4 mb-2 mt-6 relative">
        <img
          src="/src/assets/dp.jpeg"
          alt="Profile"
          className="w-20 h-20 rounded-full mt-10"
        />
        <span className="p-2 flex absolute ml-20 text-xm font-bold top-14 text-black rounded-md">
        {username}
        </span>
        <span className="flex absolute ml-20 text-base opacity-70 p-2 top-20 text-black rounded-md">
          Super Admin
        </span>
      </div>
      <div className="border-b"></div>
      <div className="flex-grow">
        <SidebarButton
          isActive={isSuper}
          ariaLabel="Super Admin Dashboard"
          icon={<LayoutDashboard />}
          label="Super Admin Dashboard"
          onClick={() => navigate("/SuperAdminDashboard")}
        />
        <SidebarButton
          isActive={isAddMod}
          ariaLabel="Add Moderator"
          icon={<UserRoundPen />}
          label="Add Moderator"
          onClick={() => navigate("/AddModerator")}
        />
        <SidebarButton
          isActive={isAddFac}
          ariaLabel="Add Faculty"
          icon={<UserRound />}
          label="Add Faculty"
          onClick={() => navigate("/AddFaculty")}
        />
        <SidebarButton
          isActive={isEdit}
          ariaLabel="Edit Account Details"
          icon={<SlidersHorizontal />}
          label="Edit Account Details"
          onClick={() => navigate("/")}
        />
        {/* <SidebarButton
          isActive={isChangePasswords}
          ariaLabel="Change Password"
          icon={<KeyRound />}
          label="Change Password"
          onClick={() => navigate("/changepassword")}
        /> */}
        <SidebarButton
          ariaLabel="Log Out"
          icon={<LogOut />}
          label="Log Out"
          onClick={() => navigate("/logout")}
        />
      </div>
    </>
  );
};

const SidebarButton = ({ isActive, ariaLabel, icon, label, onClick }) => (
  <button
    className={`p-6 w-full py-1 mb-2 rounded-md transition-colors flex items-center justify-start ${
      isActive ? "text-white bg-blue-500" : "text-black hover:text-white hover:bg-blue-500 active:bg-blue-50 duration-300"
    }`}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    <span className={`p-2 mr-2 ${isActive ? "text-white" : "hover:text-white"}`}>
      {React.cloneElement(icon, { color: isActive ? "white" : undefined })}
    </span>
    {label}
  </button>
);

export default Sidebar;
