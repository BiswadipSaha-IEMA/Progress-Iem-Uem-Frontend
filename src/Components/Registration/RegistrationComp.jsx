import React, { useState, useEffect } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { usePatchReq, usePostReq } from "../../hooks/useHttp";
import Lottie from "react-lottie";
import Verified from '../../Lottie/Verified.json'

// const URL = "http://192.168.1.221:5000";
// const URL = "http://192.168.90.24:5000";
// const URL = "http://localhost:5000";

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
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resendTimer, setResendTimer] = useState(120);
  const navigate = useNavigate();
  const [postReq] = usePostReq();
  const [patchReq] = usePatchReq();
  const [afterSend, setAfterSend] = useState(false);
  const [accessTok, setAccessTok] = useState("");
  const [checkOtpSend, setCheckOtpSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [emailVerifiedLottie, setEmailVerifiedLottie] = useState(false);




  useEffect(() => {
    setOnRegister({
      accesstoken: accessTok,
    });
  }, [accessTok]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (confirmPassword !== formData.password) {
  //     alert("Password and Confirm Password should be same");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`${URL}/api/v1/users/register`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json", // Set the content type to JSON
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const { accessToken, refreshToken } = data.data;
  //     // sessionStorage.setItem("accessToken", accessToken); // Store access token
  //     // sessionStorage.setItem("refreshToken", refreshToken);
  //     setAccessTok(accessTok)
  //     setOnRegister({
  //       email: formData.email,
  //       // accessToken,
  //       // refreshToken,
  //     });
  //     setSuccessfullyRegistered(true);
  //     setFormData(data.data.user);
  //   } catch (error) {
  //     console.error("Error:", error.response.data.data.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (confirmPassword !== formData.password) {
      alert("Passwords do not match!");
      return;
    }

    // if (!otpVerified) {
    //   alert("Please verify your OTP first.");
    //   return;
    // }

    try {
      const json = await postReq("api/v1/users/register", formData);
      const { accessToken, refreshToken } = json.data;

      setAccessTok(accessToken);
      setOnRegister({
        email: formData.email || "",
        accesstoken: accessToken || "",
        refreshtoken: refreshToken || "",
      });
      setSuccessfullyRegistered(true);
    } catch (error) {
      console.error("Registration error:", error);
    }
    finally{
      setLoading(false);
    }
  };

  const validatePassword = (value) => {
    const minLength = 8;
    const hasAlphanumeric = /(?=.*[a-zA-Z])(?=.*\d)/.test(value); // At least one letter and one number
    const hasSpecialChar = /[!@#$%^&*]/.test(value); // At least one special character

    if (value.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasAlphanumeric) {
      return "Password must contain at least one letter and one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character (!@#$%^&*).";
    }

    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value }); // Update password in formData

    // Validate the new password
    const validationMessage = validatePassword(value);
    setError(validationMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    // Check if confirm password matches
    if (value !== formData.password) {
      setError("Passwords do not match.");
    } else {
      // Clear error if they match
      const validationMessage = validatePassword(formData.password);
      if (!validationMessage) {
        setError("");
      }
    }
  };

  // const generateOtp = async () => {
  //   try {
  //     const response = await fetch(`${URL}/api/v1/otp/sendOtp`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: formData.email }), // Send email in the request body
  //     });

  //     if (!response.ok) {
  //       // Check if response is not successful
  //       const errorData = await response.json(); // Parse error data
  //       throw new Error(errorData.message); // Throw error with message
  //     }

  //     const data = await response.json(); // Parse response data
  //     setGeneratedOtp(data.otp); // Set OTP state

  //     if (!data.success) {
  //       alert("failed"); // Alert if OTP generation failed
  //     }

  //     setVerifyEmail(true); // Set email verification state
  //   } catch (error) {
  //     console.log("Error:", error.response.data.data.message); // Log error message
  //   }
  // };

  // const [isVerifyBtn,setIsVerifyBtn]= useState(false)

  // const generateOtp = async () => {
  //   if (formData.email.trim !== "") setVerifyEmail(true);
  //   try {
  //     const json = await postReq("api/v1/otp/sendOtp", {
  //       email: formData.email,
  //     });

  //     if (!json.success) {
  //       alert("Failed to generate OTP");
  //     } else {
  //       setAfterSend(true);
  //       setVerifyEmail(true);
  //       setCheckOtpSend(true);
  //     }
  //   } catch (error) {
  //     // console.log("Error:", error.response.data.data.message); // Log error message
  //     // alert(error.response.data.data.message); // Display error message
  //   }
  // };

  const generateOtp = async () => {
    setLoadingVerify(true);
    if (formData.email.trim() !== "") {
      setVerifyEmail(true);
      try {
        const json = await postReq("api/v1/otp/sendOtp", {
          email: formData.email,
        });

        
        if (!json.success) {
          if (json.message === "OTP already exists for this email") {
            setAfterSend(true);
            setVerifyEmail(true);
            setCheckOtpSend(true);
          }
          // setLoadingVerify(false);
          alert("Failed to generate OTP");
        } else {
          setAfterSend(true);
          setVerifyEmail(true);
          setCheckOtpSend(true);
          startResendTimer();
        }
      } catch (error) {
        console.error("Error generating OTP:", error);
      }
      finally{
        setLoadingVerify(false);
      }
    }
  };

  // const verifyOtp = async () => {
  //   try {
  //     const response = await fetch(`${URL}/api/v1/otp/verifyOtp`, {
  //       method: "PATCH", // Specify the request method
  //       headers: {
  //         "Content-Type": "application/json", // Set content type to JSON
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         otp: otp,
  //       }), // Send email and otp in the request body
  //     });

  //     if (!response.ok) {
  //       // Check if response is not successful
  //       const errorData = await response.json(); // Parse error data
  //       throw new Error(errorData.message); // Throw error with message
  //     }

  //     if(response.ok){
  //       setOtpVerified(true); // Update OTP verified state
  //       setOptCheck(otp); // Set OTP check state
  //     }

  //   } catch (error) {
  //     console.log("Error:", error.response.data.message); // Log error message
  //   }
  // };

  const verifyOtp = async () => {
    try {
      const response = await patchReq("api/v1/otp/verifyOtp", {
        email: formData.email,
        otp: otp,
      });

      if (response) {
        setOtpVerified(true);
        setOptCheck(otp);
        setEmailVerifiedLottie(true);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const handleGenereteOtp = (e) => {
    e.preventDefault();
    if (email !== null || email !== "") {
      // setCheckSubmit(true);
      generateOtp();
      startResendTimer();
    } else {
      alert("you must enter valid email");
    }
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    // Allow only alphabetic characters (A-Z or a-z) and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setOtp(value);
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      // generateOtp();
      generateOtp();
    }
  };

  const startResendTimer = () => {
    setResendTimer(120);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  // const handleOtpSubmit = (e) => {
  //   e.preventDefault();
  //   if (otp === generatedOtp) {
  //     setOtpVerified(true);
  //   } else {
  //     alert("Invalid OTP, please try again.");
  //   }
  // };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const json = await postReq("api/v1/otp/verifyOtp", {
        email: formData.email,
        otp: otp,
      });

      if (json.success) {
        setOtpVerified(true);
        setOptCheck(otp);
      } else {
        alert("Invalid OTP, please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  // const handleRegister = () => {
  //   if (password && confirmPassword === password) {
  //     setOnRegister({ email: email });
  //   } else {
  //     alert("Passwords do not match!");
  //   }
  // };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    DelayNodes: true,
    animationData: Verified,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="relative flex h-screen">
  <div className="flex flex-col lg:flex-row w-full sm:p-4 p-[2rem] lg:p-[3rem] relative h-full lg:h-screen">
    {/* Left Side Image */}
    <div className="max-[1621px]:hidden lg:block w-1/3 h-full">
      <img
        src="./src/assets/RegisterBg.png"
        alt="bg"
        className="object-cover rounded-[1.25rem] h-full w-full"
      />
    </div>

    {/* Input Fields Section */}
    <div className="flex flex-col w-full lg:w-1/2 h-full gap-y-6 justify-center lg:px-[6rem] px-[1rem] py-[2rem] sm:py-0">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold w-[50px] lg:w-full md:w-full text-left">
        Register Now
      </h1>

      <div className="flex flex-col gap-y-5">
        {/* First and Last Name Inputs */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="w-full px-6 py-3 md:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <input
            className="w-full px-6 py-3 md:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
        </div>

        {/* Email Input and OTP Verification */}
        <div className="flex flex-col gap-y-5">
          <div className="relative w-full">
            <input
              className="w-full px-6 pr-36 py-3 md:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white pr-10"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={afterSend}
            />
            {!checkOtpSend && (
              <div
                className={`absolute right-3 top-1 md:top-2 text-[#00A8FF] bg-[#fff] font-semibold py-2 px-6 md:px-8 rounded-lg border hover:bg-[#000] hover:text-[#fff] hover:font-[700] ${
                  !isValidEmail(formData.email)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={
                  isValidEmail(formData.email)
                  ? handleGenereteOtp
                  : undefined
                }
              >
                {loadingVerify ? <>Verifying...</> : <>Verify</>}
              </div>
            )}
            {
              emailVerifiedLottie ? (
                <div className="absolute right-3 top-4 md:top-5">
                  <Lottie options={defaultOptions} height={20} width={20}/>
                </div>
              ) : <></>
            }
          </div>

          {/* OTP Section */}
          {checkOtpSend && !otpVerified && (
            <div className="relative">
              <div className="relative w-full" onSubmit={handleOtpSubmit}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="4"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter OTP"
                  className="w-full px-6 py-3 md:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-2 md:top-3 text-[#00A8FF] bg-[#fff] font-semibold py-2 px-6 md:px-8 rounded-lg border hover:bg-[#000] hover:text-[#fff] hover:font-[700] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    verifyOtp();
                  }}
                  disabled={!verifyEmail}
                >
                  Verify
                </button>
              </div>
              <div className="w-full flex items-center justify-end text-sm">
                <span>Didn’t receive it?</span>
                <span
                  className={`ml-2 text-[#00A8FF] font-semibold cursor-pointer ${
                    resendTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleResendOtp}
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
            </div>
          )}
        </div>

        {/* Password Inputs */}
        <>
          <input
            className="w-full px-6 py-3 md:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <input
            className="w-full px-6 py-3 md:py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </>
        {/* Register Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!otpVerified}
            className={`font-semibold bg-[#03A8FD] text-white py-3 md:py-4 rounded-full hover:bg-[#0f84c1] transition-all duration-300 ease-in-out flex items-center justify-center w-full lg:w-1/2 focus:shadow-outline ${
              otpVerified
                ? "bg-[#03A8FD] hover:bg-[#0f84c1] cursor-pointer"
                : "cursor-not-allowed"
            }`}
          >
            {loading ? <>Registering...</> : <>Register</>}
          </button>
        </div>
      </div>

      {/* Sign In Redirect */}
      <div className="flex flex-col justify-center items-center gap-y-6">
        <div className="text-[#7B7B7B] text-center">
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

  {/* Background Image */}
  <img
    src="./src/assets/Image.png"
    alt="bg"
    className="absolute top-0 right-0 object-cover z-[-20]"
  />
</div>

  );
}

export default RegistrationComp;
