import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { usePostReq, usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();
  const [formData, setFormData] = useState({
    faculty: data.faculty || "",
    developedModule: data.developedModule || "",
    platformUsed: data.platformUsed || "",
    dateOfLaunch: data.dateOfLaunch || "",
    proofDocument: data.proofDocument || "",
    eFacility: data.eFacility || "",
    facility: data.facility || "",
  });

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1] || "";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await putReq(
      "api/v1/document/editMooc",
      {
        moocId: data._id,
        faculty: formData.faculty,
        developedModule: formData.developedModule,
        platformUsed: formData.platformUsed,
        dateOfLaunch: formData.dateOfLaunch,
        proofDocument: formData.proofDocument,
        eFacility: formData.eFacility,
        facility: formData.facility,
      },
      accessToken
    );
    if (response.success) {
      setShowPopup(false);
      fetchData();
    }else{
      const response = await putReq(
        `api/v1/document/editMooc`,
        {
          faculty: formData.faculty,
          developedModule: formData.developedModule,
          platformUsed: formData.platformUsed,
          dateOfLaunch: formData.dateOfLaunch,
          proofDocument: formData.proofDocument,
          eFacility: formData.eFacility,
          facility: formData.facility,
        },
        accessToken
      )
      if (response.success) {
        setShowPopup(false);
        fetchData();
      }
    }
  };

  const handleClose = () => {
    setFormData({
      faculty: "",
      developedModule: "",
      platformUsed: "",
      dateOfLaunch: "",
      proofDocument: "",
      eFacility: "",
      facility: "",
    });
    setShowPopup(false);
  };

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
      <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
        <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
          onClick={handleClose}
        >
          <RxCross2 className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">Mooc Submission Form</h2>

        <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name of Faculty</label>
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Name of The Module Developed</label>
              <input
                type="text"
                name="developedModule"
                value={formData.developedModule}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Platform Used</label>
              <input
                type="text"
                name="platformUsed"
                value={formData.platformUsed}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Date of Launch</label>
              <input
                type="date"
                name="dateOfLaunch"
                value={formData.dateOfLaunch}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Link of Relevant Document & Facility Available</label>
              <select
                name="facility"
                value={formData.facility}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
              >
                <option value="">Select Facility</option>
                <option value="Facility 1">Facility 1</option>
                <option value="Facility 2">Facility 2</option>
                <option value="Facility 3">Facility 3</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">E Facility</label>
              <input
                type="text"
                name="eFacility"
                value={formData.eFacility}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Proof Document</label>
              <input
                type="text"
                name="proofDocument"
                value={formData.proofDocument}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
              />
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
    </div>
  );
}

export default EditFormPopUp;
