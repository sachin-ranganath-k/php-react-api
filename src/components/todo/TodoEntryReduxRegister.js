import axios from "axios";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, showError, somethingWentWrong } from "../../actions/actions";
import { USERS_API } from "../../constants/endPoints";
import {
  buttonMessages,
  errorMessages,
  formLabels,
} from "../../constants/messages";
import {v4 as uuid} from "uuid"
import NavBar from "../../navbar/NavBar";

const TodoEntryReduxRegister = () => {

  let data = {};
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const somethingWentWrongMessage = useSelector((state) => state.somethingWentWrongError);

  const validateField = () => {
    if (
      userName.current.value === "" ||
      userEmail.current.value === "" ||
      userPassword.current.value === ""
    ) {
      dispatch(showError(true));
    } else {
      submitData();
    }
  };

  const submitData = () => {
    axios
      .post(
        `${USERS_API}`,
        (data = {
          userId:uuid(),
          userName: userName.current.value,
          userEmail: userEmail.current.value,
          userPassword: userPassword.current.value,
        })
      )
      .then((res) => {
        dispatch(addUser(res.data));
      })
      .catch((error) => {
        dispatch(somethingWentWrong(true));
      });
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="panel panel-success">
          <div className="panel-heading" style={{ fontSize: "20px" }}>
            {formLabels.REGISTER_NEW_USER}
          </div>
          <div className="panel-body">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name="userName"
                ref={userName}
              />
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
                placeholder="Set Password"
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
              {buttonMessages.REGISTER}
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoEntryReduxRegister;
