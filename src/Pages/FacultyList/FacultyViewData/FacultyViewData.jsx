import React, { useEffect, useState } from 'react';
import ViewDataTable from "../../../Components/ViewData/ViewDataTable";
import { dummyData, dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../../Components/Header/Header';
import { useGetReq } from '../../../hooks/useHttp';

const FacultyViewData = () => {

  // const modifiedData = originalDummyData.map(({proofOfDocument, name, _id, ...rest }) => ({
  //   // Name: name,
  //   // UserID: _id,
  //   ...rest,
  // }));
  
  // const proofOfDocuments = originalDummyData.map((item) => item.proofOfDocument)

  // const [workshop, setWorkshop] = useState([]);
  // const [bookPublishedData, setBookPublishedData] = useState([]);
  // const [gradeAData, setGradeAData] = useState([]);
  // const [gradeBData, setGradeBData] = useState([]);
  // const [gradeCData, setGradeCData] = useState([]);
  // const [conferenceData, setConferenceData] = useState([]);
  // const [lectureData, setLectureData] = useState([]);  
  // const [idustrialTourData, setIdustrialTourData] = useState([]);
  
  // const [getReq] = useGetReq();

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
  // const id=sessionStorage.getItem("userId")

  console.log(typeof(department))
  // let check;
  const [check, setCheck]= useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReq(`api/v1/document/getAllSubmissions/${department}`,
          accessToken
        );
        if (response.success) {
          // check = response.success;
          setCheck(response.success);
          console.log(response.data);
          setData(response.data);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  // useEffect(()=>{
  //   console.log("ffyfyyyyy-------------------------",check)
  // },[check])
  
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(()=>{

    // if(data.events){
      const events = data.events;
      const publications = data.publications;
      
      // console.log(data.publications)
      if(events){
        const workshop=events.filter(event=>event.eventType==="Workshop").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const seminar=events.filter(event=>event.eventType==="Seminar").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const confEvent=events.filter(event=>event.eventType==="Conference").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const fdp=events.filter(event=>event.eventType==="FDP").map(({createdBy,obtainedScore,collegeName,department,__v,_id,hasContentAccess,...rest})=>rest)
        const competition=events.filter(event=>event.eventType==="Competiton").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const hackathon=events.filter(event=>event.eventType==="Hackathon").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const trimentor=events.filter(event=>event.eventType==="Tri-mentoring").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const lecture=events.filter(event=>event.eventType==="Lecture").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const itour=events.filter(event=>event.eventType==="IndustrialTour").map(({createdBy,collegeName,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        setWorkshop(workshop)
        setSeminar(seminar)
        setConf(confEvent)
        setFacultyDevelopment(fdp)
        setCompetition(competition)
        setHackathon(hackathon)
        setTrimentor(trimentor)
        setLecture(lecture)
        setIndustrialTour(itour)
      }
      if(publications){
        const conf=publications.filter(pub=>pub.publicationType==="Conference").map(({category,collegeName,createdBy,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const filteredBooks=publications.filter(pub=>pub.publicationType==="Book").map(({category,collegeName,createdBy,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const rep1=publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-A").map(({createdBy,collegeName,publicationGrade,publicationType,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>({...rest}))
        const rep2=publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-B").map(({createdBy,collegeName,publicationGrade,publicationType,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        const rep3=publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-C").map(({createdBy,collegeName,publicationGrade,publicationType,obtainedScore,department,__v,_id,hasContentAccess,...rest})=>rest)
        console.log(rep1)
        setConfPub(conf)
        setBooks(filteredBooks)
        setRp1(rep1)
        setRp2(rep2)
        setRp3(rep3)
      }

      const moocs=data?.moocs?.map(({createdAt,updatedAt,collegeName,createdBy,department,__v,_id,hasContentAccess,obtainedScore,proofDocument,faculty,developedModule,platformUsed,dateOfLaunch,facility,eFacility,documentLink,status, ...rest})=>({...rest,"Name of the Faculty":faculty,"Name of the module developed":developedModule,"Name of the module developed":platformUsed,"Date of launch":dateOfLaunch,"Link to the relevant document and facility available in the institution":facility,"List of the e-content development facility available ":eFacility, "Proof Of Document": proofDocument,"Document Link":documentLink,"Status":status}))

      const projects=data?.projects?.map(({createdAt,collegeName,createdBy,department,__v,_id,hasContentAccess,title,principleInvestigator,coPrincipleInvestigator,grantAmount,dateOfSubmission,dateOfGranting,projectStatus,proofDocument,documentLink,...rest})=>({...rest, "Title of Project":title,"Name of Principal Investigator":principleInvestigator,"Name of Co-Principal Investigator":coPrincipleInvestigator,"Amount of Grant":grantAmount,"Date of Submission":dateOfSubmission,"Date of Granting":dateOfGranting,"Status":projectStatus,"Proof Of Document":proofDocument,"Document Link":documentLink}))

      const patents=data?.patents?.map(({createdAt,collegeName,createdBy,department,__v,_id,hasContentAccess,name,designation,topicName,dateOfFilling,nationalorInternational,proofDocument,documentLink,...rest})=>({...rest,"Department":department,"Name":name,"Designation":designation,"Topic name":topicName,"Date of Filling":dateOfFilling,"National/International":nationalorInternational, "Proof Of Document": proofDocument,"Document Link":documentLink}))

      const sca=data?.studentChapters?.map(({createdAt,collegeName,createdBy,department,__v,_id,hasContentAccess,...rest})=>({...rest, "Proof Of Document": proofDocument}))

      // const confPub=data?.studentChapters?.map(({createdAt,createdBy,proofDocument,department,__v,_id,hasContentAccess,...rest})=>rest)
      
      setMoocs(moocs)
      setProjects(projects)
      setPatents(patents)
      setStudentChapters(sca)

    // }
  },[data, check])



  // const [modifiedDataBooks, setModifiedDataBooks] = useState([]);
  
  // useEffect(() => {
  //   if (books) {
  //     const newModifiedData = books.map(({ proofDocument, ...rest }) => ({
  //       ...rest,
  //     }));
      
  //     setModifiedDataBooks(newModifiedData);
  //   }
  // }, [books]);




  // const modifiedData = 

  // const proofOfDocuments = originalDummyData.map((item) => item.proofOfDocument)


  return (
    <>
      <Header backPage="/" />

      {/* {books?.length > 0 && <ViewDataTable dummyData={modifiedDataBooks} dummy={books} name="Book Published" />} */}
      {projects?.length > 0 && <ViewDataTable dummyData={projects} dummy={projects} name="List of Project Proposals" />}
      {books?.length > 0 && <ViewDataTable dummyData={books} dummy={books} name="Book Published" />} 
      {rp1?.length > 0 && <ViewDataTable dummyData={rp1} dummy={rp1} name="Research Paper Published (Grade-A)" />}
      {rp2?.length > 0 && <ViewDataTable dummyData={rp2} dummy={rp2} name="Research Paper Published (Grade-B)" />}
      {rp3?.length > 0 && <ViewDataTable dummyData={rp3} dummy={rp3} name="Research Paper Published (Grade-C)" />}
      {patents?.length > 0 && <ViewDataTable dummyData={patents} dummy={patents} name="Patent" />}
      {facultyDevelopment?.length > 0 && <ViewDataTable dummyData={facultyDevelopment} dummy={facultyDevelopment} name="Faculty Development Programmes" />}
      {competition?.length > 0 && <ViewDataTable dummyData={competition} dummy={competition} name="Competition" />}
      {seminar?.length > 0 && <ViewDataTable dummyData={seminar} dummy={seminar} name="Seminar" />}
      {conf?.length > 0 && <ViewDataTable dummyData={conf} dummy={conf} name="Conference" />}
      {lecture?.length > 0 && <ViewDataTable dummyData={lecture} dummy={lecture} name="Talks & Distinguished Lecture Series" />}
      {workshop?.length > 0 && <ViewDataTable dummyData={workshop} dummy={workshop} name="Workshop" />}
      {industrialTour?.length > 0 && <ViewDataTable dummyData={industrialTour} dummy={industrialTour} name="Industrial Tour" />}
      {hackathon?.length > 0 && <ViewDataTable dummyData={hackathon} dummy={hackathon} name="Hackathon" />}
      {consultancy?.length > 0 && <ViewDataTable dummyData={consultancy} dummy={consultancy} name="Consultancy" />}
      {studentChapters?.length > 0 && <ViewDataTable dummyData={studentChapters} dummy={studentChapters} name="Student Chapter Activity" />}
      {confPub?.length > 0 && <ViewDataTable dummyData={confPub} dummy={confPub} name="Comference Publication" />}
      {trimentor?.length > 0 && <ViewDataTable dummyData={trimentor} dummy={trimentor} name="Tri-Mentoring System" />}
      {moocs?.length > 0 && <ViewDataTable dummyData={moocs} dummy={moocs} name="Moocs" />}
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
