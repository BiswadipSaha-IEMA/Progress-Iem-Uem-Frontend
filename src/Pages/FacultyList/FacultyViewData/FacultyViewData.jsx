import React from 'react';
import ViewDataTable from "../../../Components/ViewData/ViewDataTable";
import { dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../../Components/Header/Header';

const FacultyViewData = () => {
  // Map over the imported data to change the field name from "name" to "userName"
  const modifiedData = originalDummyData.map(({ name, ...rest }) => ({
    ...rest,
    userName: name, // Replace "name" with "userName"
  }));

  return (
    <>
      <Header backPage="" />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} name={'Book Published'} />
    </>
  );
};

export default FacultyViewData;
