import React, { useState } from "react";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

export default function ChangePasswordCompSigned({ setForgetPassword, email }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  let passwordCheck = false;

 useEffect(()=>{
  
  const ChangePassword = async () =>{
    try {
      const response = await fetch('http://192.168.90.24:5000/api/v1/users/forgotPassword ',{
       method : 'POST',
       headers:{
         'Content-Type': 'application/json',
       },
       body : JSON.stringify({email:email,  newPassword:newPassword})
      });
      const data = await response.json();
      if (response.ok) {
         console.log("password changed", data);
      }else{
       console.log("password not changed")
      }
   } catch (error) {
     console.error("Error Occured" ,error);
   }

  }
  
  if (passwordCheck) {
    ChangePassword();
  }

 }, [passwordCheck]);

// console.log(email)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      passwordCheck = true;
    }

    // Password validation
    if (newPassword === "" || confirmPassword === "") {
      setError("Both fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      console.log("Password successfully updated");
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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="font-bold text-3xl mb-8">Change Your Password</h1>

          <input
            className="w-[100%] bg-gray-100 pl-4 p-2 rounded-lg font-400 outline-none"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            className="w-[100%] bg-gray-100 pl-4 p-2 rounded-lg font-400 outline-none"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="bg-[#03A8FD] w-[8rem] m-auto mt-5 py-1 rounded-lg text-white text-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
