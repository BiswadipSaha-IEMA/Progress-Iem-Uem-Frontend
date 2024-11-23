import React, { useEffect, useState } from 'react'

function EditFormPopUp({data}) {
  const [resetData, setResetData] = useState([])
  // useEffect(()=>{
  //   const resetDataFunc=()=>{
  //     const filteredData = data.filter((item)=>{

  //     })
  //   }
  // })
  return (
    
        <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
        <div className="bg-white py-10 px-4 rounded-[14px] flex flex-col justify-center items-center alertcontent gap-2 relative w-[1000px] min-w-[300px]">
            {
              console.log(data)
            }
        </div>
        </div>
    
  )
}

export default EditFormPopUp