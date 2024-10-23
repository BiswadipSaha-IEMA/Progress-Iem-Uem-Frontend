import { useState, useEffect } from "react";
// import { Users, Laptop } from 'lucide-react';
import { Menu, X } from "lucide-react";
// import { NavLink } from 'react-router-dom';

import Sidebar from "./Sidebar";

export default function SuperAdminDashboard() {
  const [formCount, setFormCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => setShowProfile((prev) => !prev);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.221:5000/api/v1/document/getAllPublications"
        );
        const data = await response.json();
        setFormCount(data.count);
      } catch (error) {
        console.error("Error fetching form count:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute top-4 left-4 z-10 p-2 mr-4">
        <button
          onClick={toggleProfile}
          className="bg-gray-300 p-2 rounded"
          aria-label="Toggle profile"
        >
          {showProfile ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[96vh] lg:p-8 space-y-6 duration-300 ${
          showProfile
            ? "lg:w-[calc(100% - 320px)] lg:ml-[320px]"
            : "lg:w-full lg:ml-0"
        } bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}
      >
        <div className="bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center w-full rounded-lg bg-white p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
          <h2 className="mb-4 text-center text-xl font-semibold">
            Click Here to View All Data and Submissions
          </h2>
          <div className="flex justify-center">
            <button className="rounded-md bg-blue-500 px-4 sm:px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              View Data
            </button>
          </div>
        </div>

        {/* Moderator, Counts, and Faculty section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 p-6 sm:p-16 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex flex-col items-center rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
            <div className="bg-[url('/src/assets/moderator.svg')] bg-cover bg-center mb-4 h-24 w-24 sm:h-28 sm:w-28" />
            <button className="rounded-md bg-blue-500 px-4 sm:px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Moderator
            </button>
          </div>

          <div className="flex-1 p-6 sm:p-16 relative bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex flex-col items-center rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
            {/* Place the Count value inside the Faculty div */}
            <div className="absolute top-4 right-4 flex flex-col items-center">
              <p className="text-xl text-black">{formCount} Pending Forms</p>
            </div>

            <div className="bg-[url('/src/assets/faculty.svg')] bg-cover bg-center mb-4 h-24 w-24 sm:h-28 sm:w-28 text-gray-600" />
            <button className="rounded-md bg-blue-500 px-4 sm:px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Faculty
            </button>
          </div>
        </div>

        {/* Account - details Section */}
        <div className="rounded-lg bg-white p-6 shadow-md flex-grow">
          <h2 className="mb-4 text-xl font-semibold text-cyan-500">
            Account Details
          </h2>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> Kartik Dubey
            </p>
            <p>
              <span className="font-semibold">Address:</span> Biswa Bangla
              Sarani, Rajarhat, Action Area III, Kolkata, 700159
            </p>
            <p>
              <span className="font-semibold">Phone No.:</span> 9123456789
              <span className="ml-2 rounded-lg bg-blue-100 px-2 py-1 text-xs text-cyan-500">
                Primary
              </span>
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              kartikdubey1234@gmail.com
              <span className="ml-2 rounded-lg bg-blue-100 px-2 py-1 text-xs text-cyan-500">
                Primary
              </span>
            </p>
            <p>
              <span className="font-semibold">Secondary Phone No.:</span>{" "}
              9123456789
            </p>
            <p>
              <span className="font-semibold">Secondary Email:</span> -
            </p>
          </div>
        </div>
        <Sidebar showProfile={showProfile} />
      </div>
    </div>
  );
}
