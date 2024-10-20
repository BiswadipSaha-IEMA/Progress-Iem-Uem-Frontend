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
      const response = await fetch('http://192.168.29.203:5000/api/v1/users/forgotPassword ',{
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



//Password Validation Rule
const validatePassword = (newPassword) =>{
  const hasUpperCase =  /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]]/.test(newPassword);
  const hasLength = newPassword.length >=0;

  if(!hasUpperCase) return " Password must have at least one uppercase letter";
  if(!hasLowerCase) return "  Password must have at least one lowercase letter";
  if(!hasNumber) return "  Password must have at least one number"; 
  if(!hasSpecialChar) return "  Password must have at least one special character";
  if(!hasLength) return "  Password must be at least 8 characters long";

  return null;
};

// console.log(email)
  const handleSubmit = (e) => {
    e.preventDefault();
    // call  the function to validate the password
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

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
      <div className="bg-white py-10 px-10 rounded-[14px] w-[360px] md:w-[500px] flex flex-col alertcontent relative max-w-[700px]">
        <div
          className="absolute right-5 top-4 text-black bg-[#f63232] rounded-full p-1 flex items-center justify-center align-middle cursor-pointer"
          onClick={() => {
            setForgetPassword(false);
          }}
        >
          <RxCross2 />
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="mb-4 text-2xl font-bold md:text-3xl md:mb-8">Change Your Password</h1>

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

          {error && <div className="text-sm text-red-500">{error}</div>}

          <button
            type="submit"
            className="bg-[#03A8FD] w-[6rem] md:w-[8rem] m-auto mt-5 py-1 rounded-lg text-white text-lg"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
