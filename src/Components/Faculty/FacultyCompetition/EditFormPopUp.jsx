import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
// import "./styles.css";
import { useGetReq, usePostReq, usePutReq } from "../../../hooks/useHttp";
import ManagePopUp from "../../../utils/Popup/FormPopUp/ManagePopUp";
// import ManagePopUp from "./ManagePopUp";

function EditFormPopUp({setShowPopup, data, fetchData }) {
  const [postReq] = usePostReq();
  const [putReq] = usePutReq();
  const [error, setError] = useState(false);
  const [dateRange, setDateRange] = useState(["", ""]);
  const [getReq]= useGetReq();

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
    topicName:data.topicName||"",
    date: data.date||"",
    organizedBy:data.organizedBy||"",
    proofDocument: data.proofDocument||"",
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
    const response = await putReq(
      "api/v1/document/editEvent",
      {
        eventId:data._id,
        topicName: formData.topicName,
        date: formData.date,
        organizedBy: formData.organizedBy,
        proofDocument: formData.proofDocument,
        eventType:"Competition",
        
      },
      accessToken
    );
    if (response.success){ 
      fetchData()
      setShowPopup(false)
    };
  };

  const handleClose = () => {
    setFormData({
       
        name: "",
       
        date: "",
       
        topicName:"",
        proofDocument: "",
    });
    console.log("Form closed");
  };

  useEffect(() => {
    getDates();
  }, [accessToken]);

  return (

      <>
        <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
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

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Competetion Submission Form
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
               

                {/* Competetion Name  */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Competetion Name 
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
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                 />
                </div>


                {/*  */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                  Competetion Type
                  </label>
                  <input
                    type="text"
                    name="organizedBy"
                    value={formData.organizedBy}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
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
                    required
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
          {error && (
        <ManagePopUp
          setUtilFor={"error"}
          setPopupShow={setError}
          takeData={"Not a valid date"}
        />
      )}
        </div>
      </>
    )

}

export default EditFormPopUp;
