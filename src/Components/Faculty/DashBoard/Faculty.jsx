import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaBookBookmark } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import { LuLoader } from "react-icons/lu";
import rolebg from "../../../assets/rolebg.png";
import Sidebar from "../Sidebar/FacultySidebar";
import { useGetReq } from "../../../hooks/useHttp";
import { useNavigate } from "react-router-dom";
import BookPublished from "../../../utils/Popup/FormPopUp/BookPublished";
import MoocsPopUp from "../../../utils/Popup/FormPopUp/MoocsPopUp";
// import ConferencePopUp from "../../../utils/Popup/FormPopUp/ConferencePopUp";
import IndustrialPopup from "../../../utils/Popup/FormPopUp/IndustrialPopup";
import TriMentoringPopUp from "../../../utils/Popup/FormPopUp/TriMentoringPopUp";
import ResearchPaperGradeA from "../../../utils/Popup/FormPopUp/ResearchPaperGradeA";
import ResearchPaperGradeB from "../../../utils/Popup/FormPopUp/ResearchPaperGradeB";
import ResearchPaperGradeC from "../../../utils/Popup/FormPopUp/ResearchPaperGradeC";

export default function Faculty() {
  const [showPopUp, setShowPopUp] = useState(false)
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [showProfile, setShowProfile] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [ConfOrg, setConfOrg] = useState([]);
  const [Moocs, setMoocs] = useState([]);
  const [TriMentor, setTriMentor] = useState([]);
  const [Lecture, setLecture] = useState([]);
  const [researchData, setResearchData] = useState([]);
  const [seminarData, setSeminarData] = useState([]);
  const [WorkOrg, setWorkOrg] = useState([]);
  const [IndTour, setIndTour] = useState([]);
  const [patentData, setPatentData] = useState([]);
  const [fdp, setFdp] = useState([]);
  const [compete, setCompete] = useState([]);
  const [bookPub, setBookPub] = useState(false);
  const [mooc, setmooc] = useState(false);
  const [conference, setConference] = useState(false);
  const [industrial, setIndustrial] = useState(false);
  const [triMentor, settriMentor] = useState(false);
  const [researchPaperGradeAData, setResearchPaperGradeAData] = useState(false);
  const [researchPaperGradeBData, setResearchPaperGradeBData] = useState(false);
  const [researchPaperGradeCData, setResearchPaperGradeCData] = useState(false);
  const toggleProfile = () => setShowProfile((prev) => !prev);
  const navigate = useNavigate();

  const [getReq] = useGetReq();

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  // Pop up form
  useEffect(() => {
    const getBPData = async () => {
        try {
            // API request to fetch all events
            const response = await getReq('api/v1/document/getAllEvents', accessToken)
            
            // Check if the request was successful, then set data in state
            if (response.success) {
                console.log(response.data)
                setData(response.data.data)
                setData1(response.data.data)
            } 
        } catch (error) {
            console.log(error)
        }
    }
    getBPData()
}, [showPopUp])

  useEffect(() => {
    const allInfo = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllPublications",
          accessToken
        );
        console.log(response);
        if (response.success) {
          setBookData(
            response.data.data.filter(
              (publication) => publication.publicationType === "Book"
            )
          );
          setResearchData(
            response.data.data.filter(
              (publication) => publication.publicationType === "Research Paper"
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getConfInfo = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          setConfOrg(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching conference info:", error);
      }
    };

    const getLecture = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          setLecture(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };

    const getMoocs = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllMoocs",
          accessToken
        );
        console.log(response);
        if (response.success) {
          // const arr=[]
          // const filteredData= response.data.data.map((dt)=>{
          //   // if(dt.eventType==="developedModule")
          //     arr.push(dt)
          // })

          setMoocs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching conference info:", error);
      }
    };

    const getTrimentor = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          const filteredData = response.data.data.filter(
            (item) => item.eventType === "Tri-Mentoring"
          );
          console.log("uhuioshoij", filteredData);
          setTriMentor(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getWorkInfo = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          const arr = [];
          const filteredData = response.data.data.map((dt) => {
            if (dt.eventType === "Workshop") arr.push(dt);
          });

          setWorkOrg(arr);
        }
      } catch (error) {
        console.error("Error fetching conference info:", error);
      }
    };

    const getIndTour = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          const arr = [];
          const filteredData = response.data.data.map((dt) => {
            if (dt.eventType === "Industrial Tour") arr.push(dt);
          });

          setIndTour(arr);
        }
      } catch (error) {
        console.error("Error fetching conference info:", error);
      }
    };


    const getPatentInfo = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllPatents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          // const arr = [];
          // const filteredData = response.data.data.map((dt) => {
          //   if (dt.eventType === "Industrial Tour") arr.push(dt);
          // });
          setPatentData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching conference info:", error);
      }
    };

    const getFdpInfo = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          // console.log('====================================');
          // console.log('hnelic--------------------------------------------------------', response.data.data);
          // console.log('====================================');
          const arr = [];
          const filteredData = response.data.data.map((dt) => {
            if (dt.eventType === "FDP") {
              arr.push(dt);
            }
          });
          // console.log('====================================');
          // console.log('lhini---------------------------');
          // console.log('====================================');
          setFdp(arr);
        }
      } catch (error) {
        console.error("Error fetching conference info:", error);
      }
    };

    const getCompeteInfo = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        console.log(response);
        if (response.success) {
          console.log('====================================');
          console.log('hnelic--------------------------------------------------------', response.data.data);
          console.log('====================================');
          const arr = [];
          const filteredData = response.data.data.map((dt) => {
            if (dt.eventType === "COMPETITION") {
              arr.push(dt);
            }
          });
          // console.log('====================================');
          // console.log('lhini---------------------------');
          // console.log('====================================');
          setCompete(arr);
        }
      } catch (error) {
        console.error("Error fetching conference info:", error);
      }
    };

  
    allInfo();
    getConfInfo();
    getLecture();
    getWorkInfo();
    getIndTour();
    getMoocs();
    getTrimentor();
    getPatentInfo()
    getFdpInfo()
    
  }, [accessToken]);

  const groupResearchByGrade = (grade) => {
    return researchData.filter((paper) => paper.publicationGrade === grade);
  };

  const items = [
    {
      title: "Books Published",
      details: bookData.map((book) => ({
        title: book.title,
        status: book.status,
      })),
    },
    {
      title: "Research Paper Grade A",
      details: groupResearchByGrade("Grade-A").map((paper) => ({
        title: paper.title,
        status: paper.status,
      })),
    },
    {
      title: "Research Paper Grade B",
      details: groupResearchByGrade("Grade-B").map((paper) => ({
        title: paper.title,
        status: paper.status,
      })),
    },
    {
      title: "Research Paper Grade C",
      details: groupResearchByGrade("Grade-C").map((paper) => ({
        title: paper.title,
        status: paper.status,
      })),
    },
    {
      title: "Conference",
      details: ConfOrg.filter((paper) => paper.eventType === "Conference").map(
        (paper) => ({
          title: paper.topicName,
          status: paper.status,
        })
      ),
    },
    {
      title: "Talks and Distinguished Lecture Series",
      details: Lecture.filter((paper) => paper.eventType === "Lecture").map(
        (paper) => ({
          title: paper.topicName,
          status: paper.status,
        })
      ),
    },

    {
      title: "Workshop Organized",
      details: WorkOrg.map((paper) => ({
        title: paper.topicName,
        status: paper.status,
      })),
    },
    {
      title: "Industrial Tour",
      details: IndTour.map((paper) => ({
        title: paper.topicName,
        status: paper.status,
      })),
    },
    {
      title: "MOOCs",
      details: Moocs.map((paper) => ({
        title: paper.developedModule,
        status: paper.status,
      })),
    },
    {
      title: "Tri-Mentoring System",
      details: TriMentor.map((paper) => ({
        title: paper.organizedBy,
        status: paper.status,
      })),
    },
    {
      title: "Patent",
      details: patentData.map((paper) => ({
        title: paper.name,
        status: paper.status,
      })),
    },
    {
      title: "Faculty Development Programmes/ MDP ",
      details: fdp.map((paper) => ({
        title: paper.topicName,
        status: paper.status,
      })),
    },
    {
      title: "Competition Organized",
      details: compete.map((paper) => ({
        title: paper.topicName,
        status: paper.status,
      })),
    },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved":
        return {
          bg: "bg-[#D6FFCE]",
          text: "text-[#1C6229]",
          icon: <TiTick className="text-[#1C6229]" />,
        };
      case "Pending":
        return {
          bg: "bg-[#FFC8A0]",
          text: "text-[#873D22]",
          icon: <LuLoader className="text-[#873D22]" />,
        };
      case "Rejected":
        return {
          bg: "bg-[#FFD6D6]",
          text: "text-[#D60000]",
          icon: <RiCloseFill className="text-[#C66666]" />,
        };
      default:
        return {
          bg: "bg-gray-200",
          text: "text-gray-600",
          icon: <RiCloseFill />,
        };
    }
  };

  return (
    <div className="bg-[#ECECEC] h-screen">
      <div className="absolute top-4 left-4 z-10 p-2 mr-4">
        <button
          onClick={toggleProfile}
          className="bg-slate-200 p-2 rounded absolute lsx:hidden"
          aria-label="Toggle profile"
        >
          {showProfile ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[95vh] lg:p-6 space-y-6 duration-300 overflow-y-scroll bg-[#EFEFEF] ${
          showProfile
            ? "lg:w-[calc(100% - 320px)] lg:ml-[330px]"
            : "lg:w-full lg:ml-0"
        } `}
      >
        <div className="flex justify-center items-center relative rounded-lg ">
          <div className="flex justify-center items-center text-[4.375rem] font-bold text-[#437F9E] absolute">
            <h1>FACULTY</h1>
          </div>
          <img src={rolebg} alt="img" className="object-cover w-full h-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, cellIndex) => (
            <div
              key={cellIndex}
              className="bg-[#fff] rounded-lg p-4 md:p-6 flex flex-col gap-3 min-h-80 cursor-pointer"
              onClick={() => {
                if (item.title === "Books Published") {
                  navigate("/faculty/viewbookpublished");
                } else if (item.title === "Research Paper Grade A") {
                  navigate("/faculty/researchpapergradea");
                } else if (item.title === "Research Paper Grade B") {
                  navigate("/faculty/researchpapergradeb");
                } else if (item.title === "Research Paper Grade C") {
                  navigate("/faculty/researchpapergradec");
                } else if (item.title === "Conference") {
                  navigate("/faculty/viewconferenceorganized");
                } else if (
                  item.title === "Talks and Distinguished Lecture Series"
                ) {
                  navigate("/faculty/viewLecture");
                } else if (item.title === "Workshop Organized") {
                  navigate("/faculty/viewworkshoporganized");
                } else if (item.title === "Industrial Tour") {
                  navigate("/faculty/viewIndustrialTour");
                } else if (item.title === "MOOCs") {
                  navigate("/faculty/viewmooc");
                } else if (item.title === "Tri-Mentoring System") {
                  navigate("/faculty/viewrtrimentor");
                }
              }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2">
                  <FaBookBookmark className="text-blue-700 w-6 h-6 sm:w-8 sm:h-8" />
                  <h1 className="font-semibold text-lg sm:text-xl">
                    {item.title}
                  </h1>
                </div>
                <button
                  className="bg-[#03A8FD] text-white px-3 py-1 rounded-md w-full sm:w-auto"
                  onClick={(event) => {
                    event.stopPropagation(); 
                    console.log("hello");
                    if(item.title === "Books Published"){
                      setBookPub(true)
                    }
                    else if(item.title === "Research Paper Grade A"){
                      setResearchPaperGradeAData(true)
                      console.log(setResearchPaperGradeAData)
                    }
                    else if(item.title === "Research Paper Grade B"){
                      setResearchPaperGradeBData(true)
                    }
                    else if(item.title === "Research Paper Grade C"){
                      setResearchPaperGradeCData(true)
                    }
                    else if(item.title === "MOOCs"){
                      setmooc(true)
                    }
                    
                    else if(item.title === "Conference"){
                      setConference(true)
                    }
                    else if(item.title === "Industrial Tour"){
                      setIndustrial(true)
                    }
                    else if(item.title === "Tri-Mentoring System"){
                      settriMentor(true)
                    }
                    

                    
                  }}
                >
                  Add A Response
                </button>
              </div>
              {item.details.map((book, index) => {
                const { bg, text, icon } = getStatusStyles(book.status);
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#EFEFEF] rounded-md p-2 text-sm sm:text-base"
                  >
                    <h1>{book.title}</h1>
                    <div
                      className={`${bg} p-1 rounded-md flex items-center justify-center gap-1 w-20 sm:w-28`}
                    >
                      {icon}
                      <p className={`${text}`}>{book.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <Sidebar showProfile={showProfile} />
      </div>
      {
          bookPub && 
          <BookPublished
            setShowPopup={setBookPub}
          />
        }
        {
          mooc && 
          <MoocsPopUp
            setShowPopup={setmooc}
            setUtilFor='bpAddForm'
          />
        }
        {/* {
          conference && 
          <ConferencePopUp
            setShowPopup={setConference}
            setUtilFor='bpAddForm'
          />
        } */}
        {
          industrial && 
          <IndustrialPopup
            setShowPopup={setIndustrial}
            setUtilFor='bpAddForm'
          />
        }
        {
          triMentor && 
          <TriMentoringPopUp
            setShowPopup={settriMentor}
            setUtilFor='bpAddForm'
          />
        }
        {
          researchPaperGradeAData && 
          <ResearchPaperGradeA
          setUtilFor={'bpAddForm'}
            setShowPopup={setResearchPaperGradeAData}
          />
        }
        {
          researchPaperGradeBData && 
          <ResearchPaperGradeB
          setUtilFor={'bpAddForm'}
            setShowPopup={setResearchPaperGradeBData}
          />
        }
        {
          researchPaperGradeCData && 
          <ResearchPaperGradeC
          setUtilFor={'bpAddForm'}
            setShowPopup={setResearchPaperGradeCData}
          />
        }
        
        
    </div>
  );
}
