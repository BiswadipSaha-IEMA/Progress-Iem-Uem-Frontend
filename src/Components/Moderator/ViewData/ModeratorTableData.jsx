import React, { useState, useEffect, useRef } from "react";
import { dummyData } from "../../../constants/studentData"; // Removed the duplicate import
import Header from "../../Header/Header";
import { useGetReq } from "../../../hooks/useHttp";
import ModeratorViewTable from "./ModeratorViewTable";
import Lottie from "react-lottie";
import noDataFound from "../../../Lottie/noDataFound.json";
import gsap from "gsap";

const ModeratorTableData = () => {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksFull, setBooksFull] = useState([]);
  const [rp1, setRp1] = useState([]);
  const [conf1, setConf1] = useState([]);
  const [conf1Full, setConf1Full] = useState([]);
  const [conf2, setConf2] = useState([]);
  const [conf2Full, setConf2Full] = useState([]);
  const [conf3, setConf3] = useState([]);
  const [conf3Full, setConf3Full] = useState([]);
  const [book1, setBook1] = useState([]);
  const [book1Full, setBook1Full] = useState([]);
  const [book2, setBook2] = useState([]);
  const [book2Full, setBook2Full] = useState([]);
  const [book3, setBook3] = useState([]);
  const [book3Full, setBook3Full] = useState([]);
  
  // const [rp1, setRp1] = useState([]);
  const [rp1Full, setRp1Full] = useState([]);
  const [rp2, setRp2] = useState([]);
  const [rp2Full, setRp2Full] = useState([]);
  const [rp3, setRp3] = useState([]);
  const [rp3Full, setRp3Full] = useState([]);
  const [confPub, setConfPub] = useState([]);
  const [confPubFull, setConfPubFull] = useState([]);
  const [bookChapterA, setBookChapterA] = useState([]);
  const [bookChapterAFull, setBookChapterAFull] = useState([]);
  const [bookChapterB, setBookChapterB] = useState([]);
  const [bookChapterBFull, setBookChapterBFull] = useState([]);
  const [bookChapterC, setBookChapterC] = useState([]);
  const [bookChapterCFull, setBookChapterCFull] = useState([]);
  const [moocs, setMoocs] = useState([]);
  const [moocsFull, setMoocsFull] = useState([]);
  const [patents, setPatents] = useState([]);
  const [patentsFull, setPatentsFull] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectsFull, setProjectsFull] = useState([]);
  const [consultancy, setConsultancy] = useState([]);
  const [consultancyFull, setConsultancyFull] = useState([]);
  const [studentChapters, setStudentChapters] = useState([]);
  const [studentChaptersFull, setStudentChaptersFull] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [workshopFull, setWorkshopFull] = useState([]);
  const [seminar, setSeminar] = useState([]);
  const [seminarFull, setSeminarFull] = useState([]);
  const [conf, setConf] = useState([]);
  const [confFull, setConfFull] = useState([]);
  const [facultyDevelopment, setFacultyDevelopment] = useState([]);
  const [facultyDevelopmentFull, setFacultyDevelopmentFull] = useState([]);
  const [competition, setCompetition] = useState([]);
  const [competitionFull, setCompetitionFull] = useState([]);
  const [hackathon, setHackathon] = useState([]);
  const [hackathonFull, setHackathonFull] = useState([]);
  const [trimentor, setTrimentor] = useState([]);
  const [trimentorFull, setTrimentorFull] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [lectureFull, setLectureFull] = useState([]);
  const [industrialTour, setIndustrialTour] = useState([]);
  const [industrialTourFull, setIndustrialTourFull] = useState([]);
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const department = sessionStorage.getItem("dept");
  const [getReq] = useGetReq();
  const noRecordAnimation = useRef(null)

  const getFaculty = async () => {
    try {
      const response = await getReq(
        `api/v1/document/getAllSubmissions/${department}`,
        accessToken
      );
      if (response.success) {
        console.log("responceeeeeeeeeeeeeeeeeeeeeeeeee");
        console.log("responceeeeeeeeeeeeeeeeeeeeeeeeee",response.data);
        setData(response.data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (accessToken) {
      getFaculty();
    }
  }, [accessToken]);

  const isAllDataEmpty = !(
    projects?.length > 0 ||
    books?.length > 0 ||
    rp1?.length > 0 ||
    rp2?.length > 0 ||
    rp3?.length > 0 ||
    conf1?.length > 0 ||
    conf2?.length > 0 ||
    conf3?.length > 0 ||
    book1?.length > 0 ||
    book2?.length > 0 ||
    book3?.length > 0 ||
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
  const options = {
    loop: false,
    autoplay: false,
    animationData: noDataFound,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    if (data.publications) {
      const workshop = data.events
        .filter((pub) => pub.eventType === "Workshop")
        .map(
          ({
            attendedBy,
            organizedBy,
            createdAt,
            updatedAt,
            createdBy,
            comment,
            documentLink,
            collegeName,
            reviewedBy,
            proofDocument,
            obtainedScore,
            status,
            department,
            __v,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Organized By": organizedBy,
            "Attended By": attendedBy,
            "Created By": createdBy.name,
            "Proof of Document": proofDocument,
            Status: status,
          })
        );
      const workshopFull = data.events.filter(
        (pub) => pub.eventType === "Workshop"
      );

      const seminar = data.events
        .filter((pub) => pub.eventType === "Seminar")
        .map(
          ({
            createdAt,
            updatedAt,
            organizedBy,
            attendedBy,
            createdBy,
            comment,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            reviewedBy,
            eventType,
            topicName,
            date,
            status,
            department,
            __v,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Organized By": organizedBy,
            "Event Type":eventType,
            "Date":date,
            "Topic Name":topicName,
            "Attended By": attendedBy,
            "Created By": createdBy.name,
            "Proof of Document": proofDocument,
            Status: status,
          })
        );
      const seminarFull = data.events.filter(
        (pub) => pub.eventType === "Seminar"
      );

      // const confEvent = data.events
      //   .filter((pub) => pub.eventType === "Conference")
      //   .map(
      //     ({
      //       createdBy,
      //       comment,
      //       department,
      //       __v,
      //       hasContentAccess,
      //       ...rest
      //     }) => ({ ...rest, "Created By": createdBy.name })
      //   );
      // const confEventFull = data.events.filter(
      //   (pub) => pub.eventType === "Conference"
      // );

      const fdp = data.events
        .filter((pub) => pub.eventType === "FDP")
        .map(
          ({
            createdAt,
            updatedAt,
            createdBy,
            comment,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            date,
            topicName,
            department,
            organizedBy,
            attendedBy,
            eventType,
            reviewedBy,
            __v,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Organised By":organizedBy,
            "Date":date,
            "Topic Name	":topicName,	
            "Attended By":attendedBy,
            "Event Type":eventType,
            "Created By": createdBy.name,
            "Proof of Document": proofDocument,
            // "Event Type": eventType,
            Status: status,
          })
        );
      const fdpFull = data.events.filter((pub) => pub.eventType === "FDP");

      const competition = data.events
        .filter((pub) => pub.eventType === "Competition")
        .map(
          ({
            
            comment,
            department,
            __v,
            eventType,
            obtainedScore,
            collegeName,
            topicName,
            proofDocument,
            reviewedBy,
            createdAt,
            organizedBy,
            updatedAt,
            date,
            createdBy,
            status,
            documentLink,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Organized By":organizedBy,
            "Topic Name":topicName,	
            "Date":date,
            "Created By":createdBy,
            
            "Created By": createdBy.name,
            "Proof of Document": proofDocument,
            "Status": status,
          })
        );
      const competitionFull = data.events.filter(
        (pub) => pub.eventType === "Competition"
      );

      const hackathon = data.events
        .filter((pub) => pub.eventType === "Hackathon")
        .map(
          ({
            createdBy,
            comment,
            department,
            __v,
            hasContentAccess,
            obtainedScore,
            reviewedBy,
            documentLink,
            createdAt,
            updatedAt,
            attendedBy,
            ...rest
          }) => ({
            ...rest,
            participants: attendedBy,
            createdBy: createdBy.name,
          })
        );
      const hackathonFull = data.events.filter(
        (pub) => pub.eventType === "Hackathon"
      );

      const trimentor = data.events
        .filter((pub) => pub.eventType === "Tri-Mentoring")
        .map(
          ({
            createdBy,
            reviewedBy,
            comment,
            department,
            documentLink,
            __v,
            hasContentAccess,
            ...rest
          }) => ({ ...rest, CreatedBy: createdBy.name })
        );
      const trimentorFull = data.events.filter(
        (pub) => pub.eventType === "Tri-Mentoring"
      );

      const lecture = data.events
        .filter((pub) => pub.eventType === "Lecture")
        .map(
          ({
            createdAt,
            updatedAt,
            organizedBy,
            attendedBy,
            createdBy,
            comment,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            reviewedBy,
            eventType,
            topicName,
            date,
            status,
            department,
            __v,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Organized By": organizedBy,
            "Event Type":eventType,
            "Date":date,
            "Topic Name":topicName,
            "Attended By": attendedBy,
            "Created By": createdBy.name,
            "Proof of Document": proofDocument,
            Status: status,
          })
        );
      const lectureFull = data.events.filter(
        (pub) => pub.eventType === "Lecture"
      );

      const itour = data.events
        .filter((pub) => pub.eventType === "IndustrialTour")
        .map(
          ({
            attendedBy,
            organizedBy,
            createdAt,
            updatedAt,
            createdBy,
            comment,
            documentLink,
            collegeName,
            proofDocument,
            reviewedBy,
            obtainedScore,
            status,
            department,
            __v,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Organized By": organizedBy,
            "Attended By": attendedBy,
            "Created By": createdBy.name,
            "Proof of Document": proofDocument,
            Status: status,
          })
        );
      const itourFull = data.events.filter(
        (pub) => pub.eventType === "IndustrialTour"
      );

      const moocs = data.moocs.map(
        ({
          createdAt,
          updatedAt,
          createdBy,
          comment,
          documentLink,
          collegeName,
          proofDocument,
          obtainedScore,
          status,
          department,
          reviewedBy,
          __v,
          hasContentAccess,
          ...rest
        }) => ({
          ...rest,
          "Created By": createdBy.name,
          "Proof of Document": proofDocument,
          Status: status,
        })
      );
      const moocsFull = data.moocs.map(({ ...rest }) => ({ ...rest }));

      const projects = data.projects.map(
        ({
          createdAt,
          createdBy,
          comment,
          department,
          __v,
          hasContentAccess,
          ...rest
        }) => ({ ...rest, "Created By": createdBy.name })
      );
      const projectsFull = data.projects.map(({ ...rest }) => ({ ...rest }));

      const patents = data.patents.map(
        ({
          createdAt,
          createdBy,
          comment,
          documentLink,
          collegeName,
          proofDocument,
          obtainedScore,
          status,
          reviewedBy,
          dateOfFiling,
          topicName,
          designation,
          name,
          department,
          nationalOrInternational,
          __v,
          hasContentAccess,
          ...rest
        }) => ({
          ...rest,
          "Department":department,
          "Name":name,
          "Designation":designation,
          "Created By": createdBy.name,
          
          "Topic Name":topicName,
          "Date Of Filling":dateOfFiling,
          "Proof of Document": proofDocument,
          "National/International": nationalOrInternational,
          "Status": status,
        })
      );
      const patentsFull = data.patents.map(({ ...rest }) => ({ ...rest }));
      console.log(patentsFull);

      const sca = data.studentChapters.map(
        ({
          createdAt,
          createdBy,
          comment,
          department,
          __v,
          hasContentAccess,
          ...rest
        }) => ({ ...rest, createdBy: createdBy.name })
      );
      const scaFull = data.studentChapters.map(({ ...rest }) => ({ ...rest }));

      const confData = data.events
        .filter((pub) => pub.eventType === "Conference")
        .map(
          ({
            category,
            createdBy,
            comment,
            obtainedScore,
            department,
            reviewedBy,
            organizedBy,
            eventType,
            documentLink,
            __v,
            hasContentAccess,
            ...rest
          }) => ({ ...rest, 
            "Organized By":organizedBy,
            "Created By": createdBy.name,
           })
        );
      const confDataFull = data.events.filter(
        (pub) => pub.eventType === "Conference"
      );

      const filteredBooks = data.publications
        .filter((pub) => pub.publicationType === "Book")
        .map(
          ({
            authorType,
            name,
            title,
            isbn,
            publisher,
            category,
            date,
            vol,
            issue,
            pp,
            nationalorInternational,
            publicationType,
            collegeName,
            createdBy,
            obtainedScore,
            department,
            reviewedBy,
            __v,
            proofDocument,
            documentLink,
            status,
            // _id,
            comment,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "ISBN Number": isbn,
            "Category": category,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );

      const filteredBooksFull = data.publications.filter(
        (pub) => pub.publicationType === "Book"
      );

      const rep1 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Research Paper" &&
            pub.publicationGrade === "Grade-A"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Journal Name":journalName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const rep1Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Research Paper" &&
          pub.publicationGrade === "Grade-A"
      );

      const rep2 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Research Paper" &&
            pub.publicationGrade === "Grade-B"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Journal Name":journalName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const rep2Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Research Paper" &&
          pub.publicationGrade === "Grade-B"
      );

      const rep3 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Research Paper" &&
            pub.publicationGrade === "Grade-C"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Journal Name":journalName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const rep3Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Research Paper" &&
          pub.publicationGrade === "Grade-C"
      );

      const conf1 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Conference" &&
            pub.publicationGrade === "Grade-A"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            conferenceName,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Conference Name":conferenceName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const conf1Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Conference" &&
          pub.publicationGrade === "Grade-A"
      );

      const conf2 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Conference" &&
            pub.publicationGrade === "Grade-B"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            conferenceName,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Conference Name":conferenceName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const conf2Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Conference" &&
          pub.publicationGrade === "Grade-B"
      );

      const conf3 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Conference" &&
            pub.publicationGrade === "Grade-C"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            conferenceName,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Conference Name":conferenceName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const conf3Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Conference" &&
          pub.publicationGrade === "Grade-C"
      );
      //hehe
      const book1 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Book Chapter" &&
            pub.publicationGrade === "Grade-A"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            conferenceName,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Conference Name":conferenceName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const book1Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Book Chapter" &&
          pub.publicationGrade === "Grade-A"
      );

      const book2 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Book Chapter" &&
            pub.publicationGrade === "Grade-B"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            conferenceName,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Conference Name":conferenceName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const book2Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Book Chapter" &&
          pub.publicationGrade === "Grade-B"
      );


      const book3 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Book Chapter" &&
            pub.publicationGrade === "Grade-C"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            status,
            authorType,
            department,
            journalName,
            name,
            vol,
            issue,
            pp,
            date,
            publisher,
            conferenceName,
            category,
            title,
            reviewedBy,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Conference Name":conferenceName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const book3Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Book Chapter" &&
          pub.publicationGrade === "Grade-C"
      );

      const bc1 = data.publications
        .filter(
          (pub) =>
            pub.publicationType === "Book Chapter" &&
            pub.publicationGrade === "Grade-A"
        )
        .map(
          ({
            createdBy,
            comment,
            publicationGrade,
            publicationType,
            documentLink,
            collegeName,
            proofDocument,
            obtainedScore,
            reviewedBy,
            journalName,
            status,
            department,
            __v,
            nationalOrInternational,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Book Chapter Name":journalName,
            "National/International": nationalOrInternational,
            "Created By": createdBy.name,
            "Proof of Document": proofDocument,
            Status: status,
          })
        );
      const bc1Full = data.publications.filter(
        (pub) =>
          pub.publicationType === "Book Chapter" &&
          pub.publicationGrade === "Grade-A"
      );

      // console.log("Trimentor",trimentor)
      setWorkshop(workshop);
      setWorkshopFull(workshopFull);
      setSeminar(seminar);
      setSeminarFull(seminarFull);
      setConf(confData);
      setConfFull(confDataFull);
      setFacultyDevelopment(fdp);
      setFacultyDevelopmentFull(fdpFull);
      setCompetition(competition);
      setCompetitionFull(competitionFull);
      setHackathon(hackathon);
      setHackathonFull(hackathonFull);
      setTrimentor(trimentor);
      setTrimentorFull(trimentorFull);
      setLecture(lecture);
      setLectureFull(lectureFull);
      setIndustrialTour(itour);
      setIndustrialTourFull(itourFull);

      setProjects(projects);
      setProjectsFull(projectsFull);
      setPatents(patents);
      setPatentsFull(patentsFull);
      setMoocs(moocs);
      setMoocsFull(moocsFull);
      setStudentChapters(sca);
      setStudentChaptersFull(scaFull);

      setConfPub(conf);
      setConfPubFull(confFull);
      setBooks(filteredBooks);
      setBooksFull(filteredBooksFull);
      setRp1(rep1);
      setRp1Full(rep1Full);
      setRp2(rep2);
      setRp2Full(rep2Full);
      setRp3(rep3);
      setRp3Full(rep3Full);
      setConf1(conf1);
      setConf1Full(conf1Full);
      setConf2(conf2);
      setConf2Full(conf2Full);
      setConf3(conf3);
      setConf3Full(conf3Full);
      setBook1(book1);
      setBook1Full(book1Full);
      setBook2(book2);
      setBook2Full(book2Full);
      setBook3(book3);
      setBook3Full(book3Full);
      setBookChapterA(bc1)
      setBookChapterAFull(bc1Full)
    }
  }, [data]);

  useEffect(()=>{
    gsap.from(noRecordAnimation.current, {
      opacity: 0,
      ease: "expo",
      scale: 0.5,
      duration: 2,
    })
  },[])

  return (
    <>
      <Header backPage="/moderator/dashboard" />

      {isAllDataEmpty ? (
        <div className="flex flex-col items-center justify-center py-8 m-10 bg-white rounded-lg font-poppins">
          <Lottie options={options} height={400} width={400} />
          <p className="text-[#1A1A1D] mt-2 text-4xl font-semibold text-center" ref={noRecordAnimation}>
            No records available
          </p>
        </div>
      ) : (
        <>
          {books.length > 0 && (
            <ModeratorViewTable
              dummyData={books}
              dummy={books}
              fullData={booksFull}
              name={"Book Published"}
              fetchData={getFaculty}
            />
          )}
          {rp1.length > 0 && (
            <ModeratorViewTable
              dummyData={rp1}
              dummy={rp1}
              fullData={rp1Full}
              name={"Research Paper Published-Journal (Grade-A)"}
              fetchData={getFaculty}
            />
          )}
          {rp2.length > 0 && (
            <ModeratorViewTable
              dummyData={rp2}
              dummy={rp2}
              fullData={rp2Full}
              name={"Research Paper Published-Journal (Grade-B)"}
              fetchData={getFaculty}
            />
          )}{" "}
          {rp3.length > 0 && (
            <ModeratorViewTable
              dummyData={rp3}
              dummy={rp3}
              fullData={rp3Full}
              name={"Research Paper Published-Journal (Grade-C)"}
              fetchData={getFaculty}
            />
          )}
          {conf1.length > 0 && (
            <ModeratorViewTable
              dummyData={conf1}
              dummy={conf1}
              fullData={conf1Full}
              name={"Research Paper Conference (Grade-A)"}
              fetchData={getFaculty}
            />
          )}
          {conf2.length > 0 && (
            <ModeratorViewTable
              dummyData={conf2}
              dummy={conf2}
              fullData={conf2Full}
              name={"Research Paper Conference (Grade-B)"}
              fetchData={getFaculty}
            />
          )}
          {conf3.length > 0 && (
            <ModeratorViewTable
              dummyData={conf3}
              dummy={conf3}
              fullData={conf3Full}
              name={"Research Paper Conference (Grade-C)"}
              fetchData={getFaculty}
            />
          )}
          
          {book1.length > 0 && (
            <ModeratorViewTable
              dummyData={book1}
              dummy={book1}
              fullData={book1Full}
              name={"Research Paper Published- Book Chapter (Grade-A)"}
              fetchData={getFaculty}
            />
          )}
          {book2.length > 0 && (
            <ModeratorViewTable
              dummyData={book2}
              dummy={book2}
              fullData={book2Full}
              name={"Research Paper Published- Book Chapter (Grade-B)"}
              fetchData={getFaculty}
            />
          )}
          {book3.length > 0 && (
            <ModeratorViewTable
              dummyData={book3}
              dummy={book3}
              fullData={book3Full}
              name={"Research Paper Published- Book Chapter (Grade-C)"}
              fetchData={getFaculty}
            />
          )}

          {/* {bookChapterA.length > 0 && (
            <ModeratorViewTable
            dummyData={bookChapterA}
            dummy={bookChapterA}
            fullData={bookChapterAFull}
            name={"Research Paper- Book Chapter (Grade-A)"}
            fetchData={getFaculty}
            />
          )} */}

          {patents.length > 0 && (
            <ModeratorViewTable
              dummyData={patents}
              dummy={patents}
              fullData={patentsFull}
              name={"Patent"}
              fetchData={getFaculty}
            />
          )}
          {projects.length > 0 && (
            <ModeratorViewTable
              dummyData={projects}
              dummy={projects}
              fullData={projectsFull}
              name={"Projects"}
              fetchData={getFaculty}
            />
          )}
          {facultyDevelopment.length > 0 && (
            <ModeratorViewTable
              dummyData={facultyDevelopment}
              dummy={facultyDevelopment}
              fullData={facultyDevelopmentFull}
              name={"Faculty Development Programmes"}
              fetchData={getFaculty}
            />
          )}
          {competition.length > 0 && (
            <ModeratorViewTable
              dummyData={competition}
              dummy={competition}
              fullData={competitionFull}
              name={"Competition"}
              fetchData={getFaculty}
            />
          )}
          {seminar.length > 0 && (
            <ModeratorViewTable
              dummyData={seminar}
              dummy={seminar}
              fullData={seminarFull}
              name={"Seminar"}
              fetchData={getFaculty}
            />
          )}
          {conf.length > 0 && (
            <ModeratorViewTable
            dummyData={conf}
            dummy={conf}
            fullData={confFull}
            name={"Conference"}
            fetchData={getFaculty}
            />
          )}
          {lecture.length > 0 && (
            <ModeratorViewTable
              dummyData={lecture}
              dummy={lecture}
              fullData={lectureFull}
              name={"Talks & Distinguished Lecture Series"}
              fetchData={getFaculty}
            />
          )}
          {workshop.length > 0 && (
            <ModeratorViewTable
              dummyData={workshop}
              dummy={workshop}
              fullData={workshopFull}
              name={"Workshop"}
              fetchData={getFaculty}
            />
          )}
          {industrialTour.length > 0 && (
            <ModeratorViewTable
              dummyData={industrialTour}
              dummy={industrialTour}
              fullData={industrialTourFull}
              name={"Industrial Tour"}
              fetchData={getFaculty}
            />
          )}
          {hackathon.length > 0 && (
            <ModeratorViewTable
              dummyData={hackathon}
              dummy={hackathon}
              fullData={hackathonFull}
              name={"Hackathon"}
              fetchData={getFaculty}
            />
          )}
          {consultancy.length > 0 && (
            <ModeratorViewTable
              dummyData={consultancy}
              dummy={consultancy}
              fullData={consultancyFull}
              name={"Consultancy"}
              fetchData={getFaculty}
            />
          )}
          {studentChapters.length > 0 && (
            <ModeratorViewTable
              dummyData={studentChapters}
              dummy={studentChapters}
              fullData={studentChaptersFull}
              name={"Student Chapter Activity"}
              fetchData={getFaculty}
            />
          )}
          {moocs.length > 0 && (
            <ModeratorViewTable
              dummyData={moocs}
              dummy={moocs}
              fullData={moocsFull}
              name={"Moocs"}
              fetchData={getFaculty}
            />
          )}
          {trimentor.length > 0 && (
            <ModeratorViewTable
              dummyData={trimentor}
              dummy={trimentor}
              fullData={trimentorFull}
              name={"Tri-Mentoring System"}
              fetchData={getFaculty}
            />
          )}
        </>
      )}
    </>
  );
};

export default ModeratorTableData;
