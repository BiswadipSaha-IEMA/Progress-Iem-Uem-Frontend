import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import "./styles.css";
import { usePostReq, usePutReq } from "../../../hooks/useHttp";

function EditFormPopUp({ setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();

  console.log(data);

  const [formData, setFormData] = useState({
    facultyName: data.facultyName || "",
    companyName: data.companyName || "",
    orderAmount: data.orderAmount || "",
    dateOfOrder: data.dateOfOrder || "",
    activityStatus: data.activityStatus || "",
    proofDocument: data.proofDocument || "",
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
        "api/v1/document/createEvent",
        {
          // publicationId: data._id,
          eventType: formData.eventType,
          organizedBy: formData.organizedBy,
          topicName: formData.topicName,
          department: formData.department,
          date: formData.date,
          type: orgType,
          attendedBy: formData.attendedBy,
          proofDocument: formData.proofDocument,
        },
        accessToken
      );
      if (response.success) setShowPopup(false);
    } else {
      const response = await putReq(
        `api/v1/document/editStudentChapter`,
        {
          studentChapterId: data._id,
          facultyName: formData.facultyName,
          companyName: formData.companyName,
          orderAmount: formData.orderAmount,
          dateOfOrder: formData.dateOfOrder,
          activityStatus: formData.activityStatus,
          proofDocument: formData.proofDocument,
        },
        accessToken
      );
      if (response.success) {
        setShowPopup(false);
        fetchData();
      }
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

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Student Chapter Activity Form
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
                Faculty Name
                </label>
                <input
                  type="text"
                  name="facultyName"
                  value={formData.facultyName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                />
              </div>

              {/* orderAmount */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                Order Amount
                </label>
                <input
                  type="text"
                  name="orderAmount"
                  value={formData.orderAmount}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                />
              </div>

              {/* Order Receive Date */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                Order Receive Date
                </label>
                <input
                  type="date"
                  name="dateOfOrder"
                  value={formData.dateOfOrder}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                />
              </div>


              {/* Status */}
              <div>
              <label className="block text-gray-600 font-medium mb-1">
              Status (Ongoing/ Completed)

                </label>
              <input
                type="text"
                name="activityStatus"
                value={formData.activityStatus}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                required
              />
              </div>

              {/* Proof Document */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Proof of Document
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
    )
}

export default EditFormPopUp;
