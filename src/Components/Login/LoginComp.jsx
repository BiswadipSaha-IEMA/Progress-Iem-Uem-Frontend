import React, { useState } from "react";
import loginPic from "../../assets/login.png";
import decorate from "../../assets/decorate.png";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import ForgetPassword from "../ChangePassword/ForgetPassword";
import { useNavigate } from "react-router-dom";

function LoginComp({ email, setEmail, password, setPassword, setHandleLogin, accessToken, setAccessToken }) {
  const [forgetPassword, setForgetPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    const data={
      email:email,
      password:password,
    }
    try{
      const response=await fetch('http://192.168.90.24:5000/api/v1/users/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
      })

      if(response.ok){
        const result=await response.json()
        setAccessToken(result.data.accessToken)
        console.log(result)
        setHandleLogin(true)
      }
      else{
        const errorData=await response.json()
        console.log(errorData)
      }
    }
    catch(error){
      console.error(error)
    }
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="flex overflow-hidden">
      <div className="w-1/2 relative ml-2">
        <img
          src={loginPic}
          alt="login"
          className="h-[100vh] w-[40vw] p-8 object-cover rounded-[3rem]"
        />
        <div className="absolute top-[-.8rem] left-0 z-2 text-white p-20">
          <h2 className="text-4xl font-semibold">Welcome Back</h2>
          <h2 className="text-4xl font-semibold mb-2">
            Sign In to Your Account
          </h2>
          <p className="text-lg w-[400px]">
            Access your personalized dashboard and all the features designed
            just for you.
          </p>
        </div>
      </div>
      <div className="w-1/2 relative mt-4">
        <div className="flex flex-col mt-20 gap-12 w-3/5 ml-[-6rem] text-xl">
          <h2 className="font-semibold text-5xl">Sign In</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              className="bg-[#F3F3F3] p-3 rounded-lg placeholder-gray-400"
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
              className="bg-[#F3F3F3] p-3 rounded-lg placeholder-gray-400"
              placeholder="Password"
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="w-full flex justify-end">
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
                className={`bg-[#03A8FD] p-2 text-white rounded-xl w-1/3 ${isFormValid?"cursor-pointer":"cursor-not-allowed"}`}
                disabled={!isFormValid} // Disable button if form is not valid
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex items-center gap-12 text-[#7B7B7B]">
            <hr className="flex-grow border-[#7B7B7B]" />
            or continue with
            <hr className="flex-grow border-[#7B7B7B]" />
          </div>
          <div className="flex justify-center text-[#484848]">
            <button className="flex items-center gap-1 border border-[#D1D3DE] p-2 rounded-xl mx-3">
              <FcGoogle />
              Sign In with Google
            </button>
            <button className="flex items-center gap-1 border border-[#D1D3DE] p-2 rounded-xl mx-3">
              <FaApple />
              Sign In with Apple
            </button>
          </div>
          <div className="flex justify-center text-[#7B7B7B]">
            Don't have an account?
            <span
              className="text-[#03A8FD] font-bold cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Register Now
            </span>
          </div>
        </div>
        <img
          src={decorate}
          alt="decoration"
          className="absolute right-[-22rem] bottom-[-18rem] w-full h-[90vh] object-cover"
        />
      </div>
      {forgetPassword && (
        <ForgetPassword setForgetPassword={setForgetPassword} />
      )}
    </div>
  );
}

export default LoginComp;
