import React, { useContext } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import Home from "./Pages/Home/Home";
import Student from "./Pages/Student/Student";
import AddUser from "./Pages/AddUser/AddUser";
import AddModerator from "./Pages/AddModerator/AddModerator";
import AddFaculty from "./Pages/AddFaculty/AddFaculty";
import SuperAdminDashboard from "./Pages/SuperAdminDashboard/SuperAdminDashboard";
import ModeratorDashboard from "./Components/Moderator/Dashboard/ModeratorDashboard";
import ModeratorSignUp from "./Pages/Moderator/SignUp/ModeratorSignUp";
import ModeratorSignIn from "./Pages/Moderator/Login/ModeratorSignIn";
import BookPublishedPage from "./Pages/Moderator/ViewData/BookPublishedPage";
import FacultySignIn from "./Pages/Faculty/SignIn/FacultySignIn";
import FacultySignUp from "./Pages/Faculty/SignUp/FacultySignUp";
import FacultyPage from "./Pages/Faculty/DashBoard/FacultyPage";
import FacultyBookPublishedPage from "./Pages/Faculty/FacultyBookPublished/FacultyBookPublishedPage";
import FacultyResearchPpaperAPage from "./Pages/Faculty/FacultyResearchPpaperA/FacultyResearchPpaperAPage";
import FacultyResearchPpaperBPage from "./Pages/Faculty/FacultyResearchPpaperB/FacultyResearchPpaperBPage";
import FacultyResearchPpaperCPage from "./Pages/Faculty/FacultyResearchPpaperC/FacultyResearchPpaperCPage";
import FacultyConferenceOrganized from './Pages/Faculty/FacultyConferenceOrganized/FacultyConferenceOrganized';
import Lectureseries from "./Pages/Faculty/Lectureseries/Lectureseries";
import FacultyWorkshopOrganizedPage from "./Pages/Faculty/FacultyWorkshopOrganized/FacultyWorkshopOrganizedPage";
import FacultyIndustrialTourPage from "./Pages/Faculty/FacultyIndustrialTour/FacultyIndustrialTourPage";
import FacultyPatentPage from "./Pages/Faculty/FacultyPatent/FacultyPatentPage";
import { ModeratorPendingRequests } from "./Pages/Moderator/PenidngRequests/ModeratorPendingRequests";
import FacultyMOOCPage from "./Pages/Faculty/FacultyMOOC/FacultyMOOCPage";
import FacultyTriMentoringPage from "./Pages/Faculty/FacultyFacultyTriMentoring/FacultyTriMentoringPage";
import FacultyCompetitionPage from "./Pages/Faculty/FacultyCompetition/FacultyCompetitionPage";
import FacultyResearchPpaperAbookChapterPage from "./Pages/Faculty/FacultyResearchPpaperAbookChapter/FacultyResearchPpaperAbookChapterPage";
import FacultyResearchPpaperBbookChapterPage from "./Pages/Faculty/FacultyResearchPpaperBbookChapter/FacultyResearchPpaperBbookChapterPage";
import FacultyResearchPpaperCbookChapterPage from "./Pages/Faculty/FacultyResearchPpaperCbookChapter/FacultyResearchPpaperCbookChapterPage";
import FacultyList from "./Components/AddFaculty/FacultyList";
import CSEFacultyList from "./Pages/Moderator/FacultyList/CSEFacultyList";
import ECEFacultyList from "./Pages/Moderator/FacultyList/ECEFacultyList";
import CSITFacultyList from "./Pages/Moderator/FacultyList/CSITFacultyList";
import MCAFacultyList from "./Pages/Moderator/FacultyList/MCAFacultyList";
import BCAFacultyList from "./Pages/Moderator/FacultyList/BCAFacultyList";
import BEFacultyList from "./Pages/Moderator/FacultyList/BEFacultyList";
import CSEAIMLFacultyList from "./Pages/Moderator/FacultyList/CSEAIMLFacultyList";
import CSEIOTFacultyList from "./Pages/Moderator/FacultyList/CSEIOTFacultyList";
import TableData from "./Components/Moderator/TableData/TableData";
import StreamFacultyList from "./Pages/FacultyList/StreamFacultyList";
import FacultyViewData from "./Pages/FacultyList/FacultyViewData/FacultyViewData";
import ModeratorSpecificBookPublished from "./Components/Moderator/ViewData/ModeratorTableData";
import MdStreamFacultyList from "./Pages/Moderator/FacultyList/MdStreamFacultyList";
import FacultyFDPPage from "./Pages/Faculty/FacultyFDP/FacultyFDPPage";
import FacultyConferenceGradeAPage from "./Pages/Faculty/FacultyConferenceGradeA/FacultyConferenceGradeAPage";
import { FacultySeminar } from "./Pages/Faculty/FacultySeminar/FacultySeminar";
import FacultyStudentChapterPage from "./Pages/Faculty/FacultyStudentChapter/FacultyStudentChapterPage";
import FacultyConferenceGradeBPage from "./Pages/Faculty/FacultyConferenceGradeB/FacultyConferenceGradeBPage";
import FacultyConferenceGradeCPage from "./Pages/Faculty/FacultyConferenceGradeC/FacultyConferenceGradeCPage";
import FacultyHackathonPage from "./Pages/Faculty/FacultyHackathon/FacultyHackathonPage";

