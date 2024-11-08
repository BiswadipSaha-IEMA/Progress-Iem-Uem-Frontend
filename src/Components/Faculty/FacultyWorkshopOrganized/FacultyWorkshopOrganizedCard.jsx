import React, { useState } from "react";
import EditFormPopUp from "./EditFormPopUp";
import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import { LuLoader } from "react-icons/lu";

function FacultyWorkshopOrganizedCard({status, title, date, name, organizedBy, attendedBy, driveFileUrl}) {
    const [editForm, setEditForm] = useState(false);
    const [isIframeOpen, setIsIframeOpen] = useState(false);
    const [iframeError, setIframeError] = useState(false);

    const openIframePopup = (e) => {
        if (e.target.tagName.toLowerCase() !== 'div' || !e.target.classList.contains('edit-button')) {
            setIsIframeOpen(true);
            setIframeError(false);
        }
    };

    const getEmbedUrl = (url) => {
        const fileId = url.match(/[-\w]{25,}/);
        return fileId 
            ? `https://drive.google.com/file/d/${fileId[0]}/preview` 
            : null;
    };

    const embedUrl = getEmbedUrl(driveFileUrl);

    const getStatusStyles = (status) => {
        switch (status) {
          case "Approved":
            return {
              bg: "bg-[#D6FFCE]",
              text: "text-[#1C6229]",
              icon: <TiTick className="text-[#1C6229]" />,
            };
          case "Pending":
            return {
              bg: "bg-[#FFC8A0]",
              text: "text-[#873D22]",
              icon: <LuLoader className="text-[#873D22]" />,
            };
          case "Rejected":
            return {
              bg: "bg-[#FFD6D6]",
              text: "text-[#D60000]",
              icon: <RiCloseFill className="text-[#C66666]" />,
            };
          default:
            return {
              bg: "bg-gray-200",
              text: "text-gray-600",
              icon: <RiCloseFill />,
            };
        }
    };

    const { bg, text, icon } = getStatusStyles(status);

    return (
        <div 
            className="w-full md:w-[400px] lg:w-[400px] h-[280px] md:h-[230px] lg:h-[230px] shadow-2xl rounded-2xl flex flex-col items-center p-4 md:p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={openIframePopup}
        >
            <div className="flex items-center justify-between w-full mb-2">
                <div className="text-[#03a8fd] text-[1.25rem] md:text-[1.5rem] font-semibold">
                    {title}
                </div>
                <div className="flex items-center gap-2">
                    <div className={`${bg} ${text} px-3 py-1 rounded-md font-medium text-sm md:text-base flex items-center gap-1`}>
                        {icon}
                        {status}
                    </div>
                    {status === "Rejected" && (
                        <div 
                            className="bg-[#03a8fd] text-white px-3 py-1 rounded-md font-medium text-sm md:text-base cursor-pointer edit-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditForm(true);
                            }}
                        >
                            Edit
                        </div>
                    )}
                </div>
            </div>

            <hr className="mb-4 w-full" />

            <div className="w-full">
                <div>
          <p className="text-sm font-medium text-gray-500">Organizing Institute:</p>
          <p className="text-lg">{organizedBy}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Workshop Name:</p>
          <p className="text-lg">{name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date:</p>
          <p className="text-lg">{date}</p>
        </div>
            </div>

            {editForm && <EditFormPopUp id={id} setShowPopup={setEditForm} />}

            {isIframeOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-xl w-11/12 max-w-4xl h-[90vh] flex flex-col shadow-2xl transform transition-all duration-300 ease-in-out">
      {/* Popup Header */}
      <div className="flex justify-between items-center mb-4 border-b pb-2 border-gray-300">
        <h2 className="text-2xl font-semibold text-blue-600">
          {title}
        </h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsIframeOpen(false);
          }}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
        >
          <span className="text-lg font-bold">&times;</span>
        </button>
      </div>

      {/* Popup Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-gray-700">
        <div>
          <p className="text-sm font-medium text-gray-500">Organizing Institute:</p>
          <p className="text-lg">{organizedBy}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Workshop Name:</p>
          <p className="text-lg">{name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Date:</p>
          <p className="text-lg">{date}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Attended By:</p>
          <p className="text-lg">{attendedBy}</p>
        </div>
       
      </div>

      {/* Embed Iframe */}
      <div className="flex-grow">
  
        <iframe
          src={embedUrl}
          className="w-full h-full border border-gray-200 rounded-lg"
          title={`${title} - Drive File`}
          onError={() => setIframeError(true)}
        ></iframe>
        {/* Placeholder for no iframe */}
        <div className="w-full h-full border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
          <p className="text-center">Preview not available</p>
        </div>
        </div>
        </div>
    </div>
    )}
</div>
    );
}

export default FacultyWorkshopOrganizedCard;