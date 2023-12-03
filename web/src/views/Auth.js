import React, { useContext } from "react";
import "./../styles/auth.css";
import { ReactComponent as EnglephantLogo } from "./../assets/images/mascot-logo.svg";
import LoginForm from "./../components/auth/LoginForm";
import ForgetPassForm from "./../components/auth/ForgetPassForm";
import VerifyForm from "./../components/auth/VerifyForm";
import ChangePassForm from "./../components/auth/ChangePassForm";
import { AuthContext } from "./../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  const navigate = useNavigate()

  let body;

//   console.log("authLoad isAuthenticated",authLoading, isAuthenticated);
  if (authLoading) {
    body = (
      <div className="justify-content-center mt-2">
        <Spinner animation="border" />
      </div>
    );
  } else if (isAuthenticated) return navigate("/tutor");
  else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "forget-password" && <ForgetPassForm />}
        {authRoute === "verify-otp" && <VerifyForm />}
        {authRoute === "change-password" && <ChangePassForm />}
      </>
    );
  }

  return (
    <div className="authContainer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 logo-image">
            <EnglephantLogo width={450} />
          </div>
          <div className="col-sm-4">{body}</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
