import React from "react";

function FacultyTriMentoringCard({status, title, date, name,}) {
  return (
    <div className="w-full md:w-[400px] lg:w-[400px] h-[280px] md:h-[230px] lg:h-[230px] shadow-2xl rounded-2xl flex flex-col items-center p-4 md:p-6 lg:p-8">

    <div className="flex items-center justify-between w-full mb-2">
        <div className="text-[#03a8fd] text-[1.25rem] md:text-[1.5rem] font-semibold">
            {title}
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
                <div className="bg-[#ffdbdb] text-[#db9292] px-3 py-1 rounded-md font-medium text-sm md:text-base">
                    Rejected
                </div>
            )}
            {status === "Rejected" && (
                <div className="bg-[#03a8fd] text-white px-3 py-1 rounded-md font-medium text-sm md:text-base cursor-pointer">
                    Edit
                </div>
            )}
        </div>
    </div>

    <hr className="mb-4 w-full" />

    <div className="w-full">
        <div className="mb-2 font-medium text-sm md:text-base">
            Published Date: <span className="text-[#999999] font-normal">{date}</span>
        </div>
        <div className="mb-2 font-medium text-sm md:text-base">
            Taken By: <span className="text-[#999999] font-normal">{name}</span>
        </div>
        
    </div>
</div>

  );
}

export default FacultyTriMentoringCard;
