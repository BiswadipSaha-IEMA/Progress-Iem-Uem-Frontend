import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import "./styles.css";
import { usePostReq, usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();

  console.log(data);

  const [formData, setFormData] = useState({
    organizedBy: data.organizedBy || "",
    topicName: data.topicName || "",
    attendedBy: data.attendedBy || "",
    date: data.date || "",
    eventType: data.publicationType || "Hackathon",
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
          topicName: formData.topicName,
          organizedBy: formData.organizedBy,
          attendedBy: formData.attendedBy,
          date: formData.date,
          eventType: "Hackathon",
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
            className="absolute p-2 transition-colors duration-200 bg-red-500 rounded-full cursor-pointer right-5 top-5 hover:bg-red-600"
            onClick={() => setShowPopup(false)}
          >
            <RxCross2 className="text-white" />
          </div>

          <h2 className="pl-4 mb-6 text-2xl text-center font-bold text-gray-800">
            Hackathon Submission Form
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
              {/* Faculty */}
              <div>
                  <label className="block text-gray-600 font-medium mb-1">
                   Organized By
                  </label>
                  <input
                    type="text"
                    name="organizedBy"
                    value={formData.organizedBy}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                {/* Developed Module */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Event Name 
                  </label>
                  <input
                    type="text"
                    name="topicName"
                    value={formData.topicName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

                {/* Date of Launch */}
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
                {/* Date of Launch */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    No. Of Participants
                  </label>
                  <input
                    type="number"
                    name="attendedBy"
                    value={formData.attendedBy}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
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
