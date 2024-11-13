import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FcGraduationCap } from "react-icons/fc";
import { useGetReq, usePutReq } from "../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import FacultyList from "../AddFaculty/FacultyList";
// import TimerPopUp from "../../utils/Popup/FormPopUp/TimerPopUp";
import { FaCalendar } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import SetDatePopup from "../../utils/SetDatePopup";
import TimerPopUp from "../../utils/Popup/FormPopUp/TimerPopUp";
import { useLocation } from "react-router-dom";

export default function SuperAdminDashboardComp() {
  const [formCount, setFormCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [superAdminData, setSuperAdminData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState(['', '']);
  const [timerPopUp, setTimerPopUp]= useState(false)
  const [filterTimeLineStartDate, setFilterTimeLineStartDate] = useState('')
  const [filterTimeLineEndDate, setFilterTimeLineEndDate] = useState('')
  const [getReq] = useGetReq();
  const [putReq] = usePutReq();
  const navigate = useNavigate();
  const [showDate,setShowDate]= useState(false);
  const [timeLine, setTimeline] = useState([]);

  const [facultyData, setFacultyData] = useState([]);
  const [error, setError] = useState(null);

  const toggleProfile = () => setShowProfile((prev) => !prev);

  const access = sessionStorage.getItem("user");
  const location = useLocation();

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

        const filterTimeLine= await getReq('api/v1/timeline/getFetchTimeline', accessToken)
        if(filterTimeLine.success){
          console.log(filterTimeLine)
          setFilterTimeLineStartDate(filterTimeLine.data.fetchTimelineStartDate)
          setFilterTimeLineEndDate(filterTimeLine.data.fetchTimelineEndDate)
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
      <div className="absolute z-10 p-2 mr-4 top-4 left-4">
        <button
          onClick={toggleProfile}
          className="absolute p-2 rounded bg-slate-200 lsx:hidden"
          aria-label="Toggle profile"
        >
          {showProfile ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
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
          <div className="flex justify-center text-[30px] sm:text-[44px] font-semibold text-[#437F9E] font-poppins">
            SUPERADMIN
          </div>
        </div>

        {/* <div className="bg-[url('/src/assets/vector_main.svg')] relative bg-cover bg-center w-full rounded-2xl bg-white p-6 sm:p-10 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
        <div className="absolute top-[-10px] right-[-10px] flex flex-col items-center bg-blue-600 shadow-lg px-3 py-1 rounded-md">
              <p className="text-xl text-white font-[500]">{formCount}</p>
            </div>
          <h2 className="mb-4 text-xl font-semibold text-center">
            Click Here to View All Data and Submissions
          </h2>
          <div className="flex justify-center">
            <button 
            onClick={()=>{
              navigate('/viewdata')
            }}
            className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md sm:px-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              View Data
            </button>
          </div>
        </div> */}

        {/* Moderator, Counts, and Faculty section */}
        <div className="flex flex-col h-full gap-4 md:flex-row">

          {/* left side part */}
          <div className=" flex flex-col gap-5  lg:w-[30%]">
            {/* set date section */}
            <div className="flex gap-2">
              <div className="bg-white w-[100%] rounded-[15px] border-[1.5px] relative">
                <div className="
                text-[#a0a0a0] p-2 flex  items-center gap-2 font-poppins">
                <IoCalendar />
                <p className="text-[15px] md:text-lg">{dateRange[0] ? `${dateRange[0]} - ${dateRange[1]}` : 'Select a date range'}</p>
                </div>
              </div>

              <div className="bg-[#03A8FD] w-[50%] flex justify-center text-[17px] md:text-[20px] text-white rounded-[15px] cursor-pointer items-center font-poppins"
              onClick={()=>{
                setShowDate(true);
              }}
              >
                Set Date
              </div>
            </div>
            <div className="flex-1 p-6 sm:p-8 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
              <div className="flex flex-col items-center space-x-4 sm:flex-row lg:flex-row">
                <div
                  className="bg-[url('/src/assets/moderator.svg')] bg-cover bg-center h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="flex flex-col items-start">
                  <button
                    className="rounded-md bg-[#03a8fd] font-poppins px-6 sm:px-8 py-3 text-lg text-white transition-colors hover:bg-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => navigate("/addmoderator")}
                  >
                    Moderator
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6 sm:p-8 bg-[url('/src/assets/vector_main.svg')] bg-cover bg-center flex items-center justify-center rounded-2xl bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">
              <div className="flex flex-col items-center space-x-4 sm:flex-row lg:flex-row">
                <div
                  className="bg-[url('/src/assets/faculty.svg')] bg-cover bg-center h-32 w-32 sm:h-40 sm:w-40 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="flex flex-col items-start">
                  <button
                    className="rounded-md bg-[#03a8fd] px-6 sm:px-8 py-3 text-lg text-white transition-colors hover:bg-[#37AFE1] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-poppins"
                    onClick={() => navigate("/addfaculty")}
                  >
                    Faculty
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* right side div -> contain all department */}
          <div className="bg-white lg:w-[70%] h-full p-5 rounded-lg">
            <div className="flex flex-col justify-between gap-2 sm:pl-6 md:pl-0 md:gap-0 sm:flex-row ">
              <p className="text-[1.5rem] sm:text-[1.6rem] md:text-[1.8rem] font-semibold text-[#03a8fd] font-poppins">
                Department
              </p>
              <div className="flex w-auto gap-3 md:gap-4 font-poppins"> 
              <div className="bg-white flex py-2.5 pl-8 w-[260px] rounded-lg border-[1.5px] relative text-[#a0a0a0]">
              <IoCalendar  className="absolute text-[#a0a0a0] top-3 left-2"/>
              <div className="lg:pl-2 lg:pr-2">
                {filterTimeLineStartDate}
              </div>
              -
              <div className="lg:pl-2">
                {filterTimeLineEndDate}
              </div>
              </div>
              <div className="bg-[#03a8fd] w-auto flex justify-center items-center px-4 md:px-6 py-1  text-[18px] md:text-[20px] text-white rounded-lg cursor-pointer font-poppins"
              onClick={() =>{
                setTimerPopUp(true)
              }}
              >
                Filter
              </div>
              </div>
            </div>

            {/* {department.map}
        <div className="flex items-center justify-center w-1/3 bg-blue-100 h-1/4">CSE</div> */}

            {/* All departments */}
            <div className="w-full p-6"> 
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {department.map((dept) => (
                <div
                  key={dept} // Use the department name as the key
                  onClick={() =>

                    {
                      sessionStorage.setItem('dept', dept)
                      navigate(`/${dept.toLowerCase()}/facultylist`)}
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
        </div>

        {/* Account - details Section */}
        {/* <div className="flex-grow p-6 bg-white shadow-md rounded-2xl">
        <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-cyan-500">Pending Requests</h2>
            <button className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600">
              View all pending requests
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="p-8 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <p><span className="text-lg font-semibold">Akash Kundu</span></p>
                  <span className="px-2 text-sm text-red-500 bg-orange-200 rounded">..Pending</span>
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
            className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer"
          >
            CSE
          </div>
          <div
            onClick={getESEfacultyList}
            className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer"
          >
            ESE
          </div>
          <div
            onClick={getMCAfacultyList}
            className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer"
          >
            MCA
          </div>
          <div
            onClick={getCSITfacultyList}
            className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer"
          >
            CSIT
          </div>
        </div> */}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mt-8">
            <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && <div className="mt-8 text-center text-red-500">{error}</div>}

        {/* // if loading = false & error false then call FacultyList */}

        {/* {!loading && !error && <FacultyList facultyData={facultyData} />} */}

        <Sidebar showProfile={showProfile} />
      </div>
      {
        showDate && <SetDatePopup setShowPopup={setShowDate} setDateRange={setDateRange}/>
      }
      {
        timerPopUp && <TimerPopUp setShowPopup={setTimerPopUp}/>
      }
    </div>
  );
}

{/* <div className="w-full p-6">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    {department.map((dept) => (
      <div
        key={dept}
        onClick={() => getFacultyList(`/api/${dept.toLowerCase()}-faculty`)}
        className="relative p-4 transition-all duration-200 rounded-lg shadow-sm cursor-pointer group bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">{dept}</span>
          <GraduationCap className="w-5 h-5 text-blue-400" />
        </div>
      </div>
    ))}
  </div>
</div>; */}
