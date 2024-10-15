import React from "react";
import { useNavigate } from "react-router-dom";

function RegistrationComp() {

  const navigate = useNavigate();

  // const [otp, setOtp] = useState("");

  // const handleChange = (e) => {
  //   const value = e.target.value.replace(/\D/g, ""); // Only allows numbers
  //   setOtp(value);
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
          <div className="flex flex-col gap-y-5">
            <div className="flex gap-x-4">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="First Name"
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div className="relative w-full">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white pr-10" // Added pr-10 for padding-right
                type="email"
                placeholder="Email Address"
              />
              <button className="absolute right-3 top-2 text-[#00A8FF] bg-[#fff] font-semibold py-2 px-8 rounded-lg">
                Verify
              </button>
            </div>
            {/* <div className="flex items-center gap-x-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength="6"
                pattern="\d*"
                value={otp}
                onChange={handleChange}
                placeholder="OTP"
                className="px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
              />
              <div>
                Didn’t receive it?{" "}
                <span className="text-[#00A8FF] font-semibold cursor-pointer">
                  Resend in 01:59
                </span>
              </div>
            </div> */}
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
              type="password"
              placeholder="Password"
            />
            <input
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:bg-white"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex justify-center">
            <button className="font-semibold bg-[#03A8FD] text-white py-2 rounded-full hover:bg-[#0f84c1] transition-all duration-300 ease-in-out flex items-center justify-center w-1/2 focus:shadow-outline focus:outline-none">
              Register
            </button>
          </div>
          <div className="flex flex-col gap-y-12">
            <div class="border-b border-b-[#7B7B7B] flex justify-center">
              <div class=" px-8 inline-block text-[#7B7B7B] font-medium bg-white transform translate-y-1/2 text-xl">
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
                  onClick={() => navigate("/login")}
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
