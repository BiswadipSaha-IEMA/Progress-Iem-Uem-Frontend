import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import "./styles.css";
import { usePostReq, usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup,data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();
  const [orgType, setOrgType] = useState("");


  const [formData, setFormData] = useState({
    faculty:data.faculty|| "",
    developedModule:data.developedModule|| "",
    platformUsed:data.platformUsed|| "",  
    dateOfLaunch:data.dateOfLaunch|| "",
    proofDocument: data.proofDocument || "",
    eFacility:data.eFacility|| "",
    facility:data.facility||  ""
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
    }
  }

  const handleClose = () => {
    setFormData({
      name: "",
      title: "",
      isbn: "",
      category: "",
      publisher: "",
      date: "",
      vol: "",
      issue: "",
      pp: "",
      publicationType: "Book",
      nationalOrInternational: "",
      proofDocument: "",
    });
    console.log("Form closed");
  };

  return (
      <>
        <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
  <div
    className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto"
  >
    <div
      className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
      onClick={() => setShowPopup(false)}
    >
      <RxCross2 className="text-white" />
    </div>

    <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">
      Book Publication Form
    </h2>

    {/* Inner container with scroll */}
    <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-4">
      {/* Hide scrollbar for Firefox and Internet Explorer */}
      <style>{`
        ::-webkit-scrollbar {
          display: none; /* Hide scrollbar for Chrome, Safari and Opera */
        }
      `}</style>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        {/* <div>
          <label className="block text-gray-600 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
            required
          />
        </div> */}
        {/* Platform Used */}
        <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Platform Used
                  </label>
                  <input
                    type="text"
                    name="platformUsed"
                    value={formData.platformUsed}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

        {/* Title */}
        <div>
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
        </div>

        {/* ISBN and Category */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              ISBN
            </label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
            />
          </div> */}
 {/* Date of Launch */}
 <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Date of Launch
                  </label>
                  <input
                    type="date"
                    name="dateOfLaunch"
                    value={formData.dateOfLaunch}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>
          {/* <div>
            <label className="block text-gray-600 font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
            >
              <option value="">Select</option>
              <option value="Scopus">Scopus</option>
              <option value="UGC-Care">UGC Care</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div> */}
<div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Link of Relevent Document & Facility Available
                  </label>
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
                    {/* Add more options as needed */}
                  </select>
                </div>
        {/* Date */}
        {/* <div>
          <label className="block text-gray-600 font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
          />
        </div> */}
        {/* Faculty */}
        <div>
                <label className="block text-gray-600 font-medium mb-1">
                    E Facility
                  </label>
                <input
                  type="text"
                  name="eFacility"
                  value={formData.eFacility}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  required
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
          />
        </div>

        {/* Centered Submit Button */}
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

      </>
    
  );
}

export default EditFormPopUp;
