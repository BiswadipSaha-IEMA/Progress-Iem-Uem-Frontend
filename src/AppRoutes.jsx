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
import  ModeratorComp  from "./Components/Moderator/ModeratorComp";
import  ModeratorDashboard  from "./Components/Moderator/Dashboard/ModeratorDashboard";
import ModeratorSignUp from "./Pages/Moderator/SignUp/ModeratorSignUp";
import ModeratorSignIn from "./Pages/Moderator/Login/ModeratorSignIn";
import BookPublishedPage from "./Pages/Moderator/ViewData/BookPublishedPage";
import FacultySignIn from "./Pages/Faculty/SignIn/FacultySignIn";
import FacultySignUp from "./Pages/Faculty/SignUp/FacultySignUp";
import FacultyPage from "./Pages/Faculty/DashBoard/FacultyPage";

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
          <Route path="/moderator" element={<ModeratorComp />} />
          <Route path="/addfaculty" element={<AddFaculty />} />
          <Route path="/addmoderator" element={<AddModerator />} />
          <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />
          <Route path="/moderator/viewdata" element={< BookPublishedPage/>} />
          <Route path="/faculty/dashboard" element={< FacultyPage/>} />
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