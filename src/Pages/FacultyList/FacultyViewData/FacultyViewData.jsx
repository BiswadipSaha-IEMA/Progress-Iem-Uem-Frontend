import React, { useEffect, useState } from "react";
import ViewDataTable from "../../../Components/ViewData/ViewDataTable";
// import {
//   dummyData,
//   dummyData as originalDummyData,
// } from "../../../constants/studentData";
import Header from "../../../Components/Header/Header";
import { useGetReq } from "../../../hooks/useHttp";
import Lottie from "react-lottie";
import noDataFound from "../../../Lottie/noDataFound.json";

const FacultyViewData = () => {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [rp1, setRp1] = useState([]);
  const [rp2, setRp2] = useState([]);
  const [rp3, setRp3] = useState([]);
  const [conf1, setConf1] = useState([]);
  const [conf2, setConf2] = useState([]);
  const [conf3, setConf3] = useState([]);
  const [book1, setBook1] = useState([]);
  const [book2, setBook2] = useState([]);
  const [book3, setBook3] = useState([]);
  const [confPub, setConfPub] = useState([]);
  const [moocs, setMoocs] = useState([]);
  const [patents, setPatents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [consultancy, setConsultancy] = useState([]);
  const [studentChapters, setStudentChapters] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [seminar, setSeminar] = useState([]);
  const [conf, setConf] = useState([]);
  const [facultyDevelopment, setFacultyDevelopment] = useState([]);
  const [competition, setCompetition] = useState([]);
  const [hackathon, setHackathon] = useState([]);
  const [trimentor, setTrimentor] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [industrialTour, setIndustrialTour] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [getReq] = useGetReq();
  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];
  const department = sessionStorage.getItem("dept");
  // const id=sessionStorage.getItem("userId")

  // let check;
  const [check, setCheck] = useState(false);
  const fetchData = async () => {
    try {
      const response = await getReq(
        `api/v1/document/getAllSubmissions/${department}`,
        accessToken
      );
      if (response.success) {
        // check = response.success;
        setIsLoading(false);
        setCheck(response.success);
        console.log(response.data);
        setData(response.data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    setIsLoading(true);


    if (accessToken) {
      fetchData();
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

  // useEffect(()=>{
  //   console.log("ffyfyyyyy-------------------------",check)
  // },[check])

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  useEffect(() => {
    // if(data.events){
    const events = data.events;
    const publications = data.publications;

    // console.log(data.publications)
    if (events) {
      const workshop = events
        .filter((event) => event.eventType === "Workshop")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            reviewedBy,
            proofDocument,
            documentLink,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const seminar = events
        .filter((event) => event.eventType === "Seminar")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            documentLink,
            status,
            reviewedBy,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const confEvent = events
        .filter((event) => event.eventType === "Conference")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const fdp = events
        .filter((event) => event.eventType === "FDP")
        .map(
          ({
            createdBy,
            obtainedScore,
            collegeName,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            documentLink,
            status,
            reviewedBy,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const competition = events
        .filter((event) => event.eventType === "Competition")
        .filter((event) => event.eventType === "Competiton")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            documentLink,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const hackathon = events
        .filter((event) => event.eventType === "Hackathon")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const trimentor = events
        .filter((event) => event.eventType === "Tri-Mentoring")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            reviewedBy,
            documentLink,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const lecture = events
        .filter((event) => event.eventType === "Lecture")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const itour = events
        .filter((event) => event.eventType === "IndustrialTour")
        .map(
          ({
            createdBy,
            collegeName,
            obtainedScore,
            department,
            __v,
            createdAt,
            updatedAt,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      setWorkshop(workshop);
      setSeminar(seminar);
      setConf(confEvent);
      setFacultyDevelopment(fdp);
      setCompetition(competition);
      setHackathon(hackathon);
      setTrimentor(trimentor);
      setLecture(lecture);
      setIndustrialTour(itour);
      console.log(hackathon,"hackathon")
    }
    if (publications) {
      const conf = publications
        .filter((pub) => pub.publicationType === "Conference")
        .map(
          ({
            category,
            collegeName,
            createdBy,
            obtainedScore,
            department,
            proofDocument,
            documentLink,
            reviewedBy,
            journalName,
            __v,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status
          })
        );
        const filteredBooks = publications
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
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
        const rep1 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Research Paper" &&
            pub.publicationGrade === "Grade-A"
        )
        .map(
          ({
            authorType,
            name,
            title,
            publisher,
            category,
            date,
            journalName,
            vol,
            issue,
            pp,
            nationalOrInternational,
            createdBy,
            comment,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
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
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
        const rep2 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Research Paper" &&
            pub.publicationGrade === "Grade-B"
        )
        .map(
          ({
            authorType,
            name,
            title,
            publisher,
            category,
            date,
            journalName,
            vol,
            issue,
            pp,
            nationalOrInternational,
            createdBy,
            comment,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
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
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            Status: status,
          })
        );
        const rep3 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Research Paper" &&
            pub.publicationGrade === "Grade-C"
        )
        .map(
          ({
            authorType,
            name,
            title,
            publisher,
            category,
            date,
            journalName,
            vol,
            issue,
            pp,
            nationalOrInternational,
            createdBy,
            comment,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
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
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            Status: status,
          })
        );
        const conf1 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Conference" &&
            pub.publicationGrade === "Grade-A"
        )
        .map(
          ({
            authorType,
            name,
            title,
            publisher,
            category,
            date,
            journalName,
            vol,
            issue,
            pp,
            nationalOrInternational,
            createdBy,
            comment,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            reviewedBy,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Author Type": authorType,
            "Author Name": name,
            "Book Name": title,
            "Conference Name":journalName,
            "Category": category,
            "Volume No.":vol,
            "Issue No.":issue,
            "Paper No.":pp,
            "National/International":nationalOrInternational,
            "Publisher Name": publisher,
            "Date": date,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            Status: status,
          })
        );
      const conf2 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Conference" &&
            pub.publicationGrade === "Grade-B"
        )
        .map(
          ({
            createdBy,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            proofDocument,
            documentLink,
            reviewedBy,
            journalName,
            __v,
            status,
            // _id,
            hasContentAccess,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
      const conf3 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Conference" &&
            pub.publicationGrade === "Grade-C"
        )
        .map(
          ({
            createdBy,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            status,
            // _id,
            hasContentAccess,
            reviewedBy,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );

      const book1 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Book Chapter" &&
            pub.publicationGrade === "Grade-A"
        )
        .map(
          ({
            createdBy,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            status,
            // _id,
            hasContentAccess,
            reviewedBy,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
        const book2 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Book Chapter" &&
            pub.publicationGrade === "Grade-B"
        )
        .map(
          ({
            createdBy,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            status,
            // _id,
            hasContentAccess,
            reviewedBy,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );
        const book3 = publications
        .filter(
          (pub) =>
            pub.publicationType === "Book Chapter" &&
            pub.publicationGrade === "Grade-C"
        )
        .map(
          ({
            createdBy,
            collegeName,
            publicationGrade,
            publicationType,
            obtainedScore,
            department,
            __v,
            proofDocument,
            documentLink,
            status,
            // _id,
            hasContentAccess,
            reviewedBy,
            ...rest
          }) => ({
            ...rest,
            "Proof Of Document": proofDocument,
            // "Document Link": documentLink,
            "Status": status,
          })
        );

        
      console.log(conf1,"Conf Rp");
      console.log(rep1);
      setConfPub(conf);
      setBooks(filteredBooks);
      setRp1(rep1);
      setRp2(rep2);
      setRp3(rep3);
      setConf1(conf1);
      setConf2(conf2);
      setConf3(conf3);
      setBook1(book1);
      setBook2(book2);
      setBook3(book3);
    }

    const moocs = data?.moocs?.map(
      ({
        createdAt,
        updatedAt,
        collegeName,
        comment,
        createdBy,
        department,
        __v,
        // _id,
        hasContentAccess,
        obtainedScore,
        proofDocument,
        faculty,
        developedModule,
        platformUsed,
        dateOfLaunch,
        facility,
        eFacility,
        reviewedBy,
        documentLink,
        status,
        ...rest
      }) => ({
        ...rest,
        "Name of the Faculty": faculty,
        "Name of the module developed": developedModule,
        "Name of the module developed": platformUsed,
        "Date of launch": dateOfLaunch,
        "Link to the relevant document and facility available in the institution":
          facility,
        "List of the e-content development facility available ": eFacility,
        "Proof Of Document": proofDocument,
        // "Document Link": documentLink,
        "Status": status,
      })
    );

    const projects = data?.projects?.map(
      ({
        createdAt,
        collegeName,
        createdBy,
        department,
        __v,
        // _id,
        hasContentAccess,
        title,
        principleInvestigator,
        coPrincipleInvestigator,
        grantAmount,
        dateOfSubmission,
        dateOfGranting,
        projectStatus,
        status,
        proofDocument,
        documentLink,
        ...rest
      }) => ({
        ...rest,
        "Title of Project": title,
        "Name of Principal Investigator": principleInvestigator,
        "Name of Co-Principal Investigator": coPrincipleInvestigator,
        "Amount of Grant": grantAmount,
        "Date of Submission": dateOfSubmission,
        "Date of Granting": dateOfGranting,
        "ProjectStatus": projectStatus,
        "Status":status,
        "Proof Of Document": proofDocument,
        // "Document Link": documentLink,
      })
    );

    const patents = data?.patents?.map(
      ({
        createdAt,
        collegeName,
        createdBy,
        department,
        __v,
        // _id,
        hasContentAccess,
        name,
        obtainedScore,
        designation,
        topicName,
        dateOfFilling,
        nationalorInternational,
        status,
        proofDocument,
        documentLink,
        reviewedBy,
        // dateOfFilling,
        // nationalorInternational,
        ...rest
      }) => ({
        ...rest,
        Department: department,
        Name: name,
        Designation: designation,
        "Topic name": topicName,
        "Date of Filling": dateOfFilling,
        "National/International": nationalorInternational,
        "Proof Of Document": proofDocument,
        // "Document Link": documentLink,
        "Status": status,
      })
    );

    const sca = data?.studentChapters?.map(
      ({
        createdAt,
        collegeName,
        createdBy,
        department,
        __v,
        // _id,
        hasContentAccess,
        status,
        proofDocument,
        documentLink,
        ...rest
      }) => ({ ...rest, "Proof Of Document": proofDocument,"Status": status })
    );

    // const confPub=data?.studentChapters?.map(({createdAt,createdBy,proofDocument,department,__v,_id,hasContentAccess,...rest})=>rest)

    setMoocs(moocs);
    setProjects(projects);
    setPatents(patents);
    setStudentChapters(sca);

    // }
  }, [data, check]);

  return (
    <>
      <Header backPage="/" />
      {!isLoading&&isAllDataEmpty ? (
        <div className="flex flex-col justify-center items-center py-8 m-10 bg-white  rounded-lg font-poppins">
          <Lottie options={options} height={400} width={400} />
          <p className="text-[#1A1A1D] mt-2 text-4xl font-semibold text-center">
            No records available
          </p>
        </div>
      ) : (
        // {isAllDataEmpty ? (
        //   <div className="flex justify-center items-center h-screen">
        //   <Lottie options={{ animationData: noDataFound }} height={400} width={400} loop={true}/>
        //   <p className="text-gray-500 mt-4">No data to display</p>
        //   </div>
        <>
          {projects?.length > 0 && (
            <ViewDataTable
              dummyData={projects}
              dummy={projects}
              name="List of Project Proposals"
              fetchData={fetchData}
            />
          )}
          {books?.length > 0 && (
            <ViewDataTable
              dummyData={books}
              dummy={books}
              name="Book Published"
              fetchData={fetchData}
            />
          )}
          {rp1?.length > 0 && (
            <ViewDataTable
              dummyData={rp1}
              dummy={rp1}
              name="Research Paper Published-Journal (Grade-A)"
              fetchData={fetchData}
            />
          )}
          {rp2?.length > 0 && (
            <ViewDataTable
              dummyData={rp2}
              dummy={rp2}
              name="Research Paper Published-Journal (Grade-B)"
              fetchData={fetchData}
            />
          )}
          {rp3?.length > 0 && (
            <ViewDataTable
              dummyData={rp3}
              dummy={rp3}
              name="Research Paper Published-Journal (Grade-C)"
              fetchData={fetchData}
            />
          )}
          {conf1?.length > 0 && (
            <ViewDataTable
              dummyData={conf1}
              dummy={conf1}
              name="Research Paper Published-Conference (Grade-A)"
            />
          )}
          {conf2?.length > 0 && (
            <ViewDataTable
              dummyData={conf2}
              dummy={conf2}
              name="Research Paper Published-Conference (Grade-B)"
            />
          )}
          {conf3?.length > 0 && (
            <ViewDataTable
              dummyData={conf3}
              dummy={conf3}
              name="Research Paper Published-Conference (Grade-C)"
            />
          )}

          {book1?.length > 0 && (
            <ViewDataTable
              dummyData={book1}
              dummy={book1}
              name="Research Paper Published-Book Chapter (Grade-A)"
            />
          )}
          {book2?.length > 0 && (
            <ViewDataTable
              dummyData={book2}
              dummy={book2}
              name="Research Paper Published-Book Chapter (Grade-B)"
            />
          )}
          {book3?.length > 0 && (
            <ViewDataTable
              dummyData={book3}
              dummy={book3}
              name="Research Paper Published-Book Chapter (Grade-C)"
            />
          )}

          {patents?.length > 0 && (
            <ViewDataTable dummyData={patents} dummy={patents} name="Patent" fetchData={fetchData}/>
          )}
          {facultyDevelopment?.length > 0 && (
            <ViewDataTable
              dummyData={facultyDevelopment}
              dummy={facultyDevelopment}
              name="Faculty Development Programmes"
              fetchData={fetchData}
            />
          )}
          {competition?.length > 0 && (
            <ViewDataTable
              dummyData={competition}
              dummy={competition}
              name="Competition"
              fetchData={fetchData}
            />
          )}
          {seminar?.length > 0 && (
            <ViewDataTable dummyData={seminar} dummy={seminar} name="Seminar" fetchData={fetchData}/>
          )}
          {conf?.length > 0 && (
            <ViewDataTable dummyData={conf} dummy={conf} name="Conference" fetchData={fetchData}/>
          )}
          {lecture?.length > 0 && (
            <ViewDataTable
              dummyData={lecture}
              dummy={lecture}
              name="Talks & Distinguished Lecture Series"
              fetchData={fetchData}
            />
          )}
          {workshop?.length > 0 && (
            <ViewDataTable
              dummyData={workshop}
              dummy={workshop}
              name="Workshop"
              fetchData={fetchData}
            />
          )}
          {industrialTour?.length > 0 && (
            <ViewDataTable
              dummyData={industrialTour}
              dummy={industrialTour}
              name="Industrial Tour"
              fetchData={fetchData}
            />
          )}
          {hackathon?.length > 0 && (
            <ViewDataTable
              dummyData={hackathon}
              dummy={hackathon}
              name="Hackathon"
              fetchData={fetchData}
            />
          )}
          {consultancy?.length > 0 && (
            <ViewDataTable
              dummyData={consultancy}
              dummy={consultancy}
              name="Consultancy"
              fetchData={fetchData}
            />
          )}
          {studentChapters?.length > 0 && (
            <ViewDataTable
              dummyData={studentChapters}
              dummy={studentChapters}
              name="Student Chapter Activity"
              fetchData={fetchData}
            />
          )}
          {confPub?.length > 0 && (
            <ViewDataTable
              dummyData={confPub}
              dummy={confPub}
              fetchData={fetchData}
              name="Conference"
            />
          )}
          {trimentor?.length > 0 && (
            <ViewDataTable
              dummyData={trimentor}
              dummy={trimentor}
              name="Tri-Mentoring System"
              fetchData={fetchData}
            />
          )}
          {moocs?.length > 0 && (
            <ViewDataTable dummyData={moocs} dummy={moocs} name="Moocs" fetchData={fetchData}/>
          )}
        </>
      )}
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
