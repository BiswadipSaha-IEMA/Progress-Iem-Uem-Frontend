import React, { useState } from "react";
import loginPic from "../../assets/login.png";
import decorate from "../../assets/decorate.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import ForgetPassword from "../ChangePassword/ForgetPassword";
import { useNavigate } from "react-router-dom";
import { usePostReq } from "../../hooks/useHttp";

function LoginComp({ email, setEmail, password, setPassword, setHandleLogin, accessToken, setAccessToken }) {
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
        const json = await postReq('api/v1/superAdmin/login', data);
        if (json) {
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
    <div className="flex min-h-[100vh] sm:flex-row flex-col sm:ml-0 overflow-hidden">
      <div className="relative hidden w-1/2 ml-2 sm:block">
        <img
          src={loginPic}
          alt="login" 
          className="h-[100vh] w-[100vw] lg:w-[50rem] p-8 object-cover rounded-[3rem]"
        />
        <div className="absolute inset-0 left-[-0.3rem] text-4xl text-white p-20 ">
          <div className="pr-24 font-semibold">Welcome Back</div>
          <div className="pr-24 mb-2 font-semibold">
            Sign In to Your Account
          </div>
          <div className="text-lg 2xl:text-xl max-w-[400px] pr-16 2xl:max-w-[600px]">
            Access your personalized dashboard and all the features designed just for you.
          </div>
        </div>
      </div>
      <div className="w-[100%] sm:w-[50%] 2xl:w-[40%] relative mt-4 md:ml-[2vw] lg:[5vw] 2xl:ml-[-2rem] ">
        <div className="flex flex-col mt-20 gap-12 lg:ml-[-1rem] text-xl sm:w-[80%] w-full pl-[1rem] pr-[1rem] sm:pr-0">
          <h2 className="text-5xl font-semibold">Sign In</h2>
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <input
              className="bg-[#F3F3F3] p-3 rounded-lg placeholder-gray-400 focus:outline-none"
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
              className="bg-[#F3F3F3] p-3 rounded-lg placeholder-gray-400 focus:outline-none"
              placeholder="Password"
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end w-full">
              <span
                className="text-[#03A8FD] text-right cursor-pointer"
                onClick={() => {
                  setForgetPassword(true);
                }}
              >
                Forget Password?
              </span>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-[#03A8FD] p-2 min-w-20 text-white rounded-xl w-1/3 ${isFormValid?"cursor-pointer":"cursor-not-allowed"}`}
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
          <div className="flex flex-col flex-shrink md:flex-row justify-center text-[#7B7B7B] ">
            Don't have an account?
            <span
              className="text-[#03A8FD] font-[500] cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Register Now
            </span>
          </div>
          
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

export default LoginComp;
