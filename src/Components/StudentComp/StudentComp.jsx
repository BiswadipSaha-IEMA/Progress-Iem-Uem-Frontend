import React, { useEffect, useState } from "react";
import IEM from "../../assets/IEM.png";
import UEM from "../../assets/UEM.png";
import { FaBookBookmark } from "react-icons/fa6";
import { CiFilter, CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DataTable from "react-data-table-component";
import { TfiMenuAlt } from "react-icons/tfi";
// import "./customScrollbar.css";
import { RxCrossCircled } from "react-icons/rx";
import NoFilesPresent from "../../Lottie/NoFilesPresent.json";
import Lottie from "react-lottie";
import { useGetReq } from "../../hooks/useHttp";
import ManagePopUp from "../../utils/Popup/FormPopUp/ManagePopUp";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SeminarPopUp from "../../utils/Popup/FormPopUp/SeminarPopUp";

function BookPublished() {
  const [recordsOfBp, setRecordsOfBp] = useState([]);
  const [recordsOfGA, setRecordsOfGA] = useState([]);
  const [recordsOfGB, setRecordsOfGB] = useState([]);
  const [recordsOfGC, setRecordsOfGC] = useState([]);
  const [recordsOfConf, setrecordsOfConf] = useState([]);
  const [recordsOfTalk, setrecordsOfTalk] = useState([]);
  const [recordsOfMOOC, setRecordsOfMOOC] = useState([]);
  const [recordsOfTriMentoring, setRecordsOfTriMentoring] = useState([]);
  const [getReq] = useGetReq();
  const [storeData, setStoreData] = useState(null);
  const bookDataArr = [];
  const [bookDataArrState, setBookDataArrState] = useState(null);
  const [gradeADataArrState, setGradeADataArrState] = useState(null);
  const [gradeBDataArrState, setGradeBDataArrState] = useState(null);
  const [gradeCDataArrState, setGradeCDataArrState] = useState(null);
  const [bookDataSubmittedArrState, setBookDataSubmittedArrState] =
    useState(null);
  const [originalData] = useState(bookDataArrState);
  const [bpPopUp, setBpPopUp] = useState(false);
  const [raPopUp, setRaPopUp] = useState(false);
  const [rbPopUp, setRbPopUp] = useState(false);
  const [rcPopUp, setRcPopUp] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState(false);
  const [seminarOrg, setSeminarOrg] = useState([]);
  const [seminarArrState, setSeminarArrState] = useState([]);
  const [seminarPopUp, setSeminarPopUp] = useState(false);

  const [patentOrg, setPatentOrg] = useState([]);
  const [patentArrState, setPatentArrState] = useState([]);
  const [patentPopUp, setPatentPopUp] = useState(false);




  const navigate = useNavigate();


  const [confOrg, setConfOrg] = useState([]);
  const [confArrState, setConfArrState] = useState([]);
  const [confPopUp, setConfPopUp] = useState(false);

  const [talkOrg, setTalkOrg] = useState([]);
  const [talkArrState, setTalkArrState] = useState([]);
  const [talkPopUp, setTalkPopUp] = useState(false);


  // Workshop 
const [workOrg, setWorkOrg] = useState([]);
const [workArrState, setWorkArrState] = useState([]);
const [workPopUp, setWorkPopUp] = useState(false);

// Industrial Tour

  const [IndusOrg, setIndusOrg] = useState([]);
  const [IndusArrState, setIndusArrState] = useState([]);
  const [IndusPopUp, setIndusPopUp] = useState(false);

  const [competitionOrg, setCompetitionOrg] = useState([]);
  const [competitionArrState, setCompetitionArrState] = useState([]);
  const [competitionPopUp, setCompetitionPopUp] = useState(false)

  const [studentChapter , setStudentChapter] = useState([]);
  const [studentChapterArrState, setStudentChapterArrState] = useState([]);
  const [studentChapterPopUp, setPopUp] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: NoFilesPresent,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  // const accessTokenObj = JSON.parse(accessToken);
  // console.log(`${accessToken}`);
  // console.log({})

  useEffect(() => {
    const allInfo = async () => {
      const response = await getReq(
        "api/v1/document/getAllPublications",
        accessToken
      );
      if (response.success) {
        setStoreData(response.data.data);
        setBookDataSubmittedArrState(response.data.userSubmittedCounts);
        console.log(response);
      }
    };
    allInfo();
  }, []);


  useEffect(() => {
    const ConferenceDataFunc = async () => {
      try {
        const seminarData = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log("sgdbkdbcknc", seminarData);

        let arr=[]

        if (seminarData) {
          const filteredItems = seminarData.data.data.map(
            (item) => {
              if(item.eventType === "Conference")
                arr.push(item)

              console.log(item)
              
              }

          );
          setConfArrState(arr);
          setConfOrg(arr);
        }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    ConferenceDataFunc();
  }, []);

  useEffect(() => {
    if (confOrg) console.log("uhgduiochnijmcp;okmokmok,opl,p",confOrg);
  }, [confOrg]);

  useEffect(() => {
    const patentDataFunc = async () => {
      try {
        const seminarData = await getReq(
          "api/v1/document/getAllPatents",
          accessToken
        );
        console.log("sgdbkdbcknc", seminarData);
        
        if (seminarData) {
          setPatentOrg(seminarData.data.data);
          setPatentArrState(seminarData.data.data);
          console.log("lkhqoinqkxm;m,;mn;m;",seminarData.data.data);
        }
        // let arr = [];

        // if (seminarData) {
        //   // const filteredItems = seminarData.data.data.map((item) => {
        //   //   if (item.eventType === "Patent") arr.push(item);

        //   //   console.log(item);
        //   // });
        //   setPatentArrState(arr);
        //   setPatentOrg(arr);
        // }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    patentDataFunc();
  }, []);

  useEffect(()=>{
    if(patentOrg)
    console.log('kugsbixkbnkbkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',patentOrg)
  },[patentOrg])


  
  useEffect(() => {
    const TalksDataFunc = async () => {
      try {
        const talkData = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log("sgdbkdbcknc", talkData);

        
        if (talkData) {
          let arr=[]
          const filteredItems = talkData.data.data.map(
            (item) => {
              if(item.eventType === "Lecture")
                arr.push(item)

              console.log(item)
              
              }

          );
          setTalkArrState(arr);
          setTalkOrg(arr);
          // setTalkArrState(filteredItems);
          // setTalkOrg(filteredItems);
        }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    TalksDataFunc();
  }, []);


  useEffect(() => {
    const workshopDataFunc = async () => {
      try {
        const seminarData = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log("sgdbkdbcknc", seminarData);

        let arr=[]

        if (seminarData) {
          const filteredItems = seminarData.data.data.map(
            (item) => {
              if(item.eventType === "Workshop")
                arr.push(item)

              console.log(item)
              
              }

          );
          setWorkArrState(arr);
          setWorkOrg(arr);
        }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    workshopDataFunc();
  }, []);

  useEffect(() => {
    if (workOrg) console.log("uhgduiochnijmcp;okmokmok,opl,p",workOrg);
  }, [workOrg]);

  




  useEffect(() => {
    const indusDataFunc = async () => {
      try {
        const seminarData = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log("sgdbkdbcknc", seminarData);

        let arr=[]

        if (seminarData) {
          const filteredItems = seminarData.data.data.map(
            (item) => {
              if(item.eventType === "Industrial Tour")
                arr.push(item)

              console.log(item)
              
              }

          );
          setIndusArrState(arr);
          setIndusOrg(arr);
        }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    indusDataFunc();
  }, []);

  useEffect(() => {
    const getMOOCData = async () => {
      try {
        const response = await getReq('api/v1/document/getAllMoocs', accessToken);
        if (response.success) {
          console.log(response.data);
          setRecordsOfMOOC(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMOOCData();
  }, []);
  useEffect(() => {
    const getTriMentoringData = async () => {
      try {
        const response = await getReq('api/v1/document/getAllEvents', accessToken);
        if (response.success) {
          console.log(response.data);
          setRecordsOfTriMentoring(response.data.data.filter(item => item.eventType === 'Tri-Mentoring'));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTriMentoringData();
  }, []);

  useEffect(() => {
    const seminarDataFunc = async () => {
      try {
        const seminarData = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log("sgdbkdbcknc", seminarData);

        let arr=[]

        if (seminarData) {
          const filteredItems = seminarData.data.data.map(
            (item) => {
              if(item.eventType === "Seminar")
                arr.push(item)

              console.log(item)
              
              }

          );
          setSeminarArrState(arr);
          setSeminarOrg(arr);
        }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    seminarDataFunc();
  }, []);

  useEffect(() => {
    if (IndusOrg) console.log("uhgduiochnijmcp;okmokmok,opl,p",IndusOrg);
  }, [IndusOrg]);


  useEffect(() => {
    const competitionDataFunc = async () => {
      try {
        const seminarData = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log("sgdbkdbcknc", seminarData);

        let arr=[]

        if (seminarData) {
          const filteredItems = seminarData.data.data.map(
            (item) => {
              if(item.eventType === "Seminar")
                arr.push(item)

              console.log(item)
              
              }

          );
          setCompetitionArrState(arr);
          setCompetitionOrg(arr);
        }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    competitionDataFunc();
  }, []);

  useEffect(() => {
    const studentChapterFunc = async () => {
      try {
        const studentChapterData = await getReq(
          "api/v1/document/getAllStudentChapters",
          accessToken
        );
        

        // let arr=[]

        if (studentChapterData) {
          // const filteredItems = studentChapterData.data.data.map(
          //   (item) => {
          //     if(item.eventType === "Seminar")
          //       arr.push(item)

          //     console.log(item)
              
          //     }

          // );
          console.log( "gdfuygd----------" ,studentChapterData.data.data)
          setStudentChapterArrState(studentChapterData.data.data);
          setStudentChapter(studentChapterData.data.data);
        }
      } catch (error) {
        console.error("Error fetching seminar data:", error);
      }
    };

    studentChapterFunc();
  }, []);


  useEffect(() => {
    console.log(storeData);
    if (storeData !== null) {
      console.log(bookDataSubmittedArrState);
      const booksData = storeData.map((item) => {
        return item.publicationType === "Book";
      });

      for (let i = 0; i < booksData.length; i++) {
        if (booksData[i] === true) {
          bookDataArr.push(storeData[i]);
        }
      }
      setBookDataArrState(bookDataArr);
    }
  }, [storeData]);

  useEffect(() => {
    console.log(bookDataArrState);
    if (bookDataArrState !== null) setRecordsOfBp(bookDataArrState);
  });

  useEffect(() => {
    if (storeData !== null) {
      const gradeAData = storeData.filter(
        (item) => item.publicationGrade === "Grade-A"
      );
      setGradeADataArrState(gradeAData);
    }

    if (gradeADataArrState !== null) console.log(gradeADataArrState);
  }, [storeData]);

  useEffect(() => {
    if (gradeADataArrState !== null) setRecordsOfGA(gradeADataArrState);
  }, [gradeADataArrState]);

  useEffect(() => {
    if (storeData !== null) {
      const gradeBData = storeData.filter(
        (item) => item.publicationGrade === "Grade-B"
      );
      setGradeBDataArrState(gradeBData);
    }

    if (gradeBDataArrState !== null) console.log(gradeBDataArrState);
  }, [storeData]);

  useEffect(() => {
    if (storeData !== null) {
      const gradeCData = storeData.filter(
        (item) => item.publicationGrade === "Grade-C"
      );
      setGradeCDataArrState(gradeCData);
    }

    if (gradeCDataArrState !== null) console.log(gradeCDataArrState);
  }, [storeData]);

  useEffect(() => {
    if (gradeBDataArrState !== null) setRecordsOfGB(gradeBDataArrState);
  }, [gradeBDataArrState]);

  useEffect(() => {
    if (gradeCDataArrState !== null) setRecordsOfGC(gradeCDataArrState);
  }, [gradeCDataArrState]);

  useEffect(() => {
    if (storeData !== null) {
      const gradeCData = storeData.filter(
        (item) => item.publicationGrade === "Grade-C"
      );
      setGradeBDataArrState(gradeCData);
    }

    if (gradeCDataArrState !== null) console.log(gradeCDataArrState);
  }, [storeData]);

  useEffect(() => {
    if (gradeCDataArrState !== null) setRecordsOfGB(gradeCDataArrState);
  }, [gradeCDataArrState]);

  useEffect(() => {
    console.log("====================================");
    console.log("hvbvikhoigbuyfybukbj", recordsOfBp);
    console.log("====================================");
    setRecordsOfBp(recordsOfBp);
    if (recordsOfBp === "") setRecordsOfBp(bookDataArrState);
  }, [recordsOfBp]);

  // useEffect(()=>{
  //   if(bookDataArr!==null && bookDataSubmittedArrState!== null){
  //     for(let i=0; i<bookDataSubmittedArrState.length;i++){
  //       // const margeData= bookDataArr.forEach((element)=>{
  //       //   if(element.createdBy=== bookDataSubmittedArrState.)
  //       // })
  //       console.log('====================================');
  //       console.log('nnklnbdlqendqledlqbndlednb');
  //       console.log('====================================');
  //       console.log(bookDataSubmittedArrState)
  //     }
  //   }
  // })

  const columnsBp = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1} 
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Name</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Book Name</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.title}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          ISBN/ISSN No.
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.isbn}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Publisher Name
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.publisher}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Published Date
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Submitted Forms
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-blue-500">
          {row.submitted}
        </div>
      ),
    },
  ];

  const columns = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1} 
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Name</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.name}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full h-full overflow-hidden flex-wrap select-none flex justify-center items-center">
          <div>Journal</div>
          <div>/conference/</div>
          <div>Bookchapter</div>
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.journalName}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Paper Name</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.title}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Vol. No.</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.vol}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Issue No.</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.issue}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">pp No.</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.pp}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Published Date
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Submitted Forms
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-blue-500">
          {row.submitted}
        </div>
      ),
    },
  ];


  const columnsConf = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1} 
        </div>
      ),
      sortable: true,
    },
    
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Organizing Institute
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.organizedBy}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Topic Name</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.topicName}
        </div>
      ),
    },

    {
      name: <div className="w-full select-none flex justify-center">Date</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Attended By
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.attendedBy}
        </div>
      ),
    },
    // {
    //   name: (
    //     <div className="w-full select-none flex justify-center">
    //       Submitted Forms
    //     </div>
    //   ),
    //   cell: (row) => (
    //     <div className="w-full select-none flex justify-center items-center text-blue-500">
    //       {row.submitted}
    //     </div>
    //   ),
    // },
  ];
  const columnsTalks = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1} 
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Personality Name and Organization
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.organizedBy}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Date</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
    },

    {
      name: <div className="w-full select-none flex justify-center">Topic</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.topicName}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Attended By
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.attendedBy}
        </div>
      ),
    },
    // {
    //   name: (
    //     <div className="w-full select-none flex justify-center">
    //       Submitted Forms
    //     </div>
    //   ),
    //   cell: (row) => (
    //     <div className="w-full select-none flex justify-center items-center text-blue-500">
    //       {row.submitted}
    //     </div>
    //   ),
    // },
  ];


  const columnsWorkshop = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1} 
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Organizing Institute
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.organizedBy}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Name</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.topicName}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Date</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Attended By</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.attendedBy}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Type</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.type}
        </div>
      ),
      sortable: true,
    },
  ];



  const columnsIndustrialTour = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1} 
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">Organizing By</div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.organizedBy}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Date</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Industry Name</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.organizedBy}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Attended By</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.attendedBy}
        </div>
      ),
      sortable: true,
    },
  ];

  const columnsMOOC = [
    {
      name: <div className="w-full select-none flex justify-center text-[16px]">SL. No.</div>,
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Faculty Name</div>,
      selector: row => row.faculty,
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Module</div>,
      selector: row => row.developedModule,
    },
    {
      name: <div className="w-full select-none flex justify-center">Platform</div>,
      selector: row => row.platformUsed,
    },
    {
      name: <div className="w-full select-none flex justify-center">Date of Launch</div>,
      selector: row => row.dateOfLaunch,
    },
    {
      name: <div className="w-full select-none flex justify-center">Facility</div>,
      selector: row => row.facility,
    },
  ];
  const columnsTriMentoring = [
    {
      name: <div className="w-full select-none flex justify-center text-[16px]">SL. No.</div>,
      cell: (row, index) => <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">{index + 1}</div>,
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Organized By</div>,
      selector: row => row.organizedBy,
      sortable: true,
    },
    {
      name: <div className="w-full select-none flex justify-center">Taken By</div>,
      selector: row => row.takenBy,
    },
    {
      name: <div className="w-full select-none flex justify-center">Date</div>,
      selector: row => row.date,
    },
    {
      name: <div className="w-full select-none flex justify-center">Status</div>,
      selector: row => row.status,
    },
  ];

    //patent
    const columnsPatent = [
      {
        name: (
          <div className="w-full select-none flex justify-center text-[16px]">
            SL. No.
          </div>
        ),
        cell: (row, index) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
            {index + 1} 
          </div>
        ),
        sortable: true,
      },
      {
        name: <div className="w-full select-none flex justify-center">Name</div>,
        cell: (row) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800">
            {row.name}
          </div>
        ),
        sortable: true,
      },
      {
        name: (
          <div className="w-full h-full overflow-hidden flex-wrap select-none flex justify-center items-center">
            Department
          </div>
        ),
        cell: (row) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800">
            {row.department}
          </div>
        ),
      },
      {
        name: (
          <div className="w-full select-none flex justify-center">Name</div>
        ),
        cell: (row) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800">
            {row.name}
          </div>
        ),
      },
      {
        name: (
          <div className="w-full select-none flex justify-center">Designation</div>
        ),
        cell: (row) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800">
            {row.designation}
          </div>
        ),
      },
      {
        name: (
          <div className="w-full select-none flex justify-center">Topic name</div>
        ),
        cell: (row) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800">
            {row.topicName}
          </div>
        ),
      },
      {
        name: (
          <div className="w-full select-none flex justify-center">Date of Filling</div>
        ),
        cell: (row) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800">
            {row.dateOfFiling}
          </div>
        ),
      },
      {
        name: (
          <div className="w-full select-none flex justify-center">
            National/International
          </div>
        ),
        cell: (row) => (
          <div className="w-full select-none flex justify-center items-center text-gray-800">
            {row.nationalOrInternational}
          </div>
        ),
      },
      // {
      //   name: (
      //     <div className="w-full select-none flex justify-center">
      //       Submitted Forms
      //     </div>
      //   ),
      //   cell: (row) => (
      //     <div className="w-full select-none flex justify-center items-center text-blue-500">
      //       {row.submitted}
      //     </div>
      //   ),
      // },
    ];

  //seminar organized
  const columnsSeminar = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Organizing Institute
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.organizedBy}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full h-full overflow-hidden flex-wrap select-none flex justify-center items-center">
          Topic Name
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.topicName}
        </div>
      ),
    },
    {
      name: <div className="w-full select-none flex justify-center">Date</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Attended By
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.attendedBy}
        </div>
      ),
    },
    {
      name: <div className="w-full select-none flex justify-center">Type</div>,
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.type}
        </div>
      ),
    },
    // {
    //   name: (
    //     <div className="w-full select-none flex justify-center">pp No.</div>
    //   ),
    //   cell: (row) => (
    //     <div className="w-full select-none flex justify-center items-center text-gray-800">
    //       {row.pp}
    //     </div>
    //   ),
    // },
    // {
    //   name: (
    //     <div className="w-full select-none flex justify-center">
    //       Published Date
    //     </div>
    //   ),
    //   cell: (row) => (
    //     <div className="w-full select-none flex justify-center items-center text-gray-800">
    //       {row.date}
    //     </div>
    //   ),
    // },
    // {
    //   name: (
    //     <div className="w-full select-none flex justify-center">
    //       Submitted Forms
    //     </div>
    //   ),
    //   cell: (row) => (
    //     <div className="w-full select-none flex justify-center items-center text-blue-500">
    //       {row.submitted}
    //     </div>
    //   ),
    // },
  ];


  const columnsCompetition = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          SL. No.
        </div>
      ),
      cell: (row, index) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {index + 1} 
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Event Date
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.date}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Competition Type
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.type}
        </div>
      ),
    },
    {
      name: (
        <div className="w-full select-none flex justify-center">
          Competition Name
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800">
          {row.topicName}
        </div>
      ),
    },
  ]


  const columnsStudentChapter = [
    {
      name: (
        <div className="w-full select-none flex justify-center text-[16px]">
          Order No
        </div>
      ),
      cell: (row) => (
        <div className="w-full select-none flex justify-center items-center text-gray-800 text-[16px]">
          {row.serial}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="flex justify-center w-full select-none">Faculty Name</div>,
      cell: (row) => (
        <div className="flex items-center justify-center w-full text-gray-800 select-none">
          {row.facultyName}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="flex justify-center w-full select-none">Company Name</div>,
      cell: (row) => (
        <div className="flex items-center justify-center w-full text-gray-800 select-none">
          {row.companyName}
        </div>
      ),
      sortable: true,
    },
    {
      name: <div className="flex justify-center w-full select-none">Order 
      Amount
      (Rs./-)
      </div>,
      cell: (row) => (
        <div className="flex items-center justify-center w-full text-gray-800 select-none">
          {row.orderAmount}
        </div>
      ),
      sortable: true,
    },
    {
      name: (
        <div className="flex justify-center w-full select-none">
          Order Receive Date (Rs./-)

        </div>
      ),
      cell: (row) => (
        <div className="flex items-center justify-center w-full text-gray-800 select-none">
          {row.dateOfOrder}
        </div>
      ),
    },
    {
      name: (
        <div className="flex justify-center w-full select-none">
          Status
(Ongoing/ Completed)

        </div>
      ),
      cell: (row) => (
        <div className="flex items-center justify-center w-full text-gray-800 select-none">
          {row.activityStatus}
        </div>
      ),
    },
  ];




  const handleSearchConf = (event) => {
    const searchValue = event.target.value.toLowerCase();
    console.log("====================================");
    console.log(searchValue);
    console.log("====================================");

    if (searchValue === "") {
      // Reset to the original data if the search input is empty
      setrecordsOfConf(gradeCDataArrState);
    } else {
      // Filter the original records based on the search value
      const filteredData = gradeCDataArrState.filter((row) =>
        row.name.toLowerCase().includes(searchValue)
      );
      setrecordsOfConf(filteredData);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    console.log("====================================");
    console.log(searchValue);
    console.log("====================================");

    const filteredData = recordsOfBp.filter((row) =>
      row.name.toLowerCase().includes(searchValue)
    );
    // console.log("iugcibqb", filteredData)
    setRecordsOfBp(filteredData);
    if (searchValue === "") setRecordsOfBp(bookDataArrState);
  };

  const handleSearchSeminar = (event) => {
    const searchValue = event.target.value.toLowerCase();
    console.log("====================================");
    console.log(searchValue);
    console.log("====================================");

    const filteredData = seminarOrg.filter((row) =>
      row.topicName.toLowerCase().includes(searchValue)
    );
    console.log("iugcibqb", filteredData)
    setSeminarOrg(filteredData);
    if (searchValue === "") setSeminarOrg(seminarArrState);
  };

  
  const handleSearchRa = (event) => {
    const searchValue = event.target.value.toLowerCase();
    console.log("====================================");
    console.log(searchValue);
    console.log("====================================");

    const filteredData = recordsOfGA.filter((row) =>
      row.name.toLowerCase().includes(searchValue)
    );
    // console.log("iugcibqb", filteredData)
    setRecordsOfGA(filteredData);
    if (searchValue === "") setRecordsOfGA(gradeADataArrState);
  };
  const handleSearchRb = (event) => {
    const searchValue = event.target.value.toLowerCase();
    console.log("====================================");
    console.log(searchValue);
    console.log("====================================");

    const filteredData = recordsOfGB.filter((row) =>
      row.name.toLowerCase().includes(searchValue)
    );
    // console.log("iugcibqb", filteredData)
    setRecordsOfGB(filteredData);
    if (searchValue === "") setRecordsOfGB(gradeBDataArrState);
  };
  const handleSearchRc = (event) => {
    const searchValue = event.target.value.toLowerCase();
    console.log("====================================");
    console.log(searchValue);
    console.log("====================================");

    const filteredData = recordsOfGC.filter((row) =>
      row.name.toLowerCase().includes(searchValue)
    );
    // console.log("iugcibqb", filteredData)
    setRecordsOfGC(filteredData);
    if (searchValue === "") setRecordsOfGC(gradeCDataArrState);
  };

  const handleSearchWorkshop = (event) => {
    // const searchValue = event.target.value.toLowerCase();
    // const filteredData = recordsOfWorkshop.filter((row) =>
    //   row.name.toLowerCase().includes(searchValue)
    // );
    // setRecordsOfWorkshop(filteredData);
    // if (searchValue === "") setRecordsOfWorkshop
  };


  const [currentMonth, setCurrentMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [calendarShow, setCalendarShow] = useState(false);

  const onDateChange = (date) => {
    setCurrentMonth(
      new Date(date).toLocaleString("default", { month: "long" })
    );
    setCalendarShow(false);
  };

  const handleCloseCalendar = (e) => {
    if (e.target.id === "calendar-overlay") {
      setCalendarShow(false);
    }
  };

  return (
    <>
      <div className="flex justify-between px-5 sm:px-10 py-5 relative">
        <img src={IEM} alt="IEM" className="h-20 w-16 mr-4" />
        <div
          className="absolute bottom-0 flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/moderator/dashboard");
          }}
        >
          <FaLongArrowAltLeft className="text-[1rem]" />
          <div className="font-[700]">Back</div>
        </div>
        <div className="relative mt-4 sm:mt-10">
          <div
            className="text-[2rem] sm:text-[4rem] lg:text-[6rem] font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
            style={{
              backgroundImage: "radial-gradient(circle, #fff, #cceeff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            IEM-UEM
          </div>
          <div className="absolute top-[20%] sm:top-[38%] left-[10%] sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
            IEM - UEM Progress
          </div>
        </div>
        <img src={UEM} alt="UEM" className="h-20 w-16 mr-4" />
      </div>

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Books Published
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearch}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {recordsOfBp.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsBp}
              data={recordsOfBp}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0"
            />
          )}
        </div>
        {recordsOfBp?.length > 1 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setBpPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

      {/* Research Paper Published (Grade-A) -(SCI, SCIE, Scopus, WoS, ESCI,
        Nature) */}

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Research Paper Published (Grade-A) -(SCI, SCIE, Scopus, WoS, ESCI,
              Nature)
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchRa}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {recordsOfGA.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={recordsOfGA}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0"
            />
          )}
        </div>
        {recordsOfGA?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setRaPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

      {/* Research Paper Published (Grade-B) -(SCI, SCIE, Scopus, WoS, ESCI,
        Nature) */}

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Research Paper Published (Grade-B) -(SCI, SCIE, Scopus, WoS, ESCI,
              Nature)
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchRb}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {recordsOfGB.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={recordsOfGB}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>
        {recordsOfGB?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setRbPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

      {/* Research Paper Published (Grade-C) -(SCI, SCIE, Scopus, WoS, ESCI,
        Nature) */}

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Research Paper Published (Grade-C) -(SCI, SCIE, Scopus, WoS, ESCI,
              Nature)
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchRc}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {recordsOfGC.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={recordsOfGC}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>

        {recordsOfGC?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setRcPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

         {/* Conference*/}
         <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Conference
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchConf}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {confOrg.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsConf}
              data={confOrg}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0"
            />
          )}
        </div>

        {recordsOfConf.length > 3  && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none" />
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => setConfPopUp(true)}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

      {/* Talks and Distinguished Lecture Series */}
      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Talks and Distinguished Lecture Series
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchRc}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {talkOrg.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsTalks}
              data={talkOrg}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>

        {recordsOfTalk?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setRcPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

      {/* Workshop Organized / Attended */}

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
            Workshop Organized / Attended
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchWorkshop}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {workOrg.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
               <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsWorkshop}
              data={workOrg}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>

        {workOrg?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setWorkshopPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>


      {/* Industrial Tour ( Real / Virtual) */}


      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
            Industrial Tour ( Real / Virtual)
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchWorkshop}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {IndusOrg.length === 2 ? (
            <div className="flex flex-col items-center justify-center h-full">
               <Lottie options={defaultOptions} height={200} width={200} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsIndustrialTour}
              data={IndusOrg}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>

        {IndusOrg?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setIndusOrg(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

         {/* MOOCs Table content */}
<div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
    <div className="flex items-center gap-5 mb-4 sm:mb-0">
      <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
      <div className="text-[20px] sm:text-[25px] font-semibold">MOOCs</div>
    </div>

    <div className="relative w-full sm:w-auto">
      <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
      <input
        className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
        onChange={(e) => handleSearch(e, setRecordsOfMOOC, recordsOfMOOC)}
        placeholder="Search with Name..."
      />
    </div>
  </div>

  <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
    <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
      <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
    </div>

    <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
      <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
      <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">Sort: Chronological</div>
    </div>

    <div
      className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
      onClick={() => setCalendarShow(true)}
    >
      <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">{currentMonth}</div>
    </div>
  </div>

  <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
    {recordsOfMOOC.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full">
        <Lottie options={defaultOptions} height={150} width={150} />
        <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">No Records Found</div>
      </div>
    ) : (
      <DataTable
        columns={columnsMOOC}
        data={recordsOfMOOC}
        defaultSortField="serial"
        defaultSortAsc={true}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#def4ff",
              color: "#333",
              fontWeight: "bold",
              textAlign: "center",
            },
          },
          headRow: {
            style: {
              backgroundColor: "#def4ff",
              border: "none",
            },
          },
        }}
        className="mt-0"
      />
    )}
  </div>

  {recordsOfMOOC?.length > 2 && (
    <div className="h-[50px] flex justify-center items-center rounded-md relative">
      <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
      <div
        className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
        onClick={() => {
          setMoocPopUp(true);
        }}
      >
        <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
        <div className="text-[#fff]">View Full Data</div>
      </div>
    </div>
  )}
