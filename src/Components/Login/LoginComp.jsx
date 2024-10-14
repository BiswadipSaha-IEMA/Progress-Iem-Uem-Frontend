import React from 'react'
import login from '../../assets/login.png'
import decorate from '../../assets/decorate.png'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";


function LoginComp() {
  return (
    <div className='flex w-full'>
      {/* <div className="relative">
        <img src={login} alt='login' className='w-[760px] h-[870px] object-cover rounded-xl' />
        <div className="absolute top-0 left-0 z-2 text-white p-12 mt-8">
          <h2 className='text-5xl font-semibold'>Welcome Back</h2>
          <h2 className='text-5xl font-semibold mb-2'>Sign In to Your Account</h2>
          <p className='text-lg w-[400px]'>Access your personalized dashboard and all the features designed just for you.</p>
        </div>
      </div>
      <div className="ml-12 mt-20">
        <div className="flex flex-col">
          <h2 className='font-semibold text-5xl'>Sign In</h2>
          <form className="flex flex-col mt-8 gap-4 items-center relative">
            <input type="email" placeholder='Email Address' className='w-[400px] bg-gray-100 rounded-lg p-2' />
            <input type='password' placeholder='Password' className='w-[400px] bg-gray-100 rounded-lg p-2' />
            <div className="flex justify-end w-full">
              <a href='#' className='ml-120 text-blue-500'>Forget Password?</a>
            </div>
            <button type='submit' className='bg-blue-500 p-2 text-white rounded-lg w-[140px]'>Sign In</button>
          </form>
        </div>
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="flex items-center w-full">
            <hr className='flex-grow border-gray border-t-2' />
            <span className='mx-4 text-gray-600'>or continue with</span>
            <hr className='flex-grow border-gray border-t-2' />
          </div>
          <div className="flex">
            <button className='flex items-center border border-gray-600 rounded-md p-2 mr-4 gap-x-4'><FcGoogle /> Sign in with Google</button>
            <button className='flex items-center border border-gray-600 rounded-md p-2 gap-x-4'><FaApple /> Sign in with Apple</button>  
          </div>
          <div className="">
            <span className='text-gray-600'>Don't have an account?</span>
            <a href='#' className='text-blue-700 font-semibold'>Register Now</a>
          </div>
        </div>
      </div>
      <img src={decorate} alt='decoration' className='absolute right-0 bottom-[-50px] w-[800px] h-auto object-cover' /> */}

      <div className="w-1/2 p-6">
        <img src={login} alt='login' className='w-[680px] object-cover rounded-xl' />
        <div className="absolute top-0 left-0 z-2 text-white p-20 mt-8">
          <h2 className='text-5xl font-semibold'>Welcome Back</h2>
          <h2 className='text-5xl font-semibold mb-2'>Sign In to Your Account</h2>
          <p className='text-lg w-[400px]'>Access your personalized dashboard and all the features designed just for you.</p>
        </div>
      </div>
      <div className="w-1/2 relative overflow-x-hidden overflow-y-hidden">
        <img src={decorate} alt='decoration' className='absolute right-[-300px] bottom-[-200px] w-[800px] h-auto object-cover' />
      </div>
    </div>
  )
}

export default LoginComp