import React, { useContext, useEffect, useState } from "react";
// import ModeratorSignInComp from "../../../Components/Moderator/Login/ModeratorSignInComp";
import { useDispatch } from "react-redux";
import { login } from "../../../Store/Action";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ModeratorSignInComp from "../../../Components/Moderator/Login/ModeratorSignInComp";

function ModeratorSignIn() {
  const [email, setEmail] = useState("");
  
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { login: contextLogin, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin && sessionStorage.getItem("token")) {
      navigate("/moderator/dashboard");
    }
  }, [userLogin, navigate]);

  useEffect(() => {
    if (submitted && email!=='' && password!=='') {
      const userData = { token: accessToken };
      if(userData.token!=null){
        console.log(accessToken)
        dispatch(login(userData));
        contextLogin(userData);
        navigate("/moderator/dashboard");
      }
    }
  }, [submitted, email, password, dispatch, contextLogin, navigate]);

  return (
    <div>
      <ModeratorSignInComp
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

export default ModeratorSignIn;
