import React, { useContext } from "react";
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

const Sidebar = ({ showProfile, isChangePasswords }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {logout}= useContext(AuthContext)
  const isEdit = location.pathname === "/";
  const isSuper = location.pathname === "/moderator/dashboard";
  // const isAddMod = location.pathname === "/AddModerator";
  // const isAddFac = location.pathname === "/AddFaculty";

  return (
    <>
      <div
        className={`left-2 fixed inset-0 bg-white shadow-md p-6 rounded-lg transform transition-transform lg:hidden flex flex-col ${
          showProfile ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
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
        } w-80 lg:h-[90vh] mt-6 bg-white shadow-md p-4 rounded-lg transform transition-transform duration-300 hidden lg:flex flex-col ${
          showProfile ? "translate-x-0 h-full" : "-translate-x-full"
        } overflow-y-auto`}
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
      <div className="flex justify-center mb-4 relative">
        <img
          src="/src/assets/dp.jpeg"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mt-10"
        />
        <span className="absolute mt-10 ml-28 bg-gray-300 text-xs p-1 font-bold top-5 text-black rounded-md shadow-md">
          Moderator
        </span>
      </div>
      <div className="flex-grow">
        <div
          className="w-full mb-2 text-red-500 bg-transparent text-sm border-b border-gray-800"
          aria-label="Remove Profile Picture"
        >
        </div>
        <SidebarButton
          isActive={isSuper}
          ariaLabel="Moderator Dashboard"
          icon={<LayoutDashboard />}
          label="Moderator Dashboard"
          onClick={() => navigate("/SuperAdminDashboard")}
        />
        {/* <SidebarButton
          // isActive={isEdit}
          ariaLabel="Edit Account Details"
          icon={<SlidersHorizontal />}
          label="Edit Account Details"
          onClick={() => navigate("/")}
        />
        <SidebarButton
          // isActive={isChangePasswords}
          ariaLabel="Change Password"
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
            navigate('/moderator/login')
          }}
        />
      </div>
    </>
  );
};

const SidebarButton = ({ isActive, ariaLabel, icon, label, onClick }) => (
  <button
    className={`w-full py-3 mb-2 rounded-md transition-colors flex items-center justify-start px-3 ${
      isActive
        ? "text-white bg-[#03A8FD]"
        : "text-black hover:text-white hover:bg-[#03A8FD] active:bg-blue-50 duration-300"
    }`}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    <span className={`mr-2 ${isActive ? "text-white" : "hover:text-white"}`}>
      {React.cloneElement(icon, { color: isActive ? "white" : undefined })}
    </span>
    {label}
  </button>
);

export default Sidebar;
