import React from 'react';
import ViewDataTable from "../../../Components/ViewData/ViewDataTable";
import { dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../../Components/Header/Header';

const FacultyViewData = () => {
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
