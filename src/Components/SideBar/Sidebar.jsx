import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  UserRoundPen,
  SlidersHorizontal,
  KeyRound,
  LogOut,
  UserRound,
} from "lucide-react";
import { FaStream } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetReq } from "../../hooks/useHttp";
import { logout } from "../../Store/Action";
// import {username} from "../SuperAdminDashboard/SuperAdminDashboardComp"
const Sidebar = ({ showProfile, isChangePasswords,username }) => {
  const [superAdminData, setSuperAdminData] = useState({});
  const [getReq, { error, loading }] = useGetReq();
  
  const location = useLocation();
  const navigate = useNavigate();

  const isSuper = location.pathname === "/";
  const isEdit = location.pathname === "/editAcc";
  const isAddMod = location.pathname === "/AddModerator" || location.pathname === "/addmoderator";
  const isAddFac = location.pathname === "/AddDepartment" || location.pathname === "/adddepartment";



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
        className={`fixed inset-y-0 left-0 ${showProfile ? "left-4" : "left-0"} w-80 lg:h-[90vh] mt-6 bg-white shadow-md p-4 rounded-2xl transform transition-transform duration-300 hidden lg:flex flex-col ${showProfile ? "translate-x-0 h-full" : "-translate-x-full"} `}
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
      <div className="relative flex mt-6 mb-2 left-5 bottom-4 font-poppins">
        <img
          src="/src/assets/dp.jpeg"
          alt="Profile"
          className="w-20 h-20 mt-10 rounded-full"
        />
        <span className="absolute flex p-2 ml-20 font-bold text-black rounded-md text-xm top-14">
        {username}
        </span>
        <span className="absolute flex p-2 ml-20 text-base text-black rounded-md opacity-70 top-20">
          Super Admin
        </span>
      </div>
      <div className="border-b"></div>
      <div className="flex-grow font-poppins text-[0.9rem]">
        <SidebarButton
          isActive={isSuper}
          ariaLabel="Super Admin Dashboard"
          icon={<LayoutDashboard />}
          label="Super Admin Dashboard"
          onClick={() => navigate("/")}
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
          ariaLabel="Add Department"
          icon={<FaStream size={19}/>}
          label="Add Department"
          onClick={() => navigate("/AddDepartment")}
        />
        {/* <SidebarButton
          isActive={isEdit}
          ariaLabel="Edit Account Details"
          icon={<SlidersHorizontal />}
          label="Edit Account Details"
          onClick={() => navigate("/editAcc")}
        /> */}
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
          onClick={

            ()=>{
              logout();
              navigate("/login");
              sessionStorage.clear()
            }
          }
        />
      </div>
    </>
  );
};

const SidebarButton = ({ isActive, ariaLabel, icon, label, onClick }) => (
  <button
    className={`p-6 w-full py-1 mb-2 rounded-md transition-colors flex items-center justify-start ${
      isActive ? "text-white bg-[#03A8FD]" : "text-black hover:text-white hover:bg-[#03A8FD] active:bg-blue-50 duration-300"
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
