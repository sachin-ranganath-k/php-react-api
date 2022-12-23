import React, { useState } from "react";
import axios from "axios";
import { USER_REGISTER_API } from "../../constants/endPoints";
import {
  formErrorMsgs,
  patterns,
  registerLoginForm,
} from "../../constants/constants";
import NavBar from "../../navbar/NavBar";

const UserRegister = () => {
  const [nameValidation, setNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerFailure, setRegisterFailure] = useState(false);

  const [info, setInfo] = useState({
    userName: "",
    userEmail: "",
    password: "",
  });

  const handleInfo = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const { userName, userEmail, password } = info;

  const submitDataFormat = {
    userName: userName,
    email: userEmail,
    password: password,
  };

  const parsedData = JSON.stringify(submitDataFormat);

  const submitData = () => {
    if (userName === "" || !patterns.regName.test(userName)) {
      setNameValidation(true);
      setTimeout(() => {
        setNameValidation(false);
      }, 4000);
      return false;
    }
    if (userEmail === "" || !patterns.regEmail.test(userEmail)) {
      setEmailValidation(true);
      setTimeout(() => {
        setEmailValidation(false);
      }, 4000);
      return false;
    }
    if (password === "" || password.length < 10) {
      setPasswordValidation(true);
      setTimeout(() => {
        setPasswordValidation(false);
      }, 4000);
      return false;
    }

    axios
      .post(`${USER_REGISTER_API}`, parsedData)
      .then((res) => {
        resetData();
        setRegisterSuccess(true);
      })
      .catch((err) => {
        setRegisterFailure(true);
        setTimeout(() => {
          setRegisterFailure(false);
        });
      });
  };

  const resetData = () => {
    info.userName = "";
    info.userEmail = "";
    info.password = "";
  };

  return (
    <div>
      <NavBar />
      <div className="container">
      <p style={{ color: "blue", fontWeight: "bold" }}>
          Developed by Sachin (Ranganath) K
        </p>
        <div className="panel panel-primary">
          <div
            className="panel panel-heading"
            style={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Register here
          </div>
          <div className="panel-body">
            {registerSuccess && (
              <div class="alert alert-success" style={{fontWeight:"bold"}}>
                {registerLoginForm.registerSuccess}
              </div>
            )}
            {registerFailure && (
              <div class="alert alert-danger">
                {registerLoginForm.registerFailure}
              </div>
            )}
            <div className="form-group">
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="userName"
                value={userName}
                onChange={handleInfo}
              />
              <p style={{ color: "red", fontSize: "15px" }}>
                {nameValidation && formErrorMsgs.nameError}
              </p>
            </div>
            <br />
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="userEmail"
                value={userEmail}
                onChange={handleInfo}
              />
              <p style={{ color: "red", fontSize: "15px" }}>
                {emailValidation && formErrorMsgs.emailError}
              </p>
            </div>
            <br />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Set Password"
                name="password"
                value={password}
                onChange={handleInfo}
              />
              <p style={{ color: "red", fontSize: "15px" }}>
                {passwordValidation && formErrorMsgs.passwordError}
              </p>
            </div>
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={submitData}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
