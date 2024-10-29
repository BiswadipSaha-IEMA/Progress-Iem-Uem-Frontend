import React, { useContext, useEffect, useState } from "react";
// import FacultySignInComp from "../../../Components/Moderator/Login/FacultySignInComp";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/Action";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import FacultySignInComp from "../../../Components/Faculty/Login/FacultySignInComp";

function FacultySignIn() {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { login: contextLogin, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin && sessionStorage.getItem("token")) {
      navigate("/faculty/dashboard");
    }
  }, [userLogin, navigate]);

  useEffect(() => {
    if (submitted && email!=='' && password!=='') {
      const userData = { token: accessToken };
      if(userData.token!=null){
        console.log(accessToken)
        dispatch(login(userData));
        contextLogin(userData);
        navigate("/faculty/dashboard");
      }
    }
  }, [submitted, email, password, dispatch, contextLogin, navigate]);

  return (
    <div>
      <FacultySignInComp
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setHandleLogin={setSubmitted}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
    </div>
  );
}

export default FacultySignIn;
