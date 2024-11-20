import React, { useState,useEffect } from 'react';
import { dummyData, dummyData as originalDummyData } from '../../../constants/studentData';
import Header from '../../Header/Header';
import { useGetReq } from '../../../hooks/useHttp';
import ModeratorViewTable from './ModeratorViewTable';
import Lottie from "react-lottie";
import noDataFound from "../../../Lottie/noDataFound.json";



const ModeratorTableData = () => {
  const [data, setData] = useState([]);
  const [books,setBooks]=useState([])
  const [booksFull,setBooksFull]=useState([])
  const [rp1,setRp1]=useState([])
  const [rp1Full,setRp1Full]=useState([])
  const [rp2,setRp2]=useState([])
  const [rp2Full,setRp2Full]=useState([])
  const [rp3,setRp3]=useState([])
  const [rp3Full,setRp3Full]=useState([])
  const [confPub,setConfPub]=useState([])
  const [confPubFull,setConfPubFull]=useState([])
  const [moocs,setMoocs]=useState([])
  const [moocsFull,setMoocsFull]=useState([])
  const [patents,setPatents]=useState([])
  const [patentsFull,setPatentsFull]=useState([])
  const [projects,setProjects]=useState([])
  const [projectsFull,setProjectsFull]=useState([])
  const [consultancy,setConsultancy]=useState([])
  const [consultancyFull,setConsultancyFull]=useState([])
  const [studentChapters,setStudentChapters]=useState([])
  const [studentChaptersFull,setStudentChaptersFull]=useState([])
  
  const [workshop,setWorkshop]=useState([])
  const [workshopFull,setWorkshopFull]=useState([])
  const [seminar,setSeminar]=useState([])
  const [seminarFull,setSeminarFull]=useState([])
  const [conf,setConf]=useState([])
  const [confFull,setConfFull]=useState([])
  const [facultyDevelopment,setFacultyDevelopment]=useState([])
  const [facultyDevelopmentFull,setFacultyDevelopmentFull]=useState([])
  const [competition,setCompetition]=useState([])
  const [competitionFull,setCompetitionFull]=useState([])
  const [hackathon,setHackathon]=useState([])
  const [hackathonFull,setHackathonFull]=useState([])
  const [trimentor,setTrimentor]=useState([])
  const [trimentoFull,setTrimentorFull]=useState([])
  const [lecture,setLecture]=useState([])
  const [lectureFull,setLectureFull]=useState([])
  const [industrialTour,setIndustrialTour]=useState([])
  const [industrialTourFull,setIndustrialTourFull]=useState([])
  const [getReq] = useGetReq();
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const department = sessionStorage.getItem("dept");
  const id=sessionStorage.getItem("userId")
  // console.log(typeof(department))


  useEffect(() => {
    const getFaculty = async () => {
      try {
        const response = await getReq(
          `api/v1/document/getAllSubmissions/${department}`,
          accessToken
        );
        if (response.success) {
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
  
  const isAllDataEmpty =
  !(
    projects?.length > 0 ||
    books?.length > 0 ||
    rp1?.length > 0 ||
    rp2?.length > 0 ||
    rp3?.length > 0 ||
    patents?.length > 0 ||
    facultyDevelopment?.length > 0 ||
    competition?.length > 0 ||
    seminar?.length > 0 ||
    conf?.length > 0 ||
    lecture?.length > 0 ||
    workshop?.length > 0 ||
    industrialTour?.length > 0 ||
    hackathon?.length > 0 ||
    consultancy?.length > 0 ||
    studentChapters?.length > 0 ||
    confPub?.length > 0 ||
    trimentor?.length > 0 ||
    moocs?.length > 0
  );
//fot lottie
const options= {
  loop: false,
  autoplay: false,
  animationData: noDataFound,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  }
}

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
 
  useEffect(()=>{
    if(data.publications){

      const workshop=data.events.filter(pub=>pub.eventType==="Workshop").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))

      const workshopFull=data.events.filter(pub=>pub.eventType==="Workshop")
      const seminar=data.events.filter(pub=>pub.eventType==="Seminar").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const seminarFull=data.events.filter(pub=>pub.eventType==="Seminar")
      const confEvent=data.events.filter(pub=>pub.eventType==="Conference").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const confEventFull=data.events.filter(pub=>pub.eventType==="Conference")
      const fdp=data.events.filter(pub=>pub.eventType==="FDP").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const fdpFull=data.events.filter(pub=>pub.eventType==="FDP")
      const competition=data.events.filter(pub=>pub.eventType==="Competiton").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const competitionFull=data.events.filter(pub=>pub.eventType==="Competiton")
      const hackathon=data.events.filter(pub=>pub.eventType==="Hackathon").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const hackathonFull=data.events.filter(pub=>pub.eventType==="Hackathon")
      const trimentor=data.events.filter(pub=>pub.eventType==="Tri-Mentoring").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const trimentorFull=data.events.filter(pub=>pub.eventType==="Tri-Mentoring")
      const lecture=data.events.filter(pub=>pub.eventType==="Lecture").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const lectureFull=data.events.filter(pub=>pub.eventType==="Lecture")
      const itour=data.events.filter(pub=>pub.eventType==="IndustrialTour").map(({createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const itourFull=data.events.filter(pub=>pub.eventType==="IndustrialTour")
      const moocs=data.moocs.map(({createdAt,createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const moocsFull=data.moocs.map(({...rest})=>({...rest}))
      const projects=data.projects.map(({createdAt,createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const projectsFull=data.projects.map(({...rest})=>({...rest}))
      const patents=data.patents.map(({createdAt,createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const patentsFull=data.patents.map(({...rest})=>({...rest}))
      const sca=data.studentChapters.map(({createdAt,createdBy,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const scaFull=data.studentChapters.map(({...rest})=>({...rest}))
      const conf=data.publications.filter(pub=>pub.eventType==="Conference").map(({category,createdBy,obtainedScore,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const confFull=data.publications.filter(pub=>pub.eventType==="Conference")
      const filteredBooks=data.publications.filter(pub=>pub.publicationType==="Book").map(({category, comment, reviewedBy,createdBy,obtainedScore,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const filteredBooksFull=data.publications.filter(pub=>pub.publicationType==="Book")
      const rep1=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-A").map(({createdBy,publicationGrade,publicationType,obtainedScore,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const rep1Full=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-A")
      const rep2=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-B").map(({createdBy,publicationGrade,publicationType,obtainedScore,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const rep2Full=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-B")
      const rep3=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-C").map(({createdBy,publicationGrade,publicationType,obtainedScore,department,__v,hasContentAccess,...rest})=>({...rest,createdBy:createdBy.name}))
      const rep3Full=data.publications.filter(pub=>pub.publicationType==="Research Paper"&&pub.publicationGrade==="Grade-C")
      console.log("first")
      setWorkshop(workshop)
      setWorkshopFull(workshopFull)
      setSeminar(seminar)
      setSeminarFull(seminarFull)
      setConf(confEvent)
      setConfFull(confEventFull)
      setFacultyDevelopment(fdp)
      setFacultyDevelopmentFull(fdpFull)
      setCompetition(competition)
      setCompetitionFull(competitionFull)
      setHackathon(hackathon)
      setHackathonFull(hackathonFull)
      setTrimentor(trimentor)
      setTrimentorFull(trimentorFull)
      setLecture(lecture)
      setLectureFull(lectureFull)
      setIndustrialTour(itour)
      setIndustrialTourFull(itourFull)
      
      setProjects(projects)
      setProjectsFull(projectsFull)
      setPatents(patents)
      setPatentsFull(patentsFull)
      setMoocs(moocs)
      setMoocsFull(moocsFull)
      setStudentChapters(sca)
      setStudentChaptersFull(scaFull)

      setConfPub(conf)
      setConfPubFull(confFull)
      setBooks(filteredBooks)
      setBooksFull(filteredBooksFull)
      setRp1(rep1)
      setRp1Full(rep1Full)
      setRp2(rep2)
      setRp2Full(rep2Full)
      setRp3(rep3)
      setRp3Full(rep3Full)
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

      {isAllDataEmpty ? (
        <div className="flex flex-col justify-center items-center py-8 m-10 bg-white  rounded-lg font-poppins">
        <Lottie options={options} height={400} width={400} />
        <p className="text-[#1A1A1D] mt-2 text-4xl font-semibold text-center" >
          No records available
        </p>
      </div>
      

      // {isAllDataEmpty ? (
      //   <div className="flex justify-center items-center h-screen">
      //   <Lottie options={{ animationData: noDataFound }} height={400} width={400} loop={true}/>
      //   <p className="text-gray-500 mt-4">No data to display</p>
      //   </div>
      ) : (
        <>
      {books.length>0 && <ModeratorViewTable dummyData={books} dummy={books} fullData={booksFull} name={'Book Published'} />}
      {rp1.length>0 && <ModeratorViewTable dummyData={rp1} dummy={rp1} fullData={rp1Full} name={'Research Paper Grade-A'} />}
      {rp2.length>0 && <ModeratorViewTable dummyData={rp2} dummy={rp2} fullData={rp2Full} name={'Research Paper Grade-B'} />}
      {rp3.length>0 && <ModeratorViewTable dummyData={rp3} dummy={rp3} fullData={rp3Full} name={'Research Paper Grade-C'} />}
      {patents.length>0 && <ModeratorViewTable dummyData={patents} dummy={patents} fullData={patentsFull} name={'Patent'} />}
      {projects.length>0 && <ModeratorViewTable dummyData={projects} dummy={projects} fullData={projectsFull} name={'Projects'} />}
      {facultyDevelopment.length>0 && <ModeratorViewTable dummyData={facultyDevelopment} dummy={facultyDevelopment} fullData={facultyDevelopmentFull} name={'Faculty Development Programmes'} />}
      {competition.length>0 && <ModeratorViewTable dummyData={competition} dummy={competition} fullData={competitionFull} name={'Competition'} />}
      {seminar.length>0 && <ModeratorViewTable dummyData={seminar} dummy={seminar} fullData={seminarFull} name={'Seminar'} />}
      {confPub.length>0 && <ModeratorViewTable dummyData={confPub} dummy={confPub} fullData={confPubFull} name={'Conference'} />}
      {lecture.length>0 && <ModeratorViewTable dummyData={lecture} dummy={lecture} fullData={lectureFull} name={'Talks & Distinguished Lecture Series'} />}
      {workshop.length>0 && <ModeratorViewTable dummyData={workshop} dummy={workshop} fullData={workshopFull} name={'Workshop'} />}
      {industrialTour.length>0 && <ModeratorViewTable dummyData={industrialTour} dummy={industrialTour} fullData={industrialTourFull} name={'Industrial Tour'} />}
      {hackathon.length>0 && <ModeratorViewTable dummyData={hackathon} dummy={hackathon} fullData={hackathonFull} name={'Hackathon'} />}
      {consultancy.length>0 && <ModeratorViewTable dummyData={consultancy} dummy={consultancy} fullData={consultancyFull} name={'Consultancy'} />}
      {studentChapters.length>0 && <ModeratorViewTable dummyData={studentChapters} dummy={studentChapters} fullData={studentChaptersFull} name={'Student Chapter Activity'} />}
      {moocs.length>0 && <ModeratorViewTable dummyData={moocs} dummy={moocs} fullData={moocsFull} name={'Moocs'} />}
      {trimentor.length>0 && <ModeratorViewTable dummyData={trimentor} dummy={trimentor} fullData={trimentoFull} name={'Tri-Mentoring System'} />}
        </>
      )}
    </>
  );
};

export default ModeratorTableData;
