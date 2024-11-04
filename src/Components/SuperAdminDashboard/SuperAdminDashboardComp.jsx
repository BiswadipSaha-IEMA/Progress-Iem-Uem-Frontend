import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useGetReq, usePutReq } from '../../hooks/useHttp';
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import { LuLoader } from "react-icons/lu";

// Main component for the SuperAdmin dashboard
export default function SuperAdminDashboardComp() {
  // State variables
  const [formCount, setFormCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false); 
  // const [superAdminData, setSuperAdminData] = useState({});
  // const [showForm, setShowForm] = useState(false); 
  const [superAdminData, setSuperAdminData] = useState({});
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  // Custom hooks for API requests
  const [getReq] = useGetReq();
  const [putReq] = usePutReq();
  const navigate = useNavigate();

  // Function to toggle profile visibility
  const toggleProfile = () => setShowProfile((prev) => !prev);

  const access = sessionStorage.getItem('user');

  // Function to determine status styles based on status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-[#D6FFCE]",
          text: "text-[#1C6229]",
          icon: <TiTick className="text-[#1C6229]" />,
        };
      case "Pending":
        return {
          bg: "bg-[#FFC8A0]",
          text: "text-[#873D22]",
          icon: <LuLoader className="text-[#873D22]" />,
        };
      case "Rejected":
        return {
          bg: "bg-[#FFD6D6]",
          text: "text-[#D60000]",
          icon: <RiCloseFill className="text-[#C66666]" />,
        };
      default:
        return {
          bg: "bg-gray-200",
          text: "text-gray-600",
          icon: <RiCloseFill />,
        };
    }
  };

  // Get access token from session storage
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  // Effect hook to fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        // Fetch all publications
        const response = await getReq("api/v1/document/getAllPublications", accessToken);
        if (response.success) {
          // Filter pending publications
          const filteredData = response.data.data.filter(
            (publication) => publication.status === "Pending"
          );
          setPendingRequests(filteredData);
          setPendingCount(response.data.pendingCount);
        }

        // Fetch super admin data
        const superAdminResponse = await getReq("api/v1/superAdmin/getSuperAdmin", accessToken);
        if (superAdminResponse.success) {
          setSuperAdminData(superAdminResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);
  
  // Function to handle form submission for updating super admin data
  const handleSubmit = async (formData) => {
    try {
      const dataToUpdate = { 
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      }; 
      const data = await putReq('api/v1/superAdmin/editSuperAdmin', dataToUpdate, accessToken.token);
      console.log(data);
      setSuperAdminData(data.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Main component UI
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile toggle button */}
      <div className="absolute top-4 left-4 z-10 p-2 mr-4">
        <button
          onClick={toggleProfile}
          className="bg-slate-200 p-2 rounded absolute lsx:hidden"
          aria-label="Toggle profile"
        >
          {showProfile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Main content */}
      <div className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[95vh] lg:p-6 space-y-6 duration-300 ${showProfile ? "lg:w-[calc(100% - 320px)] lg:ml-[330px]" : "lg:w-full lg:ml-0"} bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}>
        
        {/* SuperAdmin header */}
        <div className="bg-[url('/src/assets/superadmin.svg')] relative bg-cover bg-center w-full rounded-2xl bg-white p-4 sm:p-8 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-center text-[30px] sm:text-[44px] font-semibold text-[#437F9E]">
            SUPERADMIN
          </div>
        </div>

        {/* View all data section */}
        <div className="bg-[url('/src/assets/vector_main.svg')] relative bg-cover bg-center w-full rounded-2xl bg-white p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
          <div className="absolute top-[-10px] right-[-10px] flex flex-col items-center bg-blue-600 shadow-lg px-3 py-1 rounded-md">
            <p className="text-xl text-white font-[500]">{pendingCount}</p>
          </div>
          <h2 className="mb-4 text-center text-xl font-semibold">
            Click Here to View All Data and Submissions
          </h2>
          <div className="flex justify-center">
            <button 
              onClick={()=>{
                navigate('/viewdata')
              }}
              className="rounded-md bg-blue-500 px-4 sm:px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              View Data
            </button>
          </div>
        </div>

        {/* Moderator and Faculty section */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Moderator section */}
          <div className="flex-1 p-6 sm:p-8 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-[url('/src/assets/moderator.svg')] bg-cover bg-center h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col items-start">
                <button 
                  className="rounded-md bg-blue-500 px-6 sm:px-8 py-3 text-lg text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                  onClick={() => navigate("/addmoderator")}
                >
                  Moderator
                </button> 
              </div>
            </div>
          </div>

          {/* Faculty section */}
          <div className="flex-1 p-6 sm:p-8 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-[url('/src/assets/faculty.svg')] bg-cover bg-center h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col items-start">
                <button 
                  className="rounded-md bg-blue-500 px-6 sm:px-8 py-3 text-lg text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
                  onClick={() => navigate("/addfaculty")} 
                >
                  Faculty
                </button> 
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests Section */}
        <div className="rounded-2xl bg-white p-6 shadow-md flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-cyan-500">Pending Requests</h2>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              // onClick={() => navigate("/viewdata")}
            >
              View all pending requests ({pendingCount})
            </button>
          </div>
          {/* Grid to display pending requests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ml-10 mr-10">
            {pendingRequests.slice(0, 3).map((request, index) => {
              const { bg, text, icon } = getStatusStyles(request.status);
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <p><span className="font-semibold text-lg">{request.name}</span></p>
                    <span className={`${bg} ${text} rounded px-2 text-sm flex items-center`}>
                      {icon} {request.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {request.publicationType}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {request.authorType}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {request.publicationGrade}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar component */}
        <Sidebar showProfile={showProfile} />
      </div>
    </div>
  );
}