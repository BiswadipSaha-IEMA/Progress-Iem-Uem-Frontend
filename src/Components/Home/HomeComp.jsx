import React, { useContext, useEffect, useState } from "react";
import { Menu, X, FilePenLine } from "lucide-react";
import ChangePasswordCompSigned from "../ChangePassword/ChangePasswordCompSigned";
import { AuthContext } from "../../Context/AuthContext";
// import Sidebar from "../Sidebar";
import Sidebar from "../SideBar/Sidebar";
import { useGetReq, usePutReq } from "../../hooks/useHttp";
import PopupModal from "../Popup Modal/PopupModal";
import { useLocation } from 'react-router-dom';

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
  
  const handleClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const fetchSuperAdminData = async () => {
      try {
        
        const data = await getReq('api/v1/superAdmin/getSuperAdmin', accessToken);
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
        const dataToUpdate = { name: formData.name,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
         }; 
        const data = await putReq('api/v1/superAdmin/editSuperAdmin', dataToUpdate, accessToken);
        console.log(data);
        setSuperAdminData(data.data);
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };

  return (
    <div className="min-h-screen bg-gray-200 flex p-6 box-border relative overflow-hidden">
      {/* Main Content Area */}
      <div className={` flex-grow h-full bg-gray-200 rounded-lg flex flex-col lg:h-[93vh] transition-all duration-300`}>
        {/* Hamburger Menu for Mobile and Desktop */}
        <div className="absolute top-4 left-4 z-10 p-2 right-2 mr-4">
          <button
            onClick={toggleProfile}
            className="bg-slate-200 p-2 mt-1 ml-1  rounded"
            aria-label="Toggle profile"
          >
            {showProfile ? <X className="h-4 w-4 z-40  " /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Main Content Section */}
        <div className={`flex-grow h-full bg-gray-200 rounded-lg flex flex-col lg:h-[93vh] transition-all duration-300 overflow-hidden `}>
          <div className={` gap-8 bg-white bg-cover bg-center shadow-md flex-grow p-8 rounded-lg mb-8 left-10 duration-300 ${showProfile ? "lg:w-[calc(100%-320px)] lg:ml-[320px]" : "lg:w-full lg:ml-0"} bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}>
            <h1 className="text-black text-2xl font-bold mb-6">Account Details</h1>

            {/* Personal Details Section */}
            <section className="mb-6">
              <div className="flex border-b-2 border-gray-700 justify-between items-center">
                <h2 className="text-xl text-cyan-400 font-semibold mb-2">
                  Personal Details
                </h2>

                <button className="text-black font-semibold mr-2 flex gap-2" onClick={handleClick}>
                  Edit <FilePenLine />
                </button>
                {showForm && <PopupModal onClose={handleClose} onSubmit={handleSubmit}/>}
              </div>
              <div className="flex flex-col gap-2 text-black">
                <p className="mt-2">
                  <strong>Name:</strong> {superAdminData.name}
                </p>
                <p>
                  <strong>Address:</strong> {superAdminData.address}
                </p>
              </div>
            </section>

            {/* Contact Details Section */}
            <section className="mb-6">
              <div className="flex border-b-2 border-gray-700 justify-between items-center">
                <h2 className="text-xl text-cyan-400 font-semibold mb-2">
                  Contact Details
                </h2>
              </div>
              <div className="flex flex-col gap-2 text-black">
                <p className="mt-2">
                  <strong>Phone No.:</strong> {superAdminData.phone}
                  <span className="bg-blue-100 text-cyan-400 text-xs px-1 rounded">
                    Primary
                  </span>
                </p>
                <p>
                  <strong>Email:</strong> {superAdminData.email}
                  <span className="bg-blue-100 text-cyan-400 text-xs px-1 rounded">
                    Primary
                  </span>
                </p>
                {/* {superAdminData.secondaryPhone && (
                  <p>
                    <strong>Secondary Phone No.:</strong>{" "}
                    superAdminData.secondaryPhone
                  </p>
                )}
                {superAdminData.secondaryEmail && (
                  <p>
                    <strong>Secondary Email:</strong> -
                  </p>
                )} */}
              </div>
            </section>

            {/* Account Settings Section */}
            {/* <section className="mb-6">
              <div className="flex border-b-2 border-gray-700 justify-between items-center">
                <h2 className="text-xl text-cyan-400 font-semibold mb-2">Account Settings</h2>
                <button className="text-black font-semibold mr-2 flex gap-2">
                  Edit <FilePenLine />
                </button>
              </div>
              <div className="flex flex-col gap-2 text-black">
                <p className="mt-2"><strong>Account Type:</strong> Premium</p>
                <p><strong>Joined On:</strong> January 1, 2021</p>
              </div>
            </section> */}
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
