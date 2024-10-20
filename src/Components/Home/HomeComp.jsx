import React, { useContext, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ChangePasswordCompSigned from '../ChangePassword/ChangePasswordCompSigned';
import { AuthContext } from '../../Context/AuthContext';

export default function HomeComp() {
  const [showProfile, setShowProfile] = useState(false);
  const [ChangePassword, setChangePassword]= useState(false)
  const {logout}=useContext(AuthContext)

  const toggleProfile = () => setShowProfile((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-200 flex p-6 box-border relative">
      {/* Main Content Area */}
      <div className={`flex-grow h-full bg-gray-200 rounded-lg flex flex-col lg:h-[93vh] transition-all duration-300 ${showProfile ? ' ' : ''}`}>
        
        {/* Hamburger Menu for Mobile and Desktop */}
        <div className="absolute top-4 right-4 z-10">
          <button onClick={toggleProfile} className="bg-gray-300 p-2 rounded" aria-label="Toggle profile">
            {showProfile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Main Content Section */}
        <div className={`bg-white bg-cover bg-center shadow-md flex-grow p-8 rounded-lg mb-8 transition-all duration-300 ${showProfile ? 'lg:w-[calc(100%-320px)]' : 'lg:w-full'} bg-[url('/src/assets/image2.svg')]`}>
          <h1 className="text-black text-2xl font-bold mb-6">Account Details</h1>

          {/* Personal Details Section */}
          <section className="mb-6">
            <div className="flex border-b-2 border-gray-700 justify-between items-center">
              <h2 className="text-xl text-cyan-400 font-semibold mb-2 ">Personal Details</h2>
              <div className='flex flex-row'>
              <button className="text-black font-semibold mr-2">Edit </button>
              <img src="/src/assets/edit.jpeg" alt="Edit" className="  " />
              </div>
              
            </div>
            <div className="flex flex-col gap-2 text-black">
              <p className='mt-2'><strong>Name:</strong> Kartik Dubey</p>
              <p><strong>Address:</strong> Biswa Bangla Sarani, Rajarhat, Action Area III, Kolkata, 700159</p>
            </div>
          </section>
          
          {/* Contact Details Section */}
          <section className="mb-6 ">
            <div className="flex border-b-2 border-gray-700 justify-between items-center">
              <h2 className="text-xl text-cyan-400 font-semibold mb-2  border-black">Contact Details</h2>
              <div className='flex flex-row'>
              <button className="text-black font-semibold mr-2">Edit </button>
              <img src="/src/assets/edit.jpeg" alt="Edit" className="  " />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-black">
              <p className='mt-2'><strong>Phone No.:</strong> 9123456789 <span className="bg-blue-100 text-cyan-400 text-xs px-1 rounded">Primary</span></p>
              <p><strong>Email:</strong> Kartikdubey11234@gmail.com <span className="bg-blue-100 text-cyan-400 text-xs px-1 rounded">Primary</span></p>
              <p><strong>Secondary Phone No.:</strong> 9123456789</p>
              <p><strong>Secondary Email:</strong> -</p>
            </div>
          </section>

          {/* Account Settings Section */}
          <section className="mb-6">
            <div className="flex border-b-2 border-gray-700 justify-between items-center">
              <h2 className="text-xl text-cyan-400 font-semibold mb-2 ">Account Settings</h2>
              <div className='flex flex-row'>
              <button className="text-black font-semibold mr-2">Edit </button>
              <img src="/src/assets/edit.jpeg" alt="Edit" className="  " />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-black">
            
              <p className='mt-2'><strong>Account Type:</strong> Premium</p>
              <p><strong>Joined On:</strong> January 1, 2021</p>
            </div>
          </section>

          <div className="flex justify-end gap-4 mt-8">
            <button className="px-4 py-2 rounded-md font-medium bg-gray-200 text-black hover:bg-gray-300 transition-colors">Cancel</button>
            <button className="px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors">Apply Changes</button>
          </div>
        </div>

        {/* Profile Section - Sliding from Sidebar for Mobile */}
        <div className={`bg-white fixed right-0 w-80 shadow-md p-6 rounded-lg transform transition-transform lg:hidden flex flex-col ${showProfile ? 'translate-x-0 h-full' : 'translate-x-full'}`}>
          <div className="flex justify-center mb-4">
            <img src="/src/assets/dp.jpeg" alt="Profile" className="w-32 h-32 rounded-full object-cover" />
          </div>
          <button className="w-full py-2 mb-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center">
            <img src="/src/assets/edit.jpeg" alt="Edit" className="w-4 h-4 mr-2" />
            Change Profile Picture  
          </button>
          <button 
          className="w-full py-2 mb-2 text-red-500 bg-transparent hover:text-red-600 transition-colors text-sm border-b border-gray-800">
            Remove Profile Picture
          </button>
          <button className="w-full py-2 mb-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 transition-colors mt-6">
            Change Account Password
          </button>
          <button className="w-full py-2 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition-colors">
            Log Out
          </button>
        </div>

        {/* Profile Section - Sliding from Sidebar for Large Screens */}
        <div className={`fixed inset-y-0 right-0 w-80 lg:h-[90vh] mt-6 bg-white shadow-md p-6 rounded-lg transform transition-transform duration-300 hidden lg:flex flex-col ${showProfile ? 'translate-x-0 h-full' : 'translate-x-full'}`}>
          <div className="flex justify-center mb-4">
            <img src="/src/assets/dp.jpeg" alt="Profile" className="w-32 h-32 rounded-full object-cover" />
          </div>
          <button className="w-full py-2 mb-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center">
            <img src="/src/assets/edit.jpeg" alt="Edit" className="w-4 h-4 mr-2" />
            Change Profile Picture  
          </button>
          <button className="w-full py-2 mb-2 text-red-500 bg-transparent hover:text-red-600 transition-colors text-sm border-b border-gray-800">
            Remove Profile Picture
          </button>
          <button 
          onClick={()=>{setChangePassword(true)}}
          className="w-full py-2 mb-2 rounded-md text-black bg-gray-200 hover:bg-gray-300 transition-colors mt-6">
            Change Account Password
          </button>
          <button 
          onClick={()=>{logout()}}
          className="w-full py-2 rounded-md bg-red-100 text-red-500 hover:bg-red-200 transition-colors">
            Log Out
          </button>
        </div>
      </div>
      {
        ChangePassword && (
          <>
            <ChangePasswordCompSigned setForgetPassword={setChangePassword}/>
          </>
        )
      }
    </div>
  );
}
