import React, { useEffect, useState } from 'react'
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { usePostReq } from "../../../hooks/useHttp";

export const FacultyCard = ({data, setLoading}) => {

  const [responseModify, setResponseModify]= useState('Pending')
  const [postReq] = usePostReq();
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const facultyAccess= async(id,accessModify)=>{
    try{
    const response=await postReq('api/v1/document/reviewPublication', {
      publicationId:id,
      status: accessModify
    },
  accessToken
  )
  if(response.success)
    setResponseModify(response.Message)
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
}

  useEffect(()=>{
    console.log(responseModify)
  },[responseModify])


  return (
    <div className='w-[100%] sm:w-[26rem] p-7 rounded-xl' style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3) ' }}>
      <div className="font-semibold text-[25px] sm:text-[1.5rem] text-[#555555] cursor-default mb-2" title={data.name}>{data?.name?.length>6? data.name.substring(0,6)+'...': data.name}</div>
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 text-[14px]">
        <div className="bg-[#115476] p-1 w-12 flex justify-center rounded-lg text-[#EEF3F5] font-semibold">CSE</div>
        <div className="bg-[#AEE4FF] p-1 w-28 flex justify-center rounded-lg text-[#51646F] font-semibold">{data.authorType}</div>
        <div className="bg-[#DCF3FF] p-1 sm:w-48 w-auto flex justify-center rounded-lg  text-[#51646F] font-semibold">{`${data.publicationType?data.publicationType.replace(/\s*Paper\s*/,''):''} ${data.publicationGrade?data.publicationGrade:''}`}</div>
      </div>
      <div className="border b-[#BFBFBF] mt-4 mb-4"></div>
      <div className='w-full flex justify-center items-center py-2 bg-[#03A8FD] text-[#fff] font-[500] rounded-md mb-4'>View File</div>
      <div className="flex items-center flex-col sm:flex-row gap-8 justify-center mb-2">
        <button className='bg-[#D6FFCE] py-2 text-[#1C6229] flex items-center justify-center gap-2 w-full sm:w-[45%] rounded-md text-[15px] font-[600]'
        onClick={()=>{
          facultyAccess(data._id, 'Approved')
        }}
        >Accept<TiTick className="text-[20px]" /></button>
        <button className='bg-[#FFDBDB] py-2 text-[#C66666] flex items-center justify-center gap-2 w-full sm:w-[45%] rounded-md text-[15px] font-[600]'
        onClick={()=>{
          facultyAccess(data._id, 'Approved')
        }}
        >Reject<ImCross className="text-[12px]" /></button>
        {/* <button className='bg-[#FFDBDB] p-2 text-[#C66666] flex items-center justify-center w-full sm:w-[45%] rounded-xl text-[19px]'>Reject<ImCross className="text-[14px]" /></button> */}
      </div>
    </div>
  )
}
