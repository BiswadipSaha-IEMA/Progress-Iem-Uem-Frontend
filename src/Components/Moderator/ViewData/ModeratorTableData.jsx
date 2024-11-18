import React, { useState,useEffect } from 'react';
import { dummyData, dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../Header/Header';
import { useGetReq } from '../../../hooks/useHttp';
import ModeratorViewTable from './ModeratorViewTable';



const ModeratorTableData = () => {
  const [data, setData] = useState([]);
  const [books,setBooks]=useState([])
  const [rp1,setRp1]=useState([])
  const [rp2,setRp2]=useState([])
  const [rp3,setRp3]=useState([])
  const [confPub,setConfPub]=useState([])
  const [moocs,setMoocs]=useState([])
  const [patents,setPatents]=useState([])
  const [projects,setProjects]=useState([])
  const [consultancy,setConsultancy]=useState([])
  const [studentChapters,setStudentChapters]=useState([])
  
  const [workshop,setWorkshop]=useState([])
  const [seminar,setSeminar]=useState([])
  const [conf,setConf]=useState([])
  const [facultyDevelopment,setFacultyDevelopment]=useState([])
  const [competition,setCompetition]=useState([])
  const [hackathon,setHackathon]=useState([])
  const [trimentor,setTrimentor]=useState([])
  const [lecture,setLecture]=useState([])
  const [industrialTour,setIndustrialTour]=useState([])
  const [getReq] = useGetReq();
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const department = sessionStorage.getItem("dept");
  const id=sessionStorage.getItem("userId")
  console.log(typeof(department))
  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await getReq(
          `api/v1/document/getAllSubmissions/${department}`,
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
      const workshop=data.events.filter(pub=>pub.publicationType==="Workshop").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const seminar=data.events.filter(pub=>pub.publicationType==="Seminar").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const confEvent=data.events.filter(pub=>pub.publicationType==="Conference").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const fdp=data.events.filter(pub=>pub.publicationType==="FDP").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const competition=data.events.filter(pub=>pub.publicationType==="Competiton").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const hackathon=data.events.filter(pub=>pub.publicationType==="Hackathon").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const trimentor=data.events.filter(pub=>pub.publicationType==="Tri-mentoring").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const lecture=data.events.filter(pub=>pub.publicationType==="Lecture").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const itour=data.events.filter(pub=>pub.publicationType==="IndustrialTour").map(({createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const moocs=data.moocs.map(({createdAt,createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const projects=data.projects.map(({createdAt,createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const patents=data.patents.map(({createdAt,createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const sca=data.studentChapters.map(({createdAt,createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const conf=data.publications.filter(pub=>pub.publicationType==="Conference").map(({category,createdBy,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const filteredBooks=data.publications.filter(pub=>pub.publicationType==="Book").map(({category,createdBy,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const rep1=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-A").map(({createdBy,publicationGrade,publicationType,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const rep2=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-B").map(({createdBy,publicationGrade,publicationType,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const rep3=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-C").map(({createdBy,publicationGrade,publicationType,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      console.log(rep1)
      setWorkshop(workshop)
      setSeminar(seminar)
      setConf(confEvent)
      setFacultyDevelopment(fdp)
      setCompetition(competition)
      setHackathon(hackathon)
      setTrimentor(trimentor)
      setLecture(lecture)
      setIndustrialTour(itour)
      
      setProjects(projects)
      setPatents(patents)
      setMoocs(moocs)
      setStudentChapters(sca)

      setConfPub(conf)
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
      <Header backPage="/moderator/dashboard" />

      {books.length>0 && <ModeratorViewTable dummyData={books} dummy={books} name={'Book Published'} />}
      {rp1.length>0 && <ModeratorViewTable dummyData={rp1} dummy={rp1} name={'Research Paper Grade-A'} />}
      {rp2.length>0 && <ModeratorViewTable dummyData={rp2} dummy={rp2} name={'Research Paper Grade-B'} />}
      {rp3.length>0 && <ModeratorViewTable dummyData={rp3} dummy={rp3} name={'Research Paper Grade-C'} />}
      {patents.length>0 && <ModeratorViewTable dummyData={patents} dummy={patents} name={'Patent'} />}
      {projects.length>0 && <ModeratorViewTable dummyData={projects} dummy={projects} name={'Projects'} />}
      {facultyDevelopment.length>0 && <ModeratorViewTable dummyData={facultyDevelopment} dummy={facultyDevelopment} name={'Faculty Development Programmes'} />}
      {competition.length>0 && <ModeratorViewTable dummyData={competition} dummy={competition} name={'Competition'} />}
      {seminar.length>0 && <ModeratorViewTable dummyData={seminar} dummy={seminar} name={'Seminar'} />}
      {confPub.length>0 && <ModeratorViewTable dummyData={confPub} dummy={confPub} name={'Conference'} />}
      {lecture.length>0 && <ModeratorViewTable dummyData={lecture} dummy={lecture} name={'Talks & Distinguished Lecture Series'} />}
      {workshop.length>0 && <ModeratorViewTable dummyData={workshop} dummy={workshop} name={'Workshop'} />}
      {industrialTour.length>0 && <ModeratorViewTable dummyData={industrialTour} dummy={industrialTour} name={'Industrial Tour'} />}
      {hackathon.length>0 && <ModeratorViewTable dummyData={hackathon} dummy={hackathon} name={'Hackathon'} />}
      {consultancy.length>0 && <ModeratorViewTable dummyData={consultancy} dummy={consultancy} name={'Consultancy'} />}
      {studentChapters.length>0 && <ModeratorViewTable dummyData={studentChapters} dummy={studentChapters} name={'Student Chapter Activity'} />}
      {moocs.length>0 && <ModeratorViewTable dummyData={moocs} dummy={moocs} name={'Moocs'} />}
      {trimentor.length>0 && <ModeratorViewTable dummyData={trimentor} dummy={trimentor} name={'Tri-Mentoring System'} />}
    </>
  );
};

export default ModeratorTableData;


// import React, { useEffect, useState } from 'react';
// import ModeratorViewTable from "../../../Components/ViewData/ModeratorViewTable";
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

//       {/* <ModeratorViewTable dummyData={bookPublishedData} name={'Book Published'} />
//        <ModeratorViewTable dummyData={modifiedData} name={'Research Paper Grade-A'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Research Paper Grade-B'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Research Paper Grade-C'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Patent'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Faculty Development Programmes'} /> 
//       <ModeratorViewTable dummyData={modifiedData} name={'Competition'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Seminar'} />*/}
//       <ModeratorViewTable dummyData={conferenceData} name={'Conference'} />
//       {/* <ModeratorViewTable dummyData={modifiedData} name={'Talks & Distinguished Lecture Series'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Workshop'} /> */}
//       <ModeratorViewTable dummyData={industrialTourData} name={'Industrial Tour'} />
//       {/* <ModeratorViewTable dummyData={modifiedData} name={'Hackathon'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Consultancy'} />
//       <ModeratorViewTable dummyData={modifiedData} name={'Moocs'} /> */}
//       <ModeratorViewTable dummyData={triMentorData} name={'Tri-Mentoring System'} />
//     </>
//   );
// };

// export default FacultyViewData;
