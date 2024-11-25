import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import "./styles.css";
import { usePostReq, usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();
  console.log(data);

  const [orgType, setOrgType] = useState("");

  const [formData, setFormData] = useState({
    eventType: "Workshop",
    organizedBy: data.organizedBy || "",
    topicName: data.topicName || "",
    date: data.date || "",
    attendedBy: data.attendedBy || "",
    department: "",
    type: orgType,
    proofDocument: data.proofDocument || "",
    
  });

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const handleChangeOrg = (e) => {
    setOrgType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
      const response = await postReq(
        "api/v1/document/createEvent",
        {
          // publicationId: data._id,
          eventType: formData.eventType,
          organizedBy: formData.organizedBy,
          topicName: formData.topicName,
          department: formData.department,
          date: formData.date,
          type: orgType,
          attendedBy: formData.attendedBy,
          proofDocument: formData.proofDocument,
        },
        accessToken
      );
      if (response.success) setShowPopup(false);
    } else {
      const response = await putReq(
        `api/v1/document/editEvent`,
        {
          eventId: data._id,
          eventType: formData.eventType,
          organizedBy: formData.organizedBy,
          topicName: formData.topicName,
          department: formData.department,
          date: formData.date,
          type: orgType,
          attendedBy: formData.attendedBy,
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

  const handleClose = () => {
    setFormData({
      eventType: "Workshop",
      organizedBy: "",
      topicName: "",
      date: "",
      attendedBy: "",
      department: "",
      type: orgType,
      proofDocument: "",
    });
    setShowPopup(false);
  };

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
      <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[600px] h-auto overflow-y-auto">
        <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
          onClick={handleClose}
        >
          <RxCross2 className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">
          Workshop Organized Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Type */}
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">
              Event Type
            </label>
            <input
              type="text"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              readOnly
            />
          </div> */}

          {/* Author Type */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Attended/Organized
            </label>
            <select
              name="category"
              value={orgType}
              onChange={handleChangeOrg}
              className="w-full p-3 bg-gray-100 border-none rounded-lg outline-none focus:ring-0"
            >
              <option value="">Select</option>
              <option value="Student">Attended</option>
              <option value="Faculty">Conducted</option>
            </select>
          </div>

          {/* Organized By */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Organizing Institute
            </label>
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
            <label className="block text-gray-600 font-medium mb-1">
              Topic Name
            </label>
            <input
              type="text"
              name="topicName"
              value={formData.topicName}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div>

          {/* Attended By */}
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">
              Attended By
            </label>
            <input
              type="text"
              name="attendedBy"
              value={formData.attendedBy}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div> */}

          {/* Department */}
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
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
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
            />
          </div>

          {/* Attended By */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Attended By
            </label>
            <input
              type="text"
              name="attendedBy"
              value={formData.attendedBy}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
            />
          </div>
          {/* Proof Document */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Proof Document
            </label>
            <input
              type="text"
              name="proofDocument"
              value={formData.proofDocument}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
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
