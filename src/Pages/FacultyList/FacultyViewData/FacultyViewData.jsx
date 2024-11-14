import React, { useEffect, useState } from 'react';
import ViewDataTable from "../../../Components/ViewData/ViewDataTable";
import { dummyData, dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../../Components/Header/Header';
import { useGetReq } from '../../../hooks/useHttp';

const FacultyViewData = () => {

  const modifiedData = originalDummyData.map(({proofOfDocument, name, _id, ...rest }) => ({
    // Name: name,
    // UserID: _id,
    ...rest,
  }));

  const proofOfDocuments = originalDummyData.map((item) => item.proofOfDocument)

  const [bookPublishedData, setBookPublishedData] = useState([]);
  const [gradeAData, setGradeAData] = useState([]);
  const [gradeBData, setGradeBData] = useState([]);
  const [gradeCData, setGradeCData] = useState([]);
  const [conferenceData, setConferenceData] = useState([]);
  const [lectureData, setLectureData] = useState([]);  
  const [idustrialTourData, setIdustrialTourData] = useState([]);  

  const [getReq] = useGetReq();

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const department = sessionStorage.getItem('dept');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReq(`api/v1/document/getAllSubmissions/${department}`, accessToken);

        if (response.success) {
          const allData = response.data;
          console.log(allData)

          setBookPublishedData(allData.filter(item => item.eventType === 'BookPublished'));
          setGradeAData(allData.filter(item => item.grade === 'A'));
          setGradeBData(allData.filter(item => item.grade === 'B'));
          setGradeCData(allData.filter(item => item.grade === 'C'));
          setConferenceData(allData.filter(item => item.eventType === 'Conference'));
          setLectureData(allData.filter(item => item.eventType === 'Lecture'));
          setIdustrialTourData(allData.filter(item => item.eventType === 'IdustrialTour'));
          
        } else {
          console.warn("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data in FacultyViewData:", error);
      }
    };

    fetchData();
  }, [accessToken]);


  return (
    <>
      <Header backPage="/" />

      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Book Published'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Research Paper Grade-A'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Research Paper Grade-B'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Research Paper Grade-C'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Patent'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Faculty Development Programmes'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Competition'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Seminar'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Conference'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Talks & Distinguished Lecture Series'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Workshop'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData}name={'Industrial Tour'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Hackathon'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Consultancy'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData} name={'Moocs'} />
      <ViewDataTable dummyData={modifiedData} dummy={dummyData}  name={'Tri-Mentoring System'} />
    </>
  );
};

export default FacultyViewData;


// import React, { useEffect, useState } from 'react';
// import ViewDataTable from "../../../Components/ViewData/ViewDataTable";
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

//       {/* <ViewDataTable dummyData={bookPublishedData} name={'Book Published'} />
//        <ViewDataTable dummyData={modifiedData} name={'Research Paper Grade-A'} />
//       <ViewDataTable dummyData={modifiedData} name={'Research Paper Grade-B'} />
//       <ViewDataTable dummyData={modifiedData} name={'Research Paper Grade-C'} />
//       <ViewDataTable dummyData={modifiedData} name={'Patent'} />
//       <ViewDataTable dummyData={modifiedData} name={'Faculty Development Programmes'} /> 
//       <ViewDataTable dummyData={modifiedData} name={'Competition'} />
//       <ViewDataTable dummyData={modifiedData} name={'Seminar'} />*/}
//       <ViewDataTable dummyData={conferenceData} name={'Conference'} />
//       {/* <ViewDataTable dummyData={modifiedData} name={'Talks & Distinguished Lecture Series'} />
//       <ViewDataTable dummyData={modifiedData} name={'Workshop'} /> */}
//       <ViewDataTable dummyData={industrialTourData} name={'Industrial Tour'} />
//       {/* <ViewDataTable dummyData={modifiedData} name={'Hackathon'} />
//       <ViewDataTable dummyData={modifiedData} name={'Consultancy'} />
//       <ViewDataTable dummyData={modifiedData} name={'Moocs'} /> */}
//       <ViewDataTable dummyData={triMentorData} name={'Tri-Mentoring System'} />
//     </>
//   );
// };

// export default FacultyViewData;
