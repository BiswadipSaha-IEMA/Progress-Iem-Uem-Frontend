import React from "react";
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

const Sidebar = ({ showProfile, isChangePasswords }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.pathname === "/";
  const isSuper = location.pathname === "/SuperAdminDashboard";
  const isAddMod = location.pathname === "/AddModerator";
  const isAddFac = location.pathname === "/AddFaculty";

  return (
    <>
      <div
        className={` fixed inset-0 bg-white shadow-md p-6 rounded-lg transform transition-transform lg:hidden flex flex-col ${
          showProfile ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        <ProfileContent
          isEdit={isEdit}
          isSuper={isSuper}
          isAddMod={isAddMod}
          isAddFac={isAddFac}
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
          className="w-20 h-20 rounded-full  mt-10"
        />
        <span
          className="  p-2 flex absolute 
         ml-20  text-xl  font-bold top-14 text-black rounded-md"
        >
          Kartik Dubay
        </span>
        <span className="flex absolute ml-20 text-base opacity-70 p-2 top-20 text-black rounded-md">
          Super Admin
        </span>
      </div>
      <div className="flex-grow">
        <button
          className="w-full py-2 mb-2 text-red-500 bg-transparent hover:text-red-600 transition-colors text-sm border-b border-gray-800"
          aria-label="Remove Profile Picture"
        ></button>
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
        <SidebarButton
          isActive={isChangePasswords}
          ariaLabel="Change Password"
          icon={<KeyRound />}
          label="Change Password"
          onClick={() => navigate("/changepassword")}
        />
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
      isActive
        ? "text-white bg-blue-500"
        : "text-black hover:text-white hover:bg-blue-500 active:bg-blue-50 duration-300"
    }`}
    aria-label={ariaLabel}
    onClick={onClick}
  >
    <span
      className={`p-2  mr-2 ${isActive ? "text-white" : "hover:text-white"}`}
    >
      {React.cloneElement(icon, { color: isActive ? "white" : undefined })}
    </span>
    {label}
  </button>
);

export default Sidebar;
