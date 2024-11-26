import React, { useState, useEffect } from "react";
 import Pagination from "./Pagination"; // Assuming you have this component for pagination
import AcceptRejectButtons from './AcceptRejectButtons';  // Accept/Reject buttons component
import Accept from "./Status/Accept";
import Reject from "./Status/Reject";
import Pending from "./Status/Pending";
import { RxCross2 } from "react-icons/rx";
import './Styles.css'

const FacultyPopup = ({setShowPopup, data}) => {
  // 5 sets of data with document links for each faculty
  console.log('Faculty Pop Up Page',data)
  const facultyData = [
    {
      id: 1,
      name: `${data.name}`,
      profileUrl: `${data.proofOfDocument}`,
        // department : "CSE",
    },
     // "https://drive.google.com/file/d/1tmKJMOGOWoLv3ml-MsVlezSXtjpRk_i3/preview",
    {
      id: 2,
      name: `${data.name}`,
      profileUrl: `${data.proofOfDocument}`,
      // department : "ESE",
    },
    {
      id: 3,
      name: `${data.name}`,
      profileUrl: `${data.proofOfDocument}`,
      // department : "CSIT",
    },
    {
      id: 4,
      name: `${data.name}`,
      profileUrl: `${data.proofOfDocument}`,
      // department : "MCA",
    },
    {
      id: 5,
      name: `${data.name}`,
      profileUrl: `${data.proofOfDocument}`,
        // department : "CSE (AI & ML)",
    },
  ];


  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [currentFaculty, setCurrentFaculty] = useState(facultyData[0]); // Display faculty based on the page
  const [status, setStatus] = useState(null); // Track the status (Accepted / Rejected)

  // Simulate API call to fetch responses for a particular faculty (mocked data)
  const fetchResponses = (faculty) => {
    const mockResponses = [
      { id: 1, response: `Response for faculty ${faculty.name} - 1` },
      { id: 2, response: `Response for faculty ${faculty.name} - 2` },
    ];
    return mockResponses;
  };

  const [responses, setResponses] = useState(fetchResponses(currentFaculty)); // Initialize with mock responses

  useEffect(() => {
    setCurrentFaculty(facultyData[currentPage]);
    setResponses(fetchResponses(facultyData[currentPage])); // Fetch responses for the faculty
    setStatus(null);
  }, [currentPage]);

  // Handler functions for Accept and Reject
  const handleAccept = () => {
    setStatus("Accepted");
    console.log(`Accepted: ${currentFaculty.name}`);
  };

  const handleReject = () => {
    setStatus("Rejected");
    console.log(`Rejected: ${currentFaculty.name}`);
  };

  // Handler function to change pages
  // const handlePageChange = ({ selected }) => {
  //   setCurrentPage(selected); // Update page number
  // };

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-[0px] left-0 z-40 alertcontainer">
      <div className="bg-white rounded-xl shadow-lg relative sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">


      <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full cursor-pointer"
          onClick={() => {
            setShowPopup(false)
            }}
        >
          <RxCross2 className="text-white" />
        </div>



        {/* heading details */}
        <div className="flex justify-between px-5 select-none">
          {/* faculty & Department */}
          <div className="text-[26px] font-semibold text-blue-500">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Faculty: {currentFaculty?.name}</h3>
            </div>

            {/* <div className="text-[20px] mt-1">Department : {currentFaculty?.department}</div> */}
          </div>

          {/* Display Status */}
          <div className="mt-4">
            <p
              className={`text-lg font-semibold` }
            >
              {/* if status accept then show the accept.jsx component, if reject then show Reject.jsx, else show pending*/}
              {status === "Accepted" ? <Accept/> : status == "Rejected" ? <Reject/> :  <Pending/>}

              {/* {status === "Accepted" ? <Accept /> : null}
              Status: {status || "Not Set"} */}
            </p>
          </div>
        </div>

        {/* Faculty Profile Iframe */}
        <div className="px-5 py-8">
          <iframe
            src={currentFaculty?.profileUrl || "#"}
            title="Faculty Profile"
            className="w-full border-2 border-gray-300 rounded-lg shadow-md h-[600px]"
          />
        </div>

        {/* Accept/Reject buttons */}
        {
          sessionStorage.getItem('role')==='moderator' && 
        <div className="flex items-center justify-between mt-6 space-x-4">
          <AcceptRejectButtons onAccept={handleAccept} onReject={handleReject} />
        </div>  
        }

        {/* Pagination */}
        {/* <div className="flex justify-center mt-6">
          <Pagination
            pageCount={facultyData.length}
            onPageChange={handlePageChange}
          />
        </div> */}
      </div>
    </div>
  );
};

export default FacultyPopup;
