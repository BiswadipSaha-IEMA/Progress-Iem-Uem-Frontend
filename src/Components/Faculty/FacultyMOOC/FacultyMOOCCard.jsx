import React from "react";

function FacultyMOOCCard({
  status,
  module,
  moduleplatform,
  date,
  faculty,
  facilitylist,
  faciltylink,
  videolink
}) {
  return (
    <div className="w-full overflow-hidden md:w-[400px] lg:w-[400px] h-[280px] md:h-[230px] lg:h-[230px] shadow-2xl rounded-2xl flex flex-col items-center p-4 md:p-6 lg:p-8">
      
      {/* Header Section */}
      <div className="flex items-center justify-between w-full mb-2">
        <div className="text-[#03a8fd] text-[1.25rem] md:text-[1.5rem] font-semibold">
          {module}
        </div>
        <div className="flex items-center gap-2">
          {status === "Pending" && (
            <div className="bg-[#ffc8a0] text-[#c38261] px-3 py-1 rounded-md font-medium text-sm md:text-base">
              Pending
            </div>
          )}
          {status === "Approved" && (
            <div className="bg-[#d6ffce] text-[#629d67] px-3 py-1 rounded-md font-medium text-sm md:text-base">
              Published
            </div>
          )}
          {status === "Rejected" && (
            <>
              <div className="bg-[#ffdbdb] text-[#db9292] px-3 py-1 rounded-md font-medium text-sm md:text-base">
                Rejected
              </div>
              <div className="bg-[#03a8fd] text-white px-3 py-1 rounded-md font-medium text-sm md:text-base cursor-pointer">
                Edit
              </div>
            </>
          )}
        </div>
      </div>

      <hr className="mb-4 w-full" />

      {/* Scrollable Content Section */}
      <div className="w-full h-full overflow-y-auto">
        <div className="mb-2 font-medium text-sm md:text-base">
          Name of the Faculty: <span className="text-[#999999] font-normal">{faculty}</span>
        </div>
        
        <div className="mb-2 font-medium text-sm md:text-base">
          Platform on which module is developed: <span className="text-[#999999] font-normal">{moduleplatform}</span>
        </div>

        <div className="mb-2 font-medium text-sm md:text-base">
          Date of launching e content: <span className="text-[#999999] font-normal">{date}</span>
        </div>

        <div className="mb-2 font-medium text-sm md:text-base">
          List of the e-content development facility available: <span className="text-[#999999] font-normal">{facilitylist}</span>
        </div>

        <div className="mb-2 font-medium text-sm md:text-base">
          Link to the relevant document and facility available in the institution: <span className="text-[#999999] font-normal">{faciltylink}</span>
        </div>

        <div className="mb-2 font-medium text-sm md:text-base">
          Provide link to videos of the media centre and recording facility: <span className="text-[#999999] font-normal">{videolink}</span>
        </div>
      </div>
    </div>
  );
}

export default FacultyMOOCCard;
