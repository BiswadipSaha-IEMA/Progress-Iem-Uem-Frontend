import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
import { usePostReq } from "../../../hooks/useHttp";

function MoocsPopUp({ setUtilFor, setShowPopup }) {
  const [postReq] = usePostReq();

  const [formData, setFormData] = useState({
    department: "",
    name: "",
    designation: "",
    dateOfFiling: "",
    nationalOrInternational: "",
    topicName:"",
   
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
      "api/v1/document/createPatent",
      {
        department: formData.department,
        name: formData.name,
        nationalOrInternational: formData.nationalOrInternational,
        dateOfFiling: formData.dateOfFiling,
        designation: formData.designation,
        topicName: formData.topicName,
        
      },
      accessToken
    );
    if (response.success) setShowPopup(false);
  };

  const handleClose = () => {
    setFormData({
        department: "",
        name: "",
        designation: "",
        dateOfFiling: "",
        nationalOrInternational: "",
        topicName:"",
    });
    console.log("Form closed");
  };

  return (
    setUtilFor === "bpAddForm" && (
      <>
        <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
          <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
            <div
              className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              FDP Submission Form
            </h2>

            {/* Inner container with scroll */}
            <div
              className="overflow-y-scroll h-[calc(800px-160px)] p-4"
              style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
            >
              {/* Hide scrollbar for Firefox and Internet Explorer */}
              <style>{`
            ::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome, Safari and Opera */
            }
          `}</style>

              <form onSubmit={handleSubmit} className="space-y-4">
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

                {/* Developed Module */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Name 
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

                {/* Platform Used */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                  designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

                {/* Date of Launch */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Date of Filling
                  </label>
                  <input
                    type="date"
                    name="dateOfLaunch"
                    value={formData.dateOfFiling}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>


                {/* Faculty */}
                <div>
                <label className="block text-gray-600 font-medium mb-1">
                nationalOrInternational
                  </label>
                <input
                  type="text"
                  name="nationalOrInternational"
                  value={formData.nationalOrInternational}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  required
                />
                </div>

                {/* Proof Document */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                  topicName
                  </label>
                  <input
                    type="text"
                    name="topicName"
                    value={formData.topicName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

                {/* Centered Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-[200px] bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default MoocsPopUp;
