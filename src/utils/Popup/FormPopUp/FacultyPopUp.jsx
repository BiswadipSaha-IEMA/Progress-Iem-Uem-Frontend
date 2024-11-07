import React from "react"
import { Calendar, Users, Clock, Tag, Info } from "lucide-react"

const FacultyPopUp = ({ workshop }) => {
  return (
    <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto ">
      <h2 className="text-3xl font-bold text-[#03A8FD] mb-6 border-b pb-3">{workshop.topicName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Calendar className="text-[#03A8FD] w-5 h-5" />
            <p><span className="font-semibold">Date:</span> {workshop.date}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="text-[#03A8FD] w-5 h-5" />
            <p><span className="font-semibold">Organized by:</span> {workshop.organizedBy}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="text-[#03A8FD] w-5 h-5" />
            <p><span className="font-semibold">Duration:</span> {workshop.duration}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Tag className="text-[#03A8FD] w-5 h-5" />
            <p>
              <span className="font-semibold">Status:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold
                ${workshop.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                  workshop.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}`}>
                {workshop.status}
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="text-[#03A8FD] w-5 h-5" />
            <p><span className="font-semibold">Participants:</span> {workshop.participants}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-start space-x-3">
          <Info className="text-[#03A8FD] w-5 h-5 mt-1" />
          <div>
            <p className="font-semibold">Description:</p>
            <p className="text-gray-600">{workshop.description}</p>
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2 flex items-center">
            <Tag className="text-[#03A8FD] w-5 h-5 mr-2" />
            Key Topics:
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {workshop.keyTopics.map((topic, index) => (
              <span key={index} className="bg-[#e0f2fe] text-[#03A8FD] px-3 py-1 rounded-full text-sm font-medium">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacultyPopUp