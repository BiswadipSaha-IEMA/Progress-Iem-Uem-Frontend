import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiX } from "react-icons/fi";
import ErrorLottie from "../../../Lottie/ErrorLottie";
import Lottie2 from "react-lottie";
import "./styles.css";
import DataTable from "react-data-table-component";
import Lottie from "react-lottie";
import { FaBookBookmark } from "react-icons/fa6";
import { CiFilter, CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import "../../../Components/StudentComp/customScrollbar.css";
import { usePostReq } from "../../../hooks/useHttp";
// import { useGetReq, usePutReq } from "../../hooks/useHttp";
import gsap from "gsap";

const ManagePopUp = ({ setPopupShow, setSave, setUtilFor, takeData }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [postReq] = usePostReq();

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust the regex for your phone number format
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [formData, setFormData] = useState({
    projectName: "",
    file: null,
    password: "",
    confirmPassword: "",
  });

  const [formDataAcc, setFormDataAcc] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataAcc((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Keep only numeric characters
      setFormDataAcc((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));

      // Validate phone number
      if (!validatePhone(numericValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "Phone number must be 10 digits long.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: "",
        }));
      }
    } else {
      setFormDataAcc((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "email") {
      if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }
  };

  useEffect(() => {
    console.log(takeData);
  });

  const [fileError, setFileError] = useState(null);
  const [selectedStream, setSelectedStream] = useState("");

  const isFormFilled = Object.values(formData).every(
    (value) => value !== "" && value !== null
  );

  // const handleStreamClick = (stream) => {
  //   setSelectedStream(stream);
  // };

  //for faculty form
  const [facultyData, setFacultyData] = useState({
    role: "Faculty",
    name: "",
    contact: "",
    email: "",
    college: "",
    department: [],
  });

  //for moderator form
  const [moderatorData, setModeratorData] = useState({
    role: "moderator",
    name: "",
    contact: "",
    email: "",
    college: "",
    department: [],
  });

  //for moderator form
  const handleModeratorInputChange = (e) => {
    const { name, value } = e.target;
    setModeratorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //for faculty form
  const handleFacultyInputChange = (e) => {
    const { name, value } = e.target;
    setFacultyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = [".pdf", ".docx", ".txt"];
    const fileExtension = file.name.slice(file.name.lastIndexOf("."));

    if (allowedFormats.includes(fileExtension)) {
      setFileError(null);
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    } else {
      setFileError("Invalid file format. Only .txt, .pdf, and .docx allowed.");
    }
  };

  //for moderator form
  const arrOfModeratorStreams = [];
  const handleModeratorStreamClick = (stream) => {
    // setSelectedStream((prev) => {
    // const updatedStreams = prev.includes(stream)
    //   ? prev.filter((s) => s !== stream)
    //   : [...prev, stream];

    // const newStreamString = updatedStreams.join(", ");
    // // console.log(newStreamString)
    // setStreamString(newStreamString);
    // setModeratorData((prevData) => ({
    //   ...prevData,
    //   department: newStreamString,
    // }));

    // return updatedStreams;

    // });
    setSelectedStream(stream);
    if (!arrOfModeratorStreams.includes(stream)) {
      arrOfModeratorStreams.push(stream);
      setModeratorData((prevData) => ({
        ...prevData,
        department: arrOfModeratorStreams,
      }));
    }

    console.log(arrOfStreams);
  };

  //for faculty form
  const arrOfFacultyStreams = [];
  const handleFacultyStreamClick = (stream) => {
    // setSelectedStream((prev) => {
    // const updatedStreams = prev.includes(stream)
    //   ? prev.filter((s) => s !== stream)
    //   : [...prev, stream];

    // const newStreamString = updatedStreams.join(", ");
    // // console.log(newStreamString)
    // setStreamString(newStreamString);
    // setModeratorData((prevData) => ({
    //   ...prevData,
    //   department: newStreamString,
    // }));

    // return updatedStreams;

    // });
    setSelectedStream(stream);
    if (!arrOfFacultyStreams.includes(stream)) {
      arrOfFacultyStreams.push(stream);
      setFacultyData((prevData) => ({
        ...prevData,
        department: arrOfFacultyStreams,
      }));
    }

    console.log(arrOfFacultyStreams);
  };

  // const handleStreamClick = (stream) => {
  //   setSelectedStream((prev) => {
  //     const updatedStreams = prev.includes(stream)
  //       ? prev.filter((s) => s !== stream)
  //       : [...prev, stream];
  //     return updatedStreams;
  //   });
  // };

  // useEffect(() => {
  //   setModeratorData((prevData) => ({
  //     ...prevData,
  //     department: ,
  //   }));
  // }, [selectedStream]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  console.log(accessToken);

  //for moderator form
  // const handleModeratorSubmit = async (e) => {
  //   e.preventDefault();

  //   // if (!isFormFilled) return alert("Please fill in all fields");

  //   setLoading(true);

  //   console.log(moderatorData)

  //   try {
  //     const response = await postReq("/api/v1/user/addUser",
  //       { ...moderatorData, contentAccess: "edit" },
  //       accessToken,
  //     );

  //     if (response.ok) {
  //       const result = await response.json();
  //       setLoading(false);
  //       console.log("Moderator Registered: ", result);
  //     } else {
  //       console.error("Error registering moderator: ", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Network error:", error);
  //   }
  // };

  //for moderator form
  const handleModeratorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await postReq(
        "api/v1/user/addUser",
        { ...moderatorData, contentAccess: "edit" },
        accessToken
      );

      // console.log(response);
      if (response.success) {
        setPopupShow(false);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  //for faculty form
  const handelFacultySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postReq(
        "api/v1/user/addUser",
        { ...facultyData, contentAccess: "read" },
        accessToken
      );

      console.log(response);
      if (response.success) {
        setPopupShow(false);
      }
    } catch (error) {
      console.log("NetworkError: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled && !fileError) {
      console.log("Form submitted:", formData);
      setFormSave(true);
    }
  };

  // const [fileError, setFileError] = useState(null);
  // const [selectedStreams, setSelectedStreams] = useState([]);

  // const isFormFilled = Object.values(formData).every(
  //   (value) => value !== "" && value !== null
  // );

  // const handleStreamClick = (stream) => {
  //   setSelectedStream((prev) => {
  //     const updatedStreams = prev.includes(stream)
  //       ? prev.filter((s) => s !== stream)
  //       : [...prev, stream];

  //     setStreamString(updatedStreams.join(", "));
  //     return updatedStreams;
  //   });
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const allowedFormats = [".pdf", ".docx", ".txt"];
  //   const fileExtension = file.name.slice(file.name.lastIndexOf("."));

  //   if (allowedFormats.includes(fileExtension)) {
  //     setFileError(null);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       file: file,
  //     }));
  //   } else {
  //     setFileError("Invalid file format. Only .txt, .pdf, and .docx allowed.");
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isFormFilled && !fileError) {
  //     console.log("Form submitted:", formData);
  //     setFormSave(true);
  //   }
  // };

  // const handleClosePopup = () => {
  //   setIsPopupVisible(false);
  // };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: ErrorLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // const [popupShow, setPopupShow] = useState(true);
  const [calendarShow, setCalendarShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => setSearchInput(e.target.value);

  // useEffect(() => {
  //   if (takeData[1]?.length > 0) {
  //     gsap.from(rowRefs.current, {
  //       x: -50,
  //       opacity: 0,
  //       scaleY: 0,
  //       duration: 1.5,
  //       stagger: 0.1,
  //       ease: "power3.out",
  //     });
  //   }
  // }, [takeData]);

  return (
    <>
      {setUtilFor === "form" ? (
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
          <div className="bg-white py-10 px-4 rounded-[14px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1000px] min-w-[300px]">
            <div
              className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
              onClick={() => {
                setConfirmationPopupShow(false);
              }}
            >
              <RxCross2 />
            </div>

            <div className="flex w-full justify-start text-[2rem] font-[700]">
              Add Your Project
            </div>

            <form
              className="flex w-full flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-8 py-4 rounded-lg font-[600] bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  placeholder="Enter Project Name..."
                />
              </div>

              <div className="flex flex-col">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  accept=".pdf, .docx, .txt"
                />
                {fileError && (
                  <p className="text-red-600 text-sm mt-2">{fileError}</p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  placeholder="Enter Password..."
                />
              </div>

              <div className="flex flex-col">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  placeholder="Confirm Password..."
                />
              </div>

              <button
                type="submit"
                className={`mt-4 py-4 px-8 text-[1.5rem] font-semibold text-white rounded-[8px] transition-all duration-300 ${
                  isFormFilled && !fileError
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormFilled || fileError}
              >
                Submit Paper
              </button>
            </form>
          </div>
        </div>
      ) : setUtilFor === "error" ? (
        <>
          <div className=" fixed top-0 left-0 h-[100vh] w-[100vw] z-[400] flex justify-center items-center bg-[#1414145e] backdrop-blur-md alertcontainer1">
            <div className="alertcontent1 bg-[#ffffff]  rounded-md flex flex-col justify-center items-center px-[12%] py-10 gap-1">
              <header className="text-[2rem] font-[700]">
                <Lottie2 options={defaultOptions} height={100} width={100} />
              </header>
              <main>
                <p className="text-[30px] font-[700] ">{takeData}</p>
              </main>
              <footer
                className="text-[20px] mt-10 font-[700] bg-blue-600 text-white px-4 py-2 rounded-md select-none cursor-pointer"
                onClick={() => {
                  setPopupShow(false);
                }}
              >
                Okay
              </footer>
            </div>
          </div>
        </>
      ) : setUtilFor === "Faculty" ? (
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl alertcontent">
            <div className="flex justify-between p-5">
              <h2 className="text-4xl mb-4 font-bold flex justify-center items-center">
                Faculty Registration
              </h2>
              <div
                className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
                onClick={() => setPopupShow(false)}
              >
                <RxCross2 className="text-white" />
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-2 p-5 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col gap-2">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={facultyData.name}
                  onChange={handleFacultyInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Phone No</p>
                <input
                  type="tel"
                  name="contact"
                  value={facultyData.contact}
                  onChange={handleFacultyInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Mobile Number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  value={facultyData.email}
                  onChange={handleFacultyInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Email Address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>University/Institute Name</p>
                <input
                  type="name"
                  name="college"
                  value={facultyData.college}
                  onChange={handleFacultyInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="University Name"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p>Stream</p>
                <div className="flex gap-4">
                  {["CSE", "CSIT", "BioTech"].map((stream) => (
                    <div
                      key={stream}
                      onClick={() => handleFacultyStreamClick(stream)}
                      className={`py-2 px-4 rounded-md cursor-pointer ${
                        selectedStream.includes(stream)
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-[#a6adb7]"
                      }`}
                    >
                      {stream}
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="mt-4">
            <p>Selected Streams: {streamString}</p> {/* Display selected streams 
          </div> */}

              <div className="flex flex-col justify-center items-center mt-5">
                <button
                  className="flex justify-center items-center py-2 bg-[#03A8FD] text-center w-[20%] text-white rounded-md font-semibold cursor-pointer"
                  onClick={handelFacultySubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : setUtilFor === "moderator" ? (
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl alertcontent">
            <div className="flex justify-between p-5">
              <h2 className="text-4xl mb-4 font-bold flex justify-center items-center">
                Moderator Registration
              </h2>
              <div
                className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
                onClick={() => setPopupShow(false)}
              >
                <RxCross2 className="text-white" />
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-2 p-5 max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col gap-2">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={moderatorData.name}
                  onChange={handleModeratorInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Phone No</p>
                <input
                  type="tel"
                  name="contact"
                  value={moderatorData.contact}
                  onChange={handleModeratorInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Mobile Number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  value={moderatorData.email}
                  onChange={handleModeratorInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Email Address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>University/Institute Name</p>
                <input
                  type="name"
                  name="college"
                  value={moderatorData.college}
                  onChange={handleModeratorInputChange}
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="University Name"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p>Stream</p>
                <div className="flex gap-4">
                  {["CSE", "CSIT", "BioTech"].map((stream) => (
                    <div
                      key={stream}
                      onClick={() => handleModeratorStreamClick(stream)}
                      className={`py-2 px-4 rounded-md cursor-pointer ${
                        selectedStream.includes(stream)
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-[#a6adb7]"
                      }`}
                    >
                      {stream}
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="mt-4">
            <p>Selected Streams: {streamString}</p> {/* Display selected streams 
          </div> */}

              <div className="flex flex-col justify-center items-center mt-5">
                <button
                  className="flex justify-center items-center py-2 bg-[#03A8FD] text-center w-[20%] text-white rounded-md font-semibold cursor-pointer"
                  onClick={handleModeratorSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : setUtilFor === "viewBPTable" ? (
        <>
          {/* <div className="flex bg-black bg-opacity-50 backdrop-blur-lg fixed justify-center items-center w-full h-full top-0 left-0 z-50">
  <div className="bg-white p-8 sm:p-12 rounded-2xl flex flex-col justify-center items-center gap-6 shadow-xl w-[90%] max-w-[900px]">
     */}
          <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
            <div className="bg-white py-10 px-4 rounded-[0px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1000px] min-w-[300px] h-full lg:h-[600px] md:h-[600px] lg:rounded-[14px] md:rounded-[14px]">
              {/* Close Button */}
              <div
                className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
                onClick={() => setPopupShow(false)}
              >
                <RxCross2 className="text-white" />
              </div>

              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6 mt-10">
                <div className="flex items-center gap-3">
                  <FaBookBookmark className="text-3xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Books Published
                  </h2>
                </div>

                {/* Search Field */}
                <div className="relative w-full sm:w-1/2">
                  <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search with Name or ISS..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="w-full pl-12 py-2 rounded-lg border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                  />
                </div>
              </div>

              {/* Filter & Sort Section */}
              <div className="flex gap-4 mt-6 w-full overflow-x-auto">
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <CiFilter className="text-lg" />
                  <span>Filter</span>
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <GoSortDesc className="text-lg" />
                  <span>Sort: Chronological</span>
                </button>
                <button
                  className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150"
                  onClick={() => setCalendarShow(!calendarShow)}
                >
                  <span>Current Month</span>
                </button>
              </div>

              {/* Calendar Overlay */}
              {calendarShow && (
                <div
                  id="calendar-overlay"
                  className="fixed top-[150px] flex justify-center items-center left-0 z-50 w-full h-full bg-black bg-opacity-25"
                  onClick={() => setCalendarShow(false)}
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center text-lg font-semibold">
                      Calendar Component
                    </div>
                  </div>
                </div>
              )}

              {/* DataTable Section */}
              <div className="w-full h-[300px] overflow-x-auto mt-6 bg-gray-100 rounded-lg p-4 shadow-inner">
                {takeData[0].length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Lottie options={defaultOptions} height={200} width={200} />
                    <p className="text-2xl font-bold text-blue-500 mt-4">
                      No Files Submitted
                    </p>
                  </div>
                ) : (
                  <DataTable
                    columns={takeData[0]}
                    data={takeData[1].map((row, i) => ({
                      ...row,
                      ref: (el) => (rowRefs.current[i] = el),
                    }))}
                    defaultSortField="serial"
                    defaultSortAsc={true}
                    customStyles={{
                      headCells: {
                        style: {
                          backgroundColor: "#e0f7ff",
                          color: "#333",
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      },
                      headRow: {
                        style: {
                          backgroundColor: "#e0f7ff",
                        },
                      },
                      cells: {
                        style: {
                          backgroundColor: "#fff",
                          color: "#333",
                          textAlign: "center",
                          fontSize: "14px",
                        },
                      },
                    }}
                    className=""
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : setUtilFor === "accountDetails" ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white rounded-lg p-6 shadow-lg w-[50rem]">
              <h2 className="text-lg font-bold mb-4">
                Enter your Account Details
              </h2>
              <form onSubmit={takeData}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formDataAcc.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="Address"
                    name="address"
                    value={formDataAcc.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone No.:
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formDataAcc.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="date"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formDataAcc.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  />
                </div>
                {/* <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="date"
            >
              Enter your file:
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div> */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="mr-2 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                    onClick={() => {
                      console.log(formDataAcc);
                      takeData(formDataAcc);
                    }}
                  >
                    Apply Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPopupShow(false);
                    }}
                    className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : setUtilFor === "viewRATable" ? (
        <>
          {/* <div className="flex bg-black bg-opacity-50 backdrop-blur-lg fixed justify-center items-center w-full h-full top-0 left-0 z-50">
  <div className="bg-white p-8 sm:p-12 rounded-2xl flex flex-col justify-center items-center gap-6 shadow-xl w-[90%] max-w-[900px]">
     */}
          <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
            <div className="bg-white py-10 px-4 rounded-[0px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1000px] min-w-[300px] h-full lg:h-[600px] md:h-[600px] lg:rounded-[14px] md:rounded-[14px]">
              {/* Close Button */}
              <div
                className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
                onClick={() => setPopupShow(false)}
              >
                <RxCross2 className="text-white" />
              </div>

              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6 mt-10">
                <div className="flex items-center gap-3">
                  <FaBookBookmark className="text-3xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Books Published
                  </h2>
                </div>

                {/* Search Field */}
                <div className="relative w-full sm:w-1/2">
                  <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search with Name or ISS..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="w-full pl-12 py-2 rounded-lg border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                  />
                </div>
              </div>

              {/* Filter & Sort Section */}
              <div className="flex gap-4 mt-6 w-full overflow-x-auto">
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <CiFilter className="text-lg" />
                  <span>Filter</span>
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <GoSortDesc className="text-lg" />
                  <span>Sort: Chronological</span>
                </button>
                <button
                  className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150"
                  onClick={() => setCalendarShow(!calendarShow)}
                >
                  <span>Current Month</span>
                </button>
              </div>

              {/* Calendar Overlay */}
              {calendarShow && (
                <div
                  id="calendar-overlay"
                  className="fixed top-[150px] flex justify-center items-center left-0 z-50 w-full h-full bg-black bg-opacity-25"
                  onClick={() => setCalendarShow(false)}
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center text-lg font-semibold">
                      Calendar Component
                    </div>
                  </div>
                </div>
              )}

              {/* DataTable Section */}
              <div className="w-full h-[300px] overflow-x-auto mt-6 bg-gray-100 rounded-lg p-4 shadow-inner">
                {takeData[0].length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Lottie options={defaultOptions} height={200} width={200} />
                    <p className="text-2xl font-bold text-blue-500 mt-4">
                      No Files Submitted
                    </p>
                  </div>
                ) : (
                  <DataTable
                    columns={takeData[0]}
                    data={takeData[1].map((row, i) => ({
                      ...row,
                      ref: (el) => (rowRefs.current[i] = el),
                    }))}
                    defaultSortField="serial"
                    defaultSortAsc={true}
                    customStyles={{
                      headCells: {
                        style: {
                          backgroundColor: "#e0f7ff",
                          color: "#333",
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      },
                      headRow: {
                        style: {
                          backgroundColor: "#e0f7ff",
                        },
                      },
                      cells: {
                        style: {
                          backgroundColor: "#fff",
                          color: "#333",
                          textAlign: "center",
                          fontSize: "14px",
                        },
                      },
                    }}
                    className=""
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : setUtilFor === "viewRBTable" ? (
        <>
          {/* <div className="flex bg-black bg-opacity-50 backdrop-blur-lg fixed justify-center items-center w-full h-full top-0 left-0 z-50">
  <div className="bg-white p-8 sm:p-12 rounded-2xl flex flex-col justify-center items-center gap-6 shadow-xl w-[90%] max-w-[900px]">
     */}
          <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
            <div className="bg-white py-10 px-4 rounded-[0px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1000px] min-w-[300px] h-full lg:h-[600px] md:h-[600px] lg:rounded-[14px] md:rounded-[14px]">
              {/* Close Button */}
              <div
                className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
                onClick={() => setPopupShow(false)}
              >
                <RxCross2 className="text-white" />
              </div>

              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6 mt-10">
                <div className="flex items-center gap-3">
                  <FaBookBookmark className="text-3xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Books Published
                  </h2>
                </div>

                {/* Search Field */}
                <div className="relative w-full sm:w-1/2">
                  <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search with Name or ISS..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="w-full pl-12 py-2 rounded-lg border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                  />
                </div>
              </div>

              {/* Filter & Sort Section */}
              <div className="flex gap-4 mt-6 w-full overflow-x-auto">
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <CiFilter className="text-lg" />
                  <span>Filter</span>
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <GoSortDesc className="text-lg" />
                  <span>Sort: Chronological</span>
                </button>
                <button
                  className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150"
                  onClick={() => setCalendarShow(!calendarShow)}
                >
                  <span>Current Month</span>
                </button>
              </div>

              {/* Calendar Overlay */}
              {calendarShow && (
                <div
                  id="calendar-overlay"
                  className="fixed top-[150px] flex justify-center items-center left-0 z-50 w-full h-full bg-black bg-opacity-25"
                  onClick={() => setCalendarShow(false)}
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center text-lg font-semibold">
                      Calendar Component
                    </div>
                  </div>
                </div>
              )}

              {/* DataTable Section */}
              <div className="w-full h-[300px] overflow-x-auto mt-6 bg-gray-100 rounded-lg p-4 shadow-inner">
                {takeData[0].length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Lottie options={defaultOptions} height={200} width={200} />
                    <p className="text-2xl font-bold text-blue-500 mt-4">
                      No Files Submitted
                    </p>
                  </div>
                ) : (
                  <DataTable
                    columns={takeData[0]}
                    data={takeData[1].map((row, i) => ({
                      ...row,
                      ref: (el) => (rowRefs.current[i] = el),
                    }))}
                    defaultSortField="serial"
                    defaultSortAsc={true}
                    customStyles={{
                      headCells: {
                        style: {
                          backgroundColor: "#e0f7ff",
                          color: "#333",
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      },
                      headRow: {
                        style: {
                          backgroundColor: "#e0f7ff",
                        },
                      },
                      cells: {
                        style: {
                          backgroundColor: "#fff",
                          color: "#333",
                          textAlign: "center",
                          fontSize: "14px",
                        },
                      },
                    }}
                    className=""
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : setUtilFor === "viewRCTable" ? (
        <>
          {/* <div className="flex bg-black bg-opacity-50 backdrop-blur-lg fixed justify-center items-center w-full h-full top-0 left-0 z-50">
  <div className="bg-white p-8 sm:p-12 rounded-2xl flex flex-col justify-center items-center gap-6 shadow-xl w-[90%] max-w-[900px]">
     */}
          <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
            <div className="bg-white py-10 px-4 rounded-[0px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1500px] min-w-[300px] h-full lg:h-[600px] md:h-[600px] lg:rounded-[14px] md:rounded-[14px]">
              {/* Close Button */}
              <div
                className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
                onClick={() => setPopupShow(false)}
              >
                <RxCross2 className="text-white" />
              </div>

              {/* Header Section */}
              <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6 mt-10">
                <div className="flex items-center gap-3">
                  <FaBookBookmark className="text-3xl text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Books Published
                  </h2>
                </div>

                {/* Search Field */}
                <div className="relative w-full sm:w-1/2">
                  <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search with Name or ISS..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="w-full pl-12 py-2 rounded-lg border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                  />
                </div>
              </div>

              {/* Filter & Sort Section */}
              <div className="flex gap-4 mt-6 w-full overflow-x-auto">
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <CiFilter className="text-lg" />
                  <span>Filter</span>
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150">
                  <GoSortDesc className="text-lg" />
                  <span>Sort: Chronological</span>
                </button>
                <button
                  className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 transition duration-150"
                  onClick={() => setCalendarShow(!calendarShow)}
                >
                  <span>Current Month</span>
                </button>
              </div>

              {/* Calendar Overlay */}
              {calendarShow && (
                <div
                  id="calendar-overlay"
                  className="fixed top-[150px] flex justify-center items-center left-0 z-50 w-full h-full bg-black bg-opacity-25"
                  onClick={() => setCalendarShow(false)}
                >
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="text-center text-lg font-semibold">
                      Calendar Component
                    </div>
                  </div>
                </div>
              )}

              {/* DataTable Section */}
              <div className="w-full h-[300px] overflow-x-auto mt-6 bg-gray-100 rounded-lg p-4 shadow-inner">
                {takeData[0].length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Lottie options={defaultOptions} height={200} width={200} />
                    <p className="text-2xl font-bold text-blue-500 mt-4">
                      No Files Submitted
                    </p>
                  </div>
                ) : (
                  <DataTable
                    columns={takeData[0]}
                    data={takeData[1].map((row, i) => ({
                      ...row,
                      ref: (el) => (rowRefs.current[i] = el),
                    }))}
                    defaultSortField="serial"
                    defaultSortAsc={true}
                    customStyles={{
                      headCells: {
                        style: {
                          backgroundColor: "#e0f7ff",
                          color: "#333",
                          fontWeight: "bold",
                          textAlign: "center",
                        },
                      },
                      headRow: {
                        style: {
                          backgroundColor: "#e0f7ff",
                        },
                      },
                      cells: {
                        style: {
                          backgroundColor: "#fff",
                          color: "#333",
                          textAlign: "center",
                          fontSize: "14px",
                        },
                      },
                    }}
                    className=""
                  />
                )}
              </div>
            </div>
          </div>
        </>
      ) : 
        <></>
      }
    </>
  );
};

export default ManagePopUp;
