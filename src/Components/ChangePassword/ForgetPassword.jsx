import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import ChangePasswordCompSigned from "./ChangePasswordCompSigned";

export default function ForgetPassword({ setForgetPassword }) {
  const [sendOtp, setSendOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerifid, setOtpVerified]= useState(false)

  const generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    console.log("Generated OTP:", otp);
  };

  const handleOtpVerified = () => {
    if (generatedOtp === otp) {
      console.log("OTP verified successfully!");
      setOtpVerified(true)
    } else {
      console.log("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
      <div className="bg-white py-10 px-10 rounded-[14px] min-w-[500px] flex flex-col alertcontent relative max-w-[700px]">
        <div
          className="absolute right-5 top-5 bg-[#f00] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
          onClick={() => {
            setForgetPassword(false);
          }}
        >
          <RxCross2 />
        </div>
        {sendOtp === false && (
          <>
            <form type='submit' className="flex flex-col gap-3">
              <h1 className="font-bold text-3xl mb-8">Forget Password</h1>

              <input
                className="w-[100%] bg-gray-100 pl-4 p-2 rounded-lg font-400"
                type="email"
                placeholder="Enter your email"
                required
              />

              <button
              type="submit"
                className="bg-[#03A8FD] w-[8rem] m-auto mt-5 py-1 rounded-lg text-white text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  setSendOtp(true);
                  generateOtp();
                }}
              >
                Send OTP
              </button>
            </form>
          </>
        )}

        {sendOtp === true && otpVerifid===false && (
          <>
            <div className="text-[2rem] font-[700]">Verify Your OTP</div>
            <div className="text-[12px] mb-5">
              We’ve sent an OTP to your registered mobile number and email.
              Please enter the code below to complete your verification.
            </div>
            <div className="w-full flex flex-col align-middle items-center justify-center gap-3">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} placeholder="0" />}
                inputStyle={{
                  border: "2px solid #7B7B7B",
                  borderRadius: "15px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  height: "50px",
                  width: "50px",
                  gridAutoFlow: false,
                }}
                focusStyle={{
                  border: "2px solid #7B7B7B",
                }}
              />
              <div
                className="text-[#00A8FF] bg-[#fff] font-semibold py-2 px-8 rounded-lg border hover:bg-[#000] hover:text-[#fff] hover:font-[700] cursor-pointer"
                onClick={handleOtpVerified}
              >
                Verify
              </div>
            </div>
          </>
        )}
        {
          otpVerifid && (
            <>
              <ChangePasswordCompSigned setForgetPassword={setForgetPassword}/>
            </>
          )
        }
      </div>
    </div>
  );
}
