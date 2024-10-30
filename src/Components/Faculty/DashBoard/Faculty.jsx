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


export default function Faculty() {
  const [showProfile, setShowProfile] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [ConfOrg, setConfOrg] = useState([]);
  const [Lecture, setLecture] = useState([]);
  const [researchData, setResearchData] = useState([]);
  const toggleProfile = () => setShowProfile((prev) => !prev);
  const navigate= useNavigate()

  const [getReq] = useGetReq();

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

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
        console.error("Error fetching publications:", error);
      }
    };
  
    const getConfInfo = async () => {
      try {
        const response = await getReq("api/v1/document/getAllEvents", accessToken);
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
        const response = await getReq("api/v1/document/getAllEvents", accessToken);
        console.log(response);
        if (response.success) {
          setLecture(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
      }
    };
  
    
    allInfo();
    getConfInfo();
    getLecture();
  }, [accessToken]);
  

  useEffect(()=>{
    console.log(ConfOrg)
  },[ConfOrg])
  useEffect(()=>{
    console.log(Lecture)
  },[Lecture])
  
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
      details: ConfOrg
        .filter(paper => paper.eventType === "Conference")
        .map((paper) => ({
          title: paper.topicName,
          status: paper.status,
        })),
    },
    {
      title: "Talks and Distinguished Lecture Series",
      details: Lecture
        .map((paper) => ({
          title: paper.topicName,
          status: paper.status,
        })),
    }
    
    // {
    //   title: "Conference Attended",
    //   details: ConfOrg.map((paper) => ({
    //     title: paper.topicName,
    //     status: paper.status,
    //   })),
    // },
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
        className={`flex flex-col mx-auto p-4 sm:p-6 lg:h-[95vh] lg:p-6 space-y-6 duration-300 overflow-y-scroll ${
          showProfile
            ? "lg:w-[calc(100% - 320px)] lg:ml-[330px]"
            : "lg:w-full lg:ml-0"
        } `}
      >
        <div className="flex justify-center items-center relative rounded-lg">
          <div className="flex justify-center items-center text-[4.375rem] font-bold text-[#437F9E] absolute">
            <h1>FACULTY</h1>
          </div>
          <img src={rolebg} alt="img" className="object-cover w-full h-full" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {items.map((item, cellIndex) => (
            <div
              key={cellIndex}
              className="bg-[#fff] rounded-lg p-[1.5rem] flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                  <FaBookBookmark className="text-blue-700 w-[2rem] h-[2rem]" />
                  <h1 className="font-semibold text-[1.5rem]">{item.title}</h1>
                </div>
                <button className="bg-[#03A8FD] text-white p-1 rounded-md w-[7rem]"
                onClick={()=>{
                    console.log(item)
                    if(item.title==="Books Published")
                      navigate('/faculty/viewbookpublished')
                    else if( item.title==="Conference")
                      navigate('/faculty/viewconferenceorganized')
                    else if( item.title==="Talks and Distinguished Lecture Series")
                      navigate('/faculty/viewLecture')
                   
                    
                  
                }}
                >
                  View All
                </button>
              </div>
              {item.details.map((book, index) => {
                const { bg, text, icon } = getStatusStyles(book.status);
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#EFEFEF] rounded-md p-2"
                  >
                    <h1>{book.title}</h1>
                    <div
                      className={`${bg} p-1 rounded-md flex items-center justify-center gap-1 w-[7rem]`}
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
    </div>
  );
}