const AppRouter = () => {
  const { userLogin } = useContext(AuthContext);
  const { routeName } = useParams();
  const {adminDept} = useParams()

  return (
    <>
      {userLogin ? (
        <Routes>
          <Route path="/" element={<SuperAdminDashboard />} />
          <Route path="/editAcc" element={<Home />} />
          <Route path={`/:adminDept/viewdata`} element={<FacultyViewData />} />
          {/* <Route path="/viewdata" element={<Student />} /> */}
          <Route path="/adddepartment" element={<AddFaculty />} />
          <Route path="/addmoderator" element={<AddModerator />} />
          <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
          <Route path="/moderator/viewdata" element={<BookPublishedPage />} />
          <Route path="/moderator/pendingrequests" element={<ModeratorPendingRequests />} />
          <Route path="/faculty/dashboard" element={<FacultyPage />} />
          <Route path="/faculty/viewbookpublished" element={<FacultyBookPublishedPage />} />
          <Route path="/faculty/researchpapergradea" element={<FacultyResearchPpaperAPage />} />
          <Route path="/faculty/researchpapergradeb" element={<FacultyResearchPpaperBPage />} />
          <Route path="/faculty/researchpapergradec" element={<FacultyResearchPpaperCPage />} />
          <Route path="/faculty/viewconferenceorganized" element={<FacultyConferenceOrganized />} />
          <Route path="/faculty/viewLecture" element={<Lectureseries />} />
          <Route path="/faculty/viewHackathon" element={<FacultyHackathonPage />} />
          <Route path="/faculty/viewIndustrialTour" element={<FacultyIndustrialTourPage />} />
          <Route path="/faculty/viewworkshoporganized" element={<FacultyWorkshopOrganizedPage />} />
          <Route path="/faculty/viewmooc" element={<FacultyMOOCPage />} />
          <Route path="/faculty/viewrtrimentor" element={<FacultyTriMentoringPage />} />
          <Route path="/faculty/viewpatent" element={<FacultyPatentPage />} />
          <Route path="/faculty/viewcomp" element={<FacultyCompetitionPage />} />
          <Route path="/faculty/researchpapergradeabook" element={<FacultyResearchPpaperAbookChapterPage />} />
          <Route path="/faculty/researchpapergradebbook" element={<FacultyResearchPpaperBbookChapterPage />} />
          <Route path="/faculty/researchpapergradecbook" element={<FacultyResearchPpaperCbookChapterPage />} />
          <Route path="/faculty/viewseminar" element={<FacultySeminar />} />
          {/* <Route path="/faculty/viewseminar" element={<FacultyCompetitionPage />} /> */}
          <Route path="/faculty/viewfdp" element={<FacultyFDPPage />} />
          <Route path="/faculty/viewconferencegradea" element={<FacultyConferenceGradeAPage/>} />
          <Route path="/faculty/viewconferencegradeb" element={<FacultyConferenceGradeBPage/>}/>
          <Route  path="/faculty/viewconferencegradec" element={<FacultyConferenceGradeCPage/>}/>


          {/* Faculty lists by stream */}
          <Route path="/api/moderator/cse-faculty" element={<CSEFacultyList />} />
          <Route path="/ece-facultylist" element={<ECEFacultyList />} />
          <Route path="/csit-facultylist" element={<CSITFacultyList />} />
          <Route path="/mca-facultylist" element={<MCAFacultyList />} />
          <Route path="/bca-facultylist" element={<BCAFacultyList />} />
          <Route path="/be-facultylist" element={<BEFacultyList />} />
          <Route path="/cse-aiml-facultylist" element={<CSEAIMLFacultyList />} />
          <Route path="/cse-iot-facultylist" element={<CSEIOTFacultyList />} />
          <Route path="/moderator/specificbookpublished" element={<ModeratorSpecificBookPublished />} />
          <Route path={`/md/:routeName/viewdata`} element={<MdStreamFacultyList />} />
          
          <Route path={`/:routeName/facultylist`} element={<StreamFacultyList />} />



          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      ) : (
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} />
          <Route path="/moderator/signup" element={<ModeratorSignUp />} />
          <Route path="/moderator/login" element={<ModeratorSignIn />} />
          <Route path="/faculty/signup" element={<FacultySignUp />} />
          <Route path="/faculty/login" element={<FacultySignIn />} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
