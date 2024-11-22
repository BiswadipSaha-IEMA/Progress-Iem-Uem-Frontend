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
import PatentPopUp from "../../../utils/Popup/FormPopUp/PatentPopUp";
import IndustrialPopup from "../../../utils/Popup/FormPopUp/IndustrialPopup";
import TriMentoringPopUp from "../../../utils/Popup/FormPopUp/TriMentoringPopUp";
import ResearchPaperGradeA from "../../../utils/Popup/FormPopUp/ResearchPaperGradeA";
import ResearchPaperGradeAbookChapter from "../../../utils/Popup/FormPopUp/ResearchPaperGradeAbookChapter";
import ResearchPaperGradeBbookChapter from "../../../utils/Popup/FormPopUp/ResearchPaperGradeBbookChapter";
import ResearchPaperGradeCbookChapter from "../../../utils/Popup/FormPopUp/ResearchPaperGradeCbookChapter";
import ResearchPaperGradeB from "../../../utils/Popup/FormPopUp/ResearchPaperGradeB";
import ResearchPaperGradeC from "../../../utils/Popup/FormPopUp/ResearchPaperGradeC";
import WorkShopPopUp from "../../../utils/Popup/FormPopUp/WorkShopPopUp";
import FDPPopUp from "../../../utils/Popup/FormPopUp/FDPPopUp";
import CompetitionPopUp from "../../../utils/Popup/FormPopUp/CompetitionPopUp";
import ConferencePopUp from "../../../utils/Popup/FormPopUp/ConferencePopUp";
import TalksPopUp from "../../../utils/Popup/FormPopUp/TalksPopUp";
import SeminarPopUp from "../../../utils/Popup/FormPopUp/SeminarPopUp";
import { IoCalendar } from "react-icons/io5";

