import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import ChangePasswordCompSigned from "./ChangePasswordCompSigned";

export default function ForgetPassword({ setForgetPassword }) {
  const [sendOtp, setSendOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(120);
  const [resendAvailable, setResendAvailable] = useState(false);

  useEffect(() => {
    let countdown;
    if (sendOtp && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0) {
      setResendAvailable(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [sendOtp, timer]);

  const generateOtp = async () => {
    //const otp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
      const response = await fetch('http://192.168.90.24:5000/api/v1/otp/sendotp', {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email})
      });
  
      const data =  await response.json();
  
      if(response.ok){
        // otp send  successfully
        console.log("Otp sent :", data);
        setGeneratedOtp(otp);
        setResendAvailable(false);
      }else{
        console.log("Otp not sent, Error");
      }
    } catch (error) {
      console.log(error);
    }


    // setGeneratedOtp(otp);
    // console.log("Generated OTP:", otp);
    // setResendAvailable(false); 
    setTimer(120);
  };

  const handleOtpVerified = () => {
    if (generatedOtp === otp) {
      console.log("OTP verified successfully!");
      setOtpVerified(true);
    } else {
      console.log("Incorrect OTP. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSendOtp(true);
      generateOtp();
    }
  };

  const handleResendOtp = () => {
    if (resendAvailable) {
      generateOtp();
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <h1 className="font-bold text-3xl mb-8">Forget Password</h1>

              <input
                className="w-[100%] bg-gray-100 pl-4 p-2 rounded-lg font-400"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button
                type="submit"
                className="bg-[#03A8FD] w-[8rem] m-auto mt-5 py-1 rounded-lg text-white text-lg"
              >
                Send OTP
              </button>
            </form>
          </>
        )}

        {sendOtp === true && otpVerified === false && (
          <>
            <div className="text-[2rem] font-[700]">Verify Your OTP</div>
            <div className="text-[12px] mb-5 ">
              We’ve sent an OTP to your registered mobile number and email.
              Please enter the code below to complete your verification.
            </div>
            <div className="w-full flex flex-col align-middle items-center justify-center gap-3">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span className="text-[#7B7B7B]">-</span>}
                renderInput={(props) => <input {...props} placeholder="0" />}
                inputStyle={{
                  border: "2px solid #7B7B7B",
                  borderRadius: "15px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  height: "50px",
                  width: "50px",
                  gridAutoFlow: false,
                  outline: "none",
                }}
              />
              <div className="flex justify-start items-start w-[45%] mt-1 mb-5 select-none">
                Didn’t receive it?{" "}
                <span className={`ml-2 font-[500] ${!resendAvailable ? "text-gray-500" : "text-[#00A8FF] cursor-pointer"}`} onClick={handleResendOtp}>
                  {timer===0? `Resend OTP`:
                    `Resend in ${formatTimer()}`}
                </span>
              </div>
              <div
                className="text-[#00A8FF] bg-[#fff] font-semibold py-2 px-8 rounded-lg border hover:bg-[#000] hover:text-[#fff] hover:font-[700] cursor-pointer"
                onClick={handleOtpVerified}
              >
                Verify
              </div>
            </div>
          </>
        )}

        {otpVerified && (
          <>
            <ChangePasswordCompSigned setForgetPassword={setForgetPassword} />
          </>
        )}
      </div>
    </div>
  );
}
