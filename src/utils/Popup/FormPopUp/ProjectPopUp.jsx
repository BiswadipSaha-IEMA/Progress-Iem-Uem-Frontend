import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
import { usePostReq } from "../../../hooks/useHttp";

function ProjectPopUp({getAllInfo, setUtilFor, setShowPopup }) {
  const [postReq] = usePostReq();

  const [formData, setFormData] = useState({
    title: "",
    principleInvestigator:"",
    coPrincipleInvestigator:"",
    grantAmount: "",
    dateOfSubmission: "",
    dateOfGranting:"",
    // department: "",
    // name: "",
    // designation: "",
    // dateOfFiling: "",
    // nationalOrInternational: "",
    // topicName: "",
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
      {
        title: formData.title,
        principleInvestigator: formData.principleInvestigator,
        coPrincipleInvestigator: formData.coPrincipleInvestigator,
        grantAmount: formData.grantAmount,
        dateOfSubmission: formData.dateOfSubmission,
        dateOfGranting: formData.dateOfGranting,
        // department: formData.department,
        // name: formData.name,
        // nationalOrInternational: formData.nationalOrInternational,
        // dateOfFiling: formData.dateOfFiling,
        // designation: formData.designation,
        // topicName: formData.topicName,
      },
      accessToken
    );
    if (response.success){ 
        setShowPopup(false)
        getAllInfo()
    };
  };

  const handleClose = () => {
    setFormData({
        title: "",
        principleInvestigator:"",
        principleInvestigator:"",
        grantAmount: "",
        dateOfSubmission: "",
        dateOfGranting:"",
    //   department: "",
    //   name: "",
    //   designation: "",
    //   dateOfFiling: "",
    //   nationalOrInternational: "",
    //   topicName: "",
    });
    setShowPopup(false);
  };

  return (
    setUtilFor === "projectAddForm" && (
      <>
        <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer font-poppins">
          <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
            <div
              className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
              onClick={handleClose}
            >
              <RxCross2 className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Project Submission Form
            </h2>

            <div
              className="overflow-y-scroll h-[calc(800px-160px)] p-4"
              style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
            >
              <style>{`
                ::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Title of Project
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Name of Principle Investigator
                  </label>
                  <input
                    type="text"
                    name="principleInvestigator"
                    value={formData.principleInvestigator}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                  Name of Co-Principle Investigator
                  </label>
                  <input
                    type="text"
                    name="coPrincipleInvestigator"
                    value={formData.coPrincipleInvestigator}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                  Amount of Grant
                  </label>
                  <input
                    type="number"
                    name="grantAmount"
                    value={formData.grantAmount}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Date of Submission
                  </label>
                  <input
                    type="date"
                    name="dateOfSubmission"
                    value={formData.dateOfSubmission}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Date of Granting
                  </label>
                  <input
                    type="date"
                    name="dateOfGranting"
                    value={formData.dateOfGranting}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-[200px] bg-[#03A8FD] text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-[#03A8FD] transition-all duration-200"
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

export default ProjectPopUp;