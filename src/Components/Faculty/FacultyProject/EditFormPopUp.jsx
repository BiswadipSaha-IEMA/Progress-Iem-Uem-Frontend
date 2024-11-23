import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { usePostReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup }) {
  const [postReq] = usePostReq();

  const [formData, setFormData] = useState({
    title: "",
    principalInvestigator: "",
    coPrincipalInvestigator: "",
    grantAmount: "",
    dateOfSubmission: "",
    dateOfGranting: "",
    department: "",
    proofOfDocument: "",
    obtainedScore: "",
    collegeName: "",
    documentLink: "",
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
    const response = await postReq(
      "api/v1/document/createProject",
      formData,
      accessToken
    );
    if (response.success) setShowPopup(false);
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

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">Edit Project Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              required
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
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
