import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { usePostReq,usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();

  const [formData, setFormData] = useState({
    organizedBy:data.organizedBy || "",
      topicName:data.topicName ||  "",
      attendedBy:data.attendedBy ||  "",
      date:data.date || "",
      department:data.department ||  "",
      proofDocument:data.proofDocument ||  "",
  });

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data){


      const response = await postReq(
        "api/v1/document/createEvent",{
          eventType:'FDP',
          organizedBy: formData.organizedBy,
          topicName: formData.topicName,
          attendedBy: formData.attendedBy,
          date: formData.date,
          department: formData.department,
          proofDocument: formData.proofDocument,
          
        },
        
        accessToken
      );
      if (response.success) {
        setShowPopup(false);
        fetchData();
      }
    }else{
      const response = await putReq(
        `api/v1/document/editEvent`,{

          eventType:'FDP',
          eventId: data._id,
          organizedBy: formData.organizedBy,
          topicName: formData.topicName,
          attendedBy: formData.attendedBy,
          date: formData.date,
          department: formData.department,
          proofDocument: formData.proofDocument,
          
        },
        
        accessToken
      );
      if (response.success) {
        setShowPopup(false);
        fetchData();
      }
    }
  };

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40">
      <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] h-auto overflow-y-auto">
        <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
          onClick={() => setShowPopup(false)}
        >
          <RxCross2 className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">
        FDP Submission Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">
              Status
            </label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div> */}

          {/* Title */}
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div> */}

          {/* Date */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div>

          {/* Name */}
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
            
          </div> */}
          {/* Faculty */}
          <div>
                  <label className="block text-gray-600 font-medium mb-1">
                   Organized By
                  </label>
                  <input
                    type="text"
                    name="organizedBy"
                    value={formData.organizedBy}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>
{/* Developed Module */}
<div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Topic Name 
                  </label>
                  <input
                    type="text"
                    name="topicName"
                    value={formData.topicName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

          {/* ISBN */}
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
            />
          </div> */}
                {/* Platform Used */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                  Attended by
                  </label>
                  <input
                    type="text"
                    name="attendedBy"
                    value={formData.attendedBy}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>
          {/* Date of Launch */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Proof of Document
            </label>
            <input
              type="text"
              name="proofDocument"
              value={formData.proofDocument}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
            />
          </div>
          {/* Faculty */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-[200px] bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFormPopUp;
