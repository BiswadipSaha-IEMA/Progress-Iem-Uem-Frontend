import React, { useEffect, useState } from 'react';
import ViewDataTable from "../../../Components/ViewData/ViewDataTable";
import { dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../../Components/Header/Header';
import { useGetReq } from '../../../hooks/useHttp';

const FacultyViewData = () => {


  const [data, setData]= useState([])
  const [getReq]= useGetReq()
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const userId= sessionStorage.getItem('userId')

  useEffect(()=>{
    const getData= async()=>{
      const response= await getReq(`api/v1/document/getAllSubmissionsById/${userId}`, accessToken)
      if(response.success){
        setData(response.data.data)
        console.log(response)
      }
    }
    getData()
  },[accessToken])




  const modifiedData = originalDummyData.map(({ name, ...rest }) => ({
    ...rest,
    userName: name, 
  }));

  return (
    <>
      <Header backPage="/cse/facultylist" />

      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Research Paper Grade-A'} />
      <ViewDataTable dummyData={modifiedData} name={'Research Paper Grade-B'} />
      <ViewDataTable dummyData={modifiedData} name={'Research Paper Grade-C'} />
      <ViewDataTable dummyData={modifiedData} name={'Patent'} />
      <ViewDataTable dummyData={modifiedData} name={'Faculty Development Programmes'} />
      <ViewDataTable dummyData={modifiedData} name={'Competition'} />
      <ViewDataTable dummyData={modifiedData} name={'Seminar'} />
      <ViewDataTable dummyData={modifiedData} name={'Conference'} />
      <ViewDataTable dummyData={modifiedData} name={'Talks & Distinguished Lecture Series'} />
      <ViewDataTable dummyData={modifiedData} name={'Workshop'} />
      <ViewDataTable dummyData={modifiedData} name={'Industrial Tour'} />
      <ViewDataTable dummyData={modifiedData} name={'Hackathon'} />
      <ViewDataTable dummyData={modifiedData} name={'Consultancy'} />
      <ViewDataTable dummyData={modifiedData} name={'Moocs'} />
      <ViewDataTable dummyData={modifiedData} name={'Tri-Mentoring System'} />
    </>
  );
};

export default FacultyViewData;
