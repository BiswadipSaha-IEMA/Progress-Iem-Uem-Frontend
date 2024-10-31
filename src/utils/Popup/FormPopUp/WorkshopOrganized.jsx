// BookPublished.js
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { usePostReq } from "../../../hooks/useHttp";
import "./styles.css";

function BookPublished({ setUtilFor, setShowPopup }) {
  const [postReq] = usePostReq();
  const [formData, setFormData] = useState({
    OrganizingInstitute: "",
    Name: "",
    Date: "",
    AttendedBy: "",
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
      "api/v1/document/createPublication",
      formData,
      accessToken
    );
    if (response.success) setShowPopup(false);
  };

  return (
    setUtilFor === "bpAddForm" && (
      <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
        <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[60vh] overflow-y-auto">
          <div
            className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
            onClick={() => setShowPopup(false)}
          >
            <RxCross2 className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">
            Workshop Organization Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Organizing Institute
              </label>
              <input
                type="text"
                name="OrganizingInstitute"
                value={formData.OrganizingInstitute}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Date
                </label>
                <input
                  type="text"
                  name="Date"
                  value={formData.Date}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Attended By
                </label>
                <input
                  type="text"
                  name="AttendedBy"
                  value={formData.AttendedBy}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                />
              </div>
            </div>
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
    )
  );
}

export default BookPublished;
