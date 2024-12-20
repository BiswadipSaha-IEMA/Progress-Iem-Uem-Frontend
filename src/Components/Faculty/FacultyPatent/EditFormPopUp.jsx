import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import "./styles.css";
import { usePostReq, usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();

  const [formData, setFormData] = useState({
    name: data.name||"",
    department: data.department||"",
    designation: data.designation||"",
    dateOfFiling: data.dateOfFiling|| "",
    topicName: data.topicName|| "",
    nationalOrInternational: data.nationalOrInternational||"",
    proofDocument: data.proofDocument||"",
  });
  console.log(data)
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
    if (!data) {
      const response = await postReq(
        "api/v1/document/createEvent",
        {
          
          organizedBy: formData.organizedBy,

          date: formData.date,
          industryName: formData.industryName,
          attendedBy: formData.attendedBy,
          eventType: "IndustrialTour",
        },
        accessToken                                                                                         
      );
      if (response.success) {
        setShowPopup(false);
        fetchData();
      }
    } else {
      const response = await putReq(
        `api/v1/document/editPatent`,
        {
          patentId: data._id,
          department: formData.department,
          name:formData.name,
          designation:formData.designation,
          dateOfFiling: formData.dateOfFiling,
          nationalOrInternational: formData.nationalOrInternational,
          topicName:formData.topicName,
          proofDocument:formData.proofDocument
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
      name: "",
      title: "",
      date: "",
      nationalOrInternational: "",
      proofDocument: "",
    });
    console.log("Form closed");
    setShowPopup(false)
  };

  return (
      <>
        <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
          <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
            <div
              className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
              onClick={handleClose}
            >
              <RxCross2 className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Patent Submission Form
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
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Date of Filing
                  </label>
                  <input
                    type="date"
                    name="dateOfFiling"
                    value={formData.dateOfFiling}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    National or International
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
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Proof Document
                  </label>
                  <input
                    type="text"
                    name="proofDocument"
                    value={formData.proofDocument}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

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
  );
}

export default EditFormPopUp;