export default function Faculty() {
  const [showPopUp, setShowPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [ConfOrg, setConfOrg] = useState([]);
  const [Moocs, setMoocs] = useState([]);
  const [TriMentor, setTriMentor] = useState([]);
  const [Lecture, setLecture] = useState([]);
  const [researchData, setResearchData] = useState([]);
  const [seminarOrg, setSeminarOrg] = useState([]);
  const [WorkOrg, setWorkOrg] = useState([]);
  const [IndTour, setIndTour] = useState([]);
  const [patentData, setPatentData] = useState([]);
  const [fdpData, setFdpData] = useState([]);
  const [compete, setCompete] = useState([]);
  const [dateRange, setDateRange] = useState(['', '']);
  const [bookPub, setBookPub] = useState(false);
  const [mooc, setmooc] = useState(false);
  const [conference, setConference] = useState(false);
  const [industrial, setIndustrial] = useState(false);
  const [triMentor, settriMentor] = useState(false);
  const [researchPaperGradeAData, setResearchPaperGradeAData] = useState(false);
  const [researchPaperGradeADatabook, setResearchPaperGradeADatabook] = useState(false);
  const [researchPaperGradeBData, setResearchPaperGradeBData] = useState(false);
  const [researchPaperGradeBDatabook, setResearchPaperGradeBDatabook] = useState(false);
  const [researchPaperGradeCData, setResearchPaperGradeCData] = useState(false);
  const [researchPaperGradeCDatabook, setResearchPaperGradeCDatabook] = useState(false);
  const [workshopPopUp, setworkshopPopUp] = useState(false);
  const [showPatentPopup, setShowPatentPopup] = useState(false);
  const [showFDPPopup, setShowFDPPopup] = useState(false);
  const [showSeminarPopup, setShowSeminarPopup] = useState(false);
  const [showLecturePopup, setShowLecturePopup] = useState(false);
  const [showConferencePopup, setShowConferencePopup] = useState(false);
  const [showCompetitionPopup, setShowCompetitionPopup] = useState(false);
  const toggleProfile = () => setShowProfile((prev) => !prev);
  const navigate = useNavigate();

  const [getReq] = useGetReq();
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  // Pop up form
  useEffect(() => {
    const getBPData = async () => {
      try {
        const response = await getReq(
          "api/v1/document/getAllEvents",
          accessToken
        );
        if (response.success) {
          console.log("BookPublished");
          console.log(response.data);
          setData(response.data.data);
          setData1(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBPData();
  }, [showPopUp]);

  const allInfo = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
        const filteredData = response.data.data.filter(
          (item) => item.eventType === "Conference"
        );
        console.log(filteredData);
        setConfOrg(filteredData);
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
        const filteredData = response.data.data.filter(
          (item) => item.eventType === "Lecture"
        );
        console.log("lecture", filteredData);
        setLecture(filteredData);
      }
    } catch (error) {
      console.error("Error fetching lectures:", error);
    }
  };

  const getMoocs = async () => {
    try {
      const response = await getReq("api/v1/document/getAllMoocs", accessToken);
      console.log(response);
      console.log("Moocs");
      if (response.success) {
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
        console.log("Trimentor", filteredData);
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
      console.log("Workshop");
      if (response.success) {
        const arr = [];
        response.data.data.forEach((dt) => {
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
      console.log("Industrial Tour");
      if (response.success) {
        const filteredData = response.data.data.filter(
          (dt) => dt.eventType === "IndustrialTour"
        );
        console.log(filteredData);
        setIndTour(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPatentInfo = async () => {
    try {
      const response = await getReq(
        "api/v1/document/getAllPatents",
        accessToken
      );
      console.log(response);
      console.log("Patent");
      if (response.success) {
        setPatentData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching patent info:", error);
    }
  };

  const getProjectInfo = async () => {
    try {
      const response = await getReq(
        "api/v1/document/getAllProjects",
        accessToken
      );
      console.log("Projects",response.data);
      
    } catch (error) {
      console.error("Error fetching project info:", error);
    }
  };

  const getFdpInfo = async () => {
    try {
      const response = await getReq(
        "api/v1/document/getAllEvents",
        accessToken
      );
      // console.log(response);
      if (response.success) {
        const arr = [];
        response.data.data.forEach((dt) => {
          if (dt.eventType === "FDP") {
            arr.push(dt);
          }
        });
        console.log("FDP", arr);
        setFdpData(arr);
      }
    } catch (error) {
      console.error("Error fetching FDP info:", error);
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
        const filteredData = response.data.data.filter(
          (dt) => dt.eventType === "Competition"
        );
        console.log(filteredData);
        setCompete(filteredData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSeminarOrgInfo = async () => {
    try {
      const response = await getReq(
        "api/v1/document/getAllEvents",
        accessToken
      );
      console.log("Response:", response);

      if (response.success) {
        const filteredSeminarData = response.data.data.filter(
          (dt) => dt.eventType === "Seminar"
        );
        console.log("Filtered Seminar Data:", filteredSeminarData);
        setSeminarOrg(filteredSeminarData);
      }
    } catch (error) {
      console.error("Error fetching seminar data:", error);
    }
  };
  const getDates = async () => {
    try{
      const dates = await getReq("api/v1/timeline/getSetTimeline", accessToken);
      if (dates.success) {
        setDateRange([
          dates.data.setTimeLineStartDate,
          dates.data.setTimeLineEndDate,
        ]);
        console.log("Dates", dates.data);
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(()=>{

  //   console.log('--------------------------------------------------',seminarOrg)
  // },[])

  useEffect(() => {
    allInfo();
    getSeminarOrgInfo();
    getConfInfo();
    getLecture();
    getMoocs();
    getTrimentor();
    getWorkInfo();
    getIndTour();
    getPatentInfo();
    getFdpInfo();
    getCompeteInfo();
    getDates();
    getProjectInfo();
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
        title: paper.industryName,
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
      title: "Faculty Development Programmes/ MDP",
      details: fdpData
        .filter((paper) => paper.eventType === "FDP")
        .map((paper) => ({
          title: paper.topicName,
          status: paper.status,
        })),
    },
    {
      title: "Competition Organized",
      details: compete
        .filter((paper) => paper.eventType === "Competition")
        .map((paper) => ({
          title: paper.topicName,
          status: paper.status,
        })),
    },
    {
      title: "Seminar",
      details: seminarOrg
        .filter((paper) => paper.eventType === "Seminar")
        .map((paper) => ({
          title: paper.topicName,
          status: paper.status,
        })),
    },
    {
      title: "Research Paper Published Conference (Grade A)",
      details: groupResearchByGrade("Grade-A").map((paper) => ({
        title: paper.title,
        status: paper.status,
      })),
    },
    {
      title: "Research Paper - Book Chapter (Grade A)",
      details: groupResearchByGrade("Grade-A").map((paper) => ({
        title: paper.title,
        status: paper.status,
      })),
    },
    {
      title: "Research Paper Grade - Book Chapter (Grade B)",
      details: groupResearchByGrade("Grade-A").map((paper) => ({
        title: paper.title,
        status: paper.status,
      })),
    },
    {
      title: "Research Paper Grade - Book Chapter (Grade C)",
      details: groupResearchByGrade("Grade-A").map((paper) => ({
        title: paper.title,
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
      case "RequestToAccept":
        return {
          bg: "bg-[#FFC8A0]",
          text: "text-[#873D22]",
          icon: <LuLoader className="text-[#873D22]" />,
          tilte: "Pending",
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
          tilte: "Pending",
        };
      case "RequestToReject":
        return {
          bg: "bg-[#FFC8A0]",
          text: "text-[#873D22]",
          icon: <LuLoader className="text-[#873D22]" />,
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
      <div className="absolute z-10 p-2 mr-4 top-4 left-4">
        <button
          onClick={toggleProfile}
          className="absolute p-2 rounded bg-slate-200 lsx:hidden"
          aria-label="Toggle profile"
        >
          {showProfile ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
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
        <div className="relative flex items-center justify-center rounded-lg ">
          <div className="flex justify-center items-center text-[4.375rem] font-bold text-[#437F9E] absolute">
            <h1>FACULTY</h1>
          </div>
          <img src={rolebg} alt="img" className="object-cover w-full h-full" />
        </div>
        <div className="flex justify-end items-end">
          <div className="bg-white rounded-[15px] border-[1.5px] relative">
            <div
              className="
                text-[#a0a0a0] p-[1rem] flex  items-center gap-2 font-poppins"
            >
              <IoCalendar />
              <p className="text-[15px] md:text-base xl:text-[1.25rem]">{`${dateRange[0]} - ${dateRange[1]}`}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 font-poppins">
          {items.map((item, cellIndex) => (
            <div
              key={cellIndex}
              className="bg-[#fff] rounded-lg flex flex-col min-h-40 cursor-pointer h-96 relative overflow-hidden"
              
                onClick={() => {
                if (item.title === "Books Published") {
                  navigate("/faculty/viewbookpublished");
                } else if (item.title === "Research Paper Grade A") {
                  navigate("/faculty/researchpapergradea");
                } else if (item.title === "Research Paper Grade B") {
                  navigate("/faculty/researchpapergradeb");
                } else if (item.title === "Research Paper Grade C") {
                  navigate("/faculty/researchpapergradec");
                }else if (item.title === "Research Paper - Book Chapter (Grade A)") {
                  navigate("/faculty/researchpapergradeabook");
                }else if (item.title === "Research Paper - Book Chapter (Grade B)") {
                  navigate("/faculty/researchpapergradebbook");
                }else if (item.title === "Research Paper - Book Chapter (Grade C)") {
                  navigate("/faculty/researchpapergradecbook");
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
                } else if (item.title === "Patent") {
                  navigate("/faculty/viewpatent");
                } else if (
                  item.title === "Faculty Development Programmes/ MDP"
                ) {
                  navigate("/faculty/viewfdp");
                } else if (item.title === "Competition Organized") {
                  navigate("/faculty/viewcomp");
                } else if (
                  item.title === "Research Paper Published Conference (Grade A)"
                ) {
                  navigate("/faculty/viewconferencegradea");
                  console.log("hello ji");
                } else if (item.title === "Seminar") {
                  navigate("/faculty/viewseminar");
                }
                // else if (item.title === "Seminar") {
                //   navigate("/faculty/viewseminar");
                // }
              }}
            >
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sticky top-0 bg-[#fff] z-10 p-4">
                <div className="flex items-center gap-2">
                  <FaBookBookmark className="w-6 h-6 text-blue-700 sm:w-8 sm:h-8" />
                  <h1 className="text-lg font-semibold sm:text-xl">
                    {item.title}
                  </h1>
                </div>
                <button
                  className="bg-[#03A8FD] text-white px-3 py-1 rounded-md w-full sm:w-auto"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (item.title === "Books Published") {
                      setBookPub(true);
                    } else if (item.title === "Research Paper Grade A") {
                      setResearchPaperGradeAData(true);
                      console.log(setResearchPaperGradeAData);
                    }else if (item.title === "Research Paper - Book Chapter (Grade A)") {
                      setResearchPaperGradeADatabook(true);
                      console.log(setResearchPaperGradeADatabook);
                    }else if (item.title === "Research Paper - Book Chapter (Grade B)") {
                      setResearchPaperGradeBDatabook(true);
                      console.log(setResearchPaperGradeBDatabook);
                    }else if (item.title === "Research Paper - Book Chapter (Grade C)") {
                      setResearchPaperGradeCDatabook(true);
                      console.log(setResearchPaperGradeCDatabook);
                    } else if (item.title === "Research Paper Grade B") {
                      setResearchPaperGradeBData(true);
                    } else if (item.title === "Research Paper Grade C") {
                      setResearchPaperGradeCData(true);
                    } else if (item.title === "MOOCs") {
                      setmooc(true);
                    } else if (item.title === "Conference") {
                      setShowConferencePopup(true);
                    } else if (item.title === "Industrial Tour") {
                      setIndustrial(true);
                    } else if (item.title === "Tri-Mentoring System") {
                      settriMentor(true);
                    } else if (item.title === "Workshop Organized") {
                      setworkshopPopUp(true);
                    } else if (item.title === "Patent") {
                      setShowPatentPopup(true);
                    } else if (
                      item.title === "Faculty Development Programmes/ MDP"
                    ) {
                      setShowFDPPopup(true);
                    } else if (item.title === "Competition Organized") {
                      setShowCompetitionPopup(true);
                    } else if (
                      item.title === "Talks and Distinguished Lecture Series"
                    ) {
                      setShowLecturePopup(true);
                    } else if (item.title === "Seminar") {
                      setShowSeminarPopup(true);
                    }
                  }}
                >
                  Add Response
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto px-4 md:px-6 flex-1 flex flex-col gap-4 pb-4">
                {item.details.map((book, index) => {
                  const { bg, text, icon, title } = getStatusStyles(
                    book.status
                  );
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#EFEFEF] rounded-md p-2 text-sm sm:text-base font-poppins"
                    >
                      {title ? <h1>{title}</h1> : <h1>{book.title}</h1>}
                      <div
                        className={`${bg} p-1 rounded-md flex items-center justify-center gap-1 min-w-fit max-w-full`}
                      >
                        {icon}
                        {book.status === "RequestToAccept" &&
                        book.status === "RequestToReject" ? (
                          <p className={`${text}`}>{book.title}</p>
                        ) : (
                          <p className={`${text}`}>{book.status}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <Sidebar showProfile={showProfile} />
      </div>

      {bookPub && (
        <BookPublished setShowPopup={setBookPub} getAllInfo={allInfo} />
      )}
      {mooc && <MoocsPopUp setShowPopup={setmooc} setUtilFor="bpAddForm" />}
      {industrial && (
        <IndustrialPopup setShowPopup={setIndustrial} setUtilFor="bpAddForm" />
      )}
      {triMentor && (
        <TriMentoringPopUp setShowPopup={settriMentor} setUtilFor="bpAddForm" />
      )}
      {researchPaperGradeAData && (
        <ResearchPaperGradeA
          setUtilFor={"bpAddForm"}
          setShowPopup={setResearchPaperGradeAData}
        />
      )}
       {researchPaperGradeADatabook && (
        <ResearchPaperGradeAbookChapter
          setUtilFor={"bpAddForm"}
          setShowPopup={setResearchPaperGradeADatabook}
        />
      )}
       {researchPaperGradeBDatabook && (
        <ResearchPaperGradeBbookChapter
          setUtilFor={"bpAddForm"}
          setShowPopup={setResearchPaperGradeBDatabook}
        />
      )}
       {researchPaperGradeCDatabook && (
        <ResearchPaperGradeCbookChapter
          setUtilFor={"bpAddForm"}
          setShowPopup={setResearchPaperGradeCDatabook}
        />
      )}
      {researchPaperGradeBData && (
        <ResearchPaperGradeB
          setUtilFor={"bpAddForm"}
          setShowPopup={setResearchPaperGradeBData}
        />
      )}
      {researchPaperGradeCData && (
        <ResearchPaperGradeC
          setUtilFor={"bpAddForm"}
          setShowPopup={setResearchPaperGradeCData}
        />
      )}
      {workshopPopUp && (
        <WorkShopPopUp
          setUtilFor={"bpAddForm"}
          setShowPopup={setworkshopPopUp}
        />
      )}
      {showPatentPopup && (
        <PatentPopUp setShowPopup={setShowPatentPopup} setUtilFor="bpAddForm" />
      )}
      {showFDPPopup && (
        <FDPPopUp setShowPopup={setShowFDPPopup} setUtilFor="bpAddForm" />
      )}
      {showLecturePopup && (
        <TalksPopUp setShowPopup={setShowLecturePopup} setUtilFor="bpAddForm" />
      )}
      {showCompetitionPopup && (
        <CompetitionPopUp
          setShowPopup={setShowCompetitionPopup}
          setUtilFor="bpAddForm"
        />
      )}
      {showConferencePopup && (
        <ConferencePopUp
          setShowPopup={setShowConferencePopup}
          setUtilFor="bpAddForm"
        />
      )}
      {showSeminarPopup && (
        <SeminarPopUp
          setShowPopup={setShowSeminarPopup}
          setUtilFor="bpAddForm"
        />
      )}
    </div>
  );
}
