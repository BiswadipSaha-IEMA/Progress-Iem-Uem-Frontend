import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
import { useGetReq, usePostReq } from "../../../hooks/useHttp";
import ManagePopUp from "./ManagePopUp";

function IndustrialPopup({ setUtilFor, setShowPopup, getAllInfo }) {
  const [postReq] = usePostReq();
  const [getReq] = useGetReq();
  const [error, setError] = useState(false);

  const [dateRange, setDateRange] = useState(["", ""]);

  const getDates = async () => {
    try {
      const dates = await getReq("api/v1/timeline/getSetTimeline", accessToken);
      if (dates.success) {
        setDateRange([
          dates.data.setTimeLineStartDate,
          dates.data.setTimeLineEndDate,
        ]);
        console.log("Dates", dates.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [formData, setFormData] = useState({
    organizedBy: "",
    proofDocument:"",
    date: "",
    industryName: "",
    attendedBy : "",
  });

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      if (value < dateRange[0] || value > dateRange[1]) {
        e.target.value = "";
        setError(true);
        return;
      }
    }

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
        organizedBy: formData.organizedBy,
        proofDocument: formData.proofDocument,
        date: formData.date,
        industryName: formData.industryName,
        attendedBy: formData.attendedBy,
        eventType: "IndustrialTour",
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
      organizedBy: "",

      date: "",
      industryName: "",
      attendedBy: "",
    //   eventType: "IndustrialTour",
    });
    console.log("Form closed");
  };

  useEffect(() => {
    getDates();
  }, [accessToken]);

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-[-25px] left-0 z-40 alertcontainer">
      <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
        <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
          onClick={() => {
            setShowPopup(false);
            handleClose();
          }}
        >
          <RxCross2 className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">
          Industrial Tour Form
        </h2>

        <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-4">
          <style>{`
            ::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome, Safari and Opera */
            }
          `}</style>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Organized By
              </label>
              <input
                type="text"
                name="organizedBy"
                value={formData.organizedBy}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
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
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
              />
            </div>

            {/* Proof Document */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Industry Name
              </label>
              <input
                type="text"
                name="industryName"
                value={formData.industryName}
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
                name="attendedBy"
                value={formData.attendedBy}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Proof Of Document
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
      {error && (
        <ManagePopUp
          setUtilFor={"error"}
          setPopupShow={setError}
          takeData={"Not a valid date"}
        />
      )}
    </div>
  );
}

export default IndustrialPopup;
