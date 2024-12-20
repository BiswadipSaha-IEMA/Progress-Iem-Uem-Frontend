import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
import { usePostReq } from "../../../hooks/useHttp";

function WorkShopPopUp({getAllInfo, setUtilFor, setShowPopup }) {
  const [postReq] = usePostReq();

  const [formData, setFormData] = useState({
    eventType: "Workshop",
    organizedBy: "",
    topicName: "",
    date: "",
    attendedBy: "",
    department: "",
    type: "Attended",
    proofDocument: "",
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
      "api/v1/document/createEvent",
      {
        eventType: formData.eventType,
        organizedBy: formData.organizedBy,
        topicName: formData.topicName,
        department: formData.department,
        date: formData.date,
        type: formData.type,
        attendedBy: formData.attendedBy,
        proofDocument: formData.proofDocument,
      },
      accessToken
    );
    if (response.success){ 
      getAllInfo()
      setShowPopup(false)
    };
  };

  const handleClose = () => {
    setFormData({
      eventType: "Workshop",
      organizedBy: "",
      topicName: "",
      date: "",
      attendedBy: "",
      department: "",
      type: "Attended",
      proofDocument: "",
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

            <h2 className="text-2xl font-bold text-gray-800 mb-6 ml-4">
              Workshop Organised
            </h2>

            {/* Inner container with scroll */}
            <div
              className="overflow-y-scroll h-[calc(800px-160px)] p-4"
              style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
            >
              {/* Hide scrollbar for Firefox and Internet Explorer */}
              <style>{`
                ::-webkit-scrollbar {
                  display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
                }
              `}</style>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Type Dropdown */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Event Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  >
                    <option value="">Select Event Type</option>
                    <option value="Attended">Attended</option>
                    <option value="Conducted">Conducted</option>
                  </select>
                </div>

                {/* Organized By */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Organizing Institute</label>
                  <input
                    type="text"
                    name="organizedBy"
                    value={formData.organizedBy}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
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
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
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
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

                {/* Attended By */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">Attended By</label>
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
                  <label className="block text-gray-600 font-medium mb-1">Proof Document</label>
                  <input
                    type="text"
                    name="proofDocument"
                    value={formData.proofDocument}
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

export default WorkShopPopUp;
