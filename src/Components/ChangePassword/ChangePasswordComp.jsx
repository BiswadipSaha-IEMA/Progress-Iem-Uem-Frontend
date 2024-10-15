import React from "react";
import backgroundImg from "../../assets/background.png";
import shapes from "../../assets/shapes.png";

export default function ChangePasswordComp() {
  return (
    <>
      <div className="relative p-4 flex
      md:flex-col lg:flex-row">
        {/* left part => image in background & some text over it*/}
        <div className="w-full h-full">
          <img className="md:w-[52%] lg:w-[38%]" src={backgroundImg} alt="background image" />
          <div className="w-auto absolute top-[10%] text-white pl-[2%]">
            <h1 className="md:text-3xl lg:text-5xl font-bold lg:mb-2">Change Password</h1>
            <h1 className="md:text-[1.7rem] lg:text-5xl font-bold mb-2">
              Keep Your Account Secure
            </h1>
            <p className="md:text-sm lg:text-xl lg:mt-6">
              Enter your current password and choose a new one. <br></br>
              Make sure it’s strong and unique to protect your information.
            </p>
          </div>
        </div>

        {/* right part => change password, set new password, update */}
        <div className="absolute md:left-[55%] lg:left-[42%] top-[10%] lg:w-[22%]">
          <form className="flex flex-col gap-3">
            <h1 className="font-bold text-3xl mb-8">Change Your Password</h1>
            <input
              className="w-[100%] bg-gray-100 pl-4 p-2 rounded-lg font-400"
              type="password"
              placeholder="Old Password"
            />
            <input
              className="w-[100%] bg-gray-100 pl-4 p-2 rounded-lg font-400"
              type="password"
              placeholder="New Password"
            />
            <input
              className="w-[100%] bg-gray-100 pl-4 p-2 rounded-lg font-400"
              type="password"
              placeholder="Confirm New Password"
            />

            <button className="bg-[#03A8FD] w-[8rem] m-auto mt-5 py-1 rounded-lg text-white text-lg">
              Update
            </button>
          </form>
        </div>

        {/* right side 3d image */}
      </div>

    <div > 
      <div>
        <img className="absolute bottom-0 right-0 
        md:w-[20rem]
        lg:w-[38rem] lg:h-auto" src={shapes} alt="shapes image" />
      </div>
      </div>
    </>
  );
}
