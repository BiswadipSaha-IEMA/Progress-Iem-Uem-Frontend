import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import "./styles.css";
import { usePostReq, usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();

  
  const [formData, setFormData] = useState({
    eventType: "Lecture",
    organizedBy: data.organizedBy || "",
    topicName: data.topicName || "",
    date: data.date || "",
    attendedBy: data.attendedBy || "Book",
    proofDocument: data.proofDocument || "",
  });
  
  console.log(formData);
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
        "api/v1/document/createPublication",
        {
          name: formData.name,
          title: formData.title,
          isbn: formData.isbn,
          category: "",
          date: formData.date,
          publicationType: "Book",
          proofDocument: formData.proofDocument,
        },
        accessToken
      );
      if (response.success) setShowPopup(false);
    } else {
      const response = await putReq(
        "api/v1/document/editEvent",
        {
          eventId:data._id,
          name: formData.name,
          title: formData.title,
          isbn: formData.isbn,
          category: formData.category,
          date: formData.date,
          publicationType: "Book",
          proofDocument: formData.proofDocument,
        },
        accessToken
      );
      if (response.success) {
        setShowPopup(false)
        fetchData()
      };
    }
  };

  // const handleClose = () => {
  //   setFormData({
  //     name: "",
  //     title: "",
  //     isbn: "",
  //     category: "",
  //     publisher: "",
  //     date: "",
  //     vol: "",
  //     issue: "",
  //     pp: "",
  //     publicationType: "Book",
  //     nationalOrInternational: "",
  //     proofDocument: "",
  //   });
  //   console.log("Form closed");
  // };

  return (
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
            Talks and Distinguished Lecture Series
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
              {/* <div>
            <label className="block text-gray-600 font-medium mb-1">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
              required
            >
              <option value="">Select Event Type</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
              <option value="FDP">FDP</option>
              <option value="Webinar">Webinar</option>
              <option value="Competition">Competition</option>
              <option value="Lecture">Lecture</option>
              <option value="Industrial Tour">Industrial Tour</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Tri-Mentoring">Tri-Mentoring</option>
            </select>
          </div> */}

              {/* Organized By */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Personality Name & Organization
                </label>
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
                <label className="block text-gray-600 font-medium mb-1">
                  Topic Name
                </label>
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
                <label className="block text-gray-600 font-medium mb-1">
                  Date
                </label>
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

              {/* Department */}
              {/* <div>
            <label className="block text-gray-600 font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
            />
          </div> */}

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
  );
}

export default EditFormPopUp;
