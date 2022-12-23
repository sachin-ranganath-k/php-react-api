import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ALL_USERS_API } from "../../constants/endPoints";
import { registerLoginForm } from "../../constants/constants";
import NavBar from "../../navbar/NavBar";

const UserLogin = () => {
  const [info, setInfo] = useState({
    userEmail: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();
  const [loginFailure, setLoginFailure] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const handleInfo = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const { userEmail, password } = info;

  const resetData = () => {
    info.userEmail = "";
    info.password = "";
  };

  const getData = () => {
    axios
      .get(`${ALL_USERS_API}`)
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkInfo = () => {
    let found;
    for (let i = 0; i < userInfo.length + 1; i++) {
      if (userInfo[i]?.email === userEmail && userInfo[i]?.password === password) {
        sessionStorage.setItem("userData", userInfo[i].user_id);
        sessionStorage.setItem("userName", userInfo[i].userName)
        found = 1;
      }
    }

    if (found === 1) {
      navigate("/home");
    } else {
      setLoginFailure(true);
      setTimeout(() => {
        setLoginFailure(false);
      }, 3000);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <br />
        <p style={{ color: "blue", fontWeight: "bold" }}>
          Developed by Sachin (Ranganath) K
        </p>
        <div className="panel panel-primary">
          <div
            className="panel panel-heading"
            style={{ fontSize: "25px", fontWeight: "bold" }}
          >
            Login here
          </div>
          <div className="panel-body">
            {loginFailure && (
              <div class="alert alert-danger" style={{ fontWeight: "bold" }}>
                {registerLoginForm.loginFailure}
              </div>
            )}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="userEmail"
                value={userEmail}
                onChange={handleInfo}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                name="password"
                value={password}
                onChange={handleInfo}
              />
            </div>
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={checkInfo}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
