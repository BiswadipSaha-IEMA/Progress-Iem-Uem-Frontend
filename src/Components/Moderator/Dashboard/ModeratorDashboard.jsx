import { useState, useEffect,useRef } from "react";
import { Menu, X } from "lucide-react";
import { useGetReq, usePutReq } from '../../../hooks/useHttp';
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/ModeratorSidebar";
import { FacultyCard } from "../FacultyCard/FacultyCard";
import MemberCard from "../../MemberCard/MemberCard";



export default function ModeratorDashboard() {
  const [formCount, setFormCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [pendingData, setPendingData] = useState([]);
  const [superAdminData, setSuperAdminData] = useState({});
  const [showForm, setShowForm] = useState(false); 

  const [getReq] = useGetReq();
  const [putReq] = usePutReq();
  const navigate = useNavigate();
  
  const toggleProfile = () => setShowProfile((prev) => !prev);
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const access = sessionStorage.getItem('user');

  // const facultyAccess= async(id,accessModify)=>{
  //   const response=await putReq('api/v1/document/reviewPublication', {
  //     publicationId:id,
  //     status: accessModify
  //   },
  // accessToken
  // )
  // if(response.success)
  //   setResponseModify(response.Message)
  // }

  // useEffect(()=>{
  //   console.log(responseModify)
  // },[responseModify])

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
  const handleStatusChange=(id,newStatus)=>{
    setPendingData(prevData=>prevData.filter(item=>item._id!==id))
  }

  useEffect(() => {
    const allInfo = async () => {
      try {
        // Fetch publication counts
        const response = await getReq("api/v1/document/getAllPublications", accessToken);
        if (response.success) {
          setFormCount(response.data.pendingCount);
          // console.log("Publication Count Response:", response.data.data);
          const filteredData=response.data.data
          .filter((publication)=>publication.status==='Pending')
          setPendingData(filteredData)
          // console.log(filteredData)
        }
  
        // Fetch super admin data
        // const superAdminResponse = await getReq("api/v1/user/getSuperAdmin", accessToken);
        // if (superAdminResponse.success) {
        //   // console.log("Super Admin Data:", superAdminResponse.data);
        //   setSuperAdminData(superAdminResponse.data);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    allInfo();
  }, [accessToken]);
  

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
      <div className={`${showProfile?"sticky p-8 top-4 md:absolute md:left-9 md:top-10 md:p-0":"absolute left-10 top-10 mr-4"} z-10 `}>
        <button
          onClick={toggleProfile}
          className="bg-slate-200 p-2 rounded lsx:hidden"
          aria-label="Toggle profile"
        >
          {showProfile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[95vh] lg:p-6 space-y-6 duration-300 ${showProfile ? "lg:w-[calc(100% - 320px)] lg:ml-[330px]" : "lg:w-full lg:ml-0"} bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}>
        
        <div className="bg-[url('/src/assets/mdash.svg')] bg-cover bg-center h-60 rounded-lg flex items-center justify-center p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
          <h2 className="mb-4 text-center text-xl text-[#437F9E] sm:text-[4.2rem] text-[2.5rem] font-semibold">
            MODERATOR
          </h2>
        </div>
        <div className="bg-[url('/src/assets/vector_main.svg')] h-52 flex flex-col justify-center bg-cover bg-center w-full rounded-lg bg-white p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
          <h2 className="mb-4 text-center text-xl font-semibold">
            Click Here to View All Data and Submissions
          </h2>
          <div className="flex justify-center">
            <button 
            onClick={()=>{
              navigate('/moderator/viewdata')
            }}
            className="rounded-md bg-blue-500 px-4 sm:px-6 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              View Data
            </button>
          </div>
        </div>

        
        {/* Account - details Section */}
        <div className="rounded-lg bg-white p-6 shadow-md flex-grow flex  lg:gap-0 flex-col h-[620px] lg:h-[420px] md:h-[430px]">
          <div className="flex justify-between flex-col lg:flex-row md:flex-row">
            <h2 className="mb-4 text-xl font-semibold text-[#03A8FD] text-[30.2px] ">Request Approval</h2>
            <button className="text-white bg-[#03A8FD] rounded-lg py-2 w-full lg:w-[250px] md:w-[250px] font-[500]"
              onClick={()=>{navigate("/moderator/pendingrequests")}}
            >View all pending requests</button>
          </div>
          <div className="flex gap-10 flex-row overflow-hidden py-10 px-2 lg:pl-2 md:pl-2 flex-wrap ">
            {pendingData&&pendingData.map((data)=><FacultyCard key={data.id} data={data} onStatusChange={handleStatusChange} />)}
          </div>
        </div>

        <Sidebar showProfile={showProfile} />
      </div>
    </div>
  );
}
