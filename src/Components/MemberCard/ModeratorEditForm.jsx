import React,{useState} from "react";
import { RxCross2 } from "react-icons/rx";

import { usePutReq } from "../../hooks/useHttp";

export default function ModeratorEditForm({setShowModeratorForm, data, onDataUpdate}) {
    const [selectedStream, setSelectedStream] = useState("");
    const [moderatorData, setModeratorData] = useState({
        role: "Moderator",
        name: data.name || "",
        contact: data.contact || "",
        email: data.email || "",
        college: data.college || "",
        department: data.department || [],
        userId: data._id,
    });
    const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
    const [putReq] = usePutReq();

    const arrOfModeratorStreams = [];
    const handleModeratorStreamClick = (stream) => {
        setModeratorData((prevData) => {
          const isStreamSelected = prevData.department.includes(stream);
          const updatedDepartment = isStreamSelected
            ? prevData.department.filter((s) => s !== stream) 
            : [...prevData.department, stream];
      
          return {
            ...prevData,
            department: updatedDepartment,
          };
        });
      };
    

    const handelModeratorSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await putReq(
            "api/v1/moderator/editModerator",
            { ...moderatorData },
            accessToken
          );
    
          console.log(response);
          if (response.success) {
            setShowModeratorForm(false);
            if (onDataUpdate) {
                onDataUpdate(moderatorData);
            }
          }
        } catch (error) {
          console.log("NetworkError: ", error);
        }
      };

      const handleModeratorInputChange = (e) => {
        const { name, value } = e.target;
        setModeratorData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl alertcontent">
        <div className="flex justify-between p-5">
          <h2 className="text-4xl mb-4 font-bold flex justify-center items-center">
            Edit your details
          </h2>
          <div
            className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
            onClick={() => setShowModeratorForm(false)}
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
                        moderatorData.department.includes(stream)
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
              onClick={handelModeratorSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
