import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationComp from "../../Components/Registration/RegistrationComp";
import { useDispatch } from "react-redux";
import { login } from "../../Store/Action";
import { AuthContext } from "../../Context/AuthContext";

function Registration() {
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [otpCheck, setOtpCheck] = useState("");
  const [verify, setVerify] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const { login: contextLogin, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [onRegister, setOnRegister] = useState({
    email: null,
    accesstoken: null,
    refreshtoken: null,
  });

  useEffect(() => {
    if (onRegister.accesstoken !== null) {
      sessionStorage.clear();
      const userData = {
        email: onRegister.email,
        accesstoken: onRegister.accesstoken,
        refreshtoken: onRegister.refreshtoken,
      };
      dispatch(login(userData));
      contextLogin(userData);
      navigate("/");
    }
  }, [onRegister]);

  return (
    <RegistrationComp
      email={email}
      setEmail={setEmail}
      SuccessfullyRegistered={successfullyRegistered}
      setSuccessfullyRegistered={setSuccessfullyRegistered}
      setOptCheck={setOtpCheck}
      setOnRegister={setOnRegister}
    />
  );
}

export default Registration;
