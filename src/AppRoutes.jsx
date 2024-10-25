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

const AppRouter = () => {
  const { userLogin } = useContext(AuthContext);
  return (
    <>
      {userLogin? (
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/addmoderator" element={<AddModerator/>} />
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Student />} />
          <Route path="/student" element={<Student />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/addfaculty" element={<AddFaculty />} />
          <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} />
          
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      )  : (
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/SuperAdminDashboard" element={<SuperAdminDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    

    </>
  );
};

export default AppRouter;