import { useState, useEffect, useRef } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { useGetReq, usePutReq } from "../../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/ModeratorSidebar";
import { FacultyCard } from "../FacultyCard/FacultyCard";
import MemberCard from "../../MemberCard/MemberCard";
import SchemaCardsPopup from "../../../utils/Popup/FormPopUp/SchemaCardsPopup";
import { FcGraduationCap } from "react-icons/fc";

export default function ModeratorDashboard() {
  const [formCount, setFormCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [superAdminData, setSuperAdminData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState(["", ""]);

  const [getReq] = useGetReq();
  const [putReq] = usePutReq();
  const navigate = useNavigate();
  const [showDate, setShowDate] = useState(false);
  const [timeLine, setTimeline] = useState([]);

  const [facultyData, setFacultyData] = useState([]);
  const [error, setError] = useState(null);

  const toggleProfile = () => setShowProfile((prev) => !prev);

  // const access = sessionStorage.getItem("user");

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
  const department = [
    "CSE",
    "CSE (AI & ML) ",
    "CSE (IOT)",
    "ECE",
    "MCA",
    "BCA",
    "CSIT",
    "BE",
  ];
  // useEffect(() => {
  //   const allInfo = async () => {
  //     try {
  //       // Fetch publication counts
  //       const response = await getReq(
  //         "api/v1/document/getAllPublications",
  //         accessToken
  //       );
  //       if (response.success) {
  //         setFormCount(response.data.pendingCount);
  //         console.log("Publication Count Response:", response);
  //       }

  //       // Fetch super admin data
  //       const superAdminResponse = await getReq(
  //         "api/v1/superAdmin/getSuperAdmin",
  //         accessToken
  //       );
  //       if (superAdminResponse.success) {
  //         console.log("Super Admin Data:", superAdminResponse.data);
  //         setSuperAdminData(superAdminResponse.data);
  //       }

  //       // fetch start and end date
  //       const dates = await getReq('api/v1/timeline/getSetTimeline', accessToken);
  //       if (dates.success) {
  //         setTimeline(dates.data);
  //         setDateRange([dates.data.setTimeLineStartDate, dates.data.setTimeLineEndDate]);
  //         console.log("Dates",dates.data);
  //       }

  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   allInfo();
  // }, [accessToken]);

  // const handleSubmit = async (formData) => {
  //   try {
  //     const dataToUpdate = {
  //       name: formData.name,
  //       address: formData.address,
  //       phone: formData.phone,
  //       email: formData.email,
  //     };
  //     const data = await putReq(
  //       "api/v1/superAdmin/editSuperAdmin",
  //       dataToUpdate,
  //       accessToken.token
  //     );
  //     console.log(data);
  //     setSuperAdminData(data.data);
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //   }
  // };


  // const getCSEfacultyList = async () =>{
  //   try{
  //     console.log("getCSEfacultyList api data");
  //     navigate("cse-faculty");
  //   }catch(error){
  //     console.log("CSE Faculty errors :",  error);

  //   }
  // }

  // Function to fetch faculty data
  const getFacultyList = async (endpoint) => {
    // setLoading(true);
    // setError(null);
    // try {
    //   const response = await fetch(endpoint);
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch data');
    //   }
    //   const data = await response.json();
    //   setFacultyData(data);
    // } catch (err) {
    //   setError('Error fetching faculty data. Please try again.');
    //   // console.error('Error:', err);
    // } finally {
    //   setLoading(false);
    // }
    navigate(endpoint);
  };

  // Handler functions for each department
  const getCSEfacultyList = () => getFacultyList("/cse-facultylist");
  const getESEfacultyList = () => getFacultyList("/api/ese-faculty");
  const getMCAfacultyList = () => getFacultyList("/api/mca-faculty");
  const getCSITfacultyList = () => getFacultyList("/api/csit-faculty");

  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className={`${
          showProfile
            ? "sticky p-8 top-4 lg:absolute lg:left-9 lg:top-10 lg:p-0"
            : "absolute left-10 top-10 mr-4"
        } z-10 `}
      >
        <button
          onClick={toggleProfile}
          className="bg-slate-200 p-2 rounded lsx:hidden"
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
        className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[95vh] lg:p-6 space-y-6 duration-300 ${
          showProfile
            ? "lg:w-[calc(100% - 320px)] lg:ml-[330px]"
            : "lg:w-full lg:ml-0"
        } bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}
      >
        <div className="bg-[url('/src/assets/mdash.svg')] bg-cover bg-center h-60 rounded-lg flex items-center justify-center p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
          <h2 className="mb-4 text-center text-xl text-[#437F9E] sm:text-[4.2rem] text-[2.5rem] font-semibold">
            MODERATOR
          </h2>
        </div>

        {/* View all data and submissions */}
        {/* <div className="bg-[url('/src/assets/vector_main.svg')] h-52 flex flex-col justify-center bg-cover bg-center w-full rounded-lg bg-white p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
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
        </div> */}

        {/* Account - details Section */}
        {/* <div className="rounded-lg bg-white p-6 shadow-md flex-grow flex  lg:gap-0 flex-col h-[620px] lg:h-[420px] md:h-[430px]">
          <div className="flex justify-between flex-col lg:flex-row md:flex-row">
            <h2 className="mb-4 text-xl font-semibold text-[#03A8FD] text-[30.2px] ">Request Approval</h2>
            <button className="text-white bg-[#03A8FD] rounded-lg py-2 w-full lg:w-[250px] md:w-[250px] font-[500]"
              onClick={()=>{navigate("/moderator/pendingrequests")}}
            >View all pending requests</button>
          </div>
          <div className="flex gap-10 flex-row overflow-hidden py-10 px-2 lg:pl-2 md:pl-2 flex-wrap ">
            {pendingData&&pendingData.map((data)=><FacultyCard key={data.id} setClickAccept={setClickAccept} clickAccept={clickAccept} setLoading={setLoading} data={data} />)}
          </div>
        </div> */}

        {/* Department Cards */}
        {/* <div className="rounded-lg bg-white p-6 shadow-md flex-grow flex  lg:gap-0 flex-col ">
          <div className="flex gap-10 flex-row overflow-hidden py-10 px-2 lg:pl-2 md:pl-2 flex-wrap ">
            {departmentData.map((data)=>(
              <div className='w-[100%] sm:w-[20rem] p-7 rounded-xl shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md' style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3) ' }}
              onClick={()=>{handleAddUserClick();setCurrentDepartment(data)}}
              >
                <div className="font-semibold text-[25px] sm:text-[1.5rem] text-[#555555] cursor-default mb-2" >{data}</div>
                <div className="border b-[#BFBFBF] mt-4 mb-4"></div>
                <div className='w-full flex justify-center items-center py-2 bg-[#03A8FD] text-[#fff] font-[500] rounded-md mb-4'>View File</div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="bg-white w-[100%] h-full p-5 rounded-lg">
          <p className="text-[25px] font-semibold text-blue-500">Department</p>
          {/* <div className=" flex justify-between">
              <p className="text-[1.8rem] font-semibold text-[#03a8fd] font-poppins">
                Department
              </p>
              <div className="flex gap-4 w-auto font-poppins"> 
              <div className="bg-white w-[260px] rounded-lg border-[1.5px] relative ">
              <IoCalendar  className="absolute text-[#a0a0a0] top-3 left-2"/>
              </div>
              <p className="bg-[#03a8fd] w-auto flex justify-center items-center px-6 py-1  text-[20px] text-white rounded-lg cursor-pointer font-poppins"
              
              >
                Filter
              </p>
              </div>
            </div> */}

          {/* {department.map}
        <div className="w-1/3 h-1/4 flex justify-center items-center bg-blue-100">CSE</div> */}

          {/* All departments */}
          <div className="w-full p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {department.map((dept) => (
                <div
                  key={dept} // Use the department name as the key
                  onClick={
                    () => {
                      sessionStorage.setItem("dept", dept);
                      sessionStorage.setItem("role", 'moderator');
                      navigate(`/md/${dept.toLowerCase()}/facultylist`);
                    }
                    // getFacultyList(`/api/${dept.toLowerCase()}-faculty`)
                  }
                  className="h-[150px] relative group cursor-pointer rounded-lg bg-gradient-to-br from-[white] to-[#C1EAFFB2] p-4 shadow-sm hover:shadow-md transition-all duration-200 font-poppins font-semibold"
                >
                  <div className="flex justify-between">
                    <span className="text-lg pt-5 font-medium text-[#4E4D4D]">
                      {dept}
                    </span>
                    <FcGraduationCap className="w-1/2 h-32 text-[#03a8fd] opacity-25" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* {showPopup && (
        <SchemaCardsPopup setPopupShow={setShowPopup} setUtilFor={utilFor} department={currentDepartment} />
        )} */}
        <Sidebar showProfile={showProfile} />
      </div>
    </div>
  );
}

const departmentData = ["CSE", "ECE", "CSIT", "MCA"];
const department = [
  "CSE",
  "CSEAIML",
  "CSEIOT",
  "ECE",
  "MCA",
  "BCA",
  "CSIT",
  "BE",
];
