import React, { useState,useEffect } from 'react';
import { dummyData, dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../Header/Header';
import { useGetReq } from '../../../hooks/useHttp';
import ModeratorBookPublished from './ModeratorBookPublished';



const ModeratorSpecificBookPublished = () => {
  const [data, setData] = useState([]);
  const [books,setBooks]=useState([])
  const [rp1,setRp1]=useState([])
  const [rp2,setRp2]=useState([])
  const [rp3,setRp3]=useState([])
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const department = sessionStorage.getItem("dept");
  const id=sessionStorage.getItem("userId")
  const [getReq] = useGetReq();

  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await getReq(
          `api/v1/document/getAllSubmissionsById/${id}`,
          accessToken
        );
        if (response.success) {
          console.log(response);
          setData(response.data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    if (accessToken) {
      getFaculty();
    }
  }, [accessToken]);
  
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(()=>{
    if(data.publications){
      const filteredBooks=data.publications.filter(pub=>pub.publicationType==="Book").map(({createdBy,proofDocument,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
      const rep1=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-A").map(({createdBy,publicationGrade,publicationType,proofDocument,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
      const rep2=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-B").map(({createdBy,publicationGrade,publicationType,proofDocument,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
      const rep3=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-C").map(({createdBy,publicationGrade,publicationType,proofDocument,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
      // console.log(filteredBooks)
      setBooks(filteredBooks)
      setRp1(rep1)
      setRp2(rep2)
      setRp3(rep3)
    }
  },[data])

  const modifiedData = originalDummyData.map(({ proofOfDocument, name, _id, ...rest }) => ({
    // Name: name,
    // UserID: _id,
    ...rest,
  }));

  const proofOfDocuments = originalDummyData.map((item) => item.proofOfDocument)

  return (
    <>
      <Header backPage="/cse/facultylist" />

      <ModeratorBookPublished dummyData={books} dummy={books} name={'Book Published'} />
      <ModeratorBookPublished dummyData={rp1} dummy={rp1} name={'Research Paper Grade-A'} />
      <ModeratorBookPublished dummyData={rp2} dummy={rp2} name={'Research Paper Grade-B'} />
      <ModeratorBookPublished dummyData={rp3} dummy={rp3} name={'Research Paper Grade-C'} />
      <ModeratorBookPublished dummyData={data.patents} dummy={data.patents} name={'Patent'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Faculty Development Programmes'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Competition'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Seminar'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Conference'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Talks & Distinguished Lecture Series'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Workshop'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Industrial Tour'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Hackathon'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Consultancy'} />
      <ModeratorBookPublished dummyData={data.studentChapters} dummy={data.studentChapters} name={'Student Chapter Activity'} />
      <ModeratorBookPublished dummyData={data.moocs} dummy={data.moocs} name={'Moocs'} />
      <ModeratorBookPublished dummyData={modifiedData} dummy={dummyData} name={'Tri-Mentoring System'} />
    </>
  );
};

export default ModeratorSpecificBookPublished;


// import React, { useEffect, useState } from 'react';
// import ModeratorBookPublished from "../../../Components/ViewData/ModeratorBookPublished";
// import { dummyData as originalDummyData } from '../../../constants/studentData';
// import Header from '../../../Components/Header/Header';
// import { useGetReq } from '../../../hooks/useHttp';

// const FacultyViewData = () => {
//   // const [bookPublishedData, setBookPublishedData] = useState([]);
//   // const [gradeAData, setGradeAData] = useState([]);
//   // const [gradeBData, setGradeBData] = useState([]);
//   // const [gradeCData, setGradeCData] = useState([]);
//   const [conferenceData, setConferenceData] = useState([]);
//   const [lectureData, setLectureData] = useState([]);
//   const [industrialTourData, setIndustrialTourData] = useState([]);
//   const [triMentorData, setTriMentor] = useState([])
  
//   const [getReq] = useGetReq();
//   const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
//   const userId = sessionStorage.getItem('userId');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getReq(`api/v1/document/getAllSubmissionsById/${userId}`, accessToken);

//         if (response.success) {
//           const allData = response.data;
//           console.log(response.data.events);

//           // Filter data based on type
//           // setBookPublishedData(allData.filter(item => item.events.eventType === 'BookPublished'));
//           // setGradeAData(allData.filter(item => item.grade === 'A'));
//           // setGradeBData(allData.filter(item => item.grade === 'B'));
//           // setGradeCData(allData.filter(item => item.grade === 'C'));
//           setConferenceData(allData.events.filter(item => {
//             item.eventType === 'Conference'

//           }));
//           setLectureData(allData.events.filter(item => item.eventType === 'Lecture'));
//           setIndustrialTourData(allData.events.filter(item => item.eventType === 'IndustrialTour'));
//           setTriMentor(allData.events.filter(item => item.eventType == "Tri-Mentoring" ))
//         } else {
//           console.warn("API data format unexpected. Using dummy data.");

//           // Fallback to dummy data if API call fails
//           // setBookPublishedData(dummyData.events.filter(item => item.eventType === 'BookPublished'));
//           // setGradeAData(dummyData.publications.filter(item => item.grade === 'A'));
//           // setGradeBData(dummyData.publications.filter(item => item.grade === 'B'));
//           // setGradeCData(dummyData.publications.filter(item => item.grade === 'C'));
//           setConferenceData(dummyData.events.filter(item => item.eventType === 'Conference'));
//           setLectureData(dummyData.events.filter(item => item.eventType === 'Lecture'));
//           setIndustrialTourData(dummyData.events.filter(item => item.eventType === 'IndustrialTour'));
//           setTriMentor(allData.events.filter(item => item.eventType == "Tri-Mentoring" ))
//         }
//       } catch (error) {
//         console.error("Error fetching data in FacultyViewData:", error);

//         // Use dummy data in case of an error
//         // setBookPublishedData(dummyData.events.filter(item => item.eventType === 'BookPublished'));
//         // setGradeAData(dummyData.publications.filter(item => item.grade === 'A'));
//         // setGradeBData(dummyData.publications.filter(item => item.grade === 'B'));
//         // setGradeCData(dummyData.publications.filter(item => item.grade === 'C'));
//         setConferenceData(dummyData.events.filter(item => item.eventType === 'Conference'));
//         setLectureData(dummyData.events.filter(item => item.eventType === 'Lecture'));
//         setIndustrialTourData(dummyData.events.filter(item => item.eventType === 'IndustrialTour'));
//         setIndustrialTourData(dummyData.events.filter(item => item.eventType === 'IndustrialTour'));
//         setTriMentor(allData.events.filter(item => item.eventType == "Tri-Mentoring" ))
//       }
//     };

//     fetchData();
//   }, [accessToken]);

//   // const [data, setData]= useState([])

//   // useEffect(()=>{
//   //   const getData= async()=>{
//   //     const response= await getReq(`api/v1/document/getAllSubmissionsById/${userId}`, accessToken)
//   //     if(response.success){
//   //       setData(response.data.data)
//   //       console.log(response)
//   //     }
//   //   }
//   //   getData()
//   // },[accessToken])




//   const modifiedData = originalDummyData.map(({ name, ...rest }) => ({
//     ...rest,
//     userName: name, 
//   }));

//   return (
//     <>
//       <Header backPage="/cse/facultylist" />

//       {/* <ModeratorBookPublished dummyData={bookPublishedData} name={'Book Published'} />
//        <ModeratorBookPublished dummyData={modifiedData} name={'Research Paper Grade-A'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Research Paper Grade-B'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Research Paper Grade-C'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Patent'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Faculty Development Programmes'} /> 
//       <ModeratorBookPublished dummyData={modifiedData} name={'Competition'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Seminar'} />*/}
//       <ModeratorBookPublished dummyData={conferenceData} name={'Conference'} />
//       {/* <ModeratorBookPublished dummyData={modifiedData} name={'Talks & Distinguished Lecture Series'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Workshop'} /> */}
//       <ModeratorBookPublished dummyData={industrialTourData} name={'Industrial Tour'} />
//       {/* <ModeratorBookPublished dummyData={modifiedData} name={'Hackathon'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Consultancy'} />
//       <ModeratorBookPublished dummyData={modifiedData} name={'Moocs'} /> */}
//       <ModeratorBookPublished dummyData={triMentorData} name={'Tri-Mentoring System'} />
//     </>
//   );
// };

// export default FacultyViewData;
