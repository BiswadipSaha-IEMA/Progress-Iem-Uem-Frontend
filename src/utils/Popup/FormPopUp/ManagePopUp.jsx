import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ErrorLottie from "../../../Lottie/ErrorLottie";
import Lottie2 from 'react-lottie';
import "./styles.css";

const ManagePopUp = ({ setPopupShow, setSave, setUtilFor, takeData }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    file: null,
    password: "",
    confirmPassword: "",
  });

  const [fileError, setFileError] = useState(null);

  const isFormFilled = Object.values(formData).every(
    (value) => value !== "" && value !== null
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = [".pdf", ".docx", ".txt"];
    const fileExtension = file.name.slice(file.name.lastIndexOf("."));

    if (allowedFormats.includes(fileExtension)) {
      setFileError(null);
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    } else {
      setFileError("Invalid file format. Only .txt, .pdf, and .docx allowed.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled && !fileError) {
      console.log("Form submitted:", formData);
      setFormSave(true);
    }
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: ErrorLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
    {setUtilFor === "form" ? (
          <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
      <div className="bg-white py-10 px-4 rounded-[14px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1000px] min-w-[300px]">
      <div
              className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
              onClick={() => {
                setConfirmationPopupShow(false);
              }}
            >
              <RxCross2 />
            </div>

            <div className="flex w-full justify-start text-[2rem] font-[700]">
              Add Your Project
            </div>

            <form
              className="flex w-full flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="w-full px-8 py-4 rounded-lg font-[600] bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  placeholder="Enter Project Name..."
                />
              </div>

              <div className="flex flex-col">
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  accept=".pdf, .docx, .txt"
                />
                {fileError && (
                  <p className="text-red-600 text-sm mt-2">{fileError}</p>
                )}
              </div>

              <div className="flex flex-col">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  placeholder="Enter Password..."
                />
              </div>

              <div className="flex flex-col">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 outline-none"
                  placeholder="Confirm Password..."
                />
              </div>

              <button
                type="submit"
                className={`mt-4 py-4 px-8 text-[1.5rem] font-semibold text-white rounded-[8px] transition-all duration-300 ${
                  isFormFilled && !fileError
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormFilled || fileError}
              >
                Submit Paper
              </button>
            </form>
          
      </div>
      </div>
            
        ) : 
          setUtilFor === "error" ?
          <>
            <div className=" fixed top-0 left-0 h-[100vh] w-[100vw] z-[400] flex justify-center items-center bg-[#1414145e] backdrop-blur-md alertcontainer1">
            <div className="alertcontent1 bg-[#ffffff]  rounded-md flex flex-col justify-center items-center px-[12%] py-10 gap-1">
            <header className="text-[2rem] font-[700]">
              <Lottie2 options={defaultOptions} height={100} width={100} />
            </header>
            <main>
              <p className="text-[30px] font-[700] ">{takeData}</p>
            </main>
            <footer className="text-[20px] mt-10 font-[700] bg-blue-600 text-white px-4 py-2 rounded-md select-none cursor-pointer"
            onClick={() => {
              setPopupShow(false);
            }}
            >
              Okay
            </footer>
              </div>
              </div>

          </>
          :
          <></>
        }

    </>
        
      
  );
};

export default ManagePopUp;
