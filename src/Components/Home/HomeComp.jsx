import React, { useContext, useEffect, useState } from "react";
import { Menu, X, FilePenLine } from "lucide-react";
import ChangePasswordCompSigned from "../ChangePassword/ChangePasswordCompSigned";
import { AuthContext } from "../../Context/AuthContext";
// import Sidebar from "../Sidebar";
import Sidebar from "../SideBar/Sidebar";
import { useGetReq, usePutReq } from "../../hooks/useHttp";
import PopupModal from "../Popup Modal/PopupModal";
import { useLocation } from "react-router-dom";
import ManagePopUp from "../../utils/Popup/FormPopUp/ManagePopUp";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import DragDrop from "./DragDrop";

export default function HomeComp() {
  const [showProfile, setShowProfile] = useState(false);

  const [changePassword, setChangePassword] = useState(false);
  const { logout } = useContext(AuthContext);
  const [superAdminData, setSuperAdminData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const [getReq, { error, loading }] = useGetReq();
  const [putReq, { errorReq, putLoading }] = usePutReq();
  const location = useLocation();

  const toggleProfile = () => setShowProfile((prev) => !prev);
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  // const handleClick = () => {
  //   setShowForm(true);
  // };

  // const handleClose = () => {
  //   setShowForm(false);
  // };

  useEffect(() => {
    const fetchSuperAdminData = async () => {
      try {
        const data = await getReq(
          "api/v1/superAdmin/getSuperAdmin",
          accessToken
        );
        console.log(data.data);
        setSuperAdminData(data.data);
      } catch (error) {
        console.error("Error fetching super admin data:", error);
      }
    };

    fetchSuperAdminData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const dataToUpdate = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      };
      const data = await putReq(
        "api/v1/superAdmin/editSuperAdmin",
        dataToUpdate,
        accessToken
      );
      console.log(data);
      setSuperAdminData(data.data);
      console.log(data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex p-6 box-border relative overflow-hidden">
      {/* Main Content Area */}
      <div
        className={` flex-grow h-full bg-gray-200 rounded-lg flex flex-col lg:h-[93vh] transition-all duration-300`}
      >
        {/* Hamburger Menu for Mobile and Desktop */}
        <div className="absolute top-4 left-4 z-10 p-2 right-2 mr-4">
          <button
            onClick={toggleProfile}
            className="bg-slate-200 p-2 mt-1 ml-1  rounded"
            aria-label="Toggle profile"
          >
            {showProfile ? (
              <X className="h-4 w-4 z-40  " />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Main Content Section */}
        <div
          className={`flex-grow h-full bg-gray-200 rounded-lg flex flex-col lg:h-[93vh] transition-all duration-300 overflow-hidden `}
        >
          <div
            className={` gap-8  bg-cover bg-center shadow-md flex-grow p-8 rounded-lg mb-8 left-10 duration-300 ${
              showProfile
                ? "lg:w-[calc(100%-320px)] lg:ml-[320px]"
                : "lg:w-full lg:ml-0"
            } bg-[url('/src/assets/image2.svg')] `}
          >
            <h1 className="text-black text-2xl font-bold mb-6">
              {" "}
              Edit Account Details
            </h1>

            <div className="h-[100%]">
              {/* second div */}
              <div className="bg-white rounded-2xl flex h-[40%] justify-center items-center">
                {/* drag & drop  file upload div */}
                {/* <div className=" w-[50%] h-full flex justify-center items-center">
                  <DragDrop />
                </div> */}

                {/* profile image div */}
                <div className="flex w-[50%] flex-col justify-center items-center">
                  <img className="border-[3px] rounded-[50%] border-[#03A8FD]"  src="/src/assets/dp.jpeg" alt="profile image" />

                  {/* <div className="flex gap-2 mt-4">
                    <button className="bg-[#03A8FD] font-semibold rounded-lg px-5 py-2 text-white flex justify-center items-center gap-2">
                      <FaUser className="text-2xl" />
                      Change Profile Picture
                    </button>
                    <button>
                      <MdDeleteOutline className="text-3xl text-red-500" />
                    </button>
                  </div> */}
                </div>
              </div>

              {/* third div */}
              <div className="bg-white rounded-xl mt-5 mb-5 min-h-[42vh] p-10">
                <form action="">
                  <div>
                    <p className="font-semibold"> Name :</p>
                    <div className="flex justify-center items-center gap-2">
                      <input
                        disabled
                        className="bg-gray-200 w-full p-2 rounded-lg mt-2 placeholder:text-black"
                        type="text"
                        placeholder={superAdminData.name}
                      />
                      <FaRegEdit className="text-2xl text-gray-500" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="font-semibold">Address :</p>
                    <div className="flex justify-center items-center gap-2">
                      <input
                        disabled
                        className="bg-gray-200 w-full p-2 rounded-lg mt-2 placeholder:text-black"
                        type="text"
                        placeholder={superAdminData.address}
                      />
                      <FaRegEdit className="text-2xl text-gray-500" />
                    </div>
                  </div>
                  <div className="flex w-[100%] gap-8">
                    <div className="mt-5 w-1/2 ">
                      <p className="font-semibold">Phone No :</p>
                      <div className="flex justify-center items-center gap-2">
                        <input
                          disabled
                          className="bg-gray-200 w-full p-2 rounded-lg mt-2 placeholder:text-black"
                          type="text"
                          placeholder={superAdminData.phone}
                        />
                        <FaRegEdit className="text-2xl text-gray-500" />
                      </div>
                    </div>
                    <div className="mt-5 w-1/2">
                      <p className="font-semibold">Email :</p>
                      <div className="flex justify-center items-center gap-2">
                        <input
                          disabled
                          className="bg-gray-200 p-2 rounded-lg mt-2 placeholder:text-black w-full"
                          type="text"
                          placeholder={superAdminData.email}
                        />
                        <FaRegEdit className="text-2xl text-gray-500" />
                      </div>
                    </div>
                  </div>
                  {/* 2 buttons */}
                  <div className="flex float-end gap-3 mt-5">
                    {/* <button className="bg-gray-200 rounded-lg px-5 py-2">
                      Cancel
                    </button> */}
                    <button className="bg-[#03A8FD] text-[#fff] rounded-lg px-5 py-2">
                      Apply Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <Sidebar showProfile={showProfile} />
        </div>
      </div>

      {changePassword && (
        <ChangePasswordCompSigned setForgetPassword={setChangePassword} />
      )}
    </div>
  );
}
