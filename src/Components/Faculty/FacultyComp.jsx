import React, { useState } from 'react'
import { Menu, X, Book, FileText } from 'lucide-react'
import Sidebar from "../SideBar/Sidebar";
import { FaBookBookmark } from "react-icons/fa6";
import { FaCheck, FaTimes } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi"; // as a replacement for Loader


const FacultyComp = () => {
  const [showProfile, setShowProfile] = useState(false)

  const toggleProfile = () => setShowProfile((prev) => !prev)

  const sections = [
    { title: 'Books Published', icon: FaBookBookmark },
    { title: 'Research Paper Grade A', icon: FaBookBookmark },
    { title: 'Research Paper Grade B', icon: FaBookBookmark },
    { title: 'Research Paper Grade C', icon: FaBookBookmark },
  ]

  const items = [
    { title: 'The AI Blueprint', status: 'Published' },
    { title: 'The AI Blueprint', status: 'Pending' },
    { title: 'The AI Blueprint', status: 'Rejected' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="absolute top-4 left-4 z-10 p-2 mr-4">
        <button
          onClick={toggleProfile}
          className="bg-slate-200 p-2 rounded absolute lsx:hidden"
          aria-label="Toggle profile"
        >
          {showProfile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[95vh] lg:p-6 space-y-6 duration-300 ${showProfile ? "lg:w-[calc(100% - 320px)] lg:ml-[330px]" : "lg:w-full lg:ml-0"} bg-[url('/src/assets/image2.svg')] overflow-y-scroll`}>
      <div className="bg-[url('/src/assets/FacultyBack.svg')] relative bg-cover bg-center w-full h-64 sm:h-80 md:h-96 rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md">


          <div className="flex mt-20 justify-center text-[30px] sm:text-[50px] font-semibold text-[#437F9E]">
            FACULTY
          </div>
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <section.icon className="mr-2 h-6 w-6 text-blue-500" />
                  {section.title}
                </h2>
                <button className="text-white bg-blue-500 p-2 hover:bg-blue-700 rounded transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span>{item.title}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.status === 'Published' ? 'bg-green-100 text-green-800' :
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Sidebar showProfile={showProfile} />
      </div>
    </div>
  )
}

export default FacultyComp