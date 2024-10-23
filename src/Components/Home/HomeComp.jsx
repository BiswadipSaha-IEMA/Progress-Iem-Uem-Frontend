import React, { useContext, useState } from "react";
import { Menu, X, FilePenLine } from "lucide-react";
import ChangePasswordCompSigned from "../ChangePassword/ChangePasswordCompSigned";
import { AuthContext } from "../../Context/AuthContext";
// import Sidebar from "../Sidebar";
import Sidebar from '../SideBar/Sidebar'

export default function HomeComp() {
  const [showProfile, setShowProfile] = useState(false);
  const [ChangePassword, setChangePassword] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleProfile = () => setShowProfile((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-200 flex p-6 box-border relative overflow-hidden">
      {/* Main Content Area */}
      <div
        className={`flex-grow h-full bg-gray-200 rounded-lg flex flex-col lg:h-[93vh] transition-all duration-300 ${
          showProfile ? " " : ""
        }`}
      >
        {/* Hamburger Menu for Mobile and Desktop */}
        <div className="absolute top-4 left-4 z-10 p-2 mr-4">
          <button
            onClick={toggleProfile}
            className="bg-slate-200 p-2 rounded"
            aria-label="Toggle profile"
          >
            {showProfile ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Main Content Section */}
        <div
          className={`flex-grow h-full bg-gray-200 rounded-lg flex flex-col lg:h-[93vh] transition-all duration-300 overflow-hidden`}
        >
          {/* Main Content Section */}
          <div
            className={`bg-white bg-cover bg-center shadow-md flex-grow p-8 rounded-lg mb-8 duration-300 ${
              showProfile ? "lg:w-[calc()] lg:ml-[320px]" : "lg:w-full lg:ml-0"
            } bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}
          >
            <h1 className="text-black text-2xl font-bold mb-6">
              Account Details
            </h1>

            {/* Personal Details Section */}
            <section className="mb-6">
              <div className="flex border-b-2 border-gray-700 justify-between items-center">
                <h2 className="text-xl text-cyan-400 font-semibold mb-2">
                  Personal Details
                </h2>

                <button className="text-black font-semibold mr-2 flex gap-2">
                  Edit <FilePenLine />
                </button>
              </div>
              <div className="flex flex-col gap-2 text-black">
                <p className="mt-2">
                  <strong>Name:</strong> Kartik Dubey
                </p>
                <p>
                  <strong>Address:</strong> Biswa Bangla Sarani, Rajarhat,
                  Action Area III, Kolkata, 700159
                </p>
              </div>
            </section>

            {/* Contact Details Section */}
            <section className="mb-6">
              <div className="flex border-b-2 border-gray-700 justify-between items-center">
                <h2 className="text-xl text-cyan-400 font-semibold mb-2">
                  Contact Details
                </h2>
                <button className="text-black font-semibold mr-2 flex gap-2">
                  Edit <FilePenLine />
                </button>
              </div>
              <div className="flex flex-col gap-2 text-black">
                <p className="mt-2">
                  <strong>Phone No.:</strong> 9123456789{" "}
                  <span className="bg-blue-100 text-cyan-400 text-xs px-1 rounded">
                    Primary
                  </span>
                </p>
                <p>
                  <strong>Email:</strong> Kartikdubey11234@gmail.com{" "}
                  <span className="bg-blue-100 text-cyan-400 text-xs px-1 rounded">
                    Primary
                  </span>
                </p>
                <p>
                  <strong>Secondary Phone No.:</strong> 9123456789
                </p>
                <p>
                  <strong>Secondary Email:</strong> -
                </p>
              </div>
            </section>

            {/* Account Settings Section */}
            <section className="mb-6">
              <div className="flex border-b-2 border-gray-700 justify-between items-center">
                <h2 className="text-xl text-cyan-400 font-semibold mb-2">
                  Account Settings
                </h2>
                <button className="text-black font-semibold mr-2 flex gap-2">
                  Edit <FilePenLine />
                </button>
              </div>
              <div className="flex flex-col gap-2 text-black">
                <p className="mt-2">
                  <strong>Account Type:</strong> Premium
                </p>
                <p>
                  <strong>Joined On:</strong> January 1, 2021
                </p>
              </div>
            </section>

            <div className="flex justify-end gap-4 mt-8">
              <button className="px-4 py-2 rounded-md font-medium bg-gray-200 text-black hover:bg-gray-300 transition-colors mt-52">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors mt-52">
                Apply Changes
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <Sidebar showProfile={showProfile} />
        </div>
      </div>
      {ChangePassword && (
        <>
          <ChangePasswordCompSigned setForgetPassword={setChangePassword} />
        </>
      )}
    </div>
  );
}
