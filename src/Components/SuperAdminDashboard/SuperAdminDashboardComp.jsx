import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useGetReq, usePutReq } from '../../hooks/useHttp';
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";

export default function SuperAdminDashboardComp() {
  const [formCount, setFormCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [superAdminData, setSuperAdminData] = useState({});
  const [showForm, setShowForm] = useState(false); 

  const [getReq] = useGetReq();
  const [putReq] = usePutReq();
  const navigate = useNavigate();

  const toggleProfile = () => setShowProfile((prev) => !prev);

  const access = sessionStorage.getItem('user');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch counts
  //       const response = await getReq('api/v1/document/getAllPublications', accessToken.token);
  //       if (response.success) {
  //         console.log("API Response:", response);
  //         setFormCount(response.data.pendingCount);
  //       }

  //       // Fetch super admin data
  //       const data = await getReq('api/v1/superAdmin/getSuperAdmin', accessToken.token);
  //       console.log(data.data);
  //       setSuperAdminData(data.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } 
  //   };

  //   fetchData();
  // }, []); 

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  useEffect(() => {
    const allInfo = async () => {
      try {
        // Fetch publication counts
        const response = await getReq("api/v1/document/getAllPublications", accessToken);
        if (response.success) {
          setFormCount(response.data.pendingCount);
          console.log("Publication Count Response:", response);
        }
  
        // Fetch super admin data
        const superAdminResponse = await getReq("api/v1/superAdmin/getSuperAdmin", accessToken);
        if (superAdminResponse.success) {
          console.log("Super Admin Data:", superAdminResponse.data);
          setSuperAdminData(superAdminResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    allInfo();
  }, [accessToken]);
  

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute top-4 left-4 z-10 p-2 mr-4">
        <button
          onClick={toggleProfile}
          className="bg-slate-200 p-2 rounded absolute lsx:hidden"
          aria-label="Toggle profile"
        >
          {showProfile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[95vh] lg:p-6 space-y-6 duration-300 ${showProfile ? "lg:w-[calc(100% - 320px)] lg:ml-[330px]" : "lg:w-full lg:ml-0"} bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}>
        
        <div className="bg-[url('/src/assets/vector_main.svg')] relative bg-cover bg-center w-full rounded-lg bg-white p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
        <div className="absolute top-[-10px] right-[-10px] flex flex-col items-center bg-blue-600 shadow-lg px-3 py-1 rounded-md">
              <p className="text-xl text-white font-[500]">{formCount}</p>
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

        {/* Moderator, Counts, and Faculty section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 p-6 sm:p-16 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex flex-col items-center rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
            <div className="bg-[url('/src/assets/moderator.svg')] bg-cover bg-center mb-4 h-24 w-24 sm:h-28 sm:w-28" />
            <button className="rounded-md bg-blue-500 px-4 sm:px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => navigate("/addmoderator")}>
              Moderator
            </button>
          </div>

          <div className="flex-1 p-6 sm:p-16 relative bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex flex-col items-center rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
            

            <div className="bg-[url('/src/assets/faculty.svg')] bg-cover bg-center mb-4 h-24 w-24 sm:h-28 sm:w-28 text-gray-600" />
            <button className="rounded-md bg-blue-500 px-4 sm:px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={() => navigate("/addfaculty")}>
              Faculty
            </button>
          </div>
        </div>

        {/* Account - details Section */}
        <div className="rounded-lg bg-white p-6 shadow-md flex-grow">
          <h2 className="mb-4 text-xl font-semibold text-cyan-500">Account Details</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span> {superAdminData.name}</p>
            <p><span className="font-semibold">Address:</span> {superAdminData.address}</p>
            <p><span className="font-semibold">Phone No.:</span> {superAdminData.phone}
              <span className="ml-2 rounded-lg bg-blue-100 px-2 py-1 text-xs text-cyan-500">Primary</span>
            </p>
            <p><span className="font-semibold">Email:</span> {superAdminData.email}
              <span className="ml-2 rounded-lg bg-blue-100 px-2 py-1 text-xs text-cyan-500">Primary</span>
            </p>
            
          </div>
        </div>

        <Sidebar showProfile={showProfile} username = {superAdminData.name} />
      </div>
    </div>
  );
}
