import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import Registration from "./Pages/Registration/Registration";
import Login from "./Pages/Login/Login";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import Home from "./Pages/Home/Home";
import Student from "./Pages/Student/Student";
import AddUser from "./Pages/AddUser/AddUser";

const AppRouter = () => {
  const { userLogin } = useContext(AuthContext);
  return (
    <>
      {userLogin? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/student" element={<Student />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    

    </>
  );
};

export default AppRouter;