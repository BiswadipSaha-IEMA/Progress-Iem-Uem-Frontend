import React from 'react'

function FacultyList({facultyData}) {

  // If no faculty data, show "No faculty found"
  if (!facultyData || facultyData.length === 0) {
    return <div>No faculty found</div>;
  }

  return (
    <>
    <div className="mt-8">
      <h2>Faculty Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facultyData.map((faculty) => (
          <div key={faculty._id} className="bg-white p-4 rounded-lg shadow">
            <h3>{faculty.name}</h3>
            <p>{faculty.designation}</p>
            <p>{faculty.email}</p>
          </div>
        ))}
      </div>
    </div>
    </>
    
    
  )
}

export default FacultyList