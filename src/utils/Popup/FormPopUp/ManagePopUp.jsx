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
import gsap from "gsap";

const ManagePopUp = ({ setPopupShow, setSave, setUtilFor, takeData }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    file: null,
    password: "",
    confirmPassword: "",
  });

  const [fileError, setFileError] = useState(null);
  const [selectedStream, setSelectedStream] = useState("");
  const rowRefs = useRef([]); // Array of refs for table rows

  const isFormFilled = Object.values(formData).every(
    (value) => value !== "" && value !== null
  );

  const handleStreamClick = (stream) => {
    setSelectedStream(stream);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled && !fileError) {
      console.log("Form submitted:", formData);
      setFormSave(true);
    }
  };

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

  // Function to handle search input
  const handleSearch = (e) => setSearchInput(e.target.value);

  useEffect(() => {
    if (takeData[1]?.length > 0) {
      gsap.from(rowRefs.current, {
        x: -50,
        opacity: 0,
        scaleY: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power3.out",
      });
    }
  }, [takeData]);

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
      ) : setUtilFor === "modarator" ? (
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl alertcontent">
            <div className="flex justify-between p-5">
              <h2 className="text-4xl mb-4 font-bold flex justify-center items-center">
                User Registration
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
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Phone No</p>
                <input
                  type="tel"
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Mobile Number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Email Address</p>
                <input
                  type="email"
                  className="bg-[#F0F0F0] h-8 w-full rounded-md p-6 focus:outline-none"
                  placeholder="Your Email Address"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p>Stream</p>
                <div className="flex gap-4">
                  {["CSE", "CSIT", "BioTech"].map((stream) => (
                    <div
                      key={stream}
                      onClick={() => handleStreamClick(stream)}
                      className={`py-2 px-4 rounded-md cursor-pointer ${
                        selectedStream === stream
                          ? "bg-black text-white"
                          : "bg-[#F0F0F0] text-[#a6adb7]"
                      }`}
                    >
                      {stream}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mt-5">
                <button className="flex justify-center items-center py-2 bg-[#03A8FD] text-center w-[20%] text-white rounded-md font-semibold cursor-pointer">
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
      ) : (
        <></>
      )}
    </>
  );
};

export default ManagePopUp;
