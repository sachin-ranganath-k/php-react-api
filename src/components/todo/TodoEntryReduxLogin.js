import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUsers, showError, somethingWentWrong } from "../../actions/actions";
import { USERS_API } from "../../constants/endPoints";
import {
  buttonMessages,
  errorMessages,
  formLabels,
} from "../../constants/messages";
import NavBar from "../../navbar/NavBar";

const TodoEntryReduxLogin = () => {
  let data = {};
  const userEmail = useRef();
  const userPassword = useRef();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const error = useSelector((state) => state.error);
  const somethingWentWrongMessage = useSelector(
    (state) => state.somethingWentWrongError
  );
  const allUsers = useSelector((state) => state.allUsers);

  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(allUsers);

  const validateField = () => {
    if (userEmail.current.value === "" || userPassword.current.value === "") {
      dispatch(showError(true));
    } else {
      login();
    }
  };

  const getAllUsers = () => {
    axios
      .get(`${USERS_API}`)
      .then((res) => {
        dispatch(getUsers(res.data));
      })
      .catch((error) => {
        dispatch(somethingWentWrong(true));
      });
  };

  const login = () => {
    let found;
    let userInfo;
    for (let i = 0; i < allUsers.length; i++) {
      if (
        allUsers[i].userEmail === userEmail.current.value &&
        allUsers[i].userPassword === userPassword.current.value
      ) {
        found = 1;
        userInfo = JSON.stringify(allUsers[i]);
        break;
      }
    }

    if (found === 1) {
      sessionStorage.setItem("userInfo", userInfo);
      navigate("/userHome");
      console.log("yes");
    } else {
      console.log("no");
      // dispatch(showUserError(true));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="panel panel-success">
          <div className="panel-heading" style={{ fontSize: "20px" }}>
            {formLabels.LOGIN_HERE}
          </div>
          <div className="panel-body">
            <div className="form-group">
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                name="userEmail"
                ref={userEmail}
              />
              <br />
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                name="userPassword"
                ref={userPassword}
              />
            </div>
            {error && `${errorMessages.FIELDS_ERROR}`}
            {somethingWentWrongMessage &&
              `${errorMessages.SOMETHING_WENT_WRONG}`}
            <br />
            <button
              type="button"
              className="btn btn-primary"
              onClick={validateField}
            >
              {buttonMessages.LOGIN}
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoEntryReduxLogin;
