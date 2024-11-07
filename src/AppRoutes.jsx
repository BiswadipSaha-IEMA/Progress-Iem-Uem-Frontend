import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
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
import  ModeratorDashboard  from "./Components/Moderator/Dashboard/ModeratorDashboard";
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
import FacultyConferenceOrganized from './Pages/Faculty/FacultyConferenceOrganized/FacultyConferenceOrganized'
import Lectureseries from "./Pages/Faculty/Lectureseries/Lectureseries";
import FacultyWorkshopOrganizedPage from "./Pages/Faculty/FacultyWorkshopOrganized/FacultyWorkshopOrganizedPage";
import FacultyIndustrialTourPage from "./Pages/Faculty/FacultyIndustrialTour/FacultyIndustrialTourPage";
import { ModeratorPendingRequests } from "./Pages/Moderator/PenidngRequests/ModeratorPendingRequests";
import FacultyMOOCPage from "./Pages/Faculty/FacultyMOOC/FacultyMOOCPage";
import FacultyTriMentoringPage from "./Pages/Faculty/FacultyFacultyTriMentoring/FacultyTriMentoringPage";
import FacultyList from "./Components/AddFaculty/FacultyList";
import CSEFacultyList from "./Pages/Moderator/FacultyList/CSEFacultyList"
import ECEFacultyList from "./Pages/Moderator/FacultyList/ECEFacultyList"
import CSITFacultyList from "./Pages/Moderator/FacultyList/CSITFacultyList"
import MCAFacultyList from "./Pages/Moderator/FacultyList/MCAFacultyList"
import BCAFacultyList from "./Pages/Moderator/FacultyList/BCAFacultyList"
import BEFacultyList from "./Pages/Moderator/FacultyList/BEFacultyList"
import CSEAIMLFacultyList from "./Pages/Moderator/FacultyList/CSEAIMLFacultyList";
import CSEIOTFacultyList from "./Pages/Moderator/FacultyList/CSEIOTFacultyList";
import TableData from "./Components/Moderator/TableData/TableData";
import SpecificBookPublished from "./Components/Moderator/ViewData/SpecificBookPublished"

const AppRouter = () => {
  const { userLogin } = useContext(AuthContext);
  return (
    <>
      {userLogin? (
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/addmoderator" element={<AddModerator/>} />
          <Route path="/" element={<SuperAdminDashboard />} />
          <Route path="/editAcc" element={<Home />} />
          <Route path="/viewdata" element={<Student />} />
          {/* <Route path="/student" element={<Student />} /> */}
          {/* <Route path="/moderator" element={<ModeratorComp />} /> */}
          <Route path="/addfaculty" element={<AddFaculty />} />
          <Route path="/addmoderator" element={<AddModerator />} />
          <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
          <Route path="/moderator/viewdata" element={< BookPublishedPage/>} />
          <Route path="/moderator/pendingrequests" element={< ModeratorPendingRequests/>} />
          <Route path="/faculty/dashboard" element={< FacultyPage/>} />
          <Route path="/faculty/viewbookpublished" element={< FacultyBookPublishedPage/>} />
          <Route path="/faculty/researchpapergradea" element={< FacultyResearchPpaperAPage/>} />
          <Route path="/faculty/researchpapergradeb" element={< FacultyResearchPpaperBPage/>} />
          <Route path="/faculty/researchpapergradec" element={< FacultyResearchPpaperCPage/>} />
          <Route path="/faculty/viewconferenceorganized" element={< FacultyConferenceOrganized/>} />
          <Route path="/faculty/viewLecture" element={<Lectureseries/>} />
          <Route path="/faculty/viewIndustrialTour" element={< FacultyIndustrialTourPage/>} />
          <Route path="/faculty/viewworkshoporganized" element={< FacultyWorkshopOrganizedPage/>} />
          <Route path="/moderator/pendingrequests" element={< ModeratorPendingRequests/>} />
          <Route path="/faculty/viewmooc" element={< FacultyMOOCPage/>} />
          <Route path="/faculty/viewrtrimentor" element={< FacultyTriMentoringPage/>} />


          <Route path="/api/cse-faculty" element={<FacultyList/>} />
          <Route path="/api/ece-faculty" element={<FacultyList/>} />
          <Route path="/api/mca-faculty" element={<FacultyList/>} />
          <Route path="/api/csit-faculty" element={<FacultyList/>} />

          {/* Moderator Faculty Pages */}
          <Route path="/api/moderator/cse-faculty" element={<CSEFacultyList/>} />
          <Route path="/api/moderator/ece-faculty" element={<ECEFacultyList/>} />
          <Route path="/api/moderator/mca-faculty" element={<MCAFacultyList/>} />
          <Route path="/api/moderator/bca-faculty" element={<BCAFacultyList/>} />
          <Route path="/api/moderator/csit-faculty" element={<CSITFacultyList/>} />
          <Route path="/api/moderator/be-faculty" element={<BEFacultyList/>} />
          <Route path="/api/moderator/cseaiml-faculty" element={<CSEAIMLFacultyList/>} />
          <Route path="/api/moderator/cseiot-faculty" element={<CSEIOTFacultyList/>} />
          <Route path="/moderator/tabledata" element={<TableData/>} />
          <Route path="/moderator/tabledata/specificbookpublished" element={<SpecificBookPublished/>} />
          <Route path="/moderator/specificbookpublished" element={<SpecificBookPublished/>} />


          {/* <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} /> */}
          
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      )  : (
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/moderator/signup" element={< ModeratorSignUp/>} />
          <Route path="/moderator/login" element={< ModeratorSignIn/>} />
          <Route path="/faculty/signup" element={< FacultySignUp/>} />
          <Route path="/faculty/login" element={< FacultySignIn/>} />

        </Routes>
      )}
    

    </>
  );
};

export default AppRouter;