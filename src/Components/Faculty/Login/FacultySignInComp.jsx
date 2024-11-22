import React, { useState } from "react";
import loginPic from "../../../assets/facultySignIn.png";
import decorate from "../../../assets/decorate.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import ForgetPassword from "../../ChangePassword/ForgetPassword";
import { useNavigate } from "react-router-dom";
import { usePostReq } from "../../../hooks/useHttp";

function FacultySignInComp({ email, setEmail, password, setPassword, setHandleLogin, accessToken, setAccessToken }) {
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();
  const [postReq] = usePostReq()
  const [loading, setLoading] = useState(false);

  // const handleSubmit =async (e) => {
  //   e.preventDefault();
  //   const data={
  //     email:email,
  //     password:password,
  //   }
  //   try{
  //     const response=await fetch('http://192.168.90.24:5000/api/v1/users/login',{
  //       method:'POST',
  //       headers:{
  //         'Content-Type':'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     })

  //     if(response.ok){
  //       const result=await response.json()
  //       setAccessToken(result.data.accessToken)
  //       console.log(result)
  //       setHandleLogin(true)
  //     }
  //     else{
  //       const errorData=await response.json()
  //       console.log(errorData)
  //     }
  //   }
  //   catch(error){
  //     console.error(error)
  //   }
  // };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = { email, password };

    try {
        const json = await postReq('api/v1/user/login', data);
        if (json) {
          console.log(json);
          console.log("************** faculty login----------------------")
            setAccessToken(json.data.accessToken);
            setHandleLogin(true);
        }
    } catch (error) {
        console.error("Error during login:", error.message);
    }
    finally{
      setLoading(false);
    }
};


  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex flex-col h-screen overflow-hidden sm:flex-row sm:ml-0">
      <div className="relative hidden w-1/2 ml-2 sm:block">
        <img
          src={loginPic}
          alt="login" 
          className="h-[100vh] w-[100vw] lg:w-[50rem] p-8 object-cover rounded-[3rem]"
        />
        <div className="absolute inset-0 left-[-0.3rem] text-[2.25rem] leading-10 md:text-[1.8rem] md:leading-10 text-white p-20">
          <div className="pr-24 font-semibold font-poppins">Welcome Back</div>
          <div className="pr-24 mb-2 font-semibold font-poppins">
            Sign In to Your Account
          </div>
          <div className="text-lg 2xl:text-xl max-w-[400px] pr-16 2xl:max-w-[600px] font-poppins">
            Access your personalized dashboard and all the features designed just for you.
          </div>
        </div>
      </div>
      <div className="w-[100%] sm:w-[50%] 2xl:w-[40%] relative inset-0 mt-4 md:ml-[2vw] lg:[5vw] 2xl:ml-[-2rem] lg:block flex justify-center items-center">
      {/* <div className="w-[100%] sm:w-[50%] 2xl:w-[40%] relative mt-4 md:ml-[2vw] lg:[5vw] 2xl:ml-[-2rem] "> */}
      <div className="flex flex-col mt-20 gap-12 lg:ml-[-1rem] text-xl sm:w-[80%] w-full xs:w-[24rem] px-5 sm:pr-0 justify-center z-1">
          <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-0">
            <h2 className="font-semibold lg:text-[2.4rem] text-[2rem] font-poppins">Sign In as&nbsp;</h2>
            <h2 className="font-semibold lg:text-[2.4rem] text-[1.5rem] text-[#03A8FD] font-poppins">{" "}Faculty</h2>
          </div>
          <form className="flex flex-col gap-4 w-[100%]" onSubmit={handleSubmit}>
            <input
              className="bg-[#F3F3F3] p-3 outline-none rounded-lg placeholder-gray-400 font-poppins lg:text-[1.125rem] text-[1.1rem] lg:min-w-20 min-w-full"
              placeholder="Email Address"
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="bg-[#F3F3F3] p-3 outline-none rounded-lg placeholder-gray-400 w-full font-poppins lg:text-[1.125rem] text-[1.1rem] lg:min-w-20 min-w-full"
              placeholder="Password"
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <div className="flex justify-end w-full">
              <span
                className="text-[#03A8FD] text-right cursor-pointer"
                onClick={() => {
                  setForgetPassword(true);
                }}
              >
                Forget Password?
              </span>
            </div> */}
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className={`bg-[#03A8FD] p-2 lg:min-w-20 min-w-full text-white rounded-xl w-1/3 font-poppins ${isFormValid?"cursor-pointer":"cursor-not-allowed"}`}
                disabled={!isFormValid} // Disable button if form is not valid
              >
                {
              loading?<>Sign In...</>:<>Sign In</>
              }
              </button>
            </div>
          </form>
          {/* <div className="flex items-center gap-12 text-[#7B7B7B] ">
            <hr className="flex-grow border-[#7B7B7B]" />
            or continue with
            <hr className="flex-grow border-[#7B7B7B]" />
          </div> */}
          {/* <div className="flex justify-center text-[#484848] ">
            <button className="flex items-center gap-1 border border-[#D1D3DE] p-2 rounded-xl mx-3">
              <FcGoogle />
              Sign In with Google
            </button>
            <button className="flex items-center gap-1 border border-[#D1D3DE] p-2 rounded-xl mx-3">
              <FaApple />
              Sign In with Apple
            </button>
          </div> */}
          <div className="flex flex-row flex-shrink md:flex-row justify-center text-[#7B7B7B] font-poppins text-[0.95rem] lg:text-[1.2rem] z-10">
            Don't have an account?&nbsp;
            <span
              className="text-[#03A8FD] font-[500] cursor-pointer font-poppins"
              onClick={() => {
                navigate("/faculty/signup");
              }}
            >
              Sign Up
            </span>
          </div>
          <img
          src={decorate}
          alt="decoration"
          className="absolute right-[-40vw] bottom-[-44vh] lg:absolute lg:right-[-22rem] 2xl:right-[-30vw] lg:bottom-[-18rem] lg:h-[90vh] object-cover md:hidden lg:block"
        />
        </div>
      </div>
      <img
        src={decorate}
        alt="decoration"
        className="absolute inset right-0 bottom-0 z-[-22] object-cover"
      />
      {forgetPassword && (
        <ForgetPassword setForgetPassword={setForgetPassword} />
      )}
    </div>
  );
}

export default FacultySignInComp;
