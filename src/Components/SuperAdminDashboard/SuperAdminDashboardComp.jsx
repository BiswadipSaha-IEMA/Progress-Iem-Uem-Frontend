import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { useGetReq, usePutReq } from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import FacultyList from "../AddFaculty/FacultyList";
// import TimerPopUp from "../../utils/Popup/FormPopUp/TimerPopUp";
import { FaCalendar } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import SetDatePopup from "../../utils/SetDatePopup";

export default function SuperAdminDashboardComp() {
  const [formCount, setFormCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [superAdminData, setSuperAdminData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState(['', '']);

  const [getReq] = useGetReq();
  const [putReq] = usePutReq();
  const navigate = useNavigate();
  const [showDate,setShowDate]= useState(false);
  const [timeLine, setTimeline] = useState([]);

  const [facultyData, setFacultyData] = useState([]);
  const [error, setError] = useState(null);

  const toggleProfile = () => setShowProfile((prev) => !prev);

  const access = sessionStorage.getItem("user");

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
  const department = ["CSE","CSE (AI & ML) ", "CSE (IOT)" ,"ECE", "MCA", "BCA", "CSIT", "BE"];
  useEffect(() => {
    const allInfo = async () => {
      try {
        // Fetch publication counts
        const response = await getReq(
          "api/v1/document/getAllPublications",
          accessToken
        );
        if (response.success) {
          setFormCount(response.data.pendingCount);
          console.log("Publication Count Response:", response);
        }

        // Fetch super admin data
        const superAdminResponse = await getReq(
          "api/v1/superAdmin/getSuperAdmin",
          accessToken
        );
        if (superAdminResponse.success) {
          console.log("Super Admin Data:", superAdminResponse.data);
          setSuperAdminData(superAdminResponse.data);
        }

        // fetch start and end date
        const dates = await getReq('api/v1/timeline/getSetTimeline', accessToken);
        if (dates.success) {
          setTimeline(dates.data);
          setDateRange([dates.data.setTimeLineStartDate, dates.data.setTimeLineEndDate]);
          console.log("Dates",dates.data);   
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
      const data = await putReq(
        "api/v1/superAdmin/editSuperAdmin",
        dataToUpdate,
        accessToken.token
      );
      console.log(data);
      setSuperAdminData(data.data);
    } catch (error) {
      console.error("Error updating data:", error);
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
      <div className="absolute top-4 left-4 z-10 p-2 mr-4">
        <button
          onClick={toggleProfile}
          className="bg-slate-200 p-2 rounded absolute lsx:hidden"
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
        <div className="bg-[url('/src/assets/superadmin.svg')] relative bg-cover bg-center w-full rounded-2xl bg-white p-4 sm:p-8 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
          <div className="flex justify-center text-[30px] sm:text-[44px] font-semibold text-[#437F9E]">
            SUPERADMIN
          </div>
        </div>

        {/* <div className="bg-[url('/src/assets/vector_main.svg')] relative bg-cover bg-center w-full rounded-2xl bg-white p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
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
        </div> */}

        {/* Moderator, Counts, and Faculty section */}
        <div className="h-full flex flex-col sm:flex-row gap-4">
          <div className=" flex flex-col gap-5 w-[30%]">
            {/* set date section */}
            <div className="flex gap-2">
              <div className="bg-white w-[100%] rounded-[15px] border-[1.5px] relative">
                <div className="
                text-[#a0a0a0] p-2 flex  items-center gap-2">
                <IoCalendar />
                <p className="text-lg">{dateRange[0] ? `${dateRange[0]} - ${dateRange[1]}` : 'Select a date range'}</p>
                </div>
              </div>

              <div className="bg-[#03a8fd] w-[50%] flex justify-center p-1  text-[20px] text-white rounded-[15px] cursor-pointer"
              onClick={()=>{
                setShowDate(true);
              }}
              >
                Set Date
              </div>
            </div>
            <div className="flex-1 p-6 sm:p-8 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
              <div className="flex items-center space-x-4">
                <div
                  className="bg-[url('/src/assets/moderator.svg')] bg-cover bg-center h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0"
                  aria-hidden="true"
                />
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

            <div className="flex-1 p-6 sm:p-8 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
              <div className="flex items-center space-x-4">
                <div
                  className="bg-[url('/src/assets/faculty.svg')] bg-cover bg-center h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0"
                  aria-hidden="true"
                />
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

          {/* right side div -> contain all department */}
          <div className="bg-white w-[70%] h-full p-5 rounded-lg">
            <div className=" flex justify-between">
              <p className="text-[25px] font-semibold text-blue-500">
                Department
              </p>
              <div className="flex gap-4 w-auto"> 
              <div className="bg-white w-[260px] rounded-lg border-[1.5px] relative ">
              <IoCalendar  className="absolute text-[#a0a0a0] top-3 left-2"/>
              </div>
              <p className="bg-[#03a8fd] w-auto flex justify-center px-6 py-1  text-[20px] text-white rounded-lg cursor-pointer"
              
              >
                Filter
              </p>
              </div>
            </div>

            {/* {department.map}
        <div className="w-1/3 h-1/4 flex justify-center items-center bg-blue-100">CSE</div> */}

            {/* All departments */}
            <div className="w-full p-6"> 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {department.map((dept) => (
                <div
                  key={dept} // Use the department name as the key
                  onClick={() =>

                    {
                      sessionStorage.setItem('dept', dept)
                      navigate(`/${dept.toLowerCase()}/facultylist`)}
                    // getFacultyList(`/api/${dept.toLowerCase()}-faculty`)
                  }
                  className="h-[150px] relative group cursor-pointer rounded-lg bg-gradient-to-br from-white to-blue-100 p-4 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between">
                    <span className="text-lg pt-5 font-medium text-blue-900">
                      {dept}
                    </span>
                    <GraduationCap className="w-1/2 h-32 text-blue-400 opacity-25" />
                  </div>

                  
                </div>
              ))}
            </div>
            </div>
          </div>
        </div>

        {/* Account - details Section */}
        {/* <div className="rounded-2xl bg-white p-6 shadow-md flex-grow">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-cyan-500">Pending Requests</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              View all pending requests
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <p><span className="font-semibold text-lg">Akash Kundu</span></p>
                  <span className="text-red-500 bg-orange-200 rounded px-2 text-sm">..Pending</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">CSE</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Moderator</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Research Category</span>
                </div>
              </div>
            ))}
            </div>
        </div>   */}

        {/* All dept */}
        {/* <div className="flex justify-center gap-5 text-white">
          <div
            onClick={getCSEfacultyList}
            className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer"
          >
            CSE
          </div>
          <div
            onClick={getESEfacultyList}
            className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer"
          >
            ESE
          </div>
          <div
            onClick={getMCAfacultyList}
            className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer"
          >
            MCA
          </div>
          <div
            onClick={getCSITfacultyList}
            className="bg-blue-500 px-4 py-2 rounded-lg cursor-pointer"
          >
            CSIT
          </div>
        </div> */}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && <div className="text-red-500 text-center mt-8">{error}</div>}

        {/* // if loading = false & error false then call FacultyList */}

        {/* {!loading && !error && <FacultyList facultyData={facultyData} />} */}

        <Sidebar showProfile={showProfile} />
      </div>
      {
        showDate && <SetDatePopup setShowPopup={setShowDate} setDateRange={setDateRange}/>
      }
    </div>
  );
}

{/* <div className="w-full p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {department.map((dept) => (
      <div
        key={dept}
        onClick={() => getFacultyList(`/api/${dept.toLowerCase()}-faculty`)}
        className="relative group cursor-pointer rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">{dept}</span>
          <GraduationCap className="w-5 h-5 text-blue-400" />
        </div>
      </div>
    ))}
  </div>
</div>; */}
