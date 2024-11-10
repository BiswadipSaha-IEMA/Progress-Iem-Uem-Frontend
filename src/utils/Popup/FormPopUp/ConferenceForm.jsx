import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useGetReq, usePostReq } from "../../../hooks/useHttp";
import ManagePopUp from "./ManagePopUp";

function ConferenceForm({ setShowPopup }) {
  const [postReq] = usePostReq();
  const [getReq] = useGetReq();
  const [error, setError] = useState(false);

  // Date range (you can adjust these dates as needed)
  const [dateRange] = useState({
    startDate: '2023-11-01',
    endDate: '2024-11-30',
  });

  const [formData, setFormData] = useState({
    eventType: "Conference",
    organizedBy: "",  // Organizing Institute
    topicName: "",    // Topic Name
    date: "",         // Date
    attendedBy: "",   // Attended By
    proofDocument: "", // Proof document (URL)
  });

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];




  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Date Validation: Ensure date is within the allowed range
    if (name === 'date') {
      if (value < dateRange.startDate || value > dateRange.endDate) {
        e.target.value = ''; // Reset the date field if invalid
        setError(true); // Set error state
        return;
      }
    }

    // Update the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await postReq(
      "api/v1/document/createEvent", // Replace with actual API endpoint
      formData,
      accessToken
    );

    if (response.success) setShowPopup(false);
  };

  const handleClose = () => {
    setFormData({
      eventType: "Conference",
      organizedBy: "",
      topicName: "",
      date: "",
      attendedBy: "",
      proofDocument: "",
    });
    setError(false); // Reset error state when form is closed
    console.log("Form closed");
  };

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40">
      <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] h-auto overflow-y-auto">
        <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
          onClick={() => {
            setShowPopup(false);
            handleClose();
          }}
        >
          <RxCross2 className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">Conference Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Organizing Institute */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Organizing Institute</label>
            <input
              type="text"
              name="organizedBy"
              value={formData.organizedBy}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div>

          {/* Topic Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Topic Name</label>
            <input
              type="text"
              name="topicName"
              value={formData.topicName}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div>

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
            {/* Error message for invalid date */}
            {error && <p className="text-red-500 text-sm mt-1">Please select a date within the range {dateRange.startDate} to {dateRange.endDate}.</p>}
          </div>

          {/* Attended By */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Attended By</label>
            <input
              type="text"
              name="attendedBy"
              value={formData.attendedBy}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
            />
          </div>

          {/* Proof Document (URL Input) */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Proof Document (URL)</label>
            <input
              type="url"
              name="proofDocument"
              value={formData.proofDocument}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              placeholder="Enter the URL of the proof document"
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
      {error && <ManagePopUp setUtilFor={'error'} setPopupShow={setError} takeData={'Not a valid date'}/>}
    </div>
  );
}

export default ConferenceForm;
