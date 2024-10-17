import React, { useState, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";

const URL = "http://192.168.1.221:5000";

function RegistrationComp({
  email,
  setEmail,
  SuccessfullyRegistered,
  setSuccessfullyRegistered,
  setOptCheck,
  setOnRegister,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(120);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/api/v1/users/register`,
        formData
      );
      console.log("Registration successful:", response.data);
      navigate('/login');
      setSuccessfullyRegistered(true);
      setFormData(response.data);
    } catch (error) {
      console.error("Error Registering:", error);
    }
  };

  const generateOtp = async () => {
    try {
      const response = await axios.post(`${URL}/api/v1/otp/sendOtp`, {
        email: formData.email,
      });
      console.log("OTP Generation successful:", response.data);
      console.log(response.data);
      setGeneratedOtp(response.data.otp);
      setVerifyEmail(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.patch(`${URL}/api/v1/otp/verifyOtp`, {
        email: formData.email,
        otp: otp,
      });
      console.log("OTP Verification successful:", response.data);
      setOtpVerified(true);
      setOptCheck(otp);
      console.log("Error",response.message);
    } catch (error) {
      console.error("OTP verification error:", error.resposne.message);
      alert("OTP verification failed. Please check the OTP and try again.");
    }
  };

  // const generateOtp = () => {
  //   const otp = Math.floor(1000 + Math.random() * 9000).toString();
  //   setGeneratedOtp(otp);
  //   console.log("Generated OTP:", otp);
  //   setOptCheck(otp);
  // };

  // const handleEmailSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Email submitted:", email);
  //   setSuccessfullyRegistered(true);
  //   setCheckSubmit(true);
  //   generateOtp();
  //   startResendTimer();
  // };

  // const handleGenereteOtp = (e) => {
  //   // e.preventDefault();
  //   if (email !== null || email !== "") {
  //     setCheckSubmit(true);
  //     generateOtp();
  //     startResendTimer();
  //   } else {
  //     alert("you must enter valid email");
  //   }
  // };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
  };

  // const handleResendOtp = () => {
  //   if (resendTimer === 0) {
  //     generateOtp();
  //     generateOtp();
  //     startResendTimer();
  //   }
  // };

  // const startResendTimer = () => {
  //   setResendTimer(120);
  // };

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setOtpVerified(true);
      console.log("OTP verified successfully");
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  // const handleRegister = () => {
  //   if (password && confirmPassword === password) {
  //     setOnRegister({ email: email });
  //   } else {
  //     alert("Passwords do not match!");
  //   }
  // };

  return (
    <div className="relative flex h-screen">
      <div className="flex p-4 w-4/5">
        <div className="flex w-1/2">
          <img
            src="./src/assets/RegisterBg.png"
            alt="bg"
            className="object-cover h-full rounded-[1.25rem]"
          />
        </div>
        <div className="flex flex-col p-8 gap-y-8 justify-center w-1/2">
          <h1 className="text-5xl font-semibold">Register Now</h1>
          <div onSubmit={handleSubmit} className="flex flex-col gap-y-5">
            <div className="flex gap-x-4">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
            <div
              className="flex flex-col items-center gap-y-5"
            >
              <div className="relative w-full">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white pr-10"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                {!verifyEmail && (
                  <div
                    className="absolute right-3 top-2 text-[#00A8FF] bg-[#fff] font-semibold py-2 px-8 rounded-lg border hover:bg-[#000] hover:text-[#fff] hover:font-[700] cursor-pointer"
                    onClick={generateOtp}
                  >
                    Verify
                  </div>
                )}
              </div>
              <div className="flex gap-x-2" onSubmit={handleOtpSubmit}>
                {verifyEmail && !otpVerified && (
                  <>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="4"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter OTP"
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                      required
                    />
                    <div>
                      Didn’t receive it?{" "}
                      <span
                        className={`text-[#00A8FF] font-semibold cursor-pointer ${
                          resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={generateOtp}
                      >
                        {resendTimer > 0
                          ? `Resend in ${Math.floor(resendTimer / 60)
                              .toString()
                              .padStart(2, "0")}:${(resendTimer % 60)
                              .toString()
                              .padStart(2, "0")}`
                          : "Resend OTP"}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-[#00A8FF] font-semibold py-2 px-8 rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        verifyOtp();
                      }}
                      disabled={!verifyEmail}
                    >
                      Verify
                    </button>
                  </>
                )}
              </div>
            </div>

            {
              <>
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </>
            }

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!otpVerified}
                className={`font-semibold bg-[#03A8FD] text-white py-2 rounded-full hover:bg-[#0f84c1] transition-all duration-300 ease-in-out flex items-center justify-center w-1/2 focus:shadow-outline ${
                  otpVerified
                    ? "bg-[#03A8FD] hover:bg-[#0f84c1] text-white cursor-pointer"
                    : "bg-[#03A8FD] hover:bg-[#0f84c1] text-white cursor-not-allowed"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-12">
            <div className="border-b border-b-[#7B7B7B] flex justify-center">
              <div className=" px-8 inline-block text-[#7B7B7B] font-medium bg-white transform translate-y-1/2 text-xl">
                or continue with
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-y-6">
              <div className="flex justify-between gap-x-4">
                <button className="font-semibold border-2 border-[#D1D3DE] p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-x-2">
                    <img
                      src="./src/assets/google.png"
                      alt="google"
                      height={24}
                      width={24}
                    />
                    Register with Google
                  </div>
                </button>
                <button className="font-semibold border-2 border-[#D1D3DE] p-4 rounded-lg">
                  <div className="flex justify-center items-center gap-x-2">
                    <img
                      src="./src/assets/apple.png"
                      alt="apple"
                      height={24}
                      width={24}
                    />
                    Register with Apple
                  </div>
                </button>
              </div>
              <div className="text-[#7B7B7B]">
                Already have an account?{" "}
                <span
                  className="text-[#00A8FF] font-semibold cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign in
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src="./src/assets/Image.png"
        alt="bg"
        className="absolute top-0 right-0 object-cover"
      />
    </div>
  );
}

export default RegistrationComp;
