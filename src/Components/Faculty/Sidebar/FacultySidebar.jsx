import React, { useContext, useEffect } from "react";
import {
  LayoutDashboard,
  UserRoundPen,
  SlidersHorizontal,
  KeyRound,
  LogOut,
  FilePenLine,
  UserRound,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../Store/Action";
import { AuthContext } from "../../../Context/AuthContext";
import { useGetReq } from "../../../hooks/useHttp";

const Sidebar = ({ showProfile, isChangePasswords }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {logout}= useContext(AuthContext)
  const isEdit = location.pathname === "/";
  const isSuper = location.pathname === "/faculty/dashboard";
  const [getReq]= useGetReq()
  const accessToken= sessionStorage.getItem('token').split('"')[1]
  // const isAddMod = location.pathname === "/AddModerator";
  // const isAddFac = location.pathname === "/AddFaculty";

  

  return (
    <>
      <div
        className={`left-2 fixed inset-0 bg-white shadow-md p-6 rounded-lg transform transition-transform 
          lg:hidden flex flex-col ${
          showProfile ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <ProfileContent
          // isEdit={isEdit}
          isSuper={isSuper}
          // isAddMod={isAddMod}
          // isAddFac={isAddFac}
          isChangePasswords={isChangePasswords}
          navigate={navigate}
        />
      </div>

      <div
        className={`fixed inset-y-0 left-0 ${
          showProfile ? "left-4" : "left-0"
        } w-80 lg:h-[93vh] mt-6 bg-white shadow-md p-4 rounded-lg transform transition-transform duration-300 hidden lg:flex flex-col ${
          showProfile ? "translate-x-0 h-full" : "-translate-x-full"
        } `}
      >
        <ProfileContent
          // isEdit={isEdit}
          isSuper={isSuper}
          // isAddMod={isAddMod}
          // isAddFac={isAddFac}
          isChangePasswords={isChangePasswords}
          navigate={navigate}
        />
      </div>
    </>
  );
};

const ProfileContent = ({
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
          className="object-cover w-24 h-24 mt-10 rounded-full"
        />
        <span className="absolute flex p-2 font-bold text-black rounded-md left-32 text-xm top-16">
          FACULTY
        </span>
      </div>
      <div className="flex-grow">
        <div
          className="w-full mb-2 text-sm text-red-500 bg-transparent border-b border-gray-800"
          aria-label="Remove Profile Picture"
        >
        </div>
        <SidebarButton
          isActive={isSuper}
          ariaLabel="Faculty Dashboard"
          icon={<LayoutDashboard />}
          label="Faculty Dashboard"
          onClick={() => navigate("/SuperAdminDashboard")}
        />
        {/* <SidebarButton
          // isActive={isEdit}
          ariaLabel="Edit Account Details"
          icon={<SlidersHorizontal />}
          label="Edit Account Details"
          onClick={() => navigate("/")}
        /> */}
        {/* <SidebarButton
          // isActive={isChangePasswords}
          ariaLabel="Change Password"I
          icon={<KeyRound />}
          label="Change Password"
          onClick={() => navigate("/changepassword")}
        /> */}
        <SidebarButton
          ariaLabel="Log Out"
          icon={<LogOut />}
          label="Log Out"
          onClick={() => {
            logout()
            sessionStorage.clear()
            navigate('/faculty/login')
            window.location.reload()
          }}
        />
      </div>
    </>
  );
};

const SidebarButton = ({ isActive, ariaLabel, icon, label, onClick }) => (
  <button
    className={`p-6 w-full py-1 mb-2 rounded-md transition-colors flex items-center justify-start font-poppins ${
      isActive
        ? "text-white bg-[#03a8fd]" : "text-black hover:text-white hover:bg-[#03a8fd] active:bg-[#03a8fd] duration-300"
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