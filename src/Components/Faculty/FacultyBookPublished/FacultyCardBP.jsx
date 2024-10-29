import React from "react";

function FacultyCardBP({status, date, name, ISBN}) {
  return (
    <div className="lg:w-[400px] md:w-[400px] w-full h-[230px] shadow-2xl rounded-2xl items-center p-8">
      <div className="flex items-center mb-2">
        <div className={`text-[#03a8fd] text-[1.5rem] w-full `}>The AI Blueprint</div>
        <div>
            {
                status === "pending" ? (
                    <div className="bg-[#ffc8a0] text-[#c38261] px-4  rounded-md font-[500] mt-1">
                        Pending
                    </div>
                ):
                status === "approved" ? (
                    <div className="bg-[#d6ffce] text-[#629d67] px-4  rounded-md font-[500] mt-1">
                        Published
                    </div>
                ):
                status === "rejected" ? (
                    <div className="bg-[#ffdbdb] text-[#db9292] px-4 rounded-md font-[500] mt-1">
                        Rejected
                    </div>
                ):<></>
            }
        </div>
        {
            status === 'rejected' && (
                <div className="bg-[#03a8fd] text-[#fff] ml-2 px-4 flex justify-center align-middle items-center rounded-md mt-1 font-[500]">Edit</div>
            )
        }
      </div>
      <hr className="mb-4"/>

      <div>
        <div className=" mb-2 font-[500]">Published Date: <span className=" text-[#999999] font-[400]">{date}</span> </div>
        <div className=" mb-2 font-[500]">Publisher Name: <span className=" text-[#999999] font-[400]">{name}</span> </div>
        <div className=" mb-2 font-[500]">ISBN/ISSN No: <span className=" text-[#999999] font-[400]">{ISBN}</span> </div>
      </div>
    </div>
  );
}

export default FacultyCardBP;
