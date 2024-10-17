import React, { useContext, useEffect, useState } from "react";
import LoginComp from "../../Components/Login/LoginComp";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Action";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { login: contextLogin, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLogin && sessionStorage.getItem("user")) {
      navigate("/");
    }
  }, [userLogin, navigate]);

  useEffect(() => {
    if (submitted && email!=='' && password!=='') {
      const userData = { name: email, token: "abc123" };
      dispatch(login(userData));
      contextLogin(userData);
      navigate("/");
    }
  }, [submitted, email, password, dispatch, contextLogin, navigate]);

  return (
    <div>
      <LoginComp
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        setHandleLogin={setSubmitted}
      />
      {setSubmitted(false)}
    </div>
  );
}

export default Login;