</div>



            {/* Tri-mentoring-table */} 

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Tri-Mentoring
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={(e) => handleSearch(e, setRecordsOfTriMentoring, recordsOfTriMentoring)}
              placeholder="Search with Name..."
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">Sort: Chronological</div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">{currentMonth}</div>
          </div>
        </div>

        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {recordsOfTriMentoring.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsTriMentoring}
              data={recordsOfTriMentoring}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0"
            />
          )}
        </div>
        {recordsOfTriMentoring?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setTriMentoringPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

      {/* Seminar Organized */}
      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Seminar Organized
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchSeminar}
              placeholder="Search with Topic Name"
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {(seminarOrg.length) === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsSeminar}
              data={seminarOrg}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>

        {seminarOrg.length > 1 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
          <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
          <div
            className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
            onClick={() => {
              setSeminarPopUp(true);
            }}
          >
            <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
            <div className="text-[#fff]">View Full Data</div>
          </div>
        </div>
        )}
      </div>



      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
              Patents
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchSeminar}
              placeholder="Search with Topic Name"
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {(patentOrg.length) === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsPatent }
              data={patentOrg}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>

        {patentOrg.length > 1 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
          <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
          <div
            className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
            onClick={() => {
              setSeminarPopUp(true);
            }}
          >
            <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
            <div className="text-[#fff]">View Full Data</div>
          </div>
        </div>
        )}
      </div>



      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
            Competition
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              onChange={handleSearchSeminar}
              placeholder="Search with Topic Name"
            />
          </div>
        </div>

        <div className="w-full flex mt-5 justify-end gap-3 flex-nowrap overflow-x-auto">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {(competitionOrg.length) === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsCompetition }
              data={competitionOrg}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>

        {competitionOrg.length > 1 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
          <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
          <div
            className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
            onClick={() => {
              setSeminarPopUp(true);
            }}
          >
            <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
            <div className="text-[#fff]">View Full Data</div>
          </div>
        </div>
        )}
      </div>

      {/* Student Chapter Activity */ }

      <div className="relative px-5 sm:px-10 pt-10 pb-10 mt-10 rounded-lg backdrop-blur-lg h-full shadow-[0_0_10px_3px_rgba(3,168,253,0.1)] ml-5 mr-5 sm:ml-10 sm:mr-10 mb-10 md:justify-start md:items-start">
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="flex items-center gap-5 mb-4 sm:mb-0">
            <FaBookBookmark className="text-[2rem] text-[#03A8FD]" />
            <div className="text-[20px] sm:text-[25px] font-semibold">
          	Student Chapter Activity 
            </div>
          </div>

          <div className="relative w-full sm:w-auto">
            <CiSearch className="absolute z-10 text-[20px] font-bold top-3 left-2 text-[#b4b7bd]" />
            <input
              className="outline-none w-full sm:w-[300px] lg:w-[300px] pl-10 font-semibold py-2 rounded-[10px] border border-[#03A8FD] backdrop-blur-lg shadow-[0_0_10px_3px_rgba(3,168,253,0.7)]"
              // onChange={handleSearchCO}
              placeholder="Search with Name or ISS..."
            />
          </div>
        </div>

        <div className="flex justify-end w-full gap-3 mt-5 overflow-x-auto flex-nowrap">
          <div className="border rounded-md border-[#b4b7bd] px-2 py-1 flex-shrink-0 text-[#b4b7bd] hidden md:block lg:block">
            <CiFilter className="text-[0.85rem] sm:text-[0.75rem] md:text-[1rem] pt-1 font-[700]" />
          </div>

          <div className="border rounded-md border-[#b4b7bd] flex items-center gap-2 px-3 sm:px-4 md:px-5 py-1 flex-shrink-0 text-[#b4b7bd]">
            <GoSortDesc className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.95rem]" />
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              Sort: Chronological
            </div>
          </div>

          <div
            className="border rounded-md border-[#b4b7bd] flex items-center px-2 sm:px-3 gap-2 sm:gap-3 md:gap-5 cursor-pointer flex-shrink-0 text-[#b4b7bd]"
            onClick={() => setCalendarShow(true)}
          >
            <div className="text-[0.85rem] sm:text-[0.75rem] md:text-[0.85rem]">
              {currentMonth}
            </div>
          </div>

          {calendarShow && (
            <div
              id="calendar-overlay"
              className="fixed top-[150px] bg-opacity-50 flex justify-center items-center left-[-30px] z-50"
              onClick={handleCloseCalendar}
            >
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <Calendar onChange={onDateChange} />
              </div>
            </div>
          )}
        </div>

        {/* DataTable Container */}
        <div className="mt-10 h-[150px] overflow-hidden custom-scrollbar rounded-[10px]">
          {studentChapter.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Lottie options={defaultOptions} height={150} width={150} />
              <div className="sm:text-[1.5rem] lg:text-[2rem] font-bold text-[#03A8FD]">
                No Records Found
              </div>
            </div>
          ) : (
            <DataTable
              columns={columnsStudentChapter}
              data={studentChapter}
              defaultSortField="serial"
              defaultSortAsc={true}
              customStyles={{
                headCells: {
                  style: {
                    backgroundColor: "#def4ff",
                    color: "#333",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "#def4ff",
                    border: "none",
                  },
                },
              }}
              className="mt-0" // Adjust this if needed
            />
          )}
        </div>
        {studentChapter?.length > 2 && (
          <div className="h-[50px] flex justify-center items-center rounded-md relative">
            <div className="absolute top-[-20px] left-0 right-0 h-[30px] bg-black bg-opacity-20 blur-md z-[-1] rounded-t-md pointer-events-none"></div>
            <div
              className="cursor-pointer bg-[#03a8fd] h-[40px] flex items-center justify-center gap-4 p-2 pl-2 pr-2 rounded-lg shadow-lg"
              onClick={() => {
                setRbPopUp(true);
              }}
            >
              <TfiMenuAlt className="text-[#fff] text-[20px] mt-0.5" />
              <div className="text-[#fff]">View Full Data</div>
            </div>
          </div>
        )}
      </div>

      {bpPopUp && (
        <ManagePopUp
          setUtilFor={"viewBPTable"}
          setPopupShow={setBpPopUp}
          takeData={[columnsBp, recordsOfBp]}
        />
      )}
      {raPopUp && (
        <ManagePopUp
          setUtilFor={"viewRATable"}
          setPopupShow={setRaPopUp}
          takeData={[columns, recordsOfGA]}
        />
      )}
      {rbPopUp && (
        <ManagePopUp
          setUtilFor={"viewRBTable"}
          setPopupShow={setRbPopUp}
          takeData={[columns, recordsOfGB]}
        />
      )}
      {rcPopUp && (
        <ManagePopUp
          setUtilFor={"viewRCTable"}
          setPopupShow={setRcPopUp}
          takeData={[columns, recordsOfGC]}
        />
      )}
      {seminarPopUp && (
        <SeminarPopUp
          setUtilFor={"viewSeminarTable"}
          setPopupShow={setSeminarPopUp}
          takeData={[columnsSeminar, seminarOrg]}
        />
      )}
    </>
  );
}

export default BookPublished;
